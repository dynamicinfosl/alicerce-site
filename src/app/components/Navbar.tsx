import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'scrolled', targets: nav },
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: 'rgba(26, 58, 92, 0.97)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          duration: 0.4
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: 'rgba(26, 58, 92, 0.9)',
          backdropFilter: 'blur(0px)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.4
        });
      }
    });
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Equipa', href: '#equipa' },
    { label: 'Orçamento', href: '#orcamento' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all duration-400"
      style={{ backgroundColor: 'rgba(26, 58, 92, 0.9)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#inicio" className="flex items-center">
          <Logo className="h-12 w-auto" variant="light" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-[#38BDF8] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#38BDF8] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <a
            href="#orcamento"
            className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }}
          >
            Pedir Orçamento
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1A3A5C] shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#38BDF8] py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#orcamento"
              className="px-6 py-2.5 rounded-lg font-semibold text-center"
              style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pedir Orçamento
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
