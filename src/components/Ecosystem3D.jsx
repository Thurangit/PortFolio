import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AC_HEX = '#6c3bf5';
const AC_INT = 0x6c3bf5;

/**
 * Sphère technique 3D : cœur bleu en fil de fer, nuage d'étoiles,
 * cubes en rotation et nœuds de technologies cliquables en orbite.
 */
export default function Ecosystem3D({ items, selected, onSelect }) {
  const mountRef = useRef(null);
  const labelsRef = useRef(null);
  const sceneApi = useRef(null);

  // Build the scene once
  useEffect(() => {
    const mount = mountRef.current;
    const labelWrap = labelsRef.current;
    if (!mount || !labelWrap) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => ({
      w: mount.clientWidth,
      h: mount.clientHeight
    });
    let { w, h } = size();
    if (!w || !h) { w = 460; h = 460; }

    // Let three create its own canvas — avoids WebGL context conflicts on remount.
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(DPR);
    renderer.setSize(w, h, false);
    const canvas = renderer.domElement;
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    mount.insertBefore(canvas, mount.firstChild);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 100);
    camera.position.z = 5.5; // recul suffisant pour garder les étiquettes des pôles visibles

    const group = new THREE.Group();
    scene.add(group);

    // Core icosahedron (blue wireframe + faint fill)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
    group.add(new THREE.LineSegments(
      new THREE.WireframeGeometry(coreGeo),
      new THREE.LineBasicMaterial({ color: AC_INT, transparent: true, opacity: 0.45 })
    ));
    group.add(new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05 })));

    // Star field
    const starGeo = new THREE.IcosahedronGeometry(2.95, 3);
    group.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: AC_INT, size: 0.03, transparent: true, opacity: 0.5 })));

    // Orbiting cubes
    const cubeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const cubeMat = new THREE.MeshBasicMaterial({ color: AC_INT });
    const cubes = [];
    for (let ci = 0; ci < 4; ci++) {
      const c = new THREE.Mesh(cubeGeo, cubeMat);
      group.add(c);
      cubes.push(c);
    }

    labelWrap.innerHTML = '';
    const N = items.length, R = 2.15; // rayon d'orbite réduit : toutes les étiquettes restent dans le cadre
    const nodes = [], labels = [];
    const nodeGeo = new THREE.SphereGeometry(0.055, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x0b0b0f });
    const nodeKey = new THREE.MeshBasicMaterial({ color: AC_INT });

    items.forEach((it, i) => {
      const y = 1 - (i / Math.max(1, N - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * 2.399963; // golden angle
      const pos = new THREE.Vector3(Math.cos(phi) * ring * R, y * R, Math.sin(phi) * ring * R);
      const m = new THREE.Mesh(nodeGeo, it.key ? nodeKey : nodeMat);
      m.position.copy(pos);
      m.userData = { key: !!it.key };
      m.scale.setScalar(it.key ? 1.5 : 1);
      group.add(m);
      nodes.push(m);

      const el = document.createElement('button');
      el.textContent = it.name;
      el.__name = it.name;
      el.style.cssText = 'position:absolute;transform:translate(-50%,-50%);white-space:nowrap;font-family:var(--mono);font-size:' + (it.key ? 12 : 11) + 'px;padding:3px 9px;border-radius:20px;border:1px solid rgba(11,11,15,.14);background:rgba(255,255,255,.92);color:#0b0b0f;cursor:pointer;pointer-events:auto;transition:background .2s,color .2s,border-color .2s,transform .2s';
      el.addEventListener('click', () => onSelectRef.current && onSelectRef.current(el.__name));
      labelWrap.appendChild(el);
      labels.push(el);
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    let raf;
    const startT = performance.now();
    const tmp = new THREE.Vector3();
    let selectedIdx = -1;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - startT) / 1000;
      group.rotation.y += 0.0024;
      group.rotation.x = Math.sin(t * 0.15) * 0.1;
      cubes.forEach((c, i) => {
        const a = t * 0.4 + i * (Math.PI / 2);
        c.position.set(Math.cos(a) * 1.85, Math.sin(a * 1.25) * 0.5, Math.sin(a) * 1.85);
        c.rotation.set(t, t, 0);
      });
      group.updateWorldMatrix(true, false);
      for (let i = 0; i < nodes.length; i++) {
        const el = labels[i];
        if (!el) continue;
        nodes[i].getWorldPosition(tmp);
        const p = tmp.clone().project(camera);
        const front = p.z < 1;
        const isSel = i === selectedIdx;
        el.style.left = ((p.x * 0.5 + 0.5) * w) + 'px';
        el.style.top = ((-p.y * 0.5 + 0.5) * h) + 'px';
        el.style.opacity = front ? ((selectedIdx < 0 || isSel) ? '1' : '0.28') : '0';
        el.style.pointerEvents = front ? 'auto' : 'none'; // les étiquettes de dos ne captent plus les clics
        el.style.zIndex = isSel ? '6' : (front ? '3' : '1');
        if (isSel) {
          el.style.background = AC_HEX; el.style.color = '#fff'; el.style.borderColor = AC_HEX; el.style.transform = 'translate(-50%,-50%) scale(1.12)';
        } else {
          el.style.background = 'rgba(255,255,255,.92)'; el.style.color = '#0b0b0f'; el.style.borderColor = 'rgba(11,11,15,.14)'; el.style.transform = 'translate(-50%,-50%)';
        }
        nodes[i].scale.setScalar((nodes[i].userData.key ? 1.5 : 1) * (isSel ? 1.7 : 1));
      }
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const s = size();
      if (!s.w || !s.h) return;
      w = s.w; h = s.h;
      renderer.setSize(s.w, s.h, false);
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    sceneApi.current = {
      focus(name) {
        const i = labels.findIndex(el => el && el.__name === name);
        selectedIdx = i;
      },
      clear() { selectedIdx = -1; }
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      labels.forEach(el => el && el.remove());
      coreGeo.dispose(); starGeo.dispose(); cubeGeo.dispose(); nodeGeo.dispose();
      renderer.dispose();
      try { renderer.forceContextLoss(); } catch (e) { /* noop */ }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      sceneApi.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // keep latest onSelect without rebuilding scene
  const onSelectRef = useRef(onSelect);
  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);

  // react to external selection changes
  useEffect(() => {
    if (!sceneApi.current) return;
    if (selected) sceneApi.current.focus(selected);
    else sceneApi.current.clear();
  }, [selected]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: 'clamp(500px,74vh,780px)',
      border: 'none', overflow: 'hidden',
      background: 'transparent'
    }} ref={mountRef}>
      <div ref={labelsRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 16, top: 14, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ac)', animation: 'pulse 1.6s infinite' }} />
        cliquez un nœud
      </div>
    </div>
  );
}
