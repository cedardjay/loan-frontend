import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0e2140;
    --navy-2: #163059;
    --navy-3: #1e3f70;
    --green: #00a878;
    --green-light: #e6f7f3;
    --green-text: #007a57;
    --accent: #e8622a;
    --bg: #f2f5fa;
    --card: #ffffff;
    --border: #dde3ef;
    --text: #0e2140;
    --muted: #7a8aaa;
    --red: #e8314a;
    --red-light: #fdeaed;
    --sidebar-w: 210px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* NAV */
  .topnav {
    height: 56px; background: #fff; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; position: sticky; top: 0; z-index: 100;
  }
  .logo { font-size: 1.2rem; font-weight: 700; color: var(--navy); }
  .logo span { color: var(--accent); }
  .nav-tabs { display: flex; gap: 28px; }
  .nav-tab {
    font-size: 0.875rem; font-weight: 500; color: var(--muted);
    cursor: pointer; padding-bottom: 2px; border-bottom: 2px solid transparent;
    transition: all 0.18s; text-decoration: none;
  }
  .nav-tab.active { color: var(--navy); border-bottom-color: var(--navy); font-weight: 600; }
  .nav-tab:hover { color: var(--navy); }
  .nav-right { display: flex; align-items: center; gap: 14px; }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border); background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--navy); }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--navy-2); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; cursor: pointer; }

  /* LAYOUT */
  .layout { display: flex; flex: 1; }

  /* SIDEBAR - From InvestorDashboard */
  .sidebar {
    width: var(--sidebar-w); background: #f8fafc; border-right: 1px solid var(--border);
    padding: 24px 0; display: flex; flex-direction: column;
    position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto;
  }
  .sidebar-brand { padding: 0 20px 20px; border-bottom: 1px solid var(--border); }
  .sb-name { font-weight: 700; font-size: 0.95rem; color: var(--navy); }
  .sb-sub { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }
  .sb-nav { padding: 16px 10px; flex: 1; }
  .sb-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px;
    font-size: 0.845rem; font-weight: 500; color: var(--muted); cursor: pointer;
    transition: all 0.16s; margin-bottom: 2px;
  }
  .sb-item:hover { background: #e2e8f0; color: var(--navy); }
  .sb-item.active { background: var(--navy); color: #fff; font-weight: 600; }
  .sb-footer { padding: 16px; }
  .add-funds-btn {
    width: 100%; padding: 11px; background: var(--navy); color: #fff; border: none;
    border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 0.845rem;
    font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .add-funds-btn:hover { background: var(--navy-2); }

  /* MAIN */
  .main { flex: 1; padding: 32px 28px; min-width: 0; overflow-x: hidden; padding-bottom: 80px; }

  /* PAGE HEADER */
  .page-header { margin-bottom: 28px; }
  .page-title { font-size: 1.85rem; font-weight: 700; color: var(--navy); letter-spacing: -0.4px; }
  .page-subtitle { font-size: 0.875rem; color: var(--muted); margin-top: 5px; }

  /* STATS SUMMARY */
  .stats-summary {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px;
  }
  .stat-card {
    background: var(--card); border-radius: 14px; padding: 20px;
    border: 1px solid var(--border); position: relative; overflow: hidden;
  }
  .stat-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .stat-card-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
  .stat-card-value { font-size: 1.75rem; font-weight: 700; color: var(--navy); letter-spacing: -1px; line-height: 1.1; }
  .stat-card-value.green { color: var(--green); }
  .stat-card-sub { font-size: 0.7rem; color: var(--muted); margin-top: 6px; }
  .stat-icon { font-size: 1.25rem; color: var(--muted); opacity: 0.5; }

  /* FILTER SECTION */
  .filter-section {
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 16px; margin-bottom: 24px;
  }
  .filter-tabs {
    display: flex; gap: 8px; background: var(--card); padding: 4px;
    border-radius: 12px; border: 1px solid var(--border);
  }
  .filter-tab {
    padding: 8px 20px; font-size: 0.8rem; font-weight: 600;
    background: none; border: none; border-radius: 8px;
    cursor: pointer; transition: all 0.2s; color: var(--muted);
  }
  .filter-tab.active {
    background: var(--navy); color: #fff;
  }
  .search-box {
    display: flex; align-items: center; gap: 8px;
    background: var(--card); padding: 8px 16px;
    border-radius: 10px; border: 1px solid var(--border);
  }
  .search-box input {
    border: none; background: none; outline: none;
    font-size: 0.85rem; width: 200px;
  }

  /* INVESTMENTS TABLE */
  .investments-card { background: var(--card); border-radius: 14px; border: 1px solid var(--border); overflow: hidden; }
  .inv-header { padding: 20px 22px 14px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .inv-title { font-size: 1.05rem; font-weight: 700; color: var(--navy); }
  .inv-count { font-size: 0.8rem; color: var(--muted); }
  .inv-table { width: 100%; border-collapse: collapse; }
  .inv-table th {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    color: var(--muted); padding: 12px 22px; text-align: left; background: var(--bg);
    border-bottom: 1px solid var(--border);
  }
  .inv-table td { padding: 16px 22px; font-size: 0.875rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
  .inv-table tr:last-child td { border-bottom: none; }
  .inv-table tr:hover td { background: #fafbfd; }
  .borrower-name { font-weight: 600; color: var(--navy); }
  .grade-badge {
    display: inline-block; padding: 3px 9px; border-radius: 6px; font-size: 0.7rem; font-weight: 700;
  }
  .grade-a { background: var(--green-light); color: var(--green-text); }
  .grade-b { background: #e8f1fd; color: #1a5cbd; }
  .grade-c { background: #fdeaed; color: #b0213a; }
  .grade-d { background: #fef3e2; color: #d97706; }
  .interest-val { font-family: 'DM Mono', monospace; font-size: 0.875rem; font-weight: 500; color: var(--navy); }
  .status-on { display: inline-flex; align-items: center; gap: 5px; color: var(--green-text); font-size: 0.8rem; font-weight: 600; }
  .status-completed { display: inline-flex; align-items: center; gap: 5px; color: var(--muted); font-size: 0.8rem; font-weight: 600; }
  .status-default { display: inline-flex; align-items: center; gap: 5px; color: var(--red); font-size: 0.8rem; font-weight: 600; }
  .dot-green { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
  .dot-gray { width: 7px; height: 7px; border-radius: 50%; background: var(--muted); }
  .dot-red { width: 7px; height: 7px; border-radius: 50%; background: var(--red); }
  .date-val { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--muted); }
  .action-btn {
    background: none; border: 1px solid var(--border); padding: 6px 12px;
    border-radius: 6px; font-size: 0.75rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; color: var(--navy);
  }
  .action-btn:hover { background: var(--bg); border-color: var(--navy); }

  /* EMPTY STATE */
  .empty-state {
    text-align: center; padding: 60px 20px;
  }
  .empty-icon { font-size: 3rem; margin-bottom: 16px; }
  .empty-title { font-size: 1.1rem; font-weight: 600; color: var(--navy); margin-bottom: 8px; }
  .empty-sub { font-size: 0.85rem; color: var(--muted); }

  /* BOTTOM NAV */
  .bottom-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-top: 1px solid var(--border);
    justify-content: space-around;
    align-items: center;
    padding: 8px 0;
    z-index: 40;
  }
  .bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted);
    transition: color 0.2s;
  }
  .bottom-nav-item.active {
    color: var(--green);
  }
  .bottom-nav-item svg {
    width: 20px;
    height: 20px;
  }

  /* MOBILE */
  .mobile-menu-btn { display: none; background: none; border: 1px solid var(--border); border-radius: 7px; padding: 5px 9px; cursor: pointer; color: var(--navy); }
  .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200; }
  .mobile-overlay.open { display: block; }

  @media (max-width: 1024px) {
    .stats-summary { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    :root { --sidebar-w: 210px; }
    .sidebar { position: fixed; left: -230px; top: 0; height: 100vh; z-index: 300; transition: left 0.28s ease; padding-top: 64px; }
    .sidebar.open { left: 0; }
    .mobile-menu-btn { display: block; }
    .topnav { padding: 0 16px; }
    .nav-tabs { display: none; }
    .main { padding: 20px 14px; padding-bottom: 70px; }
    .stats-summary { grid-template-columns: 1fr; }
    .filter-section { flex-direction: column; align-items: stretch; }
    .search-box input { width: 100%; }
    .bottom-nav { display: flex; }
  }
  @media (max-width: 768px) {
    .inv-table th:nth-child(4), .inv-table td:nth-child(4),
    .inv-table th:nth-child(5), .inv-table td:nth-child(5) { display: none; }
  }
`;

/* ── Inline SVG icons ── */
const Ic = ({ n, s = 17 }) => {
  const icons = {
    dashboard: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    portfolio: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v9l5 3" /></svg>,
    market: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
    tx: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    settings: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    bell: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    trend: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>,
    wallet: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    arrow: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>,
    menu: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    search: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    grid_view: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    account_balance: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    payments: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    person: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    list: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
  };
  return icons[n] || null;
};

// Portfolio data
const portfolioStats = {
  totalInvested: 84500,
  currentValue: 92750,
  totalReturns: 8250,
  avgApy: 9.8,
};

const allInvestments = [
  { id: 1, name: "Small Biz Expansion", grade: "A", amount: 5000, interest: 8.5, status: "active", nextPayment: "Apr 25, 2025", investedDate: "Jan 15, 2025", expectedReturn: 212.50 },
  { id: 2, name: "Home Renovation", grade: "B", amount: 2500, interest: 10.2, status: "active", nextPayment: "May 01, 2025", investedDate: "Feb 01, 2025", expectedReturn: 127.50 },
  { id: 3, name: "Personal Consolidation", grade: "C", amount: 1000, interest: 12.5, status: "grace", nextPayment: "Apr 19, 2025", investedDate: "Mar 10, 2025", expectedReturn: 52.08 },
  { id: 4, name: "Green Energy Project", grade: "A", amount: 10000, interest: 7.2, status: "active", nextPayment: "Apr 30, 2025", investedDate: "Dec 01, 2024", expectedReturn: 360.00 },
  { id: 5, name: "Tech Startup Funding", grade: "B", amount: 7500, interest: 11.5, status: "active", nextPayment: "May 15, 2025", investedDate: "Nov 15, 2024", expectedReturn: 431.25 },
  { id: 6, name: "Real Estate Bridge", grade: "A", amount: 25000, interest: 6.8, status: "completed", nextPayment: "-", investedDate: "Aug 01, 2024", expectedReturn: 1700.00 },
  { id: 7, name: "Equipment Financing", grade: "B", amount: 8000, interest: 9.5, status: "active", nextPayment: "May 10, 2025", investedDate: "Feb 20, 2025", expectedReturn: 380.00 },
  { id: 8, name: "Medical Practice Loan", grade: "A", amount: 15000, interest: 7.5, status: "active", nextPayment: "Apr 28, 2025", investedDate: "Jan 05, 2025", expectedReturn: 562.50 },
  { id: 9, name: "Restaurant Expansion", grade: "C", amount: 3500, interest: 13.2, status: "default", nextPayment: "Overdue", investedDate: "Oct 10, 2024", expectedReturn: 231.00 },
  { id: 10, name: "E-commerce Growth", grade: "B", amount: 6000, interest: 10.8, status: "active", nextPayment: "May 05, 2025", investedDate: "Mar 01, 2025", expectedReturn: 324.00 },
];

// ── Sidebar nav from InvestorDashboard ──
const navItems = [
  { id: "dashboard", label: "INVESTOR VIEW", icon: "dashboard", path: "/investor-portal" },
  { id: "portfolio", label: "Portfolio", icon: "portfolio", path: "/investments" },
  { id: "marketplace", label: "Loan listings", icon: "market", path: "/loan-market" },
  { id: "transactions", label: "Transactions", icon: "tx", path: "/investor-portal/transactions" },
  { id: "settings", label: "Settings", icon: "settings", path: "/investor-portal/settings" },
];

const bottomNavItems = [
  { icon: "grid_view", label: "Hybrid", path: "/dashboard" },
  { icon: "account_balance", label: "Invest", path: "/investor-portal", active: true },
  { icon: "payments", label: "Borrow", path: "/borrower-portal" },
  { icon: "person", label: "Profile", path: "/profile" },
];

export default function MyInvestments() {
  const [activeNav, setActiveNav] = useState("portfolio");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const filteredInvestments = allInvestments.filter(inv => {
    const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = allInvestments.filter(i => i.status === "active").length;
  const completedCount = allInvestments.filter(i => i.status === "completed").length;
  const graceCount = allInvestments.filter(i => i.status === "grace").length;

  const getStatusDisplay = (status) => {
    switch(status) {
      case "active": return <span className="status-on"><span className="dot-green" /> Active</span>;
      case "completed": return <span className="status-completed"><span className="dot-gray" /> Completed</span>;
      case "grace": return <span className="status-on"><span className="dot-green" /> Grace Period</span>;
      case "default": return <span className="status-default"><span className="dot-red" /> Defaulted</span>;
      default: return status;
    }
  };

  const handleNavigation = (path, navId) => {
    setActiveNav(navId);
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* TOP NAV */}
        <nav className="topnav">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Ic n="menu" s={16} />
            </button>
            <div className="logo">Loan<span>@</span></div>
          </div>
          <div className="nav-tabs">
            <button className="nav-tab" onClick={() => navigate("/dashboard")}>Hybrid</button>
            <button className="nav-tab active" onClick={() => navigate("/investor-portal")}>Investor</button>
            <button className="nav-tab" onClick={() => navigate("/borrower-portal")}>Borrower</button>
          </div>
          <div className="nav-right">
            <button className="icon-btn"><Ic n="bell" s={16} /></button>
            <div className="avatar">TL</div>
          </div>
        </nav>

        <div className="layout">
          {/* MOBILE OVERLAY */}
          <div className={`mobile-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

          {/* SIDEBAR — from InvestorDashboard, portfolio highlighted */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-brand">
              <div className="sb-sub">Premium P2P Lending</div>
            </div>
            <nav className="sb-nav">
              {navItems.map(item => (
                <div
                  key={item.id}
                  className={`sb-item ${activeNav === item.id ? "active" : ""}`}
                  onClick={() => handleNavigation(item.path, item.id)}
                >
                  <Ic n={item.icon} s={16} />
                  {item.label}
                </div>
              ))}
            </nav>
            <div className="sb-footer">
              <button className="add-funds-btn">Add Funds</button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="main">
            <div className="page-header">
              <h1 className="page-title">My Portfolio</h1>
              <p className="page-subtitle">Track and manage all your investments in one place.</p>
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Total Invested</span>
                  <span className="stat-icon">💰</span>
                </div>
                <div className="stat-card-value">${portfolioStats.totalInvested.toLocaleString()}</div>
                <div className="stat-card-sub">Across {allInvestments.length} loans</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Current Value</span>
                  <span className="stat-icon">📈</span>
                </div>
                <div className="stat-card-value green">${portfolioStats.currentValue.toLocaleString()}</div>
                <div className="stat-card-sub">+${portfolioStats.totalReturns.toLocaleString()} returns</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Avg. APY</span>
                  <span className="stat-icon">⭐</span>
                </div>
                <div className="stat-card-value green">{portfolioStats.avgApy}%</div>
                <div className="stat-card-sub">Weighted average</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Active Loans</span>
                  <span className="stat-icon">📋</span>
                </div>
                <div className="stat-card-value">{activeCount}</div>
                <div className="stat-card-sub">{completedCount} completed, {graceCount} grace</div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-tabs">
                <button
                  className={`filter-tab ${filterStatus === "all" ? "active" : ""}`}
                  onClick={() => setFilterStatus("all")}
                >
                  All ({allInvestments.length})
                </button>
                <button
                  className={`filter-tab ${filterStatus === "active" ? "active" : ""}`}
                  onClick={() => setFilterStatus("active")}
                >
                  Active ({activeCount})
                </button>
                <button
                  className={`filter-tab ${filterStatus === "completed" ? "active" : ""}`}
                  onClick={() => setFilterStatus("completed")}
                >
                  Completed ({completedCount})
                </button>
                <button
                  className={`filter-tab ${filterStatus === "grace" ? "active" : ""}`}
                  onClick={() => setFilterStatus("grace")}
                >
                  Grace ({graceCount})
                </button>
              </div>
              <div className="search-box">
                <Ic n="search" s={16} />
                <input
                  type="text"
                  placeholder="Search investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Investments Table */}
            <div className="investments-card">
              <div className="inv-header">
                <div className="inv-title">My Investments</div>
                <div className="inv-count">{filteredInvestments.length} investments</div>
              </div>
              {filteredInvestments.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <table className="inv-table">
                    <thead>
                      <tr>
                        <th>Borrower</th>
                        <th>Grade</th>
                        <th>Amount</th>
                        <th>Interest</th>
                        <th>Status</th>
                        <th>Next Payment</th>
                        <th>Invested Date</th>
                        <th>Expected Return</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvestments.map((inv) => (
                        <tr key={inv.id}>
                          <td><span className="borrower-name">{inv.name}</span></td>
                          <td>
                            <span className={`grade-badge grade-${inv.grade.toLowerCase()}`}>
                              Grade {inv.grade}
                            </span>
                          </td>
                          <td>${inv.amount.toLocaleString()}</td>
                          <td><span className="interest-val">{inv.interest}%</span></td>
                          <td>{getStatusDisplay(inv.status)}</td>
                          <td><span className="date-val">{inv.nextPayment}</span></td>
                          <td><span className="date-val">{inv.investedDate}</span></td>
                          <td style={{ color: "var(--green-text)", fontWeight: 600 }}>+${inv.expectedReturn.toLocaleString()}</td>
                          <td>
                            <button className="action-btn">Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <div className="empty-title">No investments found</div>
                  <div className="empty-sub">Try adjusting your filters or search term.</div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* BOTTOM NAV */}
        <nav className="bottom-nav">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              className={`bottom-nav-item ${item.active ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Ic n={item.icon} s={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}