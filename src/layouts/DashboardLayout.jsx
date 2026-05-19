
import { useState, createContext, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const styles = `
 
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* ── TOPNAV ── */
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
    transition: all 0.18s; text-decoration: none; background: none; border-top: none;
    border-left: none; border-right: none; font-family: 'DM Sans', sans-serif;
  }
  .nav-tab.active { color: var(--navy); border-bottom-color: var(--navy); font-weight: 600; }
  .nav-tab:hover { color: var(--navy); }
  .nav-right { display: flex; align-items: center; gap: 14px; }
  .icon-btn {
    width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border);
    background: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--navy);
  }
  .avatar {
    width: 34px; height: 34px; border-radius: 50%; background: var(--navy-2);
    color: #fff; display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; cursor: pointer;
  }

  /* ── LAYOUT SHELL ── */
  .layout { display: flex; flex: 1; }

  /* ── BOTTOM NAV ── */
  .bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-top: 1px solid var(--border);
    justify-content: space-around; align-items: center;
    padding: 8px 0; z-index: 40;
  }
  .bottom-nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 500;
    color: var(--muted); transition: color 0.2s;
  }
  .bottom-nav-item.active { color: var(--green); }

  /* ── MOBILE ── */
  .mobile-menu-btn {
    display: none; background: none; border: 1px solid var(--border);
    border-radius: 7px; padding: 5px 9px; cursor: pointer; color: var(--navy);
  }

  @media (max-width: 768px) {
    .mobile-menu-btn { display: block; }
    .topnav { padding: 0 16px; }
    .nav-tabs { display: none; }
    .bottom-nav { display: flex; }
  }
`;

const Ic = ({ n, s = 17 }) => {
  const icons = {
    bell: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    menu: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    grid_view: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    account_balance: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    payments: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
    person: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  };
  return icons[n] || null;
};

// Which tab is "active" in the topnav is derived from the current route
// so we use useLocation to compare — but we'll keep it simple for now
// and let each child page signal its section via a prop or context later.

const bottomNavItems = [
  { icon: "grid_view",        label: "Hybrid",   path: "/dashboard" },
  { icon: "account_balance",  label: "Invest",   path: "/investor-view" },
  { icon: "payments",         label: "Borrow",   path: "/borrower-view" },
  { icon: "person",           label: "Profile",  path: "/profile" },
];

const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derive active bottom nav item from current path
  const currentPath = window.location.pathname;

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <style>{styles}</style>
      <div className="app">

        {/* ── TOP NAV ── */}
        <nav className="topnav">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              <Ic n="menu" s={16} />
            </button>
            <div className="logo">Loan<span>@</span></div>
          </div>

          <div className="nav-tabs">
            <button
              className={`nav-tab ${currentPath === "/dashboard" ? "active" : ""}`}
              onClick={() => navigate("/dashboard")}
            >
              Hybrid
            </button>
            <button
              className={`nav-tab ${currentPath.startsWith("/investor") ? "active" : ""}`}
              onClick={() => navigate("/investor-view")}
            >
              Investor
            </button>
            <button
              className={`nav-tab ${currentPath.startsWith("/borrower") ? "active" : ""}`}
              onClick={() => navigate("/borrower-view")}
            >
              Borrower
            </button>
          </div>

          <div className="nav-right">
            <button className="icon-btn"><Ic n="bell" s={16} /></button>
            <div className="avatar">TL</div>
          </div>
        </nav>

        {/* ── PAGE CONTENT (sidebar + main injected here by child layouts/pages) ── */}
        <div className="layout">
          <Outlet />
        </div>

        {/* ── BOTTOM NAV ── */}
        <nav className="bottom-nav">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              className={`bottom-nav-item ${currentPath === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Ic n={item.icon} s={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </SidebarContext.Provider>
  );
}