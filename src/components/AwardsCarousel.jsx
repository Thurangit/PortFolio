import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Carrousel 3D « coverflow » qui tourne tout seul, en continu.
 * La carte active est au centre, à plat ; les voisines sont inclinées en 3D,
 * reculées et estompées. La carte qui « boucle » (de l'extrême gauche à
 * l'extrême droite) se replace instantanément au lieu de traverser l'écran.
 */
export default function AwardsCarousel({ cards }) {
  const n = cards.length;
  const [active, setActive] = useState(0);
  const [spread, setSpread] = useState(300);
  const prevOffs = useRef({});

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setSpread(w < 560 ? 150 : w < 900 ? 220 : 300);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // rotation automatique continue
  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(() => setActive(a => (a + 1) % n), 2600);
    return () => clearInterval(id);
  }, [n]);

  const go = useCallback((dir) => setActive(a => (a + dir + n) % n), [n]);

  // décalage circulaire signé [-n/2, n/2]
  const offsetOf = (idx) => {
    let d = idx - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  // mémorise les décalages courants pour détecter un « saut » de boucle au tour suivant
  const offsets = cards.map((_, i) => offsetOf(i));
  useEffect(() => {
    const m = {};
    offsets.forEach((o, i) => { m[i] = o; });
    prevOffs.current = m;
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: 'clamp(300px,42vh,400px)', perspective: '1600px' }}>
      <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
        {cards.map((c, i) => {
          const off = offsets[i];
          const abs = Math.abs(off);
          const hidden = abs > 2;
          const isCenter = off === 0;
          const translateX = off * spread;
          const rotateY = off === 0 ? 0 : (off > 0 ? -34 : 34);
          const translateZ = -abs * 150;
          const scale = isCenter ? 1 : abs === 1 ? 0.86 : 0.72;
          const opacity = hidden ? 0 : isCenter ? 1 : abs === 1 ? 0.62 : 0.28;

          // la carte qui boucle (|delta| > 1) se replace sans transition de transform
          const prev = prevOffs.current[i];
          const wrapping = prev !== undefined && Math.abs(off - prev) > 1;
          const transition = wrapping
            ? 'opacity .6s ease'
            : 'transform .7s cubic-bezier(.22,.8,.24,1), opacity .7s ease';

          return (
            <button
              key={i}
              onClick={() => (isCenter ? null : setActive(i))}
              aria-label={c.title}
              style={{
                position: 'absolute', left: '50%', top: '50%',
                width: 'min(320px,80vw)', height: 'clamp(210px,30vh,260px)', margin: 0, padding: 0, border: 'none',
                background: 'transparent', cursor: isCenter ? 'default' : 'pointer',
                transform: `translate(-50%,-50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                transition,
                opacity, zIndex: 100 - abs, pointerEvents: hidden ? 'none' : 'auto',
                filter: isCenter ? 'none' : 'saturate(.85)'
              }}
            >
              <div style={{
                width: '100%', height: '100%', boxSizing: 'border-box', textAlign: 'left',
                background: 'var(--paper)',
                border: `1px solid ${c.accent ? 'var(--ac)' : 'var(--line)'}`,
                borderRadius: 18, padding: '24px 24px 22px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14,
                boxShadow: isCenter ? '0 40px 80px -38px rgba(11,11,15,.5)' : '0 20px 44px -30px rgba(11,11,15,.4)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
                    color: c.accent ? 'var(--ac)' : 'var(--mut)',
                    border: `1px solid ${c.accent ? 'var(--ac)' : 'var(--line)'}`,
                    background: c.accent ? 'var(--ac-s)' : 'transparent',
                    padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap'
                  }}>{c.kind}</span>
                  {c.status ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ac)', border: '1px solid var(--ac)', padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ac)', animation: 'pulse 1.6s infinite' }} />
                      {c.status}
                    </span>
                  ) : c.year ? (
                    <span style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 26, color: 'var(--ac)', letterSpacing: '-.02em' }}>{c.year}</span>
                  ) : null}
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 18, lineHeight: 1.3 }}>{c.title}</h3>
                <div style={{ color: 'var(--mut)', fontSize: 13, lineHeight: 1.45 }}>{c.org}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Contrôles */}
      <button onClick={() => go(-1)} aria-label="Précédent" style={arrowStyle('left')}>‹</button>
      <button onClick={() => go(1)} aria-label="Suivant" style={arrowStyle('right')}>›</button>

      {/* Points */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 4, display: 'flex', justifyContent: 'center', gap: 8, zIndex: 200 }}>
        {cards.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} aria-label={`Aller à la carte ${i + 1}`}
            style={{
              width: i === active ? 22 : 8, height: 8, borderRadius: 20, border: 'none', padding: 0, cursor: 'pointer',
              background: i === active ? 'var(--ac)' : 'var(--scroll-thumb)', transition: 'width .3s, background .3s'
            }} />
        ))}
      </div>
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: 'absolute', top: '50%', [side]: 'clamp(0px,3vw,26px)', transform: 'translateY(-50%)', zIndex: 200,
    width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--paper)',
    color: 'var(--ink)', fontSize: 22, lineHeight: 1, cursor: 'pointer',
    boxShadow: '0 10px 26px -16px rgba(11,11,15,.5)', display: 'grid', placeItems: 'center'
  };
}
