import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService"; // Adjust path as needed

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f4f0;
    --sidebar-bg: #f8fafc;
    --card-bg: #ffffff;
    --navy: #1a2540;
    --navy-light: #243052;
    --accent: #c0392b;
    --accent-hover: #a93226;
    --green: #27ae60;
    --teal: #16a085;
    --gold: #e67e22;
    --gold-light: #fef3e2;
    --gold-dark: #b8651a;
    --text: #1a2540;
    --text-muted: #6b7280;
    --text-light: #9ca3af;
    --border: #e5e7eb;
    --progress-bg: #e5e7eb;
    --tag-upcoming: #1a2540;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.07);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
    --radius: 14px;
    --radius-sm: 8px;
  }

  body { font-family: 'Sora', sans-serif; background: var(--bg); color: var(--text); }

  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* ── TOP NAV ── */
  .topnav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; height: 60px;
    background: #fff; border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
    box-shadow: var(--shadow-sm);
  }
  .topnav-brand { font-size: 1.15rem; font-weight: 700; color: var(--navy); letter-spacing: -0.02em; }
  .topnav-links { display: flex; gap: 4px; }
  .topnav-link {
    padding: 6px 14px; font-size: 0.85rem; font-weight: 500; color: var(--text-muted);
    border-radius: 6px; cursor: pointer; transition: all 0.18s; border: none; background: none;
  }
  .topnav-link:hover { color: var(--navy); background: #f3f4f6; }
  .topnav-link.active { color: var(--navy); font-weight: 600; border-bottom: 2px solid var(--navy); border-radius: 0; }
  .topnav-actions { display: flex; gap: 10px; align-items: center; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border);
    background: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text-muted); font-size: 1rem; transition: all 0.18s;
  }
  .icon-btn:hover { background: var(--bg); color: var(--navy); }

  /* ── LAYOUT ── */
  .layout { display: flex; flex: 1; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 220px; flex-shrink: 0;
    background: var(--sidebar-bg); border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 24px 0; position: sticky; top: 60px;
    height: calc(100vh - 60px); overflow-y: auto;
  }
  .sidebar-brand-area { padding: 0 20px 20px; border-bottom: 1px solid var(--border); margin-bottom: 12px; }
  .sidebar-brand-name { font-size: 0.9rem; font-weight: 700; color: var(--navy); }
  .sidebar-brand-sub { font-size: 0.7rem; color: var(--text-muted); margin-top: 2px; font-weight: 400; }
  .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; padding: 0 12px; }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px;
    border-radius: var(--radius-sm); cursor: pointer; font-size: 0.85rem;
    font-weight: 500; color: var(--text-muted); transition: all 0.18s;
    border: none; background: none; text-align: left;
  }
  .sidebar-item:hover { background: #e2e8f0; color: var(--navy); }
  .sidebar-item.active { background: var(--navy); color: #fff; }
  .sidebar-item .icon { font-size: 1rem; width: 20px; text-align: center; }
  .sidebar-bottom { padding: 16px 12px; border-top: 1px solid var(--border); margin-top: auto; display: flex; flex-direction: column; gap: 6px; }
  .new-loan-btn {
    width: 100%; padding: 10px 16px; background: var(--navy); color: #fff;
    border: none; border-radius: var(--radius-sm); font-family: 'Sora', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .new-loan-btn:hover { background: var(--navy-light); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,37,64,0.25); }

  /* ── MAIN CONTENT ── */
  .main { flex: 1; padding: 32px 36px; overflow-x: hidden; padding-bottom: 80px; }
  .page-header { margin-bottom: 28px; }
  .page-title { font-size: 2rem; font-weight: 700; color: var(--navy); letter-spacing: -0.03em; }
  .page-subtitle { font-size: 0.9rem; color: var(--text-muted); margin-top: 4px; }

  /* ── SECTION ── */
  .section { margin-bottom: 36px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-size: 1.05rem; font-weight: 600; color: var(--navy); }
  .badge-active {
    font-family: 'DM Mono', monospace; font-size: 0.72rem; font-weight: 500;
    background: var(--green); color: #fff; padding: 4px 10px; border-radius: 20px;
  }
  .badge-pending-count {
    font-family: 'DM Mono', monospace; font-size: 0.72rem; font-weight: 500;
    background: var(--gold); color: #fff; padding: 4px 10px; border-radius: 20px;
  }

  /* ── LOAN CARDS GRID ── */
  .loans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .loan-card {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 22px; box-shadow: var(--shadow-sm);
    position: relative; overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .loan-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
  }
  .loan-card.card-blue::before { background: var(--navy); }
  .loan-card.card-green::before { background: var(--teal); }
  .loan-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
  .loan-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .loan-id { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 4px; }
  .loan-name { font-size: 1.15rem; font-weight: 700; color: var(--navy); letter-spacing: -0.02em; }
  .loan-apr { text-align: right; }
  .loan-apr-label { font-size: 0.65rem; font-weight: 500; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; }
  .loan-apr-value { font-size: 1rem; font-weight: 700; color: var(--accent); font-family: 'DM Mono', monospace; }
  .loan-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .loan-meta-item {}
  .loan-meta-label { font-size: 0.65rem; font-weight: 500; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px; }
  .loan-meta-value { font-size: 0.95rem; font-weight: 700; color: var(--navy); font-family: 'DM Mono', monospace; }
  .loan-meta-value.accent { color: var(--accent); }
  .loan-meta-value.teal { color: var(--teal); }
  .progress-label { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px; font-weight: 500; }
  .progress-bar { height: 7px; background: var(--progress-bg); border-radius: 99px; overflow: hidden; margin-bottom: 16px; }
  .progress-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(.4,0,.2,1); }
  .fill-blue { background: var(--navy); }
  .fill-teal { background: var(--teal); }
  .pay-btn {
    width: 100%; padding: 11px; background: var(--accent); color: #fff;
    border: none; border-radius: var(--radius-sm); font-family: 'Sora', sans-serif;
    font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .pay-btn:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(192,57,43,0.3); }

  /* ── PENDING LOANS ── */
  .pending-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }

  .pending-card {
    background: var(--gold-light);
    border: 1px solid #f0d5a8;
    border-radius: var(--radius);
    padding: 22px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .pending-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
    background: var(--gold);
  }
  .pending-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

  .pending-card-header {
    display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;
  }
  .pending-card-left {}
  .pending-card-id { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--gold-dark); margin-bottom: 4px; }
  .pending-card-name { font-size: 1.1rem; font-weight: 700; color: var(--navy); letter-spacing: -0.02em; }
  .pending-status-pill {
    display: inline-flex; align-items: center; gap: 5px;
    background: #fff3cd; border: 1px solid #f0c040;
    color: var(--gold-dark); padding: 4px 10px; border-radius: 20px;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
    white-space: nowrap;
  }
  .pending-status-dot {
    width: 7px; height: 7px; border-radius: 50%; background: var(--gold);
    animation: pulse-dot 1.6s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.75); }
  }

  .pending-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .pending-meta-label { font-size: 0.65rem; font-weight: 500; color: #a07830; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px; }
  .pending-meta-value { font-size: 0.95rem; font-weight: 700; color: var(--navy); font-family: 'DM Mono', monospace; }

  .pending-timeline {
    background: rgba(255,255,255,0.6); border-radius: var(--radius-sm);
    padding: 10px 14px; margin-bottom: 14px;
    border: 1px solid #f0d5a8;
    display: flex; align-items: center; gap: 10px;
  }
  .pending-timeline-icon { font-size: 1rem; flex-shrink: 0; }
  .pending-timeline-text { font-size: 0.78rem; color: var(--gold-dark); font-weight: 500; line-height: 1.4; }
  .pending-timeline-text strong { color: var(--navy); }

  .pending-actions { display: flex; gap: 8px; }
  .pending-btn-primary {
    flex: 1; padding: 9px 14px; background: var(--gold); color: #fff;
    border: none; border-radius: var(--radius-sm); font-family: 'Sora', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .pending-btn-primary:hover { background: var(--gold-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(230,126,34,0.3); }
  .pending-btn-secondary {
    padding: 9px 14px; background: transparent; color: var(--gold-dark);
    border: 1.5px solid #f0c040; border-radius: var(--radius-sm); font-family: 'Sora', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .pending-btn-secondary:hover { background: rgba(255,255,255,0.5); }

  .pending-loading, .pending-error {
    background: var(--gold-light); border: 1.5px dashed #f0d5a8;
    border-radius: var(--radius); padding: 32px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; text-align: center;
  }
  .pending-empty {
    background: var(--gold-light); border: 1.5px dashed #f0d5a8;
    border-radius: var(--radius); padding: 32px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; text-align: center;
  }
  .pending-empty-icon { font-size: 2rem; }
  .pending-empty-text { font-size: 0.88rem; color: var(--gold-dark); font-weight: 500; }
  .pending-empty-sub { font-size: 0.78rem; color: #b8924a; }

  /* ── TABLE ── */
  .table-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #f9fafb; }
  th { padding: 12px 20px; text-align: left; font-size: 0.7rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.07em; }
  td { padding: 15px 20px; font-size: 0.87rem; color: var(--text); border-top: 1px solid var(--border); }
  tr:last-child td { border-bottom: none; }
  tbody tr { transition: background 0.15s; }
  tbody tr:hover { background: #fafafa; }
  .td-mono { font-family: 'DM Mono', monospace; font-size: 0.82rem; }
  .td-amount { font-weight: 700; font-family: 'DM Mono', monospace; color: var(--navy); }
  .badge {
    display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 4px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
  }
  .badge-upcoming { background: var(--navy); color: #fff; }
  .badge-paid { background: #d1fae5; color: #065f46; }

  /* ── BOTTOM PANELS ── */
  .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .panel-consolidate {
    background: var(--navy); color: #fff; border-radius: var(--radius); padding: 28px;
  }
  .panel-consolidate h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
  .panel-consolidate p { font-size: 0.84rem; color: rgba(255,255,255,0.7); margin-bottom: 20px; line-height: 1.6; }
  .learn-btn {
    padding: 9px 20px; border: 2px solid #fff; background: transparent; color: #fff;
    border-radius: var(--radius-sm); font-family: 'Sora', sans-serif; font-size: 0.82rem;
    font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .learn-btn:hover { background: rgba(255,255,255,0.15); }
  .panel-help {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 28px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;
  }
  .panel-help .help-icon { font-size: 2rem; margin-bottom: 12px; }
  .panel-help h3 { font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
  .panel-help p { font-size: 0.83rem; color: var(--text-muted); line-height: 1.6; flex: 1; }
  .contact-btn {
    margin-top: 16px; background: none; border: none; color: var(--navy);
    font-family: 'Sora', sans-serif; font-size: 0.84rem; font-weight: 600;
    cursor: pointer; display: flex; align-items: center; gap: 5px; padding: 0;
    transition: gap 0.2s;
  }
  .contact-btn:hover { gap: 9px; }

  /* ── BOTTOM NAV (matches Hybrid Dashboard) ── */
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
    padding: 10px 0;
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
    font-family: 'Sora', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: color 0.2s;
  }
  .bottom-nav-item.active {
    color: var(--gold);
  }
  .bottom-nav-item svg {
    width: 20px;
    height: 20px;
  }

  /* ── HAMBURGER / MOBILE SIDEBAR ── */
  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    border: none; background: none; cursor: pointer; padding: 4px;
  }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--navy); border-radius: 2px; transition: all 0.3s; }
  .sidebar-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.35);
    z-index: 200; backdrop-filter: blur(2px);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .sidebar { display: none; }
    .sidebar.open {
      display: flex; position: fixed; left: 0; top: 0; height: 100vh; z-index: 300;
      animation: slideIn 0.25s ease;
    }
    @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    .sidebar-overlay { display: block; }
    .hamburger { display: flex; }
    .topnav-links { display: none; }
    .main { padding: 20px 16px; padding-bottom: 70px; }
    .bottom-grid { grid-template-columns: 1fr; }
    .bottom-nav { display: flex; }
  }

  @media (max-width: 600px) {
    .topnav { padding: 0 16px; }
    .page-title { font-size: 1.5rem; }
    th, td { padding: 10px 12px; }
    .loan-card { padding: 18px; }
    .loans-grid { grid-template-columns: 1fr; }
    .pending-grid { grid-template-columns: 1fr; }
    .pending-actions { flex-direction: column; }
  }
`;

// SVG Icons
const Icon = ({ name, size = 20 }) => {
  const icons = {
    grid_view: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    account_balance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    payments: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    receipt_long: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" /><path d="M16 8h-6M16 12h-6M10 16h6" /></svg>,
    description: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    person: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  };
  return icons[name] || null;
};

const navItems = [
  { icon: "⊞", label: "Dashboard", path: "/borrower-portal" },
  { icon: "◎", label: "Loans", path: "/borrower-portal/loans", active: true },
  { icon: "💳", label: "Payments", path: "/borrower-portal/payments" },
  { icon: "📄", label: "Documents", path: "/borrower-portal/documents" },
];

const bottomNavItems = [
  { icon: "grid_view", label: "Hybrid", path: "/dashboard" },
  { icon: "account_balance", label: "Invest", path: "/investor-portal" },
  { icon: "payments", label: "Borrow", path: "/borrower-portal", active: true },
  { icon: "person", label: "Profile", path: "/profile" },
];

// Keep your existing static data for other sections
const loans = [
  {
    id: "#LN-8821",
    name: "Personal Credit Line",
    apr: "8.5%",
    total: "25,000,000",
    remaining: "12,450,000",
    progress: 50.2,
    cardClass: "card-blue",
    fillClass: "fill-blue",
    remainColor: "accent",
  },
  {
    id: "#LN-9042",
    name: "Home Improvement",
    apr: "6.2%",
    total: "15,000,000",
    remaining: "8,200,000",
    progress: 45.3,
    cardClass: "card-green",
    fillClass: "fill-teal",
    remainColor: "teal",
  },
];

const repayments = [
  { date: "Oct 15, 2023", loanId: "#LN-8821", amount: "450,000 FCFA", status: "upcoming" },
  { date: "Nov 02, 2023", loanId: "#LN-9042", amount: "285,000 FCFA", status: "upcoming" },
];

const history = [
  { date: "Aug 22, 2022", purpose: "Emergency Medical Fund", amount: "5,000,000 FCFA", status: "paid" },
  { date: "Jan 15, 2021", purpose: "Small Business Expansion", amount: "12,000,000 FCFA", status: "paid" },
];

export default function UserLoans() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch pending loan applications from backend
  const fetchPendingLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getUserLoanRequests();
      console.log("API Response:", response);
      
      if (response && response.loanrequestlist) {
        // Filter only PENDING_APPROVAL status
        const pending = response.loanrequestlist.filter(
          loan => loan.status === "PENDING_APPROVAL"
        );
        setPendingLoans(pending);
      } else {
        setPendingLoans([]);
      }
    } catch (err) {
      console.error("Error fetching pending loans:", err);
      setError(err.response?.data?.message || "Failed to load pending applications");
      setPendingLoans([]);
    } finally {
      setLoading(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Calculate expected decision date (7 days from request date)
  const getExpectedDecisionDate = (requestDate) => {
    if (!requestDate) return "Pending";
    const date = new Date(requestDate);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Get stage based on state
  const getStage = (status) => {
    switch(status) {
      case "PENDING_APPROVAL":
        return "Under Review";
      case "APPROVED":
        return "Approved";
      case "REJECTED":
        return "Rejected";
      default:
        return "Processing";
    }
  };

  // Get stage note based on state and description
  const getStageNote = (loan) => {
    if (loan.status === "PENDING_APPROVAL") {
      if (loan.approvedById) {
        return "Credit committee review in progress.";
      }
      return "Documents verified. Awaiting credit committee approval.";
    }
    return "Your application is being processed.";
  };

  // Handle view details
  const handleViewDetails = (loan) => {
    console.log("View details for loan:", loan);
    // Navigate to loan details page or open modal
    alert(`Loan Details:\nID: ${loan.requestId}\nAmount: $${loan.requestedAmount}\nPurpose: ${loan.purpose}\nStatus: ${loan.status}`);
  };

  // Handle upload documents
  const handleUploadDocs = (loan) => {
    console.log("Upload documents for loan:", loan);
    // Navigate to document upload page or open modal
    alert(`Upload documents for Loan Request #${loan.requestId}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="app">

        {/* TOP NAV */}
        <nav className="topnav">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
            <span className="topnav-brand">Loan@</span>
          </div>
          <div className="topnav-links">
            <button className="topnav-link" onClick={() => navigate("/dashboard")}>Hybrid</button>
            <button className="topnav-link" onClick={() => navigate("/investor-portal")}>Investor</button>
            <button className="topnav-link active" onClick={() => navigate("/borrower-portal")}>Borrower</button>
          </div>
          <div className="topnav-actions">
            <button className="icon-btn" title="Notifications">🔔</button>
            <button className="icon-btn" title="Profile">👤</button>
          </div>
        </nav>

        <div className="layout">

          {/* SIDEBAR OVERLAY (mobile) */}
          {sidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          )}

          {/* SIDEBAR */}
          <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
            <div className="sidebar-brand-area">
              <div className="sidebar-brand-name">Loan@</div>
              <div className="sidebar-brand-sub">Premium P2P Lending</div>
            </div>
            <nav className="sidebar-nav">
              {navItems.map(item => (
                <button 
                  key={item.label} 
                  className={`sidebar-item${item.active ? " active" : ""}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span className="icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="sidebar-bottom">
              <button className="new-loan-btn">+ New Loan Application</button>
              <button className="sidebar-item" onClick={() => handleNavigation("/settings")}>⚙️ Settings</button>
              <button className="sidebar-item" onClick={() => handleNavigation("/support")}>❓ Support</button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="main">

            {/* Page Header */}
            <div className="page-header">
              <h1 className="page-title">My Loans</h1>
              <p className="page-subtitle">Manage your active loans and view your repayment history.</p>
            </div>

            {/* Active Loans */}
            <section className="section">
              <div className="section-header">
                <span className="section-title">Active Loans</span>
                <span className="badge-active">2 Active</span>
              </div>
              <div className="loans-grid">
                {loans.map(loan => (
                  <div key={loan.id} className={`loan-card ${loan.cardClass}`}>
                    <div className="loan-card-header">
                      <div>
                        <div className="loan-id">{loan.id}</div>
                        <div className="loan-name">{loan.name}</div>
                      </div>
                      <div className="loan-apr">
                        <div className="loan-apr-label">Interest Rate</div>
                        <div className="loan-apr-value">{loan.apr} APR</div>
                      </div>
                    </div>
                    <div className="loan-meta">
                      <div className="loan-meta-item">
                        <div className="loan-meta-label">Total Amount</div>
                        <div className="loan-meta-value">{loan.total} FCFA</div>
                      </div>
                      <div className="loan-meta-item">
                        <div className="loan-meta-label">Remaining</div>
                        <div className={`loan-meta-value ${loan.remainColor}`}>{loan.remaining} FCFA</div>
                      </div>
                    </div>
                    <div className="progress-label">
                      <span>Repayment Progress</span>
                      <span>{loan.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`progress-fill ${loan.fillClass}`} style={{ width: `${loan.progress}%` }} />
                    </div>
                    <button className="pay-btn">
                      💳 Make Payment
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PENDING APPLICATIONS (CONNECTED TO BACKEND) ── */}
            <section className="section">
              <div className="section-header">
                <span className="section-title">Pending Applications</span>
                <span className="badge-pending-count">
                  {loading ? "..." : pendingLoans.length} Pending
                </span>
              </div>
              <div className="pending-grid">
                {loading ? (
                  <div className="pending-loading">
                    <div className="pending-empty-icon">⏳</div>
                    <div className="pending-empty-text">Loading your applications...</div>
                    <div className="pending-empty-sub">Please wait while we fetch your pending loan requests.</div>
                  </div>
                ) : error ? (
                  <div className="pending-error">
                    <div className="pending-empty-icon">⚠️</div>
                    <div className="pending-empty-text">Error loading applications</div>
                    <div className="pending-empty-sub">{error}</div>
                    <button 
                      onClick={fetchPendingLoans}
                      style={{ marginTop: "12px", padding: "8px 16px", background: "var(--gold)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
                    >
                      Try Again
                    </button>
                  </div>
                ) : pendingLoans.length === 0 ? (
                  <div className="pending-empty">
                    <div className="pending-empty-icon">📋</div>
                    <div className="pending-empty-text">No pending applications</div>
                    <div className="pending-empty-sub">Submit a new loan application to get started.</div>
                  </div>
                ) : (
                  pendingLoans.map(loan => (
                    <div key={loan.requestId} className="pending-card">
                      <div className="pending-card-header">
                        <div className="pending-card-left">
                          <div className="pending-card-id">#{loan.requestId}</div>
                          <div className="pending-card-name">
                            {loan.purpose || "Loan Application"}
                          </div>
                        </div>
                        <div className="pending-status-pill">
                          <span className="pending-status-dot" />
                          {getStage(loan.status)}
                        </div>
                      </div>

                      <div className="pending-meta">
                        <div>
                          <div className="pending-meta-label">Requested</div>
                          <div className="pending-meta-value">
                            ${loan.requestedAmount?.toLocaleString() || "0"} 
                            {loan.amountFunded > 0 && ` (Funded: $${loan.amountFunded})`}
                          </div>
                        </div>
                        <div>
                          <div className="pending-meta-label">Est. APR</div>
                          <div className="pending-meta-value">{loan.interestRate}%</div>
                        </div>
                        <div>
                          <div className="pending-meta-label">Term</div>
                          <div className="pending-meta-value">{loan.termMonths} months</div>
                        </div>
                        <div>
                          <div className="pending-meta-label">Submitted</div>
                          <div className="pending-meta-value" style={{ fontSize: "0.82rem" }}>
                            {formatDate(loan.requestDate)}
                          </div>
                        </div>
                      </div>

                      <div className="pending-timeline">
                        <div className="pending-timeline-icon">🕐</div>
                        <div className="pending-timeline-text">
                          {getStageNote(loan)} 
                          <strong> Decision expected by {getExpectedDecisionDate(loan.requestDate)}.</strong>
                        </div>
                      </div>

                      <div className="pending-actions">
                        <button 
                          className="pending-btn-primary"
                          onClick={() => handleUploadDocs(loan)}
                        >
                          📎 Upload Docs
                        </button>
                        <button 
                          className="pending-btn-secondary"
                          onClick={() => handleViewDetails(loan)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Upcoming Repayments */}
            <section className="section">
              <div className="section-header">
                <span className="section-title">Upcoming Repayments</span>
              </div>
              <div className="table-card">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Loan ID</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repayments.map((r, i) => (
                      <tr key={i}>
                        <td>{r.date}</td>
                        <td className="td-mono">{r.loanId}</td>
                        <td className="td-amount">{r.amount}</td>
                        <td><span className="badge badge-upcoming">{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Loan History */}
            <section className="section">
              <div className="section-header">
                <span className="section-title">Loan History</span>
              </div>
              <div className="table-card">
                <table>
                  <thead>
                    <tr>
                      <th>Completed Date</th>
                      <th>Purpose</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, i) => (
                      <tr key={i}>
                        <td>{h.date}</td>
                        <td>{h.purpose}</td>
                        <td className="td-amount">{h.amount}</td>
                        <td><span className="badge badge-paid">✅ Paid in Full</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Bottom Panels */}
            <div className="bottom-grid">
              <div className="panel-consolidate">
                <h3>Consolidate your debts.</h3>
                <p>Streamline your financial life by combining multiple high-interest loans into one sanctuary with a lower APR.</p>
                <button className="learn-btn">Learn More</button>
              </div>
              <div className="panel-help">
                <div className="help-icon">🎧</div>
                <h3>Need help?</h3>
                <p>Our loan advisors are available 24/7 to discuss repayment options or adjustments.</p>
                <button className="contact-btn">Contact Support →</button>
              </div>
            </div>

          </main>
        </div>

        {/* BOTTOM NAV - Matches Hybrid Dashboard */}
        <nav className="bottom-nav">
          {bottomNavItems.map((item) => (
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