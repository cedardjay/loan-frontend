import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { to: '/super-admin/users', icon: 'group', label: 'Users' },
  { to: '/super-admin/loans', icon: 'request_quote', label: 'Loan Requests' },
  { to: '/super-admin/transactions', icon: 'receipt_long', label: 'Transactions' },
  { to: '/super-admin/admins', icon: 'shield_person', label: 'Admins' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant/20 bg-surface-container-low sticky top-0 py-8">
      <div className="px-8 mb-10">
        <h1 className="font-black text-xl">Super Admin</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to} className="pr-4">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-8 py-3 rounded-r-full ${
                    isActive ? 'bg-white text-primary font-bold' : 'text-tertiary'
                  }`
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
              </NavLink>
            </li>
          ))}
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
  );
}