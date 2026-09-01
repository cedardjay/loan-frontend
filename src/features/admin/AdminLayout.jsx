import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout({ title, badge, children }) {
  return (
    <div className="bg-surface min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 space-y-10 mt-16">
        <Header title={title} badge={badge} />
        {children ?? <Outlet />}
      </main>
    </div>
  );
}