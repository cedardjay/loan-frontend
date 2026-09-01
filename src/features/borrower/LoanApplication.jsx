import { useState, useMemo } from "react";
import ApiService from "../../service/ApiService";

const ANNUAL_RATE = 0.12;

function calculateLoan(principal, months) {
  if (!principal || !months) return { monthly: 0, totalInterest: 0, totalRepayment: 0 };
  const r = ANNUAL_RATE / 12;
  const monthly =
    r === 0
      ? principal / months
      : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalRepayment = monthly * months;
  const totalInterest = totalRepayment - principal;
  return {
    monthly: Math.round(monthly),
    totalInterest: Math.round(totalInterest),
    totalRepayment: Math.round(totalRepayment),
  };
}

function fmt(n) {
  return n.toLocaleString();
}

/* ─────────────────────────────────────────────
   Shared nav styles — mirrors BorrowerDashboard
───────────────────────────────────────────── */
const navStyles = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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
    --sidebar-w: 220px;
    --gold: #e67e22;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.07);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
    --radius: 14px;
    --radius-sm: 8px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }

  /* ── APP WRAP ── */
  .app-wrap { display: flex; flex-direction: column; min-height: 100vh; }

 
  /* ── LAYOUT ── */
  .layout { display: flex; flex: 1; }

 
  /* ── MAIN ── */
  .main-content {
    flex: 1; padding: 40px 36px; overflow-x: hidden; padding-bottom: 80px;
    min-width: 0;
  }


  /* ── FORM / PAGE STYLES ── */
  .page-header { margin-bottom: 32px; }
  .page-title { font-size: 2rem; font-weight: 700; color: var(--navy); letter-spacing: -0.5px; }
  .page-subtitle { font-size: 0.9rem; color: var(--muted); margin-top: 6px; }

  .form-grid { display: grid; grid-template-columns: 1fr 320px; gap: 32px; align-items: start; }

  .form-card {
    background: #fff; border-radius: var(--radius); border: 1px solid var(--border);
    box-shadow: var(--shadow-sm); overflow: hidden;
  }
  .form-body { padding: 36px; display: flex; flex-direction: column; gap: 28px; }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field-label {
    font-size: 0.75rem; font-weight: 700; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.8px;
  }
  .field-wrap { position: relative; }
  .field-input, .field-select, .field-textarea {
    width: 100%; padding: 14px 16px; background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    font-weight: 500; color: var(--navy); transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .field-input:focus, .field-select:focus, .field-textarea:focus {
    border-color: var(--navy); box-shadow: 0 0 0 3px rgba(15,34,64,0.08);
  }
  .field-input:disabled, .field-select:disabled, .field-textarea:disabled { opacity: 0.5; cursor: not-allowed; }
  .field-suffix {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    font-size: 0.78rem; font-weight: 700; color: var(--muted); pointer-events: none;
  }
  .field-input.has-suffix { padding-right: 64px; }
  .field-select { appearance: none; cursor: pointer; padding-right: 36px; }
  .select-arrow {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: var(--muted); font-size: 0.85rem;
  }
  .field-textarea { min-height: 120px; resize: vertical; }

  .form-actions {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 8px; border-top: 1px solid var(--border);
  }
  .cancel-btn {
    background: none; border: none; font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; font-weight: 600; color: var(--muted);
    cursor: pointer; transition: color 0.2s; padding: 0;
  }
  .cancel-btn:hover { color: #c0392b; }
  .submit-btn {
    display: flex; align-items: center; gap: 8px;
    background: var(--accent); color: #fff; border: none; border-radius: 10px;
    padding: 13px 28px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 700; cursor: pointer;
    transition: all 0.2s; box-shadow: 0 4px 12px rgba(232,98,42,0.2);
  }
  .submit-btn:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(232,98,42,0.3); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .spinner {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Banners */
  .banner {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 16px 20px; border-radius: 10px; margin-bottom: 20px;
  }
  .banner-success { background: #f0faf5; border: 1px solid #a7e3c4; color: #1a6b46; }
  .banner-error   { background: #fdf2f2; border: 1px solid #f5aaaa; color: #b91c1c; }
  .banner-icon { font-size: 1.2rem; flex-shrink: 0; }
  .banner-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; }
  .banner-text  { font-size: 0.82rem; line-height: 1.5; }

  /* Trust badges */
  .trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
  .trust-card {
    background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; display: flex; gap: 14px; align-items: flex-start; box-shadow: var(--shadow-sm);
  }
  .trust-icon {
    font-size: 1.4rem; width: 44px; height: 44px; border-radius: 10px;
    background: var(--bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .trust-title { font-size: 0.88rem; font-weight: 700; color: var(--navy); }
  .trust-text  { font-size: 0.78rem; color: var(--muted); margin-top: 3px; line-height: 1.5; }

  /* Calculator */
  .calc-card {
    background: var(--navy); border-radius: var(--radius); padding: 28px;
    color: #fff; position: relative; overflow: hidden; box-shadow: var(--shadow-md);
  }
  .calc-blob {
    position: absolute; right: -48px; bottom: -48px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(255,255,255,0.04); pointer-events: none;
  }
  .calc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
  .calc-icon { font-size: 1.3rem; }
  .calc-title { font-size: 0.9rem; font-weight: 700; letter-spacing: -0.2px; }
  .calc-monthly-label {
    font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.2px; color: rgba(255,255,255,0.55); margin-bottom: 6px;
  }
  .calc-monthly-value { font-size: 2.4rem; font-weight: 800; letter-spacing: -1.5px; line-height: 1; }
  .calc-monthly-value span { font-size: 1rem; font-weight: 500; opacity: 0.7; margin-left: 4px; }
  .calc-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 20px 0; }
  .calc-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .calc-stat-label {
    font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: rgba(255,255,255,0.5); margin-bottom: 4px;
  }
  .calc-stat-value { font-size: 0.88rem; font-weight: 700; font-family: 'DM Mono', monospace; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .form-grid { grid-template-columns: 1fr; }
    .trust-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
        .main-content { padding: 20px 16px; padding-bottom: 80px; }
    .field-row { grid-template-columns: 1fr; }
    .trust-grid { grid-template-columns: 1fr; }
    .page-title { font-size: 1.5rem; }
    .bottom-nav { display: flex; }
  }
`;

/* ─────────────────────────────────────────────
   Icon component (SVG, same as BorrowerDashboard)
─



/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function LoanApplication() {
  const [amount, setAmount]           = useState("");
  const [term, setTerm]               = useState("");
  const [purpose, setPurpose]         = useState("Business Expansion");
  const [description, setDescription] = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);

  const calc = useMemo(
    () => calculateLoan(parseFloat(amount) || 500000, parseInt(term) || 12),
    [amount, term]
  );

  function validate() {
    if (!amount || parseFloat(amount) <= 0)  return "Please enter a valid loan amount.";
    if (!term   || parseInt(term)   <= 0)    return "Please enter a valid loan term (in months).";
    if (!description.trim())                 return "Please provide a loan description.";
    return null;
  }

  async function handleSubmit() {
    setError(""); setSuccess(false);
    const ve = validate();
    if (ve) { setError(ve); return; }
    if (!ApiService.isAuthenticated()) { setError("You must be logged in to submit a loan request."); return; }
    try {
      setLoading(true);
      await ApiService.requestLoan({ requestedAmount: parseFloat(amount), termMonths: parseInt(term), purpose, description });
      setSuccess(true);
      setAmount(""); setTerm(""); setPurpose("Business Expansion"); setDescription("");
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setAmount(""); setTerm(""); setPurpose("Business Expansion");
    setDescription(""); setError(""); setSuccess(false);
  }


  return (
    <>
      <style>{navStyles}</style>
      <div className="app-wrap">

        <div className="layout">

          {/* ── MAIN CONTENT ── */}
          <main className="main-content">

            <div className="page-header">
              <h1 className="page-title">Request a New Loan</h1>
              <p className="page-subtitle">Your path to secure peer-to-peer financing starts here.</p>
            </div>

            <div className="form-grid">

              {/* ── LEFT: FORM ── */}
              <div>
                {success && (
                  <div className="banner banner-success">
                    <span className="banner-icon">✅</span>
                    <div>
                      <div className="banner-title">Application Submitted!</div>
                      <div className="banner-text">Your loan request has been received. Admins will review it shortly.</div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="banner banner-error">
                    <span className="banner-icon">⚠️</span>
                    <div className="banner-text">{error}</div>
                  </div>
                )}

                <div className="form-card">
                  <div className="form-body">

                    {/* Amount + Purpose */}
                    <div className="field-row">
                      <div className="field">
                        <label className="field-label">Amount Requested (FCFA)</label>
                        <div className="field-wrap">
                          <input
                            type="number"
                            className="field-input has-suffix"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="e.g. 500,000"
                            disabled={loading}
                          />
                          <span className="field-suffix">FCFA</span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="field-label">Loan Purpose</label>
                        <div className="field-wrap">
                          <select
                            className="field-select"
                            value={purpose}
                            onChange={e => setPurpose(e.target.value)}
                            disabled={loading}
                          >
                            <option>Business Expansion</option>
                            <option>Education/Tuition</option>
                            <option>Medical Expenses</option>
                            <option>Home Improvement</option>
                            <option>Personal/Other</option>
                          </select>
                          <span className="select-arrow">▾</span>
                        </div>
                      </div>
                    </div>

                    {/* Term */}
                    <div className="field">
                      <label className="field-label">Desired Term</label>
                      <div className="field-wrap">
                        <input
                          type="number"
                          min="1"
                          className="field-input has-suffix"
                          value={term}
                          onChange={e => setTerm(e.target.value)}
                          placeholder="e.g. 12"
                          disabled={loading}
                          style={{ paddingRight: 80 }}
                        />
                        <span className="field-suffix">Months</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="field">
                      <label className="field-label">Loan Description</label>
                      <textarea
                        className="field-textarea"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Tell us more about how you plan to use this loan..."
                        disabled={loading}
                      />
                    </div>

                    {/* Actions */}
                    <div className="form-actions">
                      <button className="cancel-btn" onClick={handleCancel} disabled={loading}>
                        Cancel Request
                      </button>
                      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? <><span className="spinner" /> Submitting...</> : "Submit Application"}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Trust badges */}
                <div className="trust-grid">
                  <div className="trust-card">
                    <div className="trust-icon">🔒</div>
                    <div>
                      <div className="trust-title">Secure Application</div>
                      <div className="trust-text">Your data is encrypted using banking-grade protocols.</div>
                    </div>
                  </div>
                  <div className="trust-card">
                    <div className="trust-icon">⚡</div>
                    <div>
                      <div className="trust-title">Rapid Matching</div>
                      <div className="trust-text">Lenders typically respond to verified requests within 24 hours.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: CALCULATOR ── */}
              <div className="calc-card">
                <div className="calc-blob" />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="calc-header">
                    <span className="calc-icon">🧮</span>
                    <span className="calc-title">Loan Calculator</span>
                  </div>
                  <div className="calc-monthly-label">Estimated Monthly Payment</div>
                  <div className="calc-monthly-value">
                    {fmt(calc.monthly)} <span>FCFA</span>
                  </div>
                  <div className="calc-divider" />
                  <div className="calc-stats">
                    <div>
                      <div className="calc-stat-label">Interest Rate</div>
                      <div className="calc-stat-value">12% APR</div>
                    </div>
                    <div>
                      <div className="calc-stat-label">Total Interest</div>
                      <div className="calc-stat-value">{fmt(calc.totalInterest)}</div>
                    </div>
                    <div>
                      <div className="calc-stat-label">Total Repayment</div>
                      <div className="calc-stat-value">{fmt(calc.totalRepayment)}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>

      </div>
    </>
  );
}