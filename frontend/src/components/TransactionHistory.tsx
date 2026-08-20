import React, { useState } from 'react';
import { useResQ } from '../context/ResQContext';
import { History, Filter, Search, CheckCircle2 } from 'lucide-react';

export const TransactionHistory: React.FC = () => {
  const { transactions, setSelectedTransaction } = useResQ();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Emergency', 'Medicine', 'Transport', 'Failed'];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesCat = 
      filterCategory === 'all' || 
      (filterCategory === 'Failed' && tx.status !== 'SUCCESS') ||
      tx.category.toLowerCase().includes(filterCategory.toLowerCase());

    const matchesSearch = 
      tx.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121824] border border-slate-800/80 p-6 rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <History className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-white">Transaction Audit History</h1>
            <p className="text-xs text-slate-400 mt-1">
              Immutable log of all autonomous and simulated emergency payments
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-[#121824] border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer capitalize shrink-0 ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service or ID..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none transition-colors"
          />
        </div>

      </div>

      {/* Transactions Table */}
      <div className="bg-[#121824] border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 px-5">Date & Time</th>
                <th className="py-4 px-5">Service Provider</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Amount</th>
                <th className="py-4 px-5">Risk Level</th>
                <th className="py-4 px-5">Authorization</th>
                <th className="py-4 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    No transactions match your search filter.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTransaction(tx)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-5 text-slate-400 font-mono text-[11px]">{tx.date}</td>
                    <td className="py-4 px-5 font-bold text-white group-hover:text-blue-400 transition-colors">
                      {tx.service}
                    </td>
                    <td className="py-4 px-5 text-slate-300">{tx.category}</td>
                    <td className="py-4 px-5 font-extrabold text-white font-heading">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-5">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md font-extrabold text-[10px]">
                        {tx.risk_level} ({tx.risk_score}/100)
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-300 font-mono text-[11px]">{tx.authorization}</td>
                    <td className="py-4 px-5 text-right">
                      <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full text-[10px] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
