# Domu Arquitetura — CMS

Site institucional com painel administrativo para estúdios de arquitetura e design de interiores. Construído com Next.js 16 App Router e Supabase.

---

## Stack

- **Next.js 16** (App Router, Server Components, ISR)
- **Supabase** (banco de dados PostgreSQL + Storage + Auth)
- **Tailwind CSS v4**
- **Tiptap** (editor de texto rico)
- **Vercel** (deploy + Cron Jobs)

---

## Variáveis de Ambiente

Crie um `.env.local` na raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

GMAIL_USER=...
GMAIL_APP_PASSWORD=...

CRON_SECRET=...
```

---

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

---

## Estrutura do Site Público

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial — Hero, Features, CTA, Depoimentos, FAQ, Contato |
| `/projetos` | Todos os projetos agrupados por categoria (prévia de 2 por categoria) |
| `/{categoria}` | Página da categoria com todos os projetos e barra de busca |
| `/{categoria}/{slug}` | Página do projeto individual com galeria e conteúdo |

---

## Painel Administrativo (`/dashboard`)

Login em `/login`. Apenas usuários autenticados via Supabase Auth.

### Visão Geral — `/dashboard`

Resumo do conteúdo: contagem de categorias e projetos, lista dos 5 projetos mais recentes com edição rápida.

---

### Identidade — `/dashboard/identidade`

Configura a marca do site inteiro.

**Nome da empresa** — substituído automaticamente em:
- Footer (nome + copyright)
- Seção CTA ("Transforme seu espaço com a ...")
- Título da aba do navegador (`<title>`)

**Logo — modo Texto**
- **Nome** — linha de cima, exibida em maiúsculas
- **Sub-nome** — linha de baixo, menor e com opacidade reduzida
- **Tipografia** — escolha entre 7 fontes (Sistema, Geist, Playfair, Cormorant, Montserrat, Josefin Sans, Baskerville)
- **Alinhamento do sub-nome** — Início, Centro ou Fim em relação ao nome

**Logo — modo Imagem** — upload de PNG (máx. 5MB) que substitui o logo de texto em todo o site. Recomendado: fundo transparente.

O preview abaixo das opções reflete as mudanças ao vivo antes de salvar.

---

### Categorias — `/dashboard/categories`

Categorias organizam os projetos (ex: Residencial, Comercial).

- **Criar** — nome, slug (gerado automaticamente), descrição, imagem de capa e ordem de exibição
- **Editar** — altera nome, slug, descrição e imagem. Slug define a URL: `/{slug}`
- **+ Projeto** — cria um projeto já vinculado à categoria
- **Excluir** — não exclui projetos vinculados, apenas desvincula

---

### Projetos — `/dashboard/projects`

- **Criar / Editar** — título, slug, categoria, data, imagem principal, galeria, conteúdo e SEO
- **Destaque no Hero** — exibe o projeto no carrossel da página inicial
- **Slug** — define a URL: `/{categoria}/{slug}`
- **Conteúdo** — editor Tiptap com suporte a títulos, listas, negrito, itálico, imagens
- **SEO** — título preenchido automaticamente; descrição de até 160 caracteres para motores de busca
- **Upload** — arraste ou clique para selecionar (máx. 5MB por arquivo, JPG/PNG/WebP/GIF). Também aceita URL externa

---

### Depoimentos — `/dashboard/testimonials`

Depoimentos de clientes exibidos na seção de depoimentos do site.

- Campos: nome, cargo/empresa (opcional), texto, foto (opcional)
- Ordem: do mais recente
- Edite ou remova diretamente na lista

---

### FAQs — `/dashboard/faqs`

Perguntas e respostas frequentes exibidas na seção FAQ do site.

- Campos: pergunta e resposta
- Ordem controlada pelo campo **Ordem**
- Edite ou remova diretamente na lista

---

### Contato — `/dashboard/contact`

Dados de contato exibidos no site:

- **WhatsApp** — número com DDI e DDD (ex: `5511999999999`)
- **Mensagem padrão WhatsApp** — texto pré-preenchido ao abrir conversa
- **Instagram** — nome do perfil sem `@` (ex: `domu.arquitetura`)
- **E-mail de contato** — exibido na seção de contato

#### Senha de App do Gmail

Usada para enviar e-mails do formulário de contato. Não é a senha normal da conta Google.

1. Conta Google → **Segurança** → ativar **Verificação em duas etapas**
2. Voltar em Segurança → **Senhas de app**
3. Criar senha para **Email** → copiar o código de 16 caracteres
4. Colar no campo **Senha de App** em `/dashboard/contact`

> O código aparece apenas uma vez. Copie antes de fechar a janela.

---

## Reset automático (Cron)

O sistema suporta restauração automática do banco a cada 10 minutos via Vercel Cron Jobs — útil para ambientes de demonstração.

**1. Salvar snapshot do estado atual:**
```bash
curl -X POST https://seu-dominio.com/api/admin/snapshot \
  -H "Authorization: Bearer $CRON_SECRET"
```

**2. Restaurar manualmente (ou automático em produção):**
```bash
curl https://seu-dominio.com/api/cron/reset \
  -H "Authorization: Bearer $CRON_SECRET"
```

O cron roda automaticamente em produção a cada 10 minutos (`*/10 * * * *` em `vercel.json`). Localmente, use o comando acima para testar.

---

## Deploy

1. Suba o projeto na [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente no painel da Vercel
3. O cron de reset é ativado automaticamente pelo `vercel.json`
4. Após o primeiro deploy, salve o snapshot via `POST /api/admin/snapshot`
# arquitetura-organizada-dashboard
# arquitetura-organizada-dashboard
# arquitetura-organizada-dashboard
