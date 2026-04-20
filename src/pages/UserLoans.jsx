import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f4f0;
    --sidebar-bg: #ffffff;
    --card-bg: #ffffff;
    --navy: #1a2540;
    --navy-light: #243052;
    --accent: #c0392b;
    --accent-hover: #a93226;
    --green: #27ae60;
    --teal: #16a085;
    --gold: #e67e22;
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
  .sidebar-item:hover { background: var(--bg); color: var(--navy); }
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
  .main { flex: 1; padding: 32px 36px; overflow-x: hidden; }
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
  .loan-apr {
    text-align: right;
  }
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
    .main { padding: 20px 16px; }
    .bottom-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .topnav { padding: 0 16px; }
    .page-title { font-size: 1.5rem; }
    th, td { padding: 10px 12px; }
    .loan-card { padding: 18px; }
    .loans-grid { grid-template-columns: 1fr; }
  }
`;

const navItems = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "◎", label: "Loans", active: true },
  { icon: "💳", label: "Payments" },
  { icon: "📄", label: "Documents" },
];

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
            <span className="topnav-brand">LendSanctuary</span>
          </div>
          <div className="topnav-links">
            {["Dashboard", "Loans", "Payments", "Documents"].map(l => (
              <button key={l} className={`topnav-link${l === "Loans" ? " active" : ""}`}>{l}</button>
            ))}
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
              <div className="sidebar-brand-name">Fiscal Sanctuary</div>
              <div className="sidebar-brand-sub">Premium P2P Lending</div>
            </div>
            <nav className="sidebar-nav">
              {navItems.map(item => (
                <button key={item.label} className={`sidebar-item${item.active ? " active" : ""}`}
                  onClick={() => setSidebarOpen(false)}>
                  <span className="icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="sidebar-bottom">
              <button className="new-loan-btn">+ New Loan Application</button>
              <button className="sidebar-item">⚙️ Settings</button>
              <button className="sidebar-item">❓ Support</button>
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
      </div>
    </>
  );
}
