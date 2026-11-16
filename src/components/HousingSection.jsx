import React from 'react';
import { HOUSING_DATA } from '../data/rigaStudentHubData';
import { Home, ExternalLink, AlertTriangle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export const HousingSection = ({ searchQuery }) => {
  const filteredHousing = HOUSING_DATA.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="animate-fadeIn">
      
      {/* Intro Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
          <Home className="w-3.5 h-3.5 text-blue-600" />
          <span>Student Housing & Coliving in Riga</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Where International Students Live in Riga
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Explore student hotels, shared coliving apartments, university dorms, and critical tips on avoiding rental scams.
        </p>
      </div>

      {/* Safety Alert Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <strong className="font-bold block text-sm">Crucial Riga Student Housing Rules:</strong>
          <p>
            1. <strong>Deklarācija (Address Registration):</strong> Ensure the landlord legally agrees to let you declare your address. You need this for your PMLP TRP residency card.
          </p>
          <p>
            2. <strong>Deposit Security:</strong> Never send money through Western Union or crypto to landlords found on Facebook or ss.com without visiting the apartment and verifying the ownership deed (*Zemesgrāmata*).
          </p>
        </div>
      </div>

      {/* Housing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHousing.map((place) => (
          <div
            key={place.id}
            className="apple-card p-6 flex flex-col justify-between hover:border-blue-300/80 transition-all group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                    {place.category}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 mt-0.5 group-hover:text-blue-700 transition-colors">
                    {place.name}
                  </h3>
                </div>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                  {place.badge}
                </span>
              </div>

              {/* Price & Location */}
              <div className="bg-neutral-50 rounded-xl p-3 mb-4 border border-neutral-200/70 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Rent Range:</span>
                  <span className="font-bold text-neutral-900 font-mono">{place.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Location:</span>
                  <span className="text-neutral-700 font-medium">{place.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Included:</span>
                  <span className="text-neutral-700 font-medium truncate max-w-[200px]">{place.included}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {place.description}
              </p>

              {/* Pros & Caution */}
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex items-start gap-2 text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug"><strong>Advantage:</strong> {place.pros}</span>
                </div>

                {place.caution && (
                  <div className="flex items-start gap-2 text-amber-800 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
                    <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug"><strong>Notice:</strong> {place.caution}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Button */}
            <div className="pt-3 border-t border-neutral-100">
              <a
                href={place.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center justify-between group/link"
              >
                <span>Visit Official Website / Listings</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
