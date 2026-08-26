# SentinelZap — Prestação de contas

Página pública documental do SentinelZap. A narrativa apresenta, nesta ordem:

1. onde o projeto está agora;
2. para onde o projeto vai;
3. os 63 registros de progresso em sequência cronológica.

O portal substitui a landing histórica do projeto web `sentinelzap`, mas não move,
replica ou hospeda o dashboard operacional. Não existe conexão do site com a API,
com o banco, com sessões WhatsApp ou com qualquer runtime de produção.

## Conteúdo público

Os 62 registros técnicos da fonte foram consolidados em sínteses públicas e
somados ao registro de publicação deste portal. O material não publica IPs, telefones,
nomes de usuários, identificadores internos, hashes, caminhos de servidor,
credenciais ou detalhes operacionais exploráveis.

O release de 24/08 e o candidato local de 26/08 são estados distintos:

- produção: 454/454 testes no release publicado;
- candidato local: 470/470 testes, aguardando preflight, pacote, backup e aceite;
- continuidade: dois snapshots reais e restauração ensaiada;
- marcos: 5/5 concluídos.

## Requisitos

- Node.js 20.19 ou superior compatível com Vite 8;
- npm;
- Vercel CLI 59.5.0 instalada de forma persistente via npm.

```bash
npm install --global vercel@59.5.0
```

## Desenvolvimento

```bash
npm ci
npm run dev
```

O servidor de desenvolvimento atende somente os arquivos deste portal. Ele não
inicia nem importa o aplicativo SentinelZap.

## Validação

```bash
npm test
npm run build
```

Ou execute os dois gates em sequência:

```bash
npm run check
```

Executado junto da raiz operacional, `npm run check` começa por
`npm run progress:verify`, que confronta digest, contagem e registro mais recente
do `PROGRESS.md`. O build da Vercel usa `npm run deploy:check`, porque a fonte
operacional deliberadamente não é enviada ao repositório público.

Os testes usam `node:test` e validam contagem, ordem cronológica, horários com
evidência, sanitização, narrativa, acessibilidade estrutural, mobile first,
metadados sociais, configuração Vercel e cabeçalhos de segurança.

## Publicação e atualização contínua autorizadas

O destino é o repositório público existente `sentinelzap` e o projeto Vercel
existente `sentinelzap`, que atende `https://sentinelzap.vercel.app/`.

O repositório está conectado ao projeto Vercel. Cada push aprovado em `main`
dispara a publicação de produção, cujo build executa testes antes do Vite. A
autorização contínua vale somente para sincronizar esta prestação de contas
sanitizada quando o `PROGRESS.md` raiz mudar; ela não autoriza mutações na VPS.

A sessão da Vercel CLI é persistida pelo próprio CLI fora do repositório. Os
scripts npm reutilizam essa instalação e não baixam uma versão mutável a cada
execução. Tokens ou arquivos da pasta `.vercel/` nunca devem ser versionados.

```bash
npm run vercel:whoami
npm run vercel:link
npm run vercel:pull
npm run check
npm run vercel:prod
```

Se `npm run vercel:whoami` indicar ausência de sessão, use `npm run vercel:login` uma única vez e
repita o fluxo. A publicação deve ocorrer somente depois de revisão do diff e dos
gates locais. O deploy não altera o dashboard operacional.

## Atualização do relatório

1. Edite `src/data.js` com uma síntese pública, verificável e sanitizada.
2. Preserve ordem por data; dentro do mesmo dia sem horário, preserve a ordem da fonte.
3. Só preencha `time` quando houver evidência documental.
4. Atualize as métricas apenas quando o estado correspondente tiver sido comprovado.
5. Depois que o `PROGRESS.md` raiz estiver final, atualize digest, contagem e último
   cabeçalho em `sync/progress-source.json`.
6. Registre a mudança em `progress.md` e revise `techinical_referrence.md`.
7. Execute `npm run check`, envie `main` e confirme o deploy `Ready` e HTTP 200.

Se `npm run progress:verify` acusar divergência, a tarefa não está concluída. O
histórico bruto nunca deve ser copiado para o portal para contornar o gate.

## Estrutura

```text
sentinelzap-progresso/
├── public/                    # marca, favicon, robots e sitemap
├── src/
│   ├── data.js                # conteúdo sanitizado e métricas
│   ├── main.js                # renderização, busca, filtros e impressão
│   └── styles.css             # sistema visual mobile first
├── scripts/
│   └── verify-progress-sync.mjs # prova local de sincronização
├── sync/
│   └── progress-source.json   # digest e metadados não sensíveis da fonte
├── test/                      # testes node:test
├── index.html                 # documento e metadados
├── vercel.json                # deploy e cabeçalhos de segurança
├── progress.md                # log cumulativo deste portal
└── techinical_referrence.md   # referência técnica vigente
```
