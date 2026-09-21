import { COOKIE_PREFIX } from '@/data/cookies';

/**
 * Attribution for visits that came out of an AI answer.
 *
 * Why this exists: the site is written to be quoted by answer engines as much
 * as to rank in Google, and GA4 alone cannot show that. It buckets chatgpt.com
 * and perplexity.ai under "Referral" beside any other website, and an AI app
 * that sends no referrer at all lands in "Direct" next to people who typed the
 * address. This module names the source, keeps it for the rest of the visit and
 * hangs it on every later event — so the question that matters ("did anyone who
 * arrived from an AI answer actually call?") is one report, not a guess.
 *
 * Two signals, because neither is reliable alone:
 *   - document.referrer — present from the web apps, absent from most of the
 *     native apps, which open links without one;
 *   - utm_source / ref in the query string — ChatGPT appends
 *     `utm_source=chatgpt.com` itself, and it survives where the referrer does
 *     not.
 *
 * CONSENT: nothing is written to the device before the visitor accepts
 * analytics. Until then the detection lives in a module variable, which dies
 * with the page. That is also why attribution can be lost: a visitor who
 * accepts cookies only after clicking through to a second page has, by then, an
 * internal referrer. Storing it earlier would mean writing to their device
 * before consent, which is the thing the banner exists to prevent.
 */

/**
 * Host patterns → the name reported to GA4. The keys are the products, not the
 * companies: a visit from chatgpt.com and one from the ChatGPT iOS app (whose
 * referrer is `android-app://com.openai.chat` or nothing at all) are the same
 * source to anyone reading the report.
 */
const AI_SOURCES: ReadonlyArray<readonly [RegExp, string]> = [
  [/chatgpt\.com|chat\.openai\.com|openai\.com|com\.openai/i, 'chatgpt'],
  [/perplexity\.ai|com\.perplexity/i, 'perplexity'],
  [/claude\.ai|anthropic\.com|com\.anthropic/i, 'claude'],
  [/gemini\.google\.com|bard\.google\.com|com\.google\.android\.apps\.bard/i, 'gemini'],
  [/copilot\.microsoft\.com|bing\.com\/chat/i, 'copilot'],
  [/deepseek\.com/i, 'deepseek'],
  [/grok\.com|x\.ai/i, 'grok'],
  [/meta\.ai/i, 'meta.ai'],
  [/mistral\.ai|lechat\.mistral/i, 'mistral'],
  [/you\.com/i, 'you.com'],
  [/phind\.com/i, 'phind'],
  [/poe\.com/i, 'poe'],
];

/** Survives internal navigation within the visit; never leaves the browser. */
const STORAGE_KEY = `${COOKIE_PREFIX}_ai_source`;

export interface AiReferral {
  /** Normalised product name, e.g. 'chatgpt'. */
  source: string;
  /** The page the AI answer linked to — the page that earned the citation. */
  landingPage: string;
  /** Raw referrer, '(none)' when the app sent none. Kept for debugging only. */
  rawReferrer: string;
}

/** The visit's AI source once detected, before consent allows storing it. */
let detected: AiReferral | null = null;

const match = (value: string): string | null => {
  for (const [pattern, name] of AI_SOURCES) {
    if (pattern.test(value)) return name;
  }
  return null;
};

/** sessionStorage throws in some privacy modes — never let that break a page. */
const readStored = (): AiReferral | null => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AiReferral) : null;
  } catch {
    return null;
  }
};

const writeStored = (referral: AiReferral): void => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(referral));
  } catch {
    /* private mode, blocked storage — attribution is a nice-to-have */
  }
};

/**
 * The AI source of this visit, or null. Reads the stored value first, so it
 * keeps answering the same thing after the visitor moves to another page.
 */
export const getAiReferral = (): AiReferral | null => {
  if (typeof window === 'undefined') return null;
  return detected ?? (detected = readStored());
};

/**
 * Looks for an AI source in the current page load. Call on every route change:
 * the landing page is whichever page the answer linked to, which is rarely the
 * front page, and a visitor can arrive from an AI answer mid-visit.
 *
 * Returns the referral only the FIRST time it is identified, so the caller
 * fires one `ai_referral` event per visit rather than one per page.
 */
export const detectAiReferral = (): AiReferral | null => {
  if (typeof window === 'undefined') return null;
  if (getAiReferral()) return null;

  const referrer = document.referrer || '';
  // An internal referrer is this site linking to itself, never a source.
  const external = referrer && !referrer.startsWith(window.location.origin);

  const params = new URLSearchParams(window.location.search);
  const tagged = params.get('utm_source') || params.get('ref') || '';

  const source = (external ? match(referrer) : null) ?? match(tagged);
  if (!source) return null;

  const referral: AiReferral = {
    source,
    landingPage: window.location.pathname,
    rawReferrer: referrer || '(none)',
  };
  detected = referral;
  return referral;
};

/** Called once consent exists — only then may the visit's source be stored. */
export const persistAiReferral = (): void => {
  if (typeof window === 'undefined' || !detected) return;
  if (!readStored()) writeStored(detected);
};
