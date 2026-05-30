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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Previne scroll durante o loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <Navbar />
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
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}