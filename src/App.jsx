import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppleNavbar } from './components/AppleNavbar';
import { AppleHero } from './components/AppleHero';
import { OffersList } from './components/OffersList';
import { GroceriesSection } from './components/GroceriesSection';
import { HousingSection } from './components/HousingSection';
import { JobsSection } from './components/JobsSection';
import { VisaGuideSection } from './components/VisaGuideSection';
import { OfferStepModal } from './components/OfferStepModal';
import { StudentContactForm } from './components/StudentContactForm';
import { SimpleTrustBadge } from './components/SimpleTrustBadge';
import { ManagerPanel } from './components/ManagerPanel';
import { AppleFooter } from './components/AppleFooter';
import { CheckCircle2 } from 'lucide-react';

const MainApp = () => {
  const { toast } = useApp();
  const [activeTab, setActiveTab] = useState('perks'); // 'perks' | 'groceries' | 'housing' | 'jobs' | 'visa'
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFD] text-[#1D1D1F] relative selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-fadeIn">
          <div className="bg-neutral-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-neutral-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Navbar with City Selector & Manager Mode */}
      <AppleNavbar />

      {/* Manager Panel Drawer */}
      <ManagerPanel />

      {/* Hero Section with Search and Segmented Control Tabs */}
      <AppleHero
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Tabbed Content Area */}
      <main className="flex-grow max-w-5xl mx-auto px-4 w-full mb-12">
        {activeTab === 'perks' && (
          <OffersList searchQuery={searchQuery} />
        )}

        {activeTab === 'groceries' && (
          <GroceriesSection searchQuery={searchQuery} />
        )}

        {activeTab === 'housing' && (
          <HousingSection searchQuery={searchQuery} />
        )}

        {activeTab === 'jobs' && (
          <JobsSection
            searchQuery={searchQuery}
            onSelectPerkTab={() => setActiveTab('perks')}
          />
        )}

        {activeTab === 'visa' && (
          <VisaGuideSection />
        )}

        {/* Universal Student 1-on-1 Assistance Form */}
        <StudentContactForm />

        {/* Trust & FAQ */}
        <SimpleTrustBadge />
      </main>

      {/* Offer Step Overlay Modal */}
      <OfferStepModal />

      {/* Footer */}
      <AppleFooter />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
