import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const PAYMENT_METHODS = ["MOMO", "OM"];
const POLL_INTERVAL = 3000;
const POLL_TIMEOUT = 120000; // 2 minutes

export default function MakePayment() {
    const { loanId } = useParams();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("MOMO");
    const [accountNumber, setAccountNumber] = useState("");
    const [stage, setStage] = useState("form"); // form | pending | success | failed
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const pollTimer = useRef(null);
    const pollDeadline = useRef(null);

    useEffect(() => {
        return () => clearInterval(pollTimer.current);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await ApiService.makeLoanPayment(loanId, { paymentMethod, accountNumber });
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
            setError(err.response?.data?.message || "Failed to submit payment");
        }
    };

    const startPolling = (paymentReference) => {
        pollDeadline.current = Date.now() + POLL_TIMEOUT;

        pollTimer.current = setInterval(async () => {
            if (Date.now() > pollDeadline.current) {
                clearInterval(pollTimer.current);
                setError("Payment confirmation is taking longer than expected. Check your transaction history shortly.");
                setStage("failed");
                return;
            }

            try {
                const tx = await ApiService.getTransactionStatus(paymentReference);

                if (tx.transactionStatus === "COMPLETED") {
                    clearInterval(pollTimer.current);
                    setStage("success");
                } else if (tx.transactionStatus === "FAILED") {
                    clearInterval(pollTimer.current);
                    setStage("failed");
                }
                // still PENDING → keep polling
            } catch (err) {
                console.log(err);
                // transient error, keep polling until timeout
            }
        }, POLL_INTERVAL);
    };

    return (
        <div className="p-6 max-w-md mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Make Payment</h1>
            <p className="text-sm text-gray-500">Loan #{loanId}</p>

            {stage === "form" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            {PAYMENT_METHODS.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Account Number</label>
                        <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="237677777777"
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-md text-sm"
                    >
                        Pay Now
                    </button>
                </form>
            )}

            {stage === "pending" && (
                <div className="text-center space-y-3 py-8">
                    <div className="text-4xl">⏳</div>
                    <p className="font-medium">Waiting for confirmation</p>
                    <p className="text-sm text-gray-500">
                        Check your phone and enter your {paymentMethod} PIN to approve this payment.
                    </p>
                    <p className="text-xs text-gray-400">This may take up to 2 minutes.</p>
                </div>
            )}

            {stage === "success" && (
                <div className="text-center space-y-3 py-8">
                    <div className="text-4xl">✅</div>
                    <p className="font-medium">Payment Successful</p>
                    {result?.paymentReference && (
                        <p className="text-sm text-gray-500">Reference: {result.paymentReference}</p>
                    )}
                    <button
                        onClick={() => navigate(`/borrower/repayment-schedule/${loanId}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                    >
                        View Repayment Schedule
                    </button>
                </div>
            )}

            {stage === "failed" && (
                <div className="text-center space-y-3 py-8">
                    <div className="text-4xl">❌</div>
                    <p className="font-medium">Payment Failed</p>
                    {error && <p className="text-sm text-gray-500">{error}</p>}
                    <button
                        onClick={() => { setStage("form"); setError(""); }}
                        className="px-4 py-2 bg-green-500 text-white rounded-md text-sm"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}