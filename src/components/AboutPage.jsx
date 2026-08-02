import { useEffect } from 'react';
import { profile } from '../data/profile';
import { skills, skillsKeys } from '../data/skills';
import { stack } from '../data/stack';
import { awards, education } from '../data/education';
import { translations, ui } from '../data/ui';
import { useReveal } from './useReveal';
import { useTilt } from './useTilt';
import SectionLabel from './SectionLabel';

export default function AboutPage({ lang }) {
  const t = translations[lang] || translations.fr;
  const containerRef = useReveal();
  const cardTilt = useTilt({ intensity: 6, lift: 5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-skill]').forEach(el => {
        el.style.width = (el.getAttribute('data-skill') || 0) + '%';
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [lang]);

  const kindLabels = { cert: lang === 'fr' ? 'Certification' : 'Certification', diploma: lang === 'fr' ? 'Diplôme' : 'Diploma', internship: lang === 'fr' ? 'Stage' : 'Internship' };

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,15vh,168px) clamp(20px,5vw,64px) clamp(40px,6vw,70px)' }}>
        <div className="reveal"><SectionLabel>{ui.nav.about[lang]}</SectionLabel></div>
        <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 'clamp(30px,5vw,64px)', alignItems: 'center' }}>
          <div className="reveal" style={{ flex: '0 1 340px', minWidth: 'min(100%,260px)', position: 'relative' }}>
            {/* Photo sans fond — posée sur l'animation de la page */}
            <img src={profile.photo} alt={profile.name} style={{ display: 'block', width: '100%', height: 'auto', filter: 'drop-shadow(0 24px 44px rgba(11,11,15,.26))' }} />
            <div style={{ position: 'absolute', top: -12, right: -12, width: 56, height: 56, borderTop: '2px solid var(--ac)', borderRight: '2px solid var(--ac)', borderRadius: '0 12px 0 0' }} />
          </div>
          <div className="reveal" style={{ flex: '1 1 420px', minWidth: 'min(100%,300px)' }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(30px,4.6vw,52px)', lineHeight: 1.02, letterSpacing: '-.02em' }}>
              {t.aboutIntro}
            </h1>
            <p style={{ margin: '22px 0 0', color: 'var(--mut)', fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.7, maxWidth: '60ch' }}>
              {profile.bio[lang]}
            </p>
            <div style={{ marginTop: 24, padding: '20px 22px', borderLeft: '2px solid var(--ac)', background: 'var(--ac-s)', borderRadius: '0 12px 12px 0', fontSize: 'clamp(15px,1.7vw,18px)', lineHeight: 1.5, fontStyle: 'italic' }}>
              "{profile.quote[lang]}"
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px,9vw,110px) clamp(20px,5vw,64px)' }}>
          <div className="reveal">
            <SectionLabel>{ui.sections.skills[lang]}</SectionLabel>
            <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(28px,4.4vw,48px)', letterSpacing: '-.02em' }}>{ui.sections.skills[lang]}</h2>
          </div>
          <div style={{ marginTop: 38, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(16px,2vw,26px)' }}>
            {skills.map((cat, ci) => (
              <div key={ci} className="reveal" {...cardTilt} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: 'clamp(22px,2.4vw,30px)', transformStyle: 'preserve-3d', transition: 'opacity .7s cubic-bezier(.2,.8,.2,1), transform .28s cubic-bezier(.2,.8,.2,1)', boxShadow: '0 2px 6px -2px rgba(11,11,15,.06)' }}>
                <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ac)' }}>{cat.category[lang]}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {cat.items.map(s => (
                    <div key={s.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mut)' }}>{s.value}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <span className="skill-bar-fill" data-skill={s.value} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(16px,2vw,26px)' }}>
            <div className="reveal" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: 'clamp(22px,2.4vw,30px)' }}>
              <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ac)' }}>{t.keyComp}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skillsKeys.keyCompetencies.map(c => (
                  <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: 12, padding: '8px 13px', border: '1px solid var(--line)', borderRadius: 20, background: 'var(--panel)' }}>{c}</span>
                ))}
              </div>
            </div>
            <div className="reveal" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: 'clamp(22px,2.4vw,30px)' }}>
              <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ac)' }}>{t.softSkills}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(skillsKeys.softSkills[lang] || skillsKeys.softSkills.fr).map(c => (
                  <span key={c} style={{ fontSize: 13, padding: '8px 13px', border: '1px solid var(--line)', borderRadius: 20, background: 'var(--panel)' }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full tech stack — exhaustive */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px,9vw,110px) clamp(20px,5vw,64px)' }}>
        <div className="reveal">
          <SectionLabel>{ui.sections.stack[lang]}</SectionLabel>
          <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(28px,4.4vw,48px)', letterSpacing: '-.02em' }}>
            {lang === 'fr' ? 'Toutes les technologies que je maîtrise' : 'Every technology I work with'}
          </h2>
        </div>
        <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(16px,2vw,24px)' }}>
          {stack.map((g, gi) => (
            <div key={gi} className="reveal" {...cardTilt} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: 'clamp(20px,2.2vw,26px)', transformStyle: 'preserve-3d', transition: 'opacity .7s cubic-bezier(.2,.8,.2,1), transform .28s cubic-bezier(.2,.8,.2,1)', boxShadow: '0 2px 6px -2px rgba(11,11,15,.06)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ac)' }}>{g.group[lang]}</h3>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {g.items.map(it => (
                  <span key={it} style={{ fontFamily: 'var(--mono)', fontSize: 12, padding: '6px 12px', border: '1px solid var(--line)', borderRadius: 8, background: 'var(--panel)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Awards */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(20px,4vw,60px) clamp(20px,5vw,64px) clamp(60px,9vw,110px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(30px,4vw,60px)' }}>
          <div className="reveal">
            <SectionLabel>{ui.sections.academic[lang]}</SectionLabel>
            <h2 style={{ margin: '18px 0 28px', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-.02em' }}>{ui.sections.academic[lang]}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[...education].sort((a, b) => b.year - a.year).map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '15px 18px', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--paper)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mut)', minWidth: 44 }}>{e.hideDate ? '' : e.year}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                      <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 15, lineHeight: 1.25 }}>{e.title[lang]}</h3>
                      {e.status && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ac)', border: '1px solid var(--ac)', padding: '2px 7px', borderRadius: 20 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ac)', animation: 'pulse 1.6s infinite' }} />
                          {e.status[lang]}
                        </span>
                      )}
                    </div>
                    {e.org && <div style={{ color: 'var(--mut)', fontSize: 12.5, marginTop: 2 }}>{e.org} · {kindLabels[e.kind]}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <SectionLabel>{ui.sections.awards[lang]}</SectionLabel>
            <h2 style={{ margin: '18px 0 28px', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-.02em' }}>{ui.sections.awards[lang]}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...awards].sort((a, b) => b.year - a.year).map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: 20, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--paper)', transition: '.3s' }}>
                  <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 26, color: 'var(--ac)', letterSpacing: '-.02em', minWidth: 66 }}>{a.year}</div>
                  <div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mut)' }}>{a.type[lang]}</span>
                    <h3 style={{ margin: '5px 0 3px', fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 17, lineHeight: 1.25 }}>{a.title[lang]}</h3>
                    <div style={{ color: 'var(--mut)', fontSize: 13 }}>{a.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
