import React from 'react';
import { useResQ } from '../context/ResQContext';
import { 
  Bot, 
  Cpu, 
  Radio, 
  Terminal, 
  CheckCircle2, 
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';

export const AgentPanel: React.FC = () => {
  const { agentStatus, agentLogs, triggerEmergencySimulation } = useResQ();

  const capabilities = agentStatus?.capabilities || [
    "Detect emergency requests telemetrically",
    "Understand context & medical necessity",
    "Search & verify registered emergency services",
    "Evaluate pre-approved payment eligibility",
    "Apply spending ceiling & risk policies",
    "Perform real-time fraud & risk scoring",
    "Execute automated simulated payment token",
    "Notify trusted contacts via SMS & Push",
    "Maintain immutable transaction audit logs"
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121824] border border-slate-800/80 p-6 rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-extrabold text-white">Emergency Agent Engine</h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                🟢 ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous reasoning & deterministic execution layer
            </p>
          </div>
        </div>

        <button
          onClick={() => triggerEmergencySimulation()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-red-950/50 transition-all cursor-pointer border border-red-400/30"
        >
          <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>Test Emergency Simulation</span>
        </button>
      </div>

      {/* Grid: Agent Mode & Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Mode & Configuration */}
        <div className="lg:col-span-1 space-y-4">
          
          <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              Agent Configuration
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Agent Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Protection
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Current Mode</span>
                <span className="text-white font-bold">{agentStatus?.mode || 'Emergency Protection'}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Model Engine</span>
                <span className="text-blue-400 font-mono font-semibold">ResQ-Agent-v1 (Deterministic)</span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Verification Engine</span>
                <span className="text-emerald-400 font-semibold">Strict Standard</span>
              </div>
            </div>
          </div>

          <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Core Agent Capabilities
            </h3>
            <ul className="space-y-2 text-xs">
              {capabilities.map((cap, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                  <span className="text-blue-400 font-bold mt-0.5">•</span>
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column (2 spans): Live Telemetry Activity Feed */}
        <div className="lg:col-span-2 bg-[#121824] border border-slate-800/80 rounded-2xl p-5 space-y-4 flex flex-col">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Live Telemetry Activity Feed
              </h3>
              <p className="text-[11px] text-slate-400">Real-time reasoning and execution logs</p>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-mono flex items-center gap-1.5 border border-emerald-500/30">
              <Radio className="w-3 h-3 animate-pulse" />
              STREAMING LOGS
            </span>
          </div>

          <div className="bg-[#090C12] border border-slate-800 rounded-2xl p-4 font-mono text-xs space-y-3 flex-1 max-h-[500px] overflow-y-auto custom-scrollbar">
            {agentLogs.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No logs recorded yet. Click "Test Emergency Simulation" above.
              </div>
            ) : (
              agentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-b border-slate-900 pb-2.5 text-slate-300">
                  <span className="text-slate-500 text-[11px] shrink-0">{log.timestamp}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    log.level === 'ERROR' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-slate-200">{log.message}</span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
