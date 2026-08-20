import React from 'react';
import { useResQ } from '../context/ResQContext';
import { Shield, Bell, User, LayoutDashboard, Compass, CheckCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, agentStatus } = useResQ();

  const isLanding = activeTab === 'landing';

  return (
    <header className="bg-[#0B0F17]/90 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-rose-600 p-0.5 shadow-lg shadow-red-950/40 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500 fill-red-500/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">ResQ</span>
              <span className="font-heading font-bold text-xl text-red-500">Pay</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">AI EMERGENCY PAYMENT AGENT</p>
          </div>
        </div>

        {/* Center Badge: Emergency Agent Status */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-emerald-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500"></span>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            Emergency Agent: <span className="text-white font-bold">{agentStatus?.status || 'Active'}</span>
          </span>
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
        </div>

        {/* Right Navigation / Controls */}
        <div className="flex items-center gap-3">
          
          {/* Landing vs Dashboard Toggle Button */}
          <button
            onClick={() => setActiveTab(isLanding ? 'overview' : 'landing')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isLanding
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isLanding ? (
              <>
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Dashboard</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span>Landing Page</span>
              </>
            )}
          </button>

          {/* Notifications Bell */}
          <button 
            onClick={() => setActiveTab('agent')}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 relative cursor-pointer transition-colors"
            title="View Agent Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Avatar */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-white leading-none">Vansh Verma</p>
              <p className="text-[10px] text-slate-400 leading-tight">Protected</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
