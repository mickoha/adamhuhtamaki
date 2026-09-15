import React, { useRef, useState } from 'react';
import Recaptcha, { ReCAPTCHA } from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { trackEvent } from '@/utils/analytics';
import {
  MATTER_TYPES as DEFAULT_MATTER_TYPES,
  URGENCY_LEVELS as DEFAULT_URGENCY_LEVELS,
} from '@/data/services';

interface ContactFormProps {
  /** Per-page option lists; the service pages use their own. */
  matterTypes?: string[];
  urgencyLevels?: string[];
  /** The civil page asks the nature and stage of a dispute instead. */
  matterLabel?: string;
  urgencyLabel?: string;
  notice?: string;
  /**
   * The form card's ground. Defaults to the dark card used inside the
   * <Contact> band, whose section ground is a gradient up to #292b31. On the
   * yhteystiedot page the section ground IS the page, so the card has to step
   * UP to the surface tone or it disappears into it.
   */
  surface?: string;
}

/**
 * EmailJS contact form with invisible reCAPTCHA v3.
 *
 * Setup (see .env.example):
 *  1. dashboard.emailjs.com → add an email service, then a template whose
 *     variables are: {{name}}, {{email}}, {{number}}, {{matter}},
 *     {{urgency}}, {{matter_label}}, {{urgency_label}}, {{message}}.
 *  2. google.com/recaptcha → v3 site key for your domain + localhost.
 *  3. Fill NEXT_PUBLIC_EMAIL_* and NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local.
 *
 * There is no backend: the send happens straight from the browser with the
 * publishable EmailJS key. Enable EmailJS's own reCAPTCHA verification in the
 * template settings so the token below is actually checked server-side.
 *
 * No file uploads, by design — the fine print tells visitors not to send
 * confidential detail through the form, so the form must not invite it.
 */

type SendState = 'notSent' | 'waiting' | 'sent';

export default function ContactForm({
  matterTypes: MATTER_TYPES = DEFAULT_MATTER_TYPES,
  urgencyLevels: URGENCY_LEVELS = DEFAULT_URGENCY_LEVELS,
  matterLabel = 'Asian laatu',
  urgencyLabel = 'Kiireellisyys',
  notice = 'Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa. Kiireellisissä asioissa soita päivystysnumeroon.',
  surface = 'bg-site-bg',
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [matter, setMatter] = useState(MATTER_TYPES[0]);
  const [urgency, setUrgency] = useState(URGENCY_LEVELS[0]);
  const [message, setMessage] = useState('');

  const [sendState, setSendState] = useState<SendState>('notSent');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [contactMissing, setContactMissing] = useState(false);
  // reCAPTCHA pulls a ~120 kB third-party chain (api.js → CSS → font) on every
  // page that renders this form. Mount it only once the visitor touches the
  // form, so idle visitors never pay for it.
  const [recaptchaWanted, setRecaptchaWanted] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  // form_start tells "nobody engaged the form" apart from "they started and
  // dropped out" — without it a week of zero leads is undiagnosable.
  const startedRef = useRef(false);

  // First focus does double duty: mount reCAPTCHA and mark the form started.
  const handleFirstFocus = () => {
    setRecaptchaWanted(true);
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('form_start', { method: 'contact_form' });
  };

  const waitForRecaptcha = async () => {
    setRecaptchaWanted(true);
    for (let i = 0; i < 20 && !recaptchaRef.current; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    return recaptchaRef.current;
  };

  const setEmptyValues = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMatter(MATTER_TYPES[0]);
    setUrgency(URGENCY_LEVELS[0]);
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // One of the two ways back to the sender is required — a lead with neither
    // is unusable, and the browser cannot express "either/or" on its own.
    if (!phone.trim() && !email.trim()) {
      setContactMissing(true);
      return;
    }
    setContactMissing(false);

    setSendState('waiting');
    setButtonDisabled(true);
    trackEvent('contact_form_submit');

    const recaptcha = await waitForRecaptcha();
    if (!recaptcha) {
      console.error('reCAPTCHA not available.');
      trackEvent('contact_form_error', { reason: 'recaptcha' });
      setShowError(true);
      setSendState('notSent');
      setButtonDisabled(false);
      return;
    }

    try {
      const token = await recaptcha.executeAsync();
      if (!token) {
        console.error('reCAPTCHA verification failed.');
        trackEvent('contact_form_error', { reason: 'recaptcha' });
        setShowError(true);
        setSendState('notSent');
        setButtonDisabled(false);
        return;
      }

      // matter and urgency are their own variables so the EmailJS template can
      // put them in the subject line, where they are read before opening. The
      // labels travel with them because the civil pages ask different things.
      const formData = {
        name,
        email,
        number: phone,
        matter,
        urgency,
        matter_label: matterLabel,
        urgency_label: urgencyLabel,
        message,
        'g-recaptcha-response': token,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_ID!,
      );

      trackEvent('generate_lead', { method: 'contact_form' });
      setSendState('sent');
      setShowSuccess(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setEmptyValues();
      }, 2000);
    } catch (error) {
      console.error('Error sending email', error);
      trackEvent('contact_form_error', { reason: 'send_failed' });
      setShowError(true);
      setSendState('notSent');
      setButtonDisabled(false);
    }
  };

  const buttonInner = () => {
    if (sendState === 'waiting') {
      return (
        <span
          aria-label="Lähetetään"
          className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-site-accent/40 border-t-site-accent"
        />
      );
    }
    if (sendState === 'sent') {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M4 12l5 5L20 6" />
        </svg>
      );
    }
    return 'Lähetä yhteydenottopyyntö';
  };

  return (
    <div
      className={`relative z-[1] rounded-site-lg ${surface} p-[38px_36px] shadow-site-md max-md:p-6`}
    >
      {recaptchaWanted && (
        <Recaptcha
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          size="invisible"
          ref={recaptchaRef}
        />
      )}
      <form
        onSubmit={handleSubmit}
        onFocusCapture={handleFirstFocus}
        className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1"
      >
        <div className="field">
          <label htmlFor="cf-name">Nimi *</label>
          <input
            id="cf-name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input max-md:min-h-[46px]"
          />
        </div>

        <div className="field">
          <label htmlFor="cf-phone">Puhelin</label>
          <input
            id="cf-phone"
            name="number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input max-md:min-h-[46px]"
          />
        </div>

        <div className="field col-span-2 max-md:col-span-1">
          <label htmlFor="cf-email">Sähköposti</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input max-md:min-h-[46px]"
          />
        </div>

        <div className="field col-span-2 max-md:col-span-1">
          <label htmlFor="cf-matter">{matterLabel}</label>
          <select
            id="cf-matter"
            name="matter"
            value={matter}
            onChange={(e) => setMatter(e.target.value)}
            className="input max-md:min-h-[46px]"
          >
            {MATTER_TYPES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="col-span-2 border-0 p-0 max-md:col-span-1">
          <legend className="mb-[7px] p-0 text-[12px] text-site-text/70">
            {urgencyLabel}
          </legend>
          <div className="flex flex-wrap gap-x-6 gap-y-3 max-md:flex-col max-md:gap-y-[10px]">
            {URGENCY_LEVELS.map((level) => (
              <label key={level} className="radio">
                <input
                  type="radio"
                  name="urgency"
                  value={level}
                  checked={urgency === level}
                  onChange={() => setUrgency(level)}
                />
                <span className="dot" />
                {level}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field col-span-2 max-md:col-span-1">
          <label htmlFor="cf-message">Lyhyt kuvaus</label>
          <textarea
            id="cf-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mistä on kysymys ja missä vaiheessa asia on"
            className="input min-h-[90px]"
          />
        </div>

        <p className="col-span-2 text-[12.5px] leading-[1.6] text-site-neutral-500 max-md:col-span-1">
          {notice}
        </p>

        <button
          type="submit"
          disabled={buttonDisabled}
          className="btn btn-primary col-span-2 w-full px-[22px] py-[13px] text-[15px] max-md:col-span-1 max-md:min-h-[46px]"
        >
          {buttonInner()}
        </button>

        <div className="col-span-2 max-md:col-span-1">
          {contactMissing && (
            <p className="text-[12.5px] text-site-danger">
              Jätä puhelinnumero tai sähköposti, jotta voin vastata sinulle.
            </p>
          )}
          {showSuccess && (
            <p className="text-[12.5px] text-site-ok-fg">
              Kiitos. Yhteydenottopyyntö on perillä, ja otan sinuun yhteyttä
              mahdollisimman pian. Kiireellisessä asiassa soita
              päivystysnumeroon.
            </p>
          )}
          {showError && (
            <p className="text-[12.5px] text-site-danger">
              Viestin lähettämisessä tapahtui virhe. Yritä uudelleen tai soita
              päivystysnumeroon.
            </p>
          )}
          {!contactMissing && !showSuccess && !showError && (
            /* Required notice when the reCAPTCHA badge is hidden in CSS. */
            <p className="text-[11.5px] leading-[1.5] text-site-neutral-600">
              Suojattu reCAPTCHA-palvelun avulla.{' '}
              <a
                href="https://policies.google.com/privacy?hl=fi"
                className="underline transition-colors hover:text-site-accent"
              >
                Tietosuojakäytäntö
              </a>{' '}
              &amp;{' '}
              <a
                href="https://policies.google.com/terms?hl=fi"
                className="underline transition-colors hover:text-site-accent"
              >
                palveluehdot
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
