import { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
const style = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0f2240;
    --navy-light: #1a3560;
    --navy-mid: #163059;
    --accent: #e8622a;
    --accent-hover: #d4551f;
    --bg: #f0f3f8;
    --card: #ffffff;
    --text: #0f2240;
    --muted: #7a8aaa;
    --border: #dde3ef;
    --green: #2eb87e;
    --sidebar-w: 220px;

    /* Kept from original for loan card colours */
    --teal: #16a085;
    --gold: #e67e22;
    --gold-light: #fef3e2;
    --gold-dark: #b8651a;
    --text-light: #9ca3af;
    --progress-bg: #e5e7eb;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.07);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
    --radius: 14px;
    --radius-sm: 8px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }

  .app-wrap { display: flex; flex-direction: column; min-height: 100vh; }

 
  .icon-btn {
    width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border);
    background: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--navy); transition: background 0.2s;
  }
  .icon-btn:hover { background: var(--bg); }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--navy); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.8rem; font-weight: 600; cursor: pointer; }

  /* ── LAYOUT ── */
  .layout { display: flex; flex: 1; }
  
  /* ── MAIN CONTENT ── */
  .main { flex: 1; padding: 32px 36px; overflow-x: hidden; padding-bottom: 80px; }
  .page-header { margin-bottom: 28px; }
  .page-title { font-size: 2rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .page-subtitle { font-size: 0.9rem; color: var(--muted); margin-top: 4px; }

  /* ── SECTION ── */
  .section { margin-bottom: 36px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-size: 1.05rem; font-weight: 700; color: var(--navy); }
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
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
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
  .loan-id { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--muted); margin-bottom: 4px; }
  .loan-name { font-size: 1.15rem; font-weight: 700; color: var(--navy); letter-spacing: -0.02em; }
  .loan-apr { text-align: right; }
  .loan-apr-label { font-size: 0.65rem; font-weight: 500; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; }
  .loan-apr-value { font-size: 1rem; font-weight: 700; color: var(--accent); font-family: 'DM Mono', monospace; }
  .loan-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .loan-meta-label { font-size: 0.65rem; font-weight: 500; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px; }
  .loan-meta-value { font-size: 0.95rem; font-weight: 700; color: var(--navy); font-family: 'DM Mono', monospace; }
  .loan-meta-value.accent { color: var(--accent); }
  .loan-meta-value.teal { color: var(--teal); }
  .progress-label { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--muted); margin-bottom: 6px; font-weight: 500; }
  .progress-bar { height: 7px; background: var(--progress-bg); border-radius: 99px; overflow: hidden; margin-bottom: 16px; }
  .progress-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(.4,0,.2,1); }
  .fill-blue { background: var(--navy); }
  .fill-teal { background: var(--teal); }
  .pay-btn {
    width: 100%; padding: 11px; background: var(--accent); color: #fff;
    border: none; border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .pay-btn:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(232,98,42,0.3); }

  /* ── PENDING LOANS ── */
  .pending-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
  .pending-card {
    background: var(--gold-light); border: 1px solid #f0d5a8;
    border-radius: var(--radius); padding: 22px;
    position: relative; overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .pending-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
    background: var(--gold);
  }
  .pending-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
  .pending-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
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
    border: none; border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .pending-btn-primary:hover { background: var(--gold-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(230,126,34,0.3); }
  .pending-btn-secondary {
    padding: 9px 14px; background: transparent; color: var(--gold-dark);
    border: 1.5px solid #f0c040; border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .pending-btn-secondary:hover { background: rgba(255,255,255,0.5); }
  .pending-loading, .pending-error, .pending-empty {
    background: var(--gold-light); border: 1.5px dashed #f0d5a8;
    border-radius: var(--radius); padding: 32px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; text-align: center;
  }
  .pending-empty-icon { font-size: 2rem; }
  .pending-empty-text { font-size: 0.88rem; color: var(--gold-dark); font-weight: 500; }
  .pending-empty-sub { font-size: 0.78rem; color: #b8924a; }

  /* ── TABLE ── */
  .table-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: var(--bg); }
  th { padding: 12px 20px; text-align: left; font-size: 0.7rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; }
  td { padding: 15px 20px; font-size: 0.87rem; color: var(--text); border-top: 1px solid var(--border); }
  tr:last-child td { border-bottom: none; }
  tbody tr { transition: background 0.15s; }
  tbody tr:hover { background: var(--bg); }
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
    border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
    font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .learn-btn:hover { background: rgba(255,255,255,0.15); }
  .panel-help {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 28px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;
  }
  .panel-help .help-icon { font-size: 2rem; margin-bottom: 12px; }
  .panel-help h3 { font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
  .panel-help p { font-size: 0.83rem; color: var(--muted); line-height: 1.6; flex: 1; }
  .contact-btn {
    margin-top: 16px; background: none; border: none; color: var(--navy);
    font-family: 'DM Sans', sans-serif; font-size: 0.84rem; font-weight: 600;
    cursor: pointer; display: flex; align-items: center; gap: 5px; padding: 0;
    transition: gap 0.2s;
  }
  .contact-btn:hover { gap: 9px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .bottom-grid { grid-template-columns: 1fr; }
  }

    .main { padding: 20px 16px; padding-bottom: 70px; }
    .loans-grid { grid-template-columns: 1fr; }
    .pending-grid { grid-template-columns: 1fr; }
    .pending-actions { flex-direction: column; }
    .page-title { font-size: 1.5rem; }
  }

  @media (max-width: 480px) {
    th, td { padding: 10px 12px; }
  }
`;

const Icon = ({ name, size = 18 }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    loans: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
    "my-loans": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></svg>,
    payments: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
    documents: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    grid_view: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    account_balance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    person: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  };
  return icons[name] || null;
};


export default function MyLoans() {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loansLoading, setLoansLoading] = useState(true);
  const [marketplaceLoans, setMarketplaceLoans] = useState([]);
  const [marketplaceLoading, setMarketplaceLoading] = useState(true);

  useEffect(() => {
    const fetchMyMarketplaceLoans = async () => {
      try {
        const data = await ApiService.getMyMarketplaceLoans();
        setMarketplaceLoans(data ?? []);
      } catch (err) {
        console.error('Failed to load marketplace loans:', err);
      } finally {
        setMarketplaceLoading(false);
      }
    };
    fetchMyMarketplaceLoans();
  }, []);


  useEffect(() => {
    const fetchActiveLoans = async () => {
      try {
        const data = await ApiService.getMyActiveLoans();
        setLoans(data ?? []);
      } catch (err) {
        console.error('Failed to load active loans:', err);
      } finally {
        setLoansLoading(false);
      }
    };
    fetchActiveLoans();
  }, []);


  const fetchPendingLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getUserLoanRequests();
      if (response) {
        const pending = response.filter(loan => loan.status === "PENDING_APPROVAL");
        setPendingLoans(pending);
      } else {
        setPendingLoans([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pending applications");
      setPendingLoans([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getExpectedDecisionDate = (requestDate) => {
    if (!requestDate) return "Pending";
    const date = new Date(requestDate);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getStage = (status) => {
    switch (status) {
      case "PENDING_APPROVAL": return "Under Review";
      case "APPROVED": return "Approved";
      case "REJECTED": return "Rejected";
      default: return "Processing";
    }
  };

  const getStageNote = (loan) => {
    if (loan.status === "PENDING_APPROVAL") {
      return loan.approvedById
        ? "Credit committee review in progress."
        : "Documents verified. Awaiting credit committee approval.";
    }
    return "Your application is being processed.";
  };



  useEffect(() => { fetchPendingLoans(); }, []);

  return (
    <>
      <style>{style}</style>
      <div className="app-wrap">


        <div className="layout">

          {/* ── MAIN ── */}
          <main className="main">

            <div className="page-header">
              <h1 className="page-title">My Loans</h1>
              <p className="page-subtitle">Manage your active loans and view your repayment history.</p>
            </div>

            {/* Active Loans */}
            <section className="section">
              <div className="section-header">
                <span className="section-title">Active Loans</span>
                <span className="badge-active">{loans.length} Active</span>
              </div>

              {loansLoading ? (
                <p>Loading active loans...</p>
              ) : loans.length === 0 ? (
                <p>No active loans.</p>
              ) : (
                <div className="loans-grid">
                  {loans.map(loan => {
                    const progress = 100 - loan.fundingPercentage; // repayment progress fallback
                    return (
                      <div key={loan.requestId} className="loan-card">
                        <div className="loan-card-header">
                          <div>
                            <div className="loan-id">#{loan.requestId}</div>
                            <div className="loan-name">{loan.description}</div>
                          </div>
                          <div className="loan-apr">
                            <div className="loan-apr-label">Interest Rate</div>
                            <div className="loan-apr-value">{loan.interestRate}% APR</div>
                          </div>
                        </div>
                        <div className="loan-meta">
                          <div>
                            <div className="loan-meta-label">Total Amount</div>
                            <div className="loan-meta-value">{loan.requestedAmount.toLocaleString()} FCFA</div>
                          </div>
                          <div>
                            <div className="loan-meta-label">Remaining</div>
                            <div className="loan-meta-value">{loan.remainingAmount.toLocaleString()} FCFA</div>
                          </div>
                        </div>
                        <div className="progress-label">
                          <span>Repayment Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <button className="pay-btn">💳 Make Payment</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* My Marketplace Loans */}
            <section className="section">
              <div className="section-header">
                <span className="section-title">My Marketplace Loans</span>
                <span className="badge-active">{marketplaceLoans.length} Listed</span>
              </div>

              {marketplaceLoading ? (
                <p>Loading marketplace loans...</p>
              ) : marketplaceLoans.length === 0 ? (
                <p>You have no loans currently listed on the marketplace.</p>
              ) : (
                <div className="loans-grid">
                  {marketplaceLoans.map(loan => (
                    <div key={loan.requestId} className="loan-card">
                      <div className="loan-card-header">
                        <div>
                          <div className="loan-id">#{loan.requestId}</div>
                          <div className="loan-name">{loan.description}</div>
                        </div>
                        <div className="loan-apr">
                          <div className="loan-apr-label">Interest Rate</div>
                          <div className="loan-apr-value">{loan.interestRate}% APR</div>
                        </div>
                      </div>

                      <div className="loan-meta">
                        <div>
                          <div className="loan-meta-label">Requested</div>
                          <div className="loan-meta-value">{loan.requestedAmount.toLocaleString()} FCFA</div>
                        </div>
                        <div>
                          <div className="loan-meta-label">Funded</div>
                          <div className="loan-meta-value">{loan.amountFunded.toLocaleString()} FCFA</div>
                        </div>
                      </div>

                      <div className="loan-meta">
                        <div>
                          <div className="loan-meta-label">Term</div>
                          <div className="loan-meta-value">{loan.termMonths} months</div>
                        </div>
                        <div>
                          <div className="loan-meta-label">Status</div>
                          <div className="loan-meta-value">{loan.status.replace(/_/g, ' ')}</div>
                        </div>
                      </div>

                      <div className="progress-label">
                        <span>Funding Progress</span>
                        <span>{loan.fundingPercentage}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${loan.fundingPercentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>


            {/* Pending Applications */}
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
                    <button onClick={fetchPendingLoans} style={{ marginTop: "12px", padding: "8px 16px", background: "var(--gold)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
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
                        <div>
                          <div className="pending-card-id">#{loan.requestId}</div>
                          <div className="pending-card-name">{loan.purpose || "Loan Application"}</div>
                        </div>
                        <div className="pending-status-pill">
                          <span className="pending-status-dot" />
                          {getStage(loan.status)}
                        </div>
                      </div>
                      <div className="pending-meta">
                        <div>
                          <div className="pending-meta-label">Requested</div>
                          <div className="pending-meta-value">{loan.requestedAmount?.toLocaleString() || "0"} FCFA</div>
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
                          <div className="pending-meta-value" style={{ fontSize: "0.82rem" }}>{formatDate(loan.requestDate)}</div>
                        </div>
                      </div>
                      <div className="pending-timeline">
                        <div className="pending-timeline-icon">🕐</div>
                        <div className="pending-timeline-text">
                          {getStageNote(loan)}{" "}
                          <strong>Decision expected by {getExpectedDecisionDate(loan.requestDate)}.</strong>
                        </div>
                      </div>
                      <div className="pending-actions">

                        <button className="pending-btn-secondary" onClick={() => alert(`Loan Details:\nID: ${loan.requestId}\nAmount: $${loan.requestedAmount}\nPurpose: ${loan.purpose}\nStatus: ${loan.status}`)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>


          </main>
        </div>

      </div>
    </>
  );
}