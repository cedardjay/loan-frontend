// src/features/dashboard/layouts/InvestorLayout.jsx

import { useEffect } from "react";
import { useNavigate, useLocation, Outlet, NavLink } from "react-router-dom";
import { useSidebar } from "./DashboardLayout";

const styles = `
  /* SIDEBAR */
  .sidebar {
    width: var(--sidebar-w); background: #f8fafc; border-right: 1px solid var(--border);
    padding: 24px 0; display: flex; flex-direction: column;
    position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto;
  }
  .sidebar-brand { padding: 0 20px 20px; border-bottom: 1px solid var(--border); }
  .sb-sub { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }
  .sb-nav { padding: 16px 10px; flex: 1; }
  .sb-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px;
    font-size: 0.845rem; font-weight: 500; color: var(--muted); cursor: pointer;
    transition: all 0.16s; margin-bottom: 2px; text-decoration: none;
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

  /* MOBILE OVERLAY */
  .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200; }
  .mobile-overlay.open { display: block; }

  @media (max-width: 768px) {
    .sidebar {
      position: fixed; left: -230px; top: 0; height: 100vh;
      z-index: 300; transition: left 0.28s ease; padding-top: 64px;
    }
    .sidebar.open { left: 0; }
    .main { padding: 20px 14px; padding-bottom: 70px; }
  }
`;

const Ic = ({ n, s = 17 }) => {
  const icons = {
    dashboard: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    portfolio: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v9l5 3" /></svg>,
    market: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
    tx: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    settings: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  };
  return icons[n] || null;
};

const navItems = [
  { label: "Investor View", icon: "dashboard", path: "/investor-view" },
  { label: "Portfolio",     icon: "portfolio", path: "/my-investments" },
  { label: "Loan Listings", icon: "market",    path: "/loan-listings" },
  { label: "Transactions",  icon: "tx",        path: "/transactions" },
  { label: "Settings",      icon: "settings",  path: "/settings" },
];

export default function InvestorLayout() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const location = useLocation();

  // Close sidebar on every route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{styles}</style>

      {/* Mobile overlay — clicking it closes the sidebar */}
      <div
        className={`mobile-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sb-sub">Premium P2P Lending</div>
        </div>

        <nav className="sb-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sb-item ${isActive ? "active" : ""}`
              }
            >
              <Ic n={item.icon} s={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sb-footer">
          <button className="add-funds-btn">Add Funds</button>
        </div>
      </aside>

      {/* Pages slot in here */}
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}