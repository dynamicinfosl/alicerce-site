import { useState, useEffect, useRef, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { supabaseFetch } from '../utils/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    location: '',
    area: '',
    frequency: 'pontual',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      setErrorMessage('Por favor, aceite a política de privacidade.');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Helper to save quote to Supabase
    const saveToSupabase = async () => {
      try {
        await supabaseFetch('orcamentos', {
          method: 'POST',
          body: JSON.stringify({
            nome: formData.name,
            email: formData.email,
            telefone: formData.phone,
            tipo_servico: formData.serviceType,
            localizacao: formData.location,
            area_m2: formData.area ? Number(formData.area) : null,
            frequencia: formData.serviceType.includes('limpeza') ? formData.frequency : "Não aplicável",
            mensagem: formData.message || "Sem detalhes adicionais",
            origem: 'Website',
            status: 'Pendente'
          })
        });
      } catch (err) {
        console.error("Erro ao guardar no Supabase:", err);
      }
    };

    // Helper to save quote to local storage
    const saveToLocalStorage = () => {
      try {
        const existingQuotes = JSON.parse(localStorage.getItem('alicerce_quotes') || '[]');
        const newQuote = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType,
          location: formData.location,
          area: formData.area || "Não informado",
          frequency: formData.serviceType.includes('limpeza') ? formData.frequency : "Não aplicável",
          message: formData.message || "Sem detalhes adicionais",
          status: 'Pendente'
        };
        existingQuotes.unshift(newQuote);
        localStorage.setItem('alicerce_quotes', JSON.stringify(existingQuotes));
      } catch (err) {
        console.error("Erro ao guardar no localStorage:", err);
      }
    };

    // Fallback for development if not configured
    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'your_service_id_here' || 
        templateId === 'your_template_id_here' || 
        publicKey === 'your_public_key_here') {
      console.warn("EmailJS não configurado nas variáveis de ambiente. Simulando envio...");
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsSubmitting(false);
      setShowSuccess(true);
      
      saveToLocalStorage();
      await saveToSupabase();
      
      gsap.from('.success-message', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        location: '',
        area: '',
        frequency: 'pontual',
        message: '',
        privacy: false
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 6000);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service_type: formData.serviceType,
            location: formData.location,
            area: formData.area || "Não informado",
            frequency: formData.serviceType.includes('limpeza') ? formData.frequency : "Não aplicável",
            message: formData.message || "Sem detalhes adicionais"
          }
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        saveToLocalStorage();
        await saveToSupabase();
        
        gsap.from('.success-message', {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          location: '',
          area: '',
          frequency: 'pontual',
          message: '',
          privacy: false
        });

        setTimeout(() => {
          setShowSuccess(false);
        }, 6000);
      } else {
        const errorText = await response.text();
        setErrorMessage(`Falha ao enviar o orçamento: ${errorText || 'Erro desconhecido no EmailJS'}`);
      }
    } catch (error: any) {
      setErrorMessage(`Erro de rede ao enviar: ${error.message || 'Verifique a sua ligação à internet'}`);
    } finally {
      setIsSubmitting(false);
    }
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
                <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-green-500 animate-bounce" />
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A3A5C' }}>
                  Pedido Enviado com Sucesso!
                </h3>
                <p className="text-gray-600">
                  Receberá o nosso contacto e proposta comercial nas próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm">
                    {errorMessage}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
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
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                      placeholder="100"
                    />
                  </div>
                </div>

                {formData.serviceType.includes('limpeza') && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1A3A5C' }}>
                      Frequência
                    </label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                    >
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
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all resize-none"
                    placeholder="Descreva as suas necessidades..."
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    required
                    id="privacy"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Aceito a Política de Privacidade *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2563EB', color: '#FFFFFF', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'A enviar...' : 'Enviar Pedido de Orçamento'}
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
