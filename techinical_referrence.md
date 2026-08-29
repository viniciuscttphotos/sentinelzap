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
     └── métricas, roadmap e 74 registros sanitizados

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
- exporta metadados do relatório, cinco métricas executivas, seis prioridades do
  roadmap, os 74 registros e as opções derivadas de filtro;
- diferencia `context` (`Local`, `Produção`, `Documentação`), `kind`, `state`,
  resultado e validação;
- preserva como fonte canônica a ordem crescente das datas e a ordem documental
  dentro do mesmo dia;
- usa `time: null` por padrão e inclui horário apenas quando comprovado;
- não contém dados pessoais nem detalhes de infraestrutura exploráveis.

### `src/main.js`

- cria elementos com APIs nativas do DOM e usa `textContent`, evitando interpolação
  de conteúdo editorial em HTML;
- deriva uma cópia imutável e invertida da fonte canônica e renderiza métricas,
  roadmap e linha do tempo agrupada por dia, do registro mais recente ao mais
  antigo;
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
- verifica contagem de 74 registros, distribuição por data, sequência canônica,
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
- horário somente com evidência;
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
digest, contagem e cabeçalho mais recente com `sync/progress-source.json` e com a
última entrada pública. Ele nunca copia ou imprime o histórico. O build remoto,
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

Em 29/08/2026, o portal contém 73 registros técnicos da fonte e o registro de sua
publicação, totalizando 74. O release vigente continua aprovado em 561/561 testes
locais e 556/556 testes transportáveis no pacote Linux, com uma conta principal,
três gerenciadas conectadas, o QR de uma quinta conta disponível para leitura
manual, 12 snapshots reais e restauração ensaiada. A resiliência do agendador,
o salvamento comercial atômico, o limite global de uma recuperação pesada por
vez e o fluxo seguro de QR já foram publicados no ambiente operacional.

A primeira recuperação histórica foi retomada serialmente e ainda estava ativa
no repasse, sem contagem final comprovada. A continuidade dessa recuperação, as
demais recuperações e a leitura manual do QR já disponível ficaram sob controle
do usuário autenticado; a automação temporária de acompanhamento foi excluída.
A fonte permanece crescente, enquanto a interface e a impressão exibem do
registro mais recente ao mais antigo.

O primeiro registro de 29/08 abre somente em planejamento local a fase de
logística com frete padrão, motoboy manual, compra humana posterior à quitação,
etiqueta, documento de transporte, rastreio e notificações. O portal não integra
nem chama o provedor logístico; a linha do tempo distingue essa intenção do
release de produção vigente.

No registro mais recente, o atalho de confirmação manual de pagamento na aba
Pedidos aparece como implementação local validada em 641/641 testes. Ele
reutiliza o fluxo financeiro existente, não cria automação de pagamento e
aguarda um push isolado; portanto não integra o release de produção vigente nem
representa mutação operacional concluída.

A página pública continua destinada a `https://sentinelzap.vercel.app/`, e a
landing anterior está preservada na tag `legacy-landing-2026-08-26`. A última
publicação comprovada permanece a de 27/08; a sincronização de 29/08 está
somente no workspace, onde `progress:verify`, os 19 testes de portal, a busca de
sanitização e o build Vite passaram. Ela aguarda a consolidação da implementação
operacional antes do envio ao `main`, não concede controle sobre o dashboard e
não automatiza as ações humanas pendentes. Os detalhes ficam registrados no
log cumulativo.
