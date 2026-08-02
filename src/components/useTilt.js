/**
 * Retourne des handlers de survol qui inclinent légèrement un élément en 3D
 * en suivant le curseur. `intensity` règle l'amplitude, `lift` la hauteur de levée.
 *
 * Usage : const tilt = useTilt(); <div {...tilt} /> ou useTilt({ intensity: 12, lift: 8 })
 */
export function useTilt({ intensity = 8, lift = 6 } = {}) {
  const onMouseMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(820px) rotateX(${-py * intensity}deg) rotateY(${px * (intensity * 1.15)}deg) translateY(${-lift}px)`;
  };
  const onMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
  };
  return { onMouseMove, onMouseLeave };
}
