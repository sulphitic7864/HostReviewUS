import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boo Savvy US - Best Web Hosting for Small Business',
  description: 'Independently rated web hosting for small business in the US market. Compare audited uptime, server response times, renewal pricing, and live customer support across 130+ providers.',
  openGraph: {
    title: 'Boo Savvy US - Best Web Hosting for Small Business',
    description: 'Independently rated web hosting for small business in the US market.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
