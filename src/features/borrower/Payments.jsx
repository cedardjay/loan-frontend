import { useState } from "react";
import DisbursementAccounts from "./DisbursementAccounts";

const TABS = [
    { key: "disbursement", label: "Disbursement Accounts" },
    { key: "transactions", label: "Transaction History" },
];

export default function Payments() {
    const [activeTab, setActiveTab] = useState("disbursement");

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold">Payments</h1>

            <div className="border-b flex gap-6">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                            activeTab === tab.key
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div>
                {activeTab === "disbursement" && <DisbursementAccounts />}
                {activeTab === "transactions" && (
                    <p className="text-sm text-gray-500">Transaction history coming soon.</p>
                )}
            </div>
        </div>
    );
}