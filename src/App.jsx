import { useState, useCallback, useEffect } from 'react';
import Loader from './components/Loader';
import CodeRain from './components/CodeRain';
import Header from './components/Header';
import SocialSidebar from './components/SocialSidebar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ParcoursPage from './components/ParcoursPage';
import ProjectsPage from './components/ProjectsPage';
import LabPage from './components/LabPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('fr');
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('jtk-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('jtk-theme', theme); } catch (e) { /* noop */ }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), []);
  const onLoaderDone = useCallback(() => setLoading(false), []);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage lang={lang} setPage={setPage} />;
      case 'about': return <AboutPage lang={lang} />;
      case 'parcours': return <ParcoursPage lang={lang} />;
      case 'projects': return <ProjectsPage lang={lang} />;
      case 'lab': return <LabPage lang={lang} />;
      case 'contact': return <ContactPage lang={lang} />;
      default: return <HomePage lang={lang} setPage={setPage} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {loading && <Loader onDone={onLoaderDone} />}
      {!loading && (
        <>
          <CodeRain />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header page={page} setPage={setPage} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
            <SocialSidebar />
            <div id="jtk-main"><div key={page} className="page-enter">{renderPage()}</div></div>
            <Footer lang={lang} setPage={setPage} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
