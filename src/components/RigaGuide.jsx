import React, { useState } from 'react';
import { RIGA_GUIDES } from '../data/rigaGuideData';
import { Compass, Bus, Building2, Briefcase, Wifi, ChevronRight, BookOpen } from 'lucide-react';

const ICON_MAP = { Bus, Building2, Briefcase, Wifi };

export const RigaGuide = () => {
  const [activeGuide, setActiveGuide] = useState(RIGA_GUIDES[0]);

  return (
    <section id="guide" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              <Compass className="w-4 h-4" />
              Riga Freshman Survival Toolkit
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Essential Riga Student Setup Guides
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Everything you need to survive & thrive in Riga during your first 30 days.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Guide Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {RIGA_GUIDES.map((guide) => {
              const IconComp = ICON_MAP[guide.iconName] || BookOpen;
              const isSelected = activeGuide.id === guide.id;

              return (
                <div
                  key={guide.id}
                  onClick={() => setActiveGuide(guide)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-sky-500/50 shadow-lg shadow-sky-500/10'
                      : 'glass-card border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{guide.title}</h4>
                      <p className="text-xs text-slate-400">{guide.category} • {guide.readTime}</p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>

          {/* Guide Content Display */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-slate-800 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    {activeGuide.category}
                  </span>
                  <span className="text-xs text-slate-500">{activeGuide.readTime}</span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-3">
                  {activeGuide.title}
                </h3>

                <p className="text-xs text-slate-300 mb-6 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  {activeGuide.summary}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Step-by-Step Instructions:
                </h4>

                <div className="space-y-3">
                  {activeGuide.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Need help with this step in Riga?</span>
                <a href="#deals" className="text-sky-400 font-bold hover:underline">
                  Get Related Perks →
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
