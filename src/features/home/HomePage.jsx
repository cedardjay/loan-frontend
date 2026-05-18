import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --navy: #0f2240;
    --navy-light: #1a3560;
    --accent: #e8622a;
    --accent-hover: #d4551f;
    --bg: #f0f3f8;
    --card: #ffffff;
    --text: #0f2240;
    --muted: #7a8aaa;
    --border: #dde3ef;
    --green: #2eb87e;
  }

  .hp-wrap {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  /* ── HERO ── */
  .hp-hero {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 32px 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .hp-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid var(--border);
    border-radius: 20px; padding: 6px 16px;
    font-size: 0.75rem; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 28px;
  }
  .hp-eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
  .hp-h1 {
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    font-weight: 800; line-height: 1.08;
    letter-spacing: -2px; color: var(--navy);
    margin-bottom: 24px;
  }
  .hp-h1 em { font-style: normal; color: var(--accent); }
  .hp-lead {
    font-size: 1.1rem; color: var(--muted); max-width: 540px;
    line-height: 1.7; margin-bottom: 40px;
  }
  .hp-cta-row { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 56px; }
  .hp-btn-primary {
    background: var(--accent); color: #fff; border: none;
    border-radius: 10px; padding: 14px 32px;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(232,98,42,0.25);
  }
  .hp-btn-primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(232,98,42,0.3); }
  .hp-btn-secondary {
    background: #fff; color: var(--navy); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 14px 32px;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .hp-btn-secondary:hover { border-color: var(--navy); background: var(--bg); }

  .hp-partners {
    display: flex; flex-wrap: wrap; justify-content: center; align-items: center;
    gap: 32px; opacity: 0.35; transition: opacity 0.4s;
  }
  .hp-partners:hover { opacity: 0.75; }
  .hp-partner-name {
    font-size: 0.75rem; font-weight: 800; letter-spacing: 2px;
    text-transform: uppercase; color: var(--navy);
    font-family: 'DM Mono', monospace;
  }
  .hp-partner-divider { width: 1px; height: 16px; background: var(--border); }

  /* ── STATS ── */
  .hp-stats { max-width: 860px; margin: 0 auto; padding: 0 32px 72px; }
  .hp-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .hp-stat-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 32px 24px;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    box-shadow: 0 1px 4px rgba(15,34,64,0.05);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .hp-stat-card:hover { box-shadow: 0 6px 20px rgba(15,34,64,0.08); transform: translateY(-2px); }
  .hp-stat-value {
    font-size: 2.2rem; font-weight: 800; color: var(--navy);
    letter-spacing: -1px; font-family: 'DM Mono', monospace; margin-bottom: 6px;
  }
  .hp-stat-value span { color: var(--accent); }
  .hp-stat-label { font-size: 0.82rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }

  /* ── FEATURES ── */
  .hp-features { max-width: 1000px; margin: 0 auto; padding: 0 32px 80px; }
  .hp-section-label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--muted); text-align: center; margin-bottom: 12px;
  }
  .hp-section-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800;
    color: var(--navy); letter-spacing: -1px; text-align: center; margin-bottom: 56px;
  }
  .hp-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .hp-feature-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 28px 24px;
    box-shadow: 0 1px 4px rgba(15,34,64,0.05);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .hp-feature-card:hover { box-shadow: 0 6px 20px rgba(15,34,64,0.08); transform: translateY(-2px); }
  .hp-feature-num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--bg); border: 1px solid var(--border);
    font-family: 'DM Mono', monospace; font-size: 0.78rem; font-weight: 700;
    color: var(--accent); margin-bottom: 18px;
  }
  .hp-feature-title { font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
  .hp-feature-text { font-size: 0.84rem; color: var(--muted); line-height: 1.65; }

  /* ── CTA BANNER ── */
  .hp-cta-wrap { padding: 0 32px 80px; }
  .hp-cta-banner {
    background: var(--navy);
    border-radius: 20px; padding: 64px 48px;
    text-align: center; position: relative; overflow: hidden;
  }
  .hp-cta-blob1 {
    position: absolute; top: -60px; right: -60px;
    width: 240px; height: 240px; border-radius: 50%;
    background: rgba(232,98,42,0.12); pointer-events: none;
  }
  .hp-cta-blob2 {
    position: absolute; bottom: -80px; left: -40px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.04); pointer-events: none;
  }
  .hp-cta-tag {
    display: inline-block; background: rgba(232,98,42,0.2); color: var(--accent);
    border-radius: 20px; padding: 5px 14px;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    margin-bottom: 20px; position: relative; z-index: 1;
  }
  .hp-cta-title {
    font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 800;
    color: #fff; letter-spacing: -1px; line-height: 1.15;
    max-width: 600px; margin: 0 auto 32px; position: relative; z-index: 1;
  }
  .hp-cta-btn {
    background: var(--accent); color: #fff; border: none;
    border-radius: 10px; padding: 15px 36px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700;
    cursor: pointer; transition: all 0.2s; position: relative; z-index: 1;
    box-shadow: 0 4px 16px rgba(232,98,42,0.3);
  }
  .hp-cta-btn:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,98,42,0.4); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .hp-hero { padding: 56px 20px 48px; }
    .hp-stats { padding: 0 20px 56px; }
    .hp-stats-grid { grid-template-columns: 1fr; gap: 12px; }
    .hp-features { padding: 0 20px 64px; }
    .hp-features-grid { grid-template-columns: 1fr; }
    .hp-cta-wrap { padding: 0 20px 64px; }
    .hp-cta-banner { padding: 48px 24px; }
  }
`;

const STATS = [
  ['50,000', 'People joined'],
  ['10,000', 'Active investors'],
  ['100',    'Partner companies'],
];

const FEATURES = [
  { num: '01', title: 'Sync across devices',       text: 'Manage your portfolio or loans from any device with real-time updates and cloud syncing.' },
  { num: '02', title: 'Clear terms, no hidden fees', text: "Transparency is our core value. What you see is exactly what you get, with zero hidden surprises." },
  { num: '03', title: 'Security by default',        text: 'Bank-grade encryption and multi-factor authentication protect your assets and data.' },
];

const PARTNERS = ['Express Union', 'Visa', 'Mastercard', 'Stripe'];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <style>{styles}</style>
      <div className="hp-wrap">

        {/* ── HERO ── */}
        <section className="hp-hero">
          <div className="hp-eyebrow">
            <span className="hp-eyebrow-dot" />
            Now live in Cameroon &amp; beyond
          </div>
          <h1 className="hp-h1">
            Your all-in-one platform to<br />
            <em>borrow, lend,</em> and grow your wealth
          </h1>
          <p className="hp-lead">
            Open a free account in minutes right from your phone and make your money work harder.
          </p>
          <div className="hp-cta-row">
            <button className="hp-btn-primary" onClick={() => navigate('/signup')}>
              Open a Free Account
            </button>
            <button className="hp-btn-secondary" onClick={() => navigate('/dashboard')}>
              Explore Dashboard
            </button>
          </div>
          <div className="hp-partners">
            {PARTNERS.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && <span className="hp-partner-divider" />}
                <span className="hp-partner-name">{p}</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="hp-stats">
          <div className="hp-stats-grid">
            {STATS.map(([stat, label]) => (
              <div key={label} className="hp-stat-card">
                <div className="hp-stat-value">{stat}<span>+</span></div>
                <div className="hp-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="hp-features">
          <div className="hp-section-label">Why Loan@</div>
          <h2 className="hp-section-title">The Most Trusted Peer-to-Peer Lending Platform</h2>
          <div className="hp-features-grid">
            {FEATURES.map((f) => (
              <div key={f.num} className="hp-feature-card">
                <div className="hp-feature-num">{f.num}</div>
                <div className="hp-feature-title">{f.title}</div>
                <p className="hp-feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <div className="hp-cta-wrap">
          <div className="hp-cta-banner">
            <div className="hp-cta-blob1" />
            <div className="hp-cta-blob2" />
            <div className="hp-cta-tag">Get started today</div>
            <h2 className="hp-cta-title">
              Take your first step into safe, secure lending and investing
            </h2>
            <button className="hp-cta-btn" onClick={() => navigate('/signup')}>
              Open a Free Account
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}