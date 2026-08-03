import { useState } from 'react';
import { profile } from '../data/profile';
import { social } from '../data/social';
import { ui } from '../data/ui';
import { SocialIcon } from '../assets/icons';

export default function Footer({ lang = 'fr', setPage }) {
  const [hovered, setHovered] = useState(null);
  const year = new Date().getFullYear();
  const navKeys = ['home', 'about', 'parcours', 'projects', 'lab', 'contact'];

  const go = (page) => { if (setPage) { setPage(page); window.scrollTo(0, 0); } };
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const heads = {
    nav: lang === 'fr' ? 'Navigation' : 'Navigation',
    contact: 'Contact',
    social: lang === 'fr' ? 'Réseaux' : 'Social'
  };

  const colorFor = (s) => hovered === s.id ? s.brand : (hovered ? '#b9b9c2' : 'var(--ink)');
  const opacityFor = (s) => (hovered && hovered !== s.id ? 0.5 : 1);

  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--panel)', backdropFilter: 'blur(4px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(52px,7vw,84px) clamp(20px,5vw,64px) clamp(24px,3vw,34px)' }}>
        <div className="footer-cols" style={{ display: 'grid', gap: 'clamp(26px,4vw,60px)' }}>

          {/* Marque */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 40, height: 40, background: 'var(--ink)', color: 'var(--ink-fg)', borderRadius: 10, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13 }}>{profile.monogram}</span>
              <div>
                <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 17, letterSpacing: '-.01em' }}>{profile.name}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>{profile.location[lang]}</div>
              </div>
            </div>
            <p style={{ margin: '18px 0 0', color: 'var(--mut)', fontSize: 13.5, lineHeight: 1.6 }}>{profile.role[lang]}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ac)' }}>{heads.nav}</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {navKeys.map(key => (
                <button key={key} onClick={() => go(key)} className="footer-link"
                  style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--disp)', fontSize: 15, color: 'var(--mut)', width: 'fit-content' }}>
                  {ui.nav[key][lang]}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ac)' }}>{heads.contact}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {social.filter(s => s.id === 'email').map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-link"
                  style={{ fontFamily: 'var(--disp)', fontSize: 15, color: 'var(--mut)' }}>{s.handle}</a>
              ))}
              <span style={{ fontFamily: 'var(--disp)', fontSize: 15, color: 'var(--mut)' }}>{profile.location[lang]}</span>
            </div>
          </div>

          {/* Réseaux */}
          <div style={{ perspective: '600px' }}>
            <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ac)' }}>{heads.social}</h3>
            <div data-social-group style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {social.filter(s => s.id !== 'whatsapp').map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="social-orb" title={s.label} data-social={s.id}
                  onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}
                  style={{
                    width: 42, height: 42, borderRadius: '50%', border: `1px solid ${hovered === s.id ? s.brand : 'var(--line)'}`,
                    background: 'var(--paper)', display: 'grid', placeItems: 'center', color: colorFor(s), opacity: opacityFor(s),
                    boxShadow: hovered === s.id ? `0 16px 30px -16px ${s.brand}66` : '0 6px 18px -12px rgba(11,11,15,.4)'
                  }}>
                  <SocialIcon id={s.id} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div style={{ marginTop: 'clamp(36px,5vw,56px)', paddingTop: 22, borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mut)' }}>© {year} {profile.name}</div>
          <button onClick={toTop} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid var(--line)', borderRadius: 20, padding: '8px 14px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)', cursor: 'pointer' }}>
            {lang === 'fr' ? 'Haut de page' : 'Back to top'} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
