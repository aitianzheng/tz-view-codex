import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tz-ai-lab.ai-tianzheng.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '天正 / AI Lab｜AI 内容、产品与数字服务',
  description: '天正的个人网站。记录 AI 工具、工作流、产品、内容系统与自动化实践，并经营 TZ Mall AI 代充 / 充值服务。欢迎通过微信、邮件、X 或 Telegram 联系。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: '天正 / AI Lab｜AI 内容、产品与数字服务',
    description: '天正的 AI 内容、产品实践与数字服务。正在经营 TZ Mall AI 代充 / 充值服务。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '天正 / AI Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '天正 / AI Lab｜AI 内容、产品与数字服务',
    description: '天正的 AI 内容、产品实践与数字服务。正在经营 TZ Mall AI 代充 / 充值服务。',
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
