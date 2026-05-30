import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Search, Calendar, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = sectionRef.current?.querySelectorAll('.process-step');
    if (!steps || steps.length === 0) return;

    // Ensure visible first as fallback
    gsap.set(steps, { opacity: 1, y: 0 });

    gsap.fromTo(steps,
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

    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
          },
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut'
        }
      );
    }
  }, []);

  const steps = [
    {
      icon: FileText,
      number: '01',
      title: 'Pedido de Orçamento',
      desc: 'Preencha o formulário ou contacte-nos diretamente'
    },
    {
      icon: Search,
      number: '02',
      title: 'Visita / Avaliação',
      desc: 'Analisamos as suas necessidades e espaço'
    },
    {
      icon: Calendar,
      number: '03',
      title: 'Agendamento',
      desc: 'Escolha a data mais conveniente para si'
    },
    {
      icon: CheckCircle2,
      number: '04',
      title: 'Execução e Garantia',
      desc: 'Serviço de qualidade com garantia de satisfação'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600">
            Um processo simples e transparente, do primeiro contacto à garantia final
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-24 left-0 right-0 h-1 origin-left"
            style={{ backgroundColor: '#2563EB', transform: 'translateY(-50%)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="process-step relative">
                <div className="text-center">
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center relative z-10"
                    style={{ backgroundColor: '#2563EB' }}
                  >
                    <step.icon className="text-white" size={32} />
                  </div>
                  <div className="text-5xl font-bold mb-4 opacity-20" style={{ color: '#2563EB', fontFamily: 'Syne, sans-serif' }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A3A5C' }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
