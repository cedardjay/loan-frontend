
import { useEffect } from "react";
import { useLocation, Outlet, NavLink } from "react-router-dom";
import { useSidebar } from "./DashboardLayout";
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const styles = `
  /* SIDEBAR */
  .ud-sidebar {
    width: var(--sidebar-w); background: #f8fafc; border-right: 1px solid var(--border);
    padding: 24px 0; display: flex; flex-direction: column;
    position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto;
  }
  .ud-sidebar-brand { padding: 0 20px 20px; border-bottom: 1px solid var(--border); }
  .ud-brand-name { font-weight: 700; font-size: 0.95rem; color: var(--navy); }
  .ud-brand-name span { color: var(--accent); }
  .ud-brand-sub { font-size: 0.7rem; color: var(--muted); margin-top: 2px; 
    text-transform: uppercase; letter-spacing: 1px; font-weight: 500; }

  /* NAV SECTIONS */
  .ud-nav { padding: 16px 10px; flex: 1; display: flex; flex-direction: column; gap: 24px; }
  .ud-section-label {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted); padding: 0 12px; margin-bottom: 4px;
  }

  /* NAV ITEMS */
  .ud-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 9px; font-size: 0.845rem; font-weight: 500; color: var(--muted);
    transition: all 0.16s; margin-bottom: 2px; text-decoration: none; cursor: pointer;
  }
  .ud-item:hover { background: #e2e8f0; color: var(--navy); }
  .ud-item.active { background: var(--navy); color: #fff; font-weight: 600; }

  /* QUICK ACTION ITEMS - visually distinct */
  .ud-action-item {
    display: flex; align-items: center; gap: 10px; padding: 11px 12px;
    border-radius: 9px; font-size: 0.845rem; font-weight: 600;
    transition: all 0.16s; margin-bottom: 2px; text-decoration: none; cursor: pointer;
    border: 1px solid transparent;
  }
  .ud-action-invest {
    background: var(--green-light); color: var(--green-text);
    border-color: rgba(0, 168, 120, 0.2);
  }
  .ud-action-invest:hover { background: var(--green); color: #fff; }

  .ud-action-borrow {
    background: rgba(232, 98, 42, 0.08); color: var(--accent);
    border-color: rgba(232, 98, 42, 0.2);
  }
  .ud-action-borrow:hover { background: var(--accent); color: #fff; }

  /* FOOTER */
  .ud-sidebar-footer { padding: 16px; border-top: 1px solid var(--border); }
  .ud-support-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 9px; font-size: 0.845rem; font-weight: 500; color: var(--muted);
    transition: all 0.16s; margin-bottom: 2px; text-decoration: none; cursor: pointer;
  }
  .ud-support-item:hover { background: #e2e8f0; color: var(--navy); }

  /* MAIN */
  .ud-main { flex: 1; padding: 32px 28px; min-width: 0; overflow-x: hidden; }

  /* MOBILE OVERLAY */
  .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200; }
  .mobile-overlay.open { display: block; }

  @media (max-width: 768px) {
    .ud-sidebar {
      position: fixed; left: -230px; top: 0; height: 100vh;
      z-index: 300; transition: left 0.28s ease; padding-top: 64px;
    }
    .ud-sidebar.open { left: 0; }
    .ud-main { padding: 20px 14px; padding-bottom: 70px; }
  }
`;

const Ic = ({ n, s = 16 }) => {
  const icons = {
    dashboard: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    bell: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    person: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    wallet: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    settings: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    invest: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>,
    borrow: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    help: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    support: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  };
  return icons[n] || null;
};

const generalItems = [
  { label: "Dashboard", icon: "dashboard", path: "/dashboard" },
  { label: "Notifications", icon: "bell", path: "/notifications" },
  { label: "Profile", icon: "person", path: "/profile" },
  { label: "Wallet", icon: "wallet", path: "/wallet" },
  { label: "Settings", icon: "settings", path: "/settings" },
];

const supportItems = [
  { label: "Help Center", icon: "help", path: "/help" },
  { label: "Contact Support", icon: "support", path: "/support" },
];

export default function UserLayout() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{styles}</style>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`ud-sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="ud-sidebar-brand">
          <div className="ud-brand-name">LOAN<span>@</span></div>
          <div className="ud-brand-sub">My Account</div>
        </div>

        <nav className="ud-nav">

          {/* GENERAL */}
          <div>
            <div className="ud-section-label">General</div>
            {generalItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `ud-item ${isActive ? "active" : ""}`
                }
              >
                <Ic n={item.icon} />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <div className="ud-section-label">Quick Actions</div>
            <NavLink to="/investor-view" className="ud-action-item ud-action-invest">
              <Ic n="invest" />
              Start Investing
            </NavLink>
            <NavLink to="/borrower-view" className="ud-action-item ud-action-borrow">
              <Ic n="borrow" />
              Apply for a Loan
            </NavLink>
          </div>

        </nav>

        {/* SUPPORT FOOTER */}
        <div className="ud-sidebar-footer">
          <div className="ud-section-label" style={{ marginBottom: 8 }}>Support</div>
          {supportItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="ud-support-item"
            >
              <Ic n={item.icon} />
              {item.label}
            </NavLink>
          ))}
          {/* Logout */}
         <LogoutButton />
        </div>

      </aside>

      {/* Pages slot in here */}
      <main className="ud-main">
        <Outlet />
      </main>
    </>
  );
}