import React from 'react';
import { Sparkles } from 'lucide-react';

export const AppleFooter = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-xs text-neutral-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="font-bold text-neutral-900 text-sm">
            RigaStudentHub
          </span>
          <span className="text-[11px] text-neutral-400">
            • Independent Riga International Student Referral Portal
          </span>
        </div>

        <div className="flex items-center gap-6 font-medium text-neutral-600">
          <a href="#offers" className="hover:text-neutral-900 transition-colors">Active Offers</a>
          <a href="#contact" className="hover:text-neutral-900 transition-colors">Get Guidance</a>
          <a href="#privacy" className="hover:text-neutral-900 transition-colors">Privacy</a>
        </div>

        <div className="text-neutral-400 text-[11px]">
          © 2026 RigaStudentHub. Independent student project.
        </div>

      </div>
    </footer>
  );
};
