import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Search, CheckCircle2, Clock, ShieldCheck, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export const StepTracker = () => {
  const { claims } = useApp();
  const [searchKey, setSearchKey] = useState('');
  const [selectedClaimId, setSelectedClaimId] = useState(claims[0]?.id || '');

  const activeClaim = claims.find(c => 
    c.id === selectedClaimId || 
    c.email.toLowerCase().includes(searchKey.toLowerCase()) || 
    c.revtagOrIban.toLowerCase().includes(searchKey.toLowerCase())
  ) || claims[0];

  const steps = [
    {
      stepNum: 1,
      title: 'Registered & Link Clicked',
      desc: 'Opened referral link and created account.'
    },
    {
      stepNum: 2,
      title: 'Completing Requirements',
      desc: 'Doing 3 purchases (€5+) or completing 100 deliveries.'
    },
    {
      stepNum: 3,
      title: 'Proof Submitted',
      desc: 'Screenshot & Revolut @tag uploaded for admin review.'
    },
    {
      stepNum: 4,
      title: 'Cash Bonus Sent ⚡',
      desc: 'Funds transferred directly to your Revolut/IBAN.'
    }
  ];

  return (
    <section id="tracker" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
            <UserCheck className="w-4 h-4" />
            Transparent Student Tracker
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Track Your Referral Step Progress Live
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Enter your student email or Revtag to see exactly what stage your cashback bonus is currently in.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 border-slate-800 max-w-4xl mx-auto shadow-2xl">
          
          {/* Tracker Search Input */}
          <div className="mb-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by your Email or Revtag (e.g. rahul.s@rtu.student.lv / @rahul_rtu)..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
              />
            </div>

            {/* Quick Claims Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {claims.slice(0, 3).map((claim) => (
                <button
                  key={claim.id}
                  onClick={() => setSelectedClaimId(claim.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                    activeClaim?.id === claim.id
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {claim.studentName.split(' ')[0]} ({claim.id})
                </button>
              ))}
            </div>
          </div>

          {/* Active Claim Header Card */}
          {activeClaim && (
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">{activeClaim.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {activeClaim.university}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white mt-1">
                  {activeClaim.studentName} — <span className="text-emerald-400">{activeClaim.dealTitle}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Payout Target: <strong className="text-slate-200">{activeClaim.revtagOrIban}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  €{activeClaim.cashbackAmount}.00 Cashback
                </div>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 sm:justify-end">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Status: <strong className="text-purple-300 font-semibold">{activeClaim.status}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* Step Progress Visual Pipeline */}
          {activeClaim && (
            <div className="space-y-6">
              
              {/* Progress Line */}
              <div className="relative">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-900 border border-slate-800">
                  <div
                    style={{ width: `${(activeClaim.currentStep / 4) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-500"
                  />
                </div>
              </div>

              {/* 4 Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step) => {
                  const isDone = activeClaim.currentStep >= step.stepNum;
                  const isCurrent = activeClaim.currentStep === step.stepNum;

                  return (
                    <div
                      key={step.stepNum}
                      className={`p-4 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-slate-900/90 border-emerald-500/30'
                          : isCurrent
                          ? 'bg-purple-950/30 border-purple-500/50 shadow-lg shadow-purple-500/10'
                          : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950'
                            : isCurrent
                            ? 'bg-purple-500 text-white animate-pulse'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : step.stepNum}
                        </span>

                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                            Active Step
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Verified Payout Receipt Banner if Step 4 */}
              {activeClaim.currentStep === 4 && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="font-bold block">Cashback Paid Out!</span>
                      <span className="text-[11px] text-slate-400">
                        Transaction Ref: {activeClaim.txHash || 'REV-8921-EUR'}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-[11px]">
                    Verified Receipt ⚡
                  </span>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
