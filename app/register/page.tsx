'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('Quang Huy');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xát nhận không trùng khớp!');
      return;
    }

    // Lấy danh sách tài khoản đã đăng ký trước đó
    const existingAccounts = JSON.parse(localStorage.getItem('qhuyy_accounts') || '[]');

    // Kiểm tra tài khoản trùng hoặc trùng tài khoản Admin
    if (account === 'adminqhuy' || existingAccounts.some((user: any) => user.account === account)) {
      setError('Tài khoản này đã tồn tại!');
      return;
    }

    // Lưu tài khoản mới
    const newUser = { name: name || 'Quang Huy', account, password, role: 'user' };
    existingAccounts.push(newUser);
    localStorage.setItem('qhuyy_accounts', JSON.stringify(existingAccounts));

    setSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-white">
      <div className="max-w-sm w-full bg-[#121214] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-white text-black font-extrabold text-xl flex items-center justify-center rounded-lg mx-auto mb-4">Q</div>
          <h1 className="text-xl font-bold tracking-wider">QHUYY</h1>
          <p className="text-xs text-zinc-500 mt-1">Tạo tài khoản mới</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-emerald-900/30 border border-emerald-500/50 rounded-lg flex items-center gap-2 text-emerald-400 text-xs">
            <CheckCircle size={14} /> Đăng ký thành công! Đang chuyển hướng...
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 text-sm"
              placeholder="Họ và Tên"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 text-sm"
              placeholder="Tên tài khoản"
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
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 text-sm"
              placeholder="Xác nhận mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
          >
            ĐĂNG KÝ NGAY <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-xs text-center text-zinc-500 mt-6">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-white underline hover:text-zinc-300">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}