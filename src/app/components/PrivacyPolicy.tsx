import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Shield, Lock, Eye, FileText, HeartHandshake, Mail, MapPin, Phone, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const elements = containerRef.current?.querySelectorAll('.animate-fade');
    if (elements && elements.length > 0) {
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8 animate-fade">
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao Início
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade">
          <div className="inline-flex p-3 rounded-full bg-blue-50 text-[#2563EB] mb-4">
            <Shield size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A3A5C] font-syne">
            Política de Privacidade
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            A sua privacidade e a segurança dos seus dados são fundamentais para nós. Conheça como protegemos as suas informações em conformidade com o RGPD.
          </p>
          <div className="mt-4 text-xs text-gray-500 font-medium">
            Última atualização: 3 de junho de 2026
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 animate-fade">
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#1A3A5C] flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 text-[#2563EB]"><FileText size={20} /></span>
              1. Informação Geral e Responsável pelo Tratamento
            </h2>
            <div className="text-gray-600 space-y-3 leading-relaxed text-sm md:text-base">
              <p>
                A presente Política de Privacidade regula o tratamento de dados pessoais recolhidos através do website da <strong>Alicerce Galante - Serviços e Construções LDA</strong>.
              </p>
              <p>
                Como fornecedora de serviços de limpeza profissional, remodelações e manutenção, assumimos o compromisso de proteger a privacidade de todos os nossos utilizadores, clientes e parceiros, alinhando as nossas práticas com o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia.
              </p>
              <p>
                <strong>Entidade Responsável:</strong> Alicerce Galante - Serviços e Construções LDA<br />
                <strong>Morada:</strong> Rua das Camélias, 135, 4430-038 Vila Nova de Gaia, Portugal<br />
                <strong>Contacto de E-mail:</strong> <a href="mailto:geral@alicercegalante.pt" className="text-[#2563EB] hover:underline">geral@alicercegalante.pt</a>
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#1A3A5C] flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 text-[#2563EB]"><Eye size={20} /></span>
              2. Dados Pessoais que Recolhemos
            </h2>
            <div className="text-gray-600 space-y-3 leading-relaxed text-sm md:text-base">
              <p>
                Recolhemos dados pessoais apenas quando estes nos são fornecidos diretamente por si, especificamente ao submeter o nosso formulário de pedido de orçamento ou ao entrar em contacto connosco por e-mail, telefone ou WhatsApp:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Identificação:</strong> Nome completo ou nome da empresa.</li>
                <li><strong>Contactos:</strong> Endereço de e-mail e número de telefone.</li>
                <li><strong>Localização e Execução:</strong> Morada do imóvel onde o serviço será realizado (essencial para serviços presenciais de limpeza, remodelação e manutenção).</li>
                <li><strong>Detalhes do Serviço:</strong> Tipo de serviço solicitado, dimensões do espaço, fotos/anexos fornecidos e informações específicas inseridas na sua mensagem de descrição.</li>
                <li><strong>Dados de Navegação:</strong> Informações recolhidas automaticamente (endereço IP, cookies básicos de sessão) para otimização da navegação e segurança do website.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#1A3A5C] flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 text-[#2563EB]"><Lock size={20} /></span>
              3. Finalidade e Legitimidade do Tratamento
            </h2>
            <div className="text-gray-600 space-y-3 leading-relaxed text-sm md:text-base">
              <p>
                Os seus dados pessoais são recolhidos e tratados de forma estritamente confidencial, tendo como fundamentos legais e finalidades:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Diligências Pré-Contratuais:</strong> Elaboração de orçamentos personalizados e agendamento de visitas técnicas para avaliação de obras ou serviços de limpeza.</li>
                <li><strong>Execução de Contrato:</strong> Prestação dos serviços de limpeza, construção e manutenção acordados.</li>
                <li><strong>Comunicação e Apoio ao Cliente:</strong> Responder a dúvidas, reclamações ou pedidos de esclarecimento enviados pelos utilizadores.</li>
                <li><strong>Cumprimento de Obrigações Legais:</strong> Emissão de faturas, recibos e comunicação com as autoridades fiscais.</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#1A3A5C] flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 text-[#2563EB]"><HeartHandshake size={20} /></span>
              4. Partilha de Dados com Terceiros
            </h2>
            <div className="text-gray-600 space-y-3 leading-relaxed text-sm md:text-base">
              <p>
                A Alicerce Galante <strong>não vende, não aluga e não comercializa</strong> os seus dados pessoais a terceiros. Os seus dados apenas poderão ser partilhados em situações estritamente necessárias para a operação:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Subcontratantes e Profissionais Parceiros:</strong> Equipas de eletricistas, carpinteiros ou pintores que participem ativamente na prestação do seu serviço (sob estrito acordo de confidencialidade).</li>
                <li><strong>Prestadores de Serviços Tecnológicos:</strong> Serviços de alojamento web, faturação e envio de e-mails.</li>
                <li><strong>Obrigações Legais:</strong> Quando exigido por autoridades judiciais, tributárias ou regulatórias.</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#1A3A5C] flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 text-[#2563EB]"><Shield size={20} /></span>
              5. Período de Conservação dos Dados
            </h2>
            <div className="text-gray-600 space-y-3 leading-relaxed text-sm md:text-base">
              <p>
                Conservamos os seus dados pessoais apenas pelo tempo estritamente necessário para cumprir as finalidades para as quais foram recolhidos ou para cumprir obrigações legais de conservação de registos fiscais e contabilísticos (que em Portugal podem exigir a guarda de dados de faturação por até 10 anos).
              </p>
              <p>
                Dados de orçamentos que não resultem em contratação efetiva serão eliminados no prazo máximo de 1 ano a contar do último contacto, exceto se houver consentimento explícito do utilizador para mantermos o contacto para futuras oportunidades.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#1A3A5C] flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 text-[#2563EB]"><Lock size={20} /></span>
              6. Segurança dos Dados
            </h2>
            <div className="text-gray-600 space-y-3 leading-relaxed text-sm md:text-base">
              <p>
                Implementamos medidas de segurança técnicas e organizativas adequadas para proteger os seus dados pessoais contra a destruição acidental ou ilícita, perda acidental, alteração, difusão ou acesso não autorizado.
              </p>
              <p>
                O nosso website utiliza encriptação SSL (HTTPS) para garantir que a transferência de dados entre o seu navegador e os nossos servidores ocorra de forma segura.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#1A3A5C] flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-50 text-[#2563EB]"><FileText size={20} /></span>
              7. Quais são os seus Direitos?
            </h2>
            <div className="text-gray-600 space-y-3 leading-relaxed text-sm md:text-base">
              <p>
                Ao abrigo do RGPD, tem o direito de controlar a forma como os seus dados pessoais são geridos. Pode, a qualquer momento, exercer os seguintes direitos:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Direito de Acesso:</strong> Obter confirmação de que os seus dados estão a ser tratados e receber uma cópia dos mesmos.</li>
                <li><strong>Direito de Retificação:</strong> Solicitar a correção de dados incorretos ou desatualizados.</li>
                <li><strong>Direito de Apagamento ("Esquecimento"):</strong> Solicitar a eliminação dos seus dados quando estes já não forem necessários ou quando retirar o seu consentimento.</li>
                <li><strong>Direito à Portabilidade:</strong> Receber os seus dados num formato estruturado e de leitura automática para os transferir para outra entidade.</li>
                <li><strong>Direito de Oposição ou Limitação:</strong> Opor-se ao tratamento de dados para marketing ou limitar as operações de tratamento.</li>
              </ul>
              <p className="mt-4">
                Para exercer qualquer um destes direitos, basta enviar um e-mail para <a href="mailto:geral@alicercegalante.pt" className="text-[#2563EB] hover:underline font-semibold">geral@alicercegalante.pt</a>. Responderemos ao seu pedido num prazo máximo de 30 dias.
              </p>
            </div>
          </div>

          {/* Contact Footer Info */}
          <div className="bg-gradient-to-br from-[#1A3A5C] to-[#2563EB] text-white p-8 rounded-2xl shadow-md">
            <h3 className="text-lg font-bold mb-4">Dúvidas ou Questões sobre Privacidade?</h3>
            <p className="text-white/80 mb-6 text-sm md:text-base">
              Se tiver qualquer questão relacionada com esta Política de Privacidade ou com o tratamento que fazemos das suas informações, sinta-se à vontade para nos contactar pelos nossos canais oficiais:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Mail size={18} className="text-[#38BDF8]" />
                <a href="mailto:geral@alicercegalante.pt" className="hover:underline">geral@alicercegalante.pt</a>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Phone size={18} className="text-[#38BDF8]" />
                <a href="tel:+351928380182" className="hover:underline">+351 928 380 182</a>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <MapPin size={18} className="text-[#38BDF8]" />
                <span>Vila Nova de Gaia, Portugal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link at the bottom */}
        <div className="mt-12 text-center">
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-[#1A3A5C] hover:bg-gray-50 transition-all font-semibold shadow-sm hover:shadow"
          >
            <ArrowLeft size={16} />
            Voltar para a Página Principal
          </a>
        </div>
      </div>
    </div>
  );
}
