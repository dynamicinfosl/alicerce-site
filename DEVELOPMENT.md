# Processo de Desenvolvimento

Documentação do ciclo de desenvolvimento adotado para o projeto Alicerce Galante Website.

## Fluxo de Trabalho Git

### 1. Inicialização do Repositório

```bash
git init
git remote add origin https://github.com/bepadvocaciasys/alicerce-site.git
```

### 2. Configuração de Credenciais

O projeto utiliza Git Credential Manager v2.6.1 para autenticação segura com o GitHub:

```bash
git config --global credential.helper manager
```

### 3. Commits

Mensagens seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — nova funcionalidade
- `fix:` — correção de bug
- `docs:` — documentação
- `refactor:` — refatoração sem mudança de comportamento
- `chore:` — tarefas de manutenção

**Regra:** commits descritivos com corpo detalhando o problema, causa raiz e solução.

### 4. Push

```bash
git push -u origin main
```

## Diagnóstico e Resolução de Problemas

### Caso 1: Hero não aparecia

| Item | Descrição |
|------|-----------|
| **Sintoma** | Texto, badge e botões do Hero invisíveis |
| **Causa raiz** | `gsap.from()` definia apenas estado inicial (`opacity: 0`); se refs fossem `null`, animação não executava e elementos permaneciam invisíveis |
| **Solução** | Substituir por `gsap.fromTo()` com estado final explícito (`opacity: 1`) + guardas de null |
| **Arquivos** | `Hero.tsx` |

### Caso 2: Cards não apareciam

| Item | Descrição |
|------|-----------|
| **Sintoma** | Cards em múltiplas seções invisíveis após scroll |
| **Causa raiz 1** | `toggleActions: 'play none none reverse'` — ao rolar de volta para cima, GSAP revertia elementos para `opacity: 0` |
| **Causa raiz 2** | `gsap.from()` sem estado final explícito; se ScrollTrigger não disparasse, elementos ficavam invisíveis |
| **Solução** | (1) Alterar `toggleActions` para `'play none none none'` em 8 componentes; (2) Substituir `gsap.from()` por `gsap.fromTo()` + `gsap.set()` fallback |
| **Arquivos** | `Services.tsx`, `Stats.tsx`, `WhyChooseUs.tsx`, `Process.tsx`, `Team.tsx`, `About.tsx`, `Blog.tsx`, `QuoteForm.tsx` |

### Caso 3: pnpm install bloqueado

| Item | Descrição |
|------|-----------|
| **Sintoma** | `ERR_PNPM_IGNORED_BUILDS` para `@tailwindcss/oxide` e `esbuild` |
| **Causa raiz** | pnpm 11 exige `onlyBuiltDependencies` em `pnpm-workspace.yaml`; campo `pnpm` em `package.json` foi deprecado |
| **Solução** | Migrar configurações para `pnpm-workspace.yaml` com chave `onlyBuiltDependencies` |
| **Arquivos** | `pnpm-workspace.yaml`, `package.json` |

## Checklist de Qualidade

Antes de cada commit:

- [ ] `pnpm install` executa sem erros
- [ ] `pnpm dev` inicia o servidor sem warnings críticos
- [ ] Todas as seções são visíveis ao rolar a página
- [ ] Animações GSAP funcionam em todas as seções
- [ ] Vídeos do Hero iniciam automaticamente (muted + autoplay)

## Convenções de Código

### GSAP ScrollTrigger

```tsx
// CORRETO ✅
gsap.set(elements, { opacity: 1, y: 0 }); // fallback
gsap.fromTo(elements,
  { y: 60, opacity: 0 },
  {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 85%',
      toggleActions: 'play none none none',
      invalidateOnRefresh: true
    },
    y: 0, opacity: 1, stagger: 0.15,
    duration: 0.6, ease: 'power3.out'
  }
);

// ERRADO ❌
gsap.from(elements, {
  scrollTrigger: { toggleActions: 'play none none reverse' },
  y: 60, opacity: 0, ...
});
```

### Componentes React

- Use `useRef` + `useEffect` para animações GSAP
- Sempre verifique se `ref.current` existe antes de querySelector
- Limpe animações no unmount quando aplicável

## Versionamento

Seguimos [Semantic Versioning](https://semver.org/):

- `MAJOR` — mudanças incompatíveis com versões anteriores
- `MINOR` — novas funcionalidades mantendo compatibilidade
- `PATCH` — correções de bugs

## Deploy

O projeto está configurado para deploy via Vite build. Para produção:

```bash
pnpm build
```

O output estático é gerado em `dist/` e pode ser servido por qual CDN (Netlify, Vercel, Cloudflare Pages, etc.).
