import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'TZ / AI Lab',
  description: '独立创作者与 AI 实践者的个人品牌网站。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: 'TZ / AI Lab',
    description: '把想法变成真实作品。独立创作者与 AI 实践者的个人品牌网站。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'TZ / AI Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TZ / AI Lab',
    description: '把想法变成真实作品。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
