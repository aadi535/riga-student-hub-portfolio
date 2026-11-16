import React from 'react';
import { Sparkles, MessageCircle, Heart, ShieldCheck, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800/80">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white">
                Riga<span className="text-emerald-400">Student</span>Perks
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier cashback and onboarding platform for international students arriving in Riga, Latvia.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Serving RTU • RSU • LU • RISEBA • TSI</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Referral Perks
            </h4>
            <ul className="space-y-2">
              <li><a href="#deals" className="hover:text-emerald-400 transition-colors">Revolut Student (€20 Cash)</a></li>
              <li><a href="#deals" className="hover:text-emerald-400 transition-colors">Wise Multi-Currency (€15 Cash)</a></li>
              <li><a href="#deals" className="hover:text-emerald-400 transition-colors">Bolt Food Courier (€100 Cash)</a></li>
              <li><a href="#deals" className="hover:text-emerald-400 transition-colors">Wolt Courier Riga (€85 Cash)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Student Tools
            </h4>
            <ul className="space-y-2">
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">Cashback Calculator</a></li>
              <li><a href="#tracker" className="hover:text-emerald-400 transition-colors">Step Progress Tracker</a></li>
              <li><a href="#payouts" className="hover:text-emerald-400 transition-colors">Live Verified Ledger</a></li>
              <li><a href="#guide" className="hover:text-emerald-400 transition-colors">Riga Freshman Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Community & Support
            </h4>
            <div className="space-y-3">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Riga Student WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-500">
                Direct student support response within 2 hours.
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © 2026 RigaStudentPerks. Made with <Heart className="w-3 h-3 text-red-500 inline mx-0.5" /> in Riga, Latvia.
          </p>
          <p className="text-center sm:text-right max-w-md">
            Disclaimer: Independent referral affiliate platform. Not directly affiliated with Revolut Ltd, Bolt Technology OU, or Wolt Enterprises Oy.
          </p>
        </div>

      </div>
    </footer>
  );
};
