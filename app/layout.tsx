import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tz-ai-lab.ai-tianzheng.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '天正 / AI Lab',
  description: '天正的个人品牌网站，记录 AI 实践、产品设计与内容系统。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: '天正 / AI Lab',
    description: '把想法变成真实作品。记录 AI 实践、产品设计与内容系统。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '天正 / AI Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '天正 / AI Lab',
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
