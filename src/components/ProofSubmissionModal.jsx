import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Upload, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const ProofSubmissionModal = () => {
  const { activeModalDeal, setActiveModalDeal, submitClaim, deals } = useApp();

  const dealToClaim = activeModalDeal || deals[0];

  const [studentName, setStudentName] = useState('');
  const [university, setUniversity] = useState('RTU (Riga Technical Univ)');
  const [email, setEmail] = useState('');
  const [revtagOrIban, setRevtagOrIban] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  if (!activeModalDeal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentName || !email || !revtagOrIban) {
      alert('Please fill out all required fields.');
      return;
    }

    submitClaim({
      studentName,
      university,
      email,
      dealId: dealToClaim.id,
      dealTitle: dealToClaim.title,
      cashbackAmount: dealToClaim.userCashback,
      revtagOrIban,
      proofUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Top Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setActiveModalDeal(null)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Claim €{dealToClaim.userCashback}.00 Cashback
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Submit Completion Proof for <span className="text-emerald-400">{dealToClaim.title}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter your details so we can verify your referral activity and send your cashback.
          </p>
        </div>

        {/* Requirements Reminder Box */}
        <div className="bg-slate-950/70 rounded-xl p-3.5 mb-6 border border-slate-800 text-xs text-slate-300 space-y-1">
          <div className="font-bold text-slate-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Proof Required:
          </div>
          <p className="text-slate-400 text-[11px]">
            {dealToClaim.proofInstructions}
          </p>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Student"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Student Email *
              </label>
              <input
                type="email"
                required
                placeholder="alex@rtu.student.lv"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Riga University *
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option>RTU (Riga Technical Univ)</option>
                <option>RSU (Stradiņš Univ)</option>
                <option>LU (Univ of Latvia)</option>
                <option>RISEBA Univ</option>
                <option>TSI (Transport Telecom)</option>
                <option>Turība Univ</option>
                <option>Other / Language School</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Revolut Revtag or IBAN (For Cashback Payment) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. @alex_riga or LV89HABA..."
              value={revtagOrIban}
              onChange={(e) => setRevtagOrIban(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Proof Screenshot Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="Paste screenshot URL or image link..."
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              * If left blank, a placeholder verification screenshot will be generated for demonstration.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-slate-950" />
              <span>Submit Proof & Start Track (Step 3/4)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
