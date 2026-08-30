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
     └── métricas, roadmap e 78 registros sanitizados

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
  roadmap, os 78 registros e as opções derivadas de filtro;
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
- verifica contagem de 78 registros, distribuição por data, sequência canônica,
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

Em 30/08/2026, o portal contém 77 registros técnicos da fonte e o registro de sua
publicação, totalizando 78. O release de produção vigente continua sendo o de
29/08, que teve 772 testes aprovados
locais, sem falhas e com um skip esperado, e em 768/768 testes transportáveis no
Linux. Uma conta principal e quatro gerenciadas estão conectadas. Backups,
restauração isolada e TLS passaram, totalizando 14 snapshots reais.

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

O registro de 30/08 descreve um candidato local de confiabilidade separado do
release. Ele reforça Guardião IA, fila durável de recuperação, confirmação
idempotente de entregas e fluxos humanos do CRM entre cliente, pedido e
pagamento manual. Seu gate integral concluiu 936 testes: 935 aprovados, um skip
esperado e zero falhas.
O pacote code-only candidato reproduziu 370 arquivos e 114.395.897 bytes. Sua
cópia descartável concluiu 931 testes: 930 aprovados, um skip esperado e zero
falhas; os cinco contratos do empacotador são excluídos do payload por desenho.

A campanha conversacional desse candidato aprovou 148.000 abordagens de produto
isoladas, distribuídas em 37 produtos e 4.000 formulações por produto. Em eixo
separado, o ensaio robô-a-robô aprovou 111/111 turnos e a comparação humana
permaneceu somente agregada e sanitizada. A campanha não iniciou WhatsApp,
Chrome, aplicação ou rede externa e não usou dados pessoais. Etiquetas
e integração logística real permaneceram fora do escopo. Para as 21 combinações
de produto e card sem arte exata, o conteúdo público documenta indisponibilidade
segura e um backlog explícito de criação de artes, sem prometer cobertura
universal.

O roadmap agora exige pedido explícito de push antes de qualquer implantação do
candidato e, depois disso, aceite operacional acompanhado. O portal não
representa a validação local como mudança já aplicada à VPS.

A página pública continua destinada a `https://sentinelzap.vercel.app/`, e a
landing anterior está preservada na tag `legacy-landing-2026-08-26`. Esta
versão publicada anterior passou por `progress:verify`, pelos 19 testes do portal,
pelo build Vite e pela busca de sanitização, e permanece disponível no alias
canônico com os cabeçalhos de segurança preservados. A atualização documental
de 30/08 estabilizou a fonte, regenerou o manifesto, aprovou `progress:verify`,
19/19 testes, build e sanitização e foi enviada ao `main`. A integração Vercel
ficou `Ready`; o alias canônico respondeu HTTP 200 com os 78 registros, o
conteúdo novo e os cabeçalhos de segurança previstos. Ela não concede controle
sobre o dashboard e não automatiza as ações humanas pendentes. Os detalhes
ficam registrados no log cumulativo.
