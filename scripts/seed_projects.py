import json, urllib.request

SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nd2NseHF2dHRqcXJwenBvYnVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI4ODcwMSwiZXhwIjoyMDkxODY0NzAxfQ.6efbxa1Xx7Vp0Qn52kAOx6nmIxskIxnujZkMjLMhTmE"
BASE = "https://ogwclxqvttjqrpzpobus.supabase.co/rest/v1"
HEADERS = {
    "apikey": SERVICE_KEY,
    "Authorization": "Bearer " + SERVICE_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def para(text):
    return {"type": "paragraph", "content": [{"type": "text", "text": text}]}

def mkdoc(*paragraphs):
    return {"type": "doc", "content": [para(p) for p in paragraphs]}

def img(photo_id):
    return "https://images.unsplash.com/" + photo_id + "?w=1200&q=80"

projects = [
    # Residencial
    {
        "category_id": "abc80db9-95b9-47f9-a6f0-a1d467d0b34d",
        "title": "Loft Ipanema",
        "slug": "loft-ipanema",
        "date": "2024-06-10",
        "main_image": img("photo-1522708323590-d24dbb6b0267"),
        "gallery": [img("photo-1484154218962-a197022b5858"), img("photo-1556909114-f6e7ad7d3136")],
        "is_featured": False,
        "content": mkdoc(
            "O Loft Ipanema nasce da renovacao completa de um apartamento de 90m2 em edificio tombado. O desafio foi preservar os elementos originais como pe-direito alto, janelas guilhotina e piso de taco, enquanto integrava cozinha aberta e home office funcional.",
            "Paleta neutra com toques de azul cobalto nos revestimentos do banheiro social cria pontos de cor sem competir com a arquitetura existente. Marcenaria sob medida em freijo organiza os espacos sem criar paredes desnecessarias."
        )
    },
    {
        "category_id": "abc80db9-95b9-47f9-a6f0-a1d467d0b34d",
        "title": "Casa do Lago",
        "slug": "casa-do-lago",
        "date": "2024-09-20",
        "main_image": img("photo-1564013799919-ab600027ffc6"),
        "gallery": [img("photo-1583608205776-bfd35f0d9f83"), img("photo-1510798831971-661eb04b3739")],
        "is_featured": False,
        "content": mkdoc(
            "Inserida em lote as margens de represa particular em Mairipora, a Casa do Lago explora o dialogo entre construcao e espelho d'agua. Volumes escalonados em concreto branco e vidro criam mirantes em diferentes cotas do terreno.",
            "Cobertura verde extensiva, captacao pluvial e sistema fotovoltaico embutido na pergolado da varanda garantem autonomia energetica de 80% ao longo do ano."
        )
    },
    # Comercial
    {
        "category_id": "9a53b80b-4f7c-427f-a7e3-55ed82c42c0f",
        "title": "Cafe Jardim Paulista",
        "slug": "cafe-jardim-paulista",
        "date": "2024-05-08",
        "main_image": img("photo-1554118811-1e0d58224f24"),
        "gallery": [img("photo-1559329007-40df8a9345d8"), img("photo-1543286386-713bdd548da4")],
        "is_featured": False,
        "content": mkdoc(
            "Projeto para cafe de especialidade em esquina de 120m2 no Jardim Paulista. A cozinha de torra foi colocada em posicao de destaque junto a fachada, transformando o processo artesanal em elemento de vitrine.",
            "Concreto polido no piso, paineis de compensado naval escuro e iluminacao focal em fio de cobre criam ambiente acolhedor. Jardim vertical na parede dos fundos funciona como biofiltro acustico."
        )
    },
    {
        "category_id": "9a53b80b-4f7c-427f-a7e3-55ed82c42c0f",
        "title": "Showroom Avenida Brasil",
        "slug": "showroom-avenida-brasil",
        "date": "2024-11-15",
        "main_image": img("photo-1497215842964-222b430dc094"),
        "gallery": [img("photo-1462275646964-a0e3386b89fa"), img("photo-1497366811353-6870744d04b2")],
        "is_featured": False,
        "content": mkdoc(
            "Showroom de 600m2 para marca premium de mobiliario. O espaco foi concebido como percurso narrativo, conduzindo o cliente por ambientes de complexidade crescente ate o salao VIP.",
            "Laje nervurada aparente, trilhos de iluminacao em preto fosco e piso de granito cinza compoe pano de fundo sobrio que valoriza as pecas expostas."
        )
    },
    # Institucional
    {
        "category_id": "911051a2-3096-40c0-9b6f-2cb47fda03cb",
        "title": "Forum Trabalhista Regional",
        "slug": "forum-trabalhista-regional",
        "date": "2023-11-02",
        "main_image": img("photo-1541888946425-d81bb19240f5"),
        "gallery": [img("photo-1477959858617-67f85cf4f1df"), img("photo-1497366216548-37526070297c")],
        "is_featured": False,
        "content": mkdoc(
            "Edificio de 18 andares destinado ao Forum Trabalhista Regional, projetado para 1.200 atendimentos diarios. A volumetria em torres conectadas por passarelas criou separacao funcional clara entre fluxos de advogados, publico e magistrados.",
            "Fachada em brise orientavel de aluminio anodizado responde as condicoes de insolacao de cada orientacao, reduzindo em 35% a carga de ar-condicionado."
        )
    },
    {
        "category_id": "911051a2-3096-40c0-9b6f-2cb47fda03cb",
        "title": "Prefeitura Municipal de Aracatuba",
        "slug": "prefeitura-aracatuba",
        "date": "2024-01-18",
        "main_image": img("photo-1486325212027-8081e485255e"),
        "gallery": [img("photo-1497366216548-37526070297c"), img("photo-1541888946425-d81bb19240f5")],
        "is_featured": False,
        "content": mkdoc(
            "Reforma e expansao da sede da Prefeitura Municipal de Aracatuba, preservando fachada tombada de 1952 e adicionando bloco contemporaneo de 4.000m2.",
            "Projeto garantiu acessibilidade universal em todas as dependencias. A praca civica de acesso foi redesenhada com sombreamento por pergolas e espelho d'agua."
        )
    },
    # Industrial
    {
        "category_id": "0fdbe8ab-eb00-4ff0-af46-c1fdd2707394",
        "title": "Hub Logistico Campinas",
        "slug": "hub-logistico-campinas",
        "date": "2023-08-14",
        "main_image": img("photo-1504328345606-18bbc8c9d7d1"),
        "gallery": [img("photo-1565793298595-6a879b1d9492"), img("photo-1530982011887-3cc11cc85693")],
        "is_featured": False,
        "content": mkdoc(
            "Centro de distribuicao de 28.000m2 para operacao 24 horas. Implantacao em Y permite entrada e saida de veiculos simultaneas sem cruzamento de fluxos, reduzindo tempo de ciclo em 40%.",
            "Paineis solares na cobertura geram 1,2MW, suficiente para cobrir 100% do consumo das esteiras e iluminacao. Shed bidirecional elimina iluminacao artificial durante horas de pico solar."
        )
    },
    {
        "category_id": "0fdbe8ab-eb00-4ff0-af46-c1fdd2707394",
        "title": "Planta de Reciclagem Verde",
        "slug": "planta-reciclagem-verde",
        "date": "2024-03-30",
        "main_image": img("photo-1530982011887-3cc11cc85693"),
        "gallery": [img("photo-1504328345606-18bbc8c9d7d1"), img("photo-1513828583688-c52646db42da")],
        "is_featured": False,
        "content": mkdoc(
            "Planta de reciclagem de residuos solidos para municipio de medio porte. Estrutura metalica com layout flexivel para adaptacao futura das linhas de triagem, prensagem e armazenagem.",
            "Revestimento externo em material reciclado, jardins pluviais no entorno e torre de ventilacao natural passiva para extracao de odores sem uso de energia."
        )
    },
    # Corporativa
    {
        "category_id": "3b6f8a37-219f-4afd-9e6c-e88bb9bd0e4b",
        "title": "Campus Inovacao Cubo",
        "slug": "campus-inovacao-cubo",
        "date": "2024-07-22",
        "main_image": img("photo-1462275646964-a0e3386b89fa"),
        "gallery": [img("photo-1497366811353-6870744d04b2"), img("photo-1486406146926-c627a92ad1ab")],
        "is_featured": False,
        "content": mkdoc(
            "Campus corporativo de 15.000m2 para hub de startups e aceleradoras. Inclui escritorios flex, laboratorios de prototipagem, auditorio para 400 pessoas e espacos de convivencia para colaboracao espontanea.",
            "Blocos independentes interligados por ruas internas cobertas criam microclima agradavel e multiplicam as possibilidades de encontro entre equipes."
        )
    },
    {
        "category_id": "3b6f8a37-219f-4afd-9e6c-e88bb9bd0e4b",
        "title": "Edificio Parque Negocios",
        "slug": "edificio-parque-negocios",
        "date": "2024-02-05",
        "main_image": img("photo-1497366811353-6870744d04b2"),
        "gallery": [img("photo-1462275646964-a0e3386b89fa"), img("photo-1486406146926-c627a92ad1ab")],
        "is_featured": False,
        "content": mkdoc(
            "Torre corporativa de 22 andares em Alphaville. Lajes de 1.200m2 com planta livre permitem subdivisoes variadas para locatarios de diferentes portes.",
            "Lobby duplo-pe-direito com jardim vertical de 8 metros transforma a circulacao em experiencia sensorial. Pele de vidro serigrafado controla ganho termico sem comprometer transparencia."
        )
    },
    # Hospitalar
    {
        "category_id": "495772b8-a00f-4a5b-856b-1e9497c1bf8a",
        "title": "UPA Norte",
        "slug": "upa-norte",
        "date": "2023-09-28",
        "main_image": img("photo-1519494026892-80bbd2d6fd0d"),
        "gallery": [img("photo-1586773860418-d37222d8fce3"), img("photo-1631217868264-e5b90bb7e133")],
        "is_featured": False,
        "content": mkdoc(
            "UPA de pequeno porte para 350 pacientes/dia em bairro periferico. Implantacao priorizou separacao imediata de fluxos de pediatria, adulto e isolamento a partir da triagem na entrada.",
            "Materiais antimicrobianos em todas as superficies de contato, iluminacao circadiana nas areas de observacao e jardim de contemplacao para familiares."
        )
    },
    {
        "category_id": "495772b8-a00f-4a5b-856b-1e9497c1bf8a",
        "title": "Centro de Reabilitacao Horizonte",
        "slug": "centro-reabilitacao-horizonte",
        "date": "2024-04-11",
        "main_image": img("photo-1631217868264-e5b90bb7e133"),
        "gallery": [img("photo-1519494026892-80bbd2d6fd0d"), img("photo-1586773860418-d37222d8fce3")],
        "is_featured": False,
        "content": mkdoc(
            "Centro de reabilitacao fisica e neurologica com 3.500m2 de area terapeutica. Piscina aquecida coberta, pistas de marcha indoor e academias adaptadas ao redor de jardim terapeutico central.",
            "Espacos ambiguos entre interior e exterior reduzem a percepcao clinica do ambiente e favorecem a aderencia dos pacientes ao tratamento."
        )
    },
    # Educacional
    {
        "category_id": "5b1f6b3e-7294-4e2e-be36-4a774bc3aa5f",
        "title": "Instituto Federal Sudeste",
        "slug": "instituto-federal-sudeste",
        "date": "2023-06-19",
        "main_image": img("photo-1523050854058-8df90110c9f1"),
        "gallery": [img("photo-1509062522246-3755977927d7"), img("photo-1562774053-701939374585")],
        "is_featured": False,
        "content": mkdoc(
            "Novo campus do Instituto Federal com 18.000m2 em tres blocos de ensino, laboratorios, biblioteca e auditorio. Masterplan preve expansao futura sem interferir nas operacoes existentes.",
            "Cobertura verde nas lajes e captacao pluvial abastece 60% das descargas sanitarias. Praca central coberta e pulmao do campus para convivencia, apresentacoes e feiras de ciencia."
        )
    },
    {
        "category_id": "5b1f6b3e-7294-4e2e-be36-4a774bc3aa5f",
        "title": "Creche Jardim das Flores",
        "slug": "creche-jardim-flores",
        "date": "2024-08-05",
        "main_image": img("photo-1427504494785-3a9ca7044f45"),
        "gallery": [img("photo-1523050854058-8df90110c9f1"), img("photo-1580582932707-520aed937b7b")],
        "is_featured": False,
        "content": mkdoc(
            "Creche municipal para 180 criancas de 0 a 5 anos. Salas com pe-direito duplo e mezanino de leitura criam riqueza espacial. Cada sala tem acesso direto ao patio sombreado adjacente.",
            "Esquema de cores primarias na sinalizacao facilita orientacao das criancas. Jardim sensorial com texturas, aromas e sons complementa o curriculo pedagogico ao ar livre."
        )
    },
    # Religiosa
    {
        "category_id": "ddce4289-8615-4351-8635-608058089288",
        "title": "Templo Budista Caminho da Paz",
        "slug": "templo-budista-caminho-paz",
        "date": "2023-12-03",
        "main_image": img("photo-1578301978162-7aae4d755744"),
        "gallery": [img("photo-1548625149-fc4a29cf7092"), img("photo-1473177104440-ffee2f376098")],
        "is_featured": False,
        "content": mkdoc(
            "Templo budista para 200 praticantes em lote arborizado em Cotia. Volumes concentricos em pedra, madeira e agua conduzem o visitante ao silencio do salao de meditacao central.",
            "Iluminacao natural zenital cria faixas de luz que se deslocam ao longo do dia marcando o tempo. Jardim zen seco no entorno projetado para praticas de raking meditativo."
        )
    },
    {
        "category_id": "ddce4289-8615-4351-8635-608058089288",
        "title": "Catedral Nossa Senhora da Esperanca",
        "slug": "catedral-nossa-senhora-esperanca",
        "date": "2024-10-12",
        "main_image": img("photo-1530856906506-b07e3db26a8e"),
        "gallery": [img("photo-1578301978162-7aae4d755744"), img("photo-1548625149-fc4a29cf7092")],
        "is_featured": False,
        "content": mkdoc(
            "Catedral para 1.800 fieis na zona leste de Sao Paulo. Nave principal em concreto branco protendido alcanca 34 metros de altura livre com vitral continuo que inunda o altar de luz dourada nas missas matutinas.",
            "Torre sineira independente em bronze anodizado serve de marco urbano e mirante publico aberto a comunidade independentemente dos horarios de culto."
        )
    },
    # Cultural
    {
        "category_id": "4c76505d-9f3c-455b-80ff-f4b892bfed29",
        "title": "Centro Cultural da Juventude",
        "slug": "centro-cultural-juventude",
        "date": "2024-01-30",
        "main_image": img("photo-1492684223066-81342ee5ff30"),
        "gallery": [img("photo-1554907984-15263bfd63bd"), img("photo-1507003211169-0a1dd7228f2d")],
        "is_featured": False,
        "content": mkdoc(
            "Centro cultural para juventude periferica com estudios de musica, danca, artes visuais e laboratorio de midia digital. Desnivel do terreno aproveitado para anfiteatro descoberto para 600 pessoas.",
            "Grafite de artistas locais reveste as fachadas externas como politica deliberada de pertencimento. A caixa cenica interna e reversivel para shows, cinema e teatro."
        )
    },
    {
        "category_id": "4c76505d-9f3c-455b-80ff-f4b892bfed29",
        "title": "Biblioteca Parque Leste",
        "slug": "biblioteca-parque-leste",
        "date": "2024-06-28",
        "main_image": img("photo-1568667256549-094175e00896"),
        "gallery": [img("photo-1509062522246-3755977927d7"), img("photo-1492684223066-81342ee5ff30")],
        "is_featured": False,
        "content": mkdoc(
            "Biblioteca publica de 4.500m2 integrada a parque urbano. Cobertura verde transitavel dissolve os limites entre espaco publico externo e interno.",
            "Acervo fisico convive com hub de impressao 3D, estudios de podcast e salas de realidade virtual. Fachada leste em corten perfurado filtra a luz da tarde e projeta padroes geometricos no interior."
        )
    },
    # Esportiva
    {
        "category_id": "f05b84f5-29c8-4890-ba5f-54666ebebcf9",
        "title": "Complexo Aquatico Municipal",
        "slug": "complexo-aquatico-municipal",
        "date": "2023-10-15",
        "main_image": img("photo-1577224682124-b5e66f14f6d9"),
        "gallery": [img("photo-1576013551627-0cc20b96c2a7"), img("photo-1534438327276-14e5300c3a48")],
        "is_featured": False,
        "content": mkdoc(
            "Complexo aquatico com piscina olimpica, semiolimpica e de saltos para 600 espectadores. Cobertura tensionada em cabo de aco e ETFE translucido mantém luminosidade natural.",
            "Sistema de reaproveitamento do backwash dos filtros reduz consumo em 30%. Arquibancadas retraveis permitem converter o espaco em arena para competicoes terrestres em 4 horas."
        )
    },
    {
        "category_id": "f05b84f5-29c8-4890-ba5f-54666ebebcf9",
        "title": "CT Futebol Base",
        "slug": "ct-futebol-base",
        "date": "2024-05-19",
        "main_image": img("photo-1534438327276-14e5300c3a48"),
        "gallery": [img("photo-1577224682124-b5e66f14f6d9"), img("photo-1546519638-68e109498ffc")],
        "is_featured": False,
        "content": mkdoc(
            "CT para formacao de atletas de base com seis campos em grama natural, vestiarios com crioterapia e hidroterapia, refeitorio industrial e alojamento para 80 atletas.",
            "Edificios organizados como aldeia ao redor dos campos, sem barreiras visuais entre funcoes de apoio. Iluminacao full LED com controle remoto para ajuste espectral."
        )
    },
    # Hoteleira
    {
        "category_id": "cce15108-d107-4c79-a323-a57ea78d2f2b",
        "title": "Resort Eco Serra",
        "slug": "resort-eco-serra",
        "date": "2023-07-14",
        "main_image": img("photo-1445019980597-93fa8acb246c"),
        "gallery": [img("photo-1571003123894-1f0594d2b5d9"), img("photo-1566073771259-6a8506099945")],
        "is_featured": False,
        "content": mkdoc(
            "Resort de ecoturismo com 32 cabanas independentes em Mata Atlantica preservada. Cada cabana e autossuficiente energeticamente com painel solar e captacao pluvial propria.",
            "Passarelas suspensas conectam cabanas e lodge central sem abertura de novos caminhos no macico florestal, preservando substrato e permitindo circulacao da fauna."
        )
    },
    {
        "category_id": "cce15108-d107-4c79-a323-a57ea78d2f2b",
        "title": "Apart Hotel Executivo Central",
        "slug": "apart-hotel-executivo-central",
        "date": "2024-04-03",
        "main_image": img("photo-1542314831-068cd1dbfeeb"),
        "gallery": [img("photo-1445019980597-93fa8acb246c"), img("photo-1566073771259-6a8506099945")],
        "is_featured": False,
        "content": mkdoc(
            "Apart hotel de 120 unidades para publico executivo em Sao Paulo. Studios e apartamentos de 1 dormitorio com cozinha compacta e home office para estadas de curta e media duracao.",
            "Lobby com coworking 24h, lavanderia self-service e rooftop com academia e bar. Fachada em vidro serigrafado forma padrao grafico abstrato visivel na paisagem urbana."
        )
    },
]

print(f"Inserindo {len(projects)} projetos...")
data = json.dumps(projects).encode("utf-8")
req = urllib.request.Request(BASE + "/projects", data=data, headers=HEADERS, method="POST")
try:
    with urllib.request.urlopen(req) as r:
        print(f"Projects OK: {r.status} {r.reason}")
except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8")
    print(f"Projects ERROR {e.code}: {body[:800]}")

testimonials = [
    {
        "author": "Fernanda Alves",
        "role": "Proprietaria - Residencial Alto da Lapa",
        "content": "O projeto superou todas as expectativas. Cada detalhe foi pensado com cuidado e o resultado final transformou completamente o espaco. A equipe demonstrou sensibilidade para entender nosso modo de vida e traduziu isso na arquitetura.",
        "avatar": None
    },
    {
        "author": "Rodrigo Mendes",
        "role": "Socio - Mendes e Costa Escritorio de Advocacia",
        "content": "Profissionalismo impecavel do inicio ao fim. Entenderam exatamente o que precisavamos: um ambiente que transmitisse solidez e confianca aos nossos clientes. O resultado ficou acima do que imaginavamos ser possivel dentro do orcamento.",
        "avatar": None
    },
]

print(f"Inserindo {len(testimonials)} depoimentos...")
data = json.dumps(testimonials).encode("utf-8")
req = urllib.request.Request(BASE + "/testimonials", data=data, headers=HEADERS, method="POST")
try:
    with urllib.request.urlopen(req) as r:
        print(f"Testimonials OK: {r.status} {r.reason}")
except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8")
    print(f"Testimonials ERROR {e.code}: {body[:800]}")

print("Pronto.")
