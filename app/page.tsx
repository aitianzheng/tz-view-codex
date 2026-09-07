'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from './analytics';

// Only publish confirmed contact details. A display name is not a WeChat ID.
const profile = {
  name: '天正',
  email: 'aitianzheng@gmail.com',
  x: 'https://x.com/ai_tianzheng',
  telegram: 'https://t.me/ai_tianzheng',
};

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'works', label: '项目' },
  { id: 'community', label: 'AI 社群' },
  { id: 'contact', label: '联系我' },
];

const projects = [
  {
    id: 'tz_mall', name: 'TZ Mall', category: 'AI 代充 / 充值',
    href: 'https://tz-mall.com', domain: 'tz-mall.com',
    description: 'AI 产品代充与充值服务。可用产品和服务说明，统一在站内查看。',
    action: '查看 AI 代充',
  },
  {
    id: 'tz_shop', name: 'TZ Shop', category: 'X Premium 代充',
    href: 'https://tz-shop.com', domain: 'tz-shop.com',
    description: 'X Premium 代充服务。根据你的需求，在站内查看当前方案与说明。',
    action: '查看 X Premium 代充',
  },
] as const;

const posts = [
  {
    id: 'us_stocks', topic: '美股',
    title: '如何从 0 建立美股投资体系？附免费公开视频资源',
    href: 'https://x.com/ai_tianzheng/status/2074695523009974272',
  },
  {
    id: 'hk_banking', topic: '港卡', title: '去香港必看！港卡办理全攻略｜1小时拿下5张卡，全程线上操作✅',
    href: 'https://x.com/ai_tianzheng/status/2057090260035842454',
  },
] as const;

function ContactLogo({ app }: { app: 'gmail' | 'telegram' | 'x' }) {
  return (
    <span className="contact-logo" aria-hidden="true">
      {app === 'gmail' ? (
        <svg viewBox="0 0 24 18" width="24" height="18" focusable="false">
          <path fill="#4285f4" d="M1.636 18h3.819V8.727L0 4.636v11.728C0 17.269.733 18 1.636 18Z" />
          <path fill="#34a853" d="M18.545 18h3.819C23.269 18 24 17.267 24 16.364V4.636l-5.455 4.091Z" />
          <path fill="#fbbc04" d="M18.545 1.636v7.091L24 4.636V2.455C24 .431 21.691-.724 20.073.491Z" />
          <path fill="#ea4335" d="M5.455 8.727V1.636L12 6.545l6.545-4.909v7.091L12 13.636Z" />
          <path fill="#c5221f" d="M0 2.455v2.181l5.455 4.091V1.636L3.927.491C2.307-.724 0 .431 0 2.455Z" />
        </svg>
      ) : app === 'telegram' ? (
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          <circle cx="12" cy="12" r="12" fill="#229ed9" />
          <path fill="#fff" d="M5.49 11.74c3.5-1.52 5.83-2.53 7-3.02 3.33-1.38 4.02-1.62 4.47-1.63.1 0 .32.02.46.14.12.1.15.24.17.35.02.1.04.33.02.51-.18 1.89-.96 6.47-1.36 8.59-.17.9-.5 1.2-.82 1.23-.7.06-1.23-.46-1.91-.9-1.06-.7-1.66-1.13-2.7-1.82-1.19-.78-.42-1.22.26-1.92.18-.18 3.25-2.98 3.31-3.23.01-.03.02-.15-.06-.21-.07-.07-.18-.05-.26-.03-.12.03-1.79 1.14-5.01 3.31-.47.33-.9.49-1.29.48-.42-.01-1.24-.24-1.85-.44-.75-.24-1.35-.37-1.3-.78.03-.22.33-.44.87-.66Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" focusable="false">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      )}
    </span>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-10% 0px -55% 0px', threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  async function copyEmail() {
    setCopyMessage('');
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyMessage('邮箱已复制');
      void trackEvent('contact_copy', 'email', 'contact');
    } catch {
      setCopyMessage('未能自动复制，请长按或选中上方邮箱地址复制。');
    }
  }

  return (
    <main>
      <a className="skip-link" href="#works">跳转到项目与服务</a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="天正 AI Lab 首页">
          <span className="brand-mark" aria-hidden="true" />
          <span>天正 / AI Lab</span>
        </a>
        <nav className="nav" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}
              className={`${activeSection === item.id ? 'is-active' : ''} ${item.id === 'contact' ? 'nav-cta' : ''}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={() => {
                setActiveSection(item.id);
                if (item.id === 'contact') void trackEvent('contact_click', 'contact', 'nav');
              }}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="intro-grid page-shell story-section" id="home">
        <section className="hero story-section" aria-labelledby="home-title">
          <div className="hero-copy">
            <p className="hero-greeting">你好，我是天正<span aria-hidden="true">。</span></p>
            <h1 id="home-title"><span>用 AI 探索</span><span className="accent">Crypto 与美股</span></h1>
            <p className="hero-lede">主业写代码，在 X 分享 AI、Crypto 与美股的学习实践。也在经营两个数字服务站，组织 AI 社群。</p>
            <div className="hero-topics" aria-label="关注方向"><span>AI</span><span>Crypto</span><span>美股</span></div>
            <div className="hero-actions" aria-label="快捷入口">
              <a className="button primary" href="#wechat" onClick={() => void trackEvent('contact_click', 'wechat', 'hero')}>和我聊聊 <span aria-hidden="true">↗</span></a>
              <a className="button ghost" href={profile.x} target="_blank" rel="noreferrer" onClick={() => void trackEvent('content_click', 'x', 'hero')}>我的 X 主页 <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-services" aria-label="我的数字服务">
              <span className="hero-services-label">正在经营</span>
              {projects.map((project) => (
                <a key={project.id} href={project.href} target="_blank" rel="noreferrer"
                  aria-label={`${project.name} ${project.category}（在新窗口打开）`}
                  onClick={() => void trackEvent('service_click', project.id, 'hero')}>
                  {project.name} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      <section className="writing-panel story-section" id="writing" aria-labelledby="writing-title">
        <div className="writing-panel-inner">
          <div className="section-intro">
            <div>
              <p className="section-kicker">SELECTED NOTES</p>
              <h2 id="writing-title">值得展开的两篇分享</h2>
              <p>来自我的 X，关于美股与港卡。</p>
            </div>
          </div>
          <div className="post-list">
            {posts.map((post, index) => (
              <a className="post-link" key={post.id} href={post.href} target="_blank" rel="noreferrer"
                aria-label={`${post.title}（在新窗口打开 X 原文）`}
                onClick={() => void trackEvent('content_click', post.id, 'writing')}>
                <span className="post-topic"><span aria-hidden="true">0{index + 1}</span>{post.topic}</span>
                <h3>{post.title}</h3>
                <span className="post-action">阅读原文 <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
          <a className="text-link writing-more" href={profile.x} target="_blank" rel="noreferrer"
            onClick={() => void trackEvent('content_click', 'x', 'writing')}>在 X 继续交流 <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      </div>

      <section className="story-section section-block projects-section" id="works" aria-labelledby="works-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index" aria-hidden="true">01</span>
            <div>
              <p className="section-kicker">PROJECTS & SERVICES</p>
              <h2 id="works-title">我的两个服务站</h2>
              <p>把服务做成可直接使用的入口。</p>
            </div>
          </div>
          <div className="featured-projects" id="services">
            {projects.map((project) => (
              <a className={`featured-project project-${project.id}`} key={project.id} href={project.href}
                target="_blank" rel="noreferrer"
                aria-label={`${project.action}，前往 ${project.name}（在新窗口打开）`}
                onClick={() => void trackEvent('service_click', project.id, 'projects')}>
                <div className="featured-project-copy">
                  <span className="work-tag">{project.category}</span>
                  <h3>{project.name}</h3>
                  <span className="project-domain">{project.domain}</span>
                  <p>{project.description}</p>
                </div>
                <div className="featured-project-meta">
                  <span className="status live">运营中</span>
                  <strong>{project.action} <span aria-hidden="true">↗</span></strong>
                </div>
              </a>
            ))}
          </div>
          <details className="service-guide">
            <summary>下单与咨询说明</summary>
            <div className="service-guide-content">
              <p>这里是我的个人网站与服务入口，具体交易在对应服务站完成。</p>
              <h3>方案、价格和售后规则在哪里看？</h3>
              <p>以对应服务站当前公布的说明为准。下单前，请确认服务范围、交付方式和售后规则；有不清楚的地方，可以先联系我咨询。</p>
              <h3>咨询时怎么说明需求？</h3>
              <p>告诉我是 AI 产品还是 X Premium，以及想了解的问题。已有订单可说明来自哪个服务站。请勿发送账号密码、验证码或支付卡信息。</p>
              <a className="text-link" href="#contact" onClick={() => void trackEvent('contact_click', 'contact', 'guide')}>还有问题？联系天正 <span aria-hidden="true">↗</span></a>
            </div>
          </details>
        </div>
      </section>

      <section className="story-section section-block community-section" id="community" aria-labelledby="community-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index" aria-hidden="true">02</span>
            <div>
              <p className="section-kicker">AI COMMUNITY</p>
              <h2 id="community-title">AI 社群</h2>
              <p>和正在做事的人，交流真实经验。</p>
            </div>
          </div>
          <div className="community-board">
            <div className="community-discussion">
              <h3>我们聊什么</h3>
              <ul className="community-topics">
                <li>核心业务和项目经验分享</li>
                <li>AI 产品、技术、内容方向交流</li>
                <li>内容拓展和账号增长</li>
                <li>商业化、资源和机会互通</li>
              </ul>
            </div>
            <div className="community-invitation">
              <h3>适合正在做事的你</h3>
              <p>希望认识已经在做事情的朋友：有自己的项目、业务、产品，或比较明确的方向。</p>
              <p className="community-principle">核心群不追求人数，更看重交流质量与长期价值。</p>
              <a className="button primary" href="#wechat"
                onClick={() => void trackEvent('contact_click', 'wechat', 'community')}>加微信，聊聊社群 <span aria-hidden="true">↓</span></a>
              <p className="community-note">备注「AI 社群」，简单介绍一下你正在做的事。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section section-block contact-section" id="contact" aria-labelledby="contact-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index" aria-hidden="true">03</span>
            <div>
              <p className="section-kicker">LET’S CONNECT</p>
              <h2 id="contact-title">联系我</h2>
              <p>Base 深圳，欢迎约Coffee Chat～</p>
            </div>
          </div>
          <div className="contact-board">
            <div className="wechat-card" id="wechat">
              <div className="wechat-copy">
                <p>加我微信</p>
                <h3>{profile.name}</h3>
                <p className="wechat-instructions">扫码添加，简单注明来意即可。手机端可长按保存二维码，再到微信中识别。</p>
                <a className="button qr-download" href="/wechat-tianzheng.png" download="天正-微信二维码.png"
                  onClick={() => void trackEvent('wechat_qr_download', 'wechat', 'contact')}>保存微信二维码 <span aria-hidden="true">↓</span></a>
              </div>
              <div className="wechat-qr">
                <img src="/wechat-tianzheng.png" width="354" height="358" loading="lazy" decoding="async" alt="天正的微信二维码" />
              </div>
            </div>
            <div className="contact-links">
              <div className="contact-card email-card">
                <span className="contact-channel"><ContactLogo app="gmail" />邮件 / EMAIL</span>
                <a className="email-address" href={`mailto:${profile.email}`} onClick={() => void trackEvent('contact_click', 'email', 'contact')}>{profile.email}</a>
                <button className="text-link" type="button" onClick={copyEmail}>复制邮箱 <span aria-hidden="true">↗</span></button>
                <span className="copy-feedback" role="status" aria-live="polite">{copyMessage}</span>
              </div>
              <a className="contact-card" href={profile.telegram} target="_blank" rel="noreferrer"
                onClick={() => void trackEvent('contact_click', 'telegram', 'contact')}>
                <span className="contact-channel"><ContactLogo app="telegram" />TELEGRAM</span>
                <strong>@ai_tianzheng</strong>
                <span className="text-link">发消息 <span aria-hidden="true">↗</span></span>
              </a>
              <a className="contact-card" href={profile.x} target="_blank" rel="noreferrer"
                onClick={() => void trackEvent('content_click', 'x', 'contact')}>
                <span className="contact-channel"><ContactLogo app="x" />X / 内容与交流</span>
                <strong>@ai_tianzheng</strong>
                <span className="text-link">前往个人主页 <span aria-hidden="true">↗</span></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer page-shell">
        <span>天正 / AI Lab</span>
        <div>
          {projects.map((project) => <a key={project.id} href={project.href} target="_blank" rel="noreferrer"
            onClick={() => void trackEvent('service_click', project.id, 'footer')}>{project.name} ↗</a>)}
          <a href="#wechat" onClick={() => void trackEvent('contact_click', 'wechat', 'footer')}>微信</a>
          <a href={`mailto:${profile.email}`} onClick={() => void trackEvent('contact_click', 'email', 'footer')}>邮件</a>
          <a href={profile.telegram} target="_blank" rel="noreferrer" onClick={() => void trackEvent('contact_click', 'telegram', 'footer')}>Telegram</a>
          <a href={profile.x} target="_blank" rel="noreferrer" onClick={() => void trackEvent('content_click', 'x', 'footer')}>X</a>
        </div>
      </footer>
    </main>
  );
}
