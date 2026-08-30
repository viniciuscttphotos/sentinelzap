# SentinelZap — Prestação de contas

Página pública documental do SentinelZap. A narrativa apresenta, nesta ordem:

1. onde o projeto está agora;
2. para onde o projeto vai;
3. os 78 registros de progresso, exibidos do mais recente ao mais antigo.

O portal substitui a landing histórica do projeto web `sentinelzap`, mas não move,
replica ou hospeda o dashboard operacional. Não existe conexão do site com a API,
com o banco, com sessões WhatsApp ou com qualquer runtime de produção.

## Conteúdo público

Os 77 registros técnicos da fonte foram consolidados em sínteses públicas e
somados ao registro de publicação deste portal. O material não publica IPs, telefones,
nomes de usuários, identificadores internos, hashes, caminhos de servidor,
credenciais ou detalhes operacionais exploráveis.

O release vigente de 29/08 possui validações complementares e explicitamente
separadas:

- validação local: 772 testes aprovados na versão publicada, zero falhas e um skip
  esperado;
- pacote Linux: 768/768 testes transportáveis antes e durante o push;
- continuidade: 14 snapshots reais, restauração ensaiada e TLS aprovados;
- operação: uma conta principal e quatro gerenciadas conectadas;
- ação humana pendente: continuar as recuperações, uma conta por vez, sob
  controle do usuário autenticado;
- marcos: 5/5 concluídos.

Em 29/08, a fundação logística foi instalada em modo exclusivamente Sandbox,
mas permaneceu desativada, sem credenciais, autorização ou chamadas externas.
OAuth, configuração Jadlog, smoke mutável e API real não foram executados. O
mesmo release publicou os atalhos de pagamento em Pedidos, a identificação do
cliente em Aprovações e os novos cards CBL, sem automatizar decisões financeiras
ou comerciais.

Em 30/08, uma força-tarefa concluiu localmente um novo candidato de
confiabilidade. O Guardião IA, a fila durável de recuperação de mensagens, a
confirmação idempotente de entregas e os fluxos humanos do CRM entre cliente,
pedido e pagamento manual foram reforçados. O gate integral terminou com 936
testes concluídos, 935 aprovados e um skip esperado, sem falhas.
O pacote code-only candidato foi reproduzido com 370 arquivos e 114.395.897
bytes. Uma cópia descartável do artefato concluiu 931 testes, com 930 aprovados,
um skip esperado e zero falhas; os cinco contratos do próprio empacotador não
viajam no payload por desenho.

A validação conversacional isolada aprovou 148.000 abordagens de produto: 37
produtos com 4.000 formulações naturais cada. Separadamente, o ensaio
robô-a-robô aprovou 111/111 turnos e o confronto com respostas humanas permaneceu
somente agregado e sanitizado. A campanha não iniciou WhatsApp, Chrome,
aplicação nem rede externa e não usou dados pessoais. Etiquetas e
integração logística real ficaram fora da entrega. O inventário identificou 21
combinações de produto e card sem arte exata; nesses casos, o comportamento
aprovado é informar indisponibilidade sem substituir o material por outro. A
criação dessas artes permanece como backlog de conteúdo.

Esse candidato continua somente local e aguarda pedido explícito de push. O
estado de produção permanece sendo o release de 29/08 descrito acima; a
prestação pública do candidato não representa implantação na VPS nem aceite no
runtime operacional.

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

Os testes usam `node:test` e validam contagem, fonte canônica crescente,
apresentação decrescente, horários com evidência, sanitização, narrativa,
acessibilidade estrutural, mobile first, metadados sociais, configuração Vercel
e cabeçalhos de segurança.

## Publicação e atualização contínua autorizadas

O destino é o repositório público existente `sentinelzap` e o projeto Vercel
existente `sentinelzap`, que atende `https://sentinelzap.vercel.app/`.

O repositório está conectado ao projeto Vercel. Cada push aprovado em `main`
dispara a publicação de produção, cujo build executa testes antes do Vite. A
autorização contínua vale somente para sincronizar esta prestação de contas
sanitizada quando o `PROGRESS.md` raiz mudar e depois de todo push concluído para
a VPS do SentinelZap. A regra é exclusiva deste projeto e não autoriza, por si
só, mutações na VPS.

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
2. Preserve a fonte canônica em ordem crescente e a ordem documental dentro do
   mesmo dia; a interface inverte uma cópia para mostrar o registro mais recente
   primeiro.
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
