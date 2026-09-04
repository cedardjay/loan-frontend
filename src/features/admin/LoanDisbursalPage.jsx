import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import AdminLayout from './AdminLayout';

const POLL_INTERVAL = 3000;
const POLL_TIMEOUT = 120000;

export default function LoanDisbursalPage() {
    const { requestId } = useParams();
    const navigate = useNavigate();

    const [loan, setLoan] = useState(null);
    const [loanLoading, setLoanLoading] = useState(true);
    const [loanError, setLoanError] = useState(null);

    const [stage, setStage] = useState("review"); // review | pending | success | failed
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const pollTimer = useRef(null);
    const pollDeadline = useRef(null);

    useEffect(() => {
        return () => clearInterval(pollTimer.current);
    }, []);

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const data = await ApiService.getLoanRequestById(requestId);
                setLoan(data);
            } catch (err) {
                setLoanError(err.response?.data?.message || "Failed to load loan request");
            } finally {
                setLoanLoading(false);
            }
        };
        fetchLoan();
    }, [requestId]);

    const handleDisburse = async () => {
        setError("");
        setSubmitting(true);
        try {
            const res = await ApiService.disburseLoan(requestId);
            setResult(res);

            if (res.status === "FAILED") {
                setStage("failed");
                return;
            }

            if (res.status === "COMPLETED") {
                setStage("success");
                return;
            }

            // PENDING → start polling
            setStage("pending");
            startPolling(res.paymentReference);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to initiate disbursal");
        } finally {
            setSubmitting(false);
        }
    };

    const startPolling = (paymentReference) => {
        pollDeadline.current = Date.now() + POLL_TIMEOUT;
        let inFlight = false;

        pollTimer.current = setInterval(async () => {
            if (inFlight) return; // skip this tick if last call still running
            if (Date.now() > pollDeadline.current) {
                clearInterval(pollTimer.current);
                setError("Disbursal confirmation is taking longer than expected. Check back shortly.");
                setStage("failed");
                return;
            }

            inFlight = true;
            try {
                const tx = await ApiService.getTransactionStatus(paymentReference);
                console.log("poll result:", tx);
                const status = (tx.transactionStatus || "").toUpperCase();

                if (status === "COMPLETED") {
                    clearInterval(pollTimer.current);
                    setStage("success");
                } else if (status === "FAILED") {
                    clearInterval(pollTimer.current);
                    setStage("failed");
                }
            } catch (err) {
                console.log(err);
            } finally {
                inFlight = false;
            }
        }, POLL_INTERVAL);
    };

    return (
        <AdminLayout title="Loan Disbursal" badge="SUPER ADMIN">
            <div className="max-w-lg mx-auto space-y-6">
                <h1 className="text-2xl font-extrabold">Disburse Loan #{requestId}</h1>

                {stage === "review" && (
                    <>
                        {loanLoading ? (
                            <p className="text-sm text-outline">Loading loan request...</p>
                        ) : loanError ? (
                            <p className="text-sm text-red-600">{loanError}</p>
                        ) : loan ? (
                            <div className="space-y-4">
                                <div className="rounded-xl border p-4 bg-surface-container-lowest space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-outline">Borrower</span>
                                        <span className="text-sm font-semibold">{loan.borrowerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-outline">Email</span>
                                        <span className="text-sm">{loan.borrowerEmail}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-outline">Purpose</span>
                                        <span className="text-sm">{loan.purpose}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-outline">Term</span>
                                        <span className="text-sm">{loan.termMonths} months</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-outline">Interest Rate</span>
                                        <span className="text-sm">{loan.interestRate}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-outline">Funded</span>
                                        <span className="text-sm">{loan.amountFunded.toLocaleString()} FCFA ({loan.fundingPercentage}%)</span>
                                    </div>
                                </div>

                                <div className="rounded-xl border p-4 bg-blue-50 space-y-1">
                                    <p className="text-xs text-outline uppercase font-bold">Amount to Disburse</p>
                                    <p className="text-2xl font-extrabold text-blue-700">
                                        {loan.requestedAmount.toLocaleString()} FCFA
                                    </p>
                                </div>

                                <div className="rounded-xl border p-4 bg-surface-container-lowest space-y-2">
                                    <p className="text-xs text-outline uppercase font-bold">Disbursal Account</p>
                                    {loan.paymentAccount ? (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-outline">Method</span>
                                                <span className="text-sm font-semibold">{loan.paymentAccount.paymentMethod}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-outline">Account Number</span>
                                                <span className="text-sm font-semibold">{loan.paymentAccount.accountNumber}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-sm text-red-600">No payment account on file.</p>
                                    )}
                                </div>

                                {error && <p className="text-red-600 text-sm">{error}</p>}

                                <button
                                    onClick={handleDisburse}
                                    disabled={submitting || !loan.paymentAccount}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting && (
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    )}
                                    {submitting ? "Processing..." : "Confirm Disbursal"}
                                </button>
                            </div>
                        ) : null}
                    </>
                )}

                {stage === "pending" && (
                    <div className="text-center space-y-3 py-8">
                        <div className="text-4xl">⏳</div>
                        <p className="font-medium">Waiting for confirmation</p>
                        <p className="text-sm text-outline">Disbursal is being processed by the payment provider.</p>
                        <p className="text-xs text-outline">This may take up to 2 minutes.</p>
                    </div>
                )}

                {stage === "success" && (
                    <div className="text-center space-y-3 py-8">
                        <div className="text-4xl">✅</div>
                        <p className="font-medium">Loan Disbursed</p>
                        {result?.paymentReference && (
                            <p className="text-sm text-outline">Reference: {result.paymentReference}</p>
                        )}
                        <button
                            onClick={() => navigate('/super-admin/loans')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                        >
                            Back to Loan Requests
                        </button>
                    </div>
                )}

                {stage === "failed" && (
                    <div className="text-center space-y-3 py-8">
                        <div className="text-4xl">❌</div>
                        <p className="font-medium">Disbursal Failed</p>
                        {error && <p className="text-sm text-outline">{error}</p>}
                        <button
                            onClick={() => { setStage("review"); setError(""); }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}