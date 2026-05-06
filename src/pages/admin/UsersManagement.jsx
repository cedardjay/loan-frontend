import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

// ─── Top Navbar (Responsive) ──────────────────────────────
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
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar (Responsive Drawer) ──────────────────────────
function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed lg:static top-0 left-0 h-full w-64 bg-white z-50 border-r transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-6 font-bold text-lg border-b">Loan@ Admin</div>

        <div className="p-4 space-y-2">
          {ADMIN_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                navigate(link.path);
                onClose();
              }}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
            >
              <Icon name={link.icon} />
              {link.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

// ─── Stats Cards (Modern) ─────────────────────────────────
function Stats() {
  const stats = [
    { label: "Total Users", value: "1,245", icon: "people" },
    { label: "Active Loans", value: "320", icon: "account_balance" },
    { label: "Revenue", value: "$45,200", icon: "payments" },
    { label: "Pending KYC", value: "18", icon: "report" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-500">{s.label}</p>
            <Icon name={s.icon} />
          </div>
          <h2 className="text-2xl font-extrabold">{s.value}</h2>
        </div>
      ))}
    </div>
  );
}

// ─── Table Component (Reusable + Responsive) ──────────────
function Table({ title, columns, data }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">
      <h3 className="font-bold mb-4">{title}</h3>

      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr className="text-left border-b text-gray-500">
            {columns.map((col) => (
              <th key={col} className="pb-2">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {Object.values(row).map((cell, j) => (
                <td key={j} className="py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


                

// ─── Users Management Page ──────────────────────────────
export function UsersManagement() {
  const [open, setOpen] = useState(false);

  const users = [
    { ID: "U001", Name: "John Doe", Email: "john@mail.com", Role: "User", Status: "Active" },
    { ID: "U002", Name: "Jane Smith", Email: "jane@mail.com", Role: "Borrower", Status: "Pending" },
    { ID: "U003", Name: "Mark T.", Email: "mark@mail.com", Role: "Investor", Status: "Blocked" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col">
        <TopNav onMenuClick={() => setOpen(true)} />

        <main className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">User Management</h1>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:opacity-90">
              + Add User
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-bold">
              Filter
            </button>
          </div>

          {/* Table */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="text-left border-b text-gray-500">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2">{user.ID}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Role}</td>
                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded font-bold ${
                          user.Status === "Active"
                            ? "bg-green-100 text-green-600"
                            : user.Status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.Status}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:opacity-90">
                        View
                      </button>
                      <button className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:opacity-90">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:opacity-90">
                        Block
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

