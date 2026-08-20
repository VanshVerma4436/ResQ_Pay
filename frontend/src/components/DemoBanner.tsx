import React from 'react';
import { useResQ } from '../context/ResQContext';
import { ShieldAlert, RefreshCw, Zap } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { resetDemoData, triggerEmergencySimulation, isSimulating } = useResQ();

  return (
    <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-red-500/30 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md z-40 relative">
      <div className="flex items-center gap-2 text-slate-200 font-medium">
        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
        <span>
          <strong className="text-red-400 font-bold uppercase tracking-wider">Ideathon Prototype:</strong>
          {' '}Agentic Payments Demo Mode • All payments are <strong>SIMULATED</strong> (No real funds transferred).
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => triggerEmergencySimulation()}
          disabled={isSimulating}
          className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-lg border border-red-400/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm text-[11px]"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span>Simulate Emergency</span>
        </button>

        <button
          onClick={resetDemoData}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer text-[11px]"
        >
          <RefreshCw className="w-3 h-3 text-slate-400" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
