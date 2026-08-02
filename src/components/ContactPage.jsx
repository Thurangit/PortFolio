import { useState } from 'react';
import { profile } from '../data/profile';
import { social } from '../data/social';
import { translations, ui } from '../data/ui';
import { useReveal } from './useReveal';
import SectionLabel from './SectionLabel';

export default function ContactPage({ lang }) {
  const t = translations[lang] || translations.fr;
  const containerRef = useReveal();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={containerRef}>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,15vh,168px) clamp(20px,5vw,64px) clamp(70px,10vw,120px)' }}>
        <div className="reveal"><SectionLabel>{ui.nav.contact[lang]}</SectionLabel></div>
        <h1 className="reveal" style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(36px,6.4vw,78px)', lineHeight: .98, letterSpacing: '-.03em', maxWidth: '15ch' }}>
          {t.contactIntro}
        </h1>
        <div style={{ marginTop: 46, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(26px,4vw,56px)' }}>
          <div className="reveal">
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--mut)' }}>
                  {t.formName}
                  <input required style={{ padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--paper)', fontSize: 15, color: 'var(--ink)', outline: 'none' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--mut)' }}>
                  {t.formEmail}
                  <input required type="email" style={{ padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--paper)', fontSize: 15, color: 'var(--ink)', outline: 'none' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--mut)' }}>
                  {t.formMsg}
                  <textarea required rows={5} style={{ padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--paper)', fontSize: 15, resize: 'vertical', color: 'var(--ink)', outline: 'none' }} />
                </label>
                <button type="submit" style={{ alignSelf: 'flex-start', padding: '15px 28px', background: 'var(--ink)', color: 'var(--ink-fg)', border: 'none', borderRadius: 26, fontFamily: 'var(--mono)', fontSize: 13, cursor: 'pointer', transition: '.25s' }}>
                  {t.formSend} →
                </button>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>{t.formNote}</div>
              </form>
            ) : (
              <div style={{ padding: 40, border: '1px solid var(--ac)', borderRadius: 18, background: 'var(--ac-s)', animation: 'rise .4s both' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ac)' }}>✓ ok</div>
                <p style={{ margin: '12px 0 0', fontSize: 20, fontWeight: 600, lineHeight: 1.4 }}>{t.formSent}</p>
              </div>
            )}
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14, perspective: '1000px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mut)' }}>
              {profile.availability[lang]} · {profile.location[lang]}
            </div>
            {social.map(s => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="social-card"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 22px', border: '1px solid var(--line)', borderRadius: 14, background: 'var(--paper)', color: 'var(--ink)' }}>
                <span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ac)', display: 'block' }}>{s.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{s.handle}</span>
                </span>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--mut)' }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
