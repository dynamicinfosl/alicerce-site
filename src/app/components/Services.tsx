import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles, Building2, Wrench, Home, Briefcase, Trash2,
  Sofa, Key, Droplets, Construction, PaintBucket, Hammer,
  Shield, Zap, Droplet, Wind, FileCheck, Trees, Lock, X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<any | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

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
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, []);

  // Modal animations
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(modalRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeService]);

  const cleaningServices = [
    {
      icon: Home,
      title: 'Limpeza Residencial',
      desc: 'Casas, apartamentos e moradias — regular ou pontual',
      category: 'Limpeza Profissional',
      detailedDesc: 'Oferecemos um serviço flexível e rigoroso para a sua habitação. Adaptamo-nos às suas necessidades com equipas formadas e de confiança, quer procure uma limpeza regular (semanal, quinzenal) ou um serviço pontual. Utilizamos produtos profissionais seguros e técnicas que garantem a higienização completa de todas as divisões, incluindo aspiração profunda, desinfeção de superfícies, limpeza detalhada de casas de banho e cozinha, e tratamento de pavimentos.'
    },
    {
      icon: Briefcase,
      title: 'Limpeza Comercial',
      desc: 'Escritórios, lojas, espaços de trabalho',
      category: 'Limpeza Profissional',
      detailedDesc: 'Mantenha a sua empresa limpa, saudável e com uma apresentação impecável para clientes e colaboradores. Os nossos serviços de limpeza comercial adaptam-se aos horários do seu negócio (laborais ou pós-laborais) para não perturbar a atividade diária. Inclui a higienização de postos de trabalho, salas de reunião, áreas comuns, copa, remoção de resíduos e desinfeção de superfícies de toque frequente.'
    },
    {
      icon: Sparkles,
      title: 'Limpeza Profunda',
      desc: 'Limpeza geral completa, desinfeção total',
      category: 'Limpeza Profissional',
      detailedDesc: 'Uma intervenção minuciosa recomendada para limpezas de primavera, mudanças de estação ou após longos períodos de inatividade do imóvel. Cobrimos todas as áreas de difícil acesso que não são limpas na rotina habitual: limpeza atrás de eletrodomésticos, desengorduramento exaustivo, limpeza de persianas e caixilhos, desinfeção profunda de sanitários e remoção de calcário acumulado.'
    },
    {
      icon: Construction,
      title: 'Limpeza Pós-Obra',
      desc: 'Remoção de pó, resíduos e entulho fino',
      category: 'Limpeza Profissional',
      detailedDesc: 'A fase final de qualquer remodelação ou construção requer uma limpeza especializada para eliminar o pó de gesso, resíduos de tinta, cimento e silicone das superfícies. Dispomos de equipamentos industriais de aspiração e produtos químicos específicos que limpam profundamente sem danificar os novos materiais e acabamentos. O seu espaço pronto a habitar!'
    },
    {
      icon: Building2,
      title: 'Limpeza de Condomínios',
      desc: 'Partes comuns, escadas, garagens, hall',
      category: 'Limpeza Profissional',
      detailedDesc: 'Garantimos a manutenção e higienização das áreas comuns do seu prédio com um serviço periódico e profissional. Cuidamos do hall de entrada, escadas, elevadores, corrimãos, vidros, garagens, áreas exteriores comuns e gestão de contentores de lixo. Ajudamos a manter o condomínio limpo, agradável e valorizado.'
    },
    {
      icon: Sparkles,
      title: 'Limpeza de Vidros',
      desc: 'Interior e exterior, incluindo alturas',
      category: 'Limpeza Profissional',
      detailedDesc: 'Serviço especializado de limpeza de vidros, caixilhos, calhas e portadas. Atuamos em moradias, apartamentos, escritórios e montras comerciais. Utilizamos técnicas profissionais de secagem e produtos repelentes de poeiras para que a transparência e o brilho durem muito mais tempo. Cumprimos todas as normas de segurança para trabalhos em altura.'
    },
    {
      icon: Sofa,
      title: 'Sofás e Tapetes',
      desc: 'Higienização profunda com equipamento especializado',
      category: 'Limpeza Profissional',
      detailedDesc: 'Elimine ácaros, fungos, bactérias e manchas difíceis dos seus estofados e tapetes. Utilizamos o sistema de injeção-extração a quente ou a seco, de acordo com o tecido, que limpa profundamente as fibras sem danificar a textura ou a cor. Ideal para sofás, cadeiras estofadas, colchões, tapetes e alcatifas. Excelente para quem tem animais de estimação ou alergias.'
    },
    {
      icon: Key,
      title: 'Alojamento Local',
      desc: 'Gestão de limpeza para Airbnb e AL',
      category: 'Limpeza Profissional',
      detailedDesc: 'Serviço expresso e fiável para garantir a máxima pontuação dos seus hóspedes. Cuidamos de todo o processo de limpeza e higienização entre estadias (check-out/check-in), incluindo reposição de consumíveis, lavagem e tratamento de roupa de cama e atoalhados, e verificação geral do estado do imóvel para reportar qualquer anomalia.'
    },
    {
      icon: Trash2,
      title: 'Pré/Pós Mudança',
      desc: 'Preparação e finalização de imóveis',
      category: 'Limpeza Profissional',
      detailedDesc: 'Seja para vender, arrendar ou entrar numa nova casa, este serviço prepara o imóvel para estar nas condições ideais. Fazemos uma limpeza geral e desinfeção minuciosa para que possa fazer a sua mudança com total tranquilidade, sabendo que tudo está impecável e higienizado antes de arrumar os seus pertences.'
    },
    {
      icon: Droplets,
      title: 'Desinfeção',
      desc: 'Ambientes sensíveis, sanitização profissional',
      category: 'Limpeza Profissional',
      detailedDesc: 'Sanitização de alto nível para clínicas, infantários, ginásios ou residências pós-doença. Utilizamos tecnologia de nebulização fria e desinfetantes homologados de largo espetro (virucidas, bactericidas e fungicidas), garantindo a eliminação de agentes patogénicos no ar e em superfícies sem deixar resíduos tóxicos.'
    }
  ];

  const constructionServices = [
    {
      icon: Hammer,
      title: 'Remodelações Interiores',
      desc: 'Obras de renovação, transformação de espaços',
      category: 'Construção e Remodelação',
      detailedDesc: 'Projetamos e executamos a remodelação integral ou parcial da sua casa ou espaço comercial. Especialistas em cozinhas, casas de banho, remodelação de salas e quartos. Desde a demolição e reconfiguração de paredes (em alvenaria ou pladur) até aos acabamentos finais, garantindo o controlo de qualidade e o cumprimento rigoroso dos prazos acordados.'
    },
    {
      icon: PaintBucket,
      title: 'Pintura Interior/Exterior',
      desc: 'Paredes, fachadas, tetos',
      category: 'Construção e Remodelação',
      detailedDesc: 'Serviços de pintura profissional com preparação cuidada das superfícies (tratamento de fissuras, humidade, bolores e aplicação de primários). Trabalhamos com tintas de alta qualidade de marcas conceituadas, garantindo excelente cobertura, durabilidade e acabamentos perfeitos tanto em paredes interiores como em fachadas exteriores sujeitas a intempéries.'
    },
    {
      icon: Construction,
      title: 'Carpintaria',
      desc: 'Armários, rodapés, soalhos, madeiras',
      category: 'Construção e Remodelação',
      detailedDesc: 'Fabrico, instalação e reparação de elementos em madeira. Executamos montagem de roupeiros embutidos, cozinhas por medida, portas interiores e exteriores, aplicação de soalho flutuante ou madeira maciça, rodapés, escadas e decks exteriores. Combinamos técnicas tradicionais com design moderno.'
    },
    {
      icon: Shield,
      title: 'Impermeabilização',
      desc: 'Terraços, casas de banho, coberturas',
      category: 'Construção e Remodelação',
      detailedDesc: 'Evite infiltrações, humidades estruturais e danos dispendiosos. Soluções especializadas de impermeabilização de coberturas, telhados, terraços, varandas, caves e zonas húmidas (como bases de duche). Utilizamos membranas asfálticas, telas líquidas poliuretânicas e argamassas impermeabilizantes de alta performance.'
    },
    {
      icon: Building2,
      title: 'Pavimentos',
      desc: 'Colocação e tratamento de pavimentos',
      category: 'Construção e Remodelação',
      detailedDesc: 'Instalação profissional de todo o tipo de pavimentos: cerâmicos, flutuantes, vinílicos, microcimento e madeira maciça. Realizamos também o tratamento, afagamento e envernizamento de pavimentos de madeira antigos, devolvendo-lhes o aspeto original e a proteção necessária.'
    },
    {
      icon: Home,
      title: 'Casas de Madeira',
      desc: 'Construção modular, amovível, sem licença',
      category: 'Construção e Remodelação',
      detailedDesc: 'Construção de cabanas, anexos ou habitações modulares ecológicas em madeira. Soluções personalizadas, com excelente isolamento térmico e acústico, ideais para terrenos rústicos, alojamento turístico ou anexos de jardim. Orientamos no processo de escolha de materiais resistentes a pragas e humidades de forma sustentável.'
    }
  ];

  const maintenanceServices = [
    {
      icon: Zap,
      title: 'Instalações Eléctricas',
      desc: 'Pequenas obras, revisões, certificações',
      category: 'Instalações e Manutenção',
      detailedDesc: 'Serviços de eletricista credenciado para instalação, manutenção e reparação de redes elétricas residenciais e comerciais. Montagem de quadros elétricos, alteração de potência, instalação de tomadas, interruptores e iluminação LED eficiente. Apoio técnico para processos de certificação e vistorias.'
    },
    {
      icon: Droplet,
      title: 'Instalações Hidráulicas',
      desc: 'Reparações, substituições, canalizações',
      category: 'Instalações e Manutenção',
      detailedDesc: 'Resolução rápida e eficaz de problemas de canalização. Reparação de roturas de água, desentupimentos, substituição de canalizações antigas, montagem de louças sanitárias, torneiras, autoclismos e instalação de termoacumuladores ou esquentadores. Serviço urgente disponível para roturas graves.'
    },
    {
      icon: Wind,
      title: 'Aquecimento/Climatização',
      desc: 'AVAC, ar condicionado, aquecimento central',
      category: 'Instalações e Manutenção',
      detailedDesc: 'Garanta o conforto térmico da sua casa ou escritório durante todo o ano. Instalação e manutenção de sistemas de ar condicionado (monosplit, multisplit e condutas) altamente eficientes, aquecimento central, caldeiras e bombas de calor. Ajudamos a escolher a solução que melhor equilibra conforto e poupança energética.'
    },
    {
      icon: FileCheck,
      title: 'Certificação Energética',
      desc: 'Obrigatória para venda/arrendamento',
      category: 'Instalações e Manutenção',
      detailedDesc: 'Realizamos a vistoria técnica e a emissão do Certificado Energético oficial para o seu imóvel, obrigatório por lei para publicitação, venda ou arrendamento. Analisamos o isolamento de paredes e coberturas, caixilharia, e eficiência dos equipamentos de climatização e águas quentes sanitárias.'
    },
    {
      icon: Trees,
      title: 'Espaços Verdes',
      desc: 'Manutenção, corte, arranjos exteriores',
      category: 'Instalações e Manutenção',
      detailedDesc: 'Desenho e manutenção de jardins residenciais, empresariais ou condomínios. Serviços de corte de relva, poda de árvores e arbustos, controlo de infestantes, adubação e instalação ou reparação de sistemas de rega automática. Mantenha os seus espaços exteriores bonitos e saudáveis em todas as estações.'
    },
    {
      icon: Lock,
      title: 'Serralharia',
      desc: 'Reparações, substituições, segurança',
      category: 'Instalações e Manutenção',
      detailedDesc: 'Instalação e reparação de estruturas metálicas: portões, grades de proteção, corrimãos, portas blindadas e fechaduras de segurança. Fabricamos e reparamos peças em ferro, alumínio ou inox. Abertura de portas de emergência e substituição imediata de fechaduras ou cilindros após perda de chaves.'
    }
  ];

  const ServiceCard = ({ icon: Icon, title, desc, detailedDesc, category, isPrimary = false }: any) => (
    <div
      onClick={() => setActiveService({ icon: Icon, title, desc, detailedDesc, category, isPrimary })}
      className="service-card p-6 rounded-xl transition-all duration-300 hover:shadow-xl cursor-pointer group flex flex-col justify-between"
      style={{
        backgroundColor: isPrimary ? '#EFF6FF' : '#FFFFFF',
        border: isPrimary ? '2px solid #2563EB' : '1px solid #E5E7EB'
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          y: -8,
          scale: 1.02,
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
      <div className="flex items-start gap-4 mb-4">
        <div
          className="p-3 rounded-lg transition-transform group-hover:rotate-12 duration-300 flex-shrink-0"
          style={{ backgroundColor: isPrimary ? '#2563EB' : '#EFF6FF' }}
        >
          <Icon className={isPrimary ? 'text-white' : 'text-[#2563EB]'} size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-2 text-base md:text-lg" style={{ color: '#1A3A5C' }}>
            {title}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Visual Indicator to click and know more */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] mt-2 border-t border-dashed border-gray-100 pt-3 group-hover:text-[#1D4ED8] transition-colors">
        <span>Saber mais</span>
        <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="servicos" className="py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-syne" style={{ color: '#1A3A5C' }}>
            Os Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluções completas de limpeza profissional, construção e manutenção. 
            <span className="block mt-2 text-sm font-semibold text-[#2563EB] bg-blue-50 py-1.5 px-4 rounded-full inline-block">
              💡 Clique em qualquer cartão de serviço para ler mais detalhes.
            </span>
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

      {/* Detailed Service Modal */}
      {activeService && (
        <div ref={backdropRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setActiveService(null)}
          />

          {/* Modal Container */}
          <div
            ref={modalRef}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 overflow-hidden z-10 border border-slate-100 flex flex-col"
          >
            {/* Header / Icon & Close Button */}
            <div className="flex justify-between items-start mb-6">
              <div
                className="p-3.5 rounded-xl text-[#2563EB] flex items-center justify-center"
                style={{ backgroundColor: activeService.isPrimary ? '#EFF6FF' : '#F1F5F9' }}
              >
                <activeService.icon size={32} />
              </div>
              <button
                onClick={() => setActiveService(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <span className="text-xs font-bold text-[#2563EB] mb-2 uppercase tracking-wider">
              {activeService.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A3A5C] font-syne leading-tight">
              {activeService.title}
            </h3>
            
            <div className="text-gray-600 leading-relaxed space-y-4 mb-8 text-sm md:text-base">
              <p className="font-semibold text-[#1A3A5C] bg-[#F8FAFC] p-3 rounded-lg border-l-4 border-[#2563EB]">
                {activeService.desc}
              </p>
              <p className="text-gray-600 mt-2">
                {activeService.detailedDesc}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <a
                href="#orcamento"
                onClick={() => {
                  setActiveService(null);
                }}
                className="flex-1 text-center py-3 px-6 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                style={{ backgroundColor: '#2563EB' }}
              >
                Pedir Orçamento Grátis
              </a>
              <button
                onClick={() => setActiveService(null)}
                className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
