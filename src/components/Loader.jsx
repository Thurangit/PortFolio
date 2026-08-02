import { useState, useEffect } from 'react';
import { ui } from '../data/ui';

const BOOT_LINES = ui.loader;

export default function Loader({ onDone }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setLines(BOOT_LINES.slice(0, i));
      setProgress(Math.round((i / BOOT_LINES.length) * 100));
      if (i >= BOOT_LINES.length) {
        clearInterval(iv);
        setTimeout(() => setFading(true), 300);
        setTimeout(() => onDone(), 1000);
      }
    }, 430);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100000, background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      opacity: fading ? 0 : 1, transform: fading ? 'translateY(-20px)' : 'none',
      transition: 'opacity .6s ease, transform .7s cubic-bezier(.7,0,.2,1)'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(11,11,15,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(11,11,15,.05) 1px,transparent 1px)',
        backgroundSize: '40px 40px', animation: 'grid-move 3s linear infinite', opacity: .7
      }} />
      <div style={{ position: 'relative', width: 'min(560px,100%)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.2em', color: 'var(--ac)', marginBottom: 14 }}>
          JUNIOR THURAN KONO — PORTFOLIO
        </div>
        <div style={{ background: '#0b0b0f', borderRadius: 14, overflow: 'hidden', boxShadow: '0 40px 90px -40px rgba(11,11,15,.55)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: 8, fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,.4)' }}>~/portfolio — zsh</span>
          </div>
          <div style={{ padding: 20, minHeight: 196, fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.95, color: '#e8e8ee' }}>
            {lines.map((line, i) => <div key={i}>{line}</div>)}
            <span style={{ display: 'inline-block', width: 9, height: 16, background: '#28c840', verticalAlign: 'middle', animation: 'blink 1s steps(1) infinite' }} />
          </div>
        </div>
        <div style={{ marginTop: 18, height: 4, background: 'rgba(11,11,15,.1)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--ac)', borderRadius: 20, transition: 'width .4s ease' }} />
        </div>
        <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)', display: 'flex', justifyContent: 'space-between' }}>
          <span>booting 3D · AI · Cloud…</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
