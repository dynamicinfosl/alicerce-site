import { useState, useEffect, useRef, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    if (!formRef.current) return;

    // Ensure visible first as fallback
    gsap.set(formRef.current, { opacity: 1, x: 0 });

    gsap.fromTo(formRef.current,
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
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);

    gsap.from('.success-message', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <section ref={sectionRef} id="orcamento" className="py-20" style={{ backgroundColor: '#EFF6FF' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
            Peça o Seu Orçamento Grátis
          </h2>
          <p className="text-lg text-gray-600">
            Respondemos em menos de 24 horas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div ref={formRef} className="bg-white rounded-2xl p-8 shadow-lg">
            {showSuccess ? (
              <div className="success-message text-center py-12">
                <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-green-500" />
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A3A5C' }}>
                  Pedido Enviado com Sucesso!
                </h3>
                <p className="text-gray-600">
                  Receberá o nosso contacto nas próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                    placeholder="O seu nome"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                      placeholder="+351..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                    Tipo de Serviço *
                  </label>
                  <select
                    required
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                  >
                    <option value="">Selecione...</option>
                    <option value="limpeza-residencial">Limpeza Residencial</option>
                    <option value="limpeza-comercial">Limpeza Comercial</option>
                    <option value="pos-obra">Limpeza Pós-Obra</option>
                    <option value="construcao">Construção/Remodelação</option>
                    <option value="instalacoes">Instalações</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                      Localização / Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                      placeholder="Vila Nova de Gaia"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                      Área aproximada (m²)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                      placeholder="100"
                    />
                  </div>
                </div>

                {serviceType.includes('limpeza') && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                      Frequência
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all">
                      <option value="pontual">Pontual</option>
                      <option value="semanal">Semanal</option>
                      <option value="quinzenal">Quinzenal</option>
                      <option value="mensal">Mensal</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                    Mensagem / Detalhes Adicionais
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all resize-none"
                    placeholder="Descreva as suas necessidades..."
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    required
                    id="privacy"
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Aceito a Política de Privacidade *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }}
                >
                  Enviar Pedido de Orçamento
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#1A3A5C' }}>
                Informações de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#2563EB' }}>
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: '#1A3A5C' }}>Telefone</div>
                    <a href="tel:+351928380182" className="text-gray-600 hover:text-[#2563EB]">
                      +351 928 380 182
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#2563EB' }}>
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: '#1A3A5C' }}>Email</div>
                    <a href="mailto:geral@alicercegalante.pt" className="text-gray-600 hover:text-[#2563EB]">
                      geral@alicercegalante.pt
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#2563EB' }}>
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: '#1A3A5C' }}>Morada</div>
                    <p className="text-gray-600">
                      Rua das Camélias, 135<br />
                      4430-038 Vila Nova de Gaia
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#2563EB' }}>
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: '#1A3A5C' }}>Horário</div>
                    <p className="text-gray-600">
                      Segunda a Sexta: 9h - 18h<br />
                      Sábado: 9h - 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold mb-4" style={{ color: '#1A3A5C' }}>
                Tempo de Resposta
              </h4>
              <div className="space-y-3 text-sm text-gray-600">
                <p>✓ Resposta ao pedido: <strong>até 24 horas</strong></p>
                <p>✓ Visita de avaliação: <strong>2-3 dias úteis</strong></p>
                <p>✓ Envio de orçamento: <strong>24-48 horas após visita</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
