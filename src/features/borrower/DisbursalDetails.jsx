import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import ApiService from "../../service/ApiService";

export default function DisbursalDetails() {
    const [searchParams] = useSearchParams();
    const loanRequestId = searchParams.get("loanRequestId");
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const data = await ApiService.getPaymentAccounts();
            const list = Array.isArray(data) ? data : [];
            setAccounts(list);
            const defaultAcc = list.find((a) => a.isDefault);
            if (defaultAcc) setSelectedId(defaultAcc.id);
        } catch (err) {
            setError("Failed to load disbursement accounts");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!selectedId) {
            setError("Select a disbursement account first");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            await ApiService.requestDisbursal(loanRequestId, selectedId);
            navigate("/borrower/my-loans");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to request disbursal");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Confirm Disbursal Account</h1>
            <p className="text-sm text-gray-500">
                Choose the account you want loan #{loanRequestId} disbursed to.
            </p>

            {loading ? (
                <p className="text-sm text-gray-500">Loading accounts...</p>
            ) : accounts.length === 0 ? (
                <p className="text-sm text-gray-500">
                    You have no disbursement accounts yet.{" "}
                    <Link to="/borrower/payments" className="text-blue-600 underline">
                        Create one in Payments.
                    </Link>
                </p>
            ) : (
                <div className="space-y-3">
                    {accounts.map((acc) => (
                        <label
                            key={acc.id}
                            className={`flex items-center justify-between border rounded-md p-3 cursor-pointer ${
                                selectedId === acc.id ? "border-blue-600 bg-blue-50" : ""
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="payoutAccount"
                                    checked={selectedId === acc.id}
                                    onChange={() => setSelectedId(acc.id)}
                                />
                                <div>
                                    <p className="font-medium">{acc.paymentMethod}</p>
                                    <p className="text-sm text-gray-500">{acc.accountNumber}</p>
                                </div>
                            </div>
                            {acc.isDefault && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    Default
                                </span>
                            )}
                        </label>
                    ))}

                    <p className="text-xs text-gray-500">
                        Want to use a different account?{" "}
                        <Link to="/borrower/payments" className="text-blue-600 underline">
                            Add one in Payments.
                        </Link>
                    </p>
                </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                onClick={handleConfirm}
                disabled={submitting || accounts.length === 0}
                className="px-4 py-2 bg-green-500 text-white rounded-md text-sm disabled:opacity-50"
            >
                {submitting ? "Requesting..." : "Confirm Disbursal"}
            </button>
        </div>
    );
}