import { useEffect, useRef } from 'react';

/**
 * Pluie de code plein écran — fond fixe présent sur toutes les pages.
 * Des glyphes tombent comme des gouttes en s'affichant, sur toute la hauteur.
 * Discret par défaut ; autour du curseur, une lueur circulaire « allume » le
 * fond : les glyphes qui traversent la zone brillent davantage.
 */
export default function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const glyphs = '01{}<>/=;()[]#$*+-.:λΣ⟨⟩=>const=let=fn'.split('');
    const fs = 16;
    let cols, drops, speeds, raf, dpr;
    const mouse = { x: -99999, y: -99999 };

    // couleur de la pluie selon le thème (variable CSS --rain)
    let rainRGB = '108,59,245';
    const readRain = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--rain').trim();
      if (v) rainRGB = v;
    };
    readRain();
    const themeObs = new MutationObserver(readRain);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const fit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      cols = Math.floor(canvas.width / (fs * dpr));
      drops = new Array(cols).fill(0).map(() => Math.random() * -60);
      speeds = new Array(cols).fill(0).map(() => 0.6 + Math.random() * 0.9);
    };
    fit();

    let last = 0;
    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 60) return;
      last = ts;

      // fondu : on efface pour laisser une traînée courte et discrète
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      const R = 120 * dpr;            // rayon de la lueur (diamètre plus resserré)
      const onScreen = mouse.x > -9999;

      // lueur circulaire douce autour du curseur
      if (onScreen) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, R);
        g.addColorStop(0, `rgba(${rainRGB},0.06)`);
        g.addColorStop(1, `rgba(${rainRGB},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - R, mouse.y - R, R * 2, R * 2);
      }

      ctx.font = `600 ${fs * dpr}px 'IBM Plex Mono', monospace`;
      for (let i = 0; i < cols; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        const x = i * fs * dpr;
        const y = drops[i] * fs * dpr;

        // lueur : les glyphes proches du curseur brillent davantage
        let glow = 0;
        if (onScreen) {
          const dx = x - mouse.x, dy = y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < R) glow = 1 - d / R;
        }

        const head = Math.random() > 0.92;
        const base = head ? 0.24 : 0.045 + Math.random() * 0.075;
        const a = Math.min(0.92, base + glow * 0.55);
        ctx.fillStyle = `rgba(${rainRGB},${a})`;
        ctx.fillText(ch, x, y);

        if (y > canvas.height && Math.random() > 0.97) drops[i] = Math.random() * -20;
        drops[i] += speeds[i];
      }
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => fit();
    const onMove = (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; };
    const onLeave = () => { mouse.x = -99999; mouse.y = -99999; };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerout', onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
