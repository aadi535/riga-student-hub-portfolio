import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, Check, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const RewardCalculator = () => {
  const { deals, setActiveModalDeal } = useApp();
  
  // Default select Revolut and Bolt Courier
  const [selectedDealIds, setSelectedDealIds] = useState(['revolut', 'bolt-courier']);

  const toggleDeal = (id) => {
    if (selectedDealIds.includes(id)) {
      setSelectedDealIds(selectedDealIds.filter(item => item !== id));
    } else {
      setSelectedDealIds([...selectedDealIds, id]);
    }
  };

  const selectedDeals = deals.filter(d => selectedDealIds.includes(d.id));
  const totalCashback = selectedDeals.reduce((sum, d) => sum + d.userCashback, 0);
  const totalRawCommission = selectedDeals.reduce((sum, d) => sum + d.totalReward, 0);

  return (
    <section id="calculator" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card rounded-3xl p-6 sm:p-10 border-emerald-500/20 bg-gradient-to-b from-[#161D2E] to-[#111624] relative overflow-hidden">
          
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Deal Selection Options */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  <Calculator className="w-4 h-4" />
                  Interactive Riga Perk Calculator
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Select What You Need in Riga & Calculate Your Cash Bonus
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Toggle the essentials you plan to set up during your first weeks in Riga.
                </p>
              </div>

              {/* Deal Checkboxes List */}
              <div className="space-y-3">
                {deals.map((deal) => {
                  const isChecked = selectedDealIds.includes(deal.id);
                  return (
                    <div
                      key={deal.id}
                      onClick={() => toggleDeal(deal.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-slate-900/90 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                          : 'bg-slate-900/40 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                          isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-800 text-transparent'
                        }`}>
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            {deal.title}
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                              {deal.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">{deal.shortDesc}</p>
                        </div>
                      </div>

                      <div className="text-right pl-4">
                        <div className="text-sm font-extrabold text-emerald-400 font-mono">
                          +€{deal.userCashback}.00
                        </div>
                        <div className="text-[10px] text-slate-500">Your Bonus</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Earnings Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/90 rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Total Estimated Cashback
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Guaranteed Payout
                  </span>
                </div>

                <div className="my-6 text-center">
                  <div className="text-xs text-slate-400 font-medium">You Will Receive</div>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono my-2 tracking-tight">
                    €{totalCashback}.00
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                    <span>Directly to your Revolut / SEPA account</span>
                  </div>
                </div>

                {/* Transparency Breakdown box */}
                <div className="bg-slate-900/80 rounded-xl p-3.5 mb-6 text-xs space-y-2 border border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Selected Perks ({selectedDeals.length}):</span>
                    <span className="font-semibold text-slate-200">{selectedDeals.length} Services</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Total Partner Commission:</span>
                    <span className="font-mono text-slate-300">€{totalRawCommission}.00</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold pt-1 border-t border-slate-800">
                    <span>Your Share (Cashback):</span>
                    <span className="font-mono">€{totalCashback}.00</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const firstDeal = selectedDeals[0] || deals[0];
                    setActiveModalDeal(firstDeal);
                  }}
                  disabled={selectedDeals.length === 0}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Claim Selected Perks (€{totalCashback})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-slate-500 text-center mt-3 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3 text-slate-400" />
                  Free to sign up. Zero platform fees.
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
