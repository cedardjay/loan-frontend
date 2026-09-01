import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import AdminLayout from './AdminLayout';

export default function LoanRequestsPage() {
    const [loans, setLoans] = useState([]);
    const [loansLoading, setLoansLoading] = useState(true);
    const [actionId, setActionId] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const data = await ApiService.getAllLoanRequests();
                setLoans(data);
            } catch (error) {
                console.error('Failed to fetch loans:', error);
            } finally {
                setLoansLoading(false);
            }
        };
        fetchLoans();
    }, []);

    const handleApprove = async (requestId) => {
        setActionId(requestId);
        try {
            await ApiService.approveLoanRequest(requestId);
            setLoans((prev) => prev.map((l) => (l.requestId === requestId ? { ...l, status: 'ACTIVE' } : l)));
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
            setLoans((prev) => prev.map((l) => (l.requestId === requestId ? { ...l, status: 'REJECTED' } : l)));
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
            setLoans((prev) => prev.map((l) => (l.requestId === requestId ? { ...l, status: 'ACTIVE' } : l)));
        } catch (error) {
            console.error('Failed to disburse loan:', error);
        } finally {
            setActionId(null);
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case 'PENDING_APPROVAL': return 'bg-yellow-100 text-yellow-700';
            case 'APPROVED': return 'bg-teal-100 text-teal-700';
            case 'REJECTED': return 'bg-red-100 text-red-700';
            case 'EXPIRED': return 'bg-slate-200 text-slate-600';
            case 'PARTIALLY_FUNDED': return 'bg-blue-50 text-blue-600';
            case 'FULLY_FUNDED': return 'bg-blue-100 text-blue-700';
            case 'DISBURSAL_REQUESTED': return 'bg-indigo-100 text-indigo-700';
            case 'ACTIVE': return 'bg-green-100 text-green-700';
            case 'IN_GRACE': return 'bg-orange-100 text-orange-700';
            case 'DEFAULT': return 'bg-red-200 text-red-800';
            case 'COMPLETED': return 'bg-purple-100 text-purple-700';
            default: return 'bg-surface-container-highest text-outline';
        }
    };

    return (
        <AdminLayout title="Loan@" badge="SUPER ADMIN">
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
                                <tr><td colSpan={8} className="text-center py-8 text-outline">Loading loan requests...</td></tr>
                            ) : loans.length === 0 ? (
                                <tr><td colSpan={8} className="text-center py-8 text-outline">No loan requests found.</td></tr>
                            ) : (
                                loans.map((l) => (
                                    <tr key={l.requestId} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-on-background">{l.borrowerName}</div>
                                            <div className="text-xs text-outline">{l.borrowerEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-tertiary max-w-[200px] truncate" title={l.description}>{l.description}</td>
                                        <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap">{l.requestedAmount.toLocaleString()} FCFA</td>
                                        <td className="px-6 py-4 text-sm text-tertiary whitespace-nowrap">{l.termMonths} mo</td>
                                        <td className="px-6 py-4 text-sm text-tertiary whitespace-nowrap">{l.interestRate}%</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase whitespace-nowrap ${statusColor(l.status)}`}>
                                                {l.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-outline whitespace-nowrap">{new Date(l.requestDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            {l.status === 'PENDING_APPROVAL' ? (
                                                <div className="flex gap-2">
                                                    <button disabled={actionId === l.requestId} onClick={() => handleApprove(l.requestId)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-green-600 text-white disabled:opacity-50">Approve</button>
                                                    <button disabled={actionId === l.requestId} onClick={() => handleReject(l.requestId)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white disabled:opacity-50">Reject</button>
                                                </div>
                                            ) : l.status === 'DISBURSAL_REQUESTED' ? (
                                                <button disabled={actionId === l.requestId} onClick={() => handleDisburse(l.requestId)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white disabled:opacity-50">Disburse</button>
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
        </AdminLayout>
    );
}