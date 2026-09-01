import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvestService from "./InvestService"; 

const styles = `
 
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }
  .app { display: flex; flex-direction: column; min-height: 100vh; }

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

  @media (max-width: 1024px) {
    .stats-summary { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    :root { --sidebar-w: 210px; }
    .main { padding: 20px 14px; padding-bottom: 70px; }
    .stats-summary { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .inv-table th:nth-child(4), .inv-table td:nth-child(4),
    .inv-table th:nth-child(5), .inv-table td:nth-child(5) { display: none; }
  }
`;

export default function MyInvestments() {
  const [allInvestments, setAllInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [invData] = await Promise.all([
          InvestService.getMyInvestments()
        ]);
        if (isMounted) {
          setAllInvestments(invData ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to load your investments.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, []);

  const getStatusDisplay = (status) => {
    switch(status) {
      case "active":    return <span className="status-on"><span className="dot-green" /> Active</span>;
      case "completed": return <span className="status-completed"><span className="dot-gray" /> Completed</span>;
      case "grace":     return <span className="status-on"><span className="dot-green" /> Grace Period</span>;
      case "default":   return <span className="status-default"><span className="dot-red" /> Defaulted</span>;
      default: return <span className="status-completed"><span className="dot-gray" /> {status?.toLowerCase().replace(/_/g, ' ') ?? '—'}</span>;
    }
  };

  if (loading) return (
    <div className="empty-state">
      <div className="empty-icon">⏳</div>
      <div className="empty-title">Loading your investments...</div>
    </div>
  );

  if (error) return (
    <div className="empty-state">
      <div className="empty-icon">⚠️</div>
      <div className="empty-title">Something went wrong</div>
      <div className="empty-sub">{error}</div>
    </div>
  );

  return (
    <>
    <style>{styles}</style>
      <div className="app">
          <main className="main">
            <div className="page-header">
              <h1 className="page-title">My Investments</h1>
              <p className="page-subtitle">Track and manage all your investments in one place.</p>
            </div>


            <div className="investments-card">
              <div className="inv-header">
                <div className="inv-title">My Investments</div>
                <div className="inv-count">{allInvestments.length} investments</div>
              </div>
              {allInvestments.length > 0 ? (
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
                      {allInvestments.map((inv) => (
                        <tr key={inv.id}>
                          <td><span className="borrower-name">{inv.name}</span></td>
                          <td>
                            {inv.grade
                              ? <span className={`grade-badge grade-${inv.grade.toLowerCase()}`}>Grade {inv.grade}</span>
                              : <span className="date-val">—</span>
                            }
                          </td>
                          <td>{inv.amount?.toLocaleString()} fcfa</td>
                          <td><span className="interest-val">{inv.interest}%</span></td>
                          <td>{getStatusDisplay(inv.status)}</td>
                          <td><span className="date-val">{inv.nextPayment ?? '—'}</span></td>
                          <td><span className="date-val">{inv.investedDate}</span></td>
                          <td style={{ color: "var(--green-text)", fontWeight: 600 }}>
                            {inv.expectedReturn?.toLocaleString()} FCFA
                          </td>
                          <td>
                            <button
                              className="action-btn"
                              onClick={() => navigate(`/investor/investments/${inv.id}`)}
                            >
                              Details
                            </button>
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
                  <div className="empty-sub">You haven't made any investments yet.</div>
                </div>
              )}
            </div>
          </main>
        </div>
    </>
  );
}