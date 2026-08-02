import { useState } from 'react';

/**
 * Étiquette de section douce et cliquable.
 * Au clic : petite animation « pop » + onde qui se diffuse.
 */
export default function SectionLabel({ children }) {
  const [burst, setBurst] = useState(0);

  return (
    <button
      onClick={() => setBurst(b => b + 1)}
      className="section-label-chip"
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 9,
        padding: '7px 15px 7px 12px', border: '1px solid var(--line)', borderRadius: 30,
        background: 'var(--ac-s)', color: 'var(--ac)', cursor: 'pointer',
        fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase',
        overflow: 'hidden', WebkitTapHighlightColor: 'transparent'
      }}
    >
      <span style={{ position: 'relative', display: 'grid', placeItems: 'center', width: 9, height: 9 }}>
        <span style={{ position: 'absolute', width: 7, height: 7, borderRadius: '50%', background: 'var(--ac)' }} />
        <span style={{ position: 'absolute', width: 7, height: 7, borderRadius: '50%', background: 'var(--ac)', animation: 'chip-ring 2.4s ease-out infinite' }} />
      </span>
      <span style={{ position: 'relative' }}>{children}</span>
      {burst > 0 && (
        <span key={burst} style={{
          position: 'absolute', left: 14, top: '50%', width: 10, height: 10, marginTop: -5, marginLeft: -5,
          borderRadius: '50%', background: 'var(--ac)', opacity: .35, pointerEvents: 'none',
          animation: 'chip-burst .6s ease-out forwards'
        }} />
      )}
    </button>
  );
}
