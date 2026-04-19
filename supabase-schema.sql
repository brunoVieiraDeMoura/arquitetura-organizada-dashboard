-- ============================================================
-- Domu Arquitetura — Schema Supabase
-- Execute este script no SQL Editor do painel Supabase
-- ============================================================

-- Categorias de projetos
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  description text,
  cover_image text,
  order_index int default 0,
  created_at  timestamp with time zone default now()
);

-- Projetos
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete cascade,
  title       text not null,
  slug        text unique not null,
  date        date not null,
  main_image  text not null,
  gallery     text[] default '{}',
  content     jsonb,
  is_featured boolean default false,
  created_at  timestamp with time zone default now(),
  updated_at  timestamp with time zone default now()
);

-- Depoimentos
create table if not exists testimonials (
  id         uuid primary key default gen_random_uuid(),
  author     text not null,
  role       text,
  content    text not null,
  avatar     text,
  created_at timestamp with time zone default now()
);

-- FAQs
create table if not exists faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  order_index int default 0,
  created_at  timestamp with time zone default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table categories enable row level security;
alter table projects enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;

-- Leitura pública para todas as tabelas
create policy "leitura publica categories" on categories for select using (true);
create policy "leitura publica projects" on projects for select using (true);
create policy "leitura publica testimonials" on testimonials for select using (true);
create policy "leitura publica faqs" on faqs for select using (true);

-- Escrita somente para usuários autenticados (admin)
create policy "admin escreve categories" on categories for all using (auth.role() = 'authenticated');
create policy "admin escreve projects" on projects for all using (auth.role() = 'authenticated');
create policy "admin escreve testimonials" on testimonials for all using (auth.role() = 'authenticated');
create policy "admin escreve faqs" on faqs for all using (auth.role() = 'authenticated');

-- ============================================================
-- Storage Buckets
-- Execute no painel Supabase > Storage > New Bucket
-- Ou descomente e adapte se usar supabase-js admin
-- ============================================================

-- Bucket: projects (imagens de projetos)
-- Configurar como público no painel Supabase

-- Bucket: categories (cover de categorias)
-- Configurar como público no painel Supabase




  create table if not exists settings (
    key text primary key,
    value text not null default '',
    updated_at timestamptz default now()
  );

  insert into settings (key, value) values
    ('whatsapp_number', '5511999999999'),
    ('whatsapp_message', 'Olá! Gostaria de saber mais sobre os projetos da Domu Arquitetura.'),
    ('instagram_path', 'domu.arquitetura'),
    ('contact_email', 'contato@domuarquitetura.com.br')
  on conflict (key) do nothing;

  alter table settings enable row level security;
  create policy "Public read settings" on settings for select using (true);
  create policy "Auth write settings" on settings for all using (auth.role() = 'authenticated');