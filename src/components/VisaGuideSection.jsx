import React from 'react';
import { VISA_TRP_DATA } from '../data/rigaStudentHubData';
import { FileCheck, ShieldAlert, CheckCircle2, DollarSign, Download, ArrowRight } from 'lucide-react';

export const VisaGuideSection = () => {
  return (
    <section className="animate-fadeIn">
      
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Save €300 – €500 on Agent Fees</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          DIY Student Residence Permit (TRP) Guide
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Complete step-by-step roadmap to obtaining your Latvian student residence permit directly through PMLP without paying expensive third-party agents.
        </p>
      </div>

      {/* No-Agent Alert */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 mb-8 flex items-start gap-3.5 text-xs text-emerald-900">
        <DollarSign className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-sm block mb-1">Do It Yourself & Save Your Money:</strong>
          <p className="leading-relaxed">
            Many private agents charge foreign students €300 to €600 simply to fill out standard government forms and book free appointments. In Latvia, all official PMLP forms are in English and Latvian, and appointments on the <strong>Qticket app</strong> are 100% free!
          </p>
        </div>
      </div>

      {/* Steps Pipeline */}
      <div className="space-y-4 mb-8">
        {VISA_TRP_DATA.map((item) => (
          <div
            key={item.step}
            className="apple-card p-6 flex flex-col sm:flex-row items-start gap-4 hover:border-emerald-300 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0 shadow-xs">
              {item.step}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-base font-bold text-neutral-900">
                  {item.title}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 self-start sm:self-auto">
                  {item.duration}
                </span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Qticket Link Card */}
      <div className="apple-card p-6 border-emerald-200 bg-gradient-to-r from-white to-emerald-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-neutral-900">
            Have questions about your specific documents or police clearance?
          </h4>
          <p className="text-xs text-neutral-600 mt-1">
            Request personal guidance below and we will review your checklist for free.
          </p>
        </div>

        <a
          href="#contact"
          className="px-5 py-2.5 apple-button-primary text-xs font-bold whitespace-nowrap"
        >
          Ask For Free Visa Checklist Help
        </a>
      </div>

    </section>
  );
};
