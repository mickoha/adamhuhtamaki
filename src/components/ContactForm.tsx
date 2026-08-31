import React, { useRef, useState } from 'react';
import Recaptcha, { ReCAPTCHA } from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { trackEvent } from '@/utils/analytics';

/**
 * EmailJS contact form with invisible reCAPTCHA v3.
 *
 * Setup (see .env.example):
 *  1. dashboard.emailjs.com → add an email service, then a template whose
 *     variables are: {{name}}, {{email}}, {{number}}, {{message}}.
 *  2. google.com/recaptcha → v3 site key for your domain + localhost.
 *  3. Fill NEXT_PUBLIC_EMAIL_* and NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local.
 *
 * There is no backend: the send happens straight from the browser with the
 * publishable EmailJS key. Enable EmailJS's own reCAPTCHA verification in the
 * template settings so the token below is actually checked server-side.
 */

type SendState = 'notSent' | 'waiting' | 'sent';

interface FieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}

const inputCls =
  'w-full rounded-site-md border border-site-line-strong bg-white px-[12px] py-[10px] text-[13.5px] text-site-body outline-none transition-[border-color,box-shadow] duration-150 focus:border-site-accent focus:shadow-[0_0_0_3px_rgba(15,157,223,0.18)]';

function Field({
  id,
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  multiline,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor={id} className="text-[12px] font-medium text-site-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${inputCls} min-h-[90px] resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={inputCls}
        />
      )}
    </div>
  );
}

export default function ContactForm() {
  const [messageValue, setMessageValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [sendState, setSendState] = useState<SendState>('notSent');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
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
    setMessageValue('');
    setNameValue('');
    setEmailValue('');
    setNumberValue('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      const formData = {
        name: nameValue,
        email: emailValue,
        number: numberValue,
        message: messageValue,
        'g-recaptcha-response': token,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_ID!
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
          className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
      );
    }
    if (sendState === 'sent') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 12l5 5L20 6" />
        </svg>
      );
    }
    return (
      <>
        Lähetä viesti
        <span className="ml-[2px] transition-transform duration-150 group-hover:translate-x-[2px]">
          →
        </span>
      </>
    );
  };

  return (
    <div className="relative z-[1]">
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
        className="flex flex-col gap-[14px]"
      >
        <Field
          id="cf-name"
          label="Nimi *"
          name="name"
          required
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <Field
          id="cf-email"
          label="Sähköposti *"
          name="email"
          type="email"
          required
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <Field
          id="cf-phone"
          label="Puhelin"
          name="number"
          type="tel"
          value={numberValue}
          onChange={(e) => setNumberValue(e.target.value)}
        />
        <Field
          id="cf-message"
          label="Viesti *"
          name="message"
          required
          multiline
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />

        <div className="mt-[6px] flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={buttonDisabled}
            className="group inline-flex min-w-[150px] items-center justify-center gap-[6px] rounded-site-lg bg-site-accent px-[18px] py-[11px] text-[14px] font-semibold leading-none text-white transition-colors duration-150 hover:bg-site-accent-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-80"
          >
            {buttonInner()}
          </button>

          {showSuccess ? (
            <p className="max-w-[280px] text-[12px] text-site-ok-fg">
              Kiitos viestistäsi! Olemme vastaanottaneet sen ja palaamme sinulle
              mahdollisimman pian.
            </p>
          ) : showError ? (
            <p className="max-w-[280px] text-[12px] text-site-danger">
              Viestin lähettämisessä tapahtui virhe. Yritä uudelleen tai ota
              yhteyttä suoraan sähköpostitse tai puhelimitse.
            </p>
          ) : (
            /* Required notice when the reCAPTCHA badge is hidden in CSS. */
            <p className="max-w-[220px] text-[11px] leading-[1.5] text-site-subtle">
              Suojattu reCAPTCHA-palvelun avulla.{' '}
              <a
                href="https://policies.google.com/privacy?hl=fi"
                className="underline hover:text-site-accent"
              >
                Tietosuojakäytäntö
              </a>{' '}
              &amp;{' '}
              <a
                href="https://policies.google.com/terms?hl=fi"
                className="underline hover:text-site-accent"
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
