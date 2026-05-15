import { useNavigate } from "react-router-dom";

// ─── Styles ──────────────────────────────────────────────────────────────────

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --navy: #0f2240;
    --navy-light: #1a3560;
    --accent: #e8622a;
    --bg: #f0f3f8;
    --muted: #7a8aaa;
    --border: #dde3ef;
    --green: #2eb87e;
  }

  .bd-topnav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 60px; background: #fff;
    border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100;
    font-family: 'DM Sans', sans-serif;
  }
  .bd-logo { font-size: 1.25rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .bd-logo span { color: var(--accent); }
  .bd-links { display: flex; gap: 32px; }
  .bd-links button {
    font-size: 0.875rem; font-weight: 500; color: var(--muted);
    background: none; border: none; cursor: pointer; transition: color 0.2s;
    padding-bottom: 2px; font-family: 'DM Sans', sans-serif;
  }
  .bd-links button.active { color: var(--navy); border-bottom: 2px solid var(--navy); font-weight: 600; }
  .bd-links button:hover { color: var(--navy); }
  .bd-right { display: flex; align-items: center; gap: 16px; }
  .bd-icon-btn {
    width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border);
    background: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--navy); transition: background 0.2s;
  }
  .bd-icon-btn:hover { background: var(--bg); }
  .bd-avatar {
    width: 36px; height: 36px; border-radius: 50%; background: var(--navy);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 0.8rem; font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  .bd-bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
    border-top: 1px solid var(--border);
    justify-content: space-around; align-items: center;
    padding: 8px 0; z-index: 40;
    font-family: 'DM Sans', sans-serif;
  }
  .bd-bottom-item {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    background: none; border: none; cursor: pointer;
    font-size: 0.7rem; font-weight: 500; color: var(--muted);
    transition: color 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .bd-bottom-item.active { color: var(--green); }
  .bd-bottom-item svg { width: 20px; height: 20px; }

  @media (max-width: 768px) {
    .bd-topnav { padding: 0 16px; }
    .bd-links { display: none; }
    .bd-bottom-nav { display: flex; }
  }
`;

// ─── Icon (SVG, no Material Symbols dependency) ──────────────────────────────

const SvgIcon = ({ name, size = 18 }) => {
  const icons = {
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    grid_view: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    account_balance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    payments: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    person: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  };
  return icons[name] || null;
};

const bottomNavItems = [
  { icon: "grid_view",       label: "Hybrid",  path: "/dashboard",       active: true },
  { icon: "account_balance", label: "Invest",  path: "/investor-view", active: false },
  { icon: "payments",        label: "Borrow",  path: "/borrower-view", active: false },
  { icon: "person",          label: "Profile", path: "/profile",         active: false },
];

// ─── Data ───────────────────────────────────────────────────────────────────

const ACTIVITY = [
  {
    icon: "savings",
    bg: "bg-secondary-container",
    textColor: "text-on-secondary-container",
    title: "Interest Received",
    sub: "From 12 Active Loan Portfolios",
    amount: "+$142.30",
    amountColor: "text-secondary",
    time: "Today, 9:41 AM",
  },
  {
    icon: "payments",
    bg: "bg-primary-container",
    textColor: "text-on-primary-container",
    title: "Loan Payment Made",
    sub: "Loan #B001 (Scheduled)",
    amount: "-$520.00",
    amountColor: "text-on-surface",
    time: "Yesterday",
  },
  {
    icon: "add_business",
    bg: "bg-tertiary-fixed",
    textColor: "text-on-tertiary-fixed",
    title: "New Investment",
    sub: "Auto-invest: Green Energy Project",
    amount: "-$250.00",
    amountColor: "text-on-surface",
    time: "Apr 21, 2024",
  },
  {
    icon: "progress_activity",
    bg: "bg-surface-container-highest",
    textColor: "text-on-surface-variant",
    title: "Funding Progress",
    sub: "Tech Startup #T24 Reach 80%",
    amount: "80% Full",
    amountColor: "text-secondary",
    time: "Apr 20, 2024",
  },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

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

function TopNav() {
  const navigate = useNavigate();
  return (
    <>
      <style>{navStyles}</style>
      <nav className="bd-topnav">
        <div className="bd-logo">Loan<span>@</span></div>
        <div className="bd-links">
          <button className="active" onClick={() => navigate("/dashboard")}>Hybrid</button>
          <button onClick={() => navigate("/investor-view")}>Investor</button>
          <button onClick={() => navigate("/borrower-view")}>Borrower</button>
        </div>
        <div className="bd-right">
          <button className="bd-icon-btn"><SvgIcon name="bell" size={16} /></button>
          <div className="bd-avatar">TL</div>
        </div>
      </nav>
    </>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav className="bd-bottom-nav">
      {bottomNavItems.map(item => (
        <button
          key={item.label}
          className={`bd-bottom-item ${item.active ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <SvgIcon name={item.icon} size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function SummaryCards() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div
        onClick={() => navigate("/investor-view")}
        className="bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-outline-variant/10 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs text-tertiary uppercase tracking-wider font-bold">As Investor</span>
          <Icon name="trending_up" className="text-secondary" />
        </div>
        <p className="text-3xl font-extrabold text-on-surface">$18,450</p>
        <p className="text-sm text-tertiary mb-6">Total Invested</p>
        <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">
          +9.3% Avg. Annual Return
        </div>
      </div>

      <div
        onClick={() => navigate("/borrower-view")}
        className="bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-outline-variant/10 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs text-tertiary uppercase tracking-wider font-bold">As Borrower</span>
          <Icon name="account_balance_wallet" className="text-primary" />
        </div>
        <p className="text-3xl font-extrabold text-on-surface">$12,000</p>
        <p className="text-sm text-tertiary mb-6">Total Borrowed</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">8.5%</span>
          <span className="text-xs text-tertiary">Avg. Loan Rate</span>
        </div>
      </div>

      <div className="bg-primary text-on-primary p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs text-on-primary-container uppercase tracking-wider font-bold">Combined Snapshot</span>
          <Icon name="insights" />
        </div>
        <p className="text-3xl font-extrabold">+$6,450</p>
        <p className="text-sm opacity-80 mb-6">Net Worth (P2P)</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="opacity-70">Investor: $450 available</span>
            <span className="font-bold">Next Action</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="opacity-70">Borrower: Due 4/25</span>
            <span className="font-bold">Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestorSummary() {
  const navigate = useNavigate();
  return (
    <div className="bg-surface-container-low rounded-xl p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-on-surface">Investor Summary</h3>
          <button onClick={() => navigate("/investor-view")} className="text-sm font-bold text-secondary flex items-center gap-1 hover:underline">
            Go to full Investor view <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "Portfolio",     value: "23 Active Loans", style: "bg-white" },
            { label: "Principal",     value: "$12,450",          style: "bg-white" },
            { label: "Next Payment",  value: "$410", sub: "on 04/25", style: "bg-white" },
            { label: "Alerts",        value: "1 Late Loan",      style: "bg-error-container text-on-error-container" },
          ].map(({ label, value, sub, style }) => (
            <div key={label} className={`p-4 rounded-lg ${style}`}>
              <p className="text-xs text-outline font-bold uppercase mb-1">{label}</p>
              <p className="text-lg font-extrabold">
                {value}{" "}
                {sub && <span className="text-xs font-normal text-tertiary">{sub}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BorrowerSummary() {
  const navigate = useNavigate();
  const loans = [
    { id: "B001", title: "Loan #B001 (Business Exp.)", sub: "$520 monthly payment", iconBg: "bg-primary-fixed", iconColor: "text-primary", icon: "receipt", badgeStyle: "bg-secondary-container text-on-secondary-container", badge: "Active", opacity: "" },
    { id: "B002", title: "Loan #B002 (Home Improv.)",  sub: "$14,500 total principal", iconBg: "bg-surface-container-highest", iconColor: "text-outline", icon: "home", badgeStyle: "bg-outline-variant/30 text-on-surface-variant", badge: "In Grace", opacity: "opacity-80" },
  ];
  return (
    <div className="bg-surface-container-low rounded-xl p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-on-surface">Borrower Summary</h3>
          <button onClick={() => navigate("/borrower-view")} className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
            Go to full Borrower view <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ${loan.opacity}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded ${loan.iconBg} flex items-center justify-center ${loan.iconColor}`}>
                  <Icon name={loan.icon} />
                </div>
                <div>
                  <p className="font-bold text-sm">{loan.title}</p>
                  <p className="text-xs text-tertiary">{loan.sub}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-bold ${loan.badgeStyle}`}>{loan.badge}</span>
            </div>
          ))}
          <div className="pt-2">
            <p className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Icon name="calendar_today" filled className="text-primary" />
              Next automated payment: $520 on 04/25
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    { icon: "format_list_bulleted", label: "View Loan Listings", style: "bg-primary text-on-primary shadow-sm hover:opacity-90", path: "/dashboard/loans" },
    { icon: "note_add",             label: "Apply for a Loan",   style: "bg-secondary text-on-secondary shadow-sm hover:opacity-90", path: "/dashboard/loans/apply" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4 mb-12">
      {actions.map(({ icon, label, style, path }) => (
        <button key={label} onClick={() => navigate(path)} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${style}`}>
          <Icon name={icon} /> {label}
        </button>
      ))}
    </div>
  );
}

function RecentActivity() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-on-surface">Recent Activity</h3>
        <button className="text-sm text-primary font-bold hover:underline">View All</button>
      </div>
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
        {ACTIVITY.map(({ icon, bg, textColor, title, sub, amount, amountColor, time }) => (
          <div key={title} className="p-5 hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4 max-w-lg">
              <div className={`w-10 h-10 shrink-0 rounded-full ${bg} ${textColor} flex items-center justify-center`}>
                <Icon name={icon} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{title}</p>
                <p className="text-xs text-tertiary">{sub}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`font-extrabold ${amountColor}`}>{amount}</p>
                <p className="text-xs text-outline">{time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function UserDashboard() {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body pb-16 md:pb-0">
      <TopNav />

      <main className="p-4 sm:p-8 min-h-screen">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-background tracking-tight">
            Welcome back, Taylor{" "}
            <span className="text-primary-container mx-2">●</span>{" "}
            <span className="font-medium text-sm sm:text-lg text-tertiary">Member since Mar 2022</span>
          </h1>
        </header>

        <SummaryCards />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <InvestorSummary />
          <BorrowerSummary />
        </div>

        <QuickActions />

        <div className="mb-12">
          <RecentActivity />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}