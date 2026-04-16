import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';


const PublicNav = () => (
  <header className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/20">
    <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
      <Link to="/" className="text-2xl font-bold tracking-tighter text-on-background">loan@</Link>
      <div className="hidden md:flex items-center gap-8">
        <Link className="text-primary font-bold border-b-2 border-primary pb-1 text-sm tracking-tight" to="/">Home</Link>
        <Link className="text-tertiary hover:text-primary transition-colors duration-300 text-sm font-medium" to="/borrower-dashboard">Borrow</Link>
        <Link className="text-tertiary hover:text-primary transition-colors duration-300 text-sm font-medium" to="/investor-dashboard">Invest</Link>
        <a className="text-tertiary hover:text-primary transition-colors duration-300 text-sm font-medium" href="#">How It Works</a>
        <a className="text-tertiary hover:text-primary transition-colors duration-300 text-sm font-medium" href="#">About</a>
      </div>
      <div className="flex items-center gap-6">
        <Link className="text-tertiary font-medium text-sm hover:text-primary transition-all" to="/login">Login</Link>
        <Link to="/signup" className="bg-primary-container text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
          Sign Up
        </Link>
      </div>
    </nav>
  </header>
);

const UserNav = () => {
    const navigate = useNavigate();
    return (
      <nav className="fixed top-0 w-full border-b border-slate-200/20 bg-white/85 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-[#0F1C2F] tracking-tight">loan@</Link>
            <div className="hidden md:flex items-center gap-6">
              <Link className="text-[#344556] font-medium hover:text-[#2B5F8A] transition-colors text-sm" to="/borrower-dashboard">My Loans</Link>
              <Link className="text-[#344556] font-medium hover:text-[#2B5F8A] transition-colors text-sm" to="/investor-dashboard">My Investments</Link>
              <a className="text-[#344556] font-medium hover:text-[#2B5F8A] transition-colors text-sm" href="#">Profile</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                ApiService.logout();
                navigate('/login');
              }}
              className="px-4 py-1.5 bg-primary text-white rounded-lg font-semibold">
              Logout
            </button>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3-rMVGRh7zc3UJAHf7wUC-BTF9MqFNzRwbonunVdU7tiDVWwVVlQRlmmXGCh0z_X1ki3DkOtUxGG6_NaXyn56nlEuiLdmbZbZNGNOhTIzEHS-5D_odzoQYE017MZMUyzLhG8coRqwR4n7PKmFhM5QtOzano6bfPq-biucqeaJM5-ABR0nbarHjK4iAbdTxpYr3DQkHn8GbwW3vSiclmDOWotLBGu3JFhciycjo6iduqdPXJxPiEv4GmL522LPIDQfZ_P-PtfICTA"
                alt="user avatar"
              />
            </div>
          </div>
        </div>
      </nav>
    );
};

const Footer = () => (
  <footer className="bg-surface-container-low pt-24 pb-12 border-t border-outline-variant/20">
    <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
      {[
        { title: 'Company', links: ['About Us', 'Careers'] },
        { title: 'Learn', links: ['Blog', 'Lending 101'] },
        { title: 'Products', links: ['Personal Loans', 'Investing Tools'] },
        { title: 'Support', links: ['Terms', 'Privacy'] },
      ].map((col) => (
        <div key={col.title}>
          <span className="text-on-background font-black text-xl mb-6 block">{col.title}</span>
          <ul className="space-y-4">
            {col.links.map((link) => (
              <li key={link}><a className="text-tertiary hover:text-primary transition-all text-sm" href="#">{link}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-7xl mx-auto px-8 pt-12 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-black text-on-background">loan@</span>
        <p className="text-tertiary text-sm">© 2026 loan@. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Layout = ({ children, hideNav = false, hideFooter = false, navType = 'default' }) => (
  <div className="min-h-screen flex flex-col">
    {!hideNav && (navType === 'default' ? <PublicNav /> : <UserNav />)}
    <main className={`flex-grow ${!hideNav ? 'pt-20' : ''}`}>{children}</main>
    {!hideFooter && <Footer />}
  </div>
);

export default Layout;