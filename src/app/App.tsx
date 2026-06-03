import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import QuoteForm from './components/QuoteForm';
import About from './components/About';
import Blog from './components/Blog';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './components/PrivacyPolicy';
import Admin from './components/Admin';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'home' | 'privacy' | 'admin'>('home');

  useEffect(() => {
    // Previne scroll durante o loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#politica') {
        setView('privacy');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#admin') {
        setView('admin');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setView('home');
        if (hash && hash !== '#inicio') {
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Verificar hash no carregamento inicial
    if (!isLoading) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoading]);

  return (
    <div className="min-h-screen">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          {view === 'admin' ? (
            <Admin />
          ) : (
            <>
              <Navbar />
              {view === 'home' ? (
                <>
                  <Hero />
                  <Stats />
                  <Services />
                  <WhyChooseUs />
                  <Process />
                  <Testimonials />
                  <Team />
                  <About />
                  <QuoteForm />
                  <Blog />
                </>
              ) : (
                <PrivacyPolicy />
              )}
              <Footer />
              <WhatsAppButton />
              <ScrollToTop />
            </>
          )}
        </>
      )}
    </div>
  );
}