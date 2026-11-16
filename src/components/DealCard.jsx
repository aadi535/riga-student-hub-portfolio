import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, Bike, ShoppingBag, Globe, Smartphone, Building2,
  Copy, ExternalLink, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, Clock, ArrowRight 
} from 'lucide-react';

const ICON_MAP = {
  CreditCard,
  Bike,
  ShoppingBag,
  Globe,
  Smartphone,
  Building2
};

export const DealCard = ({ deal }) => {
  const { setActiveModalDeal, showToast } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const IconComponent = ICON_MAP[deal.iconName] || CreditCard;

  const copyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(deal.referralCode);
    setCopied(true);
    showToast(`Referral code "${deal.referralCode}" copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 border-slate-800 flex flex-col justify-between relative group">
      
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${deal.color} flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {deal.category}
              </span>
              <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                {deal.title}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
              €{deal.userCashback}.00 Bonus
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          {deal.shortDesc}
        </p>

        {/* Turnaround Badge */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Estimated Payout: <strong className="text-slate-200">{deal.turnaround}</strong></span>
        </div>

        {/* Referral Code Quick Copy */}
        <div className="bg-slate-950/80 rounded-xl p-3 mb-4 border border-slate-800 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-500 block text-[10px]">REFERRED CODE / LINK</span>
            <span className="font-mono font-bold text-slate-200 text-xs">{deal.referralCode}</span>
          </div>
          
          <button
            onClick={copyCode}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1 font-medium"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Expand Requirements Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left py-2 px-1 text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center justify-between transition-colors border-t border-slate-800/60"
        >
          <span>Step-by-Step Requirements ({deal.requirements.length})</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Expanded Requirements Checklist */}
        {isExpanded && (
          <div className="mt-3 space-y-2 text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 animate-fadeIn">
            {deal.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{req}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-col gap-2">
        <a
          href={deal.referralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <span>1. Open {deal.title} Link</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <button
          onClick={() => setActiveModalDeal(deal)}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5 group"
        >
          <ShieldCheck className="w-4 h-4 text-slate-950" />
          <span>2. Submit Proof & Claim €{deal.userCashback}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
