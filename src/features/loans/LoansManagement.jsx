import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

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



// ─── Loans Management Page ───────────────────────────────
export default function LoansManagement() {
  const [open, setOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch loans on mount ──────────────────────────────
  useEffect(() => {
    fetchLoans();
  }, []);

  async function fetchLoans() {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getAllLoanRequests();
      setLoans(data.loanrequestlist || []);
    } catch (err) {
      setError("Failed to load loans. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Approve ───────────────────────────────────────────
  async function handleApprove(requestId) {
    try {
      await ApiService.approveLoanRequest(requestId);
      await fetchLoans(); // refresh list
    } catch (err) {
      alert("Failed to approve loan.");
    }
  }

  // ── Reject ────────────────────────────────────────────
  async function handleReject(requestId) {
    try {
      await ApiService.rejectLoanRequest(requestId);
      await fetchLoans(); // refresh list
    } catch (err) {
      alert("Failed to reject loan.");
    }
  }

  // ── Status badge color ────────────────────────────────
  function statusStyle(status) {
    switch (status) {
      case "APPROVED":       return "bg-green-100 text-green-600";
      case "PENDING_APPROVAL": return "bg-yellow-100 text-yellow-600";
      case "REJECTED":       return "bg-red-100 text-red-600";
      default:               return "bg-gray-100 text-gray-500";
    }
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col">
        <TopNav onMenuClick={() => setOpen(true)} />

        <main className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">Loans Management</h1>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={fetchLoans}
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-bold hover:opacity-90"
            >
              ↻ Refresh
            </button>
          </div>

          {/* States */}
          {loading && (
            <p className="text-gray-500 text-sm">Loading loans...</p>
          )}
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="text-left border-b text-gray-500">
                    <th className="pb-2">ID</th>
                    <th className="pb-2">Borrower</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Purpose</th>
                    <th className="pb-2">Term</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">
                        No loan requests found.
                      </td>
                    </tr>
                  ) : (
                    loans.map((loan) => (
                      <tr key={loan.requestId} className="border-b hover:bg-gray-50">
                        <td className="py-3">#{loan.requestId}</td>
                        <td>
                          <div className="font-medium">{loan.borrowerName}</div>
                          <div className="text-xs text-gray-400">{loan.borrowerEmail}</div>
                        </td>
                        <td>${loan.requestedAmount.toLocaleString()}</td>
                        <td>{loan.purpose || loan.description}</td>
                        <td>{loan.termMonths} mo</td>
                        <td>
                          <span className={`px-2 py-1 text-xs rounded font-bold ${statusStyle(loan.status)}`}>
                            {loan.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="space-x-2">
                          {loan.status === "PENDING_APPROVAL" && (
                            <>
                              <button
                                onClick={() => handleApprove(loan.requestId)}
                                className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:opacity-90"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(loan.requestId)}
                                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:opacity-90"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {loan.status !== "PENDING_APPROVAL" && (
                            <span className="text-xs text-gray-400">No actions</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}