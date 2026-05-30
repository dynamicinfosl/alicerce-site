import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, CheckCircle, Star, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters = statsRef.current?.querySelectorAll('.counter');
    if (!counters || counters.length === 0) return;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      // Set final value first as fallback
      counter.textContent = target > 99 ? `+${target}` : `${target}%`;

      gsap.fromTo(counter,
        { innerText: 0 },
        {
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
          },
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          onUpdate: function() {
            const value = Math.ceil(gsap.getProperty(this.targets()[0], "innerText") as number);
            if (counter.textContent) {
              counter.textContent = value > 99 ? `+${value}` : `${value}%`;
            }
          }
        }
      );
    });
  }, []);

  const stats = [
    { icon: Home, value: 500, label: 'Clientes Satisfeitos', suffix: '+' },
    { icon: CheckCircle, value: 1200, label: 'Serviços Concluídos', suffix: '+' },
    { icon: Star, value: 98, label: 'Taxa de Satisfação', suffix: '%' },
    { icon: Calendar, value: 5, label: 'Anos de Experiência', suffix: '+' }
  ];

  return (
    <section
      ref={statsRef}
      className="py-16 md:py-20"
      style={{ backgroundColor: '#1A3A5C' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#38BDF8]" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="counter" data-target={stat.value}>
                  0
                </span>
                {stat.suffix !== '%' && stat.suffix}
              </div>
              <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
