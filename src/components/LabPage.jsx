import { useState } from 'react';
import { lab } from '../data/lab';
import { translations, ui } from '../data/ui';
import { useReveal } from './useReveal';
import { useTilt } from './useTilt';
import SectionLabel from './SectionLabel';
import Lab3D from './Lab3D';

const TOUR_URL = 'https://app.lapentor.com/sphere/my-world-thuran-junior';

export default function LabPage({ lang }) {
  const t = translations[lang] || translations.fr;
  const containerRef = useReveal();
  const cardTilt = useTilt({ intensity: 9, lift: 7 });
  const [morph, setMorph] = useState(0);

  return (
    <div ref={containerRef}>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,15vh,168px) clamp(20px,5vw,64px) clamp(40px,6vw,80px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }}>
        <div className="reveal" style={{ flex: '1 1 380px', minWidth: 'min(100%,300px)' }}>
          <SectionLabel>{ui.nav.lab[lang]}</SectionLabel>
          <h1 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(38px,6.4vw,76px)', lineHeight: .98, letterSpacing: '-.03em' }}>{ui.sections.lab[lang]}</h1>
          <p style={{ margin: '20px 0 0', color: 'var(--mut)', fontSize: 'clamp(15px,1.7vw,18px)', maxWidth: '52ch', lineHeight: 1.65 }}>{t.labIntro}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 26, alignItems: 'center' }}>
            <button onClick={() => setMorph(m => m + 1)} style={{ padding: '13px 22px', background: 'var(--ink)', color: 'var(--ink-fg)', border: 'none', borderRadius: 24, fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer', transition: '.25s' }}>
              {t.labSwap} ⟳
            </button>
            <span style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--mut)' }}>{t.labHint}</span>
          </div>
        </div>
        <div className="reveal" style={{
          flex: '1 1 420px', minWidth: 'min(100%,300px)', position: 'relative',
          height: 'clamp(360px,52vh,520px)', border: '1px solid var(--line)', borderRadius: 22, overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 45%, var(--panel), transparent 74%)'
        }}>
          <Lab3D morphSignal={morph} />
          <div style={{ position: 'absolute', left: 16, top: 14, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)', pointerEvents: 'none' }}>WebGL · temps réel</div>
        </div>
      </section>

      {/* Visite virtuelle 360° — embarquée en iframe + ouverture plein écran */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px) clamp(40px,6vw,70px)' }}>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <SectionLabel>{lang === 'fr' ? 'Visite virtuelle' : 'Virtual tour'}</SectionLabel>
            <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(26px,3.6vw,44px)', letterSpacing: '-.02em' }}>
              {lang === 'fr' ? 'Ma visite virtuelle 360°' : 'My 360° virtual tour'}
            </h2>
          </div>
          <a href={TOUR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 24px', background: 'var(--ink)', color: 'var(--ink-fg)', border: 'none', borderRadius: 26, fontFamily: 'var(--mono)', fontSize: 13, cursor: 'pointer', transition: '.25s' }}>
            {lang === 'fr' ? 'Ouvrir en plein écran' : 'Open fullscreen'} ↗
          </a>
        </div>
        <div className="reveal" style={{ marginTop: 26, position: 'relative', borderRadius: 22, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--panel)', boxShadow: '0 30px 70px -44px rgba(11,11,15,.45)' }}>
          <iframe
            src={TOUR_URL}
            title={lang === 'fr' ? 'Visite virtuelle 360°' : '360° virtual tour'}
            style={{ display: 'block', width: '100%', height: 'clamp(440px,72vh,760px)', border: 0 }}
            allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen; autoplay"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px) clamp(70px,10vw,120px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 'clamp(14px,1.8vw,24px)' }}>
          {lab.map(x => (
            <article key={x.id} className="reveal card" {...cardTilt} style={{ padding: 'clamp(22px,2.4vw,30px)' }}>
              <span style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.12em', color: 'var(--ac)', border: '1px solid var(--ac)', padding: '5px 11px', borderRadius: 20, whiteSpace: 'nowrap' }}>{x.tag}</span>
              <h3 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 22, lineHeight: 1.15 }}>{x.title[lang]}</h3>
              <p style={{ margin: '12px 0 16px', color: 'var(--mut)', fontSize: 14.5, lineHeight: 1.6 }}>{x.desc[lang]}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {x.stack.map(tg => <span key={tg} className="tag">{tg}</span>)}
              </div>
              {x.link ? (
                <a href={x.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)' }}>
                  {t.vrCta} ↗
                </a>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>{t.vrPending}</span>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
