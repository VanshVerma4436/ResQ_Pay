import React from 'react';
import { useResQ } from '../context/ResQContext';
import type { TabType } from '../context/ResQContext';
import { 
  LayoutDashboard, 
  Bot, 
  ShieldCheck, 
  Sliders, 
  Users, 
  History, 
  Ambulance,
  Compass
} from 'lucide-react';

interface SidebarItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useResQ();

  const menuItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'agent', label: 'Emergency Agent', icon: Bot, badge: 'LIVE' },
    { id: 'safety', label: 'Safety Engine', icon: ShieldCheck },
    { id: 'policy', label: 'Payment Policies', icon: Sliders },
    { id: 'contacts', label: 'Trusted Contacts', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: History },
    { id: 'services', label: 'Emergency Services', icon: Ambulance },
    { id: 'landing', label: 'Product Landing', icon: Compass },
  ];

  return (
    <aside className="w-64 bg-[#0B0F17] border-r border-slate-800/80 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-1">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Main Menu</p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer group ${
                isActive
                  ? 'bg-gradient-to-r from-red-600/20 to-blue-600/10 text-white border border-red-500/30 shadow-md shadow-red-950/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-red-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-widest ${
                  isActive ? 'bg-red-500 text-white' : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto p-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 border border-red-500/20 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold text-slate-200">Autonomous Protection</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Monitoring telemetric alerts for authorized emergency conditions.
          </p>
          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80">
            <span>Ceiling: <strong className="text-white">₹10,000</strong></span>
            <span className="text-emerald-400 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
