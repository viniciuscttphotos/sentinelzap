# SentinelZap Progresso — Referência técnica

## 1. Objetivo

`sentinelzap-progresso` é a página pública de prestação de contas do SentinelZap.
Seu objetivo é traduzir o histórico técnico em uma narrativa executiva verificável:
estado atual, direção imediata e progresso cronológico.

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
     └── métricas, roadmap e 62 registros sanitizados

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
- abre com “Onde estamos agora”, seguido de “Para onde vamos” e “Progresso em
  sequência até o final”;
- contém metadados SEO, canonical, OpenGraph, Twitter Card e favicon;
- oferece skip link, landmarks, rótulos, região `aria-live` e fallback `noscript`;
- referencia exclusivamente recursos locais de execução.

### `src/data.js`

- é a única fonte de conteúdo editorial renderizado dinamicamente;
- exporta metadados do relatório, quatro métricas executivas, cinco prioridades do
  roadmap, os 62 registros e as opções derivadas de filtro;
- diferencia `context` (`Local`, `Produção`, `Documentação`), `kind`, `state`,
  resultado e validação;
- preserva a ordem crescente das datas e a ordem documental dentro do mesmo dia;
- usa `time: null` por padrão e inclui horário apenas quando comprovado;
- não contém dados pessoais nem detalhes de infraestrutura exploráveis.

### `src/main.js`

- cria elementos com APIs nativas do DOM e usa `textContent`, evitando interpolação
  de conteúdo editorial em HTML;
- renderiza métricas, roadmap e linha do tempo agrupada por dia;
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
- verifica contagem de 62 registros, distribuição por data, sequência, horários,
  métricas, gates e sanitização;
- verifica ordem da narrativa, SEO, acessibilidade estrutural, mobile first,
  cabeçalhos Vercel, scripts npm e ausência de conexão com API.

## 4. Fluxo de dados

1. O navegador carrega `index.html` e o bundle gerado pelo Vite.
2. `main.js` importa os objetos imutáveis de `data.js`.
3. O conteúdo é materializado com DOM nativo.
4. Busca e filtros operam integralmente em memória.
5. A impressão usa o mesmo documento e uma folha específica, sem exportação remota.

Nenhum dado é enviado ou recebido depois do carregamento estático.

## 5. Governança do conteúdo

O histórico bruto não deve ser copiado para o portal. Cada atualização exige:

- síntese factual sem extrapolação;
- remoção de IPs, telefones, nomes de usuários, identificadores internos, hashes,
  caminhos, credenciais e pormenores exploráveis;
- distinção explícita entre trabalho local, produção, decisão e validação;
- horário somente com evidência;
- manutenção da ordem documental quando registros do mesmo dia não possuem horário;
- atualização do log e revisão desta referência.

## 6. Build, testes e deploy

Comandos oficiais:

```bash
npm ci
npm test
npm run build
```

O destino autorizado é o projeto Vercel existente `sentinelzap`, com URL canônica
`https://sentinelzap.vercel.app/`. A Vercel CLI 59.5.0 foi instalada globalmente
via npm e os scripts npm chamam essa instalação persistente, sem baixar `latest` em
cada execução nem incluir sua cadeia transitiva no build do portal. A sessão
persistente fica fora do repositório. `.vercel/`, variáveis e tokens são ignorados
pelo Git.

O deploy do portal substitui somente a landing web histórica. Não reinicia, migra
ou modifica o dashboard/API operacional.

## 7. Segurança e limitações

- O portal é público e, portanto, só pode conter dados aprovados para publicação.
- CSP e headers reduzem riscos no navegador, mas não substituem revisão editorial.
- Como não há backend, o site não possui sessão ou área privada.
- Filtros na URL contêm apenas termos digitados pelo visitante; nenhum termo é
  enviado pelo aplicativo.
- A URL canônica pressupõe a publicação no projeto Vercel autorizado.

## 8. Estado vigente

Em 26/08/2026, implementação e conteúdo estão concluídos localmente. `npm test`
aprovou 14/14 testes e o build Vite 8.2.2 gerou o pacote estático de produção com
156 kB em disco. A publicação externa ainda não foi executada por este subprojeto
e deve ser registrada em `progress.md` somente depois de comprovada.
