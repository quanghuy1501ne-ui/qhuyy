'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('qhuyy_user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('qhuyy_user');
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="h-16 flex items-center justify-end px-8 bg-[#09090b] sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-300">
              Chào, <strong className="text-white">{user.name}</strong>
              {user.role === 'admin' && <span className="ml-2 text-xs bg-red-600 px-2 py-1 rounded">ADMIN</span>}
            </span>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition cursor-pointer">
              <LogOut size={14} /> THOÁT
            </button>
          </div>
        ) : (
          <>
            <Link href="/login" className="flex items-center gap-2 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition">
              <LogIn size={14} /> ĐĂNG NHẬP
            </Link>
            <Link href="/register" className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2.5 rounded-lg transition">
              <UserPlus size={14} /> ĐĂNG KÝ
            </Link>
          </>
        )}
      </div>
    </header>
  );
}