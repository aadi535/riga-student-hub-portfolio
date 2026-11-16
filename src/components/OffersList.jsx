import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export const OffersList = ({ searchQuery = '' }) => {
  const { offers, setActiveStepOffer, service } = useApp();

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.shortSummary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="offers" className="animate-fadeIn">
      
      {/* Header */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">
            Referral Offers & Terms
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Browse the details before choosing an offer. Rewards depend on provider terms.
          </p>
        </div>

        <div className="text-xs text-neutral-400 flex items-center gap-1 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{service === 'demo' ? 'Sample preview' : service === 'live' ? 'Connected to offer database' : 'Offers unavailable'}</span>
        </div>
      </div>

      {/* Offers Grid */}
      {filteredOffers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              role="button" tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveStepOffer(offer); } }}
              onClick={() => setActiveStepOffer(offer)}
              className="apple-card p-5 sm:p-6 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-2xl shadow-xs">
                      {offer.companyLogo}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        {offer.category}
                      </span>
                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors">
                        {offer.title}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {offer.isSample ? 'Sample — not a live reward' : offer.rewardText}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                  {offer.shortSummary}
                </p>

              </div>

              {/* Bottom Step Trigger Button */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{offer.termsAndSteps.length} Steps · {offer.isSample ? 'Sample' : 'Published'}</span>
                </span>

                <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                  <span>View Steps & Code</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 apple-card p-8 text-neutral-500 text-xs">
          {searchQuery ? `No published offers match "${searchQuery}".` : service === 'live' ? 'No offers have been published yet. Check back after the manager adds verified terms.' : service === 'loading' ? 'Loading offers…' : 'Offers are unavailable until the service reconnects.'}
        </div>
      )}

    </section>
  );
};
