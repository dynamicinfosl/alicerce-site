import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Query to search for cleaning, professional cleaning, remodeling, construction, or home maintenance in Portugal
        const query = encodeURIComponent('(limpeza OR "limpeza doméstica" OR "limpeza profissional" OR "remodelações de interiores" OR "construção civil" OR "remodelação de casas" OR "manutenção residencial")');
        const apiKey = 'ae5c017120d64fc3ad7ba7accee4aae1';
        const url = `https://newsapi.org/v2/everything?q=${query}&language=pt&sortBy=relevance&pageSize=15&apiKey=${apiKey}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao ligar ao servidor de notícias');

        const data = await res.json();

        if (data.articles && data.articles.length > 0) {
          const cleanArticles = data.articles
            .filter((art: any) =>
              art.title &&
              art.title !== '[Removed]' &&
              art.description &&
              art.description !== '[Removed]' &&
              !art.title.toLowerCase().includes('removido')
            )
            .slice(0, 3)
            .map((art: any, index: number) => {
              // Infer category
              let category = 'Manutenção';
              const text = (art.title + ' ' + art.description).toLowerCase();
              if (text.includes('limp') || text.includes('higieniz')) {
                category = 'Limpeza';
              } else if (text.includes('constru') || text.includes('remodel') || text.includes('obra')) {
                category = 'Construção';
              }

              const gradients = [
                'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                'linear-gradient(135deg, #1A3A5C 0%, #2563EB 100%)',
                'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)'
              ];

              return {
                title: art.title,
                category: category,
                date: new Date(art.publishedAt).toLocaleDateString('pt-PT', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }),
                excerpt: art.description.length > 130 
                  ? art.description.substring(0, 130) + '...' 
                  : art.description,
                image: art.urlToImage,
                url: art.url,
                gradient: gradients[index % gradients.length]
              };
            });

          if (cleanArticles.length >= 2) {
            setArticles(cleanArticles);
            setIsLoading(false);
            return;
          }
        }
        throw new Error('Notícias insuficientes após filtragem');
      } catch (err) {
        console.warn("NewsAPI falhou ou está restrito por CORS em produção. Usando fallback local...", err);
        // Fallback local em Português adaptado para Portugal
        const localArticles = [
          {
            title: '5 Dicas para Manter a Sua Casa Sempre Limpa e Organizada',
            category: 'Limpeza',
            date: '15 Mai 2026',
            excerpt: 'Descubra técnicas simples, rotinas diárias e produtos eficazes para manter a sua casa impecável com o mínimo esforço.',
            url: 'https://alicercegalante.pt/blog/dicas-casa-limpa',
            image: null,
            gradient: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)'
          },
          {
            title: 'Quando Fazer uma Limpeza Profunda? Guia Prático para Proprietários',
            category: 'Limpeza Profissional',
            date: '10 Mai 2026',
            excerpt: 'Saiba identificar o momento certo para contratar uma higienização profunda no seu imóvel e quais os principais benefícios para a saúde.',
            url: 'https://alicercegalante.pt/blog/guia-limpeza-profunda',
            image: null,
            gradient: 'linear-gradient(135deg, #1A3A5C 0%, #2563EB 100%)'
          },
          {
            title: 'Remodelação de Interiores: O Que Esperar na Limpeza Pós-Obra',
            category: 'Construção',
            date: '05 Mai 2026',
            excerpt: 'Um guia prático sobre os cuidados necessários após uma remodelação completa e a importância de remover detritos finos.',
            url: 'https://alicercegalante.pt/blog/limpeza-pos-obra-guia',
            image: null,
            gradient: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)'
          }
        ];
        setArticles(localArticles);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (isLoading || articles.length === 0) return;

    const cards = sectionRef.current?.querySelectorAll('.blog-card');
    if (!cards || cards.length === 0) return;

    // Ensure cards start visible (fallback if animation fails)
    gsap.set(cards, { opacity: 1, y: 0 });

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
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, [isLoading, articles]);

  return (
    <section ref={sectionRef} className="py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-syne" style={{ color: '#1A3A5C' }}>
            Dicas e Artigos Recentes
          </h2>
          <p className="text-lg text-gray-600">
            Artigos e notícias do setor de limpeza, construção e manutenção
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg h-96 animate-pulse">
                <div className="h-48 bg-slate-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -8,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    duration: 0.3
                  });
                }}
              >
                <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {article.image ? (
                    <>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Hide broken image and fall back to gradient
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full" style={{ background: article.gradient }}>
                      <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <pattern id={`pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1" fill="white"/>
                          </pattern>
                          <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                        </svg>
                      </div>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 bg-white/90 text-[#2563EB] rounded-full shadow-sm z-10">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar size={16} />
                      {article.date}
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2" style={{ color: '#1A3A5C' }}>
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#2563EB] font-semibold group-hover:gap-4 transition-all mt-auto pt-2 text-sm">
                    Ler artigo completo
                    <ArrowRight size={18} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
