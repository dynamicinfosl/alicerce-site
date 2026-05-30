import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.team-card');
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

  const team = [
    {
      name: 'Sofia Rodrigues',
      role: 'Diretora Geral',
      bio: 'Mais de 10 anos de experiência em gestão de serviços',
      initial: 'SR',
      color: '#2563EB'
    },
    {
      name: 'Miguel Oliveira',
      role: 'Coordenador de Limpeza',
      bio: 'Especialista em limpeza profissional e higienização',
      initial: 'MO',
      color: '#38BDF8'
    },
    {
      name: 'Ricardo Alves',
      role: 'Técnico de Construção',
      bio: 'Engenheiro civil com vasta experiência em obras',
      initial: 'RA',
      color: '#1A3A5C'
    },
    {
      name: 'Beatriz Santos',
      role: 'Atendimento ao Cliente',
      bio: 'Dedicada a garantir a satisfação total dos clientes',
      initial: 'BS',
      color: '#38BDF8'
    },
    {
      name: 'Tiago Costa',
      role: 'Técnico de Instalações',
      bio: 'Certificado em instalações elétricas e hidráulicas',
      initial: 'TC',
      color: '#2563EB'
    }
  ];

  return (
    <section ref={sectionRef} id="equipa" className="py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
            A Nossa Equipa
          </h2>
          <p className="text-lg text-gray-600">
            Profissionais qualificados e dedicados ao seu serviço
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl cursor-pointer group"
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
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: member.color }}
              >
                {member.initial}
              </div>
              <h3 className="font-semibold mb-1" style={{ color: '#1A3A5C' }}>
                {member.name}
              </h3>
              <div className="text-sm mb-3" style={{ color: '#2563EB' }}>
                {member.role}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {member.bio}
              </p>
              <button className="text-gray-400 hover:text-[#2563EB] transition-colors">
                <Linkedin size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
