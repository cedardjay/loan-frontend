import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loans, setLoans] = useState([]);
  const [loansLoading, setLoansLoading] = useState(true);
  const [actionId, setActionId] = useState(null); // tracks which row is being approved/rejected/disbursed

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await ApiService.getAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    const fetchLoans = async () => {
      try {
        const data = await ApiService.getAllLoanRequests();
        setLoans(data);
        setLoansLoading(false);
      } catch (error) {
        console.error('Failed to fetch loans:', error);
        setLoansLoading(false);
      }
    };

    fetchUsers();
    fetchLoans();
  }, []);

  const handleApprove = async (requestId) => {
    setActionId(requestId);
    try {
      await ApiService.approveLoanRequest(requestId);
      setLoans((prev) =>
        prev.map((l) =>
          l.requestId === requestId ? { ...l, status: 'ACTIVE' } : l
        )
      );
    } catch (error) {
      console.error('Failed to approve loan:', error);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (requestId) => {
    setActionId(requestId);
    try {
      await ApiService.rejectLoanRequest(requestId);
      setLoans((prev) =>
        prev.map((l) =>
          l.requestId === requestId ? { ...l, status: 'REJECTED' } : l
        )
      );
    } catch (error) {
      console.error('Failed to reject loan:', error);
    } finally {
      setActionId(null);
    }
  };

  const handleDisburse = async (requestId) => {
    setActionId(requestId);
    try {
      await ApiService.disburseLoan(requestId);
      setLoans((prev) =>
        prev.map((l) =>
          l.requestId === requestId ? { ...l, status: 'DISBURSED' } : l
        )
      );
    } catch (error) {
      console.error('Failed to disburse loan:', error);
    } finally {
      setActionId(null);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';
      case 'PENDING_APPROVAL':
        return 'bg-yellow-100 text-yellow-700';
      case 'FULLY_FUNDED':
        return 'bg-blue-100 text-blue-700';
      case 'DISBURSED':
        return 'bg-purple-100 text-purple-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-surface-container-highest text-outline';
    }
  };

  return (
    <div className="bg-surface min-h-screen flex">
      <aside className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant/20 bg-surface-container-low sticky top-0 py-8">
        <div className="px-8 mb-10">
          <h1 className="font-black text-xl">Super Admin</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-1">
            <li className="pr-4">
              <a className="flex items-center gap-4 px-8 py-3 bg-white text-primary font-bold rounded-r-full" href="#">
                <span className="material-symbols-outlined">group</span>
                <span className="text-[10px] uppercase tracking-widest">Users</span>
              </a>
            </li>
            <li className="pr-4">
              <a className="flex items-center gap-4 px-8 py-3 text-tertiary" href="#loans">
                <span className="material-symbols-outlined">request_quote</span>
                <span className="text-[10px] uppercase tracking-widest">Loan Requests</span>
              </a>
            </li>
            <li className="pr-4">
              <a className="flex items-center gap-4 px-8 py-3 text-tertiary" href="#">
                <span className="material-symbols-outlined">shield_person</span>
                <span className="text-[10px] uppercase tracking-widest">Admins</span>
              </a>
            </li>
            <li className="pr-4">
              <Link className="flex items-center gap-4 px-8 py-3 text-tertiary" to="/admin-dashboard">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-[10px] uppercase tracking-widest">View Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-8 mt-auto">
          <Link to="/" className="text-[10px] font-bold uppercase text-tertiary">Sign Out</Link>
        </div>
      </aside>

      <main className="flex-1 p-8 space-y-10 mt-16">
        <header className="fixed top-0 right-0 left-0 md:left-64 bg-white/85 backdrop-blur-md border-b px-8 py-4 z-50 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Loan@{' '}
            <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded ml-2">SUPER ADMIN</span>
          </h2>

          <button
            onClick={() => {
              ApiService.logout();
              navigate('/login');
            }}
            className="px-4 py-1.5 bg-primary text-white rounded-lg font-semibold">
            Logout
          </button>
        </header>

        <h1 className="text-3xl font-extrabold mb-8">User Management</h1>
        <div className="bg-surface-container-low rounded-xl p-8">
          <div className="overflow-x-auto bg-surface-container-lowest rounded-xl shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-high/30">
                  {['User Details', 'Phone Number', 'Role', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-extrabold uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-outline">Loading users...</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-on-background">{u.name}</div>
                        <div className="text-xs text-outline">{u.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-tertiary">{u.phoneNumber}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${u.role === 'ADMIN'
                          ? 'bg-secondary-container/50 text-on-secondary-container'
                          : 'bg-surface-container-highest text-outline'
                          }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="material-symbols-outlined text-outline">more_horiz</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* LOAN REQUESTS SECTION */}
        <h1 id="loans" className="text-3xl font-extrabold mb-8 scroll-mt-24">Loan Requests</h1>
        <div className="bg-surface-container-low rounded-xl p-8">
          <div className="overflow-x-auto bg-surface-container-lowest rounded-xl shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-high/30">
                  {['Borrower', 'Description', 'Amount', 'Term', 'Rate', 'Status', 'Requested', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-extrabold uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loansLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-outline">Loading loan requests...</td>
                  </tr>
                ) : loans.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-outline">No loan requests found.</td>
                  </tr>
                ) : (
                  loans.map((l) => (
                    <tr key={l.requestId} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-on-background">{l.borrowerName}</div>
                        <div className="text-xs text-outline">{l.borrowerEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-tertiary max-w-[200px] truncate" title={l.description}>
                        {l.description}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap">
                        ${l.requestedAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-tertiary whitespace-nowrap">{l.termMonths} mo</td>
                      <td className="px-6 py-4 text-sm text-tertiary whitespace-nowrap">{l.interestRate}%</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase whitespace-nowrap ${statusColor(l.status)}`}>
                          {l.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-outline whitespace-nowrap">
                        {new Date(l.requestDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {l.status === 'PENDING_APPROVAL' ? (
                          <div className="flex gap-2">
                            <button
                              disabled={actionId === l.requestId}
                              onClick={() => handleApprove(l.requestId)}
                              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-green-600 text-white disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              disabled={actionId === l.requestId}
                              onClick={() => handleReject(l.requestId)}
                              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        ) : l.status === 'FULLY_FUNDED' ? (
                          <button
                            disabled={actionId === l.requestId}
                            onClick={() => handleDisburse(l.requestId)}
                            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white disabled:opacity-50"
                          >
                            Disburse
                          </button>
                        ) : (
                          <span className="text-xs text-outline">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}