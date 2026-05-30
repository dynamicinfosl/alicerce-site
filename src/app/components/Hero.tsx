import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    const words = titleRef.current?.querySelectorAll('.word') ?? [];
    const ctaChildren = ctaRef.current ? Array.from(ctaRef.current.children) : [];

    if (words.length > 0) {
      tl.fromTo(words,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }

    if (badgeRef.current) {
      tl.fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }

    if (ctaChildren.length > 0) {
      tl.fromTo(ctaChildren,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Video Background — split-screen */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="w-1/2 h-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/hero-video-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="w-1/2 h-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/hero-video-2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(26,58,92,0.82) 0%, rgba(37,99,235,0.72) 100%)' }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Center divider line between the two videos */}
      <div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(56,189,248,0.5), transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white mb-8">
          <span className="text-sm font-medium">Baseados em Vila Nova de Gaia | Atuamos em todo Portugal</span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          <span className="word inline-block">Limpeza</span>{' '}
          <span className="word inline-block">Profissional.</span>{' '}
          <br />
          <span className="word inline-block">Construção</span>{' '}
          <span className="word inline-block">de</span>{' '}
          <span className="word inline-block">Confiança.</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
        >
          Da limpeza à construção, somos o seu parceiro de confiança em Portugal.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#orcamento"
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#38BDF8', color: '#1A3A5C' }}
          >
            Pedir Orçamento Grátis
          </a>
          <a
            href="#servicos"
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 border-2 border-white text-white hover:bg-white/10"
          >
            Conhecer os Serviços
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/70" size={32} />
      </div>
    </section>
  );
}
