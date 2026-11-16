import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, CheckCircle2, Clock, DollarSign, ExternalLink, ArrowUpRight, TrendingUp, Users, Check, AlertCircle } from 'lucide-react';

export const AdminDashboard = () => {
  const { claims, deals, updateClaimStep, totalPaidOut, payouts, setIsAdmin } = useApp();

  // Calculate gross revenue and total profit
  const totalGrossRevenue = claims.reduce((sum, claim) => {
    const matchedDeal = deals.find(d => d.id === claim.dealId);
    return sum + (matchedDeal ? matchedDeal.totalReward : 50);
  }, 0);

  const totalNetProfit = totalGrossRevenue - totalPaidOut;

  return (
    <section className="py-12 bg-amber-950/20 border-y border-amber-500/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Alert Header */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-amber-300">
                Site Owner Admin Portal (Verification Dashboard)
              </h2>
              <p className="text-xs text-amber-200/80">
                Review submitted student screenshots, approve cashback payouts, and track your net referral earnings.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdmin(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:text-white text-xs font-bold transition-colors"
          >
            Exit Admin View
          </button>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          
          <div className="glass-card p-5 rounded-2xl border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Gross Partner Commission</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              €{totalGrossRevenue.toFixed(2)}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Total earned from Revolut/Bolt partner programs</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Total Student Cashback Paid</span>
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-400 font-mono">
              €{totalPaidOut.toFixed(2)}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Shared back with international students</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center justify-between text-xs text-amber-300 mb-1 font-bold">
              <span>Your Net Profit Keep</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              €{totalNetProfit.toFixed(2)}
            </div>
            <p className="text-[10px] text-amber-200/60 mt-1">Net profit after student cashback</p>
          </div>

        </div>

        {/* Claims Verification Table */}
        <div className="glass-card rounded-2xl border-slate-800 p-6 overflow-hidden">
          <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
            <span>Submitted Student Referral Proofs</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {claims.length} Total Claims
            </span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Claim ID</th>
                  <th className="py-3 px-4">Student & University</th>
                  <th className="py-3 px-4">Perk & Cashback</th>
                  <th className="py-3 px-4">Revtag / IBAN</th>
                  <th className="py-3 px-4">Proof Image</th>
                  <th className="py-3 px-4">Step Progress</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                      {claim.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{claim.studentName}</div>
                      <div className="text-[10px] text-slate-400">{claim.university} • {claim.email}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-200">{claim.dealTitle}</div>
                      <div className="font-mono font-extrabold text-emerald-400">€{claim.cashbackAmount}.00</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-purple-300">
                      {claim.revtagOrIban}
                    </td>

                    <td className="py-3.5 px-4">
                      {claim.proofUrl ? (
                        <a
                          href={claim.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                        >
                          <span>View Image</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">No proof link</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        claim.currentStep === 4
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : claim.currentStep === 3
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {claim.currentStep === 4 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        Step {claim.currentStep}/4: {claim.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {claim.currentStep < 4 ? (
                        <button
                          onClick={() => updateClaimStep(claim.id, 4)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-emerald-500/20 inline-flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Approve Payout (€{claim.cashbackAmount})</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Payout Sent ⚡
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};
