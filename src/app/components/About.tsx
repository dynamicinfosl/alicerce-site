import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.value-card');
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

  const values = [
    {
      icon: Target,
      title: 'Missão',
      desc: 'Proporcionar serviços de limpeza e construção de excelência, superando as expectativas dos nossos clientes através de profissionalismo, dedicação e qualidade.'
    },
    {
      icon: Eye,
      title: 'Visão',
      desc: 'Ser a empresa de referência em serviços de limpeza e construção em Portugal, reconhecida pela confiança, inovação e compromisso com a satisfação total dos clientes.'
    },
    {
      icon: Heart,
      title: 'Valores',
      desc: 'Integridade, Qualidade, Pontualidade, Respeito pelo Cliente, Responsabilidade Ambiental e Melhoria Contínua em todos os nossos serviços.'
    }
  ];

  return (
    <section ref={sectionRef} id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
            Sobre Nós
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600">
            <p>
              A <strong style={{ color: '#1A3A5C' }}>Alicerce Galante</strong> nasceu da vontade de criar uma empresa
              que fosse verdadeiramente o alicerce de espaços perfeitos, combinando limpeza profissional de
              excelência com serviços de construção e manutenção de alta qualidade.
            </p>
            <p>
              Sediados em Vila Nova de Gaia, orgulhamo-nos de servir clientes por todo Portugal com uma
              equipa dedicada de profissionais certificados e apaixonados pelo que fazem.
            </p>
            <p>
              Com mais de 5 anos de experiência, construímos a nossa reputação sobre pilares sólidos:
              confiança, qualidade e compromisso com cada cliente que nos escolhe.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card bg-gradient-to-br from-[#EFF6FF] to-white p-8 rounded-xl border border-[#2563EB]/20 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#2563EB' }}>
                <value.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A3A5C' }}>
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Certificações */}
        <div className="bg-[#F1F5F9] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#1A3A5C' }}>
            Certificações e Parcerias
          </h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Certificação</div>
              <div className="font-semibold" style={{ color: '#1A3A5C' }}>ISO 9001</div>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Seguro</div>
              <div className="font-semibold" style={{ color: '#1A3A5C' }}>Responsabilidade Civil</div>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Certificação</div>
              <div className="font-semibold" style={{ color: '#1A3A5C' }}>Energética</div>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Membro</div>
              <div className="font-semibold" style={{ color: '#1A3A5C' }}>APEMETA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
