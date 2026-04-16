import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const STATS = [
  ['50,000+', 'People joined'],
  ['10,000+', 'Active investors'],
  ['100+', 'Partner companies'],
];

const FEATURES = [
  { num: '01', title: 'Sync across devices', text: 'Manage your portfolio or loans from any device with real-time updates and cloud syncing.' },
  { num: '02', title: 'Clear terms, no hidden fees', text: "Transparency is our core value. What you see is exactly what you get, with zero hidden surprises." },
  { num: '03', title: 'Security by default', text: 'Bank-grade encryption and multi-factor authentication protect your assets and data.' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-on-background tracking-tighter mb-8 max-w-4xl leading-[1.1]">
          Your all-in-one platform to borrow, lend, and grow your wealth
        </h1>
        <p className="text-xl text-tertiary max-w-2xl mb-12 leading-relaxed">
          Open a free account in minutes right from your phone and make your money work harder
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {['Express Union', 'Visa', 'Mastercard', 'Stripe'].map((p) => (
            <span key={p} className="text-lg font-black tracking-widest uppercase">{p}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map(([stat, label], i) => (
            <div key={i} className="bg-surface-container-lowest p-10 rounded-xl flex flex-col items-center text-center border border-outline-variant/10 shadow-sm">
              <span className="text-4xl font-extrabold text-primary mb-2">{stat}</span>
              <span className="text-tertiary font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <h2 className="text-3xl lg:text-4xl font-bold text-on-background mb-16 text-center tracking-tight">
          The Most Trusted Peer-to-Peer Lending Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {FEATURES.map((f) => (
            <div key={f.num} className="flex flex-col items-start">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-secondary font-bold">{f.num}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-tertiary leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-container rounded-3xl p-12 lg:p-20 text-center text-white overflow-hidden mx-8 mb-24">
        <h2 className="text-3xl lg:text-5xl font-extrabold mb-8 tracking-tighter max-w-3xl mx-auto leading-tight">
          Take your first step into safe, secure lending and investing
        </h2>
        <button
          onClick={() => navigate('/signup')}
          className="bg-white text-primary px-10 py-4 rounded-xl text-lg font-bold hover:bg-surface transition-all shadow-xl"
        >
          Open a Free Account
        </button>
      </section>
    </Layout>
  );
}