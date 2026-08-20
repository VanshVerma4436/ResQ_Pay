import React from 'react';
import { useResQ } from '../context/ResQContext';
import { 
  ShieldCheck, 
  Lock, 
  Layers,
  FileCheck
} from 'lucide-react';

export const SecurityArchitecture: React.FC = () => {
  const { policy } = useResQ();

  const flowSteps = [
    { id: 1, label: 'AI Agent', desc: 'Context & Telemetry', color: 'from-blue-600 to-indigo-600' },
    { id: 2, label: 'Intent Analysis', desc: 'Medical Necessity', color: 'from-indigo-600 to-purple-600' },
    { id: 3, label: 'Service Verification', desc: 'Registry Check', color: 'from-purple-600 to-rose-600' },
    { id: 4, label: 'Policy Engine', desc: 'Ceilings & Rules', color: 'from-red-600 to-amber-600' },
    { id: 5, label: 'Risk Engine', desc: 'Score 0-100 Evaluation', color: 'from-amber-600 to-emerald-600' },
    { id: 6, label: 'Payment Auth', desc: 'Token Authorization', color: 'from-emerald-600 to-teal-600' },
    { id: 7, label: 'Payment Gateway', desc: 'Simulated Execution', color: 'from-teal-600 to-blue-600' },
  ];

  const safetyRules = [
    { label: 'Emergency spending limit', value: `₹${(policy?.spending_limit || 10000).toLocaleString('en-IN')}` },
    { label: 'Maximum single transaction', value: `₹${(policy?.max_single_tx || 5000).toLocaleString('en-IN')}` },
    { label: 'Only verified providers', value: 'ON', badge: 'STRICT' },
    { label: 'Trusted emergency categories', value: 'ON', badge: 'ENABLED' },
    { label: 'Risk verification', value: 'ON', badge: 'ACTIVE' },
    { label: 'Trusted contact notification', value: 'ON', badge: 'PUSH & SMS' },
    { label: 'Human override', value: 'ON', badge: 'INSTANT' },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Warning & Vision Card */}
      <div className="bg-gradient-to-r from-red-950/90 via-slate-900 to-[#121824] border-2 border-red-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-extrabold text-xs tracking-wider uppercase">
              <Lock className="w-4 h-4" />
              SAFETY & SECURITY ARCHITECTURE
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              AI DOES NOT HAVE UNRESTRICTED PAYMENT ACCESS.
            </h1>
            
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              ResQ Pay isolates AI reasoning from financial execution through a multi-tier deterministic Safety & Policy Engine. The LLM cannot modify limits, bypass verification, or initiate transfers without passing hardcoded policy constraints.
            </p>
          </div>

          <div className="shrink-0 bg-red-500/10 border border-red-500/30 p-4 rounded-2xl text-center">
            <ShieldCheck className="w-10 h-10 text-red-400 mx-auto mb-1 animate-pulse" />
            <p className="text-xs font-bold text-white">Deterministic Guardrails</p>
            <p className="text-[10px] text-slate-400">Zero Black-Box Transfers</p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Architecture Flowchart */}
      <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            Multi-Stage Financial Safety Pipeline
          </h3>
          <p className="text-[11px] text-slate-400">Sequential verification required for payment token release</p>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
          {flowSteps.map((step) => (
            <div key={step.id} className="relative group">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center space-y-1 hover:border-slate-600 transition-all h-full flex flex-col justify-between">
                <span className="text-[10px] font-mono text-slate-500">STEP 0{step.id}</span>
                <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{step.label}</p>
                <span className="text-[10px] text-slate-400 font-medium">{step.desc}</span>
                <div className={`h-1 w-full rounded-full bg-gradient-to-r ${step.color} mt-2`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Safety Rules Card */}
      <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Active Financial Safety Rules
            </h3>
            <p className="text-[11px] text-slate-400">Strict parameters configured by user</p>
          </div>
          <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
            7 / 7 SAFETY RULES ENFORCED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {safetyRules.map((rule, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">{rule.label}</p>
                <p className="text-base font-extrabold text-white mt-0.5">{rule.value}</p>
              </div>

              {rule.badge && (
                <span className="bg-slate-800 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                  {rule.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
