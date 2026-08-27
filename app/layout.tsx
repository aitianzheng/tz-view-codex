import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tz-ai-lab.ai-tianzheng.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '天正 / AI Lab',
  description: '天正的个人品牌网站，提供 AI 订阅、代充协助、AI 工作流咨询、产品设计与内容系统服务。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: '天正 / AI Lab',
    description: '把想法变成真实作品。提供 AI 订阅、代充协助、AI 工作流咨询与内容系统服务。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '天正 / AI Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '天正 / AI Lab',
    description: 'AI 订阅、代充协助与 AI 工作流咨询。',
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
