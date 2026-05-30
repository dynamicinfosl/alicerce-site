import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform"
      style={{ backgroundColor: '#2563EB' }}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="text-white" size={24} />
    </button>
  );
}
