import React from 'react';
import Layout from '../components/Layout';

const INVESTMENTS = [
  { name: 'Sarah Miller', amount: '1,200,000 FCFA', rate: '8.5%', status: 'On Time', dot: 'bg-[#2E6B3E]' },
  { name: 'Robert K.', amount: '850,000 FCFA', rate: '10.2%', status: 'Late', dot: 'bg-[#C26A6A]' },
];

export default function InvestorDashboard() {
  return (
    <Layout navType="user">
      <main className="pt-32 pb-16 px-8 max-w-7xl mx-auto space-y-8">
        <div className="bg-secondary-container/30 border border-secondary/10 rounded-xl px-6 py-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="text-on-secondary-container font-semibold">Investing: Approved</span>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-surface-container-lowest border border-[#D1C7B8]/40 rounded-xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-outline">Portfolio Overview</p>
              <div className="flex flex-wrap gap-12">
                <div>
                  <p className="text-tertiary text-sm">Total Invested</p>
                  <h2 className="text-4xl font-extrabold text-[#1E2A3E]">5,000,000 FCFA</h2>
                </div>
                <div>
                  <p className="text-tertiary text-sm">Total Earned</p>
                  <h2 className="text-4xl font-extrabold text-[#2E6B3E]">+320,000 FCFA</h2>
                </div>
              </div>
            </div>
            <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/10">
              Lend Money
            </button>
          </div>

          <div className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-between">
            <div>
              <p className="text-on-primary/60 text-sm mb-1 uppercase">Growth Forecast</p>
              <h3 className="text-2xl font-bold">+8.4% APY</h3>
            </div>
            <p className="mt-4 text-sm text-on-primary/80">
              Your portfolio is outperforming market average by 2.1%.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-extrabold">Active Investments</h3>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50">
                <tr>
                  {['Borrower', 'Amount Lent', 'Rate', 'Status'].map((h) => (
                    <th key={h} className="px-6 py-4 text-xs font-bold uppercase text-outline">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {INVESTMENTS.map((inv) => (
                  <tr key={inv.name} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-5 font-semibold">{inv.name}</td>
                    <td className="px-6 py-5">{inv.amount}</td>
                    <td className="px-6 py-5">{inv.rate}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${inv.dot}`} />
                        {inv.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </Layout>
  );
}