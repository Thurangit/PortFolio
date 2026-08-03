import { useState, useEffect } from 'react';
import { SocialIcon } from '../assets/icons';

/**
 * Visionneuse plein écran (sans iframe — beaucoup de sites l'interdisent).
 * L'élément cliqué (logo réseau ou carte projet) VOYAGE depuis sa position
 * jusqu'au centre, un loader tourne ~2 s, puis se transforme en deux boutons :
 * « Ouvrir dans un nouvel onglet » et « Fermer ». À la fermeture, l'élément
 * repart à sa position d'origine avec la même animation (inversée).
 */
export default function SiteViewer({ site, onClose, lang = 'fr' }) {
  const [stage, setStage] = useState('loading'); // 'loading' → 'choice'
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!site) return;
    setStage('loading'); setClosing(false);
    const toChoice = setTimeout(() => setStage('choice'), 2000); // loader 2 s → boutons
    return () => clearTimeout(toChoice);
  }, [site]);

  if (!site) return null;
  const t = (fr, en) => (lang === 'en' ? en : fr);
  const isProject = site.kind === 'project';

  // FLIP : d'où part l'élément (position cliquée) vers le centre
  const o = site.origin;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const baseSize = isProject ? 340 : 112;
  const travelVars = {
    '--fromdx': ((o ? o.cx : vw / 2) - vw / 2) + 'px',
    '--fromdy': ((o ? o.cy : vh / 2) - vh / 2) + 'px',
    '--fromscale': Math.max(0.18, (o ? o.w : 44) / baseSize)
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => onClose && onClose(), 860); // laisse l'animation retour se finir
  };

  const buttons = (
    <div className="viewer-actions">
      <a className="viewer-btn viewer-btn-primary" href={site.url} target="_blank" rel="noopener noreferrer">
        {t('Ouvrir', 'Open')} ↗
      </a>
      <button className="viewer-btn" onClick={close}>{t('Fermer', 'Close')}</button>
    </div>
  );
  // projet privé (ou sans lien) → seulement Fermer
  const closeOnly = (
    <div className="viewer-actions">
      <button className="viewer-btn" onClick={close}>{t('Fermer', 'Close')}</button>
    </div>
  );
  const actions = (site.isPrivate || !site.url) ? closeOnly : buttons;

  return (
    <div className={'viewer-backdrop' + (closing ? ' closing' : '')} role="dialog" aria-label={site.title}>
      {isProject ? (
        <div className={'viewer-travel-card' + (closing ? ' closing' : '')} style={travelVars}>
          <div className="viewer-sub" style={{ color: 'var(--ac)' }}>{t('Projet', 'Project')}</div>
          <div className="viewer-title" style={{ fontSize: 22 }}>{site.title}</div>
          {site.subtitle && site.subtitle !== site.title && <div className="viewer-sub">{site.subtitle}</div>}
          {site.description && <p className="viewer-desc">{site.description}</p>}
          {site.tech && site.tech.length > 0 && (
            <div className="viewer-tech">{site.tech.map(tg => <span key={tg} className="tag">{tg}</span>)}</div>
          )}
          {site.isPrivate && <div className="viewer-sub" style={{ color: 'var(--ac)' }}>🔒 {t('Projet privé · NDA', 'Private project · NDA')}</div>}
          {!closing && (
            <div className="viewer-in-card">
              {stage === 'loading' ? <div className="viewer-loader"><span /></div> : actions}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={'viewer-travel-logo' + (closing ? ' closing' : '')} style={{ ...travelVars, color: site.accent || 'var(--ink)' }}>
            <SocialIcon id={site.iconId} size={52} />
          </div>
          {!closing && (
            <div className="viewer-meta">
              {stage === 'loading' ? <div className="viewer-loader"><span /></div> : actions}
            </div>
          )}
        </>
      )}
    </div>
  );
}
