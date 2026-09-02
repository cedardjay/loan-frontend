import React, { useState, useEffect, useMemo } from 'react';
import ApiService from '../../service/ApiService';
import AdminLayout from './AdminLayout';

const STATUS_FILTERS = ['ALL', 'PENDING', 'FAILED', 'COMPLETED'];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ApiService.getAllTransactions();
        setTransactions(data);
      } catch (err) {
        setError('Failed to load transactions.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredTransactions = useMemo(() => {
    if (statusFilter === 'ALL') return transactions;
    return transactions.filter((tx) => tx.transactionStatus === statusFilter);
  }, [transactions, statusFilter]);

  return (
    <AdminLayout title="Loan@" badge="SUPER ADMIN">
      <div className="p-8">
        <h1 className="font-black text-xl mb-6">Transactions</h1>

        <div className="flex gap-2 mb-6">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${statusFilter === status
                ? 'bg-primary text-white'
                : 'bg-surface-container text-tertiary'
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-tertiary border-b border-outline-variant/20">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">Sender</th>
                  <th className="py-3 px-2">Receiver</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Method</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Reference</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.transactionId} className="border-b border-outline-variant/10">
                    <td className="py-3 px-2">{tx.transactionId}</td>
                    <td className="py-3 px-2">{tx.senderName}</td>
                    <td className="py-3 px-2">{tx.receiverName}</td>
                    <td className="py-3 px-2">{tx.amount.toLocaleString()} FCFA</td>
                    <td className="py-3 px-2">{tx.paymentMethod}</td>
                    <td className="py-3 px-2">{tx.transactionType}</td>
                    <td className="py-3 px-2">{tx.paymentReference}</td>
                    <td className="py-3 px-2">{new Date(tx.transactionDate).toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${tx.transactionStatus === 'COMPLETED'
                          ? 'bg-green-100 text-green-700'
                          : tx.transactionStatus === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {tx.transactionStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}