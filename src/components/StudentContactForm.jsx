import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react';
const inputClass = 'w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30';
const empty = { name: '', contact: '', email: '', university: 'RTU', interestedIn: 'General settlement help', notes: '' };
export const StudentContactForm = () => {
  const { submitHelpRequest, service, config } = useApp();
  const [fields, setFields] = useState(empty);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const submission = useRef(null);
  const change = (key, value) => setFields(previous => ({ ...previous, [key]: value }));
  const handleSubmit = async event => {
    event.preventDefault(); if (busy || service !== 'live') return;
    const body = { ...fields, consent, consentVersion: config.consentVersion };
    const fingerprint = JSON.stringify(body);
    if (!submission.current || submission.current.fingerprint !== fingerprint) submission.current = { fingerprint, key: crypto.randomUUID() };
    setBusy(true); setError('');
    try { const saved = await submitHelpRequest(body, submission.current.key); if (!saved.saved || !saved.id) throw new Error('No saved request was confirmed. Please retry.'); setReceipt(saved); }
    catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  };
  return <section id="contact" className="py-12 max-w-4xl mx-auto px-4">
    <div className="apple-card p-6 sm:p-10 border-emerald-200/80 bg-gradient-to-b from-white to-emerald-50/20 shadow-lg"><div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3"><MessageCircle className="w-4 h-4" />1-on-1 Student Assistance</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Need a Hand Settling In Riga?</h2>
        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">Ask about everyday student life, accommodation or referral terms. Leave a phone number or Telegram handle so Aditya can respond when available. Assistance is free; rewards depend on each provider's terms.</p>
      </div>
      {service !== 'live' && <p role="status" className="p-4 mb-5 bg-neutral-100 rounded-2xl text-sm">{service === 'demo' ? 'Sample preview: the form is disabled and no personal details are collected.' : service === 'loading' ? 'Connecting to the secure request service…' : 'The request service is unavailable. Submissions are disabled; refresh to reconnect.'}</p>}
      {receipt ? <div role="status" className="text-center p-6 rounded-2xl border border-emerald-200 space-y-3">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" /><h3 className="text-lg font-bold">Your Request Is Saved</h3>
        <p className="text-sm text-neutral-600">Aditya can view it in the protected manager panel. Email notification is {receipt.notificationStatus === 'PROVIDER_ACCEPTED' ? 'accepted by the email provider' : !config.notificationConfigured ? 'pending until the email service is configured' : receipt.notificationStatus === 'FAILED' ? 'awaiting manager retry' : 'queued for delivery'}. A response time is not guaranteed.</p>
        <p className="text-xs break-all text-neutral-500">Reference: {receipt.id}</p>
        <button className="text-sm font-bold text-emerald-700 underline" onClick={() => { setReceipt(null); setFields(empty); setConsent(false); submission.current = null; }}>Start a new request</button>
      </div> : <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset disabled={busy || service !== 'live'} className="space-y-4 disabled:opacity-60">
          <label className="block text-sm font-semibold">Full name *<input name="name" autoComplete="name" required maxLength={100} value={fields.name} onChange={e => change('name', e.target.value)} className={inputClass} /></label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm font-semibold">Phone or Telegram *<input name="contact" autoComplete="tel" required maxLength={100} placeholder="+371 20000000 or @your_handle" value={fields.contact} onChange={e => change('contact', e.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold">Email (optional)<input name="email" autoComplete="email" type="email" maxLength={254} value={fields.email} onChange={e => change('email', e.target.value)} className={inputClass} /></label>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm font-semibold">University<select value={fields.university} onChange={e => change('university', e.target.value)} className={inputClass}>{['RTU', 'RSU', 'LU', 'RISEBA', 'TSI', 'Turība', 'Arriving soon / Other'].map(v => <option key={v}>{v}</option>)}</select></label>
            <label className="block text-sm font-semibold">Help needed<select value={fields.interestedIn} onChange={e => change('interestedIn', e.target.value)} className={inputClass}>{['General settlement help', 'Banking and referral terms', 'Courier registration', 'Accommodation', 'Groceries', 'Finding official residence-permit guidance'].map(v => <option key={v}>{v}</option>)}</select></label>
          </div>
          <label className="block text-sm font-semibold">Question (optional)<textarea rows={3} maxLength={1500} value={fields.notes} onChange={e => change('notes', e.target.value)} className={inputClass} aria-describedby="sensitive-data" /></label>
          <p id="sensitive-data" className="text-xs text-neutral-600">Do not include passport numbers, bank details, passwords or copies of visa documents.</p>
          <label className="flex items-start gap-3 text-xs text-neutral-700"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5" /><span>I agree to my details being stored for up to 90 days and used to respond to this request. I have read the <a className="underline text-emerald-700" href="#privacy">privacy information</a>.</span></label>
          <button type="submit" className="w-full py-4 apple-button-primary text-sm font-bold flex items-center justify-center gap-2"><Send className="w-4 h-4" />{busy ? 'Waiting for server confirmation…' : 'Request Free Assistance'}</button>
        </fieldset>
        {error && <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-xl p-3">{error}</p>}
      </form>}
      <details id="privacy" className="mt-6 border-t border-neutral-200 pt-4 text-xs text-neutral-600 leading-relaxed">
        <summary className="cursor-pointer font-bold text-neutral-800">Privacy & how your request is used</summary>
        <p className="mt-3">Aditya Raj operates this independent student project. In live mode, your name, contact, optional email, university, topic, question and consent record are stored in PostgreSQL and accessible to the authorised manager. Neon is the intended database host; the app host also processes the form. Resend receives an email notification containing only the request reference, not your contact details or question.</p>
        <p className="mt-2">Requests are automatically deleted after 90 days while the service is running. Database backups may remain under the host's retention policy. {config?.privacyContact && <>For access or deletion, email <a className="underline" href={`mailto:${config.privacyContact}`}>{config.privacyContact}</a> with your reference. </>} Details are used to provide requested assistance, not advertising. Sample offers are illustrations, not verified rewards or working referral codes. External services have their own terms and privacy policies.</p>
      </details>
    </div></div>
  </section>;
};
