import React from 'react';
import { useResQ } from '../context/ResQContext';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Zap, 
  MapPin
} from 'lucide-react';

export const EmergencySimulationModal: React.FC = () => {
  const { 
    simulationModalOpen, 
    setSimulationModalOpen, 
    isSimulating, 
    currentSimStep, 
    simSteps, 
    simResponse 
  } = useResQ();

  if (!simulationModalOpen) return null;

  const isCompleted = currentSimStep >= 8 && !isSimulating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-[#0D121F] border border-red-500/30 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950/90 via-slate-900 to-slate-950 px-6 py-4 border-b border-red-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-extrabold text-white flex items-center gap-2">
                ResQ Pay Emergency Workflow
                <span className="text-[10px] bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded-full border border-red-500/40">
                  REAL-TIME SIMULATION
                </span>
              </h2>
              <p className="text-xs text-slate-400">Autonomous AI Agent Execution</p>
            </div>
          </div>

          <button
            onClick={() => setSimulationModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Emergency Telemetry Card */}
          <div className="bg-slate-900/90 border border-red-500/30 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                🚨 Emergency Telemetry Received
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Timestamp: Just Now</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Location</p>
                <p className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  Mathura, UP
                </p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Situation</p>
                <p className="font-bold text-white mt-0.5">Road Accident</p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Patient Telemetry</p>
                <p className="font-bold text-amber-400 mt-0.5">Unable to Pay</p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Est. Ambulance Cost</p>
                <p className="font-extrabold text-emerald-400 mt-0.5 text-sm">₹2,800</p>
              </div>
            </div>
          </div>

          {/* Vertical Step-by-Step Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Autonomous Agent Decision Steps (8/8)
            </h3>

            <div className="space-y-2.5">
              {simSteps.map((step) => {
                const stepNum = step.step;
                const isCurrent = currentSimStep === stepNum && isSimulating;
                const isPassed = currentSimStep > stepNum || isCompleted;

                return (
                  <div
                    key={stepNum}
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-slate-900 to-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-950/30'
                        : isPassed
                        ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isPassed ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shadow-inner">
                          ✓
                        </div>
                      ) : isCurrent ? (
                        <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/50 flex items-center justify-center">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-500 border border-slate-700 flex items-center justify-center font-bold text-xs">
                          {stepNum}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-300' : isPassed ? 'text-white' : 'text-slate-500'}`}>
                          {step.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">{step.timestamp}</span>
                      </div>
                      <p className={`text-[11px] mt-0.5 ${isCurrent ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                        {step.details}
                      </p>

                      {stepNum === 7 && (isPassed || isCurrent) && (
                        <span className="mt-1 inline-block bg-red-500/20 text-red-400 font-extrabold text-[9px] px-2 py-0.5 rounded border border-red-500/30">
                          SIMULATED PAYMENT (NO REAL FUNDS MOVED)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FINAL SUCCESS STATE CARD */}
          {isCompleted && (
            <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-2xl text-center space-y-4 animate-scale-up">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/60">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div>
                <span className="text-xs font-extrabold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 uppercase tracking-widest">
                  Status: SUCCESS
                </span>
                <h1 className="text-3xl font-heading font-black text-white mt-2">
                  Emergency Payment Completed
                </h1>
                <p className="text-4xl font-extrabold text-emerald-400 font-heading my-1">
                  ₹2,800
                </p>
                <p className="text-sm font-bold text-slate-200">
                  {simResponse?.service_name || 'RapidCare Ambulance'}
                </p>
              </div>

              {/* Verification Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 max-w-xl mx-auto">
                <div className="bg-slate-900/90 p-2 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold flex items-center justify-center gap-1">
                  ✓ Service Verified
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold flex items-center justify-center gap-1">
                  ✓ Policy Approved
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold flex items-center justify-center gap-1">
                  ✓ Risk Check Passed
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold flex items-center justify-center gap-1">
                  ✓ Payment Simulated
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-emerald-500/30 text-emerald-300 font-semibold flex items-center justify-center gap-1 col-span-2 sm:col-span-2">
                  ✓ Trusted Contact Notified ({simResponse?.notified_contact || 'Priya Verma'})
                </div>
              </div>

              {/* Tagline */}
              <div className="pt-3 border-t border-slate-800">
                <p className="text-base font-bold text-slate-100 italic">
                  "When you can't make the payment, your trusted agent can."
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            ResQ Pay Agent Framework v1.0 • Ideathon Prototype
          </p>

          <button
            onClick={() => setSimulationModalOpen(false)}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            {isCompleted ? 'Close Demo Window' : 'Cancel Simulation'}
          </button>
        </div>

      </div>
    </div>
  );
};
