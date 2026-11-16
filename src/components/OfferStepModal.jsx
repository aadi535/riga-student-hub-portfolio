import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, ExternalLink, CheckCircle2 } from 'lucide-react';

export const OfferStepModal = () => {
  const { activeStepOffer, setActiveStepOffer, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const panel = useRef(null);

  useEffect(() => {
    if (!activeStepOffer) return;
    const previous = document.activeElement;
    const controls = () => Array.from(panel.current?.querySelectorAll('button:not(:disabled), a[href]') || []);
    controls()[0]?.focus();
    const onKey = event => {
      if (event.key === 'Escape') setActiveStepOffer(null);
      if (event.key === 'Tab') {
        const items = controls();
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [activeStepOffer, setActiveStepOffer]);

  if (!activeStepOffer) return null;

  const copyCode = async () => {
    if (activeStepOffer.isSample) return;
    try {
    await navigator.clipboard.writeText(activeStepOffer.referralCode);
    setCopied(true);
    showToast(`Referral code "${activeStepOffer.referralCode}" copied!`);
    setTimeout(() => setCopied(false), 2000);
    } catch { showToast('Could not copy. Select the code manually.'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-fadeIn">
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="offer-dialog-title" className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full max-h-[90dvh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          aria-label="Close offer details"
          onClick={() => setActiveStepOffer(null)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-2xl">
            {activeStepOffer.companyLogo}
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
              {activeStepOffer.status}
            </span>
            <h3 id="offer-dialog-title" className="text-xl font-extrabold text-neutral-900">
              {activeStepOffer.title}
            </h3>
          </div>
        </div>

        {/* Reward Callout Box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-emerald-800 font-semibold">Cash Bonus Reward</div>
            <div className="text-xl font-extrabold text-emerald-700">
              {activeStepOffer.rewardText}
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-white text-emerald-800 rounded-full border border-emerald-200">
            Subject to terms
          </span>
        </div>

        {/* Referral Code Copy Box */}
        <div className="bg-neutral-900 text-white rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Referral Code</span>
            <span className="font-mono text-sm font-bold text-emerald-400">{activeStepOffer.referralCode}</span>
          </div>

          <button
            disabled={activeStepOffer.isSample || !activeStepOffer.referralCode}
            onClick={copyCode}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
          Steps to Complete:
        </h4>

        <div className="space-y-3 mb-6">
          {activeStepOffer.termsAndSteps.map((stepItem) => (
            <div key={stepItem.step} className="flex items-start gap-3 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                {stepItem.step}
              </span>
              <div>
                <h5 className="text-xs font-bold text-neutral-900">{stepItem.title}</h5>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">{stepItem.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href={activeStepOffer.isSample ? undefined : activeStepOffer.referralLink}
            aria-disabled={activeStepOffer.isSample}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 px-4 apple-button-primary text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{activeStepOffer.isSample ? 'Sample only — registration disabled' : `Open ${activeStepOffer.title} Link`}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={() => setActiveStepOffer(null)}
            className="px-4 py-3.5 apple-button-secondary text-xs font-semibold border border-neutral-200"
          >
            Need Help?
          </a>
        </div>

      </div>
    </div>
  );
};
