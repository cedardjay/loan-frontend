import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

  .signup-root {
    min-height: 100vh;
    background: #f5f4f1;
    font-family: 'DM Sans', sans-serif;
  }

  /* HEADER */
  .signup-header {
    position: fixed; top: 0; width: 100%; z-index: 50;
    border-bottom: 1px solid rgba(15,34,64,0.08);
    background: rgba(245,244,241,0.92);
    backdrop-filter: blur(12px);
    height: 72px;
  }
  .signup-header-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 32px;
    height: 100%; display: flex; justify-content: space-between; align-items: center;
    position: relative;
  }
  .signup-logo {
    font-size: 1.35rem; font-weight: 800; letter-spacing: -0.5px;
    color: #0f2240; text-decoration: none;
  }
  .signup-logo span { color: #e8622a; }
  .signup-header-center {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
  }
  .signup-header-home {
    font-size: 0.85rem; font-weight: 600; color: #5a6c7e;
    text-decoration: none; transition: color 0.2s;
  }
  .signup-header-home:hover { color: #0f2240; }
  .signup-header-login {
    font-size: 0.85rem; font-weight: 700; color: #e8622a;
    text-decoration: none; transition: opacity 0.2s;
  }
  .signup-header-login:hover { opacity: 0.75; }

  /* MAIN */
  .signup-main {
    min-height: 100vh;
    padding: 108px 24px 60px;
    display: flex; align-items: flex-start; justify-content: center;
  }
  .signup-grid {
    max-width: 1080px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: start;
  }

  /* LEFT PANEL */
  .signup-left { display: flex; flex-direction: column; gap: 32px; padding-top: 12px; }
  .signup-left-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #e8622a; margin-bottom: 10px;
  }
  .signup-left-title {
    font-size: 2.75rem; font-weight: 800; color: #0f2240;
    letter-spacing: -1px; line-height: 1.1; margin: 0 0 12px;
  }
  .signup-left-sub {
    font-size: 1rem; color: #7a8c9e; font-weight: 500; margin: 0;
  }
  .signup-perks { display: flex; flex-direction: column; gap: 16px; }
  .signup-perk {
    display: flex; align-items: flex-start; gap: 14px;
  }
  .perk-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: #fff; border: 1px solid rgba(15,34,64,0.1);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; box-shadow: 0 2px 8px rgba(15,34,64,0.06);
  }
  .perk-icon svg { color: #0f2240; }
  .perk-text-title { font-size: 0.9rem; font-weight: 700; color: #0f2240; margin-bottom: 2px; }
  .perk-text-sub { font-size: 0.78rem; color: #7a8c9e; }

  /* TRUST STRIP */
  .trust-strip {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 8px;
  }
  .trust-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #fff; border: 1px solid rgba(15,34,64,0.1);
    padding: 6px 12px; border-radius: 20px;
    font-size: 0.7rem; font-weight: 700; color: #0f2240;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #2ecc8a; display: inline-block; }

  /* RIGHT — CARD */
  .signup-card {
    background: #fff;
    border: 1px solid rgba(15,34,64,0.1);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(15,34,64,0.07);
  }
  .signup-card-title {
    font-size: 1.6rem; font-weight: 800; color: #0f2240;
    letter-spacing: -0.5px; margin: 0 0 4px;
  }
  .signup-card-sub {
    font-size: 0.85rem; color: #7a8c9e; margin: 0 0 28px;
  }

  /* MESSAGES */
  .signup-error {
    background: #fff0eb; border: 1px solid #f5c6b0;
    border-radius: 8px; padding: 10px 14px;
    font-size: 0.82rem; color: #c0431a; font-weight: 600;
    margin-bottom: 20px;
  }
  .signup-success {
    background: #e6f9f1; border: 1px solid #a8dfc4;
    border-radius: 8px; padding: 10px 14px;
    font-size: 0.82rem; color: #1a7a50; font-weight: 600;
    margin-bottom: 20px;
  }

  /* FORM */
  .signup-form { display: flex; flex-direction: column; gap: 18px; }
  .signup-field { display: flex; flex-direction: column; gap: 7px; }
  .signup-label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: #5a6c7e;
  }
  .signup-input {
    width: 100%; padding: 12px 16px;
    background: #f9f8f6; border: 1px solid rgba(15,34,64,0.12);
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; color: #0f2240;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box; outline: none;
  }
  .signup-input::placeholder { color: #b0bcc8; }
  .signup-input:focus {
    border-color: #0f2240;
    box-shadow: 0 0 0 3px rgba(15,34,64,0.07);
    background: #fff;
  }
  .signup-hint { font-size: 0.72rem; color: #a0acb8; margin-top: 2px; }

  /* PHONE INPUT OVERRIDE */
  .signup-phone-wrap .PhoneInput {
    display: flex; gap: 10px; align-items: center;
  }
  .signup-phone-wrap .PhoneInputCountry {
    background: #f9f8f6; border: 1px solid rgba(15,34,64,0.12);
    border-radius: 10px; padding: 0 12px; height: 46px;
    display: flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #0f2240;
  }
  .signup-phone-wrap .PhoneInputCountrySelect { background: transparent; border: none; outline: none; cursor: pointer; }
  .signup-phone-wrap .PhoneInputInput {
    flex: 1; padding: 12px 16px;
    background: #f9f8f6; border: 1px solid rgba(15,34,64,0.12);
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; color: #0f2240; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .signup-phone-wrap .PhoneInputInput::placeholder { color: #b0bcc8; }
  .signup-phone-wrap .PhoneInputInput:focus {
    border-color: #0f2240;
    box-shadow: 0 0 0 3px rgba(15,34,64,0.07);
    background: #fff;
  }

  /* PASSWORD WRAP */
  .signup-pw-wrap { position: relative; }
  .signup-pw-wrap .signup-input { padding-right: 44px; }
  .signup-pw-toggle {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: #a0acb8;
    padding: 0; display: flex; align-items: center; transition: color 0.2s;
  }
  .signup-pw-toggle:hover { color: #0f2240; }

  /* TERMS */
  .signup-terms { display: flex; align-items: flex-start; gap: 10px; }
  .signup-checkbox {
    width: 18px; height: 18px; border-radius: 5px; flex-shrink: 0; margin-top: 2px;
    border: 1.5px solid rgba(15,34,64,0.25); cursor: pointer; accent-color: #0f2240;
  }
  .signup-terms-text { font-size: 0.82rem; color: #7a8c9e; line-height: 1.55; }
  .signup-terms-text a { color: #e8622a; font-weight: 700; text-decoration: none; }
  .signup-terms-text a:hover { opacity: 0.8; }

  /* SUBMIT */
  .signup-submit {
    width: 100%; padding: 14px;
    background: #0f2240; color: #fff; border: none;
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 800; letter-spacing: 0.3px;
    cursor: pointer; margin-top: 4px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(15,34,64,0.18);
  }
  .signup-submit:hover {
    background: #1a3560;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(15,34,64,0.25);
  }
  .signup-submit:active { transform: translateY(1px); }

  /* DIVIDER */
  .signup-divider {
    display: flex; align-items: center; gap: 12px; margin: 4px 0;
  }
  .signup-divider-line { flex: 1; height: 1px; background: rgba(15,34,64,0.08); }
  .signup-divider-text { font-size: 0.68rem; font-weight: 700; color: #aab5bf; letter-spacing: 1px; text-transform: uppercase; }

  /* SOCIAL BUTTONS */
  .signup-social-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .signup-social-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 46px; border-radius: 10px;
    border: 1px solid rgba(15,34,64,0.12);
    background: #f9f8f6; font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem; font-weight: 700; color: #0f2240;
    cursor: pointer; transition: background 0.2s, transform 0.15s;
  }
  .signup-social-btn:hover { background: #f0eeea; transform: translateY(-1px); }
  .signup-social-btn:active { transform: translateY(1px); }
  .social-icon { width: 18px; height: 18px; }

  /* FOOTER */
  .signup-card-footer {
    text-align: center; margin-top: 20px;
    font-size: 0.85rem; color: #7a8c9e;
  }
  .signup-card-footer a {
    color: #e8622a; font-weight: 700; text-decoration: none; transition: opacity 0.2s;
  }
  .signup-card-footer a:hover { opacity: 0.8; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .signup-grid { grid-template-columns: 1fr; gap: 32px; }
    .signup-left { order: 2; padding-top: 0; }
    .signup-card { order: 1; }
    .signup-left-title { font-size: 2rem; }
  }
  @media (max-width: 480px) {
    .signup-card { padding: 28px 22px; }
    .signup-social-row { grid-template-columns: 1fr; }
  }
`;

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', phoneNumber: '', password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber } = formData;
    return !!(name && email && password && phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Please fill all the fields.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    try {
      const response = await AuthService.registerUser(formData);
      if (response.statusCode === 200) {
        setSuccessMessage('User registered successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
        try {
          const loginResponse = await AuthService.loginUser({
            email: formData.email,
            password: formData.password
          });
          if (loginResponse.statusCode === 200) {
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('role', loginResponse.role);
            navigate('/verify', { replace: true });
          }
        } catch (error) {
          setErrorMessage(error.response?.data?.message || error.message);
          setTimeout(() => setErrorMessage(''), 5000);
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <div className="signup-root">
      <style>{styles}</style>

      {/* HEADER */}
      <header className="signup-header">
        <div className="signup-header-inner">
          <Link to="/" className="signup-logo">loan<span>@</span></Link>
          <div className="signup-header-center">
            <Link to="/" className="signup-header-home">Home</Link>
          </div>
          <Link to="/login" className="signup-header-login">Login</Link>
        </div>
      </header>

      <main className="signup-main">
        <div className="signup-grid">

          {/* LEFT — VALUE PROP */}
          <div className="signup-left">
            <div>
              <div className="signup-left-eyebrow">Free to join</div>
              <h1 className="signup-left-title">Create your free account</h1>
              <p className="signup-left-sub">Start borrowing, investing — one account.</p>
            </div>

            <div className="signup-perks">
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                  title: "No hidden fees — ever",
                  sub: "Transparent rates, no surprises."
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  title: "Bank-grade encryption",
                  sub: "Your data is secured end-to-end."
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                  title: "2-minute signup",
                  sub: "Get started in seconds."
                },
              ].map(({ icon, title, sub }) => (
                <div className="signup-perk" key={title}>
                  <div className="perk-icon">{icon}</div>
                  <div>
                    <div className="perk-text-title">{title}</div>
                    <div className="perk-text-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="trust-strip">
              <div className="trust-badge"><span className="trust-dot" /> SSL Secured</div>
              <div className="trust-badge"><span className="trust-dot" /> Verified Platform</div>
            </div>
          </div>

          {/* RIGHT — FORM CARD */}
          <div className="signup-card">
            <h2 className="signup-card-title">Sign Up</h2>
            <p className="signup-card-sub">It's free and takes less than 2 minutes.</p>

            {errorMessage && <div className="signup-error">{errorMessage}</div>}
            {successMessage && <div className="signup-success">{successMessage}</div>}

            <form className="signup-form" onSubmit={handleSubmit}>

              <div className="signup-field">
                <label className="signup-label">USER NAME</label>
                <input className="signup-input" name="name" type="text"
                  placeholder="John Smith" required
                  value={formData.name} onChange={handleInputChange} />
              </div>

              <div className="signup-field">
                <label className="signup-label">Email address</label>
                <input className="signup-input" name="email" type="email"
                  placeholder="john@example.com" required
                  value={formData.email} onChange={handleInputChange} />
                <span className="signup-hint">We'll send verification and account updates here.</span>
              </div>

              <div className="signup-field">
                <label className="signup-label">Phone number</label>
                <div className="signup-phone-wrap">
                  <PhoneInput
                    international
                    defaultCountry="CM"
                    value={formData.phoneNumber}
                    onChange={(value) =>
                      handleInputChange({ target: { name: 'phoneNumber', value: value || '' } })
                    }
                    placeholder="+237 657 890 690"
                    required
                  />
                </div>
              </div>

              <div className="signup-field">
                <label className="signup-label">Create a password</label>
                <div className="signup-pw-wrap">
                  <input className="signup-input" name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••" required
                    value={formData.password} onChange={handleInputChange} />
                  <button type="button" className="signup-pw-toggle"
                    onClick={() => setShowPassword(p => !p)}>
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <div className="signup-terms">
                <input className="signup-checkbox" id="terms" type="checkbox" required />
                <label className="signup-terms-text" htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" className="signup-submit">
                Create Free Account
              </button>

              <div className="signup-divider">
                <div className="signup-divider-line" />
                <span className="signup-divider-text">Or join with</span>
                <div className="signup-divider-line" />
              </div>

              <div className="signup-social-row">
                <button type="button" className="signup-social-btn">
                  <img className="social-icon"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIG-hJSgbiAnx-Ulz-lZRDTtlJ19DiOFq4HPvJRVKbMzO5Tx5IuYdYdJDxmUhOe88br2eyOQHg-ax_etZh7zcJokmwbsE63ppmGgQOtAVcdludgIToOmPYAXSVef0lRfW_RDaSMTCbD-359uNX06sdeR5XaUeZCONkcXoMwqPoskyKdvhfjavU87G64Eom4l9rnD6pKp71Vk5MiKAUu9TcZ6ztEDhNQl8MXU6Qo1gquxEeVFGWgNft0lGFB4_RklkPn1TBlphCTQk"
                    alt="Google" />
                  Google
                </button>
                <button type="button" className="signup-social-btn">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Apple
                </button>
              </div>

            </form>

            <div className="signup-card-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}