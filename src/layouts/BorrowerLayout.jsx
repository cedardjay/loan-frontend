
import { useEffect } from "react";
import { useLocation, Outlet, NavLink } from "react-router-dom";
import { useSidebar } from "./DashboardLayout";

const styles = `
  /* SIDEBAR */
  .sidebar {
    width: var(--sidebar-w); background: #f8fafc; border-right: 1px solid var(--border);
    padding: 24px 0; display: flex; flex-direction: column;
    position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto;
  }
  .sidebar-brand { padding: 0 20px 20px; border-bottom: 1px solid var(--border); }
  .sidebar-brand-name { font-weight: 700; font-size: 0.95rem; color: var(--navy); letter-spacing: -0.3px; }
  .sidebar-brand-name span { color: var(--accent); }
  .sidebar-brand-sub { font-size: 0.7rem; font-weight: 500; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
  .sidebar-nav { padding: 20px 12px; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 14px;
    border-radius: 10px; cursor: pointer; font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.5px; text-transform: uppercase; color: var(--muted);
    transition: all 0.18s; margin-bottom: 4px; text-decoration: none;
  }
  .nav-item:hover { background: #e2e8f0; color: var(--navy); }
  .nav-item.active { background: var(--navy); color: #fff; }
  .sidebar-footer { padding: 20px 16px; }
  .support-btn {
    width: 100%; padding: 12px; background: var(--navy); color: #fff;
    border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .support-btn:hover { background: var(--navy-light); }

  /* MAIN */
  .main { flex: 1; padding: 36px 32px; overflow-x: hidden; min-width: 0; }

  /* MOBILE OVERLAY */
  .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200; }
  .mobile-overlay.open { display: block; }

  @media (max-width: 768px) {
    .sidebar {
      position: fixed; left: -240px; top: 0; height: 100vh;
      z-index: 300; transition: left 0.3s ease; padding-top: 70px;
    }
    .sidebar.open { left: 0; }
    .main { padding: 20px 16px; padding-bottom: 70px; }
  }
`;

const Icon = ({ name, size = 18 }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    loans: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
    "my-loans": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
    payments: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    documents: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
  };
  return icons[name] || null;
};

const navItems = [
  { label: "BORROWER VIEW", icon: "dashboard",  path: "/borrower-view" },
  { label: "MY LOANS",      icon: "my-loans",   path: "/my-loans" },
  { label: "Apply for Loan",icon: "loans",      path: "/loan-apply" },
  { label: "Payments",      icon: "payments",   path: "/borrower-view/payments" },
  { label: "Documents",     icon: "documents",  path: "/borrower-view/documents" },
];

export default function BorrowerLayout() {
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
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-name">LOAN<span>@</span></div>
          <div className="sidebar-brand-sub">Borrower View</div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="support-btn">Get Support</button>
        </div>
      </aside>

      {/* Pages slot in here */}
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}