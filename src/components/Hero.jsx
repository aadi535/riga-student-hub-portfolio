import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Coins, Users, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero = () => {
  const { totalPaidOut, totalStudentsServed } = useApp();

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Target Audience Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Riga Fall 2026 Student Intake Special Perks</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Get Paid Cash Cashback For Opening Bank & Courier Accounts in <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Riga, Latvia</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Every new international student needs <strong className="text-white">Revolut, Wise, and Bolt/Wolt courier accounts</strong>. Use our verified Riga referral codes and we share <strong className="text-emerald-400">up to €100 cashback directly to your Revolut account</strong> for every task completed!
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#calculator"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              <Coins className="w-5 h-5 text-slate-950" />
              <span>Calculate My Cashback (€15 - €185)</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#tracker"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Track My Step Status</span>
            </a>
          </div>

          {/* Trust Guarantees row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Guaranteed Cash Back</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Fast Revolut Pay Payouts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>Verified RTU / RSU Student Community</span>
            </div>
          </div>

        </div>

        {/* Highlight Stats Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          
          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              €{totalPaidOut.toFixed(0)}+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Shared With Students</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {totalStudentsServed}+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Riga Students Onboarded</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
              €20 - €100
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Average Reward / Task</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              24 Hours
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Avg Verification Time</div>
          </div>

        </div>
      </div>
    </section>
  );
};
