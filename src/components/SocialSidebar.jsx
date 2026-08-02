import { useState, useEffect, useRef } from 'react';
import { social } from '../data/social';
import { SocialIcon } from '../assets/icons';

const STAGGER = 0.4;   // secondes entre chaque décrochage (3 × 0.4 + 0.8s de vol = ~2s au total)
const TOTAL_MS = 2200; // durée totale (aller ou retour) avant de repasser au repos

export default function SocialSidebar() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const [hovered, setHovered] = useState(null);
  const [atFooter, setAtFooter] = useState(false);      // mobile : fondu de la pilule
  const [mode, setMode] = useState('idle');             // desktop : 'idle' | 'in' (fusion) | 'out' (retour)
  const [deltas, setDeltas] = useState({});             // {id: {dx, dy, sc}} vers chaque jumelle
  const orbRefs = useRef({});
  const restRef = useRef({});
  const modeRef = useRef('idle');
  const visibleRef = useRef(false);

  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // mobile : simple fondu de la pilule à l'arrivée au footer
  useEffect(() => {
    const group = document.querySelector('footer [data-social-group]') || document.querySelector('footer');
    if (!group || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), { threshold: 0.2 });
    io.observe(group);
    return () => io.disconnect();
  }, []);

  // une fois l'animation (aller ou retour) terminée → repos
  useEffect(() => {
    if (mode === 'out') {
      const id = setTimeout(() => { if (modeRef.current === 'out') setMode('idle'); }, TOTAL_MS);
      return () => clearTimeout(id);
    }
  }, [mode]);

  // desktop : fusion temporisée (aller) au footer, animation inverse (retour) en remontant
  useEffect(() => {
    if (isMobile) return;

    const measureRest = () => {
      social.forEach(s => {
        const orb = orbRefs.current[s.id];
        if (!orb) return;
        const prev = orb.style.transform;
        orb.style.transform = 'none';
        const r = orb.getBoundingClientRect();
        orb.style.transform = prev;
        restRef.current[s.id] = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width };
      });
    };

    const trigger = () => {
      if (modeRef.current !== 'idle') return;
      const d = {};
      social.forEach(s => {
        const r = restRef.current[s.id];
        const twin = document.querySelector(`footer [data-social="${s.id}"]`);
        if (r && twin) {
          const t = twin.getBoundingClientRect();
          d[s.id] = { dx: (t.left + t.width / 2) - r.cx, dy: (t.top + t.height / 2) - r.cy, sc: t.width / r.w };
        }
      });
      if (Object.keys(d).length) { setDeltas(d); setMode('in'); }
    };

    const group = document.querySelector('footer [data-social-group]');
    let io;
    if (group && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([e]) => {
        visibleRef.current = e.isIntersecting;
        // on remonte et on quitte le footer alors qu'on était fusionné → animation inverse
        if (!e.isIntersecting && modeRef.current === 'in') setMode('out');
      }, { threshold: 0.55 });
      io.observe(group);
    }

    let stopTimer;
    const onScroll = () => {
      clearTimeout(stopTimer);
      // déclenche ~250 ms après le DERNIER scroll = « l'utilisateur a arrêté »
      stopTimer = setTimeout(() => { if (visibleRef.current && modeRef.current === 'idle') trigger(); }, 250);
    };

    measureRest();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measureRest);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureRest);
      clearTimeout(stopTimer);
      if (io) io.disconnect();
    };
  }, [isMobile]);

  const colorFor = (s) => hovered === s.id ? s.brand : (hovered ? '#b9b9c2' : 'var(--ink)');
  const borderFor = (s, base) => hovered === s.id ? s.brand : base;
  const opacityFor = (s) => (hovered && hovered !== s.id ? 0.5 : 1);

  const linkProps = (s) => ({
    ref: (el) => { orbRefs.current[s.id] = el; },
    href: s.url,
    target: '_blank',
    rel: 'noopener noreferrer',
    title: s.label,
    onMouseEnter: () => setHovered(s.id),
    onMouseLeave: () => setHovered(null)
  });

  if (isMobile) {
    return (
      <div style={{
        position: 'fixed', left: '50%', bottom: 16, zIndex: 8000,
        transform: atFooter ? 'translateX(-50%) translateY(28px) scale(.9)' : 'translateX(-50%)',
        opacity: atFooter ? 0 : 1, pointerEvents: atFooter ? 'none' : 'auto',
        transition: 'opacity .5s ease, transform .5s cubic-bezier(.2,.8,.2,1)',
        display: 'flex', gap: 10, background: 'var(--paper)', border: '1px solid var(--line)',
        borderRadius: 30, padding: '8px 10px', boxShadow: '0 16px 40px -20px rgba(11,11,15,.5)', perspective: '800px'
      }}>
        {social.map(s => (
          <a key={s.id} {...linkProps(s)} className="social-orb"
            style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid transparent', display: 'grid', placeItems: 'center', color: colorFor(s), opacity: opacityFor(s) }}>
            <SocialIcon id={s.id} />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', right: 'clamp(12px,2vw,22px)', top: '50%', transform: 'translateY(-50%)',
      zIndex: 8000, display: 'flex', flexDirection: 'column', gap: 12, perspective: '900px'
    }}>
      {social.map((s, i) => {
        const d = deltas[s.id];
        const animate = (mode === 'in' || mode === 'out') && d;
        const cls = 'social-orb' + (animate ? (mode === 'in' ? ' social-merge' : ' social-unmerge') : '');
        const vars = animate
          ? { '--mdx': d.dx + 'px', '--mdy': d.dy + 'px', '--msc': String(d.sc), animationDelay: (i * STAGGER) + 's' }
          : {};
        return (
          <a key={s.id} {...linkProps(s)} className={cls}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: `1px solid ${borderFor(s, 'var(--line)')}`,
              background: 'var(--paper)', display: 'grid', placeItems: 'center', color: colorFor(s), opacity: opacityFor(s),
              boxShadow: hovered === s.id ? `0 18px 34px -16px ${s.brand}66` : '0 8px 22px -14px rgba(11,11,15,.4)',
              ...vars
            }}>
            <SocialIcon id={s.id} />
          </a>
        );
      })}
    </div>
  );
}
