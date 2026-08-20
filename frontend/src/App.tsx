import React from 'react';
import { ResQProvider, useResQ } from './context/ResQContext';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { LandingPage } from './components/LandingPage';
import { Overview } from './components/Overview';
import { AgentPanel } from './components/AgentPanel';
import { SecurityArchitecture } from './components/SecurityArchitecture';
import { PolicySettings } from './components/PolicySettings';
import { TrustedContacts } from './components/TrustedContacts';
import { TransactionHistory } from './components/TransactionHistory';
import { EmergencyServices } from './components/EmergencyServices';
import { EmergencySimulationModal } from './components/EmergencySimulationModal';
import { TransactionDetailModal } from './components/TransactionDetailModal';

const AppContent: React.FC = () => {
  const { activeTab } = useResQ();

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans">
        <DemoBanner />
        <Navbar />
        <main className="flex-1">
          <LandingPage />
        </main>
        <ToastContainer />
        <EmergencySimulationModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans">
      <DemoBanner />
      <Navbar />

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'agent' && <AgentPanel />}
          {activeTab === 'safety' && <SecurityArchitecture />}
          {activeTab === 'policy' && <PolicySettings />}
          {activeTab === 'contacts' && <TrustedContacts />}
          {activeTab === 'transactions' && <TransactionHistory />}
          {activeTab === 'services' && <EmergencyServices />}
        </main>
      </div>

      <ToastContainer />
      <EmergencySimulationModal />
      <TransactionDetailModal />
    </div>
  );
};

export function App() {
  return (
    <ResQProvider>
      <AppContent />
    </ResQProvider>
  );
}

export default App;
