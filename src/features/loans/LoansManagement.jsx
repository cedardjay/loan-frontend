import { useState, useEffect, useRef, useEffect as useClickOutside } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

// ─── Kebab Menu ───────────────────────────────────────────
function KebabMenu({ loan, onApprove, onReject, onDisburse, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPending = loan.status === "PENDING_APPROVAL";
  const isFullyFunded = loan.status === "FULLY_FUNDED";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1.5 rounded-lg hover:bg-blue-200 transition text-gray-500 font-bold text-lg leading-none"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 top-9 bg-white border border-gray-100 shadow-lg rounded-xl z-20 w-44 overflow-hidden">
          <button
            onClick={() => { onNavigate(loan.requestId); setOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            🔍View Details
          </button>

          {isPending && (
            <>
              <div className="border-t border-gray-100" />
              <button
                onClick={() => { onApprove(loan.requestId); setOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 transition"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => { onReject(loan.requestId); setOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                ✕ Reject
              </button>
            </>
          )}

          {isFullyFunded && (
            <>
              <div className="border-t border-gray-100" />
              <button
                onClick={() => { onDisburse(loan.requestId); setOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition"
              >
                💸 Disburse Funds
              </button>
            </>
          )}

          <div className="border-t border-gray-100" />
          <button
            onClick={() => { alert(`Flag loan #${loan.requestId}`); setOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-yellow-600 hover:bg-yellow-50 transition"
          >
            ⚑ Flag
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Loans Management Page ────────────────────────────────
export default function LoansManagement() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  async function handleApprove(requestId) {
    try {
      await ApiService.approveLoanRequest(requestId);
      await fetchLoans();
    } catch (err) {
      alert("Failed to approve loan.");
    }
  }

  async function handleReject(requestId) {
    try {
      await ApiService.rejectLoanRequest(requestId);
      await fetchLoans();
    } catch (err) {
      alert("Failed to reject loan.");
    }
  }

  async function handleDisburse(requestId) {
    try {
      await ApiService.disburseLoan(requestId);
      await fetchLoans();
    } catch (err) {
      alert("Failed to disburse loan.");
    }
  }

  function statusStyle(status) {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-700";
      case "PENDING_APPROVAL": return "bg-yellow-100 text-yellow-700";
      case "REJECTED": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-500";
    }
  }

  return (
    <>
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
      {loading && <p className="text-gray-500 text-sm">Loading loans...</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Cards */}
      {!loading && !error && (
        loans.length === 0 ? (
          <p className="text-center text-gray-400 mt-12">No loan requests found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {loans.map((loan) => (
              <div key={loan.requestId} className="bg-blue-100 border border-blue-200 rounded-2xl shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:border-blue-300 transition">

                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{loan.borrowerName}</p>
                    <p className="text-xs text-gray-400">{loan.borrowerEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${statusStyle(loan.status)}`}>
                      {loan.status.replace("_", " ")}
                    </span>
                    <KebabMenu
                      loan={loan}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onDisburse={handleDisburse}
                      onNavigate={(id) => navigate(`/admin/loans/${id}`)}
                    />
                  </div>
                </div>

                {/* Loan Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">Amount</p>
                    <p className="font-bold text-gray-800">${loan.requestedAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">Term</p>
                    <p className="font-bold text-gray-800">{loan.termMonths} months</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 col-span-2">
                    <p className="text-xs text-gray-400 mb-0.5">Purpose</p>
                    <p className="font-medium text-gray-700 truncate">{loan.purpose || loan.description}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-gray-400">#{loan.requestId}</p>
                  <p className="text-xs text-gray-400">{loan.status === "PENDING_APPROVAL" ? "Awaiting review" : "Reviewed"}</p>
                </div>

              </div>
            ))}
          </div>
        )
      )}
    </>
  );
}