# SentinelZap Progresso — Log de alterações

Este arquivo registra somente a evolução do portal público de prestação de contas.
Ele não substitui nem replica o histórico operacional completo do monólito.

## 2026-08-26 — Portal documental premium (implementação local)

- Arquivos e trechos: `index.html`, estrutura integral e metadados; `src/data.js`,
  métricas, roadmap e 62 registros; `src/main.js`, renderização e interação;
  `src/styles.css`, sistema visual e impressão; `public/`, marca e descoberta;
  `vercel.json`, hospedagem e cabeçalhos; `test/`, regressões; `package.json`,
  scripts; `README.md` e `techinical_referrence.md`, documentação.
- O que foi feito: criada uma página estática mobile first, em português, com
  abertura executiva sobre o estado atual, direção imediata e linha do tempo
  pesquisável em sequência cronológica. Foram incluídos filtros por ambiente e
  tipo, detalhes expansíveis, impressão documental, navegação por âncoras,
  indicador de leitura, acessibilidade estrutural, SEO e OpenGraph.
- Conteúdo: os 61 registros então existentes na fonte foram consolidados em sínteses públicas e
  somados ao registro deste portal, totalizando 62 naquela preparação. Release publicado e candidato
  local permanecem diferenciados. Horários só foram incluídos quando havia
  evidência documental.
- Privacidade e segurança: removidos IPs, telefones, usuários, identificadores,
  hashes, caminhos de servidor, credenciais e detalhes exploráveis. O portal não
  possui API, autenticação própria, dados operacionais nem integração com o
  runtime SentinelZap. A Vercel recebeu CSP restritiva e demais cabeçalhos de
  endurecimento.
- Motivo: transformar o histórico técnico em uma prestação de contas profissional,
  verificável e adequada ao contratante, sem publicar o documento bruto ou estado
  sensível.
- Finalidade: substituir a landing histórica do projeto web por uma página principal
  documental, preservando o dashboard operacional em sua infraestrutura própria.
- Validação: `npm test` aprovou 14/14 testes. `npm run build` foi concluído com
  Vite 8.2.2 em 831 ms, gerando HTML de 11,10 kB, CSS de 21,98 kB e JavaScript de
  41,85 kB antes de gzip; o diretório final ocupa 156 kB. A instalação final do
  projeto contém apenas Vite e retornou zero vulnerabilidades conhecidas.
- Implantação: pendente. Nenhum Git, GitHub ou deploy Vercel foi executado nesta etapa.

## 2026-08-26 — Publicação, sincronização vigente e regra contínua

- Arquivos e trechos: `src/data.js` e `index.html`, estado atual, roadmap e linha
  do tempo; `scripts/verify-progress-sync.mjs` e `sync/progress-source.json`, gate
  de sincronização; `package.json` e `vercel.json`, gates locais/remotos e CLI;
  `README.md`, `progress.md` e `techinical_referrence.md`, documentação vigente.
- O que foi feito: incorporado o novo registro técnico de 26/08, elevando a
  origem a 62 registros técnicos e a prestação de contas a 63 entradas com a
  própria publicação. O candidato local vigente passou a 470/470 testes e o
  roadmap foi reconciliado com preflight, pacote, backup, aceite e recuperação
  acompanhada.
- Regra contínua: toda alteração no `PROGRESS.md` raiz deve atualizar a síntese
  pública na mesma tarefa, assim como todo push concluído para a VPS do
  SentinelZap. A obrigação é exclusiva deste projeto. Um manifesto registra
  apenas SHA-256, contagem, data e título mais recente; `npm run
  progress:verify` falha se a fonte e o portal divergirem. O histórico bruto
  continua fora do repositório público.
- Comprovação do gate: durante a consolidação, a fonte recebeu novos resultados
  de preflight Linux e resiliência do backup. O digest divergente bloqueou o
  check; a síntese técnica foi atualizada e sanitizada antes de recalcular o
  manifesto, sem copiar detalhes operacionais para o site.
- GitHub: o commit inicial do portal foi enviado para `main` do repositório
  `viniciuscttphotos/sentinelzap`. A landing anterior permanece recuperável na
  tag `legacy-landing-2026-08-26` e no histórico Git.
- Vercel: o subprojeto foi vinculado ao projeto existente `sentinelzap`, a
  integração GitHub já existente foi confirmada e o deploy de produção ficou
  `Ready` em `https://sentinelzap.vercel.app/`. A CLI 59.5.0, instalada via npm,
  permanece autenticada fora do repositório.
- Privacidade: a varredura não encontrou IPs, telefones, caminhos, identificadores,
  hashes longos ou credenciais no conteúdo público. Tokens, `.env.local` e
  `.vercel/` permanecem ignorados.
- Validação inicial: 17/17 testes e build Vite aprovados antes da primeira publicação;
  auditoria npm com zero vulnerabilidades conhecidas; página, ativos, robots e
  sitemap em HTTP 200 com CSP, HSTS e demais cabeçalhos. A QA real confirmou
  busca `SQLite` (5 resultados), reset para 62 registros na versão então
  publicada, detalhes expansíveis, zero erros de console e ausência de overflow
  em desktop e mobile.
- Validação final: `npm run progress:verify` comprovou os 63 registros e o digest
  da fonte; 18/18 testes do portal, build Vite 8.2.2 e 470/470 testes da raiz
  passaram sem iniciar o aplicativo, Chrome/Puppeteer ou WhatsApp. A produção
  reconciliada foi novamente verificada em HTTP e navegador real.
- Motivo e finalidade: manter a prestação de contas pública alinhada ao log
  canônico em toda atualização futura, sem acoplar ou expor o dashboard
  operacional.
- Estado: publicação e reconciliação concluídas no GitHub/Vercel; nenhuma mutação
  foi realizada na VPS operacional.

## 2026-08-26 — Republicação após os pushes de histórico e pedidos

- Arquivos e trechos: `src/data.js`, estado executivo, roadmap e dois registros
  de produção; `index.html`, narrativa e contadores; `test/`, contratos de
  sincronização e sanitização; `sync/progress-source.json`, manifesto da fonte;
  `README.md`, `progress.md` e `techinical_referrence.md`, documentação vigente.
- O que foi feito: a recuperação resiliente de histórico foi reconciliada como
  publicada, com sua ativação humana ainda pendente, e a confirmação detalhada
  antes de mover pedidos foi adicionada como o 64º registro. O estado executivo
  passou a refletir a versão publicada com 471 testes locais, 466 testes no
  pacote Linux e três snapshots reais comprovados.
- Privacidade: as sínteses informam somente comportamento, gates e contagens
  agregadas. Permanecem ausentes endereços de infraestrutura, telefones,
  usuários, identificadores internos, hashes, caminhos, credenciais, conteúdo
  de conversas e outros detalhes exploráveis.
- Validação: `npm run progress:verify` e `npm run check` comprovam os 64
  registros, 18/18 testes do portal, sanitização, build Vite e correspondência
  com a fonte canônica. A suíte operacional da raiz permaneceu em 471/471.
- Motivo e finalidade: cumprir a regra exclusiva do SentinelZap que vincula todo
  push na VPS à atualização da prestação de contas pública, sem acoplar o portal
  ao dashboard operacional.
- Estado neste ponto do log: conteúdo e gates locais concluídos; envio para
  `main` e confirmação da produção Vercel ainda pendentes no mesmo fluxo.
