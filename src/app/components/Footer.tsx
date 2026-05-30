import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const quickLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Contacto', href: '#contacto' }
  ];

  const services = [
    { label: 'Limpeza Residencial', href: '#servicos' },
    { label: 'Limpeza Comercial', href: '#servicos' },
    { label: 'Limpeza Pós-Obra', href: '#servicos' },
    { label: 'Construção', href: '#servicos' },
    { label: 'Instalações', href: '#servicos' }
  ];

  return (
    <footer id="contacto" style={{ backgroundColor: '#1A3A5C' }}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Social */}
          <div>
            <Logo className="h-16 w-auto mb-4" variant="light" />
            <p className="text-white/80 mb-6 text-sm">
              Construímos confiança, limpamos o caminho
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#38BDF8] transition-colors">
                <Facebook className="text-white" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#38BDF8] transition-colors">
                <Instagram className="text-white" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#38BDF8] transition-colors">
                <Linkedin className="text-white" size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/70 hover:text-[#38BDF8] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-white/70 hover:text-[#38BDF8] transition-colors text-sm">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start text-white/70 text-sm">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Rua das Camélias, 135<br />4430-038 Vila Nova de Gaia</span>
              </li>
              <li className="flex gap-3 items-center text-white/70 text-sm">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+351928380182" className="hover:text-[#38BDF8] transition-colors">
                  +351 928 380 182
                </a>
              </li>
              <li className="flex gap-3 items-center text-white/70 text-sm">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:geral@alicercegalante.pt" className="hover:text-[#38BDF8] transition-colors">
                  geral@alicercegalante.pt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/60 text-sm">
            © 2025 Alicerce Galante - Serviços e Construções LDA · Todos os direitos reservados · NIF: XXXXXXXXX ·{' '}
            <a href="#" className="hover:text-[#38BDF8] transition-colors">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
