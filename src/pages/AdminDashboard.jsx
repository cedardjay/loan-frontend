import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';




export default function AdminDashboard() {
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
    <div className="bg-background min-h-screen">
      <header className="flex justify-between items-center px-8 h-16 w-full sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#C1C7CF]/20 shadow-sm">
        <div className="flex items-center gap-12">
          <span className="text-xl font-bold tracking-tighter text-[#0F1C2F]">Loan@</span>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link className="text-[#2B5F8A] font-bold border-b-2 border-[#2B5F8A] pb-1" to="/admin-dashboard">Users</Link>
            <a className="text-[#344556] hover:text-[#2B5F8A]" href="#">Verifications</a>
            <Link className="text-[#344556] hover:text-[#2B5F8A]" to="/super-admin">Global Governance</Link>
          </nav>
        </div>
        
        <button
          onClick={() => {
            ApiService.logout();
            navigate('/login');
          }}
          className="px-4 py-1.5 bg-primary text-white rounded-lg font-semibold">
          Logout
        </button>

      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-10">
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