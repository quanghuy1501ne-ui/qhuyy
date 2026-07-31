'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu nhập lại không khớp!');
      return;
    }
    const newUser = { name, username, password, role: 'admin' };
    localStorage.setItem('qhuyy_user', JSON.stringify(newUser));
    alert('Đăng ký tài khoản thành công!');
    router.push('/download'); // Chuyển hướng vào trang quản lý
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4">
      <div className="bg-[#121214] border border-zinc-800 p-8 rounded-2xl w-full max-w-md space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-white text-black font-bold text-xl flex items-center justify-center rounded-xl mx-auto shadow">
            Q
          </div>
          <h1 className="text-xl font-bold tracking-wider">QHUYY</h1>
          <p className="text-xs text-zinc-500">Tạo tài khoản mới</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nhập họ và tên của bạn..."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-zinc-500 transition"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Tên tài khoản (Username)"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-zinc-500 transition"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-zinc-500 transition"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-zinc-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-3 rounded-lg text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow"
          >
            ĐĂNG KÝ NGAY →
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-white font-medium hover:underline">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}