import { useState, useEffect } from 'react';
import { profile } from '../data/profile';
import { ui } from '../data/ui';

export default function Header({ page, setPage, lang, setLang, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onResize();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  const navItems = ['home', 'about', 'parcours', 'projects', 'lab', 'contact'];
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };

  const langToggle = (compact) => (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden', fontFamily: 'var(--mono)', fontSize: compact ? 11 : 12 }}>
      <button onClick={() => setLang('fr')} style={{ padding: compact ? '6px 10px' : '7px 12px', border: 'none', background: lang === 'fr' ? 'var(--ink)' : 'transparent', color: lang === 'fr' ? 'var(--ink-fg)' : 'var(--mut)', cursor: 'pointer', transition: '.2s' }}>FR</button>
      <button onClick={() => setLang('en')} style={{ padding: compact ? '6px 10px' : '7px 12px', border: 'none', background: lang === 'en' ? 'var(--ink)' : 'transparent', color: lang === 'en' ? 'var(--ink-fg)' : 'var(--mut)', cursor: 'pointer', transition: '.2s' }}>EN</button>
    </div>
  );

  const themeToggle = (size) => (
    <button onClick={toggleTheme} title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'} aria-label="Basculer le thème"
      style={{ width: size, height: size, display: 'grid', placeItems: 'center', border: '1px solid var(--line)', borderRadius: '50%', background: 'var(--paper)', color: 'var(--ink)', cursor: 'pointer', fontSize: 15, transition: '.25s' }}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
      transition: 'background .35s, border-color .35s, backdrop-filter .35s',
      borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      background: scrolled ? 'var(--header-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(12px,1.9vw,19px) clamp(18px,5vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <button onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0, color: 'var(--ink)', cursor: 'pointer' }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, background: 'var(--ink)', color: 'var(--ink-fg)', borderRadius: 9, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 12 }}>{profile.monogram}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.1em', color: 'var(--mut)' }}>/ dev</span>
        </button>

        {!isMobile ? (
          <>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px,2vw,30px)' }}>
              {navItems.map(key => (
                <button key={key} onClick={() => navigate(key)} style={{
                  position: 'relative', background: 'none', border: 'none', padding: '6px 0',
                  fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '.03em',
                  color: page === key ? 'var(--ink)' : 'var(--mut)', cursor: 'pointer', transition: 'color .25s'
                }}>
                  {ui.nav[key]?.[lang] || key}
                  {page === key && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -3, height: 2, background: 'var(--ac)', borderRadius: 2 }} />}
                </button>
              ))}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {langToggle(false)}
              {themeToggle(38)}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {langToggle(true)}
            {themeToggle(38)}
          </div>
        )}
      </div>
    </header>
  );
}
