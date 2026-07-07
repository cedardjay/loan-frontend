import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AuthService from './AuthService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

  .login-root {
    min-height: 100vh;
    background: #f5f4f1;
    font-family: 'DM Sans', sans-serif;
  }

  @keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

  /* HEADER */
  .login-header {
    position: fixed; top: 0; width: 100%; z-index: 50;
    border-bottom: 1px solid rgba(15,34,64,0.08);
    background: rgba(245,244,241,0.92);
    backdrop-filter: blur(12px);
    height: 72px;
  }
  .login-header-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 32px;
    height: 100%; display: flex; justify-content: space-between; align-items: center;
  }
  .login-logo {
    font-size: 1.35rem; font-weight: 800; letter-spacing: -0.5px;
    color: #0f2240; text-decoration: none;
  }
  .login-logo span { color: #e8622a; }
  .header-links { display: flex; align-items: center; gap: 24px; }
  .header-home-link {
    font-size: 0.85rem; font-weight: 600; color: #5a6c7e;
    text-decoration: none; transition: color 0.2s;
  }
  .header-home-link:hover { color: #0f2240; }
  .header-signup-btn {
    background: #0f2240; color: #fff; border: none;
    padding: 9px 22px; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 700;
    letter-spacing: 0.3px; cursor: pointer; text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    display: inline-block;
  }
  .header-signup-btn:hover { background: #1a3560; transform: translateY(-1px); }

  /* MAIN */
  .login-main {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 96px 24px 40px;
  }
  .login-container { width: 100%; max-width: 420px; }

  /* CARD */
  .login-card {
    background: #fff;
    border: 1px solid rgba(15,34,64,0.1);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(15,34,64,0.07);
  }

  /* CARD HEADER */
  .login-card-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #e8622a; margin-bottom: 8px;
  }
  .login-card-title {
    font-size: 1.75rem; font-weight: 800; color: #0f2240;
    letter-spacing: -0.5px; margin: 0 0 6px;
  }
  .login-card-sub {
    font-size: 0.85rem; color: #7a8c9e; margin-bottom: 32px;
  }

  /* ERROR */
  .login-error {
    background: #fff0eb; border: 1px solid #f5c6b0;
    border-radius: 8px; padding: 10px 14px;
    font-size: 0.82rem; color: #c0431a; font-weight: 600;
    margin-bottom: 20px;
  }

  /* FORM */
  .login-field { margin-bottom: 20px; }
  .login-label {
    display: block; font-size: 0.75rem; font-weight: 700;
    letter-spacing: 0.5px; text-transform: uppercase;
    color: #5a6c7e; margin-bottom: 7px;
  }
  .login-input {
    width: 100%; padding: 12px 16px;
    background: #f9f8f6; border: 1px solid rgba(15,34,64,0.12);
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; color: #0f2240;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box; outline: none;
  }
  .login-input::placeholder { color: #b0bcc8; }
  .login-input:focus {
    border-color: #0f2240;
    box-shadow: 0 0 0 3px rgba(15,34,64,0.07);
    background: #fff;
  }

  /* FORGOT */
  .login-forgot {
    display: block; text-align: right; margin-top: 6px;
    font-size: 0.78rem; font-weight: 600; color: #7a8c9e;
    text-decoration: none; transition: color 0.2s;
  }
  .login-forgot:hover { color: #0f2240; }

  /* SUBMIT */
  .login-submit {
    width: 100%; padding: 14px;
    background: #0f2240; color: #fff; border: none;
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 700; letter-spacing: 0.3px;
    cursor: pointer; margin-top: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(15,34,64,0.18);
  }
  .login-submit:hover {
    background: #1a3560;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(15,34,64,0.25);
  }
  .login-submit:active { transform: translateY(1px); }

  /* DIVIDER */
  .login-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 24px 0;
  }
  .login-divider-line { flex: 1; height: 1px; background: rgba(15,34,64,0.08); }
  .login-divider-text { font-size: 0.72rem; font-weight: 600; color: #aab5bf; letter-spacing: 0.5px; }

  /* FOOTER */
  .login-card-footer {
    text-align: center; margin-top: 24px;
    font-size: 0.85rem; color: #7a8c9e;
  }
  .login-card-footer a {
    color: #e8622a; font-weight: 700; text-decoration: none;
    transition: opacity 0.2s;
  }
  .login-card-footer a:hover { opacity: 0.8; }

  /* MEMBER BADGE (decorative) */
  .login-member-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #f0f3f7; border: 1px solid rgba(15,34,64,0.1);
    padding: 5px 12px; border-radius: 20px;
    font-size: 0.7rem; font-weight: 700; color: #0f2240;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 20px;
  }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #2ecc8a; display: inline-block; }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || '/verify';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 5000);
      return;
    }
    try {
      setLoading(true);
      const response = await AuthService.loginUser({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      
      // notify components that storage changed
      window.dispatchEvent(new Event('storage-updated'));

      const role = response.role;
      if (role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (role === 'SUPERADMIN') {
        navigate('/super-admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <style>{styles}</style>

      {/* HEADER */}
      <header className="login-header">
        <div className="login-header-inner">
          <Link to="/" className="login-logo">loan<span>@</span></Link>
          <div className="header-links">
            <Link to="/" className="header-home-link">Home</Link>
            <Link to="/signup" className="header-signup-btn">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="login-main">
        <div className="login-container">
          <div className="login-card">

            {/* Badge */}
            <div className="login-member-badge">
              <span className="badge-dot" /> Secure Login
            </div>

            {/* Title */}
            <div className="login-card-eyebrow">Member Access</div>
            <h2 className="login-card-title">Welcome back</h2>
            <p className="login-card-sub">Sign in to manage your loans and payments.</p>

            {/* Error */}
            {error && <div className="login-error">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="login-field">
                <label className="login-label">Email address</label>
                <input
                  className="login-input"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login-field">
                <label className="login-label">Password</label>
                <input
                  className="login-input"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link to="/forgot-password" className="login-forgot">Forgot password?</Link>
              </div>
              <button type="submit" className="login-submit" disabled={loading}>
                {loading
                  ? <span className="spinner" />
                  : 'Sign In'
                }
              </button>
            </form>

            <div className="login-divider">
              <div className="login-divider-line" />
              <span className="login-divider-text">OR</span>
              <div className="login-divider-line" />
            </div>

            <div className="login-card-footer">
              Don't have an account?{' '}
              <Link to="/signup">Create one</Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}