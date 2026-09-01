import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";

const PAYMENT_METHODS = ["MOMO", "OM"];

export default function DisbursementAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("MOMO");
    const [accountNumber, setAccountNumber] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const data = await ApiService.getPaymentAccounts();
            setAccounts(data);
        } catch (err) {
            setError("Failed to load disbursement accounts");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await ApiService.createPaymentAccount({ paymentMethod, accountNumber });
            setAccountNumber("");
            setPaymentMethod("MOMO");
            setShowForm(false);
            fetchAccounts();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create account");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Disbursement Accounts</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                    {showForm ? "Cancel" : "Add Account"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Provider</label>
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
                        disabled={submitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
                    >
                        {submitting ? "Saving..." : "Save Account"}
                    </button>
                </form>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : accounts.length === 0 ? (
                <p className="text-sm text-gray-500">No disbursement accounts yet.</p>
            ) : (
                <div className="grid gap-3">
                    {accounts.map((acc) => (
                        <div
                            key={acc.id}
                            className="flex items-center justify-between border rounded-md p-3"
                        >
                            <div>
                                <p className="font-medium">{acc.paymentMethod}</p>
                                <p className="text-sm text-gray-500">{acc.accountNumber}</p>
                            </div>
                            {acc.isDefault && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    Default
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}