import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Leaf, DollarSign, Clock, Users, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.benefit-item');
    if (!items || items.length === 0) return;

    // Ensure visible first as fallback
    gsap.set(items, { opacity: 1, x: 0 });

    gsap.fromTo(items,
      { x: -60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, []);

  const benefits = [
    { icon: CheckCircle, title: 'Equipa certificada e segurada', desc: 'Profissionais qualificados e formados' },
    { icon: Leaf, title: 'Produtos eco-friendly disponíveis', desc: 'Opções sustentáveis para o ambiente' },
    { icon: DollarSign, title: 'Orçamento grátis e sem compromisso', desc: 'Transparência total nos nossos preços' },
    { icon: Clock, title: 'Serviço rápido e pontual', desc: 'Respeitamos o seu tempo e prazos' },
    { icon: Users, title: 'Atendimento personalizado', desc: 'Soluções adaptadas às suas necessidades' },
    { icon: MapPin, title: 'Cobertura nacional', desc: 'Distrito do Porto e Grande Lisboa' }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
              Por Que Nos Escolher?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Somos mais do que uma empresa de limpeza e construção. Somos o alicerce do seu espaço perfeito,
              combinando qualidade, confiança e dedicação em cada serviço.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item flex gap-4 items-start">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#EFF6FF' }}>
                    <benefit.icon className="text-[#2563EB]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#1A3A5C' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)' }}>
              <div className="w-full h-full flex items-center justify-center text-white p-12">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>+500</div>
                  <div className="text-2xl mb-8">Clientes Satisfeitos</div>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-8 h-8 fill-current text-yellow-300" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-4 text-lg opacity-90">98% Taxa de Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
