import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// ─── Admin Navigation ─────────────────────────────────────
const ADMIN_LINKS = [
  { icon: "dashboard", label: "Overview", path: "/admin" },
  { icon: "people", label: "Users", path: "/admin/users" },
  { icon: "account_balance", label: "Loans", path: "/admin/loans" },
  { icon: "payments", label: "Transactions", path: "/admin/transactions" },
  { icon: "analytics", label: "Reports", path: "/admin/reports" },
  { icon: "settings", label: "Settings", path: "/admin/settings" },
];

function Icon({ name }) {
  return <span className="material-symbols-outlined">{name}</span>;
}

// ─── Top Navbar ───────────────────────────────────────────
function TopNav({ onMenuClick }) {
  return (
    <div className="flex justify-between items-center px-4 sm:px-6 py-3 bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded">
          <Icon name="menu" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 hover:bg-gray-100 rounded relative">
          <Icon name="notifications" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────
function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = window.location.pathname;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed lg:static top-0 left-0 h-full w-64 bg-white z-50 border-r transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-6 font-bold text-lg border-b bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Loan@ Admin
        </div>

        <div className="p-4 space-y-2">
          {ADMIN_LINKS.map((link) => {
            const isActive = location === link.path;
            return (
              <button
                key={link.label}
                onClick={() => {
                  navigate(link.path);
                  onClose();
                }}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon name={link.icon} />
                <span className={isActive ? "font-medium" : ""}>{link.label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

// ─── Admin Layout (Shell) ─────────────────────────────────
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}