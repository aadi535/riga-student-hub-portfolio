import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, Zap, Award, Sparkles } from 'lucide-react';

export const LivePayoutLedger = () => {
  const { payouts, totalPaidOut } = useApp();

  return (
    <section id="payouts" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Zap className="w-4 h-4" />
              Live Verification Feed
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Recent Verified Student Payouts
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Transparent log of cashback bonuses sent directly to Riga international students.
            </p>
          </div>

          <div className="glass-card px-5 py-3 rounded-2xl border-emerald-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Verified Payouts</div>
              <div className="text-xl font-extrabold text-white font-mono">
                €{totalPaidOut.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Payout Feed Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payouts.map((payout) => (
            <div
              key={payout.id}
              className="glass-card rounded-2xl p-4 border-slate-800 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={payout.avatar}
                  alt={payout.studentName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{payout.studentName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                      {payout.university}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {payout.dealTitle} • <span className="text-slate-500">{payout.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-extrabold text-emerald-400 font-mono">
                  +€{payout.amount.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{payout.paymentMethod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
