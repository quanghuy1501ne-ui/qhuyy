'use client';
import React, { useState } from 'react';
import { Download, Home, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DownloadPage() {
  const [files, setFiles] = useState([
    {
      id: 1,
      title: 'FakeLagAdr',
      size: '25 MB',
      version: 'v2.1 Latest',
      url: 'https://link4m.net/yUeEnlm',
      desc: 'Phiên bản tối ưu hóa cho thiết bị Android, giảm độ trễ mượt mà.'
    },
    {
      id: 2,
      title: 'Fake Lag Pc',
      size: '34 MB',
      version: 'v3.5 Pro',
      url: 'https://link4m.net/UkbL2',
      desc: 'Công cụ chuyên dụng trên máy tính, ổn định kết nối mạng tối đa.'
    }
  ]);

  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = (id: number, url: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      let finalUrl = url.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      window.open(finalUrl, '_blank');
    }, 400); // Hiệu ứng nhún nút trong 0.4 giây rồi mở link
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Bar bên trong trang: Tiêu đề + Nút về trang chủ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-white flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={24} /> KHU VỰC TẢI XUỐNG
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Tất cả các công cụ và phần mềm chính thống đều được cập nhật phiên bản mới nhất tại đây.
          </p>
        </div>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md hover:scale-105 active:scale-95"
        >
          <Home size={14} className="text-zinc-400" /> VỀ TRANG CHỦ
        </Link>      </div>

      {/* Banner lấp đầy khoảng trống */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#121214] to-zinc-900 border border-zinc-800/80 p-6 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-2 z-10">
          <span className="bg-green-500/10 text-green-400 text-[10px] px-2.5 py-1 rounded-full border border-green-500/20 font-bold uppercase tracking-wider">
            Hệ thống ổn định 24/7
          </span>
          <h2 className="text-lg font-bold text-white">Liên kết tải xuống an toàn và tốc độ cao</h2>
          <p className="text-xs text-zinc-400 max-w-xl">
            Các file được quét sạch mã độc, đảm bảo không ảnh hưởng đến thiết bị của bạn. Bấm tải về để nhận liên kết rút gọn chính thức.
          </p>
        </div>
        <div className="flex items-center gap-4 z-10 shrink-0">
          <div className="flex items-center gap-2 bg-zinc-950/60 border border-zinc-800 px-3.5 py-2 rounded-xl">
            <ShieldCheck size={18} className="text-emerald-400" />
            <div className="text-left text-[11px]">
              <div className="text-zinc-200 font-bold">Bảo Mật</div>
              <div className="text-zinc-500">100% An toàn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách file hiển thị gọn gàng */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Danh sách phần mềm sẵn sàng</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {files.map((file) => (
            <div 
              key={file.id} 
              className="bg-[#121214] border border-zinc-800/80 hover:border-zinc-700 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base group-hover:text-zinc-200 transition">{file.title}</h4>
                  <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded font-mono">{file.version}</span>
                </div>
                <p className="text-xs text-zinc-400">{file.desc}</p>
                <div className="text-[11px] text-zinc-500 flex items-center gap-3 pt-1">
                  <span>Dung lượng: <strong className="text-zinc-300">{file.size}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1"><Zap size={10} /> Link tốc độ cao</span>
                </div>
              </div>

              {/* Nút tải về có Animation nhún nhảy cực mượt */}
              <button
                onClick={() => handleDownload(file.id, file.url)}
                disabled={downloadingId === file.id}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-md shrink-0 ${
                  downloadingId === file.id 
                    ? 'bg-emerald-600 text-white scale-95 opacity-90' 
                    : 'bg-white hover:bg-zinc-200 text-black hover:scale-105 active:scale-95'
                }`}
              >
                <Download size={14} className={downloadingId === file.id ? 'animate-bounce' : ''} />
                {downloadingId === file.id ? 'Đang chuyển hướng...' : 'TẢI VỀ NGAY'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}