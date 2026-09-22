# 天正 / AI Lab

天正的个人网站，记录 AI 探索与实践，集中展示个人介绍、精选笔记、数字服务和 AI 社群入口。

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
| `node --experimental-strip-types --test scripts/analytics.test.mjs` | 运行埋点工具测试 |
| `npm run deploy:cloudflare -- --dry-run` | 检查并构建部署产物，不发布到线上 |
| `npm run deploy:cloudflare` | 检查、构建并发布到 Cloudflare |

## 目录结构

```text
app/
  page.tsx                  # 页面内容及交互
  layout.tsx                # 页面布局、标题与分享元信息
  globals.css               # 全局样式
  explorer.css              # 页面视觉样式
  analytics.ts              # 可选的事件追踪封装
public/                     # 图标、二维码及分享图片等静态资源
scripts/
  analytics.test.mjs        # 事件追踪测试
  ANALYTICS.md              # 埋点说明
  deploy-cloudflare.sh      # Cloudflare 部署脚本
vite.config.ts              # Vinext、Vite 与 Cloudflare 配置
next.config.ts              # Next.js 兼容配置
package.json                # 依赖与项目命令
```

## 修改内容

- 个人介绍、服务链接、精选笔记、社群介绍等内容在 `app/page.tsx` 中维护。
- 网站标题、描述和分享元信息在 `app/layout.tsx` 中维护。
- 图片与二维码放在 `public/` 下，并同步更新页面中的引用路径。
- 修改布局后，分别检查桌面端和移动端，重点确认顶部导航、锚点定位、二维码与外链交互。
- 本地确认效果后再部署；提交或推送 Git 代码不等同于手动执行部署脚本。

## 部署到 Cloudflare

部署前需要拥有目标 Cloudflare 账户、Workers 及对应域名的配置权限。

首次使用时登录：

```bash
npx wrangler login
```

部署脚本支持以下环境变量：

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `CLOUDFLARE_WORKER_NAME` | `tz-view` | Worker 名称 |
| `CLOUDFLARE_CUSTOM_DOMAIN` | `tz-view.com` | 绑定的自定义域名 |
| `NEXT_PUBLIC_SITE_URL` | `https://` + 自定义域名 | 站点公开地址，用于元信息等 |

**如果复用本项目，请先替换 Worker 名称、域名和个人素材，不要直接使用默认生产配置。**

例如，先检查自己的部署配置：

```bash
CLOUDFLARE_WORKER_NAME=my-personal-site \
CLOUDFLARE_CUSTOM_DOMAIN=profile.example.com \
NEXT_PUBLIC_SITE_URL=https://profile.example.com \
npm run deploy:cloudflare -- --dry-run
```

确认无误后，使用相同环境变量移除 `-- --dry-run` 执行正式部署。

部署脚本依次执行 `git diff --check`、代码规范检查、生产构建，最后通过 Wrangler 发布。Wrangler 配置由构建生成，位于 `dist/server/wrangler.json`，无需手动修改生成文件。

不要提交 Cloudflare 凭据、`.env` 文件、`node_modules/`、`dist/` 或 `.wrangler/` 等本地产物。

## 可选的访问事件统计

项目通过 `app/analytics.ts` 对接 Cloudflare Zaraz。只有页面中存在可用的 `window.zaraz.track` 时才发送事件；未配置统计服务时，不影响网站正常使用。

事件追踪尊重浏览器的 Do Not Track 和 Global Privacy Control 设置。配置与事件说明见 [scripts/ANALYTICS.md](scripts/ANALYTICS.md)。
