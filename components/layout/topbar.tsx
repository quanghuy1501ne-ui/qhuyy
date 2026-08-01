'use client';
import React, { useState, useEffect } from 'react';
import { Sun, Moon, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Topbar() {
  const [isLight, setIsLight] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Check giao diện sáng/tối
    const savedTheme = localStorage.getItem('qhuyy_theme');
    if (savedTheme === 'light') {
      setIsLight(true);
      document.body.classList.add('light-theme');
    }

    // 2. Check tài khoản ĐĂNG NHẬP THẬT (không dùng dữ liệu ảo nữa)
    const savedUser = localStorage.getItem('qhuyy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      setIsLight(false);
      localStorage.setItem('qhuyy_theme', 'dark');
      document.body.classList.remove('light-theme');
    } else {
      setIsLight(true);
      localStorage.setItem('qhuyy_theme', 'light');
      document.body.classList.add('light-theme');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('qhuyy_user');
    setUser(null);
    window.location.reload(); // F5 lại trang để xóa quyền
  };

  return (
    <header className="h-16 border-b border-zinc-800 px-6 flex items-center justify-between bg-[inherit]">
      <div className="text-sm text-zinc-400 font-medium">
        Khu vực điều khiển hệ thống
      </div>

      <div className="flex items-center gap-4">
        {/* Nút chuyển đổi Sáng / Tối */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition shadow"
          title="Chuyển đổi giao diện"
        >
          {isLight ? (
            <><Moon size={14} className="text-blue-400" /> Giao diện Tối</>
          ) : (
            <><Sun size={14} className="text-yellow-400" /> Giao diện Sáng</>
          )}
        </button>

        {/* Xử lý hiển thị Đăng nhập hoặc Thông tin User */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-lg">
              <span className="text-zinc-300">Chào, <strong className="text-white">{user.name || user.username}</strong></span>
              {user.role === 'admin' && (
                <span className="bg-red-600/20 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-900/50 font-bold uppercase tracking-wider">
                  ADMIN
                </span>
              )}
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1 bg-red-900/50 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">
              <LogOut size={14} /> THOÁT
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition">
              ĐĂNG NHẬP
            </Link>
            <Link href="/register" className="px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold transition">
              ĐĂNG KÝ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}