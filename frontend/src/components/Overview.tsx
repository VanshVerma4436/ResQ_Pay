import React from 'react';
import { useResQ } from '../context/ResQContext';
import { DecisionExplanation } from './DecisionExplanation';
import { 
  ShieldCheck, 
  Wallet, 
  CreditCard, 
  Users, 
  Ambulance, 
  TrendingUp, 
  ArrowRight,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Overview: React.FC = () => {
  const { 
    policy, 
    contacts, 
    services, 
    transactions, 
    triggerEmergencySimulation,
    setSelectedTransaction,
    setActiveTab
  } = useResQ();

  const limit = policy?.spending_limit || 10000;
  const used = policy?.used_this_month || 2450;
  const remaining = Math.max(0, limit - used);
  const usedPercentage = Math.min(100, Math.round((used / limit) * 100));

  const spendingChartData = [
    { day: 'Mon', amount: 0 },
    { day: 'Tue', amount: 1200 },
    { day: 'Wed', amount: 0 },
    { day: 'Thu', amount: 1250 },
    { day: 'Fri', amount: 0 },
    { day: 'Sat', amount: 0 },
    { day: 'Sun', amount: 0 },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Emergency Protection Top Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-[#131B2A] to-red-950/40 border border-red-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                🟢 ACTIVE PROTECTION
              </span>
              <span className="text-xs text-slate-400 font-medium">Policy #EP-001</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Your Emergency Payment Safety Net
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              "Your emergency payment agent is monitoring authorized emergency conditions."
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Mathura, UP Location Telemetry
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                AI Auto-Execute Enabled
              </span>
            </div>
          </div>

          {/* PROMINENT DEMO BUTTON: Simulate Emergency */}
          <div className="shrink-0">
            <button
              onClick={() => triggerEmergencySimulation()}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-heading font-extrabold text-base px-7 py-4 rounded-2xl shadow-xl shadow-red-950/60 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-red-400/40 group emergency-glow"
            >
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-bounce" />
              <span>Simulate Emergency</span>
              <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-red-400/80 font-medium mt-2">
              🚨 Main Ideathon Demo Action (30-sec flow)
            </p>
          </div>

        </div>

        {/* Budget Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Monthly Emergency Spending Limit</span>
              <span className="text-white font-bold">
                ₹{used.toLocaleString('en-IN')} <span className="text-slate-400 font-normal">/ ₹{limit.toLocaleString('en-IN')} ({usedPercentage}%)</span>
              </span>
            </div>
            <div className="w-full h-3 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500 transition-all duration-500"
                style={{ width: `${usedPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="text-right bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Remaining Budget</p>
            <p className="text-lg font-bold text-emerald-400 font-heading">₹{remaining.toLocaleString('en-IN')}</p>
          </div>
        </div>

      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Emergency Limit</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-heading font-extrabold text-white">₹{limit.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-slate-400">Pre-authorized cap</p>
        </div>

        <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Used This Month</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-heading font-extrabold text-amber-400">₹{used.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-slate-400">Simulated transactions</p>
        </div>

        <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Remaining</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-heading font-extrabold text-emerald-400">₹{remaining.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-slate-400">Available emergency fund</p>
        </div>

        <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Trusted Contacts</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-heading font-extrabold text-white">{contacts.length || 2}</p>
          <p className="text-[10px] text-emerald-400 font-medium">All Verified ✓</p>
        </div>

        <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Verified Services</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Ambulance className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-heading font-extrabold text-white">{services.length || 8}</p>
          <p className="text-[10px] text-slate-400">Ambulance, Hospital, RX</p>
        </div>

      </div>

      {/* 3. Main Grid: Analytics & Decision Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Spending Analytics Chart */}
        <div className="lg:col-span-2 bg-[#121824] border border-slate-800/80 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                Emergency Spend Velocity
              </h3>
              <p className="text-[11px] text-slate-400">Simulated emergency disbursements past 7 days</p>
            </div>
            <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
              August 2026
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingChartData}>
                <defs>
                  <linearGradient id="spendColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`₹${val}`, 'Spent']}
                />
                <Area type="monotone" dataKey="amount" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#spendColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: AI Decision Explanation Card */}
        <div className="lg:col-span-1">
          <DecisionExplanation 
            amount={2800}
            singleLimit={policy?.max_single_tx || 5000}
            totalLimit={policy?.spending_limit || 10000}
            providerName="RapidCare Ambulance"
          />
        </div>

      </div>

      {/* 4. Recent Emergency Transactions */}
      <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Recent Emergency Transactions
            </h3>
            <p className="text-[11px] text-slate-400">Autonomous execution log</p>
          </div>
          <button
            onClick={() => setActiveTab('transactions')}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Service</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">Risk Level</th>
                <th className="pb-3 px-3">Authorization</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {transactions.slice(0, 4).map((tx) => (
                <tr 
                  key={tx.id} 
                  onClick={() => setSelectedTransaction(tx)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{tx.date}</td>
                  <td className="py-3 px-3 font-semibold text-white">{tx.service}</td>
                  <td className="py-3 px-3 text-slate-300">{tx.category}</td>
                  <td className="py-3 px-3 font-bold text-white">₹{tx.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md font-extrabold text-[10px]">
                      {tx.risk_level} ({tx.risk_score}/100)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{tx.authorization}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded text-[10px]">
                      {tx.status}
                    </span>
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
