import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';



export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await ApiService.getAllUsers();
        setUsers(data.userList);   // extract userList from the response
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

        <h1 className="text-3xl font-extrabold mb-8">User Management</h1>
        <div className="bg-surface-container-low rounded-xl p-8">
          <div className="overflow-x-auto bg-surface-container-lowest rounded-xl shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-high/30">
                  {['User Details', 'Phone Number', 'Role', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-extrabold uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-outline">Loading users...</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-on-background">{u.name}</div>
                        <div className="text-xs text-outline">{u.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-tertiary">{u.phoneNumber}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${u.role === 'ADMIN'
                          ? 'bg-secondary-container/50 text-on-secondary-container'
                          : 'bg-surface-container-highest text-outline'
                          }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="material-symbols-outlined text-outline">more_horiz</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>


      </main>
    </div>
  );
}