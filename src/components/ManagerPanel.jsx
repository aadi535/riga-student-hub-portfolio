import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Settings } from 'lucide-react';
const inputClass = 'w-full border border-neutral-300 rounded-xl p-3 bg-white text-sm text-neutral-900';
const blank = { title: '', category: 'Banking', rewardText: '', referralCode: '', referralLink: '', shortSummary: '', isSample: true };
export const ManagerPanel = () => {
  const { isManagerView, setIsManagerView, service, config, manager, login, logout, helpRequests, offers,
    refreshRequests, addOffer, removeOffer, deleteRequest, retryNotification } = useApp();
  const [tab, setTab] = useState('requests');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [offer, setOffer] = useState(blank);
  const [terms, setTerms] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const action = async task => { setBusy(true); setError(''); try { await task(); } catch (e) { setError(e.message); } finally { setBusy(false); } };
  if (!isManagerView) return null;
  const publish = event => {
    event.preventDefault();
    const termsAndSteps = terms.split('\n').filter(line => line.trim()).map((line, i) => ({ step: i+1, title: `Step ${i+1}`, detail: line.trim() }));
    action(async () => { await addOffer({ ...offer, termsAndSteps }); setOffer(blank); setTerms(''); });
  };
  return <section aria-label="Site manager" className="bg-white border-b border-neutral-200 p-4 sm:p-8">
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div><h2 className="font-bold text-lg flex gap-2 items-center"><Settings className="w-5 h-5 text-emerald-700" />Site Manager</h2><p className="text-xs text-neutral-500">Protected access to student requests and published offers.</p></div>
        <button aria-label="Close manager panel" onClick={() => setIsManagerView(false)} className="p-2 rounded-full bg-neutral-100"><X className="w-5 h-5" /></button>
      </div>
      {service !== 'live' ? <p className="text-sm text-neutral-600">Manager access is available only when the backend is connected. Sample mode contains no student requests.</p> : !manager ? <form className="space-y-3 max-w-sm" onSubmit={e => { e.preventDefault(); action(async () => { await login(username, password); setPassword(''); }); }}>
        <label className="block text-sm">Manager username<input autoComplete="username" required value={username} onChange={e => setUsername(e.target.value)} className={inputClass} /></label>
        <label className="block text-sm">Password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className={inputClass} /></label>
        <button disabled={busy} className="apple-button-primary px-5 py-3 text-sm">{busy ? 'Signing in…' : 'Sign In'}</button>
      </form> : <>
        {!config?.notificationConfigured && <p role="status" className="mb-4 p-3 rounded-xl bg-amber-50 text-sm text-amber-900">Email delivery is not configured. Requests remain saved and notifications stay queued. Add the server's email-provider credentials to activate delivery.</p>}
        <div className="flex flex-wrap gap-2 mb-5">
          {['requests', 'offers'].map(item => <button key={item} onClick={() => setTab(item)} className={`px-4 py-2 text-sm rounded-full border ${tab === item ? 'bg-neutral-900 text-white' : 'bg-neutral-50'}`}>{item === 'requests' ? 'Student Requests' : 'Manage Offers'}</button>)}
          <button disabled={busy} onClick={() => action(logout)} className="px-4 py-2 text-sm underline">Sign Out</button>
        </div>
        {tab === 'requests' ? <div className="space-y-3">
          <button disabled={busy} onClick={() => action(refreshRequests)} className="text-sm text-emerald-700 underline">Refresh Requests</button>
          <p className="text-xs text-neutral-500">Showing the newest 200 retained requests. Email provider acceptance does not guarantee inbox delivery.</p>
          {!helpRequests.length && <p className="text-sm">No requests saved yet.</p>}
          {helpRequests.map(req => <article key={req.id} className="apple-card p-4 space-y-2 break-words">
            <h3 className="font-bold">{req.name} <span className="text-xs font-normal text-neutral-500">{req.university}</span></h3>
            <p className="text-sm">{req.contact}{req.email ? ` · ${req.email}` : ''}</p>
            <p className="text-sm text-neutral-600">{req.interestedIn}: {req.notes || 'No additional notes'}</p>
            <p className="text-xs text-neutral-500">{new Date(req.submittedAt).toLocaleString()} · Notification: {req.notificationStatus.replaceAll('_', ' ')} · Attempts: {req.notificationAttempts}</p>
            <p className="text-xs text-neutral-500 break-all">Reference: {req.id}</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <a target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline" href={req.contact.startsWith('@') ? `https://t.me/${req.contact.slice(1)}` : `https://wa.me/${req.contact.replace(/[^0-9]/g, '')}`}>{req.contact.startsWith('@') ? 'Open Telegram' : 'Open WhatsApp'}</a>
              {req.notificationStatus === 'FAILED' && <button disabled={busy} className="underline" onClick={() => action(() => retryNotification(req.id))}>Retry Notification</button>}
              <button disabled={busy} className="text-red-700 underline" onClick={() => { if (window.confirm('Permanently delete this request and its notification record?')) action(() => deleteRequest(req.id)); }}>Delete Request</button>
            </div>
          </article>)}
        </div> : <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={publish} className="apple-card p-5 space-y-3">
            <h3 className="font-bold">Publish an Offer</h3>
            <fieldset disabled={busy} className="space-y-3">
              {[['title','Title',120],['category','Category',60],['rewardText','Reward description (subject to terms)',120],['referralCode','Referral code (optional)',100],['referralLink','HTTPS referral URL',1000],['shortSummary','Summary',600]].map(([key,label,max]) => <label key={key} className="block text-xs font-semibold">{label}<input required={key !== 'referralCode'} type={key === 'referralLink' ? 'url' : 'text'} maxLength={max} className={inputClass} value={offer[key]} onChange={e => setOffer({ ...offer, [key]: e.target.value })} /></label>)}
              <label className="block text-xs font-semibold">Terms and steps (one per line; 1–6 steps, 800 characters each)<textarea required rows={4} maxLength={4805} value={terms} onChange={e => setTerms(e.target.value)} className={inputClass} /></label>
              <label className="flex gap-2 text-xs"><input type="checkbox" checked={offer.isSample} onChange={e => setOffer({ ...offer, isSample: e.target.checked })} />Sample illustration — disables registration and code copying</label>
              <p className="text-xs text-neutral-600">Publish as real only after checking the provider's current eligibility, expiry, reward and referral terms. No offer is automatically verified.</p>
              <button className="apple-button-primary px-5 py-3 text-sm">{busy ? 'Saving…' : 'Save Offer'}</button>
            </fieldset>
          </form>
          <div className="space-y-3">{offers.map(item => <article key={item.id} className="apple-card p-4"><h3 className="font-bold">{item.title}</h3><p className="text-xs text-neutral-500">{item.isSample ? 'Sample illustration' : 'Published offer'}</p><button disabled={busy} className="text-xs underline text-red-700 mt-2" onClick={() => { if (window.confirm('Remove this published offer?')) action(() => removeOffer(item.id)); }}>Remove Offer</button></article>)}</div>
        </div>}
      </>}
      {error && <p role="alert" className="mt-4 text-red-700 text-sm">{error}</p>}
    </div>
  </section>;
};
