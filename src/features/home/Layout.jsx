import React from 'react';
import { Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

  .layout-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    background: #f5f4f1;
  }

  /* ─── NAV ─── */
  .pub-nav {
    position: fixed; top: 0; width: 100%; z-index: 50;
    background: rgba(245,244,241,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(15,34,64,0.08);
    height: 72px;
  }
  .pub-nav-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 32px; height: 100%;
    display: flex; justify-content: space-between; align-items: center;
  }
  .pub-nav-logo {
    font-size: 1.35rem; font-weight: 800; letter-spacing: -0.5px;
    color: #0f2240; text-decoration: none;
  }
  .pub-nav-logo span { color: #e8622a; }

  .pub-nav-links {
    display: flex; align-items: center; gap: 32px;
  }
  .pub-nav-link {
    font-size: 0.85rem; font-weight: 600; color: #7a8c9e;
    text-decoration: none; transition: color 0.2s;
    position: relative; padding-bottom: 2px;
  }
  .pub-nav-link:hover { color: #0f2240; }
  .pub-nav-link.active {
    color: #0f2240; font-weight: 700;
  }
  .pub-nav-link.active::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 2px; background: #e8622a; border-radius: 99px;
  }

  .pub-nav-actions { display: flex; align-items: center; gap: 20px; }
  .pub-nav-login {
    font-size: 0.85rem; font-weight: 600; color: #7a8c9e;
    text-decoration: none; transition: color 0.2s;
  }
  .pub-nav-login:hover { color: #0f2240; }
  .pub-nav-signup {
    background: #0f2240; color: #fff;
    padding: 9px 22px; border-radius: 8px;
    font-size: 0.85rem; font-weight: 700; letter-spacing: 0.3px;
    text-decoration: none; transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(15,34,64,0.18);
  }
  .pub-nav-signup:hover {
    background: #1a3560;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(15,34,64,0.25);
  }

  /* hamburger — mobile only */
  .pub-nav-hamburger {
    display: none; background: none; border: none; cursor: pointer;
    color: #0f2240; padding: 4px;
  }

  /* ─── MAIN ─── */
  .layout-main { flex-grow: 1; }
  .layout-main.with-nav { padding-top: 72px; }

  /* ─── FOOTER ─── */
  .pub-footer {
    background: #0f2240;
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 72px 0 0;
  }
  .pub-footer-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 32px;
  }

  /* top section: brand + columns */
  .pub-footer-top {
    display: grid;
    grid-template-columns: 1.6fr repeat(4, 1fr);
    gap: 40px;
    padding-bottom: 56px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  /* brand column */
  .footer-brand-logo {
    font-size: 1.5rem; font-weight: 800; letter-spacing: -0.5px;
    color: #fff; text-decoration: none; display: inline-block; margin-bottom: 14px;
  }
  .footer-brand-logo span { color: #e8622a; }
  .footer-brand-tagline {
    font-size: 0.82rem; color: rgba(255,255,255,0.45);
    line-height: 1.6; max-width: 200px; margin-bottom: 24px;
  }
  .footer-member-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    padding: 6px 12px; border-radius: 20px;
    font-size: 0.68rem; font-weight: 700; color: rgba(255,255,255,0.5);
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .footer-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #2ecc8a; display: inline-block; flex-shrink: 0;
  }

  /* link columns */
  .footer-col-title {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 1.2px;
    text-transform: uppercase; color: rgba(255,255,255,0.35);
    margin-bottom: 18px;
  }
  .footer-col-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .footer-col-links a {
    font-size: 0.85rem; font-weight: 500; color: rgba(255,255,255,0.6);
    text-decoration: none; transition: color 0.2s;
  }
  .footer-col-links a:hover { color: #fff; }

  /* bottom bar */
  .pub-footer-bottom {
    padding: 24px 0;
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap;
  }
  .footer-bottom-copy {
    font-size: 0.78rem; color: rgba(255,255,255,0.3); font-weight: 500;
  }
  .footer-bottom-links {
    display: flex; gap: 20px;
  }
  .footer-bottom-links a {
    font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.35);
    text-decoration: none; transition: color 0.2s;
  }
  .footer-bottom-links a:hover { color: rgba(255,255,255,0.7); }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 960px) {
    .pub-footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 36px;
    }
    .footer-brand-col { grid-column: span 2; }
  }
  @media (max-width: 768px) {
    .pub-nav-links { display: none; }
    .pub-nav-hamburger { display: flex; }
    .pub-footer-top { grid-template-columns: 1fr 1fr; }
    .footer-brand-col { grid-column: span 2; }
  }
  @media (max-width: 480px) {
    .pub-nav-inner { padding: 0 20px; }
    .pub-footer-top { grid-template-columns: 1fr; }
    .footer-brand-col { grid-column: span 1; }
    .pub-footer-bottom { flex-direction: column; align-items: flex-start; gap: 10px; }
    .pub-footer-inner { padding: 0 20px; }
  }
`;

const PublicNav = () => (
  <header className="pub-nav">
    <div className="pub-nav-inner">
      <Link to="/" className="pub-nav-logo">loan<span>@</span></Link>

      <nav className="pub-nav-links">
        <Link className="pub-nav-link active" to="/">Home</Link>
        <Link className="pub-nav-link" to="/borrower/view">Borrow</Link>
        <Link className="pub-nav-link" to="/investor/view">Invest</Link>
        <a className="pub-nav-link" href="#">How It Works</a>
        <a className="pub-nav-link" href="#">About</a>
      </nav>

      <div className="pub-nav-actions">
        <Link to="/login" className="pub-nav-login">Login</Link>
        <Link to="/signup" className="pub-nav-signup">Sign Up</Link>
        <button className="pub-nav-hamburger" aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="pub-footer">
    <div className="pub-footer-inner">
      <div className="pub-footer-top">

        {/* Brand column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand-logo">loan<span>@</span></Link>
          <p className="footer-brand-tagline">
            Connecting borrowers and investors for smarter, fairer lending.
          </p>
          <div className="footer-member-badge">
            <span className="footer-badge-dot" /> Verified Platform
          </div>
        </div>

        {/* Link columns */}
        {[
          { title: 'Company',  links: ['About Us', 'Careers'] },
          { title: 'Learn',    links: ['Blog', 'Lending 101'] },
          { title: 'Products', links: ['Personal Loans', 'Investing Tools'] },
          { title: 'Support',  links: ['Terms', 'Privacy'] },
        ].map((col) => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-col-links">
              {col.links.map((link) => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom bar */}
      <div className="pub-footer-bottom">
        <span className="footer-bottom-copy">© 2026 loan@. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

const Layout = ({ children, hideNav = false, hideFooter = false }) => (
  <div className="layout-root">
    <style>{styles}</style>
    {!hideNav && <PublicNav />}
    <main className={`layout-main${!hideNav ? ' with-nav' : ''}`}>
      {children}
    </main>
    {!hideFooter && <Footer />}
  </div>
);

export default Layout;