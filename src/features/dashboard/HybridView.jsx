import { useNavigate } from "react-router-dom";
import { useUserName } from '../../utils/AuthUtil';


const styles = `
  /* ── Color tokens (matches InvestorView) ── */
  .hybrid-root {
    --navy: #0f1f3d;
    --navy-2: #1a3259;
    --green: #00a878;
    --green-text: #007a58;
    --green-light: #e0f5ef;
    --red: #e05260;
    --card: #ffffff;
    --bg: #f4f6fb;
    --border: #dde3ef;
    --muted: #8892a4;
  }

  .hybrid-root {
    background: var(--bg);
    color: var(--navy);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding-bottom: 64px;
  }

  /* WELCOME */
  .hv-header { margin-bottom: 28px; }
  .hv-header h1 {
    font-size: 1.65rem; font-weight: 700; color: var(--navy);
    letter-spacing: -0.4px; line-height: 1.25;
  }
  .hv-header .dot { color: var(--green); margin: 0 8px; }
  .hv-header .since {
    font-size: 0.95rem; font-weight: 400; color: var(--muted);
  }

  /* SUMMARY CARDS */
  .hv-summary-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 16px; margin-bottom: 24px;
  }
  .hv-sum-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 22px;
    cursor: pointer; transition: box-shadow 0.2s;
  }
  .hv-sum-card:hover { box-shadow: 0 4px 16px rgba(15,31,61,0.08); }
  .hv-sum-card.accent {
    background: var(--navy-2); border-color: var(--navy-2);
  }
  .hv-card-top {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 14px;
  }
  .hv-card-label {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted);
  }
  .hv-sum-card.accent .hv-card-label { color: rgba(255,255,255,0.55); }
  .hv-card-icon { color: var(--muted); opacity: 0.5; }
  .hv-sum-card.accent .hv-card-icon { color: rgba(255,255,255,0.5); }
  .hv-card-val {
    font-size: 1.85rem; font-weight: 700; color: var(--navy);
    letter-spacing: -1px; line-height: 1.1;
  }
  .hv-sum-card.accent .hv-card-val { color: #fff; }
  .hv-card-sub { font-size: 0.8rem; color: var(--muted); margin-top: 4px; }
  .hv-sum-card.accent .hv-card-sub { color: rgba(255,255,255,0.6); }
  .hv-badge-green {
    display: inline-flex; background: var(--green); color: #fff;
    font-size: 0.65rem; font-weight: 700;
    padding: 4px 10px; border-radius: 20px; margin-top: 10px;
  }
  .hv-snap-rows { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
  .hv-snap-row { display: flex; justify-content: space-between; font-size: 0.78rem; }
  .hv-snap-row .k { color: rgba(255,255,255,0.6); }
  .hv-snap-row .v { color: #fff; font-weight: 600; }

  /* TWO-COLUMN PANELS */
  .hv-two-col {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 18px; margin-bottom: 24px;
  }
  .hv-panel {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 22px; position: relative; overflow: hidden;
  }
  .hv-panel-header {
    display: flex; justify-content: space-between;
    align-items: center; margin-bottom: 18px;
  }
  .hv-panel-title { font-size: 1rem; font-weight: 700; color: var(--navy); }
  .hv-panel-link {
    font-size: 0.8rem; font-weight: 600; color: var(--green-text);
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 4px;
  }
  .hv-panel-link:hover { color: var(--navy); }

  /* INVESTOR MINI GRID */
  .hv-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .hv-mini-cell { background: var(--bg); border-radius: 10px; padding: 14px; }
  .hv-mini-cell.alert { background: #fdeaed; }
  .hv-mini-label {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 6px;
  }
  .hv-mini-cell.alert .hv-mini-label { color: #b0213a; }
  .hv-mini-val { font-size: 1.05rem; font-weight: 700; color: var(--navy); }
  .hv-mini-val-sub { font-size: 0.72rem; font-weight: 400; color: var(--muted); }
  .hv-mini-cell.alert .hv-mini-val { color: #b0213a; }

  /* LOAN ITEMS */
  .hv-loan-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 14px; border-radius: 10px;
    background: var(--bg); margin-bottom: 8px;
  }
  .hv-loan-item:last-of-type { margin-bottom: 0; }
  .hv-loan-left { display: flex; align-items: center; gap: 12px; }
  .hv-loan-ico {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .hv-loan-ico.primary { background: var(--green-light); color: var(--green-text); }
  .hv-loan-ico.neutral { background: var(--border); color: var(--muted); }
  .hv-loan-name { font-size: 0.875rem; font-weight: 600; color: var(--navy); }
  .hv-loan-sub { font-size: 0.75rem; color: var(--muted); }
  .hv-badge {
    display: inline-block; padding: 3px 9px;
    border-radius: 6px; font-size: 0.7rem; font-weight: 700;
  }
  .hv-badge.active { background: var(--green-light); color: var(--green-text); }
  .hv-badge.grace { background: #fdeaed; color: #b0213a; }
  .hv-next-pay {
    font-size: 0.82rem; font-weight: 600; color: var(--navy);
    display: flex; align-items: center; gap: 6px;
    margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);
  }
  .hv-dot-green { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }

  /* QUICK ACTIONS */
  .hv-actions-row { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; }
  .hv-act-btn {
    padding: 10px 22px; border-radius: 10px; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600;
    cursor: pointer; display: flex; align-items: center; gap: 8px;
    transition: all 0.18s;
  }
  .hv-act-btn.primary { background: var(--navy); color: #fff; }
  .hv-act-btn.primary:hover { background: var(--navy-2); }
  .hv-act-btn.secondary { background: var(--green); color: #fff; }
  .hv-act-btn.secondary:hover { background: var(--green-text); }

  /* RECENT ACTIVITY */
  .hv-activity-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden;
  }
  .hv-act-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 22px 14px; border-bottom: 1px solid var(--border);
  }
  .hv-act-title { font-size: 1rem; font-weight: 700; color: var(--navy); }
  .hv-act-view-all {
    font-size: 0.8rem; font-weight: 600; color: var(--green-text);
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .hv-act-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 22px; border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }
  .hv-act-item:last-child { border-bottom: none; }
  .hv-act-item:hover { background: #fafbfd; }
  .hv-act-ico {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .hv-act-ico.income { background: var(--green-light); color: var(--green-text); }
  .hv-act-ico.payment { background: #e8f1fd; color: #1a5cbd; }
  .hv-act-ico.invest { background: #f0eeff; color: #534ab7; }
  .hv-act-ico.progress { background: var(--bg); color: var(--muted); }
  .hv-act-name { font-size: 0.875rem; font-weight: 600; color: var(--navy); }
  .hv-act-sub { font-size: 0.75rem; color: var(--muted); }
  .hv-act-right { margin-left: auto; text-align: right; flex-shrink: 0; }
  .hv-act-amt { font-size: 0.875rem; font-weight: 700; }
  .hv-act-amt.pos { color: var(--green-text); }
  .hv-act-amt.neu { color: var(--navy); }
  .hv-act-amt.info { color: #1a5cbd; }
  .hv-act-time { font-size: 0.72rem; color: var(--muted); font-family: 'DM Mono', monospace; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .hv-summary-grid { grid-template-columns: 1fr 1fr; }
    .hv-sum-card:last-child { grid-column: span 2; }
    .hv-two-col { grid-template-columns: 1fr; }
  }
  @media (max-width: 540px) {
    .hv-summary-grid { grid-template-columns: 1fr; }
    .hv-sum-card:last-child { grid-column: span 1; }
    .hv-header h1 { font-size: 1.25rem; }
  }
`;

/* ── Inline SVG icons ── */
const Ic = ({ n, s = 17 }) => {
  const icons = {
    trend: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>,
    wallet: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    layers: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    receipt: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" /></svg>,
    home: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H5a2 2 0 0 1-2-2z" /></svg>,
    list: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    plus: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    clock: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    tx: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    arrow: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>,
  };
  return icons[n] || null;
};

/* ── Activity data ── */
const ACTIVITY = [
  { ico: "income", iconName: "trend", title: "Interest Received", sub: "From 12 Active Loan Portfolios", amount: "+$142.30", amtClass: "pos", time: "Today, 9:41 AM" },
  { ico: "payment", iconName: "tx", title: "Loan Payment Made", sub: "Loan #B001 (Scheduled)", amount: "-$520.00", amtClass: "neu", time: "Yesterday" },
  { ico: "invest", iconName: "layers", title: "New Investment", sub: "Auto-invest: Green Energy Project", amount: "-$250.00", amtClass: "neu", time: "Apr 21, 2024" },
  { ico: "progress", iconName: "clock", title: "Funding Progress", sub: "Tech Startup #T24 Reached 80%", amount: "80% Full", amtClass: "info", time: "Apr 20, 2024" },
];


/* ── Components ── */

function SummaryCards({ navigate }) {
  return (
    <div className="hv-summary-grid">
      <div className="hv-sum-card" onClick={() => navigate("/investor-view")}>
        <div className="hv-card-top">
          <div className="hv-card-label">As Investor</div>
          <span className="hv-card-icon"><Ic n="trend" /></span>
        </div>
        <div className="hv-card-val">$18,450</div>
        <div className="hv-card-sub">Total Invested</div>
        <span className="hv-badge-green">+9.3% Avg. Annual Return</span>
      </div>

      <div className="hv-sum-card" onClick={() => navigate("/borrower-view")}>
        <div className="hv-card-top">
          <div className="hv-card-label">As Borrower</div>
          <span className="hv-card-icon"><Ic n="wallet" /></span>
        </div>
        <div className="hv-card-val">$12,000</div>
        <div className="hv-card-sub">Total Borrowed</div>
        <div style={{ marginTop: 10, fontSize: "0.8rem", color: "var(--muted)" }}>
          <span style={{ fontWeight: 700, color: "var(--navy)" }}>8.5%</span> Avg. Loan Rate
        </div>
      </div>

      <div className="hv-sum-card accent">
        <div className="hv-card-top">
          <div className="hv-card-label">Combined Snapshot</div>
          <span className="hv-card-icon"><Ic n="layers" /></span>
        </div>
        <div className="hv-card-val">+$6,450</div>
        <div className="hv-card-sub">Net Worth (P2P)</div>
        <div className="hv-snap-rows">
          <div className="hv-snap-row">
            <span className="k">Investor: $450 available</span>
            <span className="v">Next Action</span>
          </div>
          <div className="hv-snap-row">
            <span className="k">Borrower: Due 4/25</span>
            <span className="v">Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestorSummary({ navigate }) {
  return (
    <div className="hv-panel">
      <div className="hv-panel-header">
        <div className="hv-panel-title">Investor Summary</div>
        <button className="hv-panel-link" onClick={() => navigate("/investor-view")}>
          Full Investor View <Ic n="arrow" s={13} />
        </button>
      </div>
      <div className="hv-mini-grid">
        {[
          { label: "Portfolio", value: "23 Active Loans", sub: null, cls: "" },
          { label: "Principal", value: "$12,450", sub: null, cls: "" },
          { label: "Next Payment", value: "$410", sub: "on 04/25", cls: "" },
          { label: "Alerts", value: "1 Late Loan", sub: null, cls: "alert" },
        ].map(({ label, value, sub, cls }) => (
          <div key={label} className={`hv-mini-cell ${cls}`}>
            <div className="hv-mini-label">{label}</div>
            <div className="hv-mini-val">
              {value}{" "}
              {sub && <span className="hv-mini-val-sub">{sub}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BorrowerSummary({ navigate }) {
  const loans = [
    { id: "B001", name: "Loan #B001 (Business Exp.)", sub: "$520 monthly payment", ico: "primary", icon: "receipt", badge: "active", label: "Active", opacity: 1 },
    { id: "B002", name: "Loan #B002 (Home Improv.)", sub: "$14,500 total principal", ico: "neutral", icon: "home", badge: "grace", label: "In Grace", opacity: 0.8 },
  ];
  return (
    <div className="hv-panel">
      <div className="hv-panel-header">
        <div className="hv-panel-title">Borrower Summary</div>
        <button className="hv-panel-link" onClick={() => navigate("/borrower-view")}>
          Full Borrower View <Ic n="arrow" s={13} />
        </button>
      </div>
      {loans.map((loan) => (
        <div key={loan.id} className="hv-loan-item" style={{ opacity: loan.opacity }}>
          <div className="hv-loan-left">
            <div className={`hv-loan-ico ${loan.ico}`}>
              <Ic n={loan.icon} s={16} />
            </div>
            <div>
              <div className="hv-loan-name">{loan.name}</div>
              <div className="hv-loan-sub">{loan.sub}</div>
            </div>
          </div>
          <span className={`hv-badge ${loan.badge}`}>{loan.label}</span>
        </div>
      ))}
      <div className="hv-next-pay">
        <span className="hv-dot-green" />
        Next automated payment: $520 on 04/25
      </div>
    </div>
  );
}

function QuickActions({ navigate }) {
  return (
    <div className="hv-actions-row">
      <button className="hv-act-btn primary" onClick={() => navigate("/dashboard/loans")}>
        <Ic n="list" s={15} /> View Loan Listings
      </button>
      <button className="hv-act-btn secondary" onClick={() => navigate("/dashboard/loans/apply")}>
        <Ic n="plus" s={15} /> Apply for a Loan
      </button>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="hv-activity-card">
      <div className="hv-act-head">
        <div className="hv-act-title">Recent Activity</div>
        <button className="hv-act-view-all">View All</button>
      </div>
      {ACTIVITY.map((item) => (
        <div key={item.title} className="hv-act-item">
          <div className={`hv-act-ico ${item.ico}`}>
            <Ic n={item.iconName} s={16} />
          </div>
          <div>
            <div className="hv-act-name">{item.title}</div>
            <div className="hv-act-sub">{item.sub}</div>
          </div>
          <div className="hv-act-right">
            <div className={`hv-act-amt ${item.amtClass}`}>{item.amount}</div>
            <div className="hv-act-time">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Page ── */

export default function HybridView() {
  const navigate = useNavigate();
  const userName = useUserName();


  return (
    <div className="hybrid-root">
      <style>{styles}</style>

      <main style={{ padding: "28px 24px 48px" }}>
        <header className="hv-header">
          <h1>
            Welcome back, {userName}
            <span className="dot">●</span>
            <span className="since">Member since Mar 2022</span>
          </h1>
        </header>

        <SummaryCards navigate={navigate} />

        <div className="hv-two-col">
          <InvestorSummary navigate={navigate} />
          <BorrowerSummary navigate={navigate} />
        </div>

        <QuickActions navigate={navigate} />

        <RecentActivity />
      </main>
    </div>
  );
}