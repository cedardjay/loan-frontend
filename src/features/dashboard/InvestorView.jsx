import { useNavigate } from "react-router-dom";

const styles = `
  
  /* WELCOME */
  .welcome { margin-bottom: 24px; }
  .welcome h1 { font-size: 1.85rem; font-weight: 700; color: var(--navy); letter-spacing: -0.4px; }
  .welcome p { font-size: 0.875rem; color: var(--muted); margin-top: 5px; }

  /* STAT CARDS */
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
  .stat-card {
    background: var(--card); border-radius: 14px; padding: 22px 22px 20px;
    border: 1px solid var(--border); position: relative; overflow: hidden;
  }
  .stat-card.net-returns { border-left: 4px solid var(--green); }
  .stat-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .badge-green { background: var(--green); color: #fff; font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
  .stat-val { font-size: 1.95rem; font-weight: 700; color: var(--navy); letter-spacing: -1px; line-height: 1.1; }
  .stat-val.green { color: var(--green); }
  .stat-sub { font-size: 0.775rem; color: var(--muted); margin-top: 5px; }
  .stat-icon { position: absolute; top: 20px; right: 20px; color: var(--muted); opacity: 0.35; }
  .deploy-link { font-size: 0.8rem; font-weight: 600; color: var(--navy-2); text-decoration: none; display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; cursor: pointer; }
  
  .browse-loans-btn {
    width: 100%; margin-top: 12px; padding: 10px; background: var(--green); color: #fff;
    border: none; border-radius: 9px; font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .browse-loans-btn:hover { background: var(--green-text); transform: translateY(-1px); }

  /* CONTENT GRID */
  .content-grid { display: grid; grid-template-columns: 1fr 272px; gap: 18px; align-items: start; }

  /* CHART CARD */
  .chart-card { background: var(--card); border-radius: 14px; border: 1px solid var(--border); padding: 24px; margin-bottom: 18px; }
  .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; flex-wrap: wrap; gap: 8px; }
  .chart-title { font-size: 1.05rem; font-weight: 700; color: var(--navy); }
  .chart-sub { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
  .period-btn { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 6px 14px; font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 600; color: var(--navy); cursor: pointer; }

  .chart-area { width: 100%; height: 200px; margin-top: 20px; position: relative; }
  svg.chart { width: 100%; height: 100%; overflow: visible; }

  .x-labels { display: flex; justify-content: space-between; margin-top: 8px; padding: 0 4px; }
  .x-label { font-size: 0.72rem; color: var(--muted); font-family: 'DM Mono', monospace; }

  /* INVESTMENTS TABLE */
  .investments-card { background: var(--card); border-radius: 14px; border: 1px solid var(--border); overflow: hidden; }
  .inv-header { padding: 20px 22px 14px; border-bottom: 1px solid var(--border); }
  .inv-title { font-size: 1.05rem; font-weight: 700; color: var(--navy); }
  .inv-table { width: 100%; border-collapse: collapse; }
  .inv-table th {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    color: var(--muted); padding: 10px 22px; text-align: left; background: var(--bg);
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
  .interest-val { font-family: 'DM Mono', monospace; font-size: 0.875rem; font-weight: 500; color: var(--navy); }
  .status-on { display: inline-flex; align-items: center; gap: 5px; color: var(--green-text); font-size: 0.8rem; font-weight: 600; }
  .status-grace { display: inline-flex; align-items: center; gap: 5px; color: var(--red); font-size: 0.8rem; font-weight: 600; }
  .dot-green { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
  .dot-red { width: 7px; height: 7px; border-radius: 50%; background: var(--red); }
  .date-val { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--muted); }

  /* RIGHT PANEL */
  .right-panel { display: flex; flex-direction: column; gap: 16px; }

  /* INSIGHTS CARD */
  .insights-card {
    background: var(--navy-2); border-radius: 14px; padding: 22px;
    position: relative; overflow: hidden;
  }
  .insights-bg {
    position: absolute; top: -30px; right: -30px; width: 130px; height: 130px;
    border-radius: 50%; background: rgba(255,255,255,0.04);
  }
  .insights-bg2 {
    position: absolute; bottom: -20px; left: -20px; width: 90px; height: 90px;
    border-radius: 50%; background: rgba(255,255,255,0.03);
  }
  .insights-title { font-size: 0.95rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; margin-bottom: 14px; position: relative; z-index: 1; }
  .sparkle { font-size: 1rem; }
  .insights-text { font-size: 0.82rem; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 18px; position: relative; z-index: 1; }
  .configure-btn {
    width: 100%; padding: 11px; background: #fff; color: var(--navy); border: none;
    border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
    font-weight: 700; cursor: pointer; transition: opacity 0.2s; position: relative; z-index: 1;
  }
  .configure-btn:hover { opacity: 0.88; }

  /* RECOMMENDED */
  .recommended-card { background: var(--card); border-radius: 14px; border: 1px solid var(--border); overflow: hidden; }
  .rec-header { padding: 16px 18px 10px; }
  .rec-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
  .rec-item { padding: 13px 18px; border-top: 1px solid var(--border); cursor: pointer; transition: background 0.15s; }
  .rec-item:hover { background: var(--bg); }
  .rec-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
  .rec-name { font-size: 0.875rem; font-weight: 600; color: var(--navy); }
  .rec-bottom { display: flex; justify-content: space-between; align-items: center; }
  .rec-yield { font-size: 0.78rem; color: var(--muted); }
  .rec-left { font-size: 0.78rem; font-weight: 600; color: var(--green-text); }
  .view-mkt { width: 100%; padding: 12px; background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600; color: var(--navy); cursor: pointer; border-top: 1px solid var(--border); transition: background 0.15s; }
  .view-mkt:hover { background: var(--bg); }

  /* PROMO */
  .promo-card {
    border-radius: 14px; overflow: hidden; min-height: 150px; position: relative;
    background: linear-gradient(135deg, #101c30 0%, #1a3259 60%, #0e2140 100%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 20px;
  }
  .promo-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 30%, rgba(10,20,40,0.85) 100%);
  }
  .promo-grid {
    position: absolute; inset: 0; opacity: 0.08;
    background-image: repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 20px),
      repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 20px);
  }
  .promo-text { font-size: 0.875rem; font-weight: 600; color: #fff; line-height: 1.4; position: relative; z-index: 1; }
  .promo-sub { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-top: 4px; position: relative; z-index: 1; }

  

  @media (max-width: 1024px) {
    .content-grid { grid-template-columns: 1fr; }
    .right-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .promo-card { grid-column: span 2; }
  }
  @media (max-width: 768px) {
    :root { --sidebar-w: 210px; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .stat-card:last-child { grid-column: span 2; }
    .right-panel { grid-template-columns: 1fr; }
    .promo-card { grid-column: span 1; }
    .welcome h1 { font-size: 1.45rem; }
  }
  @media (max-width: 480px) {
    .stats-row { grid-template-columns: 1fr; }
    .stat-card:last-child { grid-column: span 1; }
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
    list: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    grid_view: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    account_balance: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    payments: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    receipt_long: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" /><path d="M16 8h-6M16 12h-6M10 16h6" /></svg>,
    description: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    help_outline: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>,
    logout: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    person: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    home: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H5a2 2 0 0 1-2-2z" /></svg>,
  };
  return icons[n] || null;
};

/* ── Sparkline Chart ── */
function PortfolioChart() {
  const data = [14200, 14800, 14600, 15100, 15400, 15200, 15900, 16300, 16100, 16800, 17500, 18450];
  const W = 700, H = 180, pad = 10;
  const min = Math.min(...data) - 500;
  const max = Math.max(...data) + 200;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / (max - min)) * (H - pad * 2);
    return [x, y];
  });
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`;
  const labels = ["APR", "JUL", "OCT", "JAN", "APR"];

  return (
    <div>
      <div className="chart-area">
        <svg className="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00a878" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#00a878" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map(t => (
            <line key={t} x1={pad} y1={H - pad - t * (H - pad * 2)} x2={W - pad} y2={H - pad - t * (H - pad * 2)}
              stroke="#dde3ef" strokeWidth="1" strokeDasharray="4,4" />
          ))}
          <path d={areaPath} fill="url(#chartGrad)" />
          <path d={linePath} fill="none" stroke="#00a878" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="5" fill="#00a878" />
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="9" fill="#00a878" opacity="0.2" />
        </svg>
      </div>
      <div className="x-labels">
        {labels.map(l => <span key={l} className="x-label">{l}</span>)}
      </div>
    </div>
  );
}





const investments = [
  { name: "Small Biz Expansion", grade: "A", amount: "$5,000", interest: "8.5%", status: "on", nextPayment: "Apr 25" },
  { name: "Home Renovation", grade: "B", amount: "$2,500", interest: "10.2%", status: "on", nextPayment: "May 01" },
  { name: "Personal Consolidation", grade: "C", amount: "$1,000", interest: "12.5%", status: "grace", nextPayment: "Apr 19" },
];

const recommended = [
  { name: "Logistics Growth", grade: "A", yield: "9.1% Yield", left: "$2,400 left" },
  { name: "Retail Stocking", grade: "B", yield: "11.4% Yield", left: "$800 left" },
  { name: "Medical Office Eq.", grade: "A", yield: "8.8% Yield", left: "$12,000 left" },
];

export default function InvestorView() {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
         
            {/* WELCOME */}
            <div className="welcome">
              <h1>Welcome back, Taylor</h1>
              <p>Your investment performance is outperforming the benchmark by 2.4%.</p>
            </div>

            {/* STATS */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">
                  Total Invested
                  <span className="badge-green">+12% vs last month</span>
                </div>
                <div className="stat-val">$18,450</div>
              </div>
              <div className="stat-card net-returns">
                <div className="stat-label">Net Returns</div>
                <div className="stat-icon"><Ic n="trend" s={18} /></div>
                <div className="stat-val green">+$2,214</div>
                <div className="stat-sub">9.3% Avg. APY</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Available Cash</div>
                <div className="stat-icon"><Ic n="wallet" s={18} /></div>
                <div className="stat-val">$450</div>
                <div className="deploy-link">Deploy via Auto-invest <Ic n="arrow" s={13} /></div>
                <button
                  className="browse-loans-btn"
                  onClick={() => navigate('/investor/loan-listings')}
                >
                  <Ic n="list" s={16} /> Browse Loan Listings
                </button>
              </div>
            </div>

            {/* CONTENT GRID */}
            <div className="content-grid">
              {/* LEFT */}
              <div>
                {/* CHART */}
                <div className="chart-card">
                  <div className="chart-header">
                    <div>
                      <div className="chart-title">Portfolio Growth</div>
                      <div className="chart-sub">Performance trend over the last 12 months</div>
                    </div>
                    <button className="period-btn">Last 12 Months ↓</button>
                  </div>
                  <PortfolioChart />
                </div>

                {/* INVESTMENTS TABLE */}
                <div className="investments-card">
                  <div className="inv-header">
                    <div className="inv-title">Active Investments</div>
                  </div>
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
                        </tr>
                      </thead>
                      <tbody>
                        {investments.map((inv, i) => (
                          <tr key={i}>
                            <td><span className="borrower-name">{inv.name}</span></td>
                            <td>
                              <span className={`grade-badge grade-${inv.grade.toLowerCase()}`}>
                                Grade {inv.grade}
                              </span>
                            </td>
                            <td>{inv.amount}</td>
                            <td><span className="interest-val">{inv.interest}</span></td>
                            <td>
                              {inv.status === "on"
                                ? <span className="status-on"><span className="dot-green" /> On Time</span>
                                : <span className="status-grace"><span className="dot-red" /> Grace Period</span>
                              }
                            </td>
                            <td><span className="date-val">{inv.nextPayment}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="right-panel">
                <div className="insights-card">
                  <div className="insights-bg" />
                  <div className="insights-bg2" />
                  <div className="insights-title">
                    <span className="sparkle">✦</span> Sanctuary Insights
                  </div>
                  <div className="insights-text">
                    You have $450 idle cash. Enabling Auto-Invest could increase your yield by 1.2% per year.
                  </div>
                  <button className="configure-btn">Configure Auto-Invest</button>
                </div>

                <div className="recommended-card">
                  <div className="rec-header">
                    <div className="rec-label">Recommended for you</div>
                  </div>
                  {recommended.map((r, i) => (
                    <div className="rec-item" key={i}>
                      <div className="rec-top">
                        <span className="rec-name">{r.name}</span>
                        <span className={`grade-badge grade-${r.grade.toLowerCase()}`}>Grade {r.grade}</span>
                      </div>
                      <div className="rec-bottom">
                        <span className="rec-yield">{r.yield}</span>
                        <span className="rec-left">{r.left}</span>
                      </div>
                    </div>
                  ))}
                  <button className="view-mkt">View Marketplace</button>
                </div>

                <div className="promo-card">
                  <div className="promo-img-overlay" />
                  <div className="promo-grid" />
                  <div className="promo-text">Invest in the future of small businesses.</div>
                  <div className="promo-sub">Secured and vetted opportunities, curated for you.</div>
                </div>
              </div>
            </div>
           
    </>
  );
}