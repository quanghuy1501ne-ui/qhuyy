'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import { Download, FileArchive, Trash2, Edit, Plus, X, Check } from 'lucide-react';

export default function DownloadPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  // State quản lý Form thêm/sửa
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', size: '', url: '' });

  useEffect(() => {
    // Kiểm tra quyền Admin
    const user = JSON.parse(localStorage.getItem('qhuyy_user') || '{}');
    if (user.role === 'admin') {
      setIsAdmin(true);
    }

    // Tải danh sách file từ localStorage, nếu chưa có thì dùng mặc định
    const savedFiles = localStorage.getItem('qhuyy_downloads');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    } else {
      const defaultFiles = [
        { id: 1, name: 'Bản Hack VIP - Phiên bản 1.0.4', size: '15 MB', url: 'https://example.com/file1.zip' },
        { id: 2, name: 'Tool Bypass Anti-Cheat Mới Nhất', size: '8 MB', url: 'https://example.com/file2.zip' },
        { id: 3, name: 'Tài liệu hướng dẫn cài đặt', size: '2 MB', url: 'https://example.com/file3.pdf' },
      ];
      setFiles(defaultFiles);
      localStorage.setItem('qhuyy_downloads', JSON.stringify(defaultFiles));
    }
  }, []);

  // Cập nhật state & storage
  const saveFiles = (newFiles: any[]) => {
    setFiles(newFiles);
    localStorage.setItem('qhuyy_downloads', JSON.stringify(newFiles));
  };

  // 1. Xóa file
  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa file này khỏi hệ thống?')) {
      const newFiles = files.filter(f => f.id !== id);
      saveFiles(newFiles);
    }
  };

  // 2. Mở form sửa (Đổi tên, url)
  const startEdit = (file: any) => {
    setEditingId(file.id);
    setFormData({ name: file.name, size: file.size, url: file.url });
    setShowAddForm(false);
  };

  // Lưu thông tin sửa
  const handleSaveEdit = () => {
    const newFiles = files.map(f =>
      f.id === editingId ? { ...f, ...formData } : f
    );
    saveFiles(newFiles);
    setEditingId(null);
    setFormData({ name: '', size: '', url: '' });
  };

  // 3. Thêm file mới
  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    const newFile = {
      id: Date.now(), // Tạo ID ngẫu nhiên
      ...formData
    };
    saveFiles([...files, newFile]);
    setShowAddForm(false);
    setFormData({ name: '', size: '', url: '' });
  };

  // Xử lý nút Download
  const handleDownload = (fileName: string, url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert(`Đang bắt đầu tải xuống file: ${fileName}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Tiêu đề & Nút thêm file (Chỉ Admin) */}
            <div className="bg-[#121214] border border-zinc-800 p-6 rounded-xl flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold mb-1 flex items-center gap-3">
                  Khu Vực Tải Xuống 
                  {isAdmin && <span className="bg-red-600/20 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-900/50 uppercase tracking-widest">Quyền Admin</span>}
                </h1>
                <p className="text-sm text-zinc-500">Danh sách các phần mềm và công cụ sẵn sàng.</p>
              </div>
              
              {isAdmin && !showAddForm && (
                <button
                  onClick={() => { setShowAddForm(true); setEditingId(null); setFormData({ name: '', size: '', url: '' }); }}
                  className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 text-xs font-bold px-4 py-2.5 rounded-lg transition"
                >
                  <Plus size={16} /> THÊM FILE MỚI
                </button>
              )}
            </div>

            {/* Form Thêm File mới */}
            {isAdmin && showAddForm && (
              <form onSubmit={handleAddFile} className="bg-[#121214] border border-zinc-700 p-5 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-white mb-2">Đăng tải file mới</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Tên phần mềm / Tên File" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:border-zinc-500 outline-none" />
                  <input type="text" placeholder="Dung lượng (VD: 15 MB)" required value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:border-zinc-500 outline-none" />
                </div>
                <input type="text" placeholder="Đường dẫn trang web tải (URL / Link Google Drive...)" required value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:border-zinc-500 outline-none" />
                
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 rounded-lg">HỦY</button>
                  <button type="submit" className="px-4 py-2 text-xs font-bold bg-white text-black hover:bg-zinc-200 rounded-lg">LƯU LẠI</button>
                </div>
              </form>
            )}

            {/* Danh sách File */}
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className={`bg-[#121214] border ${editingId === file.id ? 'border-zinc-500' : 'border-zinc-800'} p-4 rounded-xl transition`}>
                  
                  {/* --- HIỂN THỊ CHẾ ĐỘ SỬA FILE --- */}
                  {editingId === file.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-[#09090b] border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Tên file" />
                        <input type="text" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="bg-[#09090b] border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Kích thước" />
                      </div>
                      <input type="text" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-[#09090b] border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Link web / Tải về" />
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setEditingId(null)} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300"><X size={16} /></button>
                        <button onClick={handleSaveEdit} className="flex items-center gap-1 px-4 py-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs rounded-lg"><Check size={14} /> LƯU</button>
                      </div>
                    </div>
                  ) : (
                    
                    /* --- HIỂN THỊ CHẾ ĐỘ XEM BÌNH THƯỜNG --- */
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-900 rounded-lg text-zinc-400">
                          <FileArchive size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-zinc-200">{file.name}</h3>
                          <p className="text-xs text-zinc-500 mt-0.5">Kích thước: {file.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Các nút công cụ dành riêng cho ADMIN */}
                        {isAdmin && (
                          <>
                            <button onClick={() => startEdit(file)} className="p-2.5 bg-zinc-800 hover:bg-blue-900 hover:text-blue-400 text-zinc-400 rounded-lg transition" title="Sửa file">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(file.id)} className="p-2.5 bg-zinc-800 hover:bg-red-900 hover:text-red-400 text-zinc-400 rounded-lg transition" title="Xóa file">
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                        
                        {/* Nút Tải về (Ai cũng thấy) */}
                        <button
                          onClick={() => handleDownload(file.name, file.url)}
                          className="flex items-center gap-2 bg-zinc-800 hover:bg-white hover:text-black text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition active:scale-95 cursor-pointer ml-2"
                        >
                          <Download size={14} /> TẢI VỀ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {files.length === 0 && (
                <div className="text-center py-10 text-sm text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  Hiện chưa có file nào trên hệ thống.
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}