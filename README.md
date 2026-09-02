# SentinelZap — Prestação de contas

Página pública documental do SentinelZap. A narrativa apresenta, nesta ordem:

1. onde o projeto está agora;
2. para onde o projeto vai;
3. os 88 registros de progresso, exibidos do mais recente ao mais antigo.

O portal substitui a landing histórica do projeto web `sentinelzap`, mas não move,
replica ou hospeda o dashboard operacional. Não existe conexão do site com a API,
com o banco, com sessões WhatsApp ou com qualquer runtime de produção.

## Conteúdo público

Os 87 registros técnicos da fonte foram consolidados em sínteses públicas e
somados ao registro de publicação deste portal. O material não publica IPs, telefones,
nomes de usuários, identificadores internos, hashes, caminhos de servidor,
credenciais ou detalhes operacionais exploráveis.

O registro mais recente é “Diagnóstico de CPU, candidatos locais de outbox e
auto-scan e auditoria TLS”, em contexto `Local` e estado `Validado localmente`.
O diagnóstico ao vivo e somente leitura apontou o claim periódico da outbox vazia
como causa dominante do consumo e da latência. O caminho vazio da outbox agora
evita a transação completa, e o auto-scan foi redesenhado como job durável com
microfatias de um chat e até 25 mensagens, checkpoint, lease, deadline e
cancelamento cooperativo. Esses dois candidatos existem apenas no workspace; a
produção continua na release anterior e requer pedido explícito de push para
qualquer implantação.

O watermark do auto-scan é separado da recuperação manual. A migração inicia em
`legacy_baseline`, sem certificação, e só passa a `verified_v1` depois de uma
barreira agregada bem-sucedida. O snapshot final limitado no navegador define o
ponto de linearização. Não há atomicidade entre navegador e SQLite, worker thread
ou preempção física; o cancelamento depende de pontos cooperativos e a janela
residual após o snapshot permanece documentada. TLS, cadeia e renovação automática
foram comprovados sem alteração operacional. A suíte integral autoritativa concluiu
1.309 testes, com 1.308 aprovações, zero falhas ou cancelamentos e um skip ambiental
esperado: 218/218 em CRM e persistência, 1.071 gerais com 1.070 aprovações e um
skip, e 20/20 legados. A campanha offline aprovou 160.000/160.000 em
655,568493104 segundos.

O registro 87 é “Início da implementação local de machine learning”, em contexto
`Local` e estado `Validado localmente`. A fase ML-0 foi concluída para
organizar estilo e estratégia de respostas. Seu contrato local puro aceita
exclusivamente fixture sintética, conversa privada e risco baixo; valida HMAC do
envelope, retenção de 1 a 30 dias, revisão humana recente, âncora e revisão
encadeadas e remoção de sujeito somente em memória. O focal ML passou 24/24, o
pacote 5/5 e o combinado 29/29. A suíte integral concluiu 1.267 testes, com 1.266
aprovações, zero falhas ou cancelamentos e um skip ambiental; a campanha aprovou
160.000/160.000 em 936,683243611 segundos. O estado operacional monitorado
permaneceu idêntico e duas revisões finais não encontraram P1/P2 no recorte.

Regex ou prefixo não comprovam anonimização. Âncora persistida, CAS, armazenamento
isolado, tombstone, ledger e deleção durável ainda não existem. Não houve coleta
real, treino, embeddings, fine-tuning, inferência, integração com aplicativo,
WhatsApp, SQLite ou provedor, push nem mudança de produção ou VPS. O próximo gate
é governança com armazenamento isolado, CAS e deleção real; depois vem um shadow
separado sem envio. Copiloto e canário ficam para fases posteriores.

O registro 86 preserva o fechamento anterior, “Backup local temporário instalado,
restore aprovado e VPS antiga desativada”, em contexto `Produção`, estado
`Publicado` e `publishedAt` literal `2026-09-01T23:56:17-03:00`. A cópia
cifrada colocalizada foi instalada na infraestrutura principal e permanece
estritamente manual, sem timer. Novos backups ficam bloqueados **a partir de
31/10/2026 às 20:00 de Brasília, inclusive**. O primeiro snapshot e sua
verificação foram aprovados; quatro varreduras pós-reinício foram persistidas sem
falhas, a saúde final passou em repouso e o restore drill isolado foi aprovado sem
reiniciar o serviço.

A infraestrutura antiga de backup foi desativada somente depois desses gates. O
acervo histórico permanece preservado offline, mas ficará indisponível se o host
antigo for cancelado. A cópia na mesma infraestrutura não é recuperação de
desastre e um novo destino externo continua obrigatório antes do corte.

O registro 85 preserva o estágio anterior, “Backup local temporário manual
validado; implantação e liberação da VPS antiga pendentes”, em contexto `Local`
e estado `Validado localmente`. Naquele corte, o gate focal aprovou 22/22 testes,
a suíte integral autoritativa concluiu 1.243 testes, com 1.242 aprovações, zero
falhas ou cancelamentos e um skip ambiental esperado, e a campanha aprovou
160.000/160.000 casos offline. A infraestrutura ainda não havia sido alterada;
esse registro não é reescrito retroativamente como implantação.

O registro 84, “Push seletivo de QR/conexões, saúde aprovada em repouso e
gargalo estrutural”, permanece em contexto `Produção` e estado `Publicado`. O
pacote seletivo alterou 17 arquivos, sem adições ou remoções. O gate local
concluiu 1.192 testes, com 1.191 aprovações, zero falhas ou cancelamentos e um
skip ambiental esperado; o clone Linux aprovou 1.192/1.192, sem falhas,
cancelamentos ou skips. A conta moderadora principal está em `qrready`, pronta
para o usuário abrir a área Contas e ler o QR quando puder; as quatro contas
gerenciadas permanecem conectadas.

A saúde final foi aprovada em repouso, sem varreduras ou jobs ativos, e HTTPS
público e monitor TLS passaram. Depois do fim da fila, latência e consumo
voltaram ao patamar normal. A causa estrutural continua pendente: o auto-scan é
sequencial, não possui deadline global e disputa o mesmo processo da aplicação,
podendo voltar a degradar respostas após reinício. A correção deve usar job
durável em lotes, checkpoint, orçamento total, cancelamento real e retomada
idempotente. O backup pré-push foi aprovado. O backup pós-push não foi executado
porque exigiria novo reinício e poderia repetir os auto-scans. A restauração
isolada também não foi repetida nessa janela, mas não chama `systemctl` nem
reinicia o SentinelZap.

A direção de aprendizado supervisionado já concluiu localmente a fundação ML-0.
As fases seguintes permanecem condicionadas a governança e armazenamento isolado
com CAS e deleção durável; depois, shadow separado com avaliação humana e sem
envio; copiloto de rascunhos e canário restrito a baixo risco somente mais tarde.
Os 594 pares existentes são referência de estilo e não comprovam equivalência
semântica. Venda, pagamento, crédito, reembolso e decisões clínicas permanecem
obrigatoriamente humanos. A validação local não equivale a IA real ou etapa
operacional de aprendizado.

O registro anterior, “Consenso do Guardião por agentes, preservando os modelos
atuais”, permanece em contexto `Local` e estado `Validado localmente`. A decisão usa
três agentes de evidência, contexto e contestação, exigindo pelo menos dois
votos concordantes de agentes distintos sobre a mensagem corrente e na mesma
rodada. Cada agente recebe uma avaliação separada, sem ver os outros votos;
tentativas repetidas não acrescentam votos. Os modelos atuais são preservados;
usar o mesmo modelo ou provedor é permitido e não garante independência
estatística. Evidência literal, categorias permitidas e revalidação da política
antes dos efeitos continuam obrigatórias. Mídia sem legenda exige revisão manual.

A implementação anterior foi interrompida por limite de uso, com focal
reprovado por volta de 06:12 de Brasília. O núcleo, os limites de espera e o
fallback foram corrigidos. O focal ampliado de 12 arquivos passou 161/161 em
31/08 às 07:08:39 de Brasília, sem falhas, skips ou cancelamentos. São 42
regressões novas: 33 no núcleo e nove no agendamento; seus focais passaram
73/73 e 12/12. A suíte integral iniciou às 07:09:06 e terminou às 07:31:57
de Brasília, com saída zero: **1.200 testes, 1.199 aprovações, zero falhas ou
cancelamentos e um skip esperado no macOS**. Foram 209/209 testes de
CRM/persistência, 971 gerais com 970 aprovações e um skip, e 20/20 legados.
A campanha aprovou 160.000/160.000 casos offline em 1.177,965 segundos.
O código congelado e o estado protegido permaneceram idênticos antes e depois,
em conteúdo e metadados monitorados.
A produção recebeu somente o recorte de QR e conexões e conserva o contrato
anterior de duas origens. O Guardião por três agentes não integrou o pacote e
continua validado apenas localmente; uma implantação futura requer release,
pacote e aceites próprios. Não houve mudança de modelos ou chamada a IA real.

Os 86 registros anteriores foram preservados. O registro “Correção local do
ciclo de QR/logout e diagnóstico da lentidão (aguardando push)” conserva a
validação local como histórico, com seu instante de publicação anterior. O
registro “Confronto dos
cards, Markdown faltante e push autorizado” continua em contexto `Produção`
e estado `Publicado`. O push operacional foi autorizado e instalado às 02:52:31 de
Brasília. O runtime foi aceito antes do backup posterior, com cinco contas
conectadas em duas checagens; a continuidade e a checagem final posterior
também foram aprovadas.
O candidato dos cards concluiu 1.126 testes locais
(1.125 aprovados, zero falhas e um skip esperado) e 1.121/1.121 no Linux;
ambos repetiram as 160.000 aprovações da campanha offline. Esses gates antecedem
o novo reparo da conta principal e não o validam. O primeiro reparo passou
206/206 testes focais, mas seu pacote falhou em um contrato de telemetria nas
duas suítes integrais, local e Linux. Os sete eventos operacionais anteriores
foram restaurados, com teste comportamental do registrador. O novo focal passou
214/214 testes, com 31 regressões da conta principal. Após revisão independente,
o congelamento formal ocorreu às 02:26:08, horário de Brasília. Os novos
integrais foram aprovados em 31/08: local às 02:37:42 de Brasília, com 1.157
testes, 1.156 aprovações, zero falhas e um skip esperado; Linux às 02:33:41,
com 1.152/1.152 aprovados, sem skips ou cancelamentos. Ambos repetiram
160.000/160.000 casos offline, em 444,109 segundos localmente e 63,956 segundos
no Linux. A reconstrução às 02:37:58 de Brasília confirmou o pacote idêntico,
com 378 arquivos e 114.678.851 bytes, em staging separado. As execuções
reprovadas não são tratadas como aceite nem apagadas do histórico. A implantação
foi concluída, o runtime aceito e o backup posterior e a restauração isolada
confirmados; a checagem final sem atividade passou às 03:16:04,129 de Brasília.

O backup pré-publicação concluiu o 15º snapshot e reiniciou o serviço,
revelando a falha de conexão da conta principal. Na leitura de 31/08 às
01:57:33, horário de Brasília, quatro contas gerenciadas estavam prontas, a
principal estava em erro e não havia jobs ou scans ativos. Essa observação
datada não é aceite de conexão. Após a implantação às 02:52:31, a produção
passou ao release de 31/08: 76 arquivos alterados, 32 acrescentados e nenhum
removido; o estado protegido ficou igual antes da partida. O serviço iniciou
ativo e sem reinícios automáticos. Na primeira checagem às 02:53:04 de Brasília,
API, SQLite, autenticação, arquivos protegidos e logs foram aprovados, mas as
contas ainda estavam inicializando. Nas checagens de 03:02:41 e 03:03:57 de
Brasília, cinco de cinco contas estavam conectadas, sem scans ou jobs e com
zero reinícios automáticos; API, SQLite, autenticação, arquivos protegidos e
logs passaram. A principal reautenticou sem novo QR, erro de conexão ou falha
de observador; o runtime foi aceito antes do backup.

O monitor TLS manual passou às 02:55:51 de Brasília, com cadeia, identidade
do certificado, renovação automática e comparação local verificadas. HTTPS
externo respondeu 200, com TLS válido, cabeçalhos seguros e redirecionamento
HTTP 308. A infraestrutura secundária permaneceu protegida, sem reinício ou
alteração; seu bot segue desativado, e o backup autenticado, restrito internamente
e somente de acréscimo. O backup posterior foi solicitado às 03:03:57,795 de
Brasília e concluiu às 03:06:03,807. A consulta às 03:07:22,516 confirmou 16
snapshots e zero locks. O reinício normal ocorreu às 03:04:44, com zero reinícios
automáticos; às 03:07:30,158, cinco contas estavam conectadas com cinco perfis de
navegador e API, SQLite, arquivos protegidos e logs aprovados, mas havia uma
varredura ativa e nenhum job. A restauração isolada iniciou às 03:07:41,059 e
passou às 03:09:47,807 de Brasília, sem falhas, com confirmação operacional
entregue. A checagem final às 03:16:04,129 de Brasília aprovou cinco contas
conectadas e cinco perfis de navegador, nenhuma varredura ou job ativo e zero
reinícios automáticos. Verificações rápida, de integridade e de relações do
SQLite, API e autenticação passaram, com API restrita ao loopback, mesmas
contas e perfis, configuração protegida inalterada, integração logística
desativada e sete contadores de alerta de logs em zero. Implantação, runtime
e continuidade foram aceitos. Os timers
recorrentes de TLS, backup e restauração continuam desabilitados e inativos;
a renovação automática de certificados permanece habilitada e ativa.

O confronto documental acrescentou 13 seções ao Markdown de protocolos e oito
seções faltantes à compilação, além do complemento da seção existente de GHK-Cu.
Foram lidas 18 fontes visuais
individualmente, mantendo as 90 imagens do inventário sem alteração. Três cards
com divergências resultaram em quatro seções técnicas bloqueadas. A seleção
textual exige produto, apresentação e via exatos; não adapta números nem troca
via para preencher lacunas. A transcrição não representa validação clínica nem
prescrição individual. O envio automático dos técnicos Retatrutida 20 mg e
Somatropina 240 UI foi bloqueado também por IDs diretos, planos repetidos e
pedidos mistos, preservando apresentações, preços e originais. São 22
indisponibilidades: 20 anteriores, incluindo NAD nasal não reconciliado, e
esses dois bloqueios técnicos novos. Isso não significa 20 arquivos ausentes;
nenhuma imagem foi fabricada.

A publicação de 83 registros foi comprovada em 01/09, com conteúdo datado de
`2026-09-01T13:02:26-03:00` nos três horários visíveis, deploy `Ready` e HTTP
200. A edição de 84 registros usa o instante `2026-09-01T20:34:50-03:00`,
preservado como evidência histórica. A preparação documental de 85 registros
conserva `2026-09-01T21:49:28-03:00`; a edição de 86 registros preserva
`2026-09-01T23:56:17-03:00` no registro 86. A abertura da edição de 87 registros
foi publicada em `2026-09-02T07:44:36-03:00`; seu fechamento renovou o instante
comum para `2026-09-02T09:20:43-03:00`, idêntico entre os dados, os três horários
visíveis e o manifesto. Os gates e a
comprovação pública de cada edição ficam registrados no log interno deste
portal; o aceite anterior não é reaproveitado.

O aceite histórico do release de 29/08 registrou validações complementares e
explicitamente separadas; não descreve a conexão após o reinício de 31/08:

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

As evidências do baseline de 30/08 são separadas por método e não validam as
alterações posteriores:

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
- conteúdo: naquele baseline havia 20 indisponibilidades de produto e tipo de
  card, incluindo NAD nasal não reconciliado; o robô deve informar
  indisponibilidade sem substituir o material por outro. A versão instalada
  em 31/08 acrescentou os dois bloqueios técnicos e totaliza 22.

O diagnóstico histórico somente leitura do Guardião de 31/08 às 01:17:48, horário de
Brasília, encontrou três slots completos, uma origem de provedor e três grupos
monitorados. O quórum de duas origens independentes não foi atingido nesse
contrato, que ainda é o da versão instalada. A nova decisão local por três
agentes substitui a exigência de origens distintas somente no candidato em
validação; adicionar uma segunda origem não é requisito do novo plano.
Configuração não equivale a votos reais: nenhum provedor foi chamado e nenhuma
moderação foi executada nesse diagnóstico. Mídia sem legenda permanece para
revisão manual. O confronto com respostas humanas é somente agregado e sanitizado,
não uma avaliação semântica. IA real, entrega no WhatsApp e aceite operacional
acompanhado continuam pendentes; etiquetas e Melhor Envio real permanecem fora
do escopo.

O candidato anterior e seu pacote de 375 arquivos e 114.552.419 bytes foram
aprovados localmente em 30/08. A reconstrução daquele pacote permaneceu
idêntica, sem estado operacional nem dependências instaladas incluídos. A nova
versão, agora com o reparo de conexão, passou novos integrais local e Linux,
teve o pacote reproduzido e foi instalada em 31/08 às 02:52:31 de Brasília.
A conexão do runtime, a continuidade posterior e a checagem final foram aceitas.
O aceite daquela publicação não valida o candidato posterior do Guardião nem
a nova edição do portal. Cada edição possui seu próprio instante final,
manifesto, gates e evidência de publicação no log interno.

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
do `PROGRESS.md`, e por `npm run summary:verify`, que limita a 500 palavras
somadas as seções “Onde estamos agora” e “Para onde vamos”. O build da Vercel
usa `npm run deploy:check`, porque a fonte operacional deliberadamente não é
enviada ao repositório público; esse gate remoto também executa
`summary:verify`.

Os testes usam `node:test` e validam contagem, fonte canônica crescente,
apresentação decrescente, horários com evidência, sanitização, narrativa,
limite editorial, acessibilidade estrutural, mobile first, metadados sociais,
configuração Vercel e cabeçalhos de segurança.

O limite editorial usa o contrato determinístico `pt-BR-unicode-v1`: normaliza
o texto em NFC e conta palavras com a expressão Unicode registrada no
verificador. O texto estático visível de `#inicio` e `#direcao` é somado ao
roadmap exatamente como aparece — número, prioridade, título, descrição,
“Responsável”, responsável, “Gate” e gate. Tags, atributos e comentários não
entram na contagem. O parser HTML5 versionado `parse5` monta a árvore real,
reconhece IDs com aspas, sem aspas e referências de caractere conforme o padrão,
e aplica a recuperação normativa de comentários e texto bruto. Assim,
`</section>` textual em atributo ou `script` não encerra a seção; conteúdo de
`script`, `style` e `template` não conta. O limite é inclusivo: 500 passa e 501
reprova. Contrato, limite, IDs e contagem aferida ficam em `publicSummary` no
manifesto.

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
   constante renovada. O registro 79 mantém `2026-08-30T09:34:04-03:00` e o
   registro 80 conserva `2026-08-30T19:36:19-03:00`, o registro 81 conserva
   `2026-08-31T03:19:54-03:00` e o registro 82 conserva
   `2026-08-31T07:38:02-03:00`; o registro 83 conserva
   `2026-09-01T13:02:26-03:00`, o registro 84 conserva
   `2026-09-01T20:34:50-03:00` e o registro 85 conserva
   `2026-09-01T21:49:28-03:00`, o registro 86 conserva
   `2026-09-01T23:56:17-03:00` e o registro 87 mantém
   `2026-09-02T09:20:43-03:00`.
4. Preserve a fonte canônica em ordem crescente e a ordem documental dentro do
   mesmo dia; a interface inverte uma cópia para mostrar o registro mais recente
   primeiro.
5. Só preencha `time` quando houver evidência documental.
6. Atualize as métricas apenas quando o estado correspondente tiver sido comprovado.
7. Mantenha `#inicio` e `#direcao`, incluindo o roadmap renderizado, em no
   máximo 500 palavras somadas. Execute `npm run summary:verify` e atualize a
   contagem declarada em `publicSummary` sem mudar o contrato, o limite ou os IDs.
8. Depois que o `PROGRESS.md` raiz estiver final, atualize digest, contagem,
   último cabeçalho e `synchronizedAt` em `sync/progress-source.json`. O valor de
   `synchronizedAt` deve ser exatamente o mesmo de `reportMeta.updatedAtIso`.
9. Registre a mudança em `progress.md` e revise `techinical_referrence.md`.
10. Execute `npm run check`, envie `main` e confirme no conteúdo servido que a
   data, o horário e o rótulo de Brasília correspondem ao instante publicado,
   além do deploy `Ready` e HTTP 200.

Se `progress:verify` ou `summary:verify` acusar divergência, a tarefa não está
concluída. O histórico bruto nunca deve ser copiado para o portal para contornar
os gates.

## Estrutura

```text
sentinelzap-progresso/
├── public/                    # marca, favicon, robots e sitemap
├── src/
│   ├── data.js                # conteúdo sanitizado e métricas
│   ├── main.js                # renderização, busca, filtros e impressão
│   └── styles.css             # sistema visual mobile first
├── scripts/
│   ├── verify-progress-sync.mjs # prova local de sincronização
│   └── verify-public-summary-limit.mjs # limite executivo reproduzível
├── sync/
│   └── progress-source.json   # digest e metadados não sensíveis da fonte
├── test/                      # testes node:test
├── index.html                 # documento e metadados
├── vercel.json                # deploy e cabeçalhos de segurança
├── progress.md                # log cumulativo deste portal
└── techinical_referrence.md   # referência técnica vigente
```
