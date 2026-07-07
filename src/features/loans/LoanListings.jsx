import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #f0efe9;
  --surface:   #ffffff;
  --navy:      #0e2140;
  --navy-2:    #163059;
  --navy-3:    #1e3f70;
  --green:     #00a878;
  --green-lt:  #e6f7f3;
  --green-text:#007a57;
  --accent:    #e8622a;
  --accent-lt: #eaf0fb;
  --gold:      #c4862b;
  --teal:      #1a6b6b;
  --teal-lt:   #e8f4f4;
  --red:       #e8314a;
  --text:      #0e2140;
  --muted:     #7a8aaa;
  --light:     #a0a8b5;
  --border:    #dde3ef;
  --shadow-sm: 0 1px 4px rgba(0,0,0,.06);
  --shadow-md: 0 4px 18px rgba(0,0,0,.09);
  --r:         14px;
  --r-sm:      8px;
  --sidebar-w: 210px;
}

body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

/* LAYOUT */
.layout { display: flex; min-height: calc(100vh - 56px); }


/* MAIN */
.main { flex: 1; padding: 28px 32px; overflow-x: hidden; padding-bottom: 80px; }

/* PAGE HEADER */
.page-header { margin-bottom: 22px; }
.page-title { font-size: 2.1rem; font-weight: 700; color: var(--navy); letter-spacing: -0.04em; line-height: 1.1; }
.page-subtitle { font-size: .88rem; color: var(--muted); margin-top: 5px; line-height: 1.5; max-width: 520px; }

/* CONTENT GRID */
.content-grid { display: grid; grid-template-columns: 1fr 1fr 300px; gap: 18px; align-items: start; }
.loans-col { display: flex; flex-direction: column; gap: 18px; }
.sidebar-col { display: flex; flex-direction: column; gap: 18px; }

/* LOAN CARD */
.loan-card {
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--r);
  padding: 20px; box-shadow: var(--shadow-sm); position: relative; overflow: hidden;
  transition: box-shadow .2s, transform .2s; animation: fadeUp .4s ease both;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.loan-card:nth-child(1) { animation-delay: .05s; }
.loan-card:nth-child(2) { animation-delay: .1s; }
.loan-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.loan-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
.loan-id { font-family: 'DM Mono', monospace; font-size: .68rem; color: var(--light); margin-bottom: 3px; }
.loan-name { font-size: 1.15rem; font-weight: 700; color: var(--navy); line-height: 1.2; }
.loan-desc { font-size: .77rem; color: var(--muted); margin-bottom: 14px; }
.loan-metrics { display: flex; gap: 20px; margin-bottom: 14px; }
.metric-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 2px; }
.metric-value { font-size: 1.1rem; font-weight: 700; color: var(--navy); }
.yield-value { color: var(--teal) !important; }
.fund-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; font-size: .78rem; }
.fund-pct { color: var(--text); font-weight: 600; }
.fund-time { color: var(--muted); }
.prog-track { height: 6px; background: var(--border); border-radius: 99px; overflow: hidden; margin-bottom: 16px; }
.prog-fill { height: 100%; border-radius: 99px; transition: width .8s cubic-bezier(.4,0,.2,1); }
.fill-navy { background: var(--navy); }
.fill-teal { background: var(--teal); }
.fill-gold { background: var(--gold); }
.invest-now-btn {
  width: 100%; padding: 11px; background: var(--navy); color: #fff; border: none;
  border-radius: var(--r-sm); font-family: 'DM Sans', sans-serif; font-size: .87rem;
  font-weight: 600; cursor: pointer; transition: all .2s;
}
.invest-now-btn:hover { background: var(--navy-2); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(14,33,64,.28); }

/* SIDEBAR PANELS */
.panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); padding: 20px; box-shadow: var(--shadow-sm); }
.panel-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 14px; }
.stat-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--border); }
.stat-row:last-child { border-bottom: none; }
.stat-row-key { font-size: .84rem; color: var(--muted); }
.stat-row-val { font-size: 1rem; font-weight: 700; color: var(--navy); }
.vol-label { font-size: .62rem; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: .07em; margin-top: 18px; margin-bottom: 10px; }
.bar-chart { display: flex; align-items: flex-end; gap: 5px; height: 60px; }
.bar { flex: 1; border-radius: 4px 4px 0 0; background: var(--border); transition: background .2s; }
.bar.hi { background: var(--navy); }
.panel-dark { background: var(--navy); border-color: var(--navy-2); color: #fff; }
.panel-dark .panel-label { color: rgba(255,255,255,.5); }
.auto-invest-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.ai-tag { font-size: .6rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; background: var(--teal); color: #fff; padding: 2px 7px; border-radius: 4px; }
.ai-title { font-size: 1.1rem; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 12px; }
.ai-cap-row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: .78rem; }
.ai-cap-label { color: rgba(255,255,255,.6); }
.ai-cap-val { color: #fff; font-weight: 600; }
.ai-prog-track { height: 5px; background: rgba(255,255,255,.15); border-radius: 99px; overflow: hidden; margin-bottom: 10px; }
.ai-prog-fill { height: 100%; border-radius: 99px; background: var(--teal); }
.ai-note { font-size: .73rem; color: rgba(255,255,255,.45); line-height: 1.5; }
.pulse-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.pulse-delta { font-family: 'DM Mono', monospace; font-size: .78rem; color: var(--green); font-weight: 500; }
.pulse-item { display: flex; align-items: center; gap: 12px; }
.pulse-icon-box { width: 38px; height: 38px; background: var(--accent-lt); border-radius: var(--r-sm); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.pulse-title { font-size: .83rem; font-weight: 600; color: var(--navy); }
.pulse-sub { font-size: .75rem; color: var(--muted); }

.apply-btn {
  padding: 9px 22px; background: var(--navy); color: #fff; border: none;
  border-radius: var(--r-sm); font-family: 'DM Sans', sans-serif; font-size: .84rem;
  font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all .2s;
}
.apply-btn:hover { background: var(--navy-2); }


@media (max-width: 1050px) {
  .content-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .main { padding: 20px 14px; padding-bottom: 80px; }
  .content-grid { grid-template-columns: 1fr; }
}
@media (max-width: 540px) {
  .page-title { font-size: 1.6rem; }
}
`;

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const Ic = ({ n, s = 17 }) => {
  const icons = {
    dashboard: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    portfolio: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v9l5 3" /></svg>,
    market:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
    tx:        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    settings:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    bell:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    menu:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    grid_view: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    account_balance: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    payments:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    person:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  };
  return icons[n] || null;
};


const barHeights = [30, 42, 28, 50, 38, 55, 60, 70, 80];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function LoanListings() {
  const [activeNav, setActiveNav]     = useState("marketplace");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loans, setLoans]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchMarketplaceLoans(); }, []);

  async function fetchMarketplaceLoans() {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getMarketplaceLoans();
      setLoans(data || []);
    } catch (err) {
      setError("Failed to load marketplace loans.");
    } finally {
      setLoading(false);
    }
  }

  function mapLoan(loan) {
    return {
      id:        `#L-${loan.requestId}`,
      name:      loan.borrowerName,
      desc:      loan.purpose || loan.description,
      requested: `$${loan.requestedAmount.toLocaleString()}`,
      yield:     `${loan.interestRate}%`,
      funded:    Math.round(loan.fundingPercentage),
      remaining: `$${loan.remainingAmount.toLocaleString()}`,
      term:      `${loan.termMonths} mo`,
      status:    loan.status,
      fillClass: getFillClass(loan.fundingPercentage),
      rawId:     loan.requestId,
    };
  }

  function getFillClass(pct) {
    if (pct >= 75) return "fill-navy";
    if (pct >= 40) return "fill-teal";
    return "fill-gold";
  }

  const handleNavigation = (path, navId) => {
    setActiveNav(navId);
    navigate(path);
    setSidebarOpen(false);
  };

  const mapped = loans.map(mapLoan);
  const col1   = mapped.filter((_, i) => i % 2 === 0);
  const col2   = mapped.filter((_, i) => i % 2 === 1);

  return (
    <>
      <style>{css}</style>

      <div className="layout">
       
        {/* MAIN */}
        <main className="main">
          <div className="page-header">
            <h1 className="page-title">Loan Marketplace</h1>
            <p className="page-subtitle">
              Browse and fund vetted peer-to-peer loan opportunities with advanced risk modeling and transparent yield structures.
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <button className="apply-btn" onClick={fetchMarketplaceLoans}>
              🔄 Refresh
            </button>
          </div>

          {loading && (
            <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 24 }}>
              Loading marketplace loans...
            </p>
          )}
          {error && (
            <p style={{ color: "var(--red)", fontSize: ".88rem", marginBottom: 24 }}>
              {error}
            </p>
          )}
          {!loading && !error && mapped.length === 0 && (
            <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 24 }}>
              No loans available in the marketplace right now.
            </p>
          )}

          {!loading && !error && mapped.length > 0 && (
            <div className="content-grid">
              <div className="loans-col">
                {col1.map(loan => <LoanCard key={loan.id} loan={loan} navigate={navigate} />)}
              </div>
              <div className="loans-col">
                {col2.map(loan => <LoanCard key={loan.id} loan={loan} navigate={navigate} />)}
              </div>

              <div className="sidebar-col">
                <div className="panel">
                  <div className="panel-label">Marketplace Stats</div>
                  {[
                    { k: "Loans Available", v: mapped.length },
                    { k: "Total Value",    v: `$${loans.reduce((s, l) => s + Number(l.requestedAmount), 0).toLocaleString()}` },
                    { k: "Avg Interest",   v: loans.length ? `${(loans.reduce((s, l) => s + Number(l.interestRate), 0) / loans.length).toFixed(1)}%` : "—" },
                  ].map(s => (
                    <div className="stat-row" key={s.k}>
                      <span className="stat-row-key">{s.k}</span>
                      <span className="stat-row-val">{s.v}</span>
                    </div>
                  ))}
                  <div className="vol-label">Volume Trend</div>
                  <div className="bar-chart">
                    {barHeights.map((h, i) => (
                      <div key={i} className={`bar${i >= barHeights.length - 2 ? " hi" : ""}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <div className="panel panel-dark">
                  <div className="auto-invest-header">
                    <span style={{ fontSize: "1.1rem" }}>⚡</span>
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
          )}
        </main>
      </div>

    </>
  );
}

/* ── Loan Card ── */
function LoanCard({ loan, navigate }) {
  return (
    <div className="loan-card">
      <div className="loan-card-top">
        <div>
          <div className="loan-id">{loan.id}</div>
          <div className="loan-name">{loan.name}</div>
        </div>

        <div
          style={{
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: ".68rem",
            fontWeight: 700,
            background:
              loan.status === "APPROVED"
                ? "var(--green-lt)"
                : loan.status === "PARTIALLY_FUNDED"
                ? "var(--accent-lt)"
                : "var(--teal-lt)",
            color:
              loan.status === "APPROVED"
                ? "var(--green-text)"
                : loan.status === "PARTIALLY_FUNDED"
                ? "var(--accent)"
                : "var(--teal)",
            whiteSpace: "nowrap",
            alignSelf: "flex-start",
          }}
        >
          {loan.status.replace("_", " ")}
        </div>
      </div>

      <div className="loan-desc">{loan.desc}</div>

      <div className="loan-metrics">
        <div>
          <div className="metric-label">Requested</div>
          <div className="metric-value">{loan.requested}</div>
        </div>

        <div>
          <div className="metric-label">Interest</div>
          <div className="metric-value yield-value">
            {loan.yield}{" "}
            <span
              style={{
                fontSize: ".72rem",
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              APR
            </span>
          </div>
        </div>

        <div>
          <div className="metric-label">Term</div>
          <div className="metric-value">{loan.term}</div>
        </div>
      </div>

      <div className="fund-row">
        <span className="fund-pct">{loan.funded}% Funded</span>
        <span className="fund-time">💰 {loan.remaining} left</span>
      </div>

      <div className="prog-track">
        <div
          className={`prog-fill ${loan.fillClass}`}
          style={{ width: `${loan.funded}%` }}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            flex: 1,
            padding: "11px",
            background: "transparent",
            color: "var(--navy)",
            border: "1px solid var(--navy)",
            borderRadius: "var(--r-sm)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: ".87rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .2s",
          }}
          onClick={() =>
            navigate(`/investor/loan-details/${loan.rawId}`)
          }
          onMouseOver={(e) => {
            e.target.style.background = "var(--navy)";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "var(--navy)";
          }}
        >
          View Details
        </button>

        <button
          className="invest-now-btn"
          style={{ flex: 1 }}
          onClick={() =>
            navigate(`/investor/invest/${loan.rawId}`)
          }
        >
          Invest Now
        </button>
      </div>
    </div>
  );
}