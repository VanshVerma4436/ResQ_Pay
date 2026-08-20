import React from 'react';
import { useResQ } from '../context/ResQContext';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, triggerEmergencySimulation } = useResQ();

  const handleStartDemo = () => {
    setActiveTab('overview');
    triggerEmergencySimulation();
  };

  return (
    <div className="space-y-16 pb-20 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. HERO SECTION */}
      <div className="text-center space-y-6 pt-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-red-400 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          AGENTIC PAYMENTS IDEATHON DEMO PROTOTYPE
        </div>

        <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight leading-none">
          ResQ <span className="text-red-500">Pay</span>
        </h1>

        <p className="text-2xl sm:text-3xl font-heading font-extrabold text-gradient-red max-w-3xl mx-auto leading-tight">
          When you can't make the payment, your trusted agent can.
        </p>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          An AI-powered emergency payment agent that helps execute authorized payments when you are unable to act.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleStartDemo}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-heading font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-red-950/60 hover:shadow-red-600/40 hover:scale-[1.03] transition-all cursor-pointer emergency-glow border border-red-400/30"
          >
            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-pulse" />
            <span>Try Emergency Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-base px-7 py-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            <span>See How It Works</span>
          </button>
        </div>

        {/* Visual Pipeline Banner */}
        <div className="pt-8">
          <div className="bg-[#121824] border border-slate-800/80 rounded-3xl p-6 shadow-2xl max-w-4xl mx-auto">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Autonomous Execution Flow</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              <span className="bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1.5 rounded-xl">🚨 Emergency</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-xl">🤖 AI Agent</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-xl">🔐 Verification</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl">🛡 Safety Engine</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl">💳 Payment</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-xl">📱 Notification</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE PROBLEM */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 max-w-5xl mx-auto space-y-4">
        <div className="p-3 w-fit rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-heading font-extrabold text-white">The Problem</h2>
        <blockquote className="text-xl font-heading font-bold text-red-400 italic">
          "Emergencies don't wait for you to open your payment app."
        </blockquote>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          In road accidents, severe medical episodes, or physical incapacitation, victims are often conscious enough to need immediate medical dispatch or ambulance booking, but physically unable to unlock phones, pass OTPs, or authorize payment gateways.
        </p>
      </div>

      {/* 3. HOW IT WORKS */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-heading font-extrabold text-white">How ResQ Pay Works</h2>
          <p className="text-xs text-slate-400">5-step autonomous protection workflow</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { num: '1', title: 'Configure', desc: 'Set pre-approved limits, categories & trusted guardians.' },
            { num: '2', title: 'Detect', desc: 'Emergency signal or telemetric trigger received.' },
            { num: '3', title: 'Verify', desc: 'Match service against registered emergency providers.' },
            { num: '4', title: 'Authorize', desc: 'Policy & risk engine evaluate eligibility.' },
            { num: '5', title: 'Notify', desc: 'Simulated payment executed & trusted contact alerted.' },
          ].map((item) => (
            <div key={item.num} className="bg-[#121824] border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center">
                {item.num}
              </span>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. IMPORTANT DIFFERENTIATION SECTION (#21) */}
      <div className="bg-gradient-to-br from-slate-900 via-[#121824] to-blue-950/40 border border-blue-500/30 rounded-3xl p-8 max-w-5xl mx-auto space-y-6 shadow-2xl">
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-heading font-black text-white">
            Not another payment app.
          </h2>
          <p className="text-base font-extrabold text-blue-400 font-heading">
            A financial safety net for moments when the user cannot act.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Traditional Payment Apps</th>
                <th className="py-3 px-4 text-blue-400">ResQ Pay Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {[
                ['User must initiate manually', 'Agent can act within pre-authorization policy'],
                ['Manual payment & OTP flow', 'Context-aware autonomous workflow'],
                ['No emergency context', 'Emergency-aware telemetric reasoning'],
                ['User-driven execution', 'Policy-controlled deterministic agent'],
                ['Payment execution only', 'Detection + verification + payment + notification'],
              ].map(([trad, resq], idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400">{trad}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {resq}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
