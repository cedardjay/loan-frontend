import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function VerifyPage() {
  const navigate = useNavigate();

  return (
    <Layout navType="user">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-4">
            Thanks for joining loan@
          </h1>
          <p className="text-lg text-tertiary max-w-2xl leading-relaxed">
            A few quick steps and you'll be ready to borrow, invest, or both.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-8 bg-surface-container-lowest border border-[#D1C7B8] rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Account Verification</h2>
              <span className="text-sm font-semibold text-primary px-3 py-1 bg-surface-container rounded-full">
                40% Complete
              </span>
            </div>
            <div className="w-full h-2.5 bg-surface-container rounded-full mb-10 overflow-hidden">
              <div className="h-full bg-primary-container" style={{ width: '40%' }} />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-[#2E6B3E]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <div>
                  <h3 className="font-bold">Step 1: Email Verification</h3>
                  <p className="text-sm text-[#2E6B3E]">Verified</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-transparent">
                <span className="material-symbols-outlined text-outline">pending</span>
                <div className="flex-grow flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Step 2: Identity Verification</h3>
                    <p className="text-sm text-tertiary">Upload ID</p>
                  </div>
                  <button
                    onClick={() => navigate('/borrower-dashboard')}
                    className="px-5 py-2 border border-primary text-primary rounded-lg text-sm font-semibold"
                  >
                    Upload ID
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">payments</span>
              <h3 className="font-bold text-lg">Apply for loans up to 1 Million FCFA</h3>
              <p className="text-sm text-tertiary mt-2">Competitive rates, flexible terms</p>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
}