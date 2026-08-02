import { useEffect, useRef } from 'react';

/**
 * Révèle les éléments `.reveal` quand ils entrent dans la vue — en CASCADE :
 * chaque lot d'éléments visibles ensemble apparaît l'un après l'autre (stagger).
 * À l'ouverture d'une page, le contenu au-dessus de la ligne de flottaison
 * « apparaît » ainsi progressivement.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timers = [];

    const observer = new IntersectionObserver(
      (entries) => {
        // tous les éléments qui apparaissent dans ce lot, triés de haut en bas / gauche à droite
        const shown = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => {
            const dy = a.boundingClientRect.top - b.boundingClientRect.top;
            return Math.abs(dy) > 8 ? dy : a.boundingClientRect.left - b.boundingClientRect.left;
          });

        shown.forEach((e, i) => {
          const target = e.target;
          const delay = Math.min(i, 7) * 95; // cascade plafonnée
          target.style.transitionDelay = delay + 'ms';
          target.classList.add('visible');
          observer.unobserve(target);
          // on retire le délai une fois l'apparition finie pour ne pas ralentir les survols (tilt)
          timers.push(setTimeout(() => { target.style.transitionDelay = ''; }, delay + 1000));
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    const els = el.querySelectorAll('.reveal');
    els.forEach(child => observer.observe(child));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  });

  return ref;
}
