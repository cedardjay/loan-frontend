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

// ─── Status Badge Component (Color-coded) ─────────────────
function StatusBadge({ status }) {
  const statusConfig = {
    Active: { color: "bg-green-100 text-green-800", dot: "bg-green-500" },
    Pending: { color: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
    Success: { color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
    Failed: { color: "bg-red-100 text-red-800", dot: "bg-red-500" },
    "In Progress": { color: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
    Approved: { color: "bg-purple-100 text-purple-800", dot: "bg-purple-500" },
    Rejected: { color: "bg-rose-100 text-rose-800", dot: "bg-rose-500" },
    Default: { color: "bg-gray-100 text-gray-800", dot: "bg-gray-500" },
  };

  const config = statusConfig[status] || statusConfig.Default;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {status}
    </span>
  );
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
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar (Responsive Drawer) ──────────────────────────
function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = window.location.pathname;

  return (
    <>
      {/* Overlay */}
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

// ─── Stats Cards with Color Indicators ────────────────────
function Stats() {
  const stats = [
    { label: "Total Users", value: "1,245", icon: "people", trend: "+12%", trendUp: true },
    { label: "Active Loans", value: "320", icon: "account_balance", trend: "+5%", trendUp: true },
    { label: "Revenue", value: "$45,200", icon: "payments", trend: "+8%", trendUp: true },
    { label: "Pending KYC", value: "18", icon: "report", trend: "-3%", trendUp: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition group">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-500">{s.label}</p>
            <div className="text-gray-400 group-hover:text-blue-500 transition">
              <Icon name={s.icon} />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold">{s.value}</h2>
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-xs font-medium ${s.trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {s.trend}
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Enhanced Table Component with Color Indicators ───────
function Table({ title, columns, data }) {
  // Define which columns should use status badges
  const statusColumns = ['Status', 'Loan Status', 'KYC Status'];
  
  const formatCell = (value, columnName) => {
    if (statusColumns.includes(columnName)) {
      return <StatusBadge status={value} />;
    }
    
    // Color-code amount fields
    if (columnName === 'Amount' && typeof value === 'string') {
      const amount = parseFloat(value.replace('$', ''));
      if (amount > 500) return <span className="text-green-600 font-medium">{value}</span>;
      if (amount > 200) return <span className="text-blue-600">{value}</span>;
      return <span className="text-gray-600">{value}</span>;
    }
    
    // Color-code ID fields with subtle styling
    if (columnName === 'ID' || columnName === 'Loan ID') {
      return <span className="font-mono text-xs text-gray-600">{value}</span>;
    }
    
    return value;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">
      <h3 className="font-bold mb-4 text-gray-800">{title}</h3>

      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr className="text-left border-b text-gray-500">
            {columns.map((col) => (
              <th key={col} className="pb-2 font-semibold">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
              {columns.map((col, j) => (
                <td key={j} className="py-3">
                  {formatCell(row[col], col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────
export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  const users = [
    { Name: "John Doe", Email: "john@mail.com", Status: "Active", "KYC Status": "Approved" },
    { Name: "Jane Smith", Email: "jane@mail.com", Status: "Pending", "KYC Status": "Pending" },
    { Name: "Mike Johnson", Email: "mike@mail.com", Status: "Active", "KYC Status": "Approved" },
    { Name: "Sarah Wilson", Email: "sarah@mail.com", Status: "In Progress", "KYC Status": "In Progress" },
  ];

  const transactions = [
    { ID: "TX001", Amount: "$200", Status: "Success", Date: "2024-01-15" },
    { ID: "TX002", Amount: "$500", Status: "Pending", Date: "2024-01-14" },
    { ID: "TX003", Amount: "$1,200", Status: "Success", Date: "2024-01-13" },
    { ID: "TX004", Amount: "$75", Status: "Failed", Date: "2024-01-12" },
  ];

  const loans = [
    { "Loan ID": "LN001", Amount: "$10,000", "Loan Status": "Active", "Interest Rate": "5.5%" },
    { "Loan ID": "LN002", Amount: "$5,000", "Loan Status": "Pending", "Interest Rate": "4.2%" },
    { "Loan ID": "LN003", Amount: "$25,000", "Loan Status": "Approved", "Interest Rate": "6.0%" },
    { "Loan ID": "LN004", Amount: "$15,000", "Loan Status": "Rejected", "Interest Rate": "5.0%" },
  ];

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col">
        <TopNav onMenuClick={() => setOpen(true)} />

        <main className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Admin Overview
            </h1>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          <Stats />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Table title="Recent Users" columns={["Name", "Email", "Status", "KYC Status"]} data={users} />
            <Table title="Recent Loans" columns={["Loan ID", "Amount", "Loan Status", "Interest Rate"]} data={loans} />
            <div className="xl:col-span-2">
              <Table title="Recent Transactions" columns={["ID", "Amount", "Status", "Date"]} data={transactions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}