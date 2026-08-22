'use client';

import { useEffect, useState } from 'react';

// 在这里集中替换你的个人资料、作品和联系方式即可。
const profile = {
  name: 'TZ',
  brand: 'AI Lab',
  headline: '把想法变成\n真实作品',
  intro: '独立创作者与 AI 实践者。记录产品、内容与自动化从想法走向落地的全过程。',
  identity: 'BUILDER · CREATOR · EXPLORER',
  email: 'aitianzheng@gmail.com',
  wechatName: '天正',
  x: 'https://x.com/ai_tianzheng',
  xHandle: '@ai_tianzheng',
  telegram: 'https://t.me/ai_tianzheng',
  telegramHandle: '@ai_tianzheng',
  github: 'https://github.com/yourname',
};

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'works', label: '作品' },
  { id: 'services', label: '服务' },
  { id: 'contact', label: '联系我' },
];

const works = [
  { title: 'AI 工作流：从混乱到可复用', summary: '把一次性的提示词，整理成团队可以长期迭代的稳定工作流。', date: '2026-08-12', tag: 'AI WORKFLOW' },
  { title: '一个独立产品如何从 0 到 1', summary: '从需求判断、原型验证到上线复盘，一份不绕弯路的实战记录。', date: '2026-07-28', tag: 'PRODUCT' },
  { title: '一人公司的内容操作系统', summary: '用结构化素材库连接选题、写作、发布与复盘，让内容持续生长。', date: '2026-07-06', tag: 'CONTENT' },
  { title: '让 AI 接管重复但重要的工作', summary: '识别高频摩擦，设计可靠边界，再把自动化真正接入日常业务。', date: '2026-06-19', tag: 'AUTOMATION' },
  { title: '个人知识库不是资料仓库', summary: '让资料能够被检索、组合和行动，而不是安静地堆在文件夹里。', date: '2026-05-30', tag: 'KNOWLEDGE' },
  { title: '创作者实验日志：第 01 期', summary: '公开记录这个月做了什么、学到什么，以及下一步准备验证什么。', date: '2026-05-08', tag: 'BUILD IN PUBLIC' },
];

const services = [
  { status: '开放中', live: true, title: 'AI 工作流咨询', text: '梳理业务里的重复劳动，设计适合个人或小团队的 AI 工作方式。', action: '预约沟通' },
  { status: '可预约', live: true, title: '个人品牌网站', text: '从定位、信息结构到设计与上线，交付一个真正属于你的数字门面。', action: '了解方案' },
  { status: '筹备中', live: false, title: '内容系统搭建', text: '把旧素材、选题和案例整理为可持续复用、可由 Agent 维护的内容资产。', action: '即将开放' },
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
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero page-shell story-section" id="home">
        <div className="hero-copy">
          <span className="eyebrow">PERSONAL STUDIO · 2026</span>
          <h1>
            {profile.headline.split('\n').map((line, index) => (
              <span key={line} className={index === 1 ? 'gold' : ''}>{line}</span>
            ))}
          </h1>
          <p className="hero-lede">{profile.intro}</p>
          <p className="identity-line">{profile.identity}</p>
          <div className="hero-actions">
            <a className="button primary" href="#works">阅读作品</a>
            <a className="button ghost" href="#contact">合作咨询</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="个人品牌视觉占位，可替换为你的头像">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="portrait-card">
            <span className="portrait-kicker">CREATIVE<br />INTELLIGENCE</span>
            <strong>{profile.name}</strong>
            <span className="portrait-label">AI × DESIGN × PRODUCT</span>
          </div>
          <span className="visual-note">01 / INTRO</span>
        </div>
      </section>

      <section className="story-section section-block" id="works" aria-labelledby="works-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index">02</span>
            <div>
              <p className="section-kicker">SELECTED NOTES & PROJECTS</p>
              <h2 id="works-title">Works</h2>
              <p>近期公开写作与实践记录，持续更新我真正做过的项目。</p>
            </div>
          </div>
          <div className="work-grid">
            {works.map((work, index) => (
              <a className="work-card" href="#contact" key={work.title} aria-label={`查看作品：${work.title}`}>
                <span className="work-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="work-copy">
                  <span className="work-tag">{work.tag}</span>
                  <h3>{work.title}</h3>
                  <p>{work.summary}</p>
                  <span className="work-date">{work.date}</span>
                </div>
                <span className="circle-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section section-block services-section" id="services" aria-labelledby="services-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index">03</span>
            <div>
              <p className="section-kicker">HOW WE CAN WORK TOGETHER</p>
              <h2 id="services-title">Services</h2>
              <p>把实践中验证过的方法，变成可交付的产品与服务。</p>
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
                {service.live ? <a href="#contact">{service.action} <span>→</span></a> : <span className="pending">{service.action}</span>}
              </article>
            ))}
          </div>
          <div className="service-cta">
            <div>
              <span>HAVE A PROJECT IN MIND?</span>
              <h3>有一个具体问题，直接聊聊。</h3>
            </div>
            <a className="button primary" href="#contact">发起合作</a>
          </div>
        </div>
      </section>

      <section className="story-section section-block contact-section" id="contact" aria-labelledby="contact-title">
        <div className="page-shell">
          <div className="section-intro">
            <span className="section-index">04</span>
            <div>
              <p className="section-kicker">LET&apos;S MAKE SOMETHING REAL</p>
              <h2 id="contact-title">Contact</h2>
              <p>欢迎交流 AI 应用、产品设计、个人品牌与内容系统。</p>
            </div>
          </div>
          <div className="contact-board">
            <div className="contact-links">
              <a className="contact-card" href={`mailto:${profile.email}`}>
                <img className="contact-logo contact-logo-gmail" src="/icons/gmail.svg" width="46" height="46" alt="" aria-hidden="true" />
                <span><strong>Gmail</strong><em>{profile.email}</em></span>
                <span className="contact-go">↗</span>
              </a>
              <a className="contact-card" href={profile.x} target="_blank" rel="noreferrer">
                <img className="contact-logo contact-logo-x" src="/icons/x.svg" width="46" height="46" alt="" aria-hidden="true" />
                <span><strong>X</strong><em>{profile.xHandle}</em></span>
                <span className="contact-go">↗</span>
              </a>
              <a className="contact-card" href={profile.telegram} target="_blank" rel="noreferrer">
                <img className="contact-logo" src="/icons/telegram.svg" width="46" height="46" alt="" aria-hidden="true" />
                <span><strong>Telegram</strong><em>{profile.telegramHandle}</em></span>
                <span className="contact-go">↗</span>
              </a>
            </div>
            <div className="wechat-card">
              <div className="wechat-copy">
                <img className="contact-logo" src="/icons/wechat.svg" width="52" height="52" alt="" aria-hidden="true" />
                <p>WECHAT</p>
                <h3>{profile.wechatName}</h3>
                <span>扫码添加我为微信好友</span>
              </div>
              <div className="wechat-qr">
                <img src="/wechat-tianzheng.png" width="354" height="358" alt="天正的微信二维码" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer page-shell">
        <span>{profile.name} / {profile.brand}</span>
        <span>© 2026 BUILT WITH INTENTION</span>
        <div><a href={profile.github}>GitHub</a><a href={profile.x}>X</a></div>
      </footer>
    </main>
  );
}
