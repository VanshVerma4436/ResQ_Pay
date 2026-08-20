import React from 'react';
import { useResQ } from '../context/ResQContext';
import type { Transaction } from '../types';
import { X, FileText, ShieldCheck } from 'lucide-react';

export const TransactionDetailModal: React.FC = () => {
  const { selectedTransaction, setSelectedTransaction } = useResQ();

  if (!selectedTransaction) return null;

  const tx: Transaction = selectedTransaction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0D121F] border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Transaction Audit Record
                <span className="bg-red-500/20 text-red-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-red-500/30">
                  SIMULATED PAYMENT
                </span>
              </h2>
              <p className="text-xs font-mono text-slate-400">{tx.id}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedTransaction(null)}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Key Facts Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Amount</p>
              <p className="text-xl font-extrabold text-white font-heading mt-0.5">₹{tx.amount.toLocaleString('en-IN')}</p>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Service</p>
              <p className="font-bold text-slate-200 mt-0.5 truncate">{tx.service}</p>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Category</p>
              <p className="font-bold text-slate-200 mt-0.5">{tx.category}</p>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Authorization</p>
              <p className="font-mono text-emerald-400 font-bold mt-0.5">{tx.authorization}</p>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Risk Score</p>
              <p className="font-bold text-emerald-400 mt-0.5">{tx.risk_level} ({tx.risk_score}/100)</p>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Timestamp</p>
              <p className="font-mono text-slate-400 mt-0.5">{tx.date}</p>
            </div>
          </div>

          {/* AI Decision Rationale Box */}
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-4 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              AI Agent Authorization Decision:
            </h4>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              "{tx.ai_decision}"
            </p>
          </div>

          {/* 7-Step Immutable Audit Log Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Immutable Verification Audit Log
            </h4>

            <div className="space-y-2">
              {tx.audit_log.map((logItem, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-slate-300">{logItem}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setSelectedTransaction(null)}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            Close Detail Window
          </button>
        </div>

      </div>
    </div>
  );
};
