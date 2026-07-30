import React from 'react';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import { Zap, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      <Sidebar />
      
      <div className="ml-64 flex-1 flex flex-col min-h-screen relative overflow-hidden">
        
        {/* Hiệu ứng ánh sáng (Glow) phía sau nền */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <Topbar />
        
        <main className="flex-1 p-8 flex flex-col items-center justify-center relative z-10">
          
          {/* Logo Center - Làm to và hầm hố hơn */}
          <div className="text-center mb-16 space-y-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-zinc-100 to-zinc-400 text-black font-black text-5xl flex items-center justify-center rounded-3xl mx-auto shadow-2xl shadow-white/10 ring-1 ring-white/20">
              Q
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 mb-2">
                QHUYY
              </h1>
              <p className="text-zinc-400 text-sm tracking-widest uppercase font-semibold">
                Hệ thống tự động 24/7
              </p>
            </div>
          </div>

          {/* Các thẻ tính năng nổi bật (Decorate cho đẹp) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
            
            {/* Card 1 */}
            <div className="bg-[#121214]/80 backdrop-blur-md border border-zinc-800/80 p-6 rounded-2xl hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">Xử lý Siêu Tốc</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Hệ thống giao dịch và điều phối file hoàn toàn tự động, đảm bảo khách hàng nhận file không độ trễ.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#121214]/80 backdrop-blur-md border border-zinc-800/80 p-6 rounded-2xl hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">Bảo Mật Tối Đa</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Các bản cập nhật và phần mềm được mã hóa an toàn, liên kết tải xuống được bảo vệ nghiêm ngặt.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#121214]/80 backdrop-blur-md border border-zinc-800/80 p-6 rounded-2xl hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">Hỗ Trợ 24/7</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Hệ thống vận hành liên tục xuyên màn đêm, đội ngũ update luôn cập nhật phiên bản mới nhất.
              </p>
            </div>
            
          </div>

          {/* Nút hành động dẫn sang trang Download */}
          <Link 
            href="/download" 
            className="group flex items-center gap-3 bg-white text-black hover:bg-zinc-200 font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)]"
          >
            TRUY CẬP KHU VỰC TẢI XUỐNG 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </main>
      </div>
    </div>
  );
}