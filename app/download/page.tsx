'use client';
import React, { useState } from 'react';

export default function DownloadPage() {
  // Danh sách file cố định của bạn
  const [files, setFiles] = useState([
    {
      id: 1,
      title: 'FakeLagAdr',
      size: '25MB',
      url: 'https://link4m.net/yUeEnlm'
    },
    {
      id: 2,
      title: 'Fake Lag Pc',
      size: '34MB',
      url: 'https://link4m.net/UkbL2'
    }
  ]);

  // Hàm xử lý khi bấm tải về
  const handleDownload = (url: string) => {
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    window.open(finalUrl, '_blank');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Khu Vực Tải Xuống</h1>
      </div>

      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="bg-[#121214] border border-zinc-800 p-4 rounded-xl flex justify-between items-center shadow">
            <div>
              <h3 className="font-bold text-white text-base">{file.title}</h3>
              <p className="text-xs text-zinc-400">Kích thước: {file.size}</p>
            </div>
            <button
              onClick={() => handleDownload(file.url)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              TẢI VỀ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}