import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #f5f7fa;
    --navy-mid: #eef1f6;
    --navy-light: #e4e9f2;
    --accent: #2d6ef6;
    --accent-hover: #1a57e0;
    --accent-light: rgba(45,110,246,0.08);
    --gold: #c47f00;
    --green: #0a9e5c;
    --green-bg: rgba(10,158,92,0.10);
    --red: #d92d20;
    --text-primary: #0f1b2d;
    --text-secondary: #4a607a;
    --text-muted: #8fa3be;
    --border: rgba(0,0,0,0.08);
    --card-bg: #ffffff;
    --card-border: rgba(0,0,0,0.09);
    --font: 'Sora', sans-serif;
    --mono: 'DM Mono', monospace;
  }

  body { font-family: var(--font); background: var(--navy); color: var(--text-primary); }

  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 64px;
    background: rgba(255,255,255,0.95);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(12px);
  }
  .nav-logo {
    font-size: 1.1rem; font-weight: 700; color: var(--text-primary);
    letter-spacing: -0.02em;
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--text-secondary);
    text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover, .nav-links a.active { color: var(--text-primary); }
  .nav-links a.active { border-bottom: 2px solid var(--accent); padding-bottom: 2px; }
  .btn-invest {
    background: var(--accent); color: #fff;
    border: none; padding: 0.55rem 1.25rem;
    border-radius: 8px; font-size: 0.82rem; font-weight: 600;
    font-family: var(--font); cursor: pointer; transition: background 0.2s;
    letter-spacing: 0.01em;
  }
  .btn-invest:hover { background: var(--accent-hover); }

  .page { max-width: 1100px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }

  .back-link {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.78rem; color: var(--text-secondary); text-decoration: none;
    letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500;
    margin-bottom: 1.5rem; transition: color 0.2s;
  }
  .back-link:hover { color: var(--text-primary); }

  .badge-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
  .badge {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.3rem 0.7rem; border-radius: 4px;
    background: var(--green-bg); color: var(--green); border: 1px solid rgba(18,183,106,0.25);
  }
  .ref { font-family: var(--mono); font-size: 0.78rem; color: var(--text-muted); }

  .layout { display: grid; grid-template-columns: 1fr 380px; gap: 2.5rem; align-items: start; }

  h1 {
    font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700;
    letter-spacing: -0.04em; line-height: 1.15;
    margin-bottom: 1rem; color: var(--text-primary);
  }

  .borrower-row {
    display: flex; align-items: center; gap: 0.65rem; margin-bottom: 1.25rem;
  }
  .avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, #2d6ef6, #12b76a);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
  }
  .borrower-name {
    font-size: 0.9rem; font-weight: 600; color: var(--text-primary);
    display: flex; align-items: center; gap: 0.35rem;
  }
  .verified-badge { color: var(--accent); font-size: 0.75rem; }
  .borrower-since { font-size: 0.75rem; color: var(--text-muted); margin-top: 1px; }

  .description {
    font-size: 0.88rem; line-height: 1.7; color: var(--text-secondary);
    margin-bottom: 1.75rem;
  }

  .stats-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--border); border-radius: 12px; overflow: hidden;
    margin-bottom: 1px;
  }
  .stats-grid-2 {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
    background: var(--border); border-radius: 12px; overflow: hidden;
    margin-bottom: 1.75rem;
  }
  .stat-cell {
    background: var(--card-bg); padding: 1rem 1.25rem;
  }
  .stat-label {
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;
  }
  .stat-value { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); }
  .stat-value.accent { color: var(--accent); }
  .stat-value.green { color: var(--green); }
  .risk-pill {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.75rem;
  }
  .risk-tag {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em;
    padding: 0.18rem 0.5rem; border-radius: 4px;
    background: var(--green-bg); color: var(--green);
    border: 1px solid rgba(18,183,106,0.25);
    text-transform: uppercase;
  }

  .risk-card {
    background: var(--card-bg); border: 1px solid var(--card-border);
    border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.75rem;
  }
  .risk-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 0.75rem;
  }
  .risk-title { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
  .risk-score { font-family: var(--mono); font-size: 1.5rem; font-weight: 500; color: var(--text-primary); }
  .risk-score span { font-size: 0.8rem; color: var(--text-muted); }
  .ethos-row { display: flex; align-items: flex-start; gap: 0.75rem; }
  .ethos-icon {
    width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), #6b48ff);
    display: flex; align-items: center; justify-content: center; font-size: 0.9rem;
  }
  .ethos-name { font-size: 0.82rem; font-weight: 600; margin-bottom: 0.2rem; color: var(--text-primary); }
  .ethos-desc { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.6; }

  .progress-section { margin-bottom: 0; }
  .progress-meta {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 0.5rem;
  }
  .progress-label { font-size: 0.8rem; color: var(--text-primary); font-weight: 600; }
  .progress-amount { font-size: 0.72rem; color: var(--text-muted); font-family: var(--mono); margin-top: 2px; }
  .deadline {
    font-size: 0.78rem; font-weight: 600; color: var(--gold);
    font-family: var(--mono);
  }
  .progress-bar {
    height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, var(--accent), #12b76a);
    transition: width 0.6s ease;
  }

  /* RIGHT PANEL */
  .summary-panel {
    background: var(--card-bg); border: 1px solid var(--card-border);
    border-radius: 16px; padding: 1.5rem; position: sticky; top: 80px;
  }
  .panel-title {
    font-size: 1rem; font-weight: 700; letter-spacing: -0.02em;
    margin-bottom: 1.25rem;
  }
  .cash-row {
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    border-radius: 10px; padding: 0.9rem 1rem;
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 1.25rem;
  }
  .cash-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .cash-amount { font-size: 1.05rem; font-weight: 700; font-family: var(--mono); color: var(--text-primary); margin-top: 2px; }
  .topup-btn {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-light); border: 1px solid rgba(45,110,246,0.3);
    padding: 0.35rem 0.7rem; border-radius: 6px; cursor: pointer;
    font-family: var(--font); transition: all 0.2s; flex-shrink: 0;
  }
  .topup-btn:hover { background: rgba(45,110,246,0.2); }

  .input-group { margin-bottom: 1.5rem; }
  .input-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.4rem; }
  .input-wrap {
    display: flex; align-items: center;
    background: #f9fafb; border: 1px solid var(--border);
    border-radius: 10px; overflow: hidden; transition: border-color 0.2s;
  }
  .input-wrap:focus-within { border-color: var(--accent); }
  .currency-tag {
    padding: 0 0.85rem; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.05em; color: var(--text-muted);
    background: rgba(255,255,255,0.03); border-right: 1px solid var(--border);
    height: 46px; display: flex; align-items: center; flex-shrink: 0;
  }
  .amount-input {
    flex: 1; background: transparent; border: none; outline: none;
    color: var(--text-primary); font-size: 0.9rem; font-family: var(--mono);
    padding: 0 0.85rem; height: 46px;
  }
  .amount-input::placeholder { color: var(--text-muted); }

  .breakdown { margin-bottom: 1.25rem; }
  .breakdown-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.5rem 0; border-bottom: 1px solid var(--border);
    font-size: 0.82rem;
  }
  .breakdown-row:last-child { border-bottom: none; }
  .breakdown-row .label { color: var(--text-secondary); }
  .breakdown-row .val { font-family: var(--mono); font-weight: 500; color: var(--text-primary); }
  .breakdown-row .val.positive { color: var(--green); }
  .breakdown-row.total .label { font-weight: 600; color: var(--text-primary); font-size: 0.88rem; }
  .breakdown-row.total .val { font-size: 1rem; font-weight: 700; color: var(--accent); font-family: var(--mono); }

  .agree-row {
    display: flex; align-items: flex-start; gap: 0.6rem;
    margin-bottom: 1.25rem; font-size: 0.75rem; color: var(--text-muted); line-height: 1.5;
  }
  .agree-row input[type="checkbox"] { margin-top: 2px; accent-color: var(--accent); flex-shrink: 0; }
  .agree-row a { color: var(--accent); text-decoration: none; }
  .agree-row a:hover { text-decoration: underline; }

  .confirm-btn {
    width: 100%; padding: 0.9rem; border-radius: 10px;
    background: var(--accent); color: #fff; border: none;
    font-size: 0.9rem; font-weight: 700; font-family: var(--font);
    cursor: pointer; transition: background 0.2s, transform 0.1s;
    letter-spacing: 0.01em;
  }
  .confirm-btn:hover { background: var(--accent-hover); }
  .confirm-btn:active { transform: scale(0.99); }
  .secure-note {
    text-align: center; font-size: 0.65rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-muted); margin-top: 0.75rem;
  }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 3rem 2rem 1.5rem;
    margin-top: 4rem;
  }
  .footer-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 2rem; margin-bottom: 2rem;
  }
  .footer-brand h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.6rem; }
  .footer-brand p { font-size: 0.78rem; color: var(--text-muted); line-height: 1.6; max-width: 220px; }
  .footer-icons { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
  .footer-icon {
    width: 28px; height: 28px; border-radius: 6px;
    background: var(--card-bg); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; font-size: 0.8rem;
    cursor: pointer; transition: border-color 0.2s;
  }
  .footer-icon:hover { border-color: var(--accent); }
  .footer-col h4 {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem;
  }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 0.45rem; }
  .footer-col a {
    font-size: 0.8rem; color: var(--text-secondary); text-decoration: none; transition: color 0.2s;
  }
  .footer-col a:hover { color: var(--text-primary); }
  .footer-bottom {
    max-width: 1100px; margin: 0 auto;
    border-top: 1px solid var(--border); padding-top: 1.25rem;
    font-size: 0.72rem; color: var(--text-muted); text-align: center;
    letter-spacing: 0.04em;
  }

  /* HAMBURGER / MOBILE NAV */
  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--text-secondary); border-radius: 2px; transition: all 0.3s; }

  .mobile-menu {
    display: none; flex-direction: column;
    background: #ffffff; border-bottom: 1px solid var(--border);
    padding: 1rem 1.5rem;
  }
  .mobile-menu a {
    font-size: 0.82rem; font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--text-secondary); text-decoration: none;
    padding: 0.65rem 0; border-bottom: 1px solid var(--border);
    transition: color 0.2s;
  }
  .mobile-menu a:last-of-type { border-bottom: none; }
  .mobile-menu a:hover, .mobile-menu a.active { color: var(--text-primary); }
  .mobile-menu .btn-invest { margin-top: 0.75rem; width: 100%; }

  @media (max-width: 820px) {
    .nav-links { display: none; }
    .nav .btn-invest { display: none; }
    .hamburger { display: flex; }
    .mobile-menu { display: flex; }

    .layout { grid-template-columns: 1fr; }
    .summary-panel { position: static; }

    .footer-inner { grid-template-columns: 1fr 1fr; }
    .footer-brand { grid-column: 1 / -1; }

    .stats-grid { grid-template-columns: 1fr 1fr; }
    .stats-grid .stat-cell:last-child { grid-column: 1 / -1; }
  }

  @media (max-width: 500px) {
    .nav { padding: 0 1rem; }
    .page { padding: 1.5rem 1rem 3rem; }
    .stats-grid { grid-template-columns: 1fr; }
    .stats-grid .stat-cell:last-child { grid-column: auto; }
    .footer-inner { grid-template-columns: 1fr; }
    h1 { font-size: 1.7rem; }
  }
`;

export default function InvestApplication() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const principal = parseFloat(amount.replace(/,/g, "")) || 100000;
  const interest = Math.round(principal * 0.085);
  const payout = principal + interest;

  const fmt = (n) => "FCFA " + n.toLocaleString();

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo">Loan@</span>
        <ul className="nav-links">
          {["Portfolio", "Marketplace", "Insights", "Accounts"].map((l) => (
            <li key={l}>
              <a href="#" className={l === "Marketplace" ? "active" : ""}>{l}</a>
            </li>
          ))}
        </ul>
        <button className="btn-invest">Invest Now</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {["Portfolio", "Marketplace", "Insights", "Accounts"].map((l) => (
            <a href="#" key={l} className={l === "Marketplace" ? "active" : ""}>{l}</a>
          ))}
          <button className="btn-invest">Invest Now</button>
        </div>
      )}

      {/* PAGE */}
      <div className="page">
        <a href="#" className="back-link">← Back to Marketplace</a>

        <div className="layout">
          {/* LEFT */}
          <div>
            <div className="badge-row">
              <span className="badge">● Active Listing</span>
              <span className="ref">Ref: #L-892</span>
            </div>

            <h1>Small Biz Expansion</h1>

            <div className="borrower-row">
              <div className="avatar">🌿</div>
              <div>
                <div className="borrower-name">
                  Eco-Friendly Cafe
                  <span className="verified-badge" title="Verified">✓</span>
                </div>
                <div className="borrower-since">Verified Small Business since 2019</div>
              </div>
            </div>

            <p className="description">
              Funding for sustainable kitchen equipment and organic inventory expansion. Supporting the local community through zero-waste initiatives and sustainable sourcing.
            </p>

            {/* Stats row 1 */}
            <div className="stats-grid" style={{ marginBottom: "1px" }}>
              <div className="stat-cell">
                <div className="stat-label">Loan Amount</div>
                <div className="stat-value">FCFA 5,000,000</div>
              </div>
              <div className="stat-cell">
                <div className="stat-label">Interest Rate</div>
                <div className="stat-value accent">8.5% APR</div>
              </div>
              <div className="stat-cell">
                <div className="stat-label">Risk Grade</div>
                <div className="stat-value">
                  <span className="risk-pill">A <span className="risk-tag">Low Risk</span></span>
                </div>
              </div>
            </div>

            {/* Stats row 2 */}
            <div className="stats-grid-2">
              <div className="stat-cell">
                <div className="stat-label">Term</div>
                <div className="stat-value">12 Months</div>
              </div>
              <div className="stat-cell">
                <div className="stat-label">Frequency</div>
                <div className="stat-value">Monthly</div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="risk-card">
              <div className="risk-header">
                <span className="risk-title">Risk Assessment</span>
                <span className="risk-score">92 <span>/ 100</span></span>
              </div>
              <div className="ethos-row">
                <div className="ethos-icon">🛡</div>
                <div>
                  <div className="ethos-name">Ethos Risk Score</div>
                  <div className="ethos-desc">
                    Strong credit history with zero defaults in the last 24 months. Fully collateral-backed by existing kitchen infrastructure assets and business inventory.
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="progress-section">
              <div className="progress-meta">
                <div>
                  <div className="progress-label">75% funded</div>
                  <div className="progress-amount">FCFA 3,750,000 of FCFA 5,000,000</div>
                </div>
                <span className="deadline">2 days left</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }} />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="summary-panel">
            <div className="panel-title">Investment Summary</div>

            <div className="cash-row">
              <div>
                <div className="cash-label">Available Cash</div>
                <div className="cash-amount">FCFA 450,000</div>
              </div>
              <button className="topup-btn">Top Up</button>
            </div>

            <div className="input-group">
              <div className="input-label">Investment Amount</div>
              <div className="input-wrap">
                <span className="currency-tag">FCFA</span>
                <input
                  className="amount-input"
                  type="number"
                  placeholder="e.g. 100,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="breakdown">
              <div className="breakdown-row">
                <span className="label">Total Principal</span>
                <span className="val">{fmt(principal)}</span>
              </div>
              <div className="breakdown-row">
                <span className="label">Estimated Interest (Annual)</span>
                <span className="val positive">+ {fmt(interest)}</span>
              </div>
              <div className="breakdown-row total">
                <span className="label">Total Payout</span>
                <span className="val">{fmt(payout)}</span>
              </div>
            </div>

            <div className="agree-row">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="agree">
                I agree to the <a href="#">Investment Agreement</a> and acknowledge the <a href="#">Risk Disclosure</a> guidelines.
              </label>
            </div>

            <button className="confirm-btn">Confirm Investment</button>
            <div className="secure-note">🔒 Secure Encrypted Transaction</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>Loan@</h3>
            <p>Redefining the lending landscape through security, and transparency</p>
            <div className="footer-icons">
              <div className="footer-icon">🌐</div>
              <div className="footer-icon">✓</div>
              <div className="footer-icon">⚖</div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              {["Marketplace", "Institutional", "Statistics"].map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {["About Ethos", "Careers", "Contact"].map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              {["Privacy Policy", "Risk Disclosure", "Terms of Use"].map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2024 Loan@. All Rights Reserved.</div>
      </footer>
    </>
  );
}