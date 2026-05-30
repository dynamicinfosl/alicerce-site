# Alicerce Galante - Website

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Website institucional da **Alicerce Galante** - empresa de limpeza profissional, construção e manutenção sediada em Vila Nova de Gaia, Portugal.

## Stack Tecnológica

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.3.1 | UI library |
| Vite | 6.3.5 | Build tool & dev server |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| GSAP | 3.x | Animations & scroll triggers |
| shadcn/ui | latest | React component primitives |
| pnpm | 11.x | Package manager |

## Estrutura do Projeto

```
├── public/
│   └── videos/
│       ├── hero-video-1.mp4      # Background vídeo esquerdo
│       └── hero-video-2.mp4      # Background vídeo direito
├── src/
│   ├── app/
│   │   ├── components/           # Section components
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── QuoteForm.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── ui/               # shadcn/ui components
│   │   └── App.tsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   ├── fonts.css
│   │   └── globals.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── pnpm-workspace.yaml
├── package.json
└── .gitignore
```

## Desenvolvimento

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ (LTS recomendado)
- [pnpm](https://pnpm.io/) 11+ (`npm install -g pnpm`)

### Instalação

```bash
pnpm install
```

> **Nota:** O `pnpm-workspace.yaml` já contém `onlyBuiltDependencies` para permitir builds de `@tailwindcss/oxide` e `esbuild`.

### Servidor de desenvolvimento

```bash
pnpm dev
```

O Vite iniciará em `http://localhost:5173/` com Hot Module Replacement (HMR).

### Build de produção

```bash
pnpm build
```

Gera o bundle otimizado em `dist/`.

### Preview do build

```bash
pnpm preview
```

## Seções do Website

| Seção | Arquivo | Animação |
|-------|---------|----------|
| Hero | `Hero.tsx` | GSAP timeline + vídeos de fundo |
| Serviços | `Services.tsx` | ScrollTrigger fade-up |
| Estatísticas | `Stats.tsx` | ScrollTrigger counter |
| Porquê Nós | `WhyChooseUs.tsx` | ScrollTrigger fade-left |
| Processo | `Process.tsx` | ScrollTrigger fade-up + line scale |
| Equipa | `Team.tsx` | ScrollTrigger fade-up |
| Sobre Nós | `About.tsx` | ScrollTrigger fade-up |
| Blog | `Blog.tsx` | ScrollTrigger fade-up |
| Orçamento | `QuoteForm.tsx` | ScrollTrigger fade-left |
| Testemunhos | `Testimonials.tsx` | Auto-rotate carousel |

## Padrões de Código

### Animações GSAP

Sempre use `gsap.fromTo()` com estado final explícito e fallback de visibilidade:

```tsx
useEffect(() => {
  const elements = ref.current?.querySelectorAll('.animate-item');
  if (!elements || elements.length === 0) return;

  // Fallback: garante visibilidade imediata
  gsap.set(elements, { opacity: 1, y: 0 });

  // Animação com estado inicial e final explícitos
  gsap.fromTo(elements,
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
}, []);
```

**Nunca use `gsap.from()` sozinho** — elementos podem ficar invisíveis se o ScrollTrigger falhar.

## Changelog

Veja [CHANGELOG.md](./CHANGELOG.md) para o histórico completo de mudanças.

## Licença

Propriedade da Alicerce Galante. Todos os direitos reservados.