export const reportMeta = Object.freeze({
  title: 'SentinelZap — Prestação de contas',
  updatedAt: '26 de agosto de 2026',
  period: '15 a 26 de agosto de 2026',
  sourceRecords: 61,
  publishedRecords: 62,
  productionReleaseDate: '24 de agosto de 2026',
  candidateDate: '25 de agosto de 2026',
  publicUrl: 'https://sentinelzap.vercel.app/',
  orderingNote:
    'Os registros estão ordenados por data. Quando não há horário comprovado, nenhum horário é apresentado e a ordem documental da fonte é preservada dentro do mesmo dia.',
});

export const executiveMetrics = Object.freeze([
  {
    value: '5/5',
    label: 'marcos estruturais concluídos',
    note: 'Visão, aplicação, CRM, SQLite e produção segura.',
  },
  {
    value: '454/454',
    label: 'testes no release de produção',
    note: 'Pacote efetivamente publicado em 24/08.',
  },
  {
    value: '462/462',
    label: 'testes no candidato local',
    note: 'Versão validada em 25/08, ainda distinta da produção.',
  },
  {
    value: '2',
    label: 'snapshots reais comprovados',
    note: 'Backup e restauração ensaiada concluídos.',
  },
]);

export const roadmap = Object.freeze([
  {
    priority: 'Imediato',
    title: 'Concluir as decisões humanas de acesso',
    description:
      'Trocar as credenciais iniciais diretamente no painel, sem registrar valores em documentação ou telemetria.',
    owner: 'Equipe autorizada',
    gate: 'Ação humana no painel',
  },
  {
    priority: 'Imediato',
    title: 'Resolver a conta protegida por divergência de identidade',
    description:
      'Manter a sessão preservada até uma pessoa autorizada decidir entre aceitar a identidade detectada ou iniciar novo pareamento.',
    owner: 'Equipe autorizada',
    gate: 'Validação humana explícita',
  },
  {
    priority: 'Antes de novas vendas',
    title: 'Atribuir a vendedora real de cada conta comercial',
    description:
      'Completar os quatro vínculos sem confundir o papel de venda com o de indicação/comissionamento.',
    owner: 'Operação comercial',
    gate: 'Evidência comercial confiável',
  },
  {
    priority: 'Continuidade',
    title: 'Configurar e comprovar um alerta externo às duas infraestruturas',
    description:
      'Somente depois da comprovação externa habilitar as rotinas recorrentes de monitoramento, backup e restauração ensaiada.',
    owner: 'Operação técnica',
    gate: 'Monitor independente comprovado',
  },
  {
    priority: 'Próximo release',
    title: 'Publicar o candidato validado de 25/08',
    description:
      'Transferir o pacote code-only já testado quando o acesso administrativo aceito for restabelecido, preservando todo o estado operacional.',
    owner: 'Operação técnica',
    gate: 'Acesso válido e autorização de push',
  },
]);

const records = [
  {
    date: '2026-08-15',
    title: 'Preparação da correção pós-revisão',
    context: 'Documentação',
    kind: 'Diagnóstico',
    state: 'Concluído',
    summary:
      'O código, as configurações, os dados estruturais e a documentação foram analisados para registrar o estado vigente antes de qualquer alteração.',
    result:
      'A referência técnica obrigatória foi criada e os achados de segurança, persistência e validação passaram a ter uma base verificável.',
    validation: 'Revisão somente leitura; nenhuma execução operacional foi iniciada.',
    tags: ['governança', 'segurança', 'documentação'],
  },
  {
    date: '2026-08-15',
    title: 'Correções dos achados da revisão integral',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Foram endurecidas as fronteiras de credenciais, origem das requisições, transporte de IA, agendamentos, logs concorrentes e arquivos operacionais.',
    result:
      'A cadeia vulnerável de navegador foi atualizada, chaves deixaram de ser gravadas em configuração pública e regressões automatizadas passaram a cobrir os riscos encontrados.',
    validation: '227/227 testes; verificação sintática aprovada e auditoria de dependências sem vulnerabilidades conhecidas.',
    tags: ['segurança', 'testes', 'API'],
  },
  {
    date: '2026-08-15',
    title: 'Credencial operacional e bootstrap reproduzível',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'O carregamento seguro de configuração sensível foi integrado ao fluxo oficial e um catálogo inicial versionável passou a sustentar instalações limpas.',
    result:
      'Clones novos podem inicializar o domínio sem publicar configuração operacional, e uma verificação isolada confirma disponibilidade do provedor sem revelar conteúdo.',
    validation: 'Coberturas adicionadas para carregamento seguro e bootstrap sem estado legado.',
    tags: ['bootstrap', 'configuração', 'catálogo'],
  },
  {
    date: '2026-08-18',
    title: 'Regime principal de desenvolvimento local e produção',
    context: 'Documentação',
    kind: 'Decisão',
    state: 'Vigente',
    summary:
      'Ficou estabelecido que toda mudança nasce localmente, é validada sem iniciar o WhatsApp e só chega à produção após autorização explícita.',
    result:
      'O fluxo protege sessões, dados, caches, dependências do servidor e evita duas instâncias concorrentes do mensageiro.',
    validation: 'Alteração documental; nenhum serviço foi iniciado ou reiniciado.',
    tags: ['governança', 'deploy', 'proteção de dados'],
  },
  {
    date: '2026-08-18',
    title: 'Fronteira de acesso somente leitura à produção',
    context: 'Documentação',
    kind: 'Decisão',
    state: 'Vigente',
    summary:
      'Diagnósticos remotos somente leitura foram separados formalmente de qualquer mutação, implantação ou reinício.',
    result:
      'Observar produção não concede autorização implícita para alterá-la; o pedido explícito de push permanece como gate.',
    validation: 'Alteração exclusivamente documental, sem acesso ou mutação remota.',
    tags: ['governança', 'produção', 'autorização'],
  },
  {
    date: '2026-08-18',
    title: 'Autenticação do dashboard',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'O dashboard e a API receberam autenticação no servidor, sessão opaca, cookie restrito, expiração e bloqueio progressivo de tentativas.',
    result:
      'Somente o login e seus recursos mínimos permanecem públicos; a senha não é entregue ao navegador.',
    validation: '233/233 testes aprovados; sem inicialização do aplicativo ou do WhatsApp.',
    tags: ['autenticação', 'dashboard', 'segurança'],
  },
  {
    date: '2026-08-18',
    title: 'Segunda autenticação para o painel do Agente IA',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A área técnica de IA ganhou uma sessão independente e fronteiras próprias em páginas e APIs.',
    result:
      'A autenticação geral deixou de ser suficiente para consultar ou alterar a configuração técnica da IA.',
    validation: '237/237 testes aprovados; implementação mantida local nesta etapa.',
    tags: ['autenticação', 'IA', 'controle de acesso'],
  },
  {
    date: '2026-08-18',
    title: 'Deploy das autenticações',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'As duas camadas de autenticação aprovadas foram implantadas com backup prévio e preservação integral do estado operacional.',
    result:
      'Acesso anônimo passou a redirecionar para login e a área de IA continuou exigindo a segunda sessão.',
    validation: 'Fluxo funcional verificado no servidor; senhas ausentes dos recursos públicos.',
    tags: ['deploy', 'autenticação', 'produção'],
  },
  {
    date: '2026-08-18',
    title: 'Terminal web protegido',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Foi criado um terminal de observabilidade somente leitura, com buffer circular, sanitização preventiva e transmissão em tempo real.',
    result:
      'A operação ganhou visibilidade remota sem introduzir uma interface de execução de comandos.',
    validation: '241/241 testes aprovados; sem execução do runtime local.',
    tags: ['observabilidade', 'segurança', 'tempo real'],
  },
  {
    date: '2026-08-18',
    title: 'Painel unificado de contas WhatsApp',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Conexão, moderação, atendimento automático e contexto por conta foram centralizados em uma única interface protegida.',
    result:
      'Memórias e controles permanecem isolados por conta, com acesso administrativo validado no servidor.',
    validation: '244/244 testes integrais e 33/33 testes direcionados aprovados.',
    tags: ['multi-conta', 'dashboard', 'isolamento'],
  },
  {
    date: '2026-08-18',
    title: 'Redirecionamento web preparado localmente',
    context: 'Local',
    kind: 'Implementação',
    state: 'Preparado',
    summary:
      'A configuração de entrada web foi preparada para simplificar o acesso ao dashboard, mantendo a restrição de rede então vigente.',
    result:
      'A produção foi apenas diagnosticada; instalação, firewall e recarga ficaram condicionados a push explícito.',
    validation: 'Diagnóstico remoto somente leitura, sem escrita ou reload.',
    tags: ['rede', 'proxy', 'preparação'],
  },
  {
    date: '2026-08-18',
    title: 'Liberação controlada do painel Contas',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Uma permissão dinâmica passou a liberar apenas operações de pareamento para usuários comuns, preservando controles técnicos exclusivos.',
    result:
      'O acesso pode ser revogado imediatamente e o contexto interno do agente nunca é retornado a sessões sem privilégio.',
    validation: '250/250 testes integrais e 20/20 direcionados aprovados.',
    tags: ['permissões', 'contas', 'segurança'],
  },
  {
    date: '2026-08-18',
    time: '22:25:57 UTC',
    title: 'Deploy do Terminal, painel Contas e entrada web',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'Observabilidade, gestão de contas, controle de acesso e entrada web foram publicados com backup recuperável e estado operacional preservado.',
    result:
      'O serviço voltou ativo e a sessão operacional reconectou às 22:25:57 UTC.',
    validation: '250/250 testes no servidor, configuração web validada e acessos anônimos mantidos bloqueados.',
    tags: ['deploy', 'observabilidade', 'contas'],
  },
  {
    date: '2026-08-18',
    title: 'Correção da consulta de Sugestões IA no CRM',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A consulta comercial passou a exigir uma sessão autenticada em vez de depender da origem de rede do navegador.',
    result:
      'O CRM remoto recuperou a área indisponível sem tornar a inteligência comercial pública.',
    validation: '250/250 testes aprovados; correção ainda local nesta etapa.',
    tags: ['CRM', 'autenticação', 'API'],
  },
  {
    date: '2026-08-18',
    title: 'Agrupamento das opções de desenvolvedor',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Agente IA e Terminal foram reunidos em uma categoria recolhível, enquanto Contas e Configurações permaneceram no nível operacional correto.',
    result:
      'A navegação ficou mais clara sem alterar as barreiras de autorização no servidor.',
    validation: '250/250 testes aprovados; alteração mantida local nesta etapa.',
    tags: ['UX', 'navegação', 'acessibilidade'],
  },
  {
    date: '2026-08-18',
    title: 'Identidade visual Zyntra no dashboard',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A marca oficial, a paleta editorial e o layout mobile first foram aplicados às páginas do dashboard e aos logins.',
    result:
      'A interface passou a apresentar identidade coesa em celulares e desktops sem mudar regras operacionais.',
    validation: '251/251 testes integrais e 14/14 direcionados aprovados.',
    tags: ['design', 'mobile first', 'marca'],
  },
  {
    date: '2026-08-18',
    title: 'Deploy de Sugestões IA, navegação técnica e identidade Zyntra',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A correção comercial, o agrupamento técnico e a nova identidade visual foram publicados como um pacote controlado.',
    result:
      'Login, ativo de marca e proteção da API foram confirmados sem ampliar a exposição de rede.',
    validation: '251/251 testes aprovados no servidor antes da ativação.',
    tags: ['deploy', 'CRM', 'marca'],
  },
  {
    date: '2026-08-19',
    title: 'Confirmação manual de venda e pagamento',
    context: 'Local',
    kind: 'Decisão',
    state: 'Validado',
    summary:
      'Venda e pagamento foram reafirmados como duas decisões humanas independentes; nem link confiável nem observação da IA concluem essas etapas.',
    result:
      'Aprovar venda cria apenas um pedido aguardando pagamento; receita, estoque definitivo e comissão dependem da confirmação financeira posterior.',
    validation: '23/23 testes direcionados aprovados.',
    tags: ['comercial', 'governança', 'pagamento'],
  },
  {
    date: '2026-08-19',
    title: 'CRM multi-WhatsApp, estoque e comissões',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'O CRM ganhou enriquecimento seguro de contatos, baseline idempotente de estoque, comissionamento por conta, varredura histórica e reutilização controlada do provedor de IA.',
    result:
      'Identidade idempotente foi preservada e vendas históricas continuaram sujeitas à revisão humana.',
    validation: '264/264 testes integrais e 45/45 direcionados aprovados.',
    tags: ['CRM', 'estoque', 'comissões'],
  },
  {
    date: '2026-08-19',
    title: 'Envio direto de cards catalogados e identidade CRM',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Pedidos explícitos de mídia passaram a resolver materiais oficiais localmente antes da geração textual, com classificador restrito apenas quando necessário.',
    result:
      'Cards de apresentação, ficha técnica e preços são enviados de modo determinístico, e identificadores de mensagem deixaram de colidir.',
    validation: '259/259 testes integrais e 23/23 direcionados aprovados.',
    tags: ['catálogo', 'mídia', 'CRM'],
  },
  {
    date: '2026-08-19',
    time: '03:08:17 UTC',
    title: 'Deploy do fluxo de cards catalogados e identidade CRM',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O roteamento de mídia, a identidade idempotente e as coleções aprovadas foram implantados de forma aditiva.',
    result:
      'O serviço reutilizou a sessão existente e confirmou prontidão às 03:08:17 UTC.',
    validation: '259/259 testes no servidor e integridade do payload confirmada.',
    tags: ['deploy', 'catálogo', 'CRM'],
  },
  {
    date: '2026-08-19',
    title: 'Reconstrução local do catálogo após curadoria',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'O catálogo foi reconstruído para usar somente as coleções curadas, declarar onde cada material existe e recusar caminhos ou cópias antigas.',
    result:
      'A tabela vigente e as apresentações de produto passaram a ter autoridade física e semântica inequívoca.',
    validation: '259/259 testes integrais e 15/15 focados aprovados.',
    tags: ['catálogo', 'curadoria', 'integridade'],
  },
  {
    date: '2026-08-19',
    time: '05:22:55 UTC',
    title: 'Deploy do catálogo reconstruído e imagens curadas',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'As coleções curadas foram espelhadas com escopo restrito e o catálogo foi atualizado para refletir exatamente os materiais aprovados.',
    result:
      'Uma cópia duplicada criada por interpretação de caminho foi detectada e removida antes dos testes; o serviço ficou pronto às 05:22:55 UTC.',
    validation: '259/259 testes no servidor e paridade das coleções confirmada.',
    tags: ['deploy', 'catálogo', 'correção operacional'],
  },
  {
    date: '2026-08-19',
    title: 'Liberação pública do dashboard',
    context: 'Produção',
    kind: 'Decisão',
    state: 'Publicado',
    summary:
      'A entrada web deixou de depender da rede de origem do usuário, preservando autenticação no servidor e os cabeçalhos de segurança então existentes.',
    result:
      'O acesso ficou disponível a pessoas autorizadas em redes diferentes; a necessidade de transporte HTTPS permaneceu registrada como próxima melhoria.',
    validation: 'Fluxo externo até o login confirmado, sem reinício da aplicação.',
    tags: ['rede', 'acesso', 'dashboard'],
  },
  {
    date: '2026-08-19',
    title: 'Usuários, papéis de acesso e auditoria de segurança',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A autenticação passou a usar contas nominais, papéis separados, troca de senha, revogação de sessões e administração restrita.',
    result:
      'Uma auditoria formal priorizou HTTPS, rotação das credenciais iniciais, permissões, CSP/XSS, eventos de auditoria e autorização por capacidade.',
    validation: '262/262 testes, verificação sintática e auditoria de dependências aprovadas.',
    tags: ['autenticação', 'papéis', 'auditoria'],
  },
  {
    date: '2026-08-19',
    title: 'Cobertura e refinamento do Terminal operacional',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A telemetria foi estruturada por categoria e evento, ampliada para cinco mil registros e endurecida para descartar conteúdo pessoal ou sensível.',
    result:
      'WhatsApp, IA e sistema ganharam eventos úteis, filtros e pesquisa sem transformar o Terminal em armazenamento de conversas.',
    validation: '265/265 testes integrais e 66/66 direcionados aprovados.',
    tags: ['observabilidade', 'privacidade', 'Terminal'],
  },
  {
    date: '2026-08-19',
    time: '16:06:48–16:06:52 UTC',
    title: 'Deploy de CRM, usuários, papéis e Terminal refinado',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'CRM, estoque, comissões, acessos nominais e telemetria estruturada foram publicados com permissões restritas e estado preservado.',
    result:
      'A sessão autenticou e conectou entre 16:06:48 e 16:06:52 UTC; os novos eventos apareceram sem dados pessoais.',
    validation: '265/265 testes no servidor e payload comparado com a versão local.',
    tags: ['deploy', 'CRM', 'acessos'],
  },
  {
    date: '2026-08-19',
    title: 'Painel dedicado de acessos do dashboard',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A gestão de acessos foi separada dos contatos monitorados e recebeu navegação, formulários e permissões próprias.',
    result:
      'A operação passou a distinguir claramente pessoas com acesso ao sistema de contatos acompanhados no WhatsApp.',
    validation: '266/266 testes integrais e 13/13 direcionados aprovados.',
    tags: ['acessos', 'dashboard', 'UX'],
  },
  {
    date: '2026-08-19',
    title: 'Deploy do painel de Acessos',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O painel dedicado, a separação de contatos e as regressões de autenticação foram publicados sem alterar dados operacionais.',
    result:
      'Página, script e status de autenticação continuaram protegidos contra acesso anônimo.',
    validation: '266/266 testes aprovados no servidor.',
    tags: ['deploy', 'acessos', 'autenticação'],
  },
  {
    date: '2026-08-19',
    title: 'Reescrita integral da visão geral do projeto',
    context: 'Documentação',
    kind: 'Documentação',
    state: 'Concluído',
    summary:
      'A visão geral foi reescrita para refletir produto, operação, arquitetura, segurança, recursos atuais e roadmap sem herdar limitações superadas do MVP.',
    result:
      'O projeto ganhou uma leitura executiva e técnica coerente com o estado real daquela data.',
    validation: 'Documento revisado em 26 seções; 266/266 testes integrais aprovados.',
    tags: ['documentação', 'produto', 'roadmap'],
  },
  {
    date: '2026-08-19',
    title: 'Reformulação da fila de Revisões do CRM',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A fila passou a identificar cliente, explicar o que será alterado e traduzir códigos técnicos em ações compreensíveis.',
    result:
      'Itens visualmente repetitivos ficaram distinguíveis sem mudar API nem automatizar decisões financeiras.',
    validation: '267/267 testes integrais e 2/2 direcionados aprovados.',
    tags: ['CRM', 'UX', 'revisões'],
  },
  {
    date: '2026-08-19',
    title: 'Deploy da fila Revisões do CRM',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A interface explicativa da fila de revisões foi publicada com backup e verificação de integridade.',
    result:
      'A entrega estática dispensou reinício e manteve login, CRM e API comercial protegidos.',
    validation: '267/267 testes aprovados no servidor.',
    tags: ['deploy', 'CRM', 'UX'],
  },
  {
    date: '2026-08-19',
    title: 'Correção de logs operacionais e autostart multi-WhatsApp',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Alertas ruidosos foram convertidos em eventos estruturados e a intenção de reconexão passou a ser persistida por conta.',
    result:
      'Contas previamente conectadas podem recuperar sessões no restart, enquanto desconexão ou logout manual continua desativando a retomada.',
    validation: '270/270 testes integrais e 17/17 direcionados aprovados.',
    tags: ['logs', 'multi-conta', 'recuperação'],
  },
  {
    date: '2026-08-19',
    title: 'Deploy dos logs operacionais e autostart multi-WhatsApp',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A telemetria refinada e a migração idempotente de retomada automática foram implantadas nas contas elegíveis.',
    result:
      'A conta principal e duas gerenciadas reutilizaram sessões preservadas e terminaram conectadas sem novo pareamento.',
    validation: '270/270 testes aprovados no servidor.',
    tags: ['deploy', 'logs', 'multi-conta'],
  },
  {
    date: '2026-08-19',
    title: 'Timeout da Inteligência Comercial',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'O orçamento de tempo do provedor comercial foi ajustado e os eventos passaram a distinguir timeout de outras falhas.',
    result:
      'O fallback determinístico permaneceu disponível, com diagnóstico mais claro para latência do provedor externo.',
    validation: '271/271 testes integrais e 3/3 direcionados aprovados.',
    tags: ['IA', 'timeout', 'observabilidade'],
  },
  {
    date: '2026-08-19',
    title: 'Deploy do timeout da Inteligência Comercial',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O novo limite e a classificação inequívoca de erros foram ativados na produção controlada.',
    result:
      'A limitação de latência e cota do provedor continuou observável, enquanto o fallback manteve o fluxo operacional.',
    validation: '271/271 testes no servidor e proteção web confirmada.',
    tags: ['deploy', 'IA', 'resiliência'],
  },
  {
    date: '2026-08-19',
    time: '20:49 UTC',
    title: 'Recuperação da produção e conexão idempotente durante QR',
    context: 'Produção',
    kind: 'Diagnóstico',
    state: 'Recuperado',
    summary:
      'Uma segunda tentativa de conexão durante o pareamento abriu processo concorrente sobre a mesma sessão e provocou pressão severa de recursos.',
    result:
      'A conta problemática foi preservada e parada, as demais voltaram a conectar e a correção idempotente foi preparada localmente. A intervenção está documentada às 20:49 UTC.',
    validation: '272/272 testes integrais e 18/18 direcionados aprovados localmente.',
    tags: ['incidente', 'recuperação', 'idempotência'],
  },
  {
    date: '2026-08-19',
    time: '21:06 UTC',
    title: 'Deploy da conexão idempotente e retomada segura',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A proteção contra inicializações concorrentes foi publicada e a conta sobressalente teve retomada controlada.',
    result:
      'O fluxo passou a reutilizar a tentativa em andamento, evitando processos duplicados sobre a mesma sessão.',
    validation: '272/272 testes aprovados no servidor; backup registrado às 21:06 UTC.',
    tags: ['deploy', 'idempotência', 'recuperação'],
  },
  {
    date: '2026-08-19',
    title: 'Priorização do chat e endpoint NVIDIA compacto',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Chamadas interativas passaram a ter prioridade sobre tarefas auxiliares e um perfil compacto foi preparado para reduzir disputa de cota.',
    result:
      'O chat ganhou fila por conversa, tracking em segundo plano e orçamento compacto; a coordenação global ainda seria concluída no diagnóstico seguinte.',
    validation: '277/277 testes integrais e 48/48 direcionados aprovados.',
    tags: ['IA', 'priorização', 'performance'],
  },
  {
    date: '2026-08-19',
    title: 'Diagnóstico aprofundado e padronização dos endpoints NVIDIA',
    context: 'Local',
    kind: 'Validação',
    state: 'Concluído',
    summary:
      'A concorrência global por uma mesma cota foi identificada como causa de filas e limites; modelos foram avaliados com conteúdo exclusivamente sintético.',
    result:
      'Foi criado o coordenador global por prioridade, perfis operacionais foram selecionados por função e um modelo rápido porém inseguro foi descartado por respostas incoerentes.',
    validation: 'Mais de 173 chamadas sintéticas; 286/286 testes locais aprovados.',
    tags: ['IA', 'benchmark', 'diagnóstico'],
  },
  {
    date: '2026-08-19',
    title: 'Deploy da prioridade do chat e padronização NVIDIA',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'Scheduler, perfis, barreiras determinísticas, opt-in comercial e ajustes do Guardião foram implantados como pacote aprovado.',
    result:
      'A produção manteve carga normal e autenticação protegida; comparadores posteriores permaneceram apenas locais.',
    validation: '286/286 testes aprovados no servidor.',
    tags: ['deploy', 'IA', 'performance'],
  },
  {
    date: '2026-08-19',
    title: 'Comparador controlado de modelos NVIDIA',
    context: 'Local',
    kind: 'Implementação',
    state: 'Preparado',
    summary:
      'Foi criado um comparador reproduzível para avaliar modelos com casos sintéticos, métricas de latência e revisão humana.',
    result:
      'A ferramenta foi validada sintaticamente e mantida isolada para não colidir com a operação coordenada.',
    validation: 'Verificação sintática aprovada; nenhuma chamada externa nesta etapa.',
    tags: ['IA', 'ferramenta', 'benchmark'],
  },
  {
    date: '2026-08-19',
    title: 'Comparação real de chat e Guard NVIDIA',
    context: 'Local',
    kind: 'Validação',
    state: 'Concluído',
    summary:
      'Modelos de chat e moderação foram comparados em correção, latência, recall de risco e falsos positivos usando entradas sintéticas.',
    result:
      'Dois perfis de chat atingiram 5/5; o Guard de melhor resultado atingiu 8/8, enquanto alternativas apresentaram falsos positivos ou timeout.',
    validation: '24 avaliações de Guard sem limite de cota e revisão humana das respostas de chat.',
    tags: ['IA', 'qualidade', 'segurança'],
  },
  {
    date: '2026-08-19',
    title: 'Parecer final NVIDIA NIM e validação local',
    context: 'Local',
    kind: 'Decisão',
    state: 'Concluído',
    summary:
      'O parecer separou o perfil já integrado das opções que ainda exigem adaptadores, parsers e workers próprios.',
    result:
      'Trocar apenas o nome do modelo foi rejeitado por não garantir compatibilidade nem isolamento operacional.',
    validation: '286/286 testes e verificação sintática dos comparadores aprovados.',
    tags: ['IA', 'arquitetura', 'decisão'],
  },
  {
    date: '2026-08-20',
    title: 'Funil e ações não financeiras automáticos',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Cadastro, avanço de funil e tarefas rotineiras passaram a ser aplicados automaticamente, com idempotência e trilha de decisão.',
    result:
      'Venda e pagamento permaneceram fora da automação e dependentes de aprovação humana.',
    validation: '288/288 testes integrais e 25/25 direcionados aprovados.',
    tags: ['CRM', 'automação', 'governança'],
  },
  {
    date: '2026-08-20',
    title: 'Revisão geral de clareza e organização do CRM',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Textos, navegação, pedidos e revisões foram reorganizados para uma operação sem conhecimento técnico.',
    result:
      'Identificadores internos deixaram de dominar a interface e as duas decisões financeiras ficaram claramente separadas.',
    validation: '288/288 testes integrais e 7/7 focados aprovados.',
    tags: ['CRM', 'UX', 'clareza'],
  },
  {
    date: '2026-08-20',
    time: '12:08 UTC',
    title: 'Deploy da automação e usabilidade do CRM',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A automação não financeira e a interface simplificada do CRM foram publicadas em pacote controlado.',
    result:
      'A reconciliação operacional preservou as decisões financeiras manuais; o backup da entrega foi registrado às 12:08 UTC.',
    validation: '288/288 testes aprovados no servidor e fluxo web protegido confirmado.',
    tags: ['deploy', 'CRM', 'automação'],
  },
  {
    date: '2026-08-20',
    title: 'CRM como página inicial do dashboard',
    context: 'Local',
    kind: 'Decisão',
    state: 'Validado',
    summary:
      'A rota principal e o destino após login passaram a apontar para o CRM, preservando o painel anterior no menu.',
    result:
      'A jornada diária ficou alinhada ao trabalho comercial mais frequente.',
    validation: 'Alteração local coberta pela suíte do projeto; publicação ainda pendente nesta etapa.',
    tags: ['CRM', 'navegação', 'produto'],
  },
  {
    date: '2026-08-20',
    title: 'Recuperação guiada da terceira conta CRM',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'O painel passou a explicar a divergência de identidade e oferecer duas decisões explícitas, encerrando processos presos e escalonando a retomada das contas.',
    result:
      'A proteção contra vincular a identidade errada foi mantida, e a operação ganhou uma recuperação compreensível sem acesso a logs.',
    validation: '291/291 testes anteriores e 40/40 direcionados aprovados; conta preservada aguardando decisão humana.',
    tags: ['contas', 'recuperação', 'UX'],
  },
  {
    date: '2026-08-20',
    title: 'Preparação SQLite, frontend Vercel, medidor de RAM e auditoria de capacidade',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Foi preparada uma camada SQLite opt-in, migração segura, métricas de recursos e uma trilha estática de frontend, sem alterar a produção.',
    result:
      'Uma varredura remota ampla causou pressão de memória às 00:42:17 UTC e foi interrompida; o serviço se recuperou automaticamente. A migração foi ensaiada apenas em cópia local.',
    validation: '337/337 testes e auditoria de dependências aprovados; dados operacionais permaneceram inalterados.',
    tags: ['SQLite', 'capacidade', 'incidente'],
  },
  {
    date: '2026-08-21',
    title: 'Reversão local da trilha GitHub + Vercel',
    context: 'Local',
    kind: 'Decisão',
    state: 'Concluído',
    summary:
      'A proposta de separar o dashboard operacional em hospedagem estática foi cancelada antes da publicação.',
    result:
      'Dashboard e API permaneceram juntos no servidor protegido; arquivos experimentais dessa trilha foram removidos sem afetar o runtime.',
    validation: 'Reversão local documentada; nenhuma publicação externa realizada.',
    tags: ['arquitetura', 'Vercel', 'decisão'],
  },
  {
    date: '2026-08-22',
    title: 'Congelamento da infraestrutura antiga e preparação do corte',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Concluído',
    summary:
      'A instância antiga foi parada e desabilitada, o estado foi congelado e o banco SQLite preparado com migração verificável e rollback ensaiado.',
    result:
      'Quatro stores foram importados e verificados sem apagar JSONs ou sessões; o pacote code-only e o runbook ficaram prontos para o novo destino.',
    validation: '372/372 testes locais; pacote isolado com 368/368 testes e integridade do banco aprovada.',
    tags: ['cutover', 'SQLite', 'continuidade'],
  },
  {
    date: '2026-08-22',
    title: 'Cutover concluído e ativação controlada na nova infraestrutura',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'Código, banco e sessões preservadas foram ativados no novo ambiente com o aplicativo supervisionado e o backend SQLite granular.',
    result:
      'Uma conta principal e duas gerenciadas conectaram; a quarta foi bloqueada com segurança por divergência de identidade. As contagens do banco cresceram sem redução da baseline.',
    validation: 'Integridade SQLite aprovada, três perfis de navegador isolados e serviço saudável.',
    tags: ['cutover', 'produção', 'SQLite'],
  },
  {
    date: '2026-08-23',
    title: 'Dashboard público em HTTPS e reparo canônico do SQLite',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O proxy HTTPS tornou-se a única entrada pública e a aplicação permaneceu em loopback, com cookies seguros e confiança de proxy restrita.',
    result:
      'Uma ordem não canônica em um contato interrompeu o primeiro restart; o banco foi mantido fechado, reparado em operação offline restrita e protegido por regressão.',
    validation: '381/381 testes locais; TLS, proxy, SQLite e perfis reconferidos.',
    tags: ['HTTPS', 'SQLite', 'incidente'],
  },
  {
    date: '2026-08-23',
    title: 'Consolidação integral da documentação pós-cutover',
    context: 'Documentação',
    kind: 'Documentação',
    state: 'Concluído',
    summary:
      'Autoridades técnicas, runbooks e visão geral foram reconciliados com a nova topologia, HTTPS, SQLite e estados das contas.',
    result:
      'Documentos históricos passaram a apontar para as autoridades atuais, reduzindo o risco de operar com instruções superadas.',
    validation: 'Links de 17 documentos verificados; 381/381 testes aprovados novamente.',
    tags: ['documentação', 'cutover', 'governança'],
  },
  {
    date: '2026-08-24',
    title: 'Cliente 360, atribuição comercial e continuidade operacional',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Cliente 360, endereço estruturado, separação entre vendedora e indicador, tratamento de pendências antigas e entrega resiliente de agendamentos foram implementados.',
    result:
      'Dados pessoais ficaram restritos à visão autorizada, vendas e pagamentos seguiram manuais e o pacote de TLS/backup foi preparado com gates externos.',
    validation: '451/451 testes locais aprovados após correção de duas fixtures de teste.',
    tags: ['Cliente 360', 'comercial', 'resiliência'],
  },
  {
    date: '2026-08-24',
    title: 'Destino append-only e retirada da poda no cliente',
    context: 'Local',
    kind: 'Decisão',
    state: 'Validado',
    summary:
      'O desenho de backup passou a usar um destino autenticado append-only, sem capacidade rotineira de poda no cliente de produção.',
    result:
      'A administração de retenção ficou isolada no destino; automações recorrentes continuaram proibidas até existir alerta externo independente.',
    validation: '453/453 testes integrais e 10/10 testes operacionais aprovados.',
    tags: ['backup', 'append-only', 'segurança'],
  },
  {
    date: '2026-08-24',
    title: 'Ajuste do runtime operacional durante o push autorizado',
    context: 'Produção',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Os scripts operacionais foram ajustados ao runtime real do servidor e a primeira falha do monitor TLS foi corrigida de forma segura.',
    result:
      'O destino de backup recebeu seus serviços, uma prova sintética confirmou append-only e o erro de verificação por IP ganhou regressão específica.',
    validation: '454/454 testes integrais e 11/11 testes operacionais aprovados.',
    tags: ['runtime', 'TLS', 'backup'],
  },
  {
    date: '2026-08-24',
    title: 'Push concluído, backup real e validação pós-deploy',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O release code-only foi publicado atomicamente, preservando banco, configurações, sessões, caches e dependências específicas do servidor.',
    result:
      'Dois snapshots reais, backup e restauração ensaiada foram concluídos; banco e migrações ficaram íntegros, com três contas conectadas e uma protegida.',
    validation: '454/454 testes no release; dois snapshots reais e zero locks residuais.',
    tags: ['release', 'backup', 'produção'],
  },
  {
    date: '2026-08-25',
    title: 'Política de conteúdo, timeline e explicabilidade no CRM',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A retenção de conteúdo privado ganhou política explícita, a timeline passou a explicar mensagens sem texto persistido e aprovações exibem motor, regra e resultado.',
    result:
      'Uma regressão intermediária que interrompia análise sem retenção foi corrigida mantendo o texto de análise transitório e não persistido.',
    validation: 'Todos os testes deste ajuste passaram; a única falha integral apontava os dois cards corrigidos no registro seguinte da fonte.',
    tags: ['privacidade', 'CRM', 'explicabilidade'],
  },
  {
    date: '2026-08-25',
    time: '18:38:58 UTC',
    title: 'Semax e Selank intranasais no catálogo técnico',
    context: 'Local',
    kind: 'Implementação',
    state: 'Pronto para push',
    summary:
      'Dois materiais técnicos foram incorporados ao catálogo com IDs estáveis, aliases de rota e coleção física explícita.',
    result:
      'O candidato code-only foi reproduzido às 18:38:58 UTC, mas o acesso administrativo não foi aceito; nenhuma mutação remota ocorreu.',
    validation: '462/462 testes no candidato local, incluindo 442 principais e 20 legados.',
    tags: ['catálogo', 'candidato', 'pendente'],
  },
  {
    date: '2026-08-26',
    title: 'Criação da página pública de prestação de contas',
    context: 'Local',
    kind: 'Documentação',
    state: 'Pronto para publicação',
    summary:
      'Foi criado um portal estático premium, mobile first e acessível para apresentar onde o projeto está, para onde vai e todo o progresso em ordem cronológica.',
    result:
      'Os 61 registros-fonte foram consolidados e sanitizados, totalizando 62 entradas com este registro. O portal está preparado para substituir a landing histórica no projeto web existente.',
    validation: 'Testes e build do subprojeto documentam a preparação; a publicação externa permanece pendente até o deploy autorizado ser concluído.',
    tags: ['prestação de contas', 'Vercel', 'documentação'],
  },
];

export const progressEntries = Object.freeze(
  records.map((record, index) =>
    Object.freeze({
      id: `registro-${String(index + 1).padStart(2, '0')}`,
      sequence: index + 1,
      time: null,
      ...record,
      tags: Object.freeze([...record.tags]),
    }),
  ),
);

export const filterOptions = Object.freeze({
  contexts: [...new Set(progressEntries.map(({ context }) => context))],
  kinds: [...new Set(progressEntries.map(({ kind }) => kind))],
  states: [...new Set(progressEntries.map(({ state }) => state))],
});
