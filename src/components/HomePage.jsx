import { useState, useEffect, useRef } from 'react';
import { profile } from '../data/profile';
import { expertise } from '../data/expertise';
import { tech } from '../data/tech';
import { awards, education } from '../data/education';
import { translations, ui } from '../data/ui';
import { skillsKeys } from '../data/skills';
import { useReveal } from './useReveal';
import { useTilt } from './useTilt';
import SectionLabel from './SectionLabel';
import Ecosystem3D from './Ecosystem3D';
import AwardsCarousel from './AwardsCarousel';

function Typewriter({ taglines, lang }) {
  const ref = useRef(null);

  useEffect(() => {
    let idx = 0, ch = 0, dir = 1, hold = 0, raf;
    const list = taglines.map(t => t[lang] || t.fr);

    const step = () => {
      if (!list.length) { raf = setTimeout(step, 200); return; }
      const full = list[idx % list.length];

      if (dir > 0) { ch++; if (ch >= full.length) { dir = 0; hold = 0; } }
      else if (dir === 0) { hold++; if (hold > 16) dir = -1; }
      else { ch--; if (ch <= 0) { ch = 0; dir = 1; idx++; } }

      if (ref.current) ref.current.textContent = full.slice(0, Math.max(0, ch));
      raf = setTimeout(step, dir > 0 ? 68 : (dir === 0 ? 45 : 34));
    };
    step();
    return () => clearTimeout(raf);
  }, [taglines, lang]);

  return (
    <div style={{ marginTop: 22, fontFamily: 'var(--mono)', fontSize: 'clamp(15px,2vw,20px)', color: 'var(--ink)', minHeight: '1.7em' }}>
      <span style={{ color: 'var(--ac)' }}>~$</span>{' '}
      <span ref={ref} />
      <span style={{ display: 'inline-block', width: 9, height: '1.05em', background: 'var(--ac)', verticalAlign: -2, marginLeft: 3, animation: 'blink 1s steps(1) infinite' }} />
    </div>
  );
}

export default function HomePage({ lang, setPage }) {
  const t = translations[lang] || translations.fr;
  const containerRef = useReveal();
  const keywords = [...skillsKeys.keyCompetencies, ...skillsKeys.keyCompetencies];
  const [selectedTech, setSelectedTech] = useState(null);
  const cardTilt = useTilt({ intensity: 7, lift: 6 });
  const discoverTilt = useTilt({ intensity: 10, lift: 9 });

  const nameParts = profile.name.split(' ');
  const nameLead = nameParts.slice(0, -1).join(' ');
  const nameTail = nameParts[nameParts.length - 1];

  const sel = selectedTech ? tech.find(x => x.name === selectedTech) : null;
  const toggleTech = (name) => setSelectedTech(prev => prev === name ? null : name);

  const goTo = (page) => { setPage(page); window.scrollTo(0, 0); };

  const discoverCards = [
    { key: 'about', num: '01', label: ui.nav.about[lang], desc: lang === 'fr' ? 'Mon parcours et mes compétences' : 'My background and skills', page: 'about' },
    { key: 'parcours', num: '02', label: ui.nav.parcours[lang], desc: lang === 'fr' ? 'Expériences professionnelles' : 'Professional experience', page: 'parcours' },
    { key: 'projects', num: '03', label: ui.nav.projects[lang], desc: lang === 'fr' ? 'Applications et sites web' : 'Apps and websites', page: 'projects' },
    { key: 'lab', num: '04', label: ui.nav.lab[lang], desc: lang === 'fr' ? 'Expériences 3D, VR & AR' : '3D, VR & AR experiences', page: 'lab' },
    { key: 'contact', num: '05', label: ui.nav.contact[lang], desc: lang === 'fr' ? 'Travaillons ensemble' : "Let's work together", page: 'contact' },
  ];

  const certLabel = lang === 'fr' ? 'Certification' : 'Certification';
  const diplomaLabel = lang === 'fr' ? 'Diplôme' : 'Degree';
  const carouselCards = [
    ...awards.map(a => ({ kind: a.type[lang], title: a.title[lang], org: a.org, year: a.year, sortYear: a.year, status: null, accent: true })),
    ...education
      .filter(e => e.kind === 'cert' || /Ingénieur|Engineering/.test(e.title.fr + e.title.en))
      .map(e => ({
        kind: e.kind === 'cert' ? certLabel : diplomaLabel,
        title: e.title[lang], org: e.org,
        year: e.hideDate ? null : e.year,
        sortYear: e.year || 0,
        status: e.status ? e.status[lang] : null,
        accent: e.kind === 'cert'
      }))
  ].sort((a, b) => b.sortYear - a.sortYear);

  return (
    <div ref={containerRef}>
      {/* HERO — photo sans fond, posée sur l'animation de la page */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,15vh,168px) clamp(20px,5vw,64px) clamp(30px,5vh,60px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(24px,4vw,60px)' }}>
        <div className="reveal" style={{ flex: '1 1 400px', minWidth: 'min(100%,340px)' }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(42px,7.2vw,86px)', lineHeight: .95, letterSpacing: '-.03em' }}>
            {nameLead}<br /><span style={{ color: 'var(--ac)' }}>{nameTail}</span>
          </h1>

          <Typewriter taglines={profile.taglines} lang={lang} />

          <p style={{ margin: '20px 0 0', color: 'var(--mut)', fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.6, maxWidth: '50ch' }}>
            {t.heroLine}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
            <button onClick={() => goTo('about')} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 24px', background: 'var(--ink)', color: 'var(--ink-fg)', border: 'none', borderRadius: 26, fontFamily: 'var(--mono)', fontSize: 13, cursor: 'pointer', transition: '.25s' }}>
              {ui.nav.about[lang]} →
            </button>
            <button onClick={() => goTo('projects')} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 24px', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 26, fontFamily: 'var(--mono)', fontSize: 13, cursor: 'pointer', transition: '.25s' }}>
              {ui.cta.projects[lang]}
            </button>
          </div>
        </div>

        <div className="reveal hero-photo" style={{ flex: '1 1 400px', minWidth: 'min(100%,300px)', position: 'relative', height: 'clamp(380px,54vh,560px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img src={profile.photo} alt={profile.name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 30px 45px rgba(11,11,15,.28))', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: 4, bottom: 8, fontFamily: 'var(--mono)', fontSize: 11, color: '#fff', background: 'rgba(11,11,15,.72)', padding: '6px 11px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
            &lt;/&gt; KONO, Junior Thuran
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--panel)', overflow: 'hidden', padding: '16px 0' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 34s linear infinite' }}>
          {[0, 1].map(nn => (
            <div key={nn} style={{ display: 'flex', alignItems: 'center' }}>
              {keywords.map((k, i) => (
                <span key={`${nn}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 'clamp(13px,1.5vw,17px)', color: 'var(--ink)', paddingLeft: 26 }}>
                  {k}<span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ac)', marginLeft: 26 }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Expertise — cartes avec ombre + inclinaison 3D au survol */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(70px,10vw,130px) clamp(20px,5vw,64px)' }}>
        <div className="reveal">
          <SectionLabel>{ui.sections.expertise[lang]}</SectionLabel>
          <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(30px,5vw,56px)', lineHeight: 1.02, letterSpacing: '-.02em', maxWidth: '20ch' }}>
            {t.expertiseIntro}
          </h2>
        </div>
        <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 'clamp(14px,1.6vw,22px)' }}>
          {expertise.map((x, i) => (
            <article key={x.id} className="reveal card" {...cardTilt}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ac)' }}>{x.id}_</span>
                <span style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 26, color: 'var(--faint)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 style={{ margin: '16px 0 0', fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 19, lineHeight: 1.2 }}>{x.title[lang]}</h3>
              <p style={{ margin: '10px 0 16px', color: 'var(--mut)', fontSize: 14, lineHeight: 1.55 }}>{x.desc[lang]}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {x.tags.map(tg => <span key={tg} className="tag">{tg}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Écosystème — sphère 3D plus grosse, sans bordure, posée sur la page */}
      <section style={{ background: 'transparent' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(70px,10vw,130px) clamp(20px,5vw,64px)' }}>
          <div className="reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SectionLabel>{ui.sections.ecosystem[lang]}</SectionLabel>
            <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(30px,5vw,56px)', lineHeight: 1.02, letterSpacing: '-.02em', maxWidth: '20ch' }}>
              {t.ecosystemIntro}
            </h2>
            <p style={{ margin: '14px 0 0', color: 'var(--mut)', fontSize: 15, maxWidth: '60ch' }}>{t.ecosystemHint}</p>
          </div>

          {/* La sphère, seule sur sa ligne — bien détachée du texte au-dessus */}
          <div className="reveal" style={{ marginTop: 'clamp(48px,7vw,88px)', position: 'relative' }}>
            <Ecosystem3D items={tech} selected={selectedTech} onSelect={toggleTech} />
            {sel && (
              <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, maxWidth: 520, margin: '0 auto', zIndex: 20, background: 'var(--paper)', border: '1px solid var(--ac)', borderRadius: 14, padding: '18px 20px', boxShadow: '0 24px 60px -30px rgba(11,11,15,.4)', animation: 'rise .3s both' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ac)' }}>{sel.cat[lang]}</div>
                    <h4 style={{ margin: '5px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 22 }}>{sel.name}</h4>
                  </div>
                  <button onClick={() => setSelectedTech(null)} style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--mut)', fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>×</button>
                </div>
                <p style={{ margin: '10px 0 0', color: 'var(--ink)', fontSize: 14.5, lineHeight: 1.55 }}>{sel.usage[lang]}</p>
              </div>
            )}
          </div>

          {/* Un seul bouton vers la liste écrite (page À propos) */}
          <div className="reveal" style={{ marginTop: 34, display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => goTo('about')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 28px', background: 'var(--ink)', color: 'var(--ink-fg)', border: 'none', borderRadius: 28, fontFamily: 'var(--mono)', fontSize: 13, cursor: 'pointer', transition: '.25s' }}>
              {lang === 'fr' ? 'Voir mes autres compétences' : 'See my other skills'} →
            </button>
          </div>
        </div>
      </section>

      {/* Distinctions — carrousel 3D coverflow */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(70px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,5vw,50px)' }}>
        <div className="reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionLabel>{lang === 'fr' ? 'Distinctions & diplômes' : 'Awards & degrees'}</SectionLabel>
          <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(28px,4.4vw,50px)', lineHeight: 1.02, letterSpacing: '-.02em', maxWidth: '22ch' }}>
            {lang === 'fr' ? 'Prix, distinctions & certifications' : 'Awards, honours & certifications'}
          </h2>
        </div>
        <div className="reveal" style={{ marginTop: 28 }}>
          <AwardsCarousel cards={carouselCards} />
        </div>
      </section>

      {/* Explorer */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px,6vw,90px) clamp(20px,5vw,64px) clamp(70px,10vw,130px)' }}>
        <div className="reveal">
          <SectionLabel>{ui.sections.discover[lang]}</SectionLabel>
          <h2 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(28px,4.4vw,50px)', lineHeight: 1.02, letterSpacing: '-.02em' }}>
            {t.discoverIntro}
          </h2>
        </div>
        <div className="discover-grid" style={{ marginTop: 40, display: 'grid', gap: 'clamp(12px,1.6vw,20px)' }}>
          {discoverCards.map(c => (
            <button key={c.key} className="reveal card" onClick={() => goTo(c.page)} {...discoverTilt}
              style={{ textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ac)' }}>{c.num}</span>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--mut)', fontSize: 18 }}>→</span>
              </div>
              <h3 style={{ margin: '18px 0 0', fontFamily: 'var(--disp)', fontWeight: 600, fontSize: 22 }}>{c.label}</h3>
              <p style={{ margin: '8px 0 0', color: 'var(--mut)', fontSize: 13.5, lineHeight: 1.5 }}>{c.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
