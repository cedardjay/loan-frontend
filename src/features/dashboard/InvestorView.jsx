import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0e2140;
    --navy-2: #163059;
    --navy-3: #1e3f70;
    --green: #00a878;
    --green-light: #e6f7f3;
    --green-text: #007a57;
    --accent: #e8622a;
    --bg: #f2f5fa;
    --card: #ffffff;
    --border: #dde3ef;
    --text: #0e2140;
    --muted: #7a8aaa;
    --red: #e8314a;
    --red-light: #fdeaed;
    --sidebar-w: 210px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* NAV */
  .topnav {
    height: 56px; background: #fff; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; position: sticky; top: 0; z-index: 100;
  }
  .logo { font-size: 1.2rem; font-weight: 700; color: var(--navy); }
  .logo span { color: var(--accent); }
  .nav-tabs { display: flex; gap: 28px; }
  .nav-tab {
    font-size: 0.875rem; font-weight: 500; color: var(--muted);
    cursor: pointer; padding-bottom: 2px; border-bottom: 2px solid transparent;
    transition: all 0.18s; text-decoration: none;
  }
  .nav-tab.active { color: var(--navy); border-bottom-color: var(--navy); font-weight: 600; }
  .nav-tab:hover { color: var(--navy); }
  .nav-right { display: flex; align-items: center; gap: 14px; }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border); background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--navy); }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--navy-2); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; cursor: pointer; }

  /* LAYOUT */
  .layout { display: flex; flex: 1; }

  /* SIDEBAR - Updated to match Hybrid */
  .sidebar {
    width: var(--sidebar-w); background: #f8fafc; border-right: 1px solid var(--border);
    padding: 24px 0; display: flex; flex-direction: column;
    position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto;
  }
  .sidebar-brand { padding: 0 20px 20px; border-bottom: 1px solid var(--border); }
  .sb-name { font-weight: 700; font-size: 0.95rem; color: var(--navy); }
  .sb-sub { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }
  .sb-nav { padding: 16px 10px; flex: 1; }
  .sb-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px;
    font-size: 0.845rem; font-weight: 500; color: var(--muted); cursor: pointer;
    transition: all 0.16s; margin-bottom: 2px;
  }
  .sb-item:hover { background: #e2e8f0; color: var(--navy); }
  .sb-item.active { background: var(--navy); color: #fff; font-weight: 600; }
  .sb-footer { padding: 16px; }
  .add-funds-btn {
    width: 100%; padding: 11px; background: var(--navy); color: #fff; border: none;
    border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 0.845rem;
    font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .add-funds-btn:hover { background: var(--navy-2); }

  /* MAIN */
  .main { flex: 1; padding: 32px 28px; min-width: 0; overflow-x: hidden; }

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

  /* MOBILE */
  .mobile-menu-btn { display: none; background: none; border: 1px solid var(--border); border-radius: 7px; padding: 5px 9px; cursor: pointer; color: var(--navy); }
  .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200; }
  .mobile-overlay.open { display: block; }

  @media (max-width: 1024px) {
    .content-grid { grid-template-columns: 1fr; }
    .right-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .promo-card { grid-column: span 2; }
  }
  @media (max-width: 768px) {
    :root { --sidebar-w: 210px; }
    .sidebar { position: fixed; left: -230px; top: 0; height: 100vh; z-index: 300; transition: left 0.28s ease; padding-top: 64px; }
    .sidebar.open { left: 0; }
    .mobile-menu-btn { display: block; }
    .topnav { padding: 0 16px; }
    .nav-tabs { display: none; }
    .main { padding: 20px 14px; padding-bottom: 70px; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .stat-card:last-child { grid-column: span 2; }
    .right-panel { grid-template-columns: 1fr; }
    .promo-card { grid-column: span 1; }
    .welcome h1 { font-size: 1.45rem; }
    .bottom-nav { display: flex; }
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

const navItems = [
  { id: "dashboard", label: "INVESTOR VIEW", icon: "dashboard", path: "/investor-view" },
  { id: "portfolio", label: "Portfolio", icon: "portfolio", path: "/my-investments" },
  { id: "marketplace", label: "Loan listings", icon: "market", path: "/loan-listings" },
  { id: "transactions", label: "Transactions", icon: "tx", path: "/transactions" },
  { id: "settings", label: "Settings", icon: "settings", path: "/settings" },
];

const bottomNavItems = [
  { icon: "grid_view", label: "Hybrid", path: "/dashboard" },
  { icon: "account_balance", label: "Invest", path: "/investor-view", active: true },
  { icon: "payments", label: "Borrow", path: "/borrower-view" },
  { icon: "person", label: "Profile", path: "/profile" },
];

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
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path, navId) => {
    setActiveNav(navId);
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* TOP NAV */}
        <nav className="topnav">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Ic n="menu" s={16} />
            </button>
            <div className="logo">Loan<span>@</span></div>
          </div>
          <div className="nav-tabs">
            <button className="nav-tab" onClick={() => navigate("/dashboard")}>Hybrid</button>
            <button className="nav-tab active" onClick={() => navigate("/investor-view")}>Investor</button>
            <button className="nav-tab" onClick={() => navigate("/borrower-view")}>Borrower</button>
          </div>
          <div className="nav-right">
            <button className="icon-btn"><Ic n="bell" s={16} /></button>
            <div className="avatar">TL</div>
          </div>
        </nav>

        <div className="layout">
          {/* MOBILE OVERLAY */}
          <div className={`mobile-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

          {/* SIDEBAR */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-brand">
              <div className="sb-sub">Premium P2P Lending</div>
            </div>
            <nav className="sb-nav">
              {navItems.map(item => (
                <div
                  key={item.id}
                  className={`sb-item ${activeNav === item.id ? "active" : ""}`}
                  onClick={() => handleNavigation(item.path, item.id)}
                >
                  <Ic n={item.icon} s={16} />
                  {item.label}
                </div>
              ))}
            </nav>
            <div className="sb-footer">
              <button className="add-funds-btn">Add Funds</button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="main">
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
                  onClick={() => navigate('/loan-listings')}
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
              <Ic n={item.icon} s={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}