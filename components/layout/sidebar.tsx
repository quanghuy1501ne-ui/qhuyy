'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Download } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 fixed top-0 left-0 h-screen bg-[#09090b] border-r border-zinc-800 text-zinc-300 flex flex-col z-50">
      {/* Logo QHUYY */}
      <div className="h-16 flex items-center px-6">
        <div className="w-7 h-7 bg-white text-black font-bold flex items-center justify-center rounded-md text-sm mr-3">
          Q
        </div>
        <span className="font-extrabold text-white text-lg tracking-wider">QHUYY</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
        {/* MENU CHÍNH */}
        <div>
          <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Menu Chính</p>
          <div className="space-y-1">
            <Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${isActive('/') ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800/50 hover:text-white'}`}>
              <Home size={18} /> Trang chủ
            </Link>
          </div>
        </div>

        {/* DỊCH VỤ */}
        <div>
          <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Dịch Vụ</p>
          <div className="space-y-1">
            <Link href="/download" className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${isActive('/download') ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800/50 hover:text-white'}`}>
              <div className="flex items-center gap-3">
                <Download size={18} /> Tải xuống
              </div>
              <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">FREE</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}