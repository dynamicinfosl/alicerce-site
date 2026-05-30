import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: 'Maria Silva',
      service: 'Limpeza Residencial',
      rating: 5,
      text: 'Serviço impecável! A equipa da Alicerce Galante deixou a minha casa brilhante. Profissionais, pontuais e muito cuidadosos. Recomendo vivamente!',
      initial: 'MS'
    },
    {
      name: 'João Ferreira',
      service: 'Remodelação Interior',
      rating: 5,
      text: 'Fizeram a remodelação completa da minha cozinha. O resultado superou as expectativas. Trabalho de excelência e acabamentos perfeitos.',
      initial: 'JF'
    },
    {
      name: 'Ana Costa',
      service: 'Limpeza Comercial',
      rating: 5,
      text: 'Contratámos para o nosso escritório e não podíamos estar mais satisfeitos. Equipa responsável e serviço de qualidade superior.',
      initial: 'AC'
    },
    {
      name: 'Pedro Santos',
      service: 'Limpeza Pós-Obra',
      rating: 5,
      text: 'Após a obra da nossa nova loja, a Alicerce Galante fez uma limpeza profunda incrível. Ficou tudo pronto a tempo da inauguração!',
      initial: 'PS'
    },
    {
      name: 'Carla Mendes',
      service: 'Condomínio',
      rating: 5,
      text: 'Como síndica do nosso condomínio, escolhi a Alicerce Galante para a limpeza das áreas comuns. Todos os condóminos estão muito satisfeitos!',
      initial: 'CM'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    gsap.fromTo(
      testimonialRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1A3A5C', fontFamily: 'Syne, sans-serif' }}>
            O Que Dizem os Nossos Clientes
          </h2>
          <p className="text-lg text-gray-600">
            A confiança dos nossos clientes é o nosso maior orgulho
          </p>
        </div>

        <div ref={testimonialRef} className="relative">
          <div className="bg-gradient-to-br from-[#1A3A5C] to-[#2563EB] rounded-2xl p-8 md:p-12 text-white">
            <Quote className="text-[#38BDF8] mb-6" size={48} />

            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              "{current.text}"
            </p>

            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: '#38BDF8', color: '#1A3A5C' }}
              >
                {current.initial}
              </div>
              <div>
                <div className="font-semibold text-lg">{current.name}</div>
                <div className="text-white/80 text-sm">{current.service}</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current text-yellow-300" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex ? '#2563EB' : '#D1D5DB'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
