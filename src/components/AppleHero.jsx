import React from 'react';
import { Gift, ShoppingBag, Home, Briefcase, FileCheck, Search, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AppleHero = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
  const { service } = useApp();
  const tabs = [
    { id: 'perks', label: 'Referral Offers', icon: Gift },
    { id: 'groceries', label: 'Groceries', icon: ShoppingBag },
    { id: 'housing', label: 'Housing', icon: Home },
    { id: 'jobs', label: 'Student Jobs', icon: Briefcase },
    { id: 'visa', label: 'Visa & Residence', icon: FileCheck },
  ];
  const notice = service === 'demo'
    ? 'Explore sample offers. Referral codes and help submissions are inactive; no form details are collected.'
    : service === 'live' ? 'Help requests are connected. Sample offers are marked separately from published offers.'
    : service === 'loading' ? 'Connecting to the request service…'
    : 'Help submissions are temporarily unavailable. Refresh the page to reconnect.';

  return (
    <section className="pt-10 pb-7 sm:pt-14 sm:pb-9 text-center w-full min-w-0 max-w-5xl mx-auto px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-medium mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        Your independent Riga student guide
      </div>
      <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.75rem] font-semibold text-neutral-900 tracking-[-0.045em] leading-[1.08]">
        Student life, simplified.
        <span className="block text-emerald-700 mt-1">Welcome to Riga.</span>
      </h1>
      <p className="mt-5 text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
        Find your everyday essentials, explore student opportunities,<br className="hidden sm:block" /> and get a little help feeling at home.
      </p>
      <div className="mt-7 max-w-xl mx-auto relative">
        <Search aria-hidden="true" className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input type="search" aria-label="Search student resources"
          placeholder="Search offers, groceries, housing…"
          value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-neutral-200 rounded-2xl pl-11 pr-16 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
        />
        {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500 hover:text-neutral-900">Clear</button>}
      </div>
      <nav aria-label="Student resource categories" className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const selected = activeTab === tab.id;
          return <button key={tab.id} onClick={() => setActiveTab(tab.id)} aria-pressed={selected}
            className={`min-h-12 flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-[13px] font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${tab.id === 'visa' ? 'col-span-2 sm:col-span-1' : ''} ${selected ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm' : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'}`}>
            <Icon aria-hidden="true" className={`w-4 h-4 shrink-0 ${selected ? 'text-emerald-300' : 'text-neutral-400'}`} /><span>{tab.label}</span>
          </button>;
        })}
      </nav>
      <aside role="status" className="mt-4 rounded-2xl border border-neutral-200/80 bg-white/70 px-4 py-3 text-left flex items-start gap-3">
        <Info aria-hidden="true" className="w-4 h-4 shrink-0 text-neutral-400 mt-0.5" />
        <div className="min-w-0 text-xs leading-relaxed text-neutral-500">
          <p><span className="font-semibold text-neutral-700">{service === 'demo' ? 'Demo preview' : service === 'live' ? 'Request service' : 'Service status'}</span><span className="mx-1.5 text-neutral-300">·</span>{notice}</p>
          <p className="mt-0.5">Confirm current directory and guide details with providers and official sources.</p>
        </div>
      </aside>
    </section>
  );
};
