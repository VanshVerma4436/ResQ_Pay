import React from 'react';
import { useResQ } from '../context/ResQContext';
import type { EmergencyService } from '../types';
import { Ambulance, Pill, Hospital, Car, CheckCircle2, Clock, Zap, MapPin } from 'lucide-react';

export const EmergencyServices: React.FC = () => {
  const { services, triggerEmergencySimulation } = useResQ();

  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('ambulance')) return Ambulance;
    if (c.includes('pharmacy')) return Pill;
    if (c.includes('hospital')) return Hospital;
    return Car;
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121824] border border-slate-800/80 p-6 rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <Ambulance className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-white">Verified Emergency Services</h1>
            <p className="text-xs text-slate-400 mt-1">
              Registered emergency providers pre-verified for autonomous payments
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Verified Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((svc: EmergencyService) => {
          const Icon = getCategoryIcon(svc.category);

          return (
            <div
              key={svc.id}
              className="bg-[#121824] border border-slate-800/80 hover:border-rose-500/40 rounded-3xl p-5 space-y-4 flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-rose-400 border border-slate-800">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified ✓
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {svc.location}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500 font-medium">Response ETA</span>
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {svc.eta_minutes} mins
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500 font-medium">Estimated Cost</span>
                    <span className="font-extrabold text-white font-heading text-sm">
                      ₹{svc.estimated_cost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500 font-medium">Risk Status</span>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold text-[10px]">
                      {svc.risk_level}
                    </span>
                  </div>
                </div>

              </div>

              {/* Select Service CTA Button */}
              <button
                onClick={() =>
                  triggerEmergencySimulation({
                    location: svc.location,
                    situation: `Emergency Request for ${svc.name}`,
                    patient_status: 'Unable to pay',
                    service_category: svc.category,
                    estimated_cost: svc.estimated_cost,
                  })
                }
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white font-bold text-xs py-2.5 rounded-xl border border-slate-800 hover:border-rose-500 transition-all cursor-pointer shadow-md"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Select Service</span>
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
};
