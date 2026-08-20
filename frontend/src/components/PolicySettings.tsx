import React, { useState, useEffect } from 'react';
import { useResQ } from '../context/ResQContext';
import { Sliders, Save } from 'lucide-react';

export const PolicySettings: React.FC = () => {
  const { policy, updatePolicyData } = useResQ();

  const [spendingLimit, setSpendingLimit] = useState<number>(10000);
  const [maxSingleTx, setMaxSingleTx] = useState<number>(5000);
  const [categories, setCategories] = useState<string[]>([
    "Ambulance",
    "Emergency Transportation",
    "Pharmacy",
    "Hospital Essentials"
  ]);
  const [providerVerification, setProviderVerification] = useState<boolean>(true);
  const [trustedContactApprovalAbove, setTrustedContactApprovalAbove] = useState<number>(5000);
  const [aiPermissionAuto, setAiPermissionAuto] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (policy) {
      setSpendingLimit(policy.spending_limit);
      setMaxSingleTx(policy.max_single_tx);
      if (policy.approved_categories) {
        setCategories(policy.approved_categories);
      }
      setProviderVerification(policy.provider_verification_required);
      setTrustedContactApprovalAbove(policy.trusted_contact_approval_above || 5000);
      setAiPermissionAuto(policy.ai_permission_auto);
    }
  }, [policy]);

  const availableCategories = [
    "Ambulance",
    "Emergency Transportation",
    "Pharmacy",
    "Hospital Essentials",
    "General Shopping"
  ];

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter((c) => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updatePolicyData({
      spending_limit: spendingLimit,
      max_single_tx: maxSingleTx,
      approved_categories: categories,
      provider_verification_required: providerVerification,
      trusted_contact_approval_above: trustedContactApprovalAbove,
      ai_permission_auto: aiPermissionAuto
    });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      
      <div className="flex items-center gap-4 bg-[#121824] border border-slate-800/80 p-6 rounded-3xl">
        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
          <Sliders className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">Emergency Payment Policy</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure autonomous spending ceilings, category pre-approvals, and safety thresholds
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-[#121824] border border-slate-800/80 rounded-3xl p-6 space-y-6">
        
        {/* Spending Limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Emergency Spending Limit (Monthly Cap)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                value={spendingLimit}
                onChange={(e) => setSpendingLimit(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-8 pr-4 py-2.5 text-white font-bold text-sm outline-none transition-colors"
                placeholder="10000"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400">Total emergency budget available per calendar month.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Maximum Single Transaction Limit
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                value={maxSingleTx}
                onChange={(e) => setMaxSingleTx(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-8 pr-4 py-2.5 text-white font-bold text-sm outline-none transition-colors"
                placeholder="5000"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400">Maximum amount permitted for any single emergency transaction.</p>
          </div>
        </div>

        {/* Approved Categories Checkboxes */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Approved Emergency Categories
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableCategories.map((cat) => {
              const isChecked = categories.includes(cat);
              const isDanger = cat === "General Shopping";

              return (
                <label
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all select-none ${
                    isChecked
                      ? isDanger
                        ? 'bg-red-500/10 border-red-500/50 text-red-300'
                        : 'bg-blue-500/10 border-blue-500/50 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded accent-blue-600 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold">{cat}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Toggles & Permissions */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          
          <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-white">Provider Verification Engine</h4>
              <p className="text-[11px] text-slate-400">Require providers to match official emergency registry</p>
            </div>
            <button
              type="button"
              onClick={() => setProviderVerification(!providerVerification)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer p-1 ${
                providerVerification ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${providerVerification ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-white">AI Agent Permission</h4>
              <p className="text-[11px] text-slate-400">Execute automatically within pre-configured limits</p>
            </div>
            <button
              type="button"
              onClick={() => setAiPermissionAuto(!aiPermissionAuto)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer p-1 ${
                aiPermissionAuto ? 'bg-blue-600' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${aiPermissionAuto ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

        </div>

        {/* Save Emergency Policy Button */}
        <div className="pt-4 border-t border-slate-800/80 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-900/40 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save Emergency Policy'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
