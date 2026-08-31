const REPORT_TIME_ZONE = 'America/Sao_Paulo';
const REPORT_TIME_ZONE_LABEL = 'horário de Brasília';
const REPORT_UPDATED_AT = '2026-08-31T07:38:02-03:00';

function formatReportUpdatedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new TypeError('Horário de atualização inválido.');

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZone: REPORT_TIME_ZONE,
    })
      .formatToParts(date)
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value: partValue }) => [type, partValue]),
  );

  return `${parts.day} de ${parts.month} de ${parts.year} às ${parts.hour}:${parts.minute}:${parts.second} (${REPORT_TIME_ZONE_LABEL})`;
}

export const reportMeta = Object.freeze({
  title: 'SentinelZap — Prestação de contas',
  updatedAtIso: REPORT_UPDATED_AT,
  updatedAtLabel: formatReportUpdatedAt(REPORT_UPDATED_AT),
  timeZone: REPORT_TIME_ZONE,
  timeZoneLabel: REPORT_TIME_ZONE_LABEL,
  period: '15 a 31 de agosto de 2026',
  sourceRecords: 81,
  publishedRecords: 82,
  productionReleaseDate: '31 de agosto de 2026',
  publicUrl: 'https://sentinelzap.vercel.app/',
  orderingNote:
    'A linha do tempo mostra primeiro o registro documental mais recente. A fonte canônica permanece crescente; quando não há horário comprovado, nenhum horário é inventado.',
});

export const executiveMetrics = Object.freeze([
  {
    value: '3 / 2',
    label: 'agentes e votos no candidato local',
    note: 'Candidato validado localmente: os três modelos atuais foram preservados e evidência, contexto e contestação são avaliados separadamente, exigindo dois votos concordantes de agentes distintos sobre a mensagem corrente. Usar o mesmo modelo ou provedor é permitido e não garante independência estatística. O focal reprovado da etapa interrompida foi preservado no histórico; o núcleo corrigido passou nos novos focais e na suíte integral. A produção mantém o contrato anterior de duas origens, sem novo push nesta etapa.',
  },
  {
    value: '1.200',
    label: 'testes integrais do candidato local',
    note: 'Suíte integral local concluída em 31/08 às 07:31:57 de Brasília, com 1.200 testes, 1.199 aprovações, zero falhas ou cancelamentos e um skip esperado no macOS. O focal ampliado de 12 arquivos passou 161 de 161 às 07:08:39, sem falhas, skips ou cancelamentos. Foram acrescentadas 42 regressões: 33 no núcleo e nove no agendamento; seus focais passaram 73 de 73 e 12 de 12. O código congelado e o estado protegido permaneceram idênticos antes e depois. Não houve novos testes Linux, chamada a IA real ou novo push para a VPS nesta etapa.',
  },
  {
    value: '13 + 8',
    label: 'seções documentais confrontadas',
    note: '13 seções acrescentadas ao Markdown de protocolos e oito seções faltantes à compilação, além do complemento da seção existente de GHK-Cu. A transcrição segue os cards; não é validação clínica. Três cards com divergências mantêm quatro seções técnicas bloqueadas.',
  },
  {
    value: '18 / 90',
    label: 'fontes lidas e imagens preservadas',
    note: '18 fontes visuais lidas individualmente, com as 90 imagens do inventário preservadas. São 22 indisponibilidades: 20 anteriores, incluindo NAD nasal não reconciliado, e dois técnicos existentes bloqueados nesta revisão. Nenhuma arte foi fabricada ou substituída.',
  },
  {
    value: '1.157 / 1.152',
    label: 'gates integrais da versão instalada',
    note: 'Versão instalada: 1.157 testes locais, com 1.156 aprovações, zero falhas e um skip esperado, concluídos em 31/08 às 02:37:42 de Brasília; Linux: 1.152 de 1.152 aprovados às 02:33:41. Os gates dos cards de 1.126 testes locais e 1.121 no Linux antecedem o reparo da conta principal. Seu primeiro pacote falhou em um contrato de telemetria nas duas suítes integrais. Sete eventos foram restaurados; o focal passou 214 de 214 testes, com 31 regressões da conta principal. Os novos integrais foram aprovados e o pacote foi instalado em 31/08 às 02:52:31 de Brasília. O runtime foi aceito com cinco contas conectadas em duas checagens, com backup posterior e restauração isolada confirmados. A checagem final às 03:16:04,129 de Brasília aprovou cinco contas conectadas, nenhuma varredura ou job ativo e zero reinícios automáticos.',
  },
  {
    value: '160.000',
    label: 'matriz combinatória offline',
    note: 'O novo candidato local do Guardião aprovou 160.000 de 160.000 casos offline em 1.177,965 segundos, com 40 produtos × 4.000 casos em 20 famílias de cenários. A versão já instalada teve resultados anteriores de 444,109 segundos localmente e 63,956 segundos no Linux; esses gates históricos não validam o novo candidato. Essa contagem não equivale a conversas com um modelo de linguagem real. Não houve nova execução Linux nesta etapa.',
  },
  {
    value: '240 + 240',
    label: 'turnos fixos e falhas injetadas',
    note: 'Ensaios separados: 240 turnos de diálogos roteirizados e 240 falhas controladas de entrega; não são conversas livres entre IAs.',
  },
  {
    value: '30 / 160',
    label: 'geração com provedor simulado',
    note: '30 turnos integrados de geração; 160 chamadas a respostas simuladas de provedor no total, incluindo casos isolados. Nenhuma chamada real a um modelo de linguagem foi feita.',
  },
  {
    value: '96 + 40',
    label: 'botões estáticos e templates do CRM',
    note: '24 formulários inventariados: 20 exercitados e quatro logísticos excluídos. O despacho foi testado em máquina virtual de testes (VM), sem navegador real.',
  },
  {
    value: '772 / 768',
    label: 'aceites históricos da versão anterior',
    note: 'Release anterior de 29/08: 772 testes locais e 768 no pacote Linux; seu aceite registrou cinco contas e 14 snapshots. O runtime e a continuidade da versão instalada em 31/08 foram aceitos, com 16 snapshots e restauração posterior aprovada.',
  },
]);

export const roadmap = Object.freeze([
  {
    priority: 'Próximo gate',
    title: 'Autorizar o push do Guardião validado localmente',
    description:
      'O Guardião por três agentes foi validado localmente com 161 testes focais aprovados e uma suíte integral de 1.200 testes, com 1.199 aprovações, zero falhas ou cancelamentos e um skip esperado. Modelos atuais, mensagem corrente, votos da mesma rodada e revalidação da política foram preservados. O focal anterior reprovado continua no histórico. O uso do mesmo modelo ou provedor é permitido, sem garantia de independência estatística. O próximo passo depende de pedido explícito de novo push; pacote e novos testes Linux serão executados na janela autorizada. Até lá, a produção mantém o contrato anterior de duas origens.',
    owner: 'Desenvolvimento local e revisão técnica',
    gate: 'Pedido explícito de novo push, pacote conferido e novos testes Linux na janela autorizada',
  },
  {
    priority: 'Concluído',
    title: 'Push instalado e validado',
    description:
      'O push foi explicitamente autorizado após o confronto dos cards. O candidato dos cards passou os gates local e Linux, mas o reinício do backup pré-publicação revelou falha na conexão principal. O primeiro pacote do reparo falhou em um contrato de telemetria nas duas integrais. Sete eventos foram restaurados, com 214 testes focais aprovados e congelamento formal às 02:26:08 de Brasília após revisão independente. Os novos integrais foram aprovados: 1.157 testes locais, com 1.156 aprovações e um skip esperado, e 1.152 de 1.152 no Linux, sem falhas. A reconstrução confirmou o pacote idêntico, instalado em 31/08 às 02:52:31 de Brasília. Cinco de cinco contas conectadas foram comprovadas às 03:02:41 e 03:03:57 de Brasília, sem scans ou jobs e com zero reinícios automáticos; o runtime foi aceito antes do backup. O monitor TLS manual passou às 02:55:51. O backup posterior concluiu às 03:06:03,807 de Brasília; a consulta às 03:07:22,516 confirmou 16 snapshots e zero locks. A restauração isolada passou às 03:09:47,807, sem falhas. A checagem final às 03:16:04,129 de Brasília aprovou cinco contas conectadas, cinco perfis de navegador, nenhuma varredura ou job ativo, zero reinícios automáticos e controles de API, SQLite, autenticação e arquivos protegidos. Implantação, runtime e continuidade foram aceitos. IA real e aceite funcional acompanhado permanecem em etapas próprias; etiquetas e integração logística real ficam fora do escopo.',
    owner: 'Operação técnica',
    gate: 'Concluído: implantação, runtime e continuidade aceitos em 31/08',
  },
  {
    priority: 'Conteúdo',
    title: 'Reconciliar as 22 indisponibilidades de cards',
    description:
      'São 20 indisponibilidades anteriores, incluindo NAD nasal não reconciliado, e dois técnicos existentes bloqueados por divergência na fonte: Retatrutida 20 mg e Somatropina 240 UI. As apresentações desses dois produtos, os preços e os originais permanecem preservados. Não fabricar ou substituir imagens para declarar cobertura universal; a liberação depende de confirmação da fonte, sem adaptar números ou vias.',
    owner: 'Conteúdo e operação comercial',
    gate: 'Artes corretas aprovadas e inventário de mídia revalidado',
  },
  {
    priority: 'Próxima validação funcional',
    title: 'Comprovar IA real, moderação e fluxos no runtime acompanhado',
    description:
      'Executar recuperação histórica, moderação, conversação e entrega de cards de forma controlada, após os gates correspondentes e autorização. A produção mantém o contrato de duas origens da versão instalada; o diagnóstico anterior não atingiu esse quórum. A decisão local substitui esse requisito por três agentes e dois votos, preservando os modelos atuais. Depois de validar e autorizar a implantação desse candidato, comprovar votos reais, IA real e comparação semântica humana. Mídia sem legenda exige revisão manual.',
    owner: 'Usuário autenticado e operação técnica',
    gate: 'Candidato publicado, configuração íntegra, quórum suficiente e aceite operacional sanitizado',
  },
  {
    priority: 'Imediato',
    title: 'Concluir as decisões humanas de acesso',
    description:
      'Trocar as credenciais iniciais diretamente no painel, sem registrar valores em documentação ou telemetria.',
    owner: 'Equipe autorizada',
    gate: 'Ação humana no painel',
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
    priority: 'Contínuo',
    title: 'Manter a prestação de contas sincronizada',
    description:
      'Publicar uma síntese sanitizada após cada push deste projeto, mantendo o histórico bruto e os detalhes operacionais fora do portal.',
    owner: 'Operação técnica',
    gate: 'Gates locais verdes e publicação confirmada',
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
    state: 'Validado',
    summary:
      'Dois materiais técnicos foram incorporados ao catálogo com IDs estáveis, aliases de rota e coleção física explícita.',
    result:
      'O candidato code-only foi reproduzido às 18:38:58 UTC, mas o acesso administrativo não foi aceito; nenhuma mutação remota ocorreu.',
    validation: '462/462 testes no candidato local, incluindo 442 principais e 20 legados.',
    tags: ['catálogo', 'candidato', 'pendente'],
  },
  {
    date: '2026-08-26',
    title: 'Recuperação idempotente do texto do histórico e varredura resiliente (publicada)',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O fluxo autenticado para recuperar textos privados elegíveis sem repetir efeitos comerciais foi publicado junto da varredura isolada por conversa e de limites explícitos.',
    result:
      'Replays e falhas parciais permanecem seguros; backup e restauração isolada foram repetidos com sucesso, totalizando três snapshots comprovados. A recuperação efetiva continua reservada à ação humana autenticada.',
    validation: '470/470 testes locais; 445 testes principais e 20 legados no pacote Linux; serviço, banco, conexões e restauração aprovados após o push.',
    tags: ['histórico', 'idempotência', 'produção'],
  },
  {
    date: '2026-08-26',
    time: '13:50:18 BRT',
    title: 'Portal documental de prestação de contas publicado (GitHub + Vercel)',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O histórico técnico ganhou uma apresentação pública premium, mobile first e acessível, iniciada pelo estado atual, seguida da direção e concluída pela sequência integral de progresso.',
    result:
      'O repositório e a Vercel passaram a publicar 63 sínteses sanitizadas. Mudanças no log e todo push concluído para a VPS agora exigem republicação documental neste projeto.',
    validation: '18/18 testes do portal, gate de sincronização, build Vite e 470/470 testes da raiz; deploy Ready, HTTP 200 e QA desktop/mobile sem erros ou overflow.',
    tags: ['prestação de contas', 'Vercel', 'documentação'],
  },
  {
    date: '2026-08-26',
    title: 'Confirmação detalhada antes de movimentar pedidos (publicada)',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A mudança de status de pedidos passou a exigir confirmação explícita com cliente, vendedora, itens, valores, recebido líquido, estornado, saldo e impacto da transição.',
    result:
      'Nenhuma alteração é enviada antes da confirmação; duplo envio e fechamento durante a requisição ficam bloqueados, cancelamentos alertam sobre valores sem estorno automático e pedidos sem itens falham fechado.',
    validation: '471/471 testes locais e 466/466 no pacote Linux; deploy diferencial sem reinício, com serviço, autenticação, banco e quatro sessões de navegador preservados.',
    tags: ['pedidos', 'confirmação', 'produção'],
  },
  {
    date: '2026-08-26',
    title: 'Configuração clara de vendedora e indicador (publicada)',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A tela de Contas passou a separar claramente a pessoa que atende da pessoa que recebe comissão por indicação, com ativação explícita, percentual agrupado e explicações junto aos campos.',
    result:
      'O formulário deixou de comprimir rótulos e controles em cartões estreitos; remoções agora são persistidas de verdade, os papéis continuam distintos e novas vendas sem vendedora permanecem bloqueadas.',
    validation:
      '472/472 testes locais e 467/467 no pacote Linux; publicação estática sem reinício, com serviço, autenticação, banco e sessões operacionais preservados.',
    tags: ['contas', 'comissionamento', 'usabilidade', 'produção'],
  },
  {
    date: '2026-08-26',
    title: 'Auditoria integral do CRM e correções QA-00 a QA-52 (local, aguardando push)',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Uma revisão independente percorreu experiência de uso, regras comerciais, APIs, persistência, continuidade e isolamento dos testes do CRM.',
    result:
      'Os 53 itens foram aprovados após correções de clareza, acessibilidade, paginação, integridade e recuperação segura; a versão operacional continua aguardando autorização de push.',
    validation:
      '527/527 testes locais e 526/526 no pacote isolado, com auditoria final sem bloqueios e banco-sentinela de teste inalterado.',
    tags: ['CRM', 'qualidade', 'acessibilidade', 'testes'],
  },
  {
    date: '2026-08-27',
    title: 'Push da auditoria integral do CRM, migração segura e validação operacional',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A auditoria integral do CRM foi publicada com paginação, linguagem simples, cartões móveis, estados claros, erros junto dos campos e contratos mais rígidos de domínio, persistência e recuperação.',
    result:
      'Listas grandes ficaram mais leves, a tarefa prioritária ganhou acesso direto, totais globais permanecem corretos, pedidos pendentes foram separados de pagamentos reais e a evolução compatível ajustou somente métricas derivadas sem perder registros ou sessões.',
    validation:
      '533/533 testes locais e 528/528 no pacote Linux; serviço, API, HTTPS, banco, quatro contas, backups e restauração ensaiada aprovados após o push.',
    tags: ['CRM', 'usabilidade', 'migração', 'produção'],
  },
  {
    date: '2026-08-27',
    title: 'Correção local da recuperação histórica e distinção da varredura automática (aguardando push)',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A recuperação manual foi separada da varredura automática concorrente, os resumos ganharam linguagem própria e a configuração comercial recebeu um botão explícito de salvamento.',
    result:
      'O clique manual deixa de herdar um lote automático em andamento, falhas individuais permanecem isoladas e mudanças legítimas no nome do contato não impedem a recuperação; a versão operacional ainda aguarda autorização de push.',
    validation:
      '537/537 testes locais aprovados, duas revisões independentes sem bloqueadores e candidato mantido fora da produção.',
    tags: ['histórico', 'contas', 'usabilidade', 'candidato'],
  },
  {
    date: '2026-08-27',
    title: 'Push da correção da recuperação histórica e do salvamento comercial',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A correção que separa a recuperação manual da varredura automática concorrente foi implantada junto do botão explícito para salvar vendedora, comissionado e percentual.',
    result:
      'O painel agora identifica cada tipo de varredura, preserva operações com opções diferentes e torna o salvamento comercial inequívoco; a recuperação histórica real continua como ação humana autenticada, ainda não executada.',
    validation:
      '537/537 testes locais e 532/532 no pacote Linux; serviço, API, HTTPS, SQLite, quatro contas, sete snapshots, restore drill e monitor TLS aprovados após o push.',
    tags: ['histórico', 'contas', 'usabilidade', 'produção'],
  },
  {
    date: '2026-08-27',
    title: 'Correção local do atraso do node-cron (aguardando push)',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'O diagnóstico correlacionou três avisos e cerca de 8,7 segundos de atraso ao salvamento comercial; as recuperações históricas começaram depois e não causaram o evento observado.',
    result:
      'Vendedora e comissionado agora são gravados em lote atômico por uma transação SQLite restrita aos participantes, sem reprocessar integralmente o ecossistema. Os cinco jobs foram separados e ganharam single-flight, noOverlap e catch-up coalescido; varreduras cedem CPU e só uma recuperação pesada pode ocorrer por vez.',
    validation:
      '545/545 testes locais aprovados. O candidato ainda aguarda pedido explícito de push e a produção permanece inalterada.',
    tags: ['agendador', 'SQLite', 'histórico', 'candidato'],
  },
  {
    date: '2026-08-27',
    title: 'Push da resiliência do node-cron e retomada serial da recuperação histórica',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'A resiliência do agendador, o salvamento comercial atômico e os limites cooperativos das varreduras foram publicados em uma implantação controlada, mantendo o estado operacional protegido.',
    result:
      'O release ficou ativo com os jobs isolados e uma recuperação pesada por vez. A primeira recuperação foi retomada e ainda estava ativa no repasse; as demais e a conexão de uma conta CRM adicional ficaram sob controle manual do usuário autenticado, com a automação temporária excluída.',
    validation:
      '545/545 testes locais e 540/540 no pacote Linux; nove snapshots, backups, restauração ensaiada, serviço, banco e quatro contas conectadas aprovados após o push.',
    tags: ['agendador', 'histórico', 'continuidade', 'produção'],
  },
  {
    date: '2026-08-27',
    title: 'Push da correção do QR da quarta conta CRM',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'Uma corrida entre inicialização e reconexão foi corrigida, assim como o caso em que a conexão sincronizava antes dos listeners de prontidão; o acompanhamento do QR passou a ser single-flight.',
    result:
      'O QR da quinta conta ficou disponível para leitura manual, sem logout ou exclusão de sessão. As outras quatro contas permaneceram conectadas e não exigem novo reinício.',
    validation:
      '52/52 testes focados, 561/561 locais e 556/556 no pacote Linux; 12 snapshots e gates de serviço, API, banco, backups, restauração e TLS aprovados.',
    tags: ['QR', 'multi-conta', 'continuidade', 'produção'],
  },
  {
    date: '2026-08-29',
    title: 'Abertura da fase Melhor Envio e logística manual (planejamento local)',
    context: 'Documentação',
    kind: 'Planejamento',
    state: 'Planejado',
    summary:
      'Foi consolidado o escopo da nova fase logística: frete padrão de R$ 50, gratuidade acima de R$ 1.500 em produtos após descontos e motoboy manual de R$ 150 no município de São Paulo, com promessa no mesmo dia até 12h em dia útil.',
    result:
      'O contrato de fase separa aprovação, quitação e compra do frete; define pacote inicial de 30 × 20 × 15 cm e 900 g, escolha humana da cotação, etiqueta e documento de transporte, rastreio assíncrono, mensagens idempotentes, cancelamento e ativação gradual.',
    validation:
      'Planejamento e referência revisados localmente; nesta abertura não houve edição de código, execução da suíte, compra de frete, alteração de sessão ou mutação em produção.',
    tags: ['logística', 'Melhor Envio', 'motoboy', 'planejamento'],
  },
  {
    date: '2026-08-29',
    title: 'Atalho de confirmação manual na aba Pedidos (local, aguardando push)',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A aba Pedidos ganhou atalhos explícitos para abrir a confirmação manual de pagamento, mantendo a criação do pedido separada do registro de dinheiro recebido.',
    result:
      'O cabeçalho abre o fluxo financeiro já existente e cada pedido aguardando pagamento com saldo positivo pode pré-selecionar seu valor restante; pedidos quitados, cancelados ou sem saldo não exibem a ação, sem nova rota ou automação financeira.',
    validation:
      '641/641 testes locais aprovados. A correção permanece somente no workspace e aguarda um push isolado; nenhum arquivo, serviço, sessão, pedido ou pagamento de produção foi alterado.',
    tags: ['pedidos', 'pagamento', 'usabilidade', 'candidato'],
  },
  {
    date: '2026-08-29',
    title: 'Nome do cliente nas Aprovações (local, aguardando push)',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A tela de Aprovações passou a identificar o cliente na lista, no detalhe e no modal, corrigindo o caso em que o rótulo não estava disponível fora da primeira página de contatos.',
    result:
      'Uma consulta mínima, autorizada e limitada ao escopo da conta carrega apenas os rótulos necessários por página; a interface usa cache separado, reconcilia resultados concorrentes, escapa o texto e mantém fallback neutro quando não há nome cadastrado.',
    validation:
      'Gate final conjunto aprovado em 659/659 testes locais. Este hotfix e o atalho de pagamento em Pedidos permanecem candidatos locais para push isolado; a VPS operacional permaneceu intocada.',
    tags: ['aprovações', 'cliente', 'privacidade', 'candidato'],
  },
  {
    date: '2026-08-29',
    title: 'Fundação logística Melhor Envio e motoboy concluída localmente',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'A fundação logística foi concluída localmente com frete calculado, motoboy manual, cotação de escolha humana, compra explícita somente após a quitação, etiqueta e documento de transporte privados, rastreio e mensagens idempotentes.',
    result:
      'Recuperação consultiva, descarte comprovado de carrinho e revisão auditável de resultados incertos evitam repetir compras ou comunicações; a ativação real continua condicionada aos contratos de sandbox, à composição operacional e a um push explícito.',
    validation:
      'Suíte integral aprovada em 199/199, 480/480 e 20/20 testes legados, total de 699/699. Clientes externos foram simulados; nenhum provedor, saldo, sessão ou ambiente operacional foi alterado.',
    tags: ['logística', 'Melhor Envio', 'motoboy', 'candidato'],
  },
  {
    date: '2026-08-29',
    title: 'Sandbox logístico instalado na VPS e ativação interrompida de forma segura',
    context: 'Produção',
    kind: 'Implantação',
    state: 'Publicado',
    summary:
      'O release Sandbox-only foi instalado com a integração logística desativada e sem credenciais ou chamadas externas; os hotfixes de Pedidos e Aprovações e os novos cards CBL seguiram no mesmo pacote.',
    result:
      'O serviço permaneceu estável com cinco contas conectadas e estado protegido. OAuth, Jadlog, smoke mutável e API real não foram executados; dois hardenings posteriores continuam apenas locais.',
    validation:
      'Release aprovado em 772 testes locais, sem falhas e com um skip esperado, e 768/768 no Linux; backup, restauração e TLS passaram com 14 snapshots. Os hardenings locais passaram 10/10 focados, mas a suíte integral foi interrompida e não constitui gate verde.',
    tags: ['logística', 'Sandbox', 'deploy', 'continuidade'],
  },
  {
    date: '2026-08-30',
    title: 'Força-tarefa de confiabilidade concluída localmente (aguardando push)',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado',
    summary:
      'Foram endurecidos o Guardião IA, a fila durável de recuperação de mensagens, a confirmação idempotente de entregas e os fluxos humanos do CRM entre cliente, pedido e pagamento manual.',
    result:
      'Uma campanha sintética aprovou 148.000 abordagens de produto, com 37 produtos e 4.000 formulações naturais por produto. Separadamente, o ensaio robô-a-robô aprovou 111/111 turnos e a comparação com respostas humanas permaneceu apenas agregada e sanitizada. Etiquetas e integração logística real ficaram fora. Em 21 combinações de produto e card sem arte exata, o sistema responde indisponibilidade segura e mantém a criação das artes como backlog de conteúdo.',
    validation:
      'Gate integral: 936 testes concluídos, 935 aprovados e um skip esperado, sem falhas. O pacote code-only reproduziu 370 arquivos e 114.395.897 bytes; sua cópia descartável concluiu 931 testes, com 930 aprovados, um skip esperado e zero falhas. Os cinco contratos do empacotador ficaram fora do payload por desenho. A campanha não iniciou WhatsApp, Chrome, aplicação, rede externa nem usou dados pessoais. O candidato permanece local; nenhum push do candidato para a VPS nem mudança no runtime de produção foi realizado. Retificação posterior: as abordagens acima são combinações determinísticas e os turnos são roteiros fixos, sem LLM real nem comprovação de equivalência semântica com respostas humanas. O aceite deste ciclo anterior não valida as alterações atuais.',
    tags: ['confiabilidade', 'IA', 'CRM', 'candidato'],
  },
  {
    date: '2026-08-30',
    publishedAt: '2026-08-30T09:34:04-03:00',
    title: 'Horário de Brasília tornado obrigatório na prestação de contas',
    context: 'Documentação',
    kind: 'Governança',
    state: 'Publicado',
    summary:
      'A prestação de contas passou a exibir, em todas as atualizações, a data e o horário exatos do conteúdo no horário de Brasília, sem depender do fuso configurado no navegador do visitante.',
    result:
      'Hero, nota executiva e rodapé mostram o mesmo instante com o rótulo explícito “horário de Brasília”; o contrato editorial permanente exige renovar esse valor a cada atualização pública.',
    validation:
      'O instante ISO com offset -03:00, o fuso IANA America/Sao_Paulo, o registro mais recente e o manifesto são confrontados pelos gates automatizados. A publicação permaneceu exclusivamente documental, sem alteração nas VPS ou no runtime operacional.',
    tags: ['prestação de contas', 'horário de Brasília', 'governança', 'Vercel'],
  },
  {
    date: '2026-08-30',
    publishedAt: '2026-08-30T19:36:19-03:00',
    title: 'Retomada adversarial da confiabilidade e delimitação das evidências',
    context: 'Local',
    kind: 'Reauditoria',
    state: 'Validado',
    summary:
      'A reauditoria corrigiu falhas de interpretação de negações, troca de contexto, consenso de moderação e retomada de recuperação. A suíte integral e a cópia descartável do pacote foram aprovadas em ambiente local e isolado, sem alterar a produção ou substituir o aceite operacional.',
    result:
      'A matriz aprovou todos os 160.000 casos combinatórios offline: 40 produtos × 4.000 casos e 20 famílias. Há ensaios separados de 240 turnos fixos, 240 falhas injetadas e geração com 30 turnos integrados; as 160 chamadas a provedor simulado incluem também casos isolados. O CRM inventaria 96 botões estáticos, 40 templates dinâmicos e 24 formulários, dos quais 20 foram exercitados em máquina virtual de testes (VM) e quatro logísticos excluídos; isso não é QA em navegador real. Restam 20 combinações de produto e card sem arte exata. O diagnóstico do Guardião identificou carregamento inconsistente de configuração e quórum insuficiente; mídia sem legenda permanece para revisão manual.',
    validation:
      'Suíte integral local aprovada: 1.059 testes concluídos, 1.058 aprovados, zero falhas e um skip ambiental esperado no macOS. O pacote com 375 arquivos e 114.552.419 bytes foi aprovado em cópia descartável, que concluiu 1.054 testes: 1.053 aprovados, zero falhas e um skip esperado; os cinco testes do empacotador ficam fora por desenho. A campanha aprovou novamente 160.000 de 160.000 casos na cópia. Os 2.147 arquivos operacionais monitorados e o código de origem e da cópia permaneceram idênticos antes e depois. A campanha é offline, não usa LLM real nem WhatsApp; o confronto humano disponível é somente agregado, não uma avaliação semântica das respostas. IA real, entrega no WhatsApp e aceite operacional continuam pendentes. Etiquetas e Melhor Envio real permanecem fora. A produção de 29/08 não foi alterada e o push do candidato segue pendente, com os gates do Linux de destino ainda por executar.',
    tags: ['reauditoria', 'limites da evidência', 'IA', 'CRM', 'candidato'],
  },
  {
    date: '2026-08-31',
    publishedAt: '2026-08-31T03:19:54-03:00',
    title: 'Confronto dos cards, Markdown faltante e push autorizado',
    context: 'Produção',
    kind: 'Implementação',
    state: 'Publicado',
    summary:
      'Os cards existentes foram confrontados individualmente com a documentação. Foram acrescentadas 13 seções ao Markdown de protocolos e oito seções faltantes à compilação, além do complemento da seção existente de GHK-Cu, a partir de 18 fontes visuais; as 90 imagens do inventário foram preservadas. O push foi explicitamente autorizado e os novos testes integrais foram aprovados após o reparo de conexão. O pacote foi instalado em 31/08 às 02:52:31 de Brasília. O runtime e a continuidade foram aceitos, com cinco contas conectadas, 16 snapshots e restauração isolada aprovada; a checagem final às 03:16:04,129 de Brasília encontrou nenhuma varredura ou job ativo. A segunda checagem às 03:17:24,238 confirmou a mesma estabilidade, sem novo reinício.',
    result:
      'A seleção textual passou a respeitar produto, apresentação e via exatos, sem reaproveitar protocolos de outra variante. Três cards apresentam divergências e mantêm quatro seções bloqueadas para orientação técnica automática. O envio automático dos técnicos Retatrutida 20 mg e Somatropina 240 UI também foi bloqueado por divergência na fonte, inclusive em planos repetidos ou pedidos mistos; suas apresentações, preços e imagens originais foram preservados. São 22 indisponibilidades: 20 anteriores, incluindo NAD nasal não reconciliado, mais esses dois bloqueios. Ressalvas profissionais e condições de conversão nasal permanecem junto à transcrição. Isso não é validação clínica nem autorização para dose individual; nenhuma imagem foi fabricada.',
    validation:
      'Gates do candidato dos cards em 31/08: local concluído às 01:36:02, horário de Brasília, com 1.126 testes, 1.125 aprovações, zero falhas e um skip esperado; Linux concluído às 01:29:45, com 1.121 de 1.121 aprovados. Ambos aprovaram 160.000 casos offline. O backup pré-publicação concluiu o 15º snapshot e reiniciou o serviço; esse reinício revelou a falha da conta principal. Na leitura de 31/08 às 01:57:33, horário de Brasília, quatro contas gerenciadas estavam prontas, a principal estava em erro e não havia jobs ou scans ativos; é um diagnóstico datado, não aceite de conexão. O primeiro reparo local passou 206 de 206 testes focais, mas seu pacote falhou em um contrato de telemetria nas duas suítes integrais, local e Linux. Os sete eventos operacionais anteriores foram restaurados e testados pelo comportamento real do registrador. O novo focal passou 214 de 214 testes, com 31 regressões da conta principal. Após revisão independente, o congelamento formal ocorreu às 02:26:08, horário de Brasília. Os novos integrais foram aprovados em 31/08: local concluído às 02:37:42, horário de Brasília, com 1.157 testes, 1.156 aprovações, zero falhas e um skip esperado; Linux concluído às 02:33:41, com 1.152 de 1.152 aprovados, sem skips ou cancelamentos. A campanha repetiu 160.000 de 160.000 aprovações, em 444,109 segundos localmente e 63,956 segundos no Linux. A reconstrução às 02:37:58 de Brasília confirmou o mesmo pacote de 378 arquivos e 114.678.851 bytes. Os gates dos cards não validam esse reparo posterior, e os integrais reprovados não foram tratados como aceite. A implantação concluiu em 31/08 às 02:52:31, horário de Brasília: 76 arquivos alterados, 32 acrescentados e nenhum removido; o estado protegido permaneceu igual antes da partida. O serviço iniciou ativo, com zero reinícios automáticos, e o staging é separado. A produção agora usa o release de 31/08. A primeira checagem às 02:53:04 de Brasília aprovou API, SQLite, autenticação, arquivos protegidos e logs, mas as contas ainda estavam inicializando. Nas checagens de 03:02:41 e 03:03:57 de Brasília, cinco de cinco contas estavam conectadas, sem scans ou jobs e com zero reinícios automáticos; API, SQLite, autenticação, arquivos protegidos e logs passaram. A principal reautenticou sem novo QR, erro de conexão ou falha de observador; o runtime foi aceito antes do backup. O monitor TLS manual passou às 02:55:51 de Brasília, com cadeia, identidade do certificado, renovação automática e comparação local verificadas. HTTPS externo respondeu 200, com TLS válido, cabeçalhos seguros e redirecionamento HTTP 308. A infraestrutura secundária permaneceu protegida, sem reinício ou alteração, com bot desativado e serviço de backup autenticado, restrito internamente e somente de acréscimo. O backup posterior foi solicitado às 03:03:57,795 de Brasília e concluiu às 03:06:03,807. A consulta às 03:07:22,516 confirmou 16 snapshots e zero locks. O reinício normal ocorreu às 03:04:44, com zero reinícios automáticos. Na checagem de 03:07:30,158, cinco contas estavam conectadas com cinco perfis de navegador, API, SQLite, arquivos protegidos e logs aprovados, mas havia uma varredura ativa e nenhum job. A restauração isolada iniciou às 03:07:41,059 e passou às 03:09:47,807 de Brasília, sem falhas, com confirmação operacional entregue e execução não ignorada. A checagem final às 03:16:04,129 de Brasília aprovou cinco contas conectadas e cinco perfis de navegador, nenhuma varredura ou job ativo e zero reinícios automáticos. As verificações rápida, de integridade e de relações do SQLite passaram; a API respondeu com os códigos esperados de acesso e autenticação, restrita ao loopback. As mesmas contas e perfis foram preservados, a configuração protegida permaneceu inalterada, a integração logística continuou desativada e os sete contadores de alerta de logs ficaram em zero. Implantação, runtime e continuidade foram aceitos. Os timers recorrentes de TLS, backup e restauração permanecem desabilitados e inativos; a renovação automática de certificados continua habilitada e ativa. Diagnóstico somente leitura do Guardião em 31/08 às 01:17:48, horário de Brasília: três slots completos, uma origem de provedor e três grupos monitorados; o quórum de duas origens independentes não foi atingido. Configuração não equivale a votos reais: nenhum provedor foi chamado e nenhuma moderação foi executada nesse diagnóstico. IA real, entrega comercial no WhatsApp, recuperação histórica acompanhada e comparação semântica humana continuam sem aceite funcional; a conexão aprovada não substitui esses testes. A sincronização final do portal permanece uma publicação documental independente. Etiquetas e integração logística real permanecem fora do escopo.',
    tags: ['cards', 'Markdown', 'rastreabilidade', 'testes', 'push autorizado'],
  },
  {
    date: '2026-08-31',
    publishedAt: REPORT_UPDATED_AT,
    title: 'Consenso do Guardião por agentes, preservando os modelos atuais',
    context: 'Local',
    kind: 'Implementação',
    state: 'Validado localmente',
    summary:
      'O consenso do Guardião por três agentes foi concluído e validado localmente, preservando os modelos atuais e os papéis fixos de evidência, contexto e contestação. São necessários pelo menos dois votos concordantes de agentes distintos, ancorados na mensagem corrente e na mesma rodada. A produção mantém o contrato anterior de duas origens da versão instalada em 31/08; não houve novo push operacional.',
    result:
      'Cada agente avalia separadamente, sem ver os votos dos demais; uma nova tentativa do mesmo agente não cria outro voto. O mesmo modelo ou provedor pode ser utilizado, sem garantia de independência estatística. Evidência literal, categorias permitidas e revalidação da política antes de qualquer efeito continuam obrigatórias. Foram corrigidas a contagem dos votos, a separação entre rodadas, os prazos de espera e a alternativa segura quando uma rota falha, com 42 regressões novas. Mídia sem legenda permanece em revisão manual.',
    validation:
      'A etapa anterior foi interrompida por limite de uso, com teste focal reprovado em 31/08 por volta de 06:12, horário de Brasília. Esse resultado foi preservado e não é um aceite; os gates verdes da versão instalada não validam o novo candidato. O novo focal ampliado de 12 arquivos terminou em 31/08 às 07:08:39 de Brasília, com 161 de 161 testes aprovados, zero falhas, skips ou cancelamentos. Foram acrescentadas 42 regressões: 33 no núcleo e nove no agendamento, com focais de 73 de 73 e 12 de 12 aprovados. A suíte integral começou às 07:09:06 e terminou às 07:31:57 de Brasília com saída zero: 1.200 testes, 1.199 aprovados, zero falhas ou cancelamentos e um skip esperado no macOS. A composição foi de 209 testes de CRM/persistência aprovados, 971 gerais com 970 aprovações e um skip, e 20 legados aprovados. A campanha repetiu 160.000 de 160.000 casos offline em 1.177,965 segundos. O código congelado e o estado protegido permaneceram idênticos antes e depois, em conteúdo e metadados monitorados. Não houve novo push para a VPS, alteração de modelos, configurações, credenciais operacionais ou sessões, nem aceite de IA real ou WhatsApp real. Pacote e novos testes Linux ficam para a janela autorizada de implantação. A publicação desta síntese é documental e não implanta o Guardião.',
    tags: ['Guardião', 'consenso por agentes', 'validação local', 'limites da evidência'],
  },
];

export const progressEntries = Object.freeze(
  records.map((record, index) =>
    Object.freeze({
      id: `registro-${String(index + 1).padStart(2, '0')}`,
      sequence: index + 1,
      time: null,
      publishedAt: null,
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
