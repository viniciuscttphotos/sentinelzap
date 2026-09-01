# SentinelZap Progresso — Referência técnica

## 1. Objetivo

`sentinelzap-progresso` é a página pública de prestação de contas do SentinelZap.
Seu objetivo é traduzir o histórico técnico em uma narrativa executiva verificável:
estado atual, direção imediata e progresso verificado, com as mudanças mais
recentes apresentadas primeiro.

O portal foi preparado para ser a página principal do projeto web existente
`sentinelzap`. Ele não é o dashboard operacional, não executa o monólito e não
expõe controles de negócio.

## 2. Arquitetura

A aplicação é um site estático Vite sem framework JavaScript e sem CDN obrigatória.

```text
src/data.js ──► src/main.js ──► DOM do index.html
     │               │
     │               ├── busca e filtros locais
     │               ├── agrupamento cronológico
     │               ├── impressão e navegação
     │               └── estado dos filtros na URL
     │
     └── métricas, roadmap e 83 registros sanitizados

src/styles.css ──► identidade editorial mobile first
public/*       ──► logo, favicon, robots e sitemap
vercel.json    ──► build Vite, fallback estático e headers
```

Não há backend, função serverless, banco, autenticação, fetch, WebSocket, SSE ou
integração com a API operacional. O build final contém somente HTML, CSS,
JavaScript e ativos estáticos.

## 3. Módulos e responsabilidades

### `index.html`

- define a hierarquia semântica do documento;
- abre com “Onde estamos agora”, seguido de “Para onde vamos” e “Progresso do
  mais recente ao mais antigo”;
- contém metadados SEO, canonical, OpenGraph, Twitter Card e favicon;
- oferece skip link, landmarks, rótulos, região `aria-live` e fallback `noscript`;
- referencia exclusivamente recursos locais de execução.

### `src/data.js`

- é a única fonte de conteúdo editorial renderizado dinamicamente;
- exporta metadados do relatório, dez métricas executivas, oito prioridades do
  roadmap, os 83 registros e as opções derivadas de filtro;
- diferencia `context` (`Local`, `Produção`, `Documentação`), `kind`, `state`,
  resultado e validação;
- preserva como fonte canônica a ordem crescente das datas e a ordem documental
  dentro do mesmo dia;
- mantém o instante da última atualização em ISO 8601 com o offset UTC vigente,
  o fuso IANA `America/Sao_Paulo` e o rótulo “horário de Brasília”;
- calcula o texto público a partir desse instante usando o fuso declarado, sem
  depender do fuso configurado no navegador;
- associa `publishedAt` do registro documental mais recente ao mesmo instante
  apenas quando ele representa sua publicação comprovada;
- preserva o instante comprovado de registros anteriores como literal, sem
  reescrever a história quando `REPORT_UPDATED_AT` for renovado;
- usa `time: null` por padrão e inclui horário apenas quando comprovado;
- não contém dados pessoais nem detalhes de infraestrutura exploráveis.

### `src/main.js`

- cria elementos com APIs nativas do DOM e usa `textContent`, evitando interpolação
  de conteúdo editorial em HTML;
- deriva uma cópia imutável e invertida da fonte canônica e renderiza métricas,
  roadmap e linha do tempo agrupada por dia, do registro mais recente ao mais
  antigo;
- preenche os elementos `<time data-report-updated-at>` do hero e do rodapé com
  o rótulo persistente e o atributo semântico `datetime`, sem reconverter o
  instante pelo fuso local do visitante;
- normaliza acentos para busca textual;
- filtra por ambiente e tipo e persiste filtros não sensíveis na query string;
- controla impressão, indicador de leitura e retorno ao topo;
- não faz requisições de rede.

### `src/styles.css`

- implementa estilos-base para celular e aprimoramento progressivo apenas com
  breakpoints `min-width`;
- usa paleta navy, marfim e ouro, tipografia editorial local do sistema, textura
  CSS discreta e componentes responsivos;
- inclui estados de foco, contraste forçado, movimento reduzido e folha de impressão;
- não baixa fontes, bibliotecas ou imagens externas.

### `public/`

- `logo-zyntra.png`: cópia da marca oficial já presente no projeto;
- `favicon.svg`: ícone vetorial local;
- `robots.txt` e `sitemap.xml`: descoberta da URL canônica.

### `vercel.json`

- declara Vite como framework;
- aplica fallback para `index.html`;
- envia CSP com origem própria, bloqueio de objetos, frames e formulários externos;
- envia HSTS, `nosniff`, `DENY`, política de referência, permissões mínimas e
  isolamento de contexto;
- aplica cache imutável aos ativos com hash gerados pelo Vite.

### `test/`

- usa somente `node:test` e `node:assert`;
- verifica contagem de 83 registros, distribuição por data, sequência canônica,
  inversão exclusiva da apresentação, horários, métricas, gates e sanitização;
- verifica ordem da narrativa, SEO, acessibilidade estrutural, mobile first,
  cabeçalhos Vercel, scripts npm e ausência de conexão com API.

## 4. Fluxo de dados

1. O navegador carrega `index.html` e o bundle gerado pelo Vite.
2. `main.js` importa os objetos imutáveis de `data.js`.
3. `main.js` cria uma cópia invertida de `progressEntries`, sem mutar a fonte.
4. O conteúdo é materializado com DOM nativo; busca e filtros operam sobre a
   cópia de apresentação integralmente em memória.
5. A impressão usa o mesmo documento e uma folha específica, sem exportação remota.

Nenhum dado é enviado ou recebido depois do carregamento estático.

## 5. Governança do conteúdo

O histórico bruto não deve ser copiado para o portal. Cada atualização exige:

- síntese factual sem extrapolação;
- remoção de IPs, telefones, nomes de usuários, identificadores internos, hashes,
  caminhos, credenciais e pormenores exploráveis;
- distinção explícita entre trabalho local, produção, decisão e validação;
- atualização obrigatória do instante público com data e horário reais de
  Brasília, no formato ISO explícito `AAAA-MM-DDTHH:mm:ss±HH:mm` e com o offset
  UTC vigente para `America/Sao_Paulo`;
- horário de cada registro somente com evidência, mantendo separado o instante
  da atualização documental do instante do evento narrado;
- manutenção da ordem documental crescente na fonte quando registros do mesmo
  dia não possuem horário; a apresentação visual inverte essa sequência sem
  inventar horários;
- atualização do log e revisão desta referência.

## 6. Build, testes e deploy

Comandos oficiais:

```bash
npm ci
npm run progress:verify
npm test
npm run build
```

O destino autorizado é o projeto Vercel existente `sentinelzap`, com URL canônica
`https://sentinelzap.vercel.app/`. A Vercel CLI 59.5.0 foi instalada globalmente
via npm e os scripts npm chamam essa instalação persistente, sem baixar `latest` em
cada execução nem incluir sua cadeia transitiva no build do portal. A sessão
persistente fica fora do repositório. `.vercel/`, variáveis e tokens são ignorados
pelo Git.

`npm run check` executa primeiro `progress:verify` e depois testes/build. O gate
de sincronização lê o `PROGRESS.md` raiz, calcula SHA-256 em memória e compara
digest, contagem, cabeçalho mais recente e o instante `updatedAtIso` com
`sync/progress-source.json` e com a última entrada pública. O instante público
deve ser exatamente igual a `synchronizedAt` no manifesto. O gate nunca copia
ou imprime o histórico. O build remoto,
onde a fonte operacional não existe, usa `npm run deploy:check` para executar
testes e build antes da publicação.

O deploy do portal substitui somente a landing web histórica. Não reinicia, migra
ou modifica o dashboard/API operacional. A integração GitHub do projeto Vercel
publica `main`; a CLI persistente oferece o caminho manual verificável.

## 7. Segurança e limitações

- O portal é público e, portanto, só pode conter dados aprovados para publicação.
- CSP e headers reduzem riscos no navegador, mas não substituem revisão editorial.
- Como não há backend, o site não possui sessão ou área privada.
- Filtros na URL contêm apenas termos digitados pelo visitante; nenhum termo é
  enviado pelo aplicativo.
- A URL canônica pressupõe a publicação no projeto Vercel autorizado.

## 8. Sincronização obrigatória

O `PROGRESS.md` da raiz é a autoridade histórica. Qualquer alteração nele exige,
na mesma tarefa, síntese sanitizada em `src/data.js`, atualização do manifesto,
`npm run check`, push de `main` e comprovação do deploy Vercel `Ready`/HTTP 200.
Todo push concluído para a VPS do SentinelZap também exige essa republicação. A
regra é exclusiva deste projeto; falha de sincronização impede o encerramento da
tarefa e a autorização documental não concede, por si só, acesso mutável à VPS.

## 9. Estado vigente

Em 01/09/2026, a preparação local contém 82 registros técnicos da fonte e um
registro documental de publicação, totalizando 83. O mais recente é “Correção
local do ciclo de QR/logout e diagnóstico da lentidão (aguardando push)”, em
estado `Validado localmente` e contexto `Local`. Os 82 registros anteriores
foram mantidos. Os registros 79, 80, 81 e 82 conservam os instantes comprovados
`2026-08-30T09:34:04-03:00`, `2026-08-30T19:36:19-03:00` e
`2026-08-31T03:19:54-03:00` e `2026-08-31T07:38:02-03:00`, respectivamente;
somente o registro 83 acompanha a constante renovada no fechamento.

O registro 83 sintetiza três resultados sem transportar o histórico bruto. O
corretivo do ciclo de conexão aprovou 182/182 testes focais. A suíte integral
local concluiu 1.240 testes, com 1.239 aprovações, zero falhas ou cancelamentos
e um skip ambiental esperado; a campanha offline aprovou 160.000/160.000 casos.
O corretivo permanece apenas local e não altera a versão instalada de 31/08.
O diagnóstico de desempenho atribui a lentidão à amplificação algorítmica de
escrita por reprocessamento de coleções crescentes e orienta normalização,
operações incrementais, índices, paginação, benchmark e corte controlado.

A direção de aprendizado supervisionado exige governança, finalidade e opt-out,
conjunto versionado e isolado por conta, redação forte, observação sem envio com
memória e retenção próprias, avaliação humana, copiloto de rascunhos e canário
de baixo risco antes de qualquer ajuste offline opcional. Os 594 pares de estilo
não são tratados como equivalência semântica. Decisões financeiras e clínicas
continuam humanas.

O novo contrato local preserva os modelos atuais e usa três agentes com papéis
fixos de evidência, contexto e contestação. Exige pelo menos dois votos
concordantes de agentes distintos, ancorados na mensagem corrente e na mesma
rodada. Cada agente avalia separadamente, sem acesso aos votos dos demais;
tentativas repetidas do mesmo agente não contam como novos votos. O uso do
mesmo modelo ou provedor é permitido e não garante independência estatística.
Evidência literal, categorias permitidas e revalidação da política antes de
qualquer efeito continuam obrigatórias; mídia sem legenda segue para revisão manual.

A fase anterior foi interrompida por limite de uso, com focal reprovado por
volta de 06:12 de Brasília. O rascunho preserva essa reprovação e não toma
os gates da versão instalada como aceite do novo candidato. A contagem, o
vínculo dos votos à rodada, os prazos de espera e o fallback foram corrigidos.
O focal ampliado de 12 arquivos passou 161/161 em 31/08 às 07:08:39 de
Brasília, sem falhas, skips ou cancelamentos. Foram acrescentadas 42
regressões: 33 no núcleo e nove no agendamento, cujos focais passaram 73/73 e
12/12. A suíte integral iniciou às 07:09:06 e terminou às 07:31:57 de
Brasília, com saída zero: **1.200 testes, 1.199 aprovações, zero falhas ou
cancelamentos e um skip esperado no macOS**. Foram 209/209 testes de
CRM/persistência, 971 gerais com 970 aprovações e um skip, e 20/20 legados.
A campanha aprovou 160.000/160.000 casos offline em 1.177,965 segundos.
O código congelado e o estado protegido permaneceram idênticos antes e depois,
em conteúdo e metadados monitorados. O candidato possui aceite local;
produção conserva o contrato anterior de duas
origens da versão instalada em 31/08. Não houve novo push para a VPS nem
alteração de modelos, configurações, credenciais operacionais ou sessões;
o novo candidato requer um pedido explícito de push após os gates. Pacote
e novos testes Linux ficam para essa janela autorizada, sem novo aceite
Linux, IA real ou WhatsApp real nesta preparação.

A publicação de 82 registros foi confirmada em 31/08 com o conteúdo de
`2026-08-31T07:38:02-03:00` nos três horários visíveis, `Ready` e HTTP 200. A
edição de 83 registros usa o instante comum `2026-09-01T13:02:26-03:00` nos
dados, três horários visíveis e manifesto. Os gates e a comprovação pública de
cada edição possuem registro próprio no log interno; o aceite anterior não é
reaproveitado.

O registro anterior de produção documenta 13 seções acrescentadas ao Markdown de protocolos e
oito seções faltantes à compilação, além do complemento da seção existente de
GHK-Cu, a partir de 18 fontes
visuais lidas individualmente. As 90 imagens do inventário foram preservadas.
Três cards apresentam divergências e mantêm quatro seções técnicas bloqueadas,
sem fallback para outra apresentação ou via. Ressalvas clínicas/profissionais
e condições de conversão nasal acompanham a reprodução documental. Isso não
constitui validação clínica nem prescrição individual. O envio automático dos
técnicos Retatrutida 20 mg e Somatropina 240 UI foi bloqueado também por IDs
diretos, planos repetidos e pedidos mistos; apresentações, preços e originais
foram preservados. As 22 indisponibilidades resultantes são as 20 anteriores,
incluindo NAD nasal não reconciliado, mais esses dois bloqueios técnicos — não
20 arquivos ausentes. Nenhuma imagem foi criada ou substituída.

O push foi explicitamente autorizado. O candidato dos cards concluiu os gates
em 31/08: local às 01:36:02, horário de Brasília, com 1.126 testes, 1.125
aprovações, zero falhas e um skip esperado; Linux às 01:29:45, com 1.121/1.121
aprovados. Ambos repetiram as 160.000 aprovações offline. Esses aceites não
validam o reparo posterior da conta principal. O primeiro reparo passou 206/206
testes focais, incluindo 30 regressões novas, e revisão independente, com
congelamento às 02:10:38 de Brasília. Seu pacote, porém, falhou em um contrato
de telemetria nas duas suítes integrais, local e Linux. A primeira aprovação
focal não substituiu nem sobrepôs esses resultados reprovados.

Os sete eventos operacionais anteriores foram restaurados com seus níveis e
campos seguros. O registrador foi exercitado comportamentalmente, incluindo
estados de transporte, parada, desconexão, erros e ausência de dados sensíveis.
O novo focal passou 214/214 testes, com 31 regressões da conta principal. Após
revisão independente, o congelamento formal ocorreu às 02:26:08, horário de
Brasília. Os novos integrais foram aprovados em 31/08: local às 02:37:42 de
Brasília, com 1.157 testes, 1.156 aprovações, zero falhas e um skip esperado
(209 de CRM/persistência, 928 gerais com 927 aprovações, e 20 legados); Linux
às 02:33:41, com 1.152/1.152 aprovados (209 + 923 + 20), sem skips ou
cancelamentos. Ambos repetiram 160.000/160.000 casos offline, em 444,109 segundos
localmente e 63,956 segundos no Linux. A reconstrução às 02:37:58 de Brasília
confirmou o pacote idêntico de 378 arquivos e 114.678.851 bytes. Pacote e staging
continuam separados. A implantação concluiu em 31/08 às 02:52:31 de Brasília,
com 76 arquivos alterados, 32 acrescentados e nenhum removido. O estado
protegido permaneceu igual antes da partida; o serviço iniciou ativo, com zero
reinícios automáticos. O runtime foi aceito antes do backup posterior; a
continuidade e a checagem final posterior também foram aprovadas.

O backup pré-publicação concluiu o 15º snapshot e reiniciou o serviço. Esse
reinício revelou uma falha de conexão da conta principal. Na leitura de 31/08
às 01:57:33, horário de Brasília, quatro contas gerenciadas estavam prontas,
a principal estava em erro e não havia jobs ou scans ativos. É uma observação
datada, não aceite de conexão. A produção passou ao release de 31/08 após a
implantação. A primeira checagem às 02:53:04 de Brasília aprovou API, SQLite,
autenticação, arquivos protegidos e logs, mas as contas ainda estavam
inicializando. Nas checagens de 03:02:41 e 03:03:57 de Brasília, cinco de cinco
contas estavam conectadas, sem scans ou jobs e com zero reinícios automáticos;
API, SQLite, autenticação, arquivos protegidos e logs passaram. A principal
reautenticou sem novo QR, erro de conexão ou falha de observador. Esse aceite
do runtime antecede o backup posterior, já confirmado.

O monitor TLS manual passou às 02:55:51 de Brasília: cadeia, identidade do
certificado, renovação automática e comparação local foram verificadas. HTTPS
externo respondeu 200, com TLS válido, cabeçalhos seguros e redirecionamento
HTTP 308. A infraestrutura secundária permaneceu protegida, sem reinício ou
alteração, com o bot desativado e backup autenticado, restrito internamente
e somente de acréscimo. O backup posterior foi solicitado às 03:03:57,795 de
Brasília e concluiu às 03:06:03,807. A consulta às 03:07:22,516 confirmou 16
snapshots e zero locks. O reinício normal ocorreu às 03:04:44, com zero
reinícios automáticos. Às 03:07:30,158, cinco contas estavam conectadas com
cinco perfis de navegador, API, SQLite, arquivos protegidos e logs aprovados,
mas havia uma varredura ativa e nenhum job. A restauração isolada iniciou às
03:07:41,059 e passou às 03:09:47,807 de Brasília, sem falhas, com confirmação
operacional entregue e execução não ignorada. A checagem final às 03:16:04,129
de Brasília aprovou cinco contas conectadas e cinco perfis de navegador,
nenhuma varredura ou job ativo e zero reinícios automáticos. SQLite passou
verificação rápida, integridade e relações; API/auth retornaram os códigos
esperados (200/303/401/401), mantendo loopback, contas e perfis idênticos,
configuração protegida inalterada, integração logística desativada e os sete
contadores de alerta de logs em zero. Implantação, runtime e continuidade
foram aceitos. A segunda checagem às 03:17:24,238 confirmou a mesma estabilidade,
sem novo reinício; a conferência do pacote já instalado não exigiu reaplicação.
Os timers recorrentes de TLS, backup e restauração
permanecem desabilitados e inativos; Certbot permanece habilitado e ativo.
Os 15 snapshots permanecem como a contagem anterior ao backup.
O reparo instalado impede tentativas sobrepostas, preserva sessões, usa a prontidão
legítima da biblioteca, limita a limpeza ao próprio navegador e descarta efeitos
tardios de gerações encerradas. Entrega parcial permanece bloqueada contra
repetição automática. A conexão real foi aceita em duas checagens; isso não
equivale a validar IA real, moderação, recuperação ou entrega comercial.

Os aceites históricos descritos abaixo documentam o baseline de 30/08, anterior
às alterações atuais.

O release anterior, de 29/08, não é mais o vigente. Seu aceite histórico
registrou 772 testes locais aprovados, sem falhas e com um skip esperado, e
768/768 testes transportáveis no Linux, uma conta principal e quatro gerenciadas
conectadas. Backups, restauração isolada e TLS passaram, totalizando 14 snapshots
reais. Isso não é uma nova verificação do runtime durante a reauditoria local.

A recuperação histórica continua sob controle humano e sem contagem final
declarada. A fonte permanece crescente, enquanto a interface e a impressão
exibem do registro mais recente ao mais antigo.

Os quatro primeiros registros de 29/08 preservam as etapas documentais e locais:
planejamento da logística, atalhos de pagamento em Pedidos, identificação do
cliente em Aprovações e conclusão da fundação logística. O quinto registra o
deploy que publicou a fundação, os dois hotfixes e os novos cards CBL.

A integração instalada aceita exclusivamente o Sandbox, mas permanece
desativada e sem credenciais ou chamadas externas. OAuth, configuração Jadlog,
smoke mutável e API real não foram executados. O portal documental continua sem
qualquer conexão com o provedor ou com o dashboard operacional.

O ciclo anterior do candidato permanece no histórico com seus 936 testes
concluídos, o pacote reproduzido e os ensaios então realizados. Uma nota de
retificação no próprio registro esclarece que seus casos eram combinações
determinísticas e roteiros fixos, sem LLM real nem comprovação de equivalência
semântica humana, e que seu aceite não valida o código atual. O registro 80
não reutiliza esses aceites para as alterações posteriores: a retomada
adversarial encontrou novas falhas de negação, troca de contexto, moderação e
recuperação. A repetição da suíte integral terminou às 19:24:06, no horário de
Brasília, com 1.059 testes concluídos: 1.058 aprovados, zero falhas e um skip
ambiental esperado no macOS. Foram 208 testes de CRM/persistência, 831 gerais
(830 aprovados e um skip) e 20 legados. Os 2.147 arquivos operacionais
monitorados permaneceram idênticos antes e depois da execução.

A cópia descartável do pacote, com 375 arquivos e 114.552.419 bytes, terminou
aprovada às 19:32:59 no horário de Brasília: 1.054 testes, 1.053 aprovações,
zero falhas e um skip esperado. Foram 208 testes de CRM/persistência, 826 gerais
(825 aprovados e um skip) e 20 legados; os cinco testes do empacotador ficam fora
do pacote por desenho. Os 2.147 arquivos operacionais monitorados e o código de
origem e da cópia permaneceram idênticos antes e depois. O registro 80 passa a
`Validado`, com contexto `Local` e sem aceite operacional implícito.
A reconstrução final após os testes permaneceu idêntica em conteúdo e
composição, com 375 arquivos e 114.552.419 bytes, sem estado operacional ou
dependências instaladas no pacote.

Uma nova métrica apresenta os três agentes e dois votos do candidato local,
separando decisão, falha histórica e aceite local. Outra métrica registra os
1.200 testes integrais, os 161 testes focais aprovados e as 42 regressões novas.
A métrica da campanha informa os 160.000 casos aprovados no novo candidato
local em 1.177,965 segundos, distinguindo os resultados históricos da versão
instalada. As seis métricas
executivas de contexto distinguem os gates integrais da versão instalada de
1.157 testes locais e 1.152 no Linux, mantendo os gates anteriores dos cards de
1.126 testes locais e 1.121 no Linux e a reprovação intermediária no histórico, a matriz
combinatória offline, os turnos fixos e falhas injetadas, a geração com provedor
simulado, o inventário do CRM e o aceite histórico da produção. Duas métricas
novas apresentam as seções documentais, fontes visuais, imagens preservadas e
limites da transcrição. A campanha anterior
ampliada aprovou 160.000 de 160.000 casos, com 40 produtos × 4.000 casos em 20
famílias; a execução levou 486.397 ms. A cópia descartável repetiu as 160.000
aprovações em 393.714,849 ms.
Separadamente, há 240 turnos de diálogos fixos e 240 falhas injetadas de
transporte. A geração exercita 30 turnos integrados, com 160 chamadas a provedor
simulado no total, incluindo os casos isolados. Esses números não representam
LLM real, conversação livre entre IAs, entrega no WhatsApp ou avaliação semântica
das respostas humanas. A evidência humana disponível permanece somente agregada
e sanitizada.

O CRM possui um inventário de 96 botões estáticos, 40 templates dinâmicos e 24
formulários. Vinte formulários foram exercitados; os quatro logísticos ficaram
explicitamente fora. O ensaio executa o despacho dos controles em máquina
virtual de testes (VM), sem navegador real, portanto não atesta layout,
interação visual ou comportamento nativo completo do navegador. Etiquetas e
integração logística real não foram acionadas.

O diagnóstico histórico somente leitura do Guardião em 31/08 às 01:17:48, horário de
Brasília, encontrou três slots completos, uma origem de provedor e três grupos
monitorados. O quórum de duas origens independentes não foi atingido na versão
que continua instalada. A nova decisão por agentes substitui esse requisito
somente no candidato local; não requer adicionar uma segunda origem.
Configuração não equivale a votos reais: nenhum provedor foi chamado e nenhuma
moderação foi executada nesse diagnóstico. Identificadores e detalhes de
configuração permanecem fora do conteúdo público. Mídia sem legenda exige
revisão manual. As 22 indisponibilidades (20 anteriores e dois bloqueios
técnicos novos) permanecem em backlog com indisponibilidade segura, sem
substituição por arte incorreta. IA real,
WhatsApp, comparação semântica humana e aceite operacional continuam pendentes.
O roadmap apresenta o corretivo de conexão e o consenso por três agentes como
validados localmente e prioriza obter o pedido explícito de push, seguido do
pacote conferido e dos novos testes Linux na janela autorizada, sem antecipar
implantação. A fase funcional seguinte é aprendizado supervisionado sob
governança, isolamento por conta e avaliação humana, sem automatizar decisões
financeiras ou clínicas.
O item histórico concluído registra o pedido explícito de push recebido, os integrais local
e Linux aprovados, a reconstrução idêntica do pacote e a implantação concluída
às 02:52:31 de Brasília. A produção usa o release de 31/08, com conexões
reconfirmadas, TLS aprovado, backup posterior, restauração isolada e checagem
final sem atividade confirmados. Esse item está concluído; o reinício do backup e o incidente
permanecem no histórico.

A página pública continua destinada a `https://sentinelzap.vercel.app/`, e a
landing anterior está preservada na tag `legacy-landing-2026-08-26`. Uma
versão publicada anterior passou por `progress:verify`, pelos 19 testes do portal,
pelo build Vite e pela busca de sanitização, e permanece disponível no alias
canônico com os cabeçalhos de segurança preservados. A atualização documental
de 30/08 estabilizou a fonte, regenerou o manifesto, aprovou `progress:verify`,
21/21 testes, build e sanitização e foi enviada ao `main`. A integração Vercel
ficou `Ready`; o alias canônico respondeu HTTP 200 com os 79 registros, o
conteúdo novo, o horário explícito de Brasília e os cabeçalhos de segurança
previstos. Esses são aceites históricos da publicação com 79 registros.
A atualização intermediária de 80 registros também passou por
`progress:verify`, 22/22 testes, build e revisão de sanitização, com o conteúdo
marcado `Em validação`. A edição final, com suíte e pacote aprovados localmente,
renovou o manifesto e repetiu `progress:verify`, 22/22 testes, build e revisão
de sanitização. O envio ao `main` foi concluído; a implantação integrada ficou
`Ready`. Às 19:38:09 de Brasília, a URL canônica e o bundle responderam HTTP
200, os três horários exibiram exatamente `2026-08-30T19:36:19-03:00`, as
métricas finais e limitações estavam presentes e os cabeçalhos de segurança
permaneciam ativos. Este complemento registra o aceite, sem alterar o conteúdo
público ou seu instante canônico. O portal não
concede controle sobre o dashboard e não automatiza as ações humanas pendentes. Os detalhes
ficam no log cumulativo.
