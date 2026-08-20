import { useUserName } from '../../utils/AuthUtil';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { useState, useEffect } from 'react';
const styles = `

  /* HEADER */
  .welcome-header { margin-bottom: 28px; }
  .welcome-title { font-size: 2rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .welcome-meta { display: flex; align-items: center; gap: 12px; margin-top: 8px; flex-wrap: wrap; }
  .member-badge {
    background: var(--bg); border: 1px solid var(--border);
    padding: 4px 10px; border-radius: 20px; font-size: 0.72rem;
    font-weight: 600; color: var(--navy); text-transform: uppercase; letter-spacing: 0.5px;
  }
  .welcome-sub { font-size: 0.875rem; color: var(--muted); }

  /* STAT CARDS ROW */
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: var(--card); border-radius: 14px; padding: 24px;
    border: 1px solid var(--border); position: relative; overflow: hidden;
  }
  .stat-card.dark { background: var(--navy); border-color: var(--navy); }
  .stat-label { font-size: 0.72rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .stat-card.dark .stat-label { color: rgba(255,255,255,0.5); }
  .stat-icon { position: absolute; top: 22px; right: 22px; color: var(--muted); opacity: 0.5; }
  .stat-card.dark .stat-icon { color: rgba(255,255,255,0.4); opacity: 1; }
  .stat-value { font-size: 2rem; font-weight: 700; color: var(--navy); letter-spacing: -1px; line-height: 1; }
  .stat-card.dark .stat-value { color: #fff; }
  .stat-sub { font-size: 0.78rem; color: var(--muted); margin-top: 6px; }
  .stat-sub strong { color: var(--navy); font-weight: 600; }
  .stat-card.dark .stat-sub { color: rgba(255,255,255,0.6); }
  .stat-card.dark .stat-sub strong { color: #fff; }

  /* CONTENT GRID */
  .content-grid { display: grid; grid-template-columns: 1fr 280px; gap: 20px; }

  /* LOANS SECTION */
  .section-title { font-size: 1.1rem; font-weight: 700; color: var(--navy); display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); display: inline-block; }

  .loan-card {
    background: var(--card); border-radius: 14px; padding: 22px 24px;
    border: 1px solid var(--border); margin-bottom: 14px; transition: box-shadow 0.2s;
    cursor: pointer;
  }
  .loan-card:hover { box-shadow: 0 4px 20px rgba(15,34,64,0.08); }
  .loan-meta { font-size: 0.7rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .loan-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; }
  .loan-name { font-size: 1.05rem; font-weight: 700; color: var(--navy); }
  .loan-amount { text-align: right; }
  .loan-amt-val { font-size: 1.3rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .loan-amt-val span { font-size: 0.78rem; font-weight: 500; color: var(--muted); }
  .loan-apr { font-size: 0.75rem; color: var(--muted); }

  .progress-wrap { margin: 16px 0; }
  .progress-label { display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 600; color: var(--muted); margin-bottom: 6px; letter-spacing: 0.5px; text-transform: uppercase; }
  .progress-bar { height: 6px; background: var(--bg); border-radius: 99px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--navy); border-radius: 99px; transition: width 0.6s ease; }

  .loan-footer { display: flex; justify-content: flex-end; margin-top: 12px; }
  .pay-btn {
    background: var(--accent); color: #fff; border: none; border-radius: 8px;
    padding: 10px 22px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
    font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .pay-btn:hover { background: var(--accent-hover); }

  .status-badge {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--bg); border: 1px solid var(--border);
    padding: 4px 10px; border-radius: 6px; font-size: 0.72rem; font-weight: 600;
    color: var(--navy); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 12px;
  }
  .status-note { font-size: 0.78rem; color: var(--muted); margin-left: 10px; }

  /* MY LOANS BUTTON */
  .my-loans-btn {
    background: var(--navy);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(15,34,64,0.2);
  }
  .my-loans-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(15,34,64,0.3);
    background: var(--navy-light);
  }
  .my-loans-btn:active {
    transform: translateY(1px);
  }

  /* ACTION BUTTONS ROW */
  .action-buttons-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  /* REPAYMENTS */
  .repayments-table { background: var(--card); border-radius: 14px; border: 1px solid var(--border); overflow: hidden; }
  .table-head { display: grid; grid-template-columns: 1.5fr 1.5fr 1fr 1fr; padding: 12px 20px; background: var(--bg); border-bottom: 1px solid var(--border); }
  .th { font-size: 0.7rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
  .table-row { display: grid; grid-template-columns: 1.5fr 1.5fr 1fr 1fr; padding: 16px 20px; border-bottom: 1px solid var(--border); align-items: center; transition: background 0.15s; }
  .table-row:last-child { border-bottom: none; }
  .table-row:hover { background: var(--bg); }
  .td { font-size: 0.875rem; color: var(--text); }
  .td.ref { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--muted); }
  .completed-badge { background: #e6f9f1; color: #1a8a5a; font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; display: inline-block; }

  /* SIDEBAR PANEL */
  .side-panel { display: flex; flex-direction: column; gap: 16px; }

  .insight-card {
    background: var(--card); border-radius: 14px; padding: 20px;
    border: 1px solid var(--border);
  }
  .insight-title { font-size: 0.95rem; font-weight: 700; color: var(--navy); display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
  .insight-icon { width: 32px; height: 32px; border-radius: 50%; background: var(--bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .insight-section { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
  .insight-section:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .insight-section-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .insight-text { font-size: 0.8rem; color: var(--text); line-height: 1.55; }
  .insight-link { font-size: 0.78rem; font-weight: 600; color: var(--navy); text-decoration: none; display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; cursor: pointer; }
  .verify-btn {
    width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px;
    background: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600;
    color: var(--navy); cursor: pointer; margin-top: 10px; transition: background 0.2s;
  }
  .verify-btn:hover { background: var(--bg); }

  .promo-card {
    background: var(--navy); border-radius: 14px; overflow: hidden; position: relative; min-height: 180px;
    display: flex; flex-direction: column; justify-content: flex-end; padding: 20px;
  }
  .promo-bg { position: absolute; inset: 0; background: linear-gradient(145deg, #1a3560 0%, #0a1828 100%); }
  .promo-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,24,40,0.9) 40%, transparent); }
  .promo-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 6px; position: relative; z-index: 1; }
  .promo-title { font-size: 1rem; font-weight: 700; color: #fff; line-height: 1.35; margin-bottom: 12px; position: relative; z-index: 1; }
  .learn-btn {
    background: #fff; color: var(--navy); border: none; border-radius: 6px;
    padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
    font-weight: 700; letter-spacing: 0.5px; cursor: pointer; transition: opacity 0.2s;
    position: relative; z-index: 1; display: inline-block;
  }
  .learn-btn:hover { opacity: 0.88; }


  

  /* APPLY BUTTON */
  .apply-loan-btn {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(232, 98, 42, 0.2);
  }
  .apply-loan-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(232, 98, 42, 0.3);
    background: linear-gradient(135deg, var(--accent-hover) 0%, #c44a1a 100%);
  }
  .apply-loan-btn:active {
    transform: translateY(1px);
  }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .content-grid { grid-template-columns: 1fr; }
    .side-panel { display: grid; grid-template-columns: 1fr 1fr; }
    .promo-card { grid-column: span 2; }
  }

  @media (max-width: 768px) {
   
    .stats-row { grid-template-columns: 1fr; gap: 12px; }
    .side-panel { grid-template-columns: 1fr; }
    .promo-card { grid-column: span 1; }
    .table-head, .table-row { grid-template-columns: 1.2fr 1.2fr 0.8fr 0.8fr; padding: 12px; }
    .td, .th { font-size: 0.78rem; }
    .welcome-title { font-size: 1.5rem; }
    .action-buttons-row {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .table-head, .table-row { grid-template-columns: 1fr 1fr; }
    .th:nth-child(2), .td:nth-child(2) { display: none; }
    .loan-header { flex-direction: column; }
    .loan-amount { text-align: left; }
  }
`;

const Icon = ({ name, size = 18 }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    loans: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
    "my-loans": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></svg>,
    payments: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
    documents: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>,
    bank: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12,2 20,7 4,7" /></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    bulb: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    // Bottom nav icons
    grid_view: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    account_balance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    person: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  };
  return icons[name] || null;
};


export default function BorrowerView() {
  const userName = useUserName();
  const navigate = useNavigate();
  const [totalBorrowed, setTotalBorrowed] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveLoans = async () => {
      try {
        const data = await ApiService.getMyActiveLoans();
        const total = (data ?? []).reduce((sum, loan) => sum + loan.requestedAmount, 0);
        setTotalBorrowed(total);
      } catch (err) {
        console.error('Failed to load active loans:', err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchActiveLoans();
  }, []);


  return (
    <>
      <style>{styles}</style>


      {/* WELCOME */}
      <div className="welcome-header">
        <h1 className="welcome-title">Welcome back, {userName}</h1>
        <div className="welcome-meta">
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Borrowed</div>
          <div className="stat-icon"><Icon name="bank" size={18} /></div>
          <div className="stat-value">
            {statsLoading ? '...' : totalBorrowed.toLocaleString()} FCFA
          </div>
        </div>
      </div>

      <div className="action-buttons-row">
        <button className="apply-loan-btn" onClick={() => navigate('/borrower/loan-apply')}>
          <Icon name="plus" size={18} />
          Apply for a Loan
        </button>
      </div>

    </>
  );
}