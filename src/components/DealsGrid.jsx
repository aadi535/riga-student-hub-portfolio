import React from 'react';
import { useApp } from '../context/AppContext';
import { DealCard } from './DealCard';
import { Search, Filter, Layers, CreditCard, Bike, Smartphone } from 'lucide-react';

export const DealsGrid = () => {
  const { deals, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useApp();

  const categories = ['All', 'Banking', 'Courier Work', 'Telecom'];

  const filteredDeals = deals.filter(deal => {
    const matchesCategory = activeCategory === 'All' || deal.category === activeCategory;
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="deals" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Layers className="w-4 h-4" />
              Verified Riga Student Referral Perks
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Available Banking & Job Referral Cashbacks
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select any perk below, complete the quick steps, and receive your cashback directly via Revolut.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Revolut, Wolt, Wise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/10 font-bold'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat === 'Banking' && <CreditCard className="w-3.5 h-3.5 inline mr-1.5" />}
                {cat === 'Courier Work' && <Bike className="w-3.5 h-3.5 inline mr-1.5" />}
                {cat === 'Telecom' && <Smartphone className="w-3.5 h-3.5 inline mr-1.5" />}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Deals Cards Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-2xl border-slate-800">
            <p className="text-slate-400 text-sm">No referral perks match your search query "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 px-4 py-2 bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
