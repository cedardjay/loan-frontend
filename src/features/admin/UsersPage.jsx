import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import AdminLayout from './AdminLayout';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await ApiService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <AdminLayout title="Loan@" badge="SUPER ADMIN">
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
                <tr><td colSpan={4} className="text-center py-8 text-outline">Loading users...</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-on-background">{u.name}</div>
                      <div className="text-xs text-outline">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-tertiary">{u.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${u.role === 'ADMIN' ? 'bg-secondary-container/50 text-on-secondary-container' : 'bg-surface-container-highest text-outline'}`}>
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
    </AdminLayout>
  );
}