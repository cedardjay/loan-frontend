import { useState, useMemo } from "react";

const ANNUAL_RATE = 0.12;

function calculateLoan(principal, months) {
  if (!principal || !months) return { monthly: 0, totalInterest: 0, totalRepayment: 0 };
  const r = ANNUAL_RATE / 12;
  const monthly =
    r === 0
      ? principal / months
      : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalRepayment = monthly * months;
  const totalInterest = totalRepayment - principal;
  return {
    monthly: Math.round(monthly),
    totalInterest: Math.round(totalInterest),
    totalRepayment: Math.round(totalRepayment),
  };
}

function fmt(n) {
  return n.toLocaleString();
}

export default function LoanApplication() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [purpose, setPurpose] = useState("Business Expansion");
  const [description, setDescription] = useState("");

  const calc = useMemo(
    () => calculateLoan(parseFloat(amount) || 500000, parseInt(term) || 12),
    [amount, term]
  );

  return (
    <div className="min-h-screen bg-surface text-on-background font-body">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/20 shadow-sm">
        <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
          <span className="text-xl font-extrabold text-slate-900 tracking-tighter">Loan@</span>
        </div>
      </header>

      {/* Main */}
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-8">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-on-background tracking-tight mb-2">
              Request a New Loan
            </h1>
            <p className="text-tertiary text-lg">
              Your path to secure peer-to-peer financing starts here.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
            <div className="p-10 space-y-8">
              {/* Amount + Purpose */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-on-surface-variant tracking-tight">
                    Amount Requested (FCFA)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 500,000"
                      className="w-full h-14 bg-surface-container-highest/30 border-0 rounded-xl px-4 pr-16 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg"
                    />
                    <span className="absolute right-4 top-4 text-outline font-bold text-sm">FCFA</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-on-surface-variant tracking-tight">
                    Loan Purpose
                  </label>
                  <div className="relative">
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full h-14 bg-surface-container-highest/30 border-0 rounded-xl px-4 pr-10 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                    >
                      <option>Business Expansion</option>
                      <option>Education/Tuition</option>
                      <option>Medical Expenses</option>
                      <option>Home Improvement</option>
                      <option>Personal/Other</option>
                    </select>
                    <span className="absolute right-4 top-4 text-outline pointer-events-none text-lg">▾</span>
                  </div>
                </div>
              </div>

              {/* Term */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant tracking-tight">
                  Desired Term
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="e.g. 12"
                    className="w-full h-14 bg-surface-container-highest/30 border-0 rounded-xl px-4 pr-24 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg"
                  />
                  <span className="absolute right-4 top-4 text-outline font-bold text-sm">Months</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant tracking-tight">
                  Loan Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more about how you plan to use this loan..."
                  className="w-full bg-surface-container-highest/30 border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg min-h-[120px] resize-none"
                />
              </div>

              {/* Footer actions */}
              <div className="pt-8 flex items-center justify-between">
                <button className="text-tertiary hover:text-error transition-colors font-semibold text-sm">
                  Cancel Request
                </button>
                <button className="bg-primary-container text-on-primary-container h-14 px-10 rounded-xl font-bold shadow-md hover:brightness-110 active:scale-95 transition-all">
                  Submit Application
                </button>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 flex gap-4 items-start">
              <span className="text-2xl p-3 bg-primary/5 rounded-lg">🔒</span>
              <div>
                <h4 className="font-bold text-on-surface">Secure Application</h4>
                <p className="text-sm text-tertiary mt-1">
                  Your data is encrypted using banking-grade protocols.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 flex gap-4 items-start">
              <span className="text-2xl p-3 bg-secondary/5 rounded-lg">⚡</span>
              <div>
                <h4 className="font-bold text-on-surface">Rapid Matching</h4>
                <p className="text-sm text-tertiary mt-1">
                  Lenders typically respond to verified requests within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Calculator */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-primary text-on-primary p-8 rounded-xl relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-primary-container text-xl">🧮</span>
                <h3 className="font-bold tracking-tight">Loan Calculator</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-on-primary/60 text-xs font-bold uppercase tracking-widest block mb-1">
                    Estimated Monthly Payment
                  </span>
                  <div className="text-4xl font-extrabold tracking-tighter">
                    {fmt(calc.monthly)}{" "}
                    <span className="text-lg opacity-80 font-medium">FCFA</span>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-on-primary/60 text-[10px] font-bold uppercase tracking-widest block">
                      Interest Rate
                    </span>
                    <span className="font-bold">12% APR</span>
                  </div>
                  <div>
                    <span className="text-on-primary/60 text-[10px] font-bold uppercase tracking-widest block">
                      Total Interest
                    </span>
                    <span className="font-bold">{fmt(calc.totalInterest)} FCFA</span>
                  </div>
                  <div>
                    <span className="text-on-primary/60 text-[10px] font-bold uppercase tracking-widest block">
                      Total Repayment
                    </span>
                    <span className="font-bold">{fmt(calc.totalRepayment)} FCFA</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Texture */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-32 bg-slate-50 border-t border-slate-200/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
          <div>
            <span className="text-lg font-bold text-slate-800 tracking-tighter">Loan@</span>
            <p className="text-sm text-slate-500 mt-1">
              © 2024 Fiscal Sanctuary. Licensed P2P Lending Platform.
            </p>
          </div>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Risk Disclosure", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-slate-500 hover:text-sky-700 transition-colors underline decoration-sky-800/30 underline-offset-4"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-lg border-t border-slate-200/20 z-50">
        {[
          { label: "My Loans", icon: "💼", active: true },
          { label: "Invest", icon: "📈", active: false },
          { label: "Profile", icon: "👤", active: false },
          { label: "Settings", icon: "⚙️", active: false },
        ].map(({ label, icon, active }) => (
          <a
            key={label}
            href="#"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all text-xs font-semibold uppercase tracking-widest ${
              active ? "bg-sky-50 text-sky-800" : "text-slate-400 hover:text-sky-700"
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
