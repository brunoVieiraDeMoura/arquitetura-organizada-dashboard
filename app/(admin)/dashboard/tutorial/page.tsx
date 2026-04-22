export default function TutorialPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Tutorial da Dashboard</h1>
      <p className="text-sm text-neutral-500 mb-10">Guia completo de todas as funcionalidades disponíveis.</p>

      <div className="space-y-10">

        {/* Visão Geral */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Visão Geral <span className="text-xs font-normal text-neutral-400 ml-1">/dashboard</span></h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-2">
            <p>Painel inicial com resumo do conteúdo cadastrado.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Contagem total de <strong>Categorias</strong> e <strong>Projetos</strong></li>
              <li>Lista dos <strong>5 projetos mais recentes</strong> com link de edição rápida</li>
              <li>Atalhos diretos para gerenciar cada seção</li>
            </ul>
          </div>
        </section>

        {/* Identidade */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Identidade <span className="text-xs font-normal text-neutral-400 ml-1">/dashboard/identidade</span></h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-3">
            <p>Configure o nome da empresa e o logo exibido no site.</p>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Nome da empresa</p>
              <p>Substituído automaticamente em todos os textos do site: footer, seção CTA e título da aba do navegador.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Logo — modo Texto</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600">
                <li><strong>Nome</strong> — linha de cima, exibida em maiúsculas</li>
                <li><strong>Sub-nome</strong> — linha de baixo, menor e com opacidade reduzida</li>
                <li><strong>Tipografia</strong> — escolha entre 7 fontes; o preview atualiza ao vivo</li>
                <li><strong>Alinhamento do sub-nome</strong> — Início, Centro ou Fim em relação ao nome</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Logo — modo Imagem</p>
              <p>Faça upload de um PNG (máx. 5MB). A imagem substitui o logo de texto em todo o site. Recomendado: fundo transparente.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Preview</p>
              <p>O preview abaixo das opções mostra exatamente como o logo aparecerá no navbar do site. Clique em <strong>Salvar</strong> para aplicar.</p>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Categorias <span className="text-xs font-normal text-neutral-400 ml-1">/dashboard/categories</span></h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-3">
            <p>Categorias organizam os projetos no site (ex: Residencial, Comercial).</p>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Criar categoria</p>
              <p>Clique em <strong>Nova Categoria</strong>. Preencha nome, slug (gerado automaticamente), descrição e imagem de capa. O campo <strong>Ordem</strong> define a sequência de exibição no site.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Gerenciar / Editar</p>
              <p>Clique em <strong>Gerenciar</strong> ao lado da categoria para editar nome, slug, descrição e imagem. Slug é usado na URL: <code className="bg-neutral-100 px-1 rounded text-xs">/{'{'}slug{'}'}</code>.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Adicionar projeto direto</p>
              <p>Clique em <strong>+ Projeto</strong> ao lado da categoria para criar um projeto já vinculado a ela.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Excluir</p>
              <p>Clique no botão vermelho de exclusão. <strong>Atenção:</strong> remover uma categoria não exclui os projetos vinculados, mas os deixa sem categoria.</p>
            </div>
          </div>
        </section>

        {/* Projetos */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Projetos <span className="text-xs font-normal text-neutral-400 ml-1">/dashboard/projects</span></h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-3">
            <p>Lista todos os projetos cadastrados com categoria, data e badge de destaque.</p>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Criar projeto</p>
              <p>Clique em <strong>Novo Projeto</strong>. Campos obrigatórios: título, slug, categoria, data e imagem principal.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Campos do formulário</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600">
                <li><strong>Título</strong> — nome exibido no site; gera o slug automaticamente</li>
                <li><strong>Slug</strong> — parte da URL: <code className="bg-neutral-100 px-1 rounded text-xs">/{'{'}categoria{'}'}/{'{'}slug{'}'}</code></li>
                <li><strong>Categoria</strong> — define onde o projeto aparece no site</li>
                <li><strong>Data</strong> — data de realização do projeto</li>
                <li><strong>Destaque no Hero</strong> — exibe o projeto no carrossel da página inicial. Recomendado para os melhores trabalhos</li>
                <li><strong>Imagem Principal</strong> — capa do projeto. Máximo 5MB</li>
                <li><strong>Galeria</strong> — fotos adicionais exibidas na página do projeto. Máximo 5MB por foto</li>
                <li><strong>Conteúdo</strong> — editor de texto rico (Tiptap) com suporte a títulos, listas, negrito, itálico e mais</li>
                <li id="seo">
                  <strong>SEO / Metadados</strong> — título preenchido automaticamente; escreva uma descrição de até 160 caracteres para motores de busca.
                  <span className="block mt-1.5 ml-1 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-neutral-700">
                    💡 <strong>Dica:</strong> Use o ChatGPT para gerar a descrição. Cole este prompt:<br />
                    <code className="block mt-1 bg-white border border-amber-100 rounded px-2 py-1.5 text-xs text-neutral-600 whitespace-pre-wrap">{`Crie uma descrição SEO de exatamente 150 caracteres para este projeto de arquitetura de acordo com a descrição abaixo:\n\nDescrição: [coloque a descrição do projeto aqui]`}</code>
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Preview ao vivo</p>
              <p>O painel direito mostra como o conteúdo vai aparecer no site enquanto você digita.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800">Upload de imagens</p>
              <p>Arraste a imagem ou clique para selecionar. Limite de <strong>5MB por arquivo</strong>. Formatos aceitos: JPG, PNG, WebP, GIF. Alternativamente, cole uma URL externa.</p>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Depoimentos <span className="text-xs font-normal text-neutral-400 ml-1">/dashboard/testimonials</span></h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-2">
            <p>Gerencie os depoimentos de clientes exibidos na seção de depoimentos do site.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Adicione nome do cliente, texto do depoimento e cargo/empresa (opcional)</li>
              <li>Depoimentos aparecem em ordem do mais recente</li>
              <li>Edite ou remova diretamente na lista</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">FAQs <span className="text-xs font-normal text-neutral-400 ml-1">/dashboard/faqs</span></h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-2">
            <p>Perguntas e respostas frequentes exibidas na seção FAQ do site.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Adicione pergunta e resposta</li>
              <li>Arraste para reordenar (campo <strong>Ordem</strong> define a sequência)</li>
              <li>Edite ou remova diretamente na lista</li>
            </ul>
          </div>
        </section>

        {/* Contato */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Contato <span className="text-xs font-normal text-neutral-400 ml-1">/dashboard/contact</span></h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-2">
            <p>Configure os dados de contato exibidos no site.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li><strong>WhatsApp</strong> — número com DDI e DDD (ex: 5511999999999). Usado no botão de contato direto</li>
              <li><strong>Mensagem padrão WhatsApp</strong> — texto pré-preenchido quando o cliente abre a conversa</li>
              <li><strong>Instagram</strong> — nome do perfil sem o @ (ex: domu.arquitetura)</li>
              <li><strong>E-mail de contato</strong> — exibido na seção de contato do site</li>
            </ul>
          </div>
        </section>

        {/* Gmail App Password */}
        <section id="gmail">
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Como gerar a Senha de App do Gmail</h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-3">
            <p>A senha de app é usada para enviar os emails do formulário de contato. <strong>Não é a senha normal</strong> da sua conta Google.</p>
            <ol className="list-decimal list-inside space-y-2 text-neutral-600">
              <li>Acesse sua conta Google → <strong>Segurança</strong></li>
              <li>Ative a <strong>Verificação em duas etapas</strong> (obrigatório antes do próximo passo)</li>
              <li>Após ativar, volte em Segurança e procure <strong>"Senhas de app"</strong></li>
              <li>Crie uma senha para o app <strong>Email</strong> → Google gera um código de 16 caracteres</li>
              <li>Copie o código gerado e cole no campo <strong>Senha de App</strong> em <a href="/dashboard/contact" className="text-blue-600 hover:underline">Contato</a></li>
            </ol>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-neutral-700">
              ⚠️ <strong>Importante:</strong> o código aparece apenas uma vez. Copie imediatamente antes de fechar a janela do Google.
            </div>
          </div>
        </section>

        {/* Estrutura do site */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-1">Estrutura do Site Público</h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 text-sm text-neutral-700 space-y-2">
            <ul className="space-y-1.5 text-neutral-600">
              <li><code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs">/</code> — Página inicial com Hero, Features, CTA, Depoimentos, FAQ e Contato</li>
              <li><code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs">/projetos</code> — Listagem de todos os projetos agrupados por categoria (prévia de 2 por categoria)</li>
              <li><code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs">/{'{'}categoria{'}'}</code> — Página da categoria com todos os projetos dela</li>
              <li><code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs">/{'{'}categoria{'}'}/{'{'}slug{'}'}</code> — Página do projeto individual com galeria e conteúdo</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  )
}
