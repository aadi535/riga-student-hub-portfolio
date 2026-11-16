import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RIGA_CITIES } from '../data/rigaStudentHubData';
import { Sparkles, MessageCircle, Settings, ChevronDown } from 'lucide-react';

export const AppleNavbar = () => {
  const { isManagerView, setIsManagerView, helpRequests, manager } = useApp();
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(RIGA_CITIES[0]);

  return (
    <header className="sticky top-0 z-40 apple-nav bg-[#FBFBFD]/90 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & City Selector */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-bold text-base tracking-tight text-neutral-900">
              Riga<span className="text-emerald-600">Student</span>Hub
            </span>
          </a>

          {/* City Selector Pill */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200/70 text-xs font-semibold text-neutral-700 transition-colors border border-neutral-200"
            >
              <span className="text-sm">{selectedCity.flag}</span>
              <span>{selectedCity.name.split(',')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* City Dropdown */}
            {cityDropdownOpen && (
              <div className="absolute top-10 left-0 w-52 bg-white rounded-2xl shadow-xl border border-neutral-200/80 py-2 z-50 animate-fadeIn">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Select Student City
                </div>
                {RIGA_CITIES.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      if (city.active) {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      city.active
                        ? 'hover:bg-neutral-50 text-neutral-900 font-semibold cursor-pointer'
                        : 'text-neutral-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{city.flag}</span>
                      <span>{city.name}</span>
                    </span>
                    {city.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-medium">
                        {city.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          
          <a
            href="#contact"
            aria-label="Request personal help"
            className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Personal Help</span>
          </a>

          {/* Manager Drawer Switch */}
          <button
            onClick={() => setIsManagerView(!isManagerView)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
              isManagerView
                ? 'bg-neutral-900 text-white border-neutral-800'
                : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
            }`}
            aria-label="Open or close site manager" title="Site manager"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manager</span>
            {manager && helpRequests.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-neutral-950 font-bold text-[10px] flex items-center justify-center">
                {helpRequests.length}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
