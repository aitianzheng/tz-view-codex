# 天正 / AI Lab

天正的个人网站，记录 AI 探索与实践，集中展示个人介绍、精选笔记、数字服务和 AI 社群入口。

> 线上网站与仓库分支的更新进度可能不同。以下「项目内容」介绍线上网站；开发命令和目录说明以当前 `main` 分支为准。

**用 AI 探索普通人的财富自由之路。**

[访问个人网站](https://tz-view.com) · [X 个人主页](https://x.com/ai_tianzheng)

## 项目内容

- **个人介绍**：分享 AI 实战、自媒体运营与副业探索。
- **精选笔记**：汇集在 X 发布的美股学习、港卡等内容。
- **数字服务**：[TZ Mall](https://tz-mall.com) 提供 ChatGPT 等 AI 产品代充入口，[TZ Shop](https://tz-shop.com) 提供 X Premium 代充入口。
- **AI 社群**：交流项目实战、自媒体运营、AI 代充副业，以及商业化、资源与机会。
- **联系方式**：通过微信二维码和 X 主页建立联系。

本站是个人展示与服务导航网站，不在站内处理订单、支付或售后；相关服务由对应的独立站点提供。

## 技术栈

- **React 19 + TypeScript**：页面与交互。
- **Next.js App Router 约定 + Vinext**：使用 Vinext 提供的兼容层，通过 Vite 开发和构建，而非直接运行 `next dev` / `next build`。
- **Tailwind CSS 4 + 自定义 CSS**：响应式布局与视觉样式。
- **Cloudflare Workers + Wrangler**：构建产物部署与自定义域名配置。

## 本地开发

需要 **Node.js 22.13.0 或以上版本**及 npm。在项目根目录执行：

```bash
npm ci
npm run dev -- --port 3000
```

打开 [http://localhost:3000](http://localhost:3000)。

常用命令：

| 命令 | 用途 |
| --- | --- |
| `npm run dev -- --port 3000` | 启动本地开发服务 |
| `npm run lint` | 检查代码规范 |
| `npm run build` | 生成生产构建 |
| `npm start` | 使用 Vinext 启动生产服务 |

## 目录结构

```text
app/
  page.tsx                  # 页面内容及交互
  layout.tsx                # 页面布局、标题与分享元信息
  globals.css               # 全局样式
public/                     # 图标、二维码及分享图片等静态资源
slides/                     # 网站相关的演示文稿
vite.config.ts              # Vinext、Vite 与 Cloudflare 配置
next.config.ts              # Next.js 兼容配置
package.json                # 依赖与项目命令
```

## 修改内容

- 个人介绍、项目、服务链接和联系方式等页面内容在 `app/page.tsx` 中维护。
- 网站标题、描述和分享元信息在 `app/layout.tsx` 中维护。
- 图片与二维码放在 `public/` 下，并同步更新页面中的引用路径。
- 修改布局后，分别检查桌面端和移动端，重点确认顶部导航、锚点定位、二维码与外链交互。
- 本地确认效果后再部署；提交或推送 Git 代码不等同于手动执行部署脚本。

## 构建与发布说明

当前 `main` 分支已包含 Cloudflare Vite 插件和 Wrangler 依赖，但没有 `deploy:cloudflare` npm 命令。发布前应先确认目标托管环境、账号权限及域名配置，不要直接套用其他分支的部署命令。

可以先执行本地检查与构建：

```bash
npm run lint
NEXT_PUBLIC_SITE_URL=https://tz-view.com npm run build
```

`NEXT_PUBLIC_SITE_URL` 用于设置页面元信息中的站点公开地址。复用项目时，请替换为自己的域名，同时检查 `app/layout.tsx` 的默认地址、`.openai/hosting.json` 中的托管配置以及个人素材。

不要提交托管平台凭据、`.env` 文件、`node_modules/`、`dist/` 或 `.wrangler/` 等本地产物。发布网站应作为单独操作，在本地效果确认后执行。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。Copyright (c) 2026 天正。
