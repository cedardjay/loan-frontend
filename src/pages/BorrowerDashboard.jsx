import React from 'react';
import Layout from '../components/Layout';

export default function BorrowerDashboard() {
  return (
    <Layout navType="user">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-3 py-4 px-6 bg-secondary-container/30 rounded-xl border border-secondary-container/20">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="text-secondary font-semibold">Borrowing: Approved</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
            <p className="text-xs uppercase tracking-widest text-outline mb-4">Available to Borrow</p>
            <h2 className="text-5xl font-extrabold text-[#2B5F8A] mb-8 tracking-tighter">1,500 FCFA</h2>
            <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl">
              Apply for a Loan
            </button>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold">Active Loans</h3>
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-bold">500.00 FCFA</h4>
                  <p className="text-tertiary">Personal Loan • 7.5% APR</p>
                </div>
                <span className="text-sm font-bold text-error">120 FCFA due May 1st</span>
              </div>
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden mb-8">
                <div className="h-full bg-secondary" style={{ width: '40%' }} />
              </div>
              <button className="w-full py-3 bg-[#B85C4A] text-white font-bold rounded-xl">
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}