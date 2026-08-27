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
- Estado final: alteração enviada para `main` e produção Vercel confirmada como
  `Ready`, com página, ativos, robots e sitemap em HTTP 200, novo conteúdo
  presente e cabeçalhos de segurança preservados.

## 2026-08-26 — Sincronização da configuração comercial publicada

- Arquivos e trechos: `src/data.js`, métricas e novo registro; `index.html`,
  contadores visíveis; `test/`, contratos de conteúdo e manifesto;
  `sync/progress-source.json`, prova da fonte; `README.md`, `progress.md` e
  `techinical_referrence.md`, documentação vigente.
- O que foi feito: incorporada a síntese sanitizada da configuração publicada
  que diferencia quem atende de quem recebe comissão por indicação, elevando a
  prestação de contas a 65 registros e atualizando as métricas comprovadas para
  472 testes locais e 467 disponíveis no pacote Linux.
- Privacidade: a entrada descreve somente o comportamento percebido, a
  validação agregada e o estado de publicação. Não foram copiados endereços,
  caminhos, identificadores, hashes, nomes, telefones, credenciais nem detalhes
  operacionais exploráveis do histórico bruto.
- Motivo e finalidade: manter a página pública alinhada ao registro canônico
  depois do push do SentinelZap, documentando a melhoria de clareza sem expor o
  ambiente operacional.
- Validação e estado: `npm run progress:verify` comprovou 65 registros
  documentais, 64 técnicos e correspondência integral com a fonte; `npm run
  check` aprovou os 18/18 testes, a sanitização e o build Vite. Estado final:
  alteração enviada para `main` e produção Vercel confirmada como `Ready`, com
  HTTP 200, conteúdo atualizado e cabeçalhos de segurança preservados.

## 2026-08-26 — Sincronização da auditoria integral do CRM

- Arquivos e trechos: `src/data.js`, metadados, métricas e novo registro;
  `index.html`, contadores; `test/data.test.js` e `test/site.test.js`, contratos
  de cronologia e conteúdo; `sync/progress-source.json`, prova da fonte;
  `README.md`, `progress.md` e `techinical_referrence.md`, documentação vigente.
- O que foi feito: incorporada uma síntese sanitizada da auditoria QA completa,
  distinguindo o candidato local aprovado do release que continua em produção.
  A linha do tempo passou a 66 registros, dos quais 65 correspondem aos
  registros técnicos da fonte.
- Motivo e finalidade: manter a prestação de contas sincronizada com o log
  canônico sem sugerir que as correções locais já foram implantadas na VPS.
- Privacidade: permanecem fora do portal endereços, caminhos, identificadores,
  hashes, credenciais, nomes, telefones, conteúdo de conversa e detalhes
  operacionais exploráveis.
- Validação e estado final: `npm run progress:verify` comprovou 66
  registros documentais, 65 técnicos e o digest da fonte; `npm run check`
  aprovou 18/18 testes, sanitização e build Vite. O diff ficou sem erro de
  whitespace. A cópia code-only do candidato operacional também aprovou
  526/526 testes transportáveis e reproduziu o manifesto. A publicação
  documental autorizada foi enviada para `main`; a implantação integrada foi
  confirmada como `Ready`, e a URL canônica respondeu HTTP 200 com os 66
  registros, os resultados 527/527 e 526/526 e os cabeçalhos de segurança
  esperados. O código operacional permanece congelado e a VPS não foi acessada
  nem modificada.

## 2026-08-27 — Sincronização do push da auditoria integral do CRM

- Arquivos e trechos: `src/data.js`, metadados, métricas e novo registro;
  `index.html`, estado executivo e contadores; `test/data.test.js` e
  `test/site.test.js`, contratos de cronologia, conteúdo e sincronização;
  `sync/progress-source.json`, prova da fonte; `README.md`, `progress.md` e
  `techinical_referrence.md`, documentação vigente.
- O que foi feito: a entrada antes marcada como candidata foi preservada como
  histórico e ganhou um registro posterior de publicação. A linha do tempo
  passou a 67 registros, dos quais 66 correspondem às entradas técnicas da
  fonte. O estado executivo agora apresenta 533/533 testes locais, 528/528 no
  pacote Linux, quatro contas conectadas e cinco snapshots reais.
- Síntese pública: paginação, tarefa prioritária, totais estáveis, separação
  financeira, cartões móveis, linguagem simples, erros junto do campo e a
  evolução compatível das métricas derivadas foram descritos sem copiar detalhes
  internos do ambiente.
- Privacidade: continuam ausentes endereços de infraestrutura, caminhos,
  identificadores, hashes, credenciais, nomes, telefones, conteúdo de conversas
  e qualquer detalhe operacional explorável.
- Motivo e finalidade: cumprir a sincronização obrigatória após o push do
  SentinelZap e mostrar ao contratante o efeito prático da auditoria sem ligar o
  portal ao dashboard operacional.
- Validação e estado: `npm run progress:verify` e `npm run check` aprovados,
  incluindo 18/18 testes, sanitização e build Vite. A alteração foi enviada para
  `main`; a publicação integrada foi confirmada como `Ready`, com HTTP 200,
  conteúdo atualizado e cabeçalhos de segurança preservados.

## 2026-08-27 — Sincronização da correção local de recuperação histórica e salvamento comercial

- Arquivos e trechos: `src/data.js`, metadados, roadmap e novo registro;
  `index.html`, contadores; `test/data.test.js` e `test/site.test.js`, contratos
  de cronologia e sincronização; `sync/progress-source.json`, prova da fonte;
  `README.md`, `progress.md` e `techinical_referrence.md`, documentação vigente.
- O que foi feito: a linha do tempo passou a 68 registros, dos quais 67
  correspondem à fonte técnica. O release operacional permaneceu identificado
  por 533/533 testes e ganhou, separadamente, o candidato local aprovado em
  537/537, ainda condicionado a um pedido explícito de push.
- Síntese pública: a recuperação manual foi distinguida do auto-scan
  concorrente, falhas continuam isoladas e o editor comercial ganhou ação
  explícita de salvamento. O roadmap passou a exigir a publicação do candidato
  antes de acionar a recuperação acompanhada nas contas.
- Privacidade: não foram publicados endereços de infraestrutura, caminhos,
  identificadores, hashes, credenciais, nomes, telefones, mensagens ou detalhes
  operacionais exploráveis.
- Motivo e finalidade: manter a prestação de contas alinhada ao log canônico sem
  representar a correção local como já implantada no dashboard operacional.
- Validação e estado: `npm run progress:verify` e `npm run check` aprovados,
  incluindo 18/18 testes, sanitização e build Vite. A alteração foi enviada para
  `main`; a publicação integrada foi confirmada como `Ready`, com HTTP 200,
  conteúdo atualizado e cabeçalhos de segurança preservados.

## 2026-08-27 — Sincronização do push e mudanças recentes no topo

- Arquivos e trechos: `src/data.js`, estado executivo, roadmap e novo registro;
  `src/main.js`, cópia invertida usada pela apresentação; `index.html`, título,
  contadores e orientação da linha do tempo; `test/data.test.js` e
  `test/site.test.js`, contratos de sincronização e ordenação;
  `sync/progress-source.json`, prova da fonte; `README.md`, `progress.md` e
  `techinical_referrence.md`, documentação vigente.
- O que foi feito: a linha do tempo passou a 69 registros, dos quais 68
  correspondem à fonte técnica. A fonte canônica continua crescente e imutável,
  mas a tela, os filtros e a impressão usam uma cópia invertida para apresentar
  primeiro as mudanças mais recentes.
- Síntese pública: a recuperação histórica e o salvamento comercial explícito
  foram marcados como publicados; o estado executivo passou a 537/537 testes
  locais, 532/532 no pacote Linux, quatro contas conectadas e sete snapshots. O
  acionamento de **Recuperar histórico** continua corretamente identificado como
  ação humana autenticada ainda pendente.
- Privacidade: permanecem ausentes endereços de infraestrutura, caminhos,
  identificadores, hashes, credenciais, nomes, telefones, mensagens e detalhes
  operacionais exploráveis.
- Motivo e finalidade: cumprir a sincronização obrigatória do push e permitir que
  o contratante encontre primeiro o estado mais atual sem reescrever nem perder a
  rastreabilidade histórica.
- Validação local: `npm run progress:verify` comprovou 69 registros documentais,
  68 técnicos e o digest da fonte; `npm run check` aprovou 19/19 testes,
  sanitização e build Vite. Estado de publicação: envio para `main` e validação
  do release integrado em andamento nesta tarefa.
