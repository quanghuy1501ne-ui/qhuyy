'use client';
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Topbar() {
  const [isLight, setIsLight] = useState(false);
  const [userName, setUserName] = useState('Quang Huy');
  const [userRole, setUserRole] = useState('ADMIN');

  useEffect(() => {
    const savedTheme = localStorage.getItem('qhuyy_theme');
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }

    const user = JSON.parse(localStorage.getItem('qhuyy_user') || '{}');
    if (user.name) setUserName(user.name);
    if (user.role) setUserRole(user.role.toUpperCase());
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      setIsLight(false);
      localStorage.setItem('qhuyy_theme', 'dark');
      document.documentElement.classList.remove('light');
    } else {
      setIsLight(true);
      localStorage.setItem('qhuyy_theme', 'light');
      document.documentElement.classList.add('light');
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 px-6 flex items-center justify-between bg-[inherit]">
      <div className="text-sm text-zinc-400 font-medium">
        Khu vực điều khiển hệ thống
      </div>

      <div className="flex items-center gap-4">
        {/* Nút chuyển đổi Sáng / Tối ở góc trên */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition cursor-pointer shadow"
          title="Chuyển đổi giao diện sáng/tối"
        >
          {isLight ? (
            <>
              <Moon size={14} className="text-blue-400" /> Tối
            </>
          ) : (
            <>
              <Sun size={14} className="text-yellow-400" /> Sáng
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-sm bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-lg">
          <span className="text-zinc-300">Chào, <strong className="text-white">{userName}</strong></span>
          <span className="bg-red-600/20 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-900/50 font-bold uppercase tracking-wider">
            {userRole}
          </span>
        </div>
      </div>
    </header>
  );
}