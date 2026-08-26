# SentinelZap — Prestação de contas

Página pública documental do SentinelZap. A narrativa apresenta, nesta ordem:

1. onde o projeto está agora;
2. para onde o projeto vai;
3. os 62 registros de progresso em sequência cronológica.

O portal substitui a landing histórica do projeto web `sentinelzap`, mas não move,
replica ou hospeda o dashboard operacional. Não existe conexão do site com a API,
com o banco, com sessões WhatsApp ou com qualquer runtime de produção.

## Conteúdo público

Os 61 registros técnicos da fonte foram consolidados em 61 sínteses públicas e
somados ao registro de criação deste portal. O material não publica IPs, telefones,
nomes de usuários, identificadores internos, hashes, caminhos de servidor,
credenciais ou detalhes operacionais exploráveis.

O release de 24/08 e o candidato local de 25/08 são estados distintos:

- produção: 454/454 testes no release publicado;
- candidato local: 462/462 testes, aguardando acesso e push controlado;
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

Os testes usam `node:test` e validam contagem, ordem cronológica, horários com
evidência, sanitização, narrativa, acessibilidade estrutural, mobile first,
metadados sociais, configuração Vercel e cabeçalhos de segurança.

## Publicação autorizada

O destino é o repositório público existente `sentinelzap` e o projeto Vercel
existente `sentinelzap`, que atende `https://sentinelzap.vercel.app/`.

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
5. Registre a mudança em `progress.md` e revise `techinical_referrence.md`.
6. Execute `npm run check` antes de publicar.

## Estrutura

```text
sentinelzap-progresso/
├── public/                    # marca, favicon, robots e sitemap
├── src/
│   ├── data.js                # conteúdo sanitizado e métricas
│   ├── main.js                # renderização, busca, filtros e impressão
│   └── styles.css             # sistema visual mobile first
├── test/                      # testes node:test
├── index.html                 # documento e metadados
├── vercel.json                # deploy e cabeçalhos de segurança
├── progress.md                # log cumulativo deste portal
└── techinical_referrence.md   # referência técnica vigente
```
