import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  background: #f4f6f9;
  color: #0e2140;
}

:root {
  --navy: #0e2140;
  --navy-2: #163059;
  --green: #00a878;
  --green-light: #e6f7f3;
  --border: #dde3ef;
  --muted: #7a8aaa;
  --bg: #f4f6f9;
  --white: #ffffff;
  --shadow: 0 4px 20px rgba(0,0,0,0.06);
  --radius: 16px;
}

.loan-details-page {
  min-height: 100vh;
  padding: 30px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.back-btn {
  background: white;
  border: 1px solid var(--border);
  color: var(--navy);
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.back-btn:hover {
  background: var(--navy);
  color: white;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.page-sub {
  color: var(--muted);
  font-size: 0.92rem;
}

.details-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 22px;
}

.card {
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 24px;
  box-shadow: var(--shadow);
}

.loan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}

.loan-id {
  font-size: 0.78rem;
  color: var(--muted);
  margin-bottom: 5px;
}

.loan-name {
  font-size: 1.8rem;
  font-weight: 700;
}

.status-pill {
  padding: 8px 14px;
  border-radius: 30px;
  font-size: 0.78rem;
  font-weight: 700;
  background: var(--green-light);
  color: var(--green);
}

.loan-description {
  color: #42526b;
  line-height: 1.7;
  margin-bottom: 24px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.metric-box {
  background: #f8fafc;
  border-radius: 14px;
  padding: 18px;
  border: 1px solid var(--border);
}

.metric-label {
  font-size: 0.72rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  font-weight: 700;
}

.metric-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--navy);
}

.progress-section {
  margin-top: 28px;
}

.progress-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-bar {
  height: 10px;
  width: 100%;
  background: #e5e9f2;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--green);
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.side-card-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 18px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.info-row:last-child {
  border-bottom: none;
}

.info-key {
  color: var(--muted);
  font-size: 0.9rem;
}

.info-value {
  font-weight: 700;
}

.invest-btn {
  width: 100%;
  margin-top: 22px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: var(--navy);
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.invest-btn:hover {
  background: var(--navy-2);
}

.loading,
.error {
  text-align: center;
  margin-top: 80px;
  font-size: 1rem;
}

.error {
  color: crimson;
}

@media (max-width: 900px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .loan-details-page {
    padding: 18px;
  }
}
`;

export default function LoanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLoan();
  }, []);

  async function fetchLoan() {
    try {
      setLoading(true);
      setError("");

      const response = await ApiService.getMarketplaceLoans();

      const foundLoan = response.loanrequestlist.find(
        (item) => String(item.requestId) === String(id)
      );

      if (!foundLoan) {
        setError("Loan not found.");
      } else {
        setLoan(foundLoan);
      }
    } catch (err) {
      setError("Failed to load loan details.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="loading">Loading loan details...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{css}</style>
        <div className="error">{error}</div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      <div className="loan-details-page">
        <div className="top-bar">
          <div>
            <div className="page-title">Loan Details</div>
            <div className="page-sub">
              Detailed marketplace investment overview
            </div>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <div className="details-grid">
          {/* MAIN CONTENT */}
          <div className="card">
            <div className="loan-header">
              <div>
                <div className="loan-id">
                  Loan ID: #{loan.requestId}
                </div>

                <div className="loan-name">
                  {loan.borrowerName}
                </div>
              </div>

              <div className="status-pill">
                {loan.status?.replace("_", " ")}
              </div>
            </div>

            <div className="loan-description">
              {loan.description || loan.purpose}
            </div>

            <div className="metrics-grid">
              <div className="metric-box">
                <div className="metric-label">
                  Requested Amount
                </div>

                <div className="metric-value">
                  $
                  {Number(
                    loan.requestedAmount
                  ).toLocaleString()}
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
                  Loan Term
                </div>

                <div className="metric-value">
                  {loan.termMonths} Months
                </div>
              </div>

              <div className="metric-box">
                <div className="metric-label">
                  Remaining Amount
                </div>

                <div className="metric-value">
                  $
                  {Number(
                    loan.remainingAmount
                  ).toLocaleString()}
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
                  )}% Funded
                </span>

                <span>
                  $
                  {Number(
                    loan.amountFunded || 0
                  ).toLocaleString()}{" "}
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

          {/* SIDEBAR */}
          <div className="card">
            <div className="side-card-title">
              Investment Summary
            </div>

            <div className="info-row">
              <span className="info-key">
                Borrower
              </span>

              <span className="info-value">
                {loan.borrowerName}
              </span>
            </div>

            <div className="info-row">
              <span className="info-key">
                Purpose
              </span>

              <span className="info-value">
                {loan.purpose || "General"}
              </span>
            </div>

            <div className="info-row">
              <span className="info-key">
                Loan State
              </span>

              <span className="info-value">
                {loan.state}
              </span>
            </div>

            <div className="info-row">
              <span className="info-key">
                Funding Progress
              </span>

              <span className="info-value">
                {Math.round(
                  loan.fundingPercentage
                )}
                %
              </span>
            </div>

            <button
              className="invest-btn"
              onClick={() =>
                navigate(
                  `/invest/${loan.requestId}/`
                )
              }
            >
              Invest In This Loan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}