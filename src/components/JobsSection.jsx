import React from 'react';
import { JOBS_DATA } from '../data/rigaStudentHubData';
import { Briefcase, Clock, DollarSign, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JobsSection = ({ searchQuery, onSelectPerkTab }) => {
  const { offers, setActiveStepOffer } = useApp();

  const filteredJobs = JOBS_DATA.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="animate-fadeIn">
      
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-semibold mb-2">
          <Briefcase className="w-3.5 h-3.5 text-purple-600" />
          <span>Legal Student Employment in Latvia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Part-Time Jobs for International Students
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Learn where foreign students work in Riga, hourly pay rates, and how to register your taxes legally.
        </p>
      </div>

      {/* Legal Work Hours Notice */}
      <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5 text-xs text-purple-900">
        <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-sm block mb-1">Latvian Immigration Law Work Limits:</strong>
          <p className="leading-relaxed">
            Non-EU students on a Bachelor’s or Master’s TRP (Residence Permit) are legally allowed to work up to <strong>20 hours per week</strong> during the study semester, and full-time (40 hours/week) during summer holidays.
          </p>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="apple-card p-6 flex flex-col justify-between hover:border-purple-300/80 transition-all group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                    {job.category}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 mt-0.5 group-hover:text-purple-700 transition-colors">
                    {job.name}
                  </h3>
                </div>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 flex-shrink-0">
                  {job.badge}
                </span>
              </div>

              {/* Pay & Hours Bar */}
              <div className="bg-neutral-50 rounded-xl p-3 mb-4 border border-neutral-200/70 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Estimated Earnings:
                  </span>
                  <span className="font-bold text-neutral-900 font-mono">{job.hourlyEstimate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    Hours / Schedule:
                  </span>
                  <span className="text-neutral-700 font-medium">{job.hoursLimit}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {job.description}
              </p>

              {/* How to Apply Steps */}
              <div className="mb-4 space-y-1.5">
                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                  How to Get Started:
                </div>
                {job.steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                    <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{st}</span>
                  </div>
                ))}
              </div>

              {/* Bonus Tag */}
              {job.perkBonus && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900 font-semibold mb-4">
                  💡 {job.perkBonus}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              {job.id === 'bolt-wolt-courier' ? (
                <button
                  onClick={() => {
                    const boltDeal = offers.find(o => o.id === 'bolt-courier');
                    if (boltDeal) setActiveStepOffer(boltDeal);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Claim Bolt Courier €100 Referral Perk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href="#contact"
                  className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center justify-between w-full"
                >
                  <span>Need help with student CV or work permit?</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
