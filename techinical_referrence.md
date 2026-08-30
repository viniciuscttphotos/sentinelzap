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
     └── métricas, roadmap e 80 registros sanitizados

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
- exporta metadados do relatório, seis métricas executivas, sete prioridades do
  roadmap, os 80 registros e as opções derivadas de filtro;
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
- verifica contagem de 80 registros, distribuição por data, sequência canônica,
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

Em 30/08/2026, a preparação local do portal contém 79 registros técnicos da
fonte e um registro documental de publicação, totalizando 80. O mais recente é
“Retomada adversarial da confiabilidade e delimitação das evidências”. O
registro 79 conserva seu instante comprovado de publicação,
`2026-08-30T09:34:04-03:00`; somente o novo registro acompanha a constante da
última atualização. O instante do conteúdo final é
`2026-08-30T19:36:19-03:00`, no fuso `America/Sao_Paulo`, e coincide com o
manifesto e os três fallbacks HTML. A sincronização só é considerada publicada
após os gates locais, o deploy `Ready` e a conferência do mesmo horário na URL
canônica.

O release de produção vigente continua sendo o de 29/08. Seu aceite histórico
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

As seis métricas executivas agora distinguem os gates local e do pacote, a matriz
combinatória offline, os turnos fixos e falhas injetadas, a geração com provedor
simulado, o inventário do CRM e o aceite histórico da produção. A campanha
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

O diagnóstico público do Guardião informa somente carregamento inconsistente
de configuração e quórum insuficiente. Mídia sem legenda exige revisão manual.
As 20 combinações de produto e card sem arte exata permanecem em backlog com
indisponibilidade segura, sem substituição por arte incorreta. IA real,
WhatsApp, comparação semântica humana e aceite operacional continuam pendentes.
O roadmap exige pedido explícito de push e gates seguros no Linux de destino
antes de qualquer implantação. A produção de 29/08 permanece intacta.

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
marcado `Em validação`. Tais gates não substituem os desta nova edição com a
suíte e o pacote aprovados localmente: o manifesto permanece intocado e testes,
build, commit e publicação não foram executados neste passo. O portal não
concede controle sobre o dashboard e não automatiza as ações humanas pendentes. Os detalhes
ficam no log cumulativo.
