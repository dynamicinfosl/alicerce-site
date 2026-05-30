import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <a
      ref={buttonRef}
      href="https://wa.me/351928380182"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 group hover:scale-110 transition-transform"
      style={{ backgroundColor: '#25D366' }}
      title="Fale connosco pelo WhatsApp"
    >
      <MessageCircle className="text-white" size={28} />
      <span className="absolute right-full mr-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale connosco pelo WhatsApp
      </span>
    </a>
  );
}
