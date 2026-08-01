import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qhuyy Dashboard',
  description: 'Hệ thống quản lý Qhuyy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#09090b] text-white antialiased">
        {children}
      </body>
    </html>
  );
}