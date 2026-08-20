import React from 'react';
import { HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface DecisionExplanationProps {
  amount?: number;
  singleLimit?: number;
  totalLimit?: number;
  providerName?: string;
  reasoning?: string;
}

export const DecisionExplanation: React.FC<DecisionExplanationProps> = ({
  amount = 2800,
  singleLimit = 5000,
  totalLimit = 10000,
  providerName = 'RapidCare Ambulance',
  reasoning
}) => {
  const defaultReasoning = `An emergency event was detected and an ambulance was requested. The selected provider (${providerName}) is verified. The transaction amount of ₹${amount.toLocaleString('en-IN')} is below the user's ₹${singleLimit.toLocaleString('en-IN')} single-transaction limit and ₹${totalLimit.toLocaleString('en-IN')} emergency spending limit. Risk checks passed. Therefore, the transaction qualifies for automatic authorization.`;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-blue-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex items-center gap-2.5 mb-3">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            Why did ResQ Pay authorize this payment?
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              AI Reasoning
            </span>
          </h3>
          <p className="text-[11px] text-slate-400">Transparent & deterministic authorization rationale</p>
        </div>
      </div>

      <blockquote className="bg-slate-950/70 border-l-4 border-blue-500 p-4 rounded-r-xl text-xs text-slate-200 leading-relaxed italic mb-4">
        "{reasoning || defaultReasoning}"
      </blockquote>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2.5 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300 text-[11px]">Provider Registered & Verified</span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2.5 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300 text-[11px]">₹{amount.toLocaleString('en-IN')} ≤ ₹{singleLimit.toLocaleString('en-IN')} Single Ceiling</span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2.5 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300 text-[11px]">Risk Score 12/100 (LOW)</span>
        </div>
      </div>
    </div>
  );
};
