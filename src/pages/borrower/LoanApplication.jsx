import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

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

// Icon component
function Icon({ name, filled = false, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

// Mobile menu component
function MobileMenu({ isOpen, onClose, onNavigate }) {
  const NAV_LINKS = [
    { icon: "receipt_long", label: "Transactions", path: "/transactions" },
    { icon: "description", label: "Documents", path: "/documents" },
    { icon: "account_balance", label: "My Loans", path: "/borrower-portal/loans" },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <span className="text-2xl font-extrabold tracking-tighter text-slate-900">Loan@</span>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>
        
        <div className="px-6 py-4 mb-4">
          <h2 className="text-lg font-bold text-slate-900">Loan@</h2>
          <p className="text-xs text-tertiary">Premium P2P Lending</p>
        </div>
        
        <nav className="flex flex-col h-full p-4 space-y-2 text-sm">
          {NAV_LINKS.map(({ icon, label, path }) => (
            <button
              key={label}
              onClick={() => {
                onNavigate(path);
                onClose();
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 w-full text-left text-slate-500 hover:bg-slate-100"
            >
              <Icon name={icon} filled={label === "Loan Apply"} />
              {label}
            </button>
          ))}
          
          <div className="mt-auto space-y-2 pb-20">
            <button className="flex items-center gap-3 text-slate-500 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg w-full text-left">
              <Icon name="help_outline" /> Support
            </button>
            <button className="flex items-center gap-3 text-slate-500 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg w-full text-left">
              <Icon name="logout" /> Sign Out
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

// Sidebar component
function SideNav() {
  const navigate = useNavigate();
  
  const NAV_LINKS = [
    { icon: "note_add", label: "Loan Apply", path: "/borrower-portal/apply" },
    { icon: "receipt_long", label: "Transactions", path: "/transactions" },
    { icon: "description", label: "Documents", path: "/documents" },
    { icon: "account_balance", label: "My Loans", path: "/borrower-portal/loans" },
  ];

  return (
    <aside className="bg-slate-50 h-screen w-64 fixed left-0 top-0 hidden lg:flex flex-col border-r border-slate-200/20 pt-20">
      <div className="px-6 py-4 mb-4">
        <h2 className="text-lg font-bold text-slate-900">Loan@</h2>
        <p className="text-xs text-tertiary">Premium P2P Lending</p>
      </div>
      <nav className="flex flex-col h-full p-4 space-y-2 text-sm">
        {NAV_LINKS.map(({ icon, label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 w-full text-left ${
              label === "Loan Apply" 
                ? "bg-white text-sky-800 font-semibold shadow-sm" 
                : "text-slate-500 hover:bg-slate-200/50"
            }`}
          >
            <Icon name={icon} filled={label === "Loan Apply"} />
            {label}
          </button>
        ))}
        <div className="mt-auto space-y-2 pb-4">
          <button className="flex items-center gap-3 text-slate-500 hover:bg-slate-200/50 transition-all px-4 py-3 rounded-lg w-full text-left">
            <Icon name="help_outline" /> Support
          </button>
          <button className="flex items-center gap-3 text-slate-500 hover:bg-slate-200/50 transition-all px-4 py-3 rounded-lg w-full text-left">
            <Icon name="logout" /> Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
}

// Top navigation component
function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-white/85 backdrop-blur-xl text-sky-900 font-medium tracking-tight sticky top-0 z-50 border-b border-slate-200/20 flex justify-between items-center w-full px-4 sm:px-8 py-3">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Icon name="menu" />
          </button>
          
          <span 
            onClick={() => navigate("/dashboard")}
            className="text-xl font-extrabold tracking-tighter text-slate-900 cursor-pointer"
          >
            Loan@
          </span>
          
          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => navigate("/dashboard")}
              className="text-slate-500 hover:text-sky-700 transition-colors"
            >
              Hybrid
            </button>
            <button 
              onClick={() => navigate("/investor-portal")}
              className="text-slate-500 hover:text-sky-700 transition-colors"
            >
              Investor
            </button>
            <button 
              onClick={() => navigate("/borrower-portal")}
              className="text-sky-800 font-bold border-b-2 border-sky-800 pb-1"
            >
              Borrower
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-highest border-none rounded-lg text-sm focus:ring-1 focus:ring-primary w-48 md:w-64"
              placeholder="Search accounts..."
              type="text"
            />
          </div>
          <button className="p-2 hover:bg-slate-100 transition-colors rounded-full relative">
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </button>
          <button className="p-2 hover:bg-slate-100 transition-colors rounded-full hidden sm:block">
            <Icon name="settings" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container ring-1 ring-outline-variant/30 flex items-center justify-center text-on-primary-container text-xs font-bold">
            TL
          </div>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={navigate}
      />
    </>
  );
}

// Bottom navigation component
function BottomNav() {
  const navigate = useNavigate();
  
  const items = [
    { icon: "grid_view", label: "Home", path: "/dashboard" },
    { icon: "account_balance", label: "Investor", path: "/investor-portal" },
    { icon: "payments", label: "Borrower", path: "/borrower-portal", active: true },
    { icon: "person", label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-around items-center py-3 z-40">
      {items.map(({ icon, label, path, active }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-slate-400"}`}
        >
          <Icon name={icon} filled={active} />
          <span className="text-[10px] font-bold">{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function LoanApplication() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [purpose, setPurpose] = useState("Business Expansion");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Submission state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const calc = useMemo(
    () => calculateLoan(parseFloat(amount) || 500000, parseInt(term) || 12),
    [amount, term]
  );

  // --- Validation ---
  function validate() {
    if (!amount || parseFloat(amount) <= 0) return "Please enter a valid loan amount.";
    if (!term || parseInt(term) <= 0) return "Please enter a valid loan term (in months).";
    if (!description.trim()) return "Please provide a loan description.";
    return null;
  }

  // --- Submit handler ---
  async function handleSubmit() {
    setError("");
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!ApiService.isAuthenticated()) {
      setError("You must be logged in to submit a loan request.");
      return;
    }

    const loanData = {
      requestedAmount: parseFloat(amount),
      termMonths: parseInt(term),
      purpose,
      description,
    };

    try {
      setLoading(true);
      await ApiService.requestLoan(loanData);
      setSuccess(true);
      // Clear form on success
      setAmount("");
      setTerm("");
      setPurpose("Business Expansion")
      setDescription("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setAmount("");
    setTerm("");
    setPurpose("Business Expansion");
    setDescription("");
    setError("");
    setSuccess(false);
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      <TopNav />
      <SideNav />

      <main className="lg:ml-64 min-h-screen pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-on-background tracking-tight mb-2">
              Request a New Loan
            </h1>
            <p className="text-tertiary text-lg">
              Your path to secure peer-to-peer financing starts here.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Form */}
            <div className="lg:col-span-8">
              {/* Success Banner */}
              {success && (
                <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-xl">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-bold">Application Submitted!</p>
                    <p className="text-sm mt-0.5">
                      Your loan request has been received. Admins will review it shortly.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {error && (
                <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
                  <span className="text-xl">⚠️</span>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

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
                          disabled={loading}
                          className="w-full h-14 bg-surface-container-highest/30 border-0 rounded-xl px-4 pr-16 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg disabled:opacity-50"
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
                          disabled={loading}
                          className="w-full h-14 bg-surface-container-highest/30 border-0 rounded-xl px-4 pr-10 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none disabled:opacity-50"
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
                        disabled={loading}
                        className="w-full h-14 bg-surface-container-highest/30 border-0 rounded-xl px-4 pr-24 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg disabled:opacity-50"
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
                      disabled={loading}
                      className="w-full bg-surface-container-highest/30 border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg min-h-[120px] resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Footer actions */}
                  <div className="pt-8 flex items-center justify-between">
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="text-tertiary hover:text-error transition-colors font-semibold text-sm disabled:opacity-40"
                    >
                      Cancel Request
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="bg-primary-container text-on-primary-container h-14 px-10 rounded-xl font-bold shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
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
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}