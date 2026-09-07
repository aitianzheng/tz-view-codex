import type { Metadata } from 'next';
import './globals.css';
import './explorer.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tz-view.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '天正 / AI Lab｜主业程序员，用 AI 探索 Crypto 与美股',
  description: '天正的个人网站。主业程序员，用 AI 探索 Crypto 与美股，分享美股与港卡相关贴文，经营 TZ Mall AI 代充与 TZ Shop X Premium 代充服务。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: '天正 / AI Lab｜主业程序员，用 AI 探索 Crypto 与美股',
    description: '主业程序员，用 AI 探索 Crypto 与美股。精选 X 贴文、TZ Mall 与 TZ Shop，以及联系天正的方式。',
    images: [{ url: '/og-mono-v3.png', width: 1200, height: 630, alt: '天正 / AI Lab｜AI 内容、产品与数字服务' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '天正 / AI Lab｜主业程序员，用 AI 探索 Crypto 与美股',
    description: '主业程序员，用 AI 探索 Crypto 与美股。精选 X 贴文、TZ Mall 与 TZ Shop，以及联系天正的方式。',
    images: ['/og-mono-v3.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
