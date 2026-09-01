import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

export default function Header({ title = 'Loan@', badge = 'SUPER ADMIN' }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-white/85 backdrop-blur-md border-b px-8 py-4 z-50 flex justify-between items-center">
      <h2 className="text-xl font-bold">
        {title}
        <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded ml-2">{badge}</span>
      </h2>
      <button
        onClick={() => {
          ApiService.logout();
          navigate('/login');
        }}
        className="px-4 py-1.5 bg-primary text-white rounded-lg font-semibold"
      >
        Logout
      </button>
    </header>
  );
}