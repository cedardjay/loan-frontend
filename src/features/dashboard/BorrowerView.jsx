import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

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
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }

  .app-wrap { display: flex; flex-direction: column; min-height: 100vh; }

  /* TOP NAV */
  .topnav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 60px; background: #fff;
    border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100;
  }
  .topnav-logo { font-size: 1.25rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .topnav-logo span { color: var(--accent); }
  .topnav-links { display: flex; gap: 32px; }
  .topnav-links button {
    font-size: 0.875rem; font-weight: 500; color: var(--muted);
    background: none; border: none; cursor: pointer; transition: color 0.2s;
    padding-bottom: 2px;
  }
  .topnav-links button.active { color: var(--navy); border-bottom: 2px solid var(--navy); font-weight: 600; }
  .topnav-links button:hover { color: var(--navy); }
  .topnav-right { display: flex; align-items: center; gap: 16px; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border);
    background: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--navy); transition: background 0.2s;
  }
  .icon-btn:hover { background: var(--bg); }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--navy); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.8rem; font-weight: 600; cursor: pointer; }

  /* LAYOUT */
  .layout { display: flex; flex: 1; }

  /* SIDEBAR */
  .sidebar {
    width: var(--sidebar-w); background: #f8fafc; border-right: 1px solid var(--border);
    display: flex; flex-direction: column; padding: 28px 0; position: sticky;
    top: 60px; height: calc(100vh - 60px); overflow-y: auto;
  }
  .sidebar-brand { padding: 0 24px 28px; border-bottom: 1px solid var(--border); }
  .sidebar-brand-name { font-weight: 700; font-size: 0.95rem; color: var(--navy); letter-spacing: -0.3px; }
  .sidebar-brand-name span { color: var(--accent); }
  .sidebar-brand-sub { font-size: 0.7rem; font-weight: 500; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
  .sidebar-nav { padding: 20px 12px; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 14px;
    border-radius: 10px; cursor: pointer; font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.5px; text-transform: uppercase; color: var(--muted);
    transition: all 0.18s; margin-bottom: 4px;
  }
  .nav-item:hover { background: #e2e8f0; color: var(--navy); }
  .nav-item.active { background: var(--navy); color: #fff; }
  .nav-item svg { flex-shrink: 0; }
  .sidebar-footer { padding: 20px 16px; }
  .support-btn {
    width: 100%; padding: 12px; background: var(--navy); color: #fff;
    border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .support-btn:hover { background: var(--navy-light); }

  /* MAIN CONTENT */
  .main { flex: 1; padding: 36px 32px; overflow-x: hidden; min-width: 0; }

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

  /* BOTTOM NAV - Matches Hybrid Dashboard */
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
    padding: 8px 0;
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
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted);
    transition: color 0.2s;
  }
  .bottom-nav-item.active {
    color: var(--green);
  }
  .bottom-nav-item svg {
    width: 20px;
    height: 20px;
  }

  /* MOBILE SIDEBAR TOGGLE */
  .mobile-menu-btn {
    display: none; background: none; border: 1px solid var(--border); border-radius: 8px;
    padding: 6px 10px; cursor: pointer; color: var(--navy);
  }
  .mobile-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200;
  }
  .mobile-overlay.open { display: block; }

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
    .sidebar {
      position: fixed; left: -240px; top: 0; height: 100vh; z-index: 300;
      transition: left 0.3s ease; padding-top: 70px;
    }
    .sidebar.open { left: 0; }
    .mobile-menu-btn { display: block; }
    .topnav { padding: 0 16px; }
    .topnav-links { display: none; }
    .main { padding: 20px 16px; padding-bottom: 70px; }
    .stats-row { grid-template-columns: 1fr; gap: 12px; }
    .side-panel { grid-template-columns: 1fr; }
    .promo-card { grid-column: span 1; }
    .table-head, .table-row { grid-template-columns: 1.2fr 1.2fr 0.8fr 0.8fr; padding: 12px; }
    .td, .th { font-size: 0.78rem; }
    .welcome-title { font-size: 1.5rem; }
    .bottom-nav { display: flex; }
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
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    loans: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
    "my-loans": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
    payments: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    documents: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
    bank: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12,2 20,7 4,7"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    bulb: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    // Bottom nav icons
    grid_view: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    account_balance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    person: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  };
  return icons[name] || null;
};

const navItems = [
  { id: "dashboard", label: "BORROWER VIEW", icon: "dashboard", path: "/borrower-view" },
  { id: "myLoans", label: "MY LOANS", icon: "my-loans", path: "/my-loans" },
  { id: "apply", label: "Apply for a loan", icon: "loans", path: "/loan-apply" },
  { id: "payments", label: "Payments", icon: "payments", path: "/borrower-view/payments" },
  { id: "documents", label: "Documents", icon: "documents", path: "/borrower-view/documents" },
];

const bottomNavItems = [
  { icon: "grid_view", label: "Hybrid", path: "/dashboard" },
  { icon: "account_balance", label: "Invest", path: "/investor-view" },
  { icon: "payments", label: "Borrow", path: "/borrower-view", active: true },
  { icon: "person", label: "Profile", path: "/profile" },
];

export default function BorrowerView() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path, navId) => {
    setActiveNav(navId);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleApplyLoan = () => {
    navigate("/loan-apply");
  };

  const handleMyLoans = () => {
    navigate("/my-loans");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrap">
        {/* TOP NAV */}
        <nav className="topnav">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Icon name="menu" size={16} />
            </button>
            <div className="topnav-logo">Loan<span>@</span></div>
          </div>
          <div className="topnav-links">
            <button onClick={() => navigate("/dashboard")}>Hybrid</button>
            <button onClick={() => navigate("/investor-view")}>Investor</button>
            <button className="active" onClick={() => navigate("/borrower-view")}>Borrower</button>
          </div>
          <div className="topnav-right">
            <button className="icon-btn"><Icon name="bell" size={16} /></button>
            <div className="avatar">TL</div>
          </div>
        </nav>

        <div className="layout">
          {/* MOBILE OVERLAY */}
          <div className={`mobile-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

          {/* SIDEBAR */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-brand">
              <div className="sidebar-brand-name">LOAN<span>@</span></div>
              <div className="sidebar-brand-sub">Borrower view</div>
            </div>
            <nav className="sidebar-nav">
              {navItems.map(item => (
                <div
                  key={item.id}
                  className={`nav-item ${activeNav === item.id ? "active" : ""}`}
                  onClick={() => handleNavigation(item.path, item.id)}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </div>
              ))}
            </nav>
            <div className="sidebar-footer">
              <button className="support-btn">Get Support</button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="main">
            {/* ACTION BUTTONS ROW */}
            <div className="action-buttons-row">
              <button className="my-loans-btn" onClick={handleMyLoans}>
                <Icon name="my-loans" size={18} />
                View My Loans
              </button>
              <button className="apply-loan-btn" onClick={handleApplyLoan}>
                <Icon name="plus" size={18} />
                Apply for a Loan
              </button>
            </div>

            {/* WELCOME */}
            <div className="welcome-header">
              <h1 className="welcome-title">Welcome back, Taylor</h1>
              <div className="welcome-meta">
                <span className="member-badge">Member since Mar 2022</span>
                <span className="welcome-sub">Everything is looking good with your accounts today.</span>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">Total Borrowed</div>
                <div className="stat-icon"><Icon name="bank" size={18} /></div>
                <div className="stat-value">$12,000</div>
                <div className="stat-sub">Consolidated total from <strong>2 active loans</strong></div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Next Payment</div>
                <div className="stat-icon"><Icon name="calendar" size={18} /></div>
                <div className="stat-value">$520</div>
                <div className="stat-sub"><strong>Due on Apr 25</strong></div>
                <div className="stat-sub" style={{marginTop:2}}>Automatic debit scheduled</div>
              </div>
              <div className="stat-card dark">
                <div className="stat-label">Available Credit</div>
                <div className="stat-icon"><Icon name="shield" size={18} /></div>
                <div className="stat-value">$1,500</div>
                <div className="stat-sub">Ready for immediate withdrawal</div>
              </div>
            </div>

            {/* CONTENT GRID */}
            <div className="content-grid">
              {/* LEFT */}
              <div>
                {/* ACTIVE LOANS */}
                <div className="section-title">
                  Active Loans <span className="dot" />
                </div>

                {/* Loan B001 - Clickable to /my-loans */}
                <div className="loan-card" onClick={handleMyLoans}>
                  <div className="loan-meta">Loan #B001</div>
                  <div className="loan-header">
                    <div className="loan-name">Business Expansion Fund</div>
                    <div className="loan-amount">
                      <div className="loan-amt-val">$8,000 <span>rem.</span></div>
                      <div className="loan-apr">7.5% APR</div>
                    </div>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-label">
                      <span>Payment Progress</span>
                      <span>60%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "60%" }} />
                    </div>
                  </div>
                  <div className="loan-footer">
                    <button className="pay-btn" onClick={(e) => { e.stopPropagation(); handleMyLoans(); }}>Make Payment</button>
                  </div>
                </div>

                {/* Loan B002 - Clickable to /my-loans */}
                <div className="loan-card" onClick={handleMyLoans}>
                  <div className="loan-meta">Loan #B002</div>
                  <div className="loan-header">
                    <div className="loan-name">Home Improvement Plan</div>
                    <div className="loan-amount">
                      <div className="loan-amt-val">$4,000 <span>rem.</span></div>
                      <div className="loan-apr">9.0% APR</div>
                    </div>
                  </div>
                  <div>
                    <span className="status-badge">Status: In Grace</span>
                    <span className="status-note">Standard period ends in 4 days.</span>
                  </div>
                </div>

                {/* RECENT REPAYMENTS */}
                <div className="section-title" style={{ marginTop: 28 }}>Recent Repayments</div>
                <div className="repayments-table">
                  <div className="table-head">
                    <div className="th">Payment Date</div>
                    <div className="th">Reference</div>
                    <div className="th">Amount</div>
                    <div className="th">Status</div>
                  </div>
                  {[
                    { date: "Mar 25, 2024", ref: "#TX-90124", amount: "$520.00" },
                    { date: "Feb 25, 2024", ref: "#TX-88219", amount: "$520.00" },
                    { date: "Jan 25, 2024", ref: "#TX-76102", amount: "$520.00" },
                  ].map((row, i) => (
                    <div className="table-row" key={i}>
                      <div className="td">{row.date}</div>
                      <div className="td ref">{row.ref}</div>
                      <div className="td">{row.amount}</div>
                      <div className="td"><span className="completed-badge">Completed</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="side-panel">
                {/* Borrower Insights */}
                <div className="insight-card">
                  <div className="insight-title">
                    <div className="insight-icon"><Icon name="bulb" size={16} /></div>
                    Borrower Insights
                  </div>
                  <div className="insight-section">
                    <div className="insight-section-label">Improve Your Rate</div>
                    <div className="insight-text">Maintain your credit score above 740 for 6 consecutive months to qualify for a 1.5% reduction on future borrowing.</div>
                    <div className="insight-link">View Credit Trends <Icon name="arrow" size={13} /></div>
                  </div>
                  <div className="insight-section">
                    <div className="insight-section-label">Limit Increase</div>
                    <div className="insight-text">You may be eligible for a credit limit increase. Please complete your annual income verification to proceed.</div>
                    <button className="verify-btn">Verify Income</button>
                  </div>
                </div>

                {/* Promo Card */}
                <div className="promo-card">
                  <div className="promo-bg" />
                  <div className="promo-overlay" />
                  <div className="promo-label">New Program</div>
                  <div className="promo-title">Consolidate your external debt into one low monthly payment.</div>
                  <button className="learn-btn">LEARN MORE</button>
                </div>
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