import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

const STATS = [
  { label: 'Users', value: '' },
  { label: 'Verified', value: '' },
  { label: 'Volume', value: '' },
];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  return (
<div className="bg-surface min-h-screen flex">
      <aside className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant/20 bg-surface-container-low sticky top-0 py-8">
        <div className="px-8 mb-10">
          <h1 className="font-black text-xl">Super Admin</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-1">
            <li className="pr-4">
              <a className="flex items-center gap-4 px-8 py-3 bg-white text-primary font-bold rounded-r-full" href="#">
                <span className="material-symbols-outlined">group</span>
                <span className="text-[10px] uppercase tracking-widest">Users</span>
              </a>
            </li>
            <li className="pr-4">
              <a className="flex items-center gap-4 px-8 py-3 text-tertiary" href="#">
                <span className="material-symbols-outlined">shield_person</span>
                <span className="text-[10px] uppercase tracking-widest">Admins</span>
              </a>
            </li>
            <li className="pr-4">
              <Link className="flex items-center gap-4 px-8 py-3 text-tertiary" to="/admin-dashboard">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-[10px] uppercase tracking-widest">View Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-8 mt-auto">
          <Link to="/" className="text-[10px] font-bold uppercase text-tertiary">Sign Out</Link>
        </div>
      </aside>

      <main className="flex-1 p-8 space-y-10 mt-16">
        <header className="fixed top-0 right-0 left-0 md:left-64 bg-white/85 backdrop-blur-md border-b px-8 py-4 z-50 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Loan@{' '}
            <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded ml-2">SUPER ADMIN</span>
          </h2>
          
           <button
                    onClick={() => {
                      ApiService.logout();
                      navigate('/login');
                    }}
                    className="px-4 py-1.5 bg-primary text-white rounded-lg font-semibold">
                    Logout
                  </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
              <p className="text-[10px] uppercase text-tertiary mb-2">{s.label}</p>
              <h3 className="text-2xl font-extrabold">{s.value}</h3>
            </div>
          ))}
        </div>

        
      </main>
    </div>
  );
}