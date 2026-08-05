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

  // regrouper les postes consécutifs d'une même entreprise (ex : les 2 postes chez AGL)
  const groups = [];
  sorted.forEach(e => {
    const last = groups[groups.length - 1];
    if (last && last.company === e.company) last.roles.push(e);
    else groups.push({ company: e.company, roles: [e] });
  });

  // corps d'un poste (résumé, faits marquants, stack)
  const RoleBody = ({ e }) => (
    <>
      <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 'clamp(18px,2.1vw,22px)' }}>{e.role}</h3>
      {e.note && <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mut)', marginTop: 3 }}>{e.note}</div>}
      <p style={{ margin: '12px 0', color: 'var(--mut)', lineHeight: 1.6, maxWidth: '64ch' }}>{e.summary[lang]}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
        {(e.highlights[lang] || e.highlights.fr).map(h => <span key={h} className="highlight-tag">{h}</span>)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {e.stack.map(tg => <span key={tg} className="tag">{tg}</span>)}
      </div>
    </>
  );

  const CurrentBadge = () => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ac)', animation: 'pulse 1.6s infinite' }} />
      {t.actuel}
    </span>
  );

  const cardStyle = {
    background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
    padding: 'clamp(20px,2.6vw,32px)', boxShadow: '0 2px 8px -3px rgba(11,11,15,.08)',
    transformStyle: 'preserve-3d',
    transition: 'opacity .7s cubic-bezier(.2,.8,.2,1), transform .28s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s'
  };

  return (
    <div ref={containerRef}>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,15vh,168px) clamp(20px,5vw,64px) clamp(70px,10vw,120px)' }}>
        <div className="reveal">
          <SectionLabel>{ui.nav.parcours[lang]}</SectionLabel>
          <h1 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(38px,6.4vw,76px)', lineHeight: .98, letterSpacing: '-.03em' }}>{ui.sections.journey[lang]}</h1>
          <p style={{ margin: '18px 0 0', color: 'var(--mut)', fontSize: 'clamp(15px,1.7vw,18px)', maxWidth: '56ch', lineHeight: 1.6 }}>{t.parcoursIntro}</p>
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {groups.map((g, gi) => {
            // ── entreprise avec UN seul poste : carte classique 2 colonnes ──
            if (g.roles.length === 1) {
              const e = g.roles[0];
              return (
                <article key={gi} className="reveal" {...cardTilt} style={{ ...cardStyle, display: 'flex', flexWrap: 'wrap', gap: '18px 34px' }}>
                  <div style={{ flex: '0 0 auto', minWidth: 150 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ac)', letterSpacing: '.04em' }}>{e.period}</div>
                    {e.current && <div style={{ marginTop: 10 }}><CurrentBadge /></div>}
                    <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>{e.type}</div>
                  </div>
                  <div style={{ flex: '1 1 320px', minWidth: 'min(100%,280px)' }}>
                    <div style={{ marginBottom: 3, fontWeight: 500 }}>{e.company}</div>
                    <RoleBody e={e} />
                  </div>
                </article>
              );
            }

            // ── entreprise avec PLUSIEURS postes : une carte + timeline ──
            const anyCurrent = g.roles.some(r => r.current);
            return (
              <article key={gi} className="reveal" {...cardTilt} style={cardStyle}>
                {/* en-tête entreprise */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 14px', marginBottom: 6 }}>
                  <h2 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(20px,2.6vw,28px)', letterSpacing: '-.01em' }}>{g.company}</h2>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)', border: '1px solid var(--line)', borderRadius: 20, padding: '3px 10px' }}>
                    {g.roles.length} {lang === 'fr' ? 'postes' : 'roles'}
                  </span>
                  {anyCurrent && <CurrentBadge />}
                </div>

                {/* timeline des postes */}
                <div style={{ marginTop: 18 }}>
                  {g.roles.map((e, ri) => {
                    const last = ri === g.roles.length - 1;
                    return (
                      <div key={ri} style={{ display: 'flex', gap: 18, position: 'relative' }}>
                        {/* rail : pastille + trait vertical */}
                        <div style={{ position: 'relative', flex: '0 0 auto', width: 16 }}>
                          <span style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 13, height: 13, borderRadius: '50%', background: e.current ? 'var(--ac)' : 'var(--paper)', border: '2px solid var(--ac)', zIndex: 1 }} />
                          {!last && <span style={{ position: 'absolute', top: 16, bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 2, background: 'var(--line)' }} />}
                        </div>
                        {/* contenu du poste */}
                        <div style={{ flex: 1, paddingBottom: last ? 0 : 30, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ac)', letterSpacing: '.04em' }}>{e.period}</span>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)', border: '1px solid var(--line)', borderRadius: 20, padding: '2px 9px' }}>{e.type}</span>
                            {e.current && <CurrentBadge />}
                          </div>
                          <RoleBody e={e} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
