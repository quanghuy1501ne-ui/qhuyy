import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSHELL-VN Admin Dashboard',
  description: 'Hệ thống Quản trị & Điều hành',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
