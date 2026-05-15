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

/* ─────────────────────────────────────────────
   Shared nav styles — mirrors BorrowerDashboard
───────────────────────────────────────────── */
const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0f2240;
    --navy-light: #1a3560;
    --accent: #e8622a;
    --accent-hover: #d4551f;
    --bg: #f0f3f8;
    --card: #ffffff;
    --text: #0f2240;
    --muted: #7a8aaa;
    --border: #dde3ef;
    --green: #2eb87e;
    --sidebar-w: 220px;
    --gold: #e67e22;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.07);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
    --radius: 14px;
    --radius-sm: 8px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }

  /* ── APP WRAP ── */
  .app-wrap { display: flex; flex-direction: column; min-height: 100vh; }

  /* ── TOP NAV ── */
  .topnav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 60px; background: #fff;
    border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100;
  }
  .topnav-logo { font-size: 1.25rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .topnav-logo span { color: var(--accent); }
  .topnav-links { display: flex; gap: 32px; }
  .topnav-links button {
    font-size: 0.875rem; font-weight: 500; color: var(--muted);
    background: none; border: none; cursor: pointer; transition: color 0.2s;
    padding-bottom: 2px;
  }
  .topnav-links button.active { color: var(--navy); border-bottom: 2px solid var(--navy); font-weight: 600; }
  .topnav-links button:hover { color: var(--navy); }
  .topnav-right { display: flex; align-items: center; gap: 16px; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border);
    background: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--navy); transition: background 0.2s;
  }
  .icon-btn:hover { background: var(--bg); }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--navy); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.8rem; font-weight: 600; cursor: pointer; }

  /* ── LAYOUT ── */
  .layout { display: flex; flex: 1; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: var(--sidebar-w); background: #f8fafc; border-right: 1px solid var(--border);
    display: flex; flex-direction: column; padding: 28px 0; position: sticky;
    top: 60px; height: calc(100vh - 60px); overflow-y: auto;
  }
  .sidebar-brand { padding: 0 24px 28px; border-bottom: 1px solid var(--border); }
  .sidebar-brand-name { font-weight: 700; font-size: 0.95rem; color: var(--navy); letter-spacing: -0.3px; }
  .sidebar-brand-name span { color: var(--accent); }
  .sidebar-brand-sub { font-size: 0.7rem; font-weight: 500; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
  .sidebar-nav { padding: 20px 12px; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 14px;
    border-radius: 10px; cursor: pointer; font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.5px; text-transform: uppercase; color: var(--muted);
    transition: all 0.18s; margin-bottom: 4px; border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: #e2e8f0; color: var(--navy); }
  .nav-item.active { background: var(--navy); color: #fff; }
  .nav-item svg { flex-shrink: 0; }
  .sidebar-footer { padding: 20px 16px; }
  .support-btn {
    width: 100%; padding: 12px; background: var(--navy); color: #fff;
    border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .support-btn:hover { background: var(--navy-light); }

  /* ── MOBILE SIDEBAR TOGGLE ── */
  .mobile-menu-btn {
    display: none; background: none; border: 1px solid var(--border); border-radius: 8px;
    padding: 6px 10px; cursor: pointer; color: var(--navy);
  }
  .mobile-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200;
  }
  .mobile-overlay.open { display: block; }

  /* ── MAIN ── */
  .main-content {
    flex: 1; padding: 40px 36px; overflow-x: hidden; padding-bottom: 80px;
    min-width: 0;
  }

  /* ── BOTTOM NAV ── */
  .bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
    border-top: 1px solid var(--border);
    justify-content: space-around; align-items: center;
    padding: 8px 0; z-index: 40;
  }
  .bottom-nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 500;
    color: var(--muted); transition: color 0.2s;
  }
  .bottom-nav-item.active { color: var(--green); }
  .bottom-nav-item svg { width: 20px; height: 20px; }

  /* ── FORM / PAGE STYLES ── */
  .page-header { margin-bottom: 32px; }
  .page-title { font-size: 2rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .page-subtitle { font-size: 0.9rem; color: var(--muted); margin-top: 6px; }

  .form-grid { display: grid; grid-template-columns: 1fr 320px; gap: 32px; align-items: start; }

  .form-card {
    background: #fff; border-radius: var(--radius); border: 1px solid var(--border);
    box-shadow: var(--shadow-sm); overflow: hidden;
  }
  .form-body { padding: 36px; display: flex; flex-direction: column; gap: 28px; }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field-label {
    font-size: 0.75rem; font-weight: 700; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.8px;
  }
  .field-wrap { position: relative; }
  .field-input, .field-select, .field-textarea {
    width: 100%; padding: 14px 16px; background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    font-weight: 500; color: var(--navy); transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .field-input:focus, .field-select:focus, .field-textarea:focus {
    border-color: var(--navy); box-shadow: 0 0 0 3px rgba(15,34,64,0.08);
  }
  .field-input:disabled, .field-select:disabled, .field-textarea:disabled { opacity: 0.5; cursor: not-allowed; }
  .field-suffix {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    font-size: 0.78rem; font-weight: 700; color: var(--muted); pointer-events: none;
  }
  .field-input.has-suffix { padding-right: 64px; }
  .field-select { appearance: none; cursor: pointer; padding-right: 36px; }
  .select-arrow {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: var(--muted); font-size: 0.85rem;
  }
  .field-textarea { min-height: 120px; resize: vertical; }

  .form-actions {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 8px; border-top: 1px solid var(--border);
  }
  .cancel-btn {
    background: none; border: none; font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; font-weight: 600; color: var(--muted);
    cursor: pointer; transition: color 0.2s; padding: 0;
  }
  .cancel-btn:hover { color: #c0392b; }
  .submit-btn {
    display: flex; align-items: center; gap: 8px;
    background: var(--accent); color: #fff; border: none; border-radius: 10px;
    padding: 13px 28px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 700; cursor: pointer;
    transition: all 0.2s; box-shadow: 0 4px 12px rgba(232,98,42,0.2);
  }
  .submit-btn:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(232,98,42,0.3); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .spinner {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Banners */
  .banner {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 16px 20px; border-radius: 10px; margin-bottom: 20px;
  }
  .banner-success { background: #f0faf5; border: 1px solid #a7e3c4; color: #1a6b46; }
  .banner-error   { background: #fdf2f2; border: 1px solid #f5aaaa; color: #b91c1c; }
  .banner-icon { font-size: 1.2rem; flex-shrink: 0; }
  .banner-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; }
  .banner-text  { font-size: 0.82rem; line-height: 1.5; }

  /* Trust badges */
  .trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
  .trust-card {
    background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; display: flex; gap: 14px; align-items: flex-start; box-shadow: var(--shadow-sm);
  }
  .trust-icon {
    font-size: 1.4rem; width: 44px; height: 44px; border-radius: 10px;
    background: var(--bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .trust-title { font-size: 0.88rem; font-weight: 700; color: var(--navy); }
  .trust-text  { font-size: 0.78rem; color: var(--muted); margin-top: 3px; line-height: 1.5; }

  /* Calculator */
  .calc-card {
    background: var(--navy); border-radius: var(--radius); padding: 28px;
    color: #fff; position: relative; overflow: hidden; box-shadow: var(--shadow-md);
  }
  .calc-blob {
    position: absolute; right: -48px; bottom: -48px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(255,255,255,0.04); pointer-events: none;
  }
  .calc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
  .calc-icon { font-size: 1.3rem; }
  .calc-title { font-size: 0.9rem; font-weight: 700; letter-spacing: -0.2px; }
  .calc-monthly-label {
    font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.2px; color: rgba(255,255,255,0.55); margin-bottom: 6px;
  }
  .calc-monthly-value { font-size: 2.4rem; font-weight: 800; letter-spacing: -1.5px; line-height: 1; }
  .calc-monthly-value span { font-size: 1rem; font-weight: 500; opacity: 0.7; margin-left: 4px; }
  .calc-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 20px 0; }
  .calc-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .calc-stat-label {
    font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: rgba(255,255,255,0.5); margin-bottom: 4px;
  }
  .calc-stat-value { font-size: 0.88rem; font-weight: 700; font-family: 'DM Mono', monospace; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .form-grid { grid-template-columns: 1fr; }
    .trust-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .sidebar {
      position: fixed; left: -240px; top: 0; height: 100vh; z-index: 300;
      transition: left 0.3s ease; padding-top: 70px;
    }
    .sidebar.open { left: 0; }
    .mobile-menu-btn { display: block; }
    .topnav { padding: 0 16px; }
    .topnav-links { display: none; }
    .main-content { padding: 20px 16px; padding-bottom: 80px; }
    .field-row { grid-template-columns: 1fr; }
    .trust-grid { grid-template-columns: 1fr; }
    .page-title { font-size: 1.5rem; }
    .bottom-nav { display: flex; }
  }
`;

/* ─────────────────────────────────────────────
   Icon component (SVG, same as BorrowerDashboard)
───────────────────────────────────────────── */
const Icon = ({ name, size = 18 }) => {
  const icons = {
    dashboard:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    loans:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
    "my-loans": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
    payments:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    documents:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
    bell:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    menu:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    grid_view:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    account_balance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    person:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    plus:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  };
  return icons[name] || null;
};

/* ── Nav data (same as BorrowerDashboard) ── */
const navItems = [
  { id: "dashboard", label: "BORROWER VIEW",    icon: "dashboard",  path: "/borrower-portal" },
  { id: "myLoans",   label: "MY LOANS",         icon: "my-loans",   path: "/my-loans" },
  { id: "apply",     label: "Apply for a loan", icon: "loans",      path: "/loan-apply" },
  { id: "payments",  label: "Payments",         icon: "payments",   path: "/borrower-portal/payments" },
  { id: "documents", label: "Documents",        icon: "documents",  path: "/borrower-portal/documents" },
];

const bottomNavItems = [
  { icon: "grid_view",       label: "Hybrid",  path: "/dashboard" },
  { icon: "account_balance", label: "Invest",  path: "/investor-portal" },
  { icon: "payments",        label: "Borrow",  path: "/borrower-portal", active: true },
  { icon: "person",          label: "Profile", path: "/profile" },
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function LoanApplication() {
  const [amount, setAmount]           = useState("");
  const [term, setTerm]               = useState("");
  const [purpose, setPurpose]         = useState("Business Expansion");
  const [description, setDescription] = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const calc = useMemo(
    () => calculateLoan(parseFloat(amount) || 500000, parseInt(term) || 12),
    [amount, term]
  );

  function validate() {
    if (!amount || parseFloat(amount) <= 0)  return "Please enter a valid loan amount.";
    if (!term   || parseInt(term)   <= 0)    return "Please enter a valid loan term (in months).";
    if (!description.trim())                 return "Please provide a loan description.";
    return null;
  }

  async function handleSubmit() {
    setError(""); setSuccess(false);
    const ve = validate();
    if (ve) { setError(ve); return; }
    if (!ApiService.isAuthenticated()) { setError("You must be logged in to submit a loan request."); return; }
    try {
      setLoading(true);
      await ApiService.requestLoan({ requestedAmount: parseFloat(amount), termMonths: parseInt(term), purpose, description });
      setSuccess(true);
      setAmount(""); setTerm(""); setPurpose("Business Expansion"); setDescription("");
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setAmount(""); setTerm(""); setPurpose("Business Expansion");
    setDescription(""); setError(""); setSuccess(false);
  }

  const handleNavigation = (path) => { navigate(path); setSidebarOpen(false); };

  return (
    <>
      <style>{navStyles}</style>
      <div className="app-wrap">

        {/* ── TOP NAV ── */}
        <nav className="topnav">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Icon name="menu" size={16} />
            </button>
            <div className="topnav-logo">Loan<span>@</span></div>
          </div>
          <div className="topnav-links">
            <button onClick={() => navigate("/dashboard")}>Hybrid</button>
            <button onClick={() => navigate("/investor-portal")}>Investor</button>
            <button className="active" onClick={() => navigate("/borrower-portal")}>Borrower</button>
          </div>
          <div className="topnav-right">
            <button className="icon-btn"><Icon name="bell" size={16} /></button>
            <div className="avatar">TL</div>
          </div>
        </nav>

        <div className="layout">

          {/* MOBILE OVERLAY */}
          <div className={`mobile-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

          {/* ── SIDEBAR — "apply" is active ── */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-brand">
              <div className="sidebar-brand-name">LOAN<span>@</span></div>
              <div className="sidebar-brand-sub">Borrower Portal</div>
            </div>
            <nav className="sidebar-nav">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${item.id === "apply" ? "active" : ""}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="sidebar-footer">
              <button className="support-btn">Get Support</button>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="main-content">

            <div className="page-header">
              <h1 className="page-title">Request a New Loan</h1>
              <p className="page-subtitle">Your path to secure peer-to-peer financing starts here.</p>
            </div>

            <div className="form-grid">

              {/* ── LEFT: FORM ── */}
              <div>
                {success && (
                  <div className="banner banner-success">
                    <span className="banner-icon">✅</span>
                    <div>
                      <div className="banner-title">Application Submitted!</div>
                      <div className="banner-text">Your loan request has been received. Admins will review it shortly.</div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="banner banner-error">
                    <span className="banner-icon">⚠️</span>
                    <div className="banner-text">{error}</div>
                  </div>
                )}

                <div className="form-card">
                  <div className="form-body">

                    {/* Amount + Purpose */}
                    <div className="field-row">
                      <div className="field">
                        <label className="field-label">Amount Requested (FCFA)</label>
                        <div className="field-wrap">
                          <input
                            type="number"
                            className="field-input has-suffix"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="e.g. 500,000"
                            disabled={loading}
                          />
                          <span className="field-suffix">FCFA</span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="field-label">Loan Purpose</label>
                        <div className="field-wrap">
                          <select
                            className="field-select"
                            value={purpose}
                            onChange={e => setPurpose(e.target.value)}
                            disabled={loading}
                          >
                            <option>Business Expansion</option>
                            <option>Education/Tuition</option>
                            <option>Medical Expenses</option>
                            <option>Home Improvement</option>
                            <option>Personal/Other</option>
                          </select>
                          <span className="select-arrow">▾</span>
                        </div>
                      </div>
                    </div>

                    {/* Term */}
                    <div className="field">
                      <label className="field-label">Desired Term</label>
                      <div className="field-wrap">
                        <input
                          type="number"
                          min="1"
                          className="field-input has-suffix"
                          value={term}
                          onChange={e => setTerm(e.target.value)}
                          placeholder="e.g. 12"
                          disabled={loading}
                          style={{ paddingRight: 80 }}
                        />
                        <span className="field-suffix">Months</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="field">
                      <label className="field-label">Loan Description</label>
                      <textarea
                        className="field-textarea"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Tell us more about how you plan to use this loan..."
                        disabled={loading}
                      />
                    </div>

                    {/* Actions */}
                    <div className="form-actions">
                      <button className="cancel-btn" onClick={handleCancel} disabled={loading}>
                        Cancel Request
                      </button>
                      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? <><span className="spinner" /> Submitting...</> : "Submit Application"}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Trust badges */}
                <div className="trust-grid">
                  <div className="trust-card">
                    <div className="trust-icon">🔒</div>
                    <div>
                      <div className="trust-title">Secure Application</div>
                      <div className="trust-text">Your data is encrypted using banking-grade protocols.</div>
                    </div>
                  </div>
                  <div className="trust-card">
                    <div className="trust-icon">⚡</div>
                    <div>
                      <div className="trust-title">Rapid Matching</div>
                      <div className="trust-text">Lenders typically respond to verified requests within 24 hours.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: CALCULATOR ── */}
              <div className="calc-card">
                <div className="calc-blob" />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="calc-header">
                    <span className="calc-icon">🧮</span>
                    <span className="calc-title">Loan Calculator</span>
                  </div>
                  <div className="calc-monthly-label">Estimated Monthly Payment</div>
                  <div className="calc-monthly-value">
                    {fmt(calc.monthly)} <span>FCFA</span>
                  </div>
                  <div className="calc-divider" />
                  <div className="calc-stats">
                    <div>
                      <div className="calc-stat-label">Interest Rate</div>
                      <div className="calc-stat-value">12% APR</div>
                    </div>
                    <div>
                      <div className="calc-stat-label">Total Interest</div>
                      <div className="calc-stat-value">{fmt(calc.totalInterest)}</div>
                    </div>
                    <div>
                      <div className="calc-stat-label">Total Repayment</div>
                      <div className="calc-stat-value">{fmt(calc.totalRepayment)}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>

        {/* ── BOTTOM NAV ── */}
        <nav className="bottom-nav">
          {bottomNavItems.map(item => (
            <button
              key={item.label}
              className={`bottom-nav-item ${item.active ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </>
  );
}