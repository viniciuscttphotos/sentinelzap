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
- Conteúdo: os 61 registros da fonte foram consolidados em sínteses públicas e
  somados ao registro deste portal, totalizando 62. Release publicado e candidato
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
