import { useState, useEffect } from 'react';
import { social } from '../data/social';
import { SocialIcon } from '../assets/icons';

export default function SocialSidebar() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const [hovered, setHovered] = useState(null);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // À l'arrivée au footer, les réseaux flottants « fusionnent » dans le footer.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), { threshold: 0.01 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const mergeTransition = 'transform .65s cubic-bezier(.34,.02,.2,1), opacity .5s ease';

  // couleur/opacité selon l'état de survol du groupe
  const colorFor = (s) => hovered === s.id ? s.brand : (hovered ? '#b9b9c2' : 'var(--ink)');
  const borderFor = (s, base) => hovered === s.id ? s.brand : base;
  const opacityFor = (s) => (hovered && hovered !== s.id ? 0.5 : 1);

  const linkProps = (s) => ({
    href: s.url,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'social-orb',
    title: s.label,
    onMouseEnter: () => setHovered(s.id),
    onMouseLeave: () => setHovered(null)
  });

  if (isMobile) {
    return (
      <div style={{
        position: 'fixed', left: '50%', bottom: 16, zIndex: 8000,
        transform: atFooter ? 'translateX(-50%) translateY(130px) scale(.6)' : 'translateX(-50%)',
        opacity: atFooter ? 0 : 1, pointerEvents: atFooter ? 'none' : 'auto', transition: mergeTransition,
        display: 'flex', gap: 10, background: 'var(--paper)', border: '1px solid var(--line)',
        borderRadius: 30, padding: '8px 10px', boxShadow: '0 16px 40px -20px rgba(11,11,15,.5)',
        perspective: '600px'
      }}>
        {social.map(s => (
          <a key={s.id} {...linkProps(s)}
            style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid transparent', display: 'grid', placeItems: 'center', color: colorFor(s), opacity: opacityFor(s) }}>
            <SocialIcon id={s.id} />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', right: 'clamp(12px,2vw,22px)', top: '50%', zIndex: 8000,
      transformOrigin: '50% 100%',
      transform: atFooter ? 'perspective(700px) translateY(calc(-50% + 220px)) rotateX(-58deg) scale(.5)' : 'translateY(-50%)',
      opacity: atFooter ? 0 : 1, pointerEvents: atFooter ? 'none' : 'auto', transition: mergeTransition,
      display: 'flex', flexDirection: 'column', gap: 12, perspective: '600px'
    }}>
      {social.map(s => (
        <a key={s.id} {...linkProps(s)}
          style={{
            width: 44, height: 44, borderRadius: '50%', border: `1px solid ${borderFor(s, 'var(--line)')}`,
            background: 'var(--paper)', display: 'grid', placeItems: 'center', color: colorFor(s), opacity: opacityFor(s),
            boxShadow: hovered === s.id ? `0 18px 34px -16px ${s.brand}66` : '0 8px 22px -14px rgba(11,11,15,.4)'
          }}>
          <SocialIcon id={s.id} />
        </a>
      ))}
    </div>
  );
}
