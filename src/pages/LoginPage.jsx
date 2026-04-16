import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { useState } from 'react';
import ApiService from '../service/ApiService';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/verify';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      const response = await ApiService.loginUser({ email, password });
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        const role = response.role;
        if (role === 'ADMIN') {
          navigate('/admin-dashboard', { replace: true });
        } else if (role === 'SUPERADMIN') {
          navigate('/super-admin-dashboard', { replace: true });
        } else {
          navigate('/verify', { replace: true });
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <Layout hideFooter>
      <header className="fixed top-0 w-full z-50 border-b border-slate-200/20 bg-white/85 backdrop-blur-md h-20">
        <div className="max-w-7xl mx-auto px-8 h-full flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-950">loan@</Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-bold text-slate-600 hover:text-primary">Home</Link>
            <Link to="/signup" className="bg-[#2B5F8A] text-white px-6 py-2 rounded-lg font-bold text-sm">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center pt-24 px-6">
        <div className="max-w-md w-full">
          <div className="bg-surface-container-lowest border border-[#D1C7B8] rounded-[16px] shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#1E2A3E] mb-8">Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#5A6C7E]">Email address</label>
                <input className="w-full px-4 py-3 bg-white border border-[#D1C7B8] rounded-[8px]"
                  placeholder="you@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#5A6C7E]">Password</label>
                <input className="w-full px-4 py-3 bg-white border border-[#D1C7B8] rounded-[8px]"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#2B5F8A] text-white font-bold rounded-[8px]">Login</button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-[#5A6C7E]">
                Don't have an account?{' '}
                <Link className="text-[#2B5F8A] font-bold" to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}