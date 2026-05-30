import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.blog-card');
    if (!cards || cards.length === 0) return;

    // Ensure visible first as fallback
    gsap.set(cards, { opacity: 1, y: 0 });

    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, []);

  const articles = [
    {
      title: '5 Dicas para Manter a Sua Casa Sempre Limpa',
      category: 'Limpeza',
      date: '15 Mai 2026',
      excerpt: 'Descubra técnicas simples e eficazes para manter a sua casa impecável todos os dias.',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)'
    },
    {
      title: 'Quando Fazer uma Limpeza Profunda? Guia Completo',
      category: 'Limpeza Profissional',
      date: '10 Mai 2026',
      excerpt: 'Saiba identificar o momento certo para contratar uma limpeza profunda e os seus benefícios.',
      gradient: 'linear-gradient(135deg, #1A3A5C 0%, #2563EB 100%)'
    },
    {
      title: 'Remodelação ou Limpeza Pós-Obra: O Que Esperar',
      category: 'Construção',
      date: '5 Mai 2026',
      excerpt: 'Guia prático sobre os cuidados necessários após uma obra ou remodelação completa.',
      gradient: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
            Dicas e Artigos
          </h2>
          <p className="text-lg text-gray-600">
            Informação útil sobre limpeza, construção e manutenção
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="blog-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  duration: 0.3,
                  ease: 'back.out(1.7)'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  duration: 0.3
                });
              }}
            >
              <div
                className="h-48 flex items-center justify-center text-white relative overflow-hidden"
                style={{ background: article.gradient }}
              >
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id={`pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="white"/>
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                  </svg>
                </div>
                <span className="text-sm font-semibold px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={16} />
                  {article.date}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#2563EB] transition-colors" style={{ color: '#1A3A5C' }}>
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[#2563EB] font-semibold group-hover:gap-4 transition-all">
                  Ler mais
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
