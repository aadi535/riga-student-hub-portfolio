import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, UserCheck, ShieldAlert, Award, Compass, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const { isAdmin, setIsAdmin, totalPaidOut, claims } = useApp();

  return (
    <header className="sticky top-0 z-40 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Riga<span className="text-emerald-400">Student</span>Perks
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Riga, LV 🇱🇻
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified Cashback & Referral Hub
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#calculator" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            Cashback Calculator
          </a>
          <a href="#deals" className="hover:text-emerald-400 transition-colors">
            All Deals & Referral Links
          </a>
          <a href="#tracker" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-purple-400" />
            Step Tracker
          </a>
          <a href="#payouts" className="hover:text-emerald-400 transition-colors">
            Live Payout Ledger
          </a>
          <a href="#guide" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sky-400" />
            Riga Guide
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-4">
          
          {/* Total Paid Ticker Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
            <span className="text-slate-400">Total Paid Out:</span>
            <span className="font-bold text-emerald-400 font-mono">€{totalPaidOut.toFixed(2)}</span>
          </div>

          {/* Admin Mode Toggle Switch */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              isAdmin
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Toggle Admin Verification Dashboard Mode"
          >
            {isAdmin ? (
              <>
                <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Admin View Active</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Admin Portal</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
