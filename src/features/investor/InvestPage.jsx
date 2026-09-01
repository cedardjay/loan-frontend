import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InvestService from "./InvestService";
import ApiService from "../../service/ApiService"

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  --bg:#f4f7fb;
  --surface:#ffffff;
  --navy:#0e2140;
  --navy-2:#163059;
  --green:#00a878;
  --green-light:#e6f7f3;
  --red:#e8314a;
  --border:#dde3ef;
  --muted:#7a8aaa;
  --text:#0e2140;
  --radius:16px;
  --shadow:0 4px 20px rgba(0,0,0,.06);
}

body{
  font-family:'DM Sans',sans-serif;
  background:var(--bg);
  color:var(--text);
}

.page{
  min-height:100vh;
  padding:32px;
}

.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:30px;
}

.title{
  font-size:2rem;
  font-weight:700;
  color:var(--navy);
}

.subtitle{
  color:var(--muted);
  margin-top:5px;
  font-size:.92rem;
}

.back-btn{
  padding:11px 18px;
  border-radius:10px;
  border:1px solid var(--border);
  background:#fff;
  cursor:pointer;
  font-weight:600;
  transition:.2s;
}

.back-btn:hover{
  background:var(--navy);
  color:#fff;
}

.grid{
  display:grid;
  grid-template-columns:2fr 1fr;
  gap:22px;
}

.card{
  background:var(--surface);
  border-radius:var(--radius);
  border:1px solid var(--border);
  padding:24px;
  box-shadow:var(--shadow);
}

.loan-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-bottom:18px;
}

.loan-id{
  font-size:.75rem;
  color:var(--muted);
  margin-bottom:6px;
}

.loan-name{
  font-size:1.7rem;
  font-weight:700;
  color:var(--navy);
}

.status{
  background:var(--green-light);
  color:var(--green);
  padding:8px 14px;
  border-radius:999px;
  font-size:.75rem;
  font-weight:700;
}

.loan-description{
  line-height:1.7;
  color:#44516a;
  margin-bottom:28px;
}

.metrics{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:16px;
}

.metric-box{
  background:#f8fafc;
  border:1px solid var(--border);
  border-radius:14px;
  padding:18px;
}

.metric-label{
  font-size:.7rem;
  color:var(--muted);
  text-transform:uppercase;
  letter-spacing:.08em;
  margin-bottom:8px;
  font-weight:700;
}

.metric-value{
  font-size:1.35rem;
  font-weight:700;
}

.progress-section{
  margin-top:30px;
}

.progress-top{
  display:flex;
  justify-content:space-between;
  margin-bottom:8px;
  font-size:.9rem;
  font-weight:600;
}

.progress-bar{
  height:10px;
  background:#e4e9f1;
  border-radius:999px;
  overflow:hidden;
}

.progress-fill{
  height:100%;
  background:var(--green);
}

.section-title{
  font-size:1rem;
  font-weight:700;
  margin-bottom:16px;
}

.form-group{
  margin-bottom:20px;
}

.form-label{
  display:block;
  margin-bottom:8px;
  font-size:.85rem;
  font-weight:600;
  color:var(--navy);
}

.input{
  width:100%;
  padding:14px;
  border-radius:12px;
  border:1px solid var(--border);
  font-size:1rem;
  outline:none;
}

.input:focus{
  border-color:var(--navy);
}

.summary-row{
  display:flex;
  justify-content:space-between;
  padding:12px 0;
  border-bottom:1px solid var(--border);
}

.summary-row:last-child{
  border-bottom:none;
}

.summary-key{
  color:var(--muted);
}

.summary-value{
  font-weight:700;
}

.invest-btn{
  width:100%;
  padding:15px;
  border:none;
  border-radius:12px;
  background:var(--navy);
  color:#fff;
  font-size:1rem;
  font-weight:700;
  cursor:pointer;
  transition:.2s;
  margin-top:24px;
}

.invest-btn:hover{
  background:var(--navy-2);
}

.success-box{
  margin-top:18px;
  padding:14px;
  background:var(--green-light);
  border-radius:12px;
  color:var(--green);
  font-weight:600;
}

.error-box{
  margin-top:18px;
  padding:14px;
  background:#ffe9ed;
  border-radius:12px;
  color:var(--red);
  font-weight:600;
}

.loading{
  text-align:center;
  padding:80px;
}

@media(max-width:900px){
  .grid{
    grid-template-columns:1fr;
  }

  .metrics{
    grid-template-columns:1fr;
  }

  .page{
    padding:18px;
  }

  .topbar{
    flex-direction:column;
    align-items:flex-start;
    gap:14px;
  }
}
`;

export default function InvestPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLoan();
  }, []);

  async function fetchLoan() {
    try {
      setLoading(true);

      const response = await ApiService.getMarketplaceLoans();

      const foundLoan = response.find(
        (item) => String(item.requestId) === String(id)
      );

      setLoan(foundLoan);
    } catch (err) {
      console.log(err);
      setError("Failed to load loan.");
    } finally {
      setLoading(false);
    }
  }

  async function handleInvest(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid investment amount.");
      return;
    }

    try {
      setSubmitting(true);

      // API CALL
      await InvestService.investInLoan(id, amount);

      setMessage(
        `Successfully invested $${Number(amount).toLocaleString()} in this loan.`
      );

      const invested = Number(amount);

      setLoan((prev) => {
        const newAmountFunded = (prev.amountFunded || 0) + invested;
        const newRemaining = prev.requestedAmount - newAmountFunded;
        const newPercentage = (newAmountFunded / prev.requestedAmount) * 100;

        return {
          ...prev,
          amountFunded: newAmountFunded,
          remainingAmount: newRemaining,
          fundingPercentage: newPercentage,
          status: newRemaining === 0 ? "FULLY_FUNDED" : "PARTIALLY_FUNDED"
        };
      });

      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Investment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="loading">Loading investment page...</div>
      </>
    );
  }

  if (!loan) {
    return (
      <>
        <style>{css}</style>
        <div className="loading">Loan not found.</div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      <div className="page">
        <div className="topbar">
          <div>
            <div className="title">
              Invest In Loan
            </div>

            <div className="subtitle">
              Review the opportunity and invest securely
            </div>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <div className="grid">
          {/* LEFT */}
          <div className="card">
            <div className="loan-header">
              <div>
                <div className="loan-id">
                  LOAN #{loan.requestId}
                </div>

                <div className="loan-name">
                  {loan.borrowerName}
                </div>
              </div>

              <div className="status">
                {loan.status?.replace("_", " ")}
              </div>
            </div>

            <div className="loan-description">
              {loan.description || loan.purpose}
            </div>

            <div className="metrics">
              <div className="metric-box">
                <div className="metric-label">
                  Requested Amount
                </div>

                <div className="metric-value">
                  
                  {Number(
                    loan.requestedAmount
                  ).toLocaleString()} fcfa
                </div>
              </div>

              <div className="metric-box">
                <div className="metric-label">
                  Interest Rate
                </div>

                <div className="metric-value">
                  {loan.interestRate}%
                </div>
              </div>

              <div className="metric-box">
                <div className="metric-label">
                  Remaining Amount
                </div>

                <div className="metric-value">
                  
                  {Number(
                    loan.remainingAmount
                  ).toLocaleString()} fcfa
                </div>
              </div>

              <div className="metric-box">
                <div className="metric-label">
                  Loan Term
                </div>

                <div className="metric-value">
                  {loan.termMonths} Months
                </div>
              </div>
            </div>

            <div className="progress-section">
              <div className="section-title">
                Funding Progress
              </div>

              <div className="progress-top">
                <span>
                  {Math.round(
                    loan.fundingPercentage
                  )}
                  % Funded
                </span>

                <span>
                  
                  {Number(
                    loan.amountFunded || 0
                  ).toLocaleString()}{" "} fcfa
                  funded
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${loan.fundingPercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="card">
            <div className="section-title">
              Investment Form
            </div>

            <form onSubmit={handleInvest}>
              <div className="form-group">
                <label className="form-label">
                  Investment Amount (fcfa)
                </label>

                <input
                  type="number"
                  className="input"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                />
              </div>

              <div className="summary-row">
                <span className="summary-key">
                  Expected APR
                </span>

                <span className="summary-value">
                  {loan.interestRate}%
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-key">
                  Duration
                </span>

                <span className="summary-value">
                  {loan.termMonths} months
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-key">
                  Remaining Capacity
                </span>

                <span className="summary-value">
                  
                  {Number(
                    loan.remainingAmount
                  ).toLocaleString()} fcfa
                </span>
              </div>

              <button
                type="submit"
                className="invest-btn"
                disabled={submitting}
              >
                {submitting
                  ? "Processing Investment..."
                  : "Confirm Investment"}
              </button>

              {message && (
                <div className="success-box">
                  {message}
                </div>
              )}

              {error && (
                <div className="error-box">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}