'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('qhuyy_user');
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.role === 'admin') {
        setIsAuthorized(true);
      } else {
        router.push('/');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthorized) return null; // Ẩn hoàn toàn cho đến khi xác thực xong

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl flex items-center gap-4 mb-8">
          <ShieldAlert size={32} className="text-red-500" />
          <div>
            <h1 className="text-xl font-bold text-red-500">TRANG QUẢN TRỊ VIÊN ẨN</h1>
            <p className="text-sm text-zinc-400">Chỉ có tài khoản Admin mới có thể truy cập được đường dẫn này.</p>
          </div>
        </div>
        
        {/* Nơi bạn thêm các chức năng Admin sau này */}
        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-xl">
          <p className="text-zinc-500 text-sm">Giao diện quản lý file và user dành riêng cho QHUYY...</p>
        </div>
      </div>
    </div>
  );
}