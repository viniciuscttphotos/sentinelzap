# SentinelZap — Prestação de contas

Página pública documental do SentinelZap. A narrativa apresenta, nesta ordem:

1. onde o projeto está agora;
2. para onde o projeto vai;
3. os 80 registros de progresso, exibidos do mais recente ao mais antigo.

O portal substitui a landing histórica do projeto web `sentinelzap`, mas não move,
replica ou hospeda o dashboard operacional. Não existe conexão do site com a API,
com o banco, com sessões WhatsApp ou com qualquer runtime de produção.

## Conteúdo público

Os 79 registros técnicos da fonte foram consolidados em sínteses públicas e
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

Em 30/08, a retomada adversarial corrigiu falhas de negação, contexto,
moderação e recuperação no candidato local de confiabilidade. Às 19:24:06 no
horário de Brasília, a suíte integral terminou com 1.059 testes concluídos,
1.058 aprovados, zero falhas e um skip ambiental esperado no macOS. Os 2.147
arquivos operacionais monitorados permaneceram idênticos antes e depois. Às
19:32:59, a cópia descartável do pacote também terminou aprovada: 1.054 testes,
1.053 aprovados, zero falhas e um skip esperado. Os cinco testes do empacotador
ficam fora do pacote por desenho. O código de origem e da cópia permaneceu
idêntico antes e depois dos testes.

As evidências atuais são separadas por método:

- matriz combinatória offline: 160.000 de 160.000 casos aprovados, em 40 produtos com
  4.000 casos por produto e 20 famílias de cenários; a cópia descartável repetiu
  o mesmo resultado de 160.000 aprovações;
- diálogos roteirizados: 240 turnos fixos, sem conversação livre entre IAs;
- transporte: 240 falhas injetadas, sem entrega no WhatsApp;
- geração: 30 turnos integrados; 160 chamadas a provedor simulado no total,
  incluindo casos isolados, sem LLM real;
- CRM: 96 botões estáticos e 40 templates dinâmicos inventariados; 24
  formulários, com 20 exercitados e quatro logísticos excluídos. O despacho dos
  controles foi executado em uma máquina virtual de testes (VM), não em
  navegador real;
- conteúdo: 20 combinações de produto e card ainda sem arte exata; o robô deve
  informar indisponibilidade sem substituir o material por outro.

O diagnóstico público do Guardião é limitado a carregamento inconsistente de
configuração e quórum insuficiente. Mídia sem legenda permanece para revisão
manual. O confronto com respostas humanas é somente agregado e sanitizado,
não uma avaliação semântica. IA real, entrega no WhatsApp e aceite operacional
acompanhado continuam pendentes; etiquetas e Melhor Envio real permanecem fora
do escopo.

O candidato e seu pacote de 375 arquivos e 114.552.419 bytes estão aprovados
localmente. A reconstrução após os testes permaneceu idêntica, sem estado
operacional nem dependências instaladas incluídos. A implantação aguarda pedido explícito de push e os gates seguros
no Linux de destino. A produção de 29/08 não foi alterada. A publicação
intermediária anterior não valida esta nova edição: o instante final, o
manifesto e os gates do portal ainda serão consolidados pela coordenação.

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

A última atualização pública é um contrato persistente em `reportMeta`: instante
ISO 8601 com o offset UTC vigente, fuso IANA `America/Sao_Paulo` e rótulo
“horário de Brasília”. A interface usa o rótulo calculado com esse fuso e não
converte o horário pelo fuso do navegador do visitante. O gate
`progress:verify` também exige que `reportMeta.updatedAtIso` seja idêntico a
`synchronizedAt` no manifesto.

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
2. Imediatamente antes dos gates finais, substitua a constante
   `REPORT_UPDATED_AT` pelo instante real em Brasília, no formato
   `AAAA-MM-DDTHH:mm:ss±HH:mm`, com o offset UTC vigente para
   `America/Sao_Paulo`. Não use UTC sem conversão, horário do navegador ou
   somente a data.
3. Mantenha `REPORT_TIME_ZONE` como `America/Sao_Paulo` e o rótulo público
   “horário de Brasília”. Associe `publishedAt: REPORT_UPDATED_AT` ao registro
   mais recente quando o instante documentar sua publicação; nunca atribua esse
   horário retroativamente a um evento sem evidência. Ao acrescentar um registro,
   preserve o `publishedAt` anterior como literal comprovado, sem vinculá-lo à
   constante renovada. O registro 79 mantém `2026-08-30T09:34:04-03:00`.
4. Preserve a fonte canônica em ordem crescente e a ordem documental dentro do
   mesmo dia; a interface inverte uma cópia para mostrar o registro mais recente
   primeiro.
5. Só preencha `time` quando houver evidência documental.
6. Atualize as métricas apenas quando o estado correspondente tiver sido comprovado.
7. Depois que o `PROGRESS.md` raiz estiver final, atualize digest, contagem,
   último cabeçalho e `synchronizedAt` em `sync/progress-source.json`. O valor de
   `synchronizedAt` deve ser exatamente o mesmo de `reportMeta.updatedAtIso`.
8. Registre a mudança em `progress.md` e revise `techinical_referrence.md`.
9. Execute `npm run check`, envie `main` e confirme no conteúdo servido que a
   data, o horário e o rótulo de Brasília correspondem ao instante publicado,
   além do deploy `Ready` e HTTP 200.

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
