import { useState } from 'react';
import { projects } from '../data/projects';
import { translations, ui } from '../data/ui';
import { useReveal } from './useReveal';
import { useTilt } from './useTilt';
import SectionLabel from './SectionLabel';

export default function ProjectsPage({ lang }) {
  const t = translations[lang] || translations.fr;
  const containerRef = useReveal();
  const [filter, setFilter] = useState('all');
  const cardTilt = useTilt({ intensity: 8, lift: 7 });

  const sorted = [...projects].sort((a, b) => {
    const pa = a.pin ?? Infinity, pb = b.pin ?? Infinity;
    if (pa !== pb) return pa - pb;   // projets épinglés en tête, dans l'ordre du pin
    return b.year - a.year;          // puis du plus récent au plus ancien
  });
  const filtered = filter === 'all' ? sorted : sorted.filter(p => p.category === filter);

  const counts = { all: projects.length, app: projects.filter(p => p.category === 'app').length, web: projects.filter(p => p.category === 'web').length };
  const tabs = [
    { key: 'all', label: lang === 'fr' ? 'Tous' : 'All', count: counts.all },
    { key: 'app', label: 'Apps', count: counts.app },
    { key: 'web', label: 'Web', count: counts.web },
  ];

  return (
    <div ref={containerRef}>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,15vh,168px) clamp(20px,5vw,64px) clamp(70px,10vw,120px)' }}>
        <div className="reveal">
          <SectionLabel>{ui.nav.projects[lang]}</SectionLabel>
          <h1 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(38px,6.4vw,76px)', lineHeight: .98, letterSpacing: '-.03em' }}>{ui.sections.projects[lang]}</h1>
          <p style={{ margin: '18px 0 0', color: 'var(--mut)', fontSize: 'clamp(15px,1.7vw,18px)', maxWidth: '56ch', lineHeight: 1.6 }}>{t.projectsIntro}</p>
          <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tabs.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{
                padding: '10px 18px', border: `1px solid ${filter === f.key ? 'var(--ink)' : 'var(--line)'}`,
                background: filter === f.key ? 'var(--ink)' : 'transparent',
                color: filter === f.key ? 'var(--ink-fg)' : 'var(--mut)',
                borderRadius: 22, fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer', transition: '.2s'
              }}>
                {f.label} <span style={{ opacity: .55 }}>{f.count}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 'clamp(14px,1.8vw,24px)' }}>
          {filtered.map((p, i) => (
            <article key={i} className="reveal card" {...cardTilt} style={{ padding: 13 }}>
              <div style={{
                position: 'relative', aspectRatio: '16/10', borderRadius: 11, overflow: 'hidden',
                background: 'linear-gradient(135deg,var(--ac-s),rgba(11,11,15,.05))', display: 'grid', placeItems: 'center'
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(11,11,15,.05) 0 2px,transparent 2px 13px)' }} />
                <span style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 66, color: 'var(--faint)' }}>{p.title[0]}</span>
                <span style={{ position: 'absolute', top: 10, right: 12, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>{p.year}</span>
                {p.private && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,11,15,.66)', backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <div style={{ position: 'relative', width: 26, height: 20 }}>
                      <span style={{ position: 'absolute', left: '50%', top: -11, transform: 'translateX(-50%)', width: 15, height: 15, border: '3px solid #fff', borderBottom: 'none', borderRadius: '8px 8px 0 0' }} />
                      <span style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: 5 }} />
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.14em', color: '#fff' }}>{t.private} · NDA</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '14px 8px 8px' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 19 }}>{p.title}</h3>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ac)', marginTop: 3 }}>{p.client}</div>
                <p style={{ margin: '10px 0 12px', color: 'var(--mut)', fontSize: 14, lineHeight: 1.5 }}>{p.description[lang]}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tech.map(tg => <span key={tg} className="tag">{tg}</span>)}
                </div>
                {p.link && !p.private && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 14, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)' }}>
                    {t.visit} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
