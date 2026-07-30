'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Kiểm tra tài khoản Admin
    if (account === 'adminqhuy' && password === 'quanghuy') {
      localStorage.setItem('qhuyy_user', JSON.stringify({ name: 'Quang Huy', role: 'admin', account }));
      router.push('/');
      return;
    }

    // 2. Kiểm tra tài khoản đã Đăng ký trong localStorage
    const savedAccounts = JSON.parse(localStorage.getItem('qhuyy_accounts') || '[]');
    const matchedUser = savedAccounts.find(
      (user: any) => user.account === account && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('qhuyy_user', JSON.stringify({ name: matchedUser.name || 'Quang Huy', role: 'user', account: matchedUser.account }));
      router.push('/');
    } else {
      setError('Sai tài khoản hoặc mật khẩu! Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-white">
      <div className="max-w-sm w-full bg-[#121214] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-white text-black font-extrabold text-xl flex items-center justify-center rounded-lg mx-auto mb-4">Q</div>
          <h1 className="text-xl font-bold tracking-wider">QHUYY</h1>
          <p className="text-xs text-zinc-500 mt-1">Đăng nhập tài khoản</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 text-sm"
              placeholder="Tài khoản"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 text-sm"
              placeholder="Mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
          >
            ĐĂNG NHẬP <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-xs text-center text-zinc-500 mt-6">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-white underline hover:text-zinc-300">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}