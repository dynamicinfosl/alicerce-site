import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles, Building2, Wrench, Home, Briefcase, Trash2,
  Sofa, Key, Droplets, Construction, PaintBucket, Hammer,
  Shield, Zap, Droplet, Wind, FileCheck, Trees, Lock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.service-card');
    if (!cards || cards.length === 0) return;

    // Ensure cards start visible (fallback if animation fails)
    gsap.set(cards, { opacity: 1, y: 0 });

    // Animate from invisible to visible
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
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, []);

  const cleaningServices = [
    { icon: Home, title: 'Limpeza Residencial', desc: 'Casas, apartamentos e moradias — regular ou pontual' },
    { icon: Briefcase, title: 'Limpeza Comercial', desc: 'Escritórios, lojas, espaços de trabalho' },
    { icon: Sparkles, title: 'Limpeza Profunda', desc: 'Limpeza geral completa, desinfeção total' },
    { icon: Construction, title: 'Limpeza Pós-Obra', desc: 'Remoção de pó, resíduos e entulho fino' },
    { icon: Building2, title: 'Limpeza de Condomínios', desc: 'Partes comuns, escadas, garagens, hall' },
    { icon: Sparkles, title: 'Limpeza de Vidros', desc: 'Interior e exterior, incluindo alturas' },
    { icon: Sofa, title: 'Sofás e Tapetes', desc: 'Higienização profunda com equipamento especializado' },
    { icon: Key, title: 'Alojamento Local', desc: 'Gestão de limpeza para Airbnb e AL' },
    { icon: Trash2, title: 'Pré/Pós Mudança', desc: 'Preparação e finalização de imóveis' },
    { icon: Droplets, title: 'Desinfeção', desc: 'Ambientes sensíveis, sanitização profissional' }
  ];

  const constructionServices = [
    { icon: Hammer, title: 'Remodelações Interiores', desc: 'Obras de renovação, transformação de espaços' },
    { icon: PaintBucket, title: 'Pintura Interior/Exterior', desc: 'Paredes, fachadas, tetos' },
    { icon: Construction, title: 'Carpintaria', desc: 'Armários, rodapés, soalhos, madeiras' },
    { icon: Shield, title: 'Impermeabilização', desc: 'Terraços, casas de banho, coberturas' },
    { icon: Building2, title: 'Pavimentos', desc: 'Colocação e tratamento de pavimentos' },
    { icon: Home, title: 'Casas de Madeira', desc: 'Construção modular, amovível, sem licença' }
  ];

  const maintenanceServices = [
    { icon: Zap, title: 'Instalações Eléctricas', desc: 'Pequenas obras, revisões, certificações' },
    { icon: Droplet, title: 'Instalações Hidráulicas', desc: 'Reparações, substituições, canalizações' },
    { icon: Wind, title: 'Aquecimento/Climatização', desc: 'AVAC, ar condicionado, aquecimento central' },
    { icon: FileCheck, title: 'Certificação Energética', desc: 'Obrigatória para venda/arrendamento' },
    { icon: Trees, title: 'Espaços Verdes', desc: 'Manutenção, corte, arranjos exteriores' },
    { icon: Lock, title: 'Serralharia', desc: 'Reparações, substituições, segurança' }
  ];

  const ServiceCard = ({ icon: Icon, title, desc, isPrimary = false }: any) => (
    <div
      className="service-card p-6 rounded-xl transition-all duration-300 hover:shadow-xl cursor-pointer group"
      style={{
        backgroundColor: isPrimary ? '#EFF6FF' : '#FFFFFF',
        border: isPrimary ? '2px solid #2563EB' : '1px solid #E5E7EB'
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          y: -8,
          scale: 1.03,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          y: 0,
          scale: 1,
          duration: 0.3
        });
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-lg transition-transform group-hover:rotate-12 duration-300"
          style={{ backgroundColor: isPrimary ? '#2563EB' : '#EFF6FF' }}
        >
          <Icon className={isPrimary ? 'text-white' : 'text-[#2563EB]'} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2" style={{ color: '#1A3A5C' }}>
            {title}
            {isPrimary && (
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[#2563EB] text-white">
                Principal
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="servicos" className="py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
            Os Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluções completas de limpeza profissional, construção e manutenção para particulares e empresas
          </p>
        </div>

        {/* Limpeza Profissional */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#2563EB' }}>
            <Sparkles size={28} />
            Limpeza Profissional
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaningServices.map((service, index) => (
              <ServiceCard key={index} {...service} isPrimary />
            ))}
          </div>
        </div>

        {/* Construção e Remodelação */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#1A3A5C' }}>
            <Construction size={28} />
            Construção e Remodelação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructionServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        {/* Instalações e Manutenção */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#1A3A5C' }}>
            <Wrench size={28} />
            Instalações e Manutenção
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
