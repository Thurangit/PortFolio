import { useState, useEffect } from 'react';
import { ui } from '../data/ui';
import { NavIcon } from '../assets/navIcons';

const ITEMS = ['home', 'about', 'parcours', 'projects', 'lab', 'contact'];

/**
 * Barre de navigation inférieure façon application mobile.
 * Icône + libellé, indicateur actif animé, retour haptique visuel au tap.
 * Ne s'affiche qu'en mobile.
 */
export default function BottomNav({ page, setPage, lang }) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!isMobile) return null;

  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const activeIndex = Math.max(0, ITEMS.indexOf(page));

  return (
    <nav className="bottom-nav" aria-label="Navigation">
      {/* indicateur qui glisse vers l'onglet actif */}
      <span className="bottom-nav-indicator" style={{ left: `calc(${activeIndex} * (100% / ${ITEMS.length}) + (100% / ${ITEMS.length}) / 2)` }} />
      {ITEMS.map((key) => {
        const active = page === key;
        return (
          <button key={key} onClick={() => go(key)} className={'bottom-nav-item' + (active ? ' active' : '')} aria-current={active ? 'page' : undefined}>
            <span className="bottom-nav-ico"><NavIcon id={key} /></span>
            <span className="bottom-nav-label">{ui.nav[key]?.[lang] || key}</span>
          </button>
        );
      })}
    </nav>
  );
}
