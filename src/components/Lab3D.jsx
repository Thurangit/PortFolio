import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AC_INT = 0x6c3bf5;

/**
 * Scène 3D temps réel du Lab : forme filaire qui tourne toute seule.
 * Glissez pour la faire tourner, double-clic (ou bouton « Transformer ») pour
 * la métamorphoser (nœud de tore → icosaèdre → tore → octaèdre).
 */
export default function Lab3D({ morphSignal }) {
  const mountRef = useRef(null);
  const api = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => ({ w: mount.clientWidth, h: mount.clientHeight });
    let { w, h } = size();
    if (!w || !h) { w = 460; h = 460; }

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(DPR);
    renderer.setSize(w, h, false);
    const canvas = renderer.domElement;
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;cursor:grab';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 4.7;
    const grp = new THREE.Group();
    scene.add(grp);

    const geos = [
      new THREE.TorusKnotGeometry(1, 0.32, 150, 22),
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.TorusGeometry(1.15, 0.42, 18, 54),
      new THREE.OctahedronGeometry(1.55, 0)
    ];
    let gi = 0;

    const mesh = new THREE.Mesh(geos[0], new THREE.MeshStandardMaterial({ color: 0xf2f2f0, metalness: 0.2, roughness: 0.5, flatShading: true }));
    grp.add(mesh);
    let wire = new THREE.LineSegments(new THREE.WireframeGeometry(geos[0]), new THREE.LineBasicMaterial({ color: AC_INT, transparent: true, opacity: 0.5 }));
    grp.add(wire);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const d1 = new THREE.DirectionalLight(0xffffff, 1.1); d1.position.set(3, 4, 5); scene.add(d1);
    const d2 = new THREE.DirectionalLight(AC_INT, 0.7); d2.position.set(-4, -3, 2); scene.add(d2);

    const st = { rx: 0.2, ry: 0.3, trx: 0.2, try_: 0.3, drag: false, px: 0, py: 0 };
    const dn = (e) => { st.drag = true; st.px = e.clientX; st.py = e.clientY; canvas.style.cursor = 'grabbing'; };
    const mv = (e) => { if (!st.drag) return; st.try_ += (e.clientX - st.px) * 0.01; st.trx += (e.clientY - st.py) * 0.01; st.px = e.clientX; st.py = e.clientY; };
    const up = () => { st.drag = false; canvas.style.cursor = 'grab'; };
    canvas.addEventListener('pointerdown', dn);
    window.addEventListener('pointermove', mv);
    window.addEventListener('pointerup', up);

    const swap = () => {
      gi = (gi + 1) % geos.length;
      mesh.geometry = geos[gi];
      grp.remove(wire);
      wire.geometry.dispose();
      wire.material.dispose();
      wire = new THREE.LineSegments(new THREE.WireframeGeometry(geos[gi]), new THREE.LineBasicMaterial({ color: AC_INT, transparent: true, opacity: 0.5 }));
      grp.add(wire);
    };
    canvas.addEventListener('dblclick', swap);
    api.current = { swap };

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!st.drag) st.try_ += 0.004;
      st.ry += (st.try_ - st.ry) * 0.08;
      st.rx += (st.trx - st.rx) * 0.08;
      grp.rotation.y = st.ry;
      grp.rotation.x = st.rx;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const s = size();
      if (!s.w || !s.h) return;
      renderer.setSize(s.w, s.h, false);
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointermove', mv);
      window.removeEventListener('pointerup', up);
      canvas.removeEventListener('dblclick', swap);
      geos.forEach(g => g.dispose());
      mesh.material.dispose();
      wire.geometry.dispose();
      wire.material.dispose();
      renderer.dispose();
      try { renderer.forceContextLoss(); } catch (e) { /* noop */ }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      api.current = null;
    };
  }, []);

  // bouton externe « Transformer »
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (api.current && api.current.swap) api.current.swap();
  }, [morphSignal]);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />;
}
