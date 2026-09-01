import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const STATUS_STYLES = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-gray-100 text-gray-700",
    PARTIAL: "bg-yellow-100 text-yellow-700",
    LATE: "bg-red-100 text-red-700",
};

export default function RepaymentSchedule() {
    const { loanId } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSchedule();
    }, [loanId]);

    const fetchSchedule = async () => {
        try {
            setLoading(true);
            const data = await ApiService.getRepaymentSchedule(loanId);
            setSchedule(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load repayment schedule");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    const formatAmount = (amount) => `${Number(amount).toLocaleString()} FCFA`;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Repayment Schedule</h1>
                    <p className="text-sm text-gray-500">Loan #{loanId}</p>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-blue-600 underline"
                >
                    Back
                </button>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">Loading schedule...</p>
            ) : error ? (
                <p className="text-sm text-red-600">{error}</p>
            ) : schedule.length === 0 ? (
                <p className="text-sm text-gray-500">No repayment schedule found for this loan.</p>
            ) : (
                <div className="overflow-x-auto border rounded-md">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Due Date</th>
                                <th className="p-3">Amount Due</th>
                                <th className="p-3">Principal</th>
                                <th className="p-3">Interest</th>
                                <th className="p-3">Paid Date</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((row) => (
                                <tr key={row.scheduleId} className="border-t">
                                    <td className="p-3">{row.installmentNumber}</td>
                                    <td className="p-3">{formatDate(row.dueDate)}</td>
                                    <td className="p-3">{formatAmount(row.amountDue)}</td>
                                    <td className="p-3">{formatAmount(row.principalComponent)}</td>
                                    <td className="p-3">{formatAmount(row.interestComponent)}</td>
                                    <td className="p-3">{formatDate(row.paidDate)}</td>
                                    <td className="p-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${STATUS_STYLES[row.status] || "bg-gray-100 text-gray-700"}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}