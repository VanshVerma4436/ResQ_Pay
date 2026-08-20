import React, { useState } from 'react';
import { useResQ } from '../context/ResQContext';
import { Users, UserPlus, Phone, CheckCircle2, Heart, X } from 'lucide-react';

export const TrustedContacts: React.FC = () => {
  const { contacts, addTrustedContact } = useResQ();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Family');
  const [phone, setPhone] = useState<string>('');
  const [isPrimary, setIsPrimary] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    await addTrustedContact({
      name,
      relationship,
      phone,
      is_primary: isPrimary
    });
    setName('');
    setPhone('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121824] border border-slate-800/80 p-6 rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-white">Trusted Emergency Contacts</h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized emergency guardians alerted instantly during autonomous disbursements
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-purple-950/50 transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add Trusted Contact</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id || contact.name}
            className="bg-[#121824] border border-slate-800/80 hover:border-purple-500/40 rounded-3xl p-6 space-y-4 transition-all relative overflow-hidden group shadow-xl"
          >
            {contact.is_primary && (
              <span className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-purple-500/30 uppercase tracking-wider">
                Primary Contact
              </span>
            )}

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {contact.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  {contact.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400" />
                  {contact.relationship}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500 font-medium">Phone Number</span>
                <span className="font-mono font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  {contact.phone}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {contact.status}
                </span>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
              ⚡ Will receive instant SMS & Push notification during emergency disbursements.
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0D121F] border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-400" />
                Add Trusted Contact
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-500"
                >
                  <option value="Family">Family</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Friend">Friend</option>
                  <option value="Doctor">Doctor / Physician</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="primaryCb"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                />
                <label htmlFor="primaryCb" className="text-slate-300 cursor-pointer">Set as Primary Emergency Guardian</label>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2 rounded-xl shadow-lg cursor-pointer"
                >
                  Save Contact
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
