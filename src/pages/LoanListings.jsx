import { useState } from "react";

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #f0efe9;
  --surface:   #ffffff;
  --navy:      #1b2a44;
  --navy2:     #243358;
  --teal:      #1a6b6b;
  --teal-lt:   #e8f4f4;
  --gold:      #c4862b;
  --accent:    #2b5ea7;
  --accent-lt: #eaf0fb;
  --green:     #1e7d4f;
  --green-lt:  #e6f5ee;
  --red:       #b83232;
  --text:      #1b2a44;
  --muted:     #6b7585;
  --light:     #a0a8b5;
  --border:    #e0dfd8;
  --shadow-sm: 0 1px 4px rgba(0,0,0,.06);
  --shadow-md: 0 4px 18px rgba(0,0,0,.09);
  --shadow-lg: 0 8px 36px rgba(0,0,0,.13);
  --r:         14px;
  --r-sm:      8px;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* ── TOP NAV ── */
.nav {
  height: 58px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}
.nav-brand {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--navy);
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.nav-links {
  display: flex;
  gap: 2px;
}
.nav-link {
  padding: 6px 14px;
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--muted);
  border-radius: 6px;
  cursor: pointer;
  border: none;
  background: none;
  font-family: 'DM Sans', sans-serif;
  transition: all .18s;
  position: relative;
}
.nav-link:hover { color: var(--navy); background: var(--bg); }
.nav-link.active {
  color: var(--navy);
  font-weight: 600;
}
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 14px;
  right: 14px;
  height: 2px;
  background: var(--navy);
  border-radius: 2px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--muted);
  font-size: .95rem;
  transition: all .18s;
}
.icon-btn:hover { background: var(--bg); color: var(--navy); }
.invest-btn-nav {
  padding: 7px 18px;
  background: var(--navy);
  color: #fff;
  border: none;
  border-radius: var(--r-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: .84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  white-space: nowrap;
}
.invest-btn-nav:hover {
  background: var(--navy2);
  box-shadow: 0 4px 12px rgba(27,42,68,.28);
  transform: translateY(-1px);
}
.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: .8rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid var(--border);
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--navy);
  border-radius: 2px;
  transition: all .3s;
}

/* ── LAYOUT ── */
.layout {
  display: flex;
  min-height: calc(100vh - 58px);
}

/* ── SIDEBAR ── */
.sidebar {
  width: 210px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: sticky;
  top: 58px;
  height: calc(100vh - 58px);
  overflow-y: auto;
}
.sidebar-stat {
  padding: 14px 18px 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.stat-icon-box {
  width: 34px;
  height: 34px;
  background: var(--navy);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: .85rem;
  flex-shrink: 0;
}
.stat-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; }
.stat-value { font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 600; color: var(--navy); }
.sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }
.s-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 12px;
  border-radius: var(--r-sm);
  cursor: pointer;
  font-size: .84rem;
  font-weight: 500;
  color: var(--muted);
  border: none;
  background: none;
  text-align: left;
  font-family: 'DM Sans', sans-serif;
  transition: all .18s;
}
.s-item:hover { background: var(--bg); color: var(--navy); }
.s-item.active { background: var(--navy); color: #fff; }
.s-item .ico { font-size: .95rem; width: 20px; text-align: center; }
.sidebar-bottom {
  padding: 16px 10px 6px;
  border-top: 1px solid var(--border);
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.filter-btn {
  width: 100%;
  padding: 9px 14px;
  border: 1.5px solid var(--navy);
  background: transparent;
  color: var(--navy);
  border-radius: var(--r-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: .82rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all .2s;
  margin-bottom: 10px;
}
.filter-btn:hover { background: var(--navy); color: #fff; }
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.35);
  z-index: 200;
  backdrop-filter: blur(2px);
}

/* ── MAIN ── */
.main {
  flex: 1;
  padding: 28px 32px;
  overflow-x: hidden;
}

/* ── PAGE HEADER ── */
.page-header { margin-bottom: 22px; }
.page-title {
  font-family: 'Fraunces', serif;
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--navy);
  letter-spacing: -0.04em;
  line-height: 1.1;
}
.page-subtitle { font-size: .88rem; color: var(--muted); margin-top: 5px; line-height: 1.5; max-width: 520px; }

/* ── FILTER BAR ── */
.filter-bar {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  box-shadow: var(--shadow-sm);
}
.filter-group { display: flex; flex-direction: column; gap: 6px; }
.filter-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; }
.grade-tabs { display: flex; gap: 4px; }
.grade-tab {
  padding: 5px 14px;
  border-radius: 6px;
  border: 1.5px solid var(--border);
  background: transparent;
  font-family: 'DM Mono', monospace;
  font-size: .8rem;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: all .18s;
}
.grade-tab:hover { border-color: var(--navy); color: var(--navy); }
.grade-tab.active { background: var(--navy); color: #fff; border-color: var(--navy); }
.term-select {
  padding: 7px 32px 7px 12px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  font-family: 'DM Sans', sans-serif;
  font-size: .84rem;
  color: var(--text);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7585' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  outline: none;
}
.range-group { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 140px; }
.range-header { display: flex; justify-content: space-between; align-items: center; }
.range-value { font-family: 'DM Mono', monospace; font-size: .78rem; font-weight: 500; color: var(--navy); }
.range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 99px;
  background: linear-gradient(to right, var(--navy) 50%, var(--border) 50%);
  outline: none;
  cursor: pointer;
}
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--navy);
  cursor: pointer;
  border: 3px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
}
.apply-btn {
  padding: 9px 22px;
  background: var(--navy);
  color: #fff;
  border: none;
  border-radius: var(--r-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: .84rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all .2s;
  margin-left: auto;
}
.apply-btn:hover { background: var(--navy2); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(27,42,68,.25); }

/* ── CONTENT GRID ── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 300px;
  gap: 18px;
  align-items: start;
}
.loans-col { display: flex; flex-direction: column; gap: 18px; }
.sidebar-col { display: flex; flex-direction: column; gap: 18px; }

/* ── LOAN CARD ── */
.loan-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
  transition: box-shadow .2s, transform .2s;
  animation: fadeUp .4s ease both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.loan-card:nth-child(1) { animation-delay: .05s; }
.loan-card:nth-child(2) { animation-delay: .1s; }
.loan-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.loan-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}
.loan-id { font-family: 'DM Mono', monospace; font-size: .68rem; color: var(--light); margin-bottom: 3px; }
.loan-name {
  font-family: 'Fraunces', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--navy);
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.loan-desc { font-size: .77rem; color: var(--muted); margin-bottom: 14px; }
.grade-badge {
  padding: 4px 10px 4px 8px;
  border-radius: 20px;
  font-family: 'DM Mono', monospace;
  font-size: .68rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
  flex-shrink: 0;
}
.grade-badge .gb-label { font-size: .55rem; letter-spacing: .08em; text-transform: uppercase; opacity: .7; }
.grade-badge .gb-val { font-size: .88rem; font-weight: 700; }
.grade-A { background: var(--green-lt); color: var(--green); }
.grade-B { background: var(--accent-lt); color: var(--accent); }
.grade-C { background: #fef3e2; color: var(--gold); }
.loan-metrics { display: flex; gap: 20px; margin-bottom: 14px; }
.metric {}
.metric-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 2px; }
.metric-value { font-family: 'Fraunces', serif; font-size: 1.15rem; font-weight: 600; color: var(--navy); }
.metric-value span { font-family: 'DM Sans', sans-serif; font-size: .72rem; color: var(--muted); font-weight: 500; }
.yield-value { color: var(--teal) !important; }
.fund-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  font-size: .78rem;
}
.fund-pct { color: var(--text); font-weight: 600; }
.fund-time { color: var(--muted); display: flex; align-items: center; gap: 4px; }
.prog-track { height: 6px; background: var(--border); border-radius: 99px; overflow: hidden; margin-bottom: 16px; }
.prog-fill { height: 100%; border-radius: 99px; transition: width .8s cubic-bezier(.4,0,.2,1); }
.fill-navy { background: var(--navy); }
.fill-teal { background: var(--teal); }
.fill-gold { background: var(--gold); }
.invest-now-btn {
  width: 100%;
  padding: 11px;
  background: var(--navy);
  color: #fff;
  border: none;
  border-radius: var(--r-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: .87rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  letter-spacing: .01em;
}
.invest-now-btn:hover { background: var(--navy2); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(27,42,68,.28); }

/* ── SIDEBAR PANELS ── */
.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  animation: fadeUp .4s ease both;
}
.panel:nth-child(1) { animation-delay: .12s; }
.panel:nth-child(2) { animation-delay: .2s; }
.panel:nth-child(3) { animation-delay: .28s; }
.panel-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 14px; }
.stat-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--border); }
.stat-row:last-child { border-bottom: none; }
.stat-row-key { font-size: .84rem; color: var(--muted); }
.stat-row-val { font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 600; color: var(--navy); }

/* Bar Chart */
.vol-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; margin-top: 18px; margin-bottom: 10px; }
.bar-chart { display: flex; align-items: flex-end; gap: 5px; height: 60px; }
.bar { flex: 1; border-radius: 4px 4px 0 0; background: var(--border); transition: background .2s; }
.bar.hi { background: var(--navy); }
.bar:hover { background: var(--accent); }

/* Auto-invest panel */
.panel-dark {
  background: var(--navy);
  border-color: var(--navy2);
  color: #fff;
}
.panel-dark .panel-label { color: rgba(255,255,255,.5); }
.auto-invest-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.ai-icon { font-size: 1.1rem; }
.ai-tag {
  font-size: .6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  background: var(--teal);
  color: #fff;
  padding: 2px 7px;
  border-radius: 4px;
}
.ai-title {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 12px;
}
.ai-cap-row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: .78rem; }
.ai-cap-label { color: rgba(255,255,255,.6); }
.ai-cap-val { color: #fff; font-weight: 600; }
.ai-prog-track { height: 5px; background: rgba(255,255,255,.15); border-radius: 99px; overflow: hidden; margin-bottom: 10px; }
.ai-prog-fill { height: 100%; border-radius: 99px; background: var(--teal); }
.ai-note { font-size: .73rem; color: rgba(255,255,255,.45); line-height: 1.5; }

/* Market Pulse */
.pulse-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.pulse-delta { font-family: 'DM Mono', monospace; font-size: .78rem; color: var(--green); font-weight: 500; }
.pulse-item { display: flex; align-items: center; gap: 12px; }
.pulse-icon-box {
  width: 38px;
  height: 38px;
  background: var(--accent-lt);
  border-radius: var(--r-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.pulse-title { font-size: .83rem; font-weight: 600; color: var(--navy); }
.pulse-sub { font-size: .75rem; color: var(--muted); }

/* ── RESPONSIVE ── */
@media (max-width: 1050px) {
  .content-grid { grid-template-columns: 1fr 1fr; }
  .sidebar-col { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 860px) {
  .sidebar { display: none; }
  .sidebar.open {
    display: flex;
    position: fixed;
    left: 0; top: 0;
    height: 100vh;
    z-index: 300;
    animation: slideIn .25s ease;
  }
  @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  .sidebar-overlay { display: block; }
  .hamburger { display: flex; }
  .nav-links { display: none; }
  .main { padding: 18px 16px; }
  .filter-bar { gap: 14px; }
  .content-grid { grid-template-columns: 1fr; }
  .sidebar-col { grid-template-columns: 1fr; }
  .invest-btn-nav { display: none; }
}
@media (max-width: 540px) {
  .nav { padding: 0 14px; }
  .page-title { font-size: 1.6rem; }
  .filter-bar { padding: 14px 16px; flex-direction: column; align-items: stretch; }
  .apply-btn { margin-left: 0; }
  .sidebar-col { grid-template-columns: 1fr; }
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const sidebarItems = [
  { ico: "⊙", label: "Overview" },
  { ico: "◈", label: "Active Bids", active: true },
  { ico: "⬡", label: "Risk Analysis" },
  { ico: "⤢", label: "Lender Stats" },
  { ico: "❑", label: "Documents" },
];

const loans = [
  {
    id: "#L-892",
    name: "Small Biz Expansion",
    desc: "Industrial Coffee Equipment",
    grade: "A",
    requested: "$12,500",
    yield: "8.5%",
    funded: 75,
    timeLeft: "2 days left",
    fillClass: "fill-navy",
  },
  {
    id: "#L-904",
    name: "Medical Logistics",
    desc: "Fleet Vehicle Maintenance",
    grade: "B",
    requested: "$5,000",
    yield: "9.2%",
    funded: 42,
    timeLeft: "5 days left",
    fillClass: "fill-teal",
  },
  {
    id: "#L-771",
    name: "Solar Tech R&D",
    desc: "Sustainable Energy Materials",
    grade: "A",
    requested: "$25,000",
    yield: "7.8%",
    funded: 91,
    timeLeft: "4 hours left",
    fillClass: "fill-navy",
  },
  {
    id: "#L-844",
    name: "Artisan Workshop",
    desc: "Inventory Restock — Ceramics",
    grade: "C",
    requested: "$8,200",
    yield: "11.4%",
    funded: 22,
    timeLeft: "8 days left",
    fillClass: "fill-gold",
  },
];

const barHeights = [30, 42, 28, 50, 38, 55, 60, 70, 80];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function LoanListings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeGrade, setActiveGrade] = useState("All");
  const [term, setTerm] = useState("12 Months");

  const gradeColor = (g) =>
    g === "A" ? "grade-A" : g === "B" ? "grade-B" : "grade-C";

  const filtered =
    activeGrade === "All"
      ? loans
      : loans.filter((l) => l.grade === activeGrade);

  // Split into two columns
  const col1 = filtered.filter((_, i) => i % 2 === 0);
  const col2 = filtered.filter((_, i) => i % 2 === 1);

  return (
    <>
      <style>{css}</style>

      {/* TOP NAV */}
      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>
          <span className="nav-brand">LendSanctuary</span>
        </div>
        <div className="nav-links">
          {["Marketplace", "Portfolio", "Insights", "History"].map((l) => (
            <button key={l} className={`nav-link${l === "Marketplace" ? " active" : ""}`}>{l}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="icon-btn" title="Notifications">🔔</button>
          <button className="icon-btn" title="Settings">⚙️</button>
          <button className="invest-btn-nav">Invest Now</button>
          <div className="avatar">JS</div>
        </div>
      </nav>

      <div className="layout">
        {/* OVERLAY */}
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* SIDEBAR */}
        <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="sidebar-stat">
            <div className="stat-icon-box">📊</div>
            <div>
              <div className="stat-label">Statistics</div>
              <div className="stat-value">Live P2P Volume</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`s-item${item.active ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="ico">{item.ico}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <button className="filter-btn">⚖ Filter Opportunities</button>
            <button className="s-item">❓ Support</button>
            <button className="s-item">→ Sign Out</button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">

          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Loan Marketplace</h1>
            <p className="page-subtitle">
              Browse and fund vetted peer-to-peer loan opportunities with advanced risk modeling and transparent yield structures.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="filter-group">
              <span className="filter-label">Risk Grade</span>
              <div className="grade-tabs">
                {["All", "A", "B", "C"].map((g) => (
                  <button
                    key={g}
                    className={`grade-tab${activeGrade === g ? " active" : ""}`}
                    onClick={() => setActiveGrade(g)}
                  >{g}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">Term Length</span>
              <select
                className="term-select"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              >
                {["6 Months", "12 Months", "24 Months", "36 Months"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="range-group">
              <div className="range-header">
                <span className="filter-label">Loan Amount Range</span>
                <span className="range-value">$1k – $50k</span>
              </div>
              <input type="range" className="range-slider" min={0} max={100} defaultValue={50} />
            </div>
            <button className="apply-btn">🔍 Apply</button>
          </div>

          {/* Content Grid */}
          <div className="content-grid">
            {/* Col 1 */}
            <div className="loans-col">
              {col1.map((loan) => (
                <LoanCard key={loan.id} loan={loan} gradeColor={gradeColor} />
              ))}
            </div>
            {/* Col 2 */}
            <div className="loans-col">
              {col2.map((loan) => (
                <LoanCard key={loan.id} loan={loan} gradeColor={gradeColor} />
              ))}
            </div>
            {/* Right Sidebar */}
            <div className="sidebar-col">
              {/* Marketplace Stats */}
              <div className="panel">
                <div className="panel-label">Marketplace Stats</div>
                {[
                  { k: "Average Yield", v: "9.1%" },
                  { k: "Loans Available", v: "42" },
                  { k: "Total Value", v: "$1.2M" },
                ].map((s) => (
                  <div className="stat-row" key={s.k}>
                    <span className="stat-row-key">{s.k}</span>
                    <span className="stat-row-val">{s.v}</span>
                  </div>
                ))}
                <div className="vol-label">Volume Trend</div>
                <div className="bar-chart">
                  {barHeights.map((h, i) => (
                    <div
                      key={i}
                      className={`bar${i >= barHeights.length - 2 ? " hi" : ""}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Auto-Invest */}
              <div className="panel panel-dark">
                <div className="auto-invest-header">
                  <span className="ai-icon">⚡</span>
                  <span className="ai-tag">Auto-Invest Active</span>
                </div>
                <div className="ai-title">Aggressive Yield Strategy</div>
                <div className="ai-cap-row">
                  <span className="ai-cap-label">Capacity Used</span>
                  <span className="ai-cap-val">84%</span>
                </div>
                <div className="ai-prog-track">
                  <div className="ai-prog-fill" style={{ width: "84%" }} />
                </div>
                <div className="ai-note">
                  System automatically bidding on Grade A/B loans with &gt;8% Yield.
                </div>
              </div>

              {/* Market Pulse */}
              <div className="panel">
                <div className="pulse-header">
                  <span className="panel-label" style={{ margin: 0 }}>Market Pulse</span>
                  <span className="pulse-delta">↗ +0.4%</span>
                </div>
                <div className="pulse-item">
                  <div className="pulse-icon-box">📈</div>
                  <div>
                    <div className="pulse-title">Lender Confidence</div>
                    <div className="pulse-sub">Strong Market Demand</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

function LoanCard({ loan, gradeColor }) {
  return (
    <div className="loan-card">
      <div className="loan-card-top">
        <div>
          <div className="loan-id">{loan.id}</div>
          <div className="loan-name">{loan.name}</div>
        </div>
        <div className={`grade-badge ${gradeColor(loan.grade)}`}>
          <span className="gb-label">Grade</span>
          <span className="gb-val">{loan.grade}</span>
        </div>
      </div>
      <div className="loan-desc">{loan.desc}</div>
      <div className="loan-metrics">
        <div className="metric">
          <div className="metric-label">Requested</div>
          <div className="metric-value">{loan.requested}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Yield</div>
          <div className="metric-value yield-value">
            {loan.yield} <span>APR</span>
          </div>
        </div>
      </div>
      <div className="fund-row">
        <span className="fund-pct">{loan.funded}% Funded</span>
        <span className="fund-time">🕐 {loan.timeLeft}</span>
      </div>
      <div className="prog-track">
        <div className={`prog-fill ${loan.fillClass}`} style={{ width: `${loan.funded}%` }} />
      </div>
      <button className="invest-now-btn">Invest Now</button>
    </div>
  );
}
