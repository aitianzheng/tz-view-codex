'use client';

import { useEffect, useState } from 'react';

// 在这里集中替换你的个人资料、作品和联系方式即可。
const profile = {
  name: '天正',
  monogram: 'TZ',
  brand: 'AI Lab',
  headline: 'AI 内容\n产品与服务',
  intro: '我是天正，一名独立创作者与 AI 实践者。正在用 AI 做内容、做产品，也经营 TZ Mall AI 代充 / 充值服务；代码与开发是我把想法落地的方法。',
  identity: 'AI CONTENT · PRODUCT PRACTICE · DIGITAL SERVICES',
  email: 'aitianzheng@gmail.com',
  wechatName: '天正',
  x: 'https://x.com/ai_tianzheng',
  xHandle: '@ai_tianzheng',
  telegram: 'https://t.me/ai_tianzheng',
  telegramHandle: '@ai_tianzheng',
  mall: 'https://tz-mall.com',
};

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'works', label: '内容与项目' },
  { id: 'services', label: '服务' },
  { id: 'contact', label: '联系我' },
];

const focusAreas = [
  { title: 'AI 内容', text: '围绕 AI 工具、工作流与真实使用问题持续记录。' },
  { title: '产品实践', text: '把想法拆成可以运行、可以继续迭代的产品与工作方式。' },
  { title: '数字服务', text: '正在经营 TZ Mall，为 AI 用户提供代充与充值服务入口。' },
];

const contentTopics = [
  { title: 'AI 工具与订阅', summary: '关注工具选择、开通续费、支付问题与账号使用中的真实体验。', meta: '持续记录', tag: 'AI TOOLS' },
  { title: '产品与工作流', summary: '记录如何把一次性尝试整理成可重复使用的流程，并把想法推进成可运行的产品。', meta: '持续实践', tag: 'PRODUCT' },
  { title: '内容与知识系统', summary: '探索选题、写作、素材整理与知识管理如何更自然地和 AI 协作。', meta: '内容方向', tag: 'CONTENT' },
  { title: '自动化与实现', summary: '从重复工作中寻找可自动化的环节，用 AI、代码与工具完成落地。', meta: '实现能力', tag: 'AUTOMATION' },
];

const services = [
  { status: '运营中', live: true, title: 'TZ Mall AI 代充 / 充值', text: '提供 AI 产品的订阅开通、续费与充值服务，可直接前往 TZ Mall 查看当前项目与服务说明。', action: '前往 TZ Mall', href: profile.mall, external: true },
  { status: '欢迎交流', live: false, title: 'AI 内容与产品交流', text: '如果你也在做 AI 内容、产品或数字服务，欢迎交流实践、需求与可能的合作。', action: '联系我', href: '#contact', external: false },
];

const serviceScopes = [
  { label: '服务入口', value: 'TZ Mall AI 代充 / 充值服务站' },
  { label: '服务内容', value: 'AI 产品订阅开通、续费与充值' },
  { label: '当前范围', value: '具体产品与可用服务以 TZ Mall 页面为准' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${profile.name} ${profile.brand} 首页`}>
          <span className="brand-mark" aria-hidden="true" />
          <span>{profile.name} / {profile.brand}</span>
        </a>
        <nav className="nav" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={`${activeSection === item.id ? 'is-active' : ''} ${item.id === 'contact' ? 'nav-cta' : ''}`}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero page-shell story-section" id="home">
        <div className="hero-copy">
          <span className="eyebrow">INDEPENDENT CREATOR · AI PRACTICE</span>
          <h1>
            {profile.headline.split('\n').map((line, index) => (
              <span key={line} className={index === 1 ? 'gold' : ''}>{line}</span>
            ))}
          </h1>
          <p className="hero-lede">{profile.intro}</p>
          <p className="identity-line">{profile.identity}</p>
          <div className="hero-actions">
            <a className="button primary" href={profile.mall} target="_blank" rel="noopener noreferrer">前往 TZ Mall ↗</a>
            <a className="button ghost" href="#contact">微信 / 联系我</a>
          </div>
          <div className="hero-signals" aria-label="关注方向">
            <div><span>01</span><strong>AI 内容</strong></div>
            <div><span>02</span><strong>产品实践</strong></div>
            <div><span>03</span><strong>TZ Mall</strong></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="天正 AI Lab 品牌视觉">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="portrait-card">
            <span className="portrait-kicker">AI IN<br />PRACTICE</span>
            <strong>{profile.monogram}</strong>
            <span className="portrait-label">CONTENT × PRODUCT × SERVICE</span>
          </div>
          <span className="visual-note">01 / INTRO</span>
        </div>
      </section>

      <section className="now-section" aria-labelledby="now-title">
        <div className="page-shell">
          <div className="now-heading">
            <div>
              <p className="section-kicker">WHAT I DO</p>
              <h2 id="now-title">内容、产品与真实服务</h2>
            </div>
            <p>我用 AI 做内容，也围绕产品、工作流与自动化持续实践。代码与开发是把想法落地的工具；TZ Mall 是我目前正在经营的 AI 代充 / 充值服务。</p>
          </div>
          <div className="now-grid">
            {focusAreas.map((area, index) => (
              <article className="now-card" key={area.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section section-block" id="works" aria-labelledby="works-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index">02</span>
            <div>
              <p className="section-kicker">CONTENT, PROJECTS & PRACTICE</p>
              <h2 id="works-title">Works</h2>
              <p>这里呈现我正在经营的真实项目，以及持续投入的 AI 内容与产品实践方向。</p>
            </div>
          </div>
          <a
            className="featured-project"
            href={profile.mall}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="访问 TZ Mall AI 代充与充值服务站（在新窗口打开）"
          >
            <div className="featured-project-copy">
              <span className="work-tag">LIVE DIGITAL SERVICE</span>
              <h3>TZ Mall</h3>
              <p>我正在经营的 AI 代充 / 充值服务站。站内提供当前可用项目与服务说明，是一项真实运行中的数字服务。</p>
            </div>
            <div className="featured-project-meta">
              <span className="status live">正在运营</span>
              <strong>访问服务站 <span aria-hidden="true">↗</span></strong>
            </div>
          </a>
          <div className="work-grid">
            {contentTopics.map((topic, index) => (
              <article className="work-card is-static" key={topic.title}>
                <span className="work-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="work-copy">
                  <span className="work-tag">{topic.tag}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.summary}</p>
                  <span className="work-meta">{topic.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section section-block services-section" id="services" aria-labelledby="services-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index">03</span>
            <div>
              <p className="section-kicker">AVAILABLE NOW & LET&apos;S TALK</p>
              <h2 id="services-title">Services</h2>
              <p>目前可以直接使用的服务，以及欢迎进一步沟通的 AI 内容与产品方向。</p>
            </div>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <span className={`status ${service.live ? 'live' : ''}`}>{service.status}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
                {service.href ? (
                  <a
                    href={service.href}
                    target={service.external ? '_blank' : undefined}
                    rel={service.external ? 'noopener noreferrer' : undefined}
                  >
                    {service.action} <span aria-hidden="true">{service.external ? '↗' : '→'}</span>
                  </a>
                ) : <span className="pending">{service.action}</span>}
              </article>
            ))}
          </div>
          <div className="business-strip" aria-label="TZ Mall 服务说明">
            <span className="business-kicker">TZ MALL SERVICE</span>
            {serviceScopes.map((scope) => (
              <div className="business-item" key={scope.label}>
                <strong>{scope.label}</strong>
                <p>{scope.value}</p>
              </div>
            ))}
          </div>
          <div className="service-cta">
            <div>
              <span>HAVE SOMETHING TO SHARE?</span>
              <h3>想交流 AI 内容、产品或数字服务？欢迎联系。</h3>
            </div>
            <a className="button primary" href="#contact">联系我</a>
          </div>
        </div>
      </section>

      <section className="story-section section-block contact-section" id="contact" aria-labelledby="contact-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index">04</span>
            <div>
              <p className="section-kicker">LET&apos;S CONNECT</p>
              <h2 id="contact-title">Contact</h2>
              <p>想交流 AI 内容、产品或数字服务，或咨询 TZ Mall 相关问题，欢迎通过微信、邮件、X 或 Telegram 联系我。</p>
            </div>
          </div>
          <div className="contact-board">
            <div className="wechat-card">
              <div className="wechat-copy">
                <img className="contact-logo" src="/icons/wechat.svg" width="52" height="52" alt="" aria-hidden="true" />
                <p>WECHAT</p>
                <h3>{profile.wechatName}</h3>
                <span>扫码添加天正，简单注明来意即可</span>
              </div>
              <div className="wechat-qr">
                <img src="/wechat-tianzheng.png" width="354" height="358" alt="天正的微信二维码" />
              </div>
            </div>
            <div className="contact-links">
              <a className="contact-card" href={`mailto:${profile.email}`}>
                <img className="contact-logo contact-logo-gmail" src="/icons/gmail.svg" width="46" height="46" alt="" aria-hidden="true" />
                <span><strong>Gmail</strong><em>{profile.email}</em></span>
                <span className="contact-go">↗</span>
              </a>
              <a className="contact-card" href={profile.x} target="_blank" rel="noopener noreferrer">
                <img className="contact-logo contact-logo-x" src="/icons/x.svg" width="46" height="46" alt="" aria-hidden="true" />
                <span><strong>X</strong><em>{profile.xHandle}</em></span>
                <span className="contact-go">↗</span>
              </a>
              <a className="contact-card" href={profile.telegram} target="_blank" rel="noopener noreferrer">
                <img className="contact-logo" src="/icons/telegram.svg" width="46" height="46" alt="" aria-hidden="true" />
                <span><strong>Telegram</strong><em>{profile.telegramHandle}</em></span>
                <span className="contact-go">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer page-shell">
        <span>{profile.name} / {profile.brand}</span>
        <span>AI CONTENT · PRODUCTS · DIGITAL SERVICES</span>
        <div>
          <a href={profile.mall} target="_blank" rel="noopener noreferrer">TZ Mall</a>
          <a href="#contact">WeChat</a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href={profile.x} target="_blank" rel="noopener noreferrer">X</a>
        </div>
      </footer>
    </main>
  );
}
