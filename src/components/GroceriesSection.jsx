import React from 'react';
import { GROCERIES_DATA } from '../data/rigaStudentHubData';
import { ShoppingBag, MapPin, ExternalLink, Check, Sparkles, Lightbulb } from 'lucide-react';

export const GroceriesSection = ({ searchQuery }) => {
  const filteredGroceries = GROCERIES_DATA.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.whatToBuy.some(prod => prod.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section className="animate-fadeIn">
      
      {/* Intro Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
          <span>Verified Riga Student Grocery & Spice Directory</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Where to Buy Groceries & Indian/Asian Spices in Riga
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Everything from affordable everyday supermarkets (Lidl, Maxima) to authentic South Asian and East Asian markets in Riga.
        </p>
      </div>

      {/* Groceries Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGroceries.map((store) => (
          <div
            key={store.id}
            className="apple-card p-6 flex flex-col justify-between hover:border-amber-300/80 transition-all group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    {store.category}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 mt-0.5 group-hover:text-amber-800 transition-colors">
                    {store.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-mono font-bold">
                    {store.priceLevel}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {store.badge}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                <span>{store.address}</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {store.description}
              </p>

              {/* What to buy pill list */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  Top Student Buys:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {store.whatToBuy.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-50 text-neutral-700 border border-neutral-200/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tip Box */}
              {store.tips && (
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{store.tips}</span>
                </div>
              )}
            </div>

            {/* Google Maps Link */}
            <div className="pt-3 border-t border-neutral-100">
              <a
                href={store.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center justify-between group/link"
              >
                <span>Find Location on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
