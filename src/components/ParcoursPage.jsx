import { experience } from '../data/experience';
import { translations, ui } from '../data/ui';
import { useReveal } from './useReveal';
import { useTilt } from './useTilt';
import SectionLabel from './SectionLabel';

export default function ParcoursPage({ lang }) {
  const t = translations[lang] || translations.fr;
  const containerRef = useReveal();
  const cardTilt = useTilt({ intensity: 3, lift: 4 });
  const sorted = [...experience].sort((a, b) => b.year - a.year);

  return (
    <div ref={containerRef}>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,15vh,168px) clamp(20px,5vw,64px) clamp(70px,10vw,120px)' }}>
        <div className="reveal">
          <SectionLabel>{ui.nav.parcours[lang]}</SectionLabel>
          <h1 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(38px,6.4vw,76px)', lineHeight: .98, letterSpacing: '-.03em' }}>{ui.sections.journey[lang]}</h1>
          <p style={{ margin: '18px 0 0', color: 'var(--mut)', fontSize: 'clamp(15px,1.7vw,18px)', maxWidth: '56ch', lineHeight: 1.6 }}>{t.parcoursIntro}</p>
        </div>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {sorted.map((e, i) => (
            <article key={i} className="reveal" {...cardTilt} style={{
              background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
              padding: 'clamp(20px,2.6vw,32px)', display: 'flex', flexWrap: 'wrap',
              gap: '18px 34px', boxShadow: '0 2px 8px -3px rgba(11,11,15,.08)',
              transformStyle: 'preserve-3d',
              transition: 'opacity .7s cubic-bezier(.2,.8,.2,1), transform .28s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s'
            }}>
              <div style={{ flex: '0 0 auto', minWidth: 150 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ac)', letterSpacing: '.04em' }}>{e.period}</div>
                {e.current && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 10, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ac)', animation: 'pulse 1.6s infinite' }} />
                    {t.actuel}
                  </span>
                )}
                <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>{e.type}</div>
              </div>
              <div style={{ flex: '1 1 320px', minWidth: 'min(100%,280px)' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 'clamp(19px,2.2vw,23px)' }}>{e.role}</h3>
                <div style={{ marginTop: 3, fontWeight: 500 }}>{e.company}</div>
                {e.note && <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mut)', marginTop: 2 }}>{e.note}</div>}
                <p style={{ margin: '14px 0', color: 'var(--mut)', lineHeight: 1.6, maxWidth: '64ch' }}>{e.summary[lang]}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
                  {(e.highlights[lang] || e.highlights.fr).map(h => (
                    <span key={h} className="highlight-tag">{h}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {e.stack.map(tg => <span key={tg} className="tag">{tg}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
