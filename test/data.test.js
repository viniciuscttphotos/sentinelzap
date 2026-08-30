import assert from 'node:assert/strict';
import test from 'node:test';

import {
  executiveMetrics,
  progressEntries,
  reportMeta,
  roadmap,
} from '../src/data.js';

test('publica os 80 registros documentais sincronizados', () => {
  assert.equal(reportMeta.sourceRecords, 79);
  assert.equal(reportMeta.publishedRecords, 80);
  assert.equal(progressEntries.length, 80);
  assert.equal(progressEntries.at(-1).date, '2026-08-30');
  assert.equal(
    progressEntries.at(-1).title,
    'Retomada adversarial da confiabilidade e delimitação das evidências',
  );
});

test('fixa a última atualização em horário de Brasília sem depender do navegador', () => {
  const match = reportMeta.updatedAtIso.match(
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:Z|[+-]\d{2}:\d{2})$/,
  );
  assert.ok(match);
  assert.equal(reportMeta.timeZone, 'America/Sao_Paulo');
  assert.equal(reportMeta.timeZoneLabel, 'horário de Brasília');
  assert.match(
    reportMeta.updatedAtLabel,
    /^30 de agosto de 2026 às \d{2}:\d{2}:\d{2} \(horário de Brasília\)$/,
  );
  assert.ok(reportMeta.updatedAtLabel.includes(reportMeta.updatedAtIso.slice(11, 19)));

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZone: reportMeta.timeZone,
    })
      .formatToParts(new Date(reportMeta.updatedAtIso))
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, value]),
  );
  assert.equal(
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`,
    match[1],
  );

  const latestRecord = progressEntries.at(-1);
  assert.equal(latestRecord.publishedAt, reportMeta.updatedAtIso);
  assert.equal(latestRecord.date, reportMeta.updatedAtIso.slice(0, 10));
  assert.equal(progressEntries.filter(({ publishedAt }) => publishedAt).length, 2);
  const priorPublication = progressEntries.find(({ sequence }) => sequence === 79);
  assert.equal(priorPublication.publishedAt, '2026-08-30T09:34:04-03:00');
  assert.notEqual(priorPublication.publishedAt, reportMeta.updatedAtIso);
});

test('preserva a distribuição documental por data', () => {
  const expected = {
    '2026-08-15': 3,
    '2026-08-18': 14,
    '2026-08-19': 27,
    '2026-08-20': 6,
    '2026-08-21': 1,
    '2026-08-22': 2,
    '2026-08-23': 2,
    '2026-08-24': 4,
    '2026-08-25': 2,
    '2026-08-26': 5,
    '2026-08-27': 6,
    '2026-08-29': 5,
    '2026-08-30': 3,
  };
  const actual = progressEntries.reduce((counts, { date }) => {
    counts[date] = (counts[date] ?? 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(actual, expected);
});

test('mantém sequência única e cronologia crescente', () => {
  const dates = progressEntries.map(({ date }) => date);
  assert.deepEqual(dates, [...dates].sort());
  assert.deepEqual(
    progressEntries.map(({ sequence }) => sequence),
    Array.from({ length: 80 }, (_, index) => index + 1),
  );
  assert.equal(new Set(progressEntries.map(({ id }) => id)).size, 80);
});

test('só apresenta os horários respaldados por evidência', () => {
  const actual = progressEntries.filter(({ time }) => time).map(({ date, time }) => `${date}|${time}`);
  assert.deepEqual(actual, [
    '2026-08-18|22:25:57 UTC',
    '2026-08-19|03:08:17 UTC',
    '2026-08-19|05:22:55 UTC',
    '2026-08-19|16:06:48–16:06:52 UTC',
    '2026-08-19|20:49 UTC',
    '2026-08-19|21:06 UTC',
    '2026-08-20|12:08 UTC',
    '2026-08-25|18:38:58 UTC',
    '2026-08-26|13:50:18 BRT',
  ]);
});

test('ordena horários comprovados dentro de cada data', () => {
  for (const rows of Object.values(Object.groupBy(progressEntries, ({ date }) => date))) {
    const times = rows
      .filter(({ time }) => time && /^\d{2}:\d{2}(?::\d{2})? UTC$/.test(time))
      .map(({ time }) => time.replace(' UTC', ''));
    assert.deepEqual(times, [...times].sort());
  }
});

test('distingue o candidato local, o release vigente e o estado das contas', () => {
  const candidateMetric = executiveMetrics.find(({ value }) => value === '1.058 / 1.053');
  const campaignMetric = executiveMetrics.find(({ value }) => value === '160.000');
  const releaseMetric = executiveMetrics.find(({ value }) => value === '772 / 768');
  const scriptedMetric = executiveMetrics.find(({ value }) => value === '240 + 240');
  const generationMetric = executiveMetrics.find(({ value }) => value === '30 / 160');
  const crmMetric = executiveMetrics.find(({ value }) => value === '96 + 40');
  assert.match(candidateMetric.note, /Suíte local.*1\.059 testes.*1\.058 aprovados/i);
  assert.match(candidateMetric.note, /Cópia descartável do pacote.*1\.054 testes.*1\.053 aprovados.*Ambas.*zero falhas.*skip ambiental esperado.*macOS/i);
  assert.match(campaignMetric.note, /160\.000 de 160\.000 casos aprovados/i);
  assert.match(campaignMetric.note, /40 produtos.*4\.000 casos.*20 famílias.*não equivale.*modelo.*real/i);
  assert.match(releaseMetric.note, /produção.*29\/08.*772 testes locais.*768.*Linux/i);
  assert.match(releaseMetric.note, /aceite.*cinco contas.*14 snapshots/i);
  assert.match(scriptedMetric.note, /240 turnos.*roteirizados.*240 falhas.*não são conversas livres/i);
  assert.match(generationMetric.note, /30 turnos.*160 chamadas.*simuladas.*casos isolados.*Nenhuma chamada real/i);
  assert.match(crmMetric.note, /24 formulários.*20 exercitados.*quatro logísticos excluídos.*VM.*sem navegador real/i);

  const releaseRecord = progressEntries.find(({ date, title }) =>
    date === '2026-08-24' && title.startsWith('Push concluído'),
  );
  const candidateRecord = progressEntries.find(({ date, title }) =>
    date === '2026-08-26' && title.startsWith('Recuperação idempotente'),
  );
  assert.equal(releaseRecord.context, 'Produção');
  assert.equal(candidateRecord.context, 'Produção');
  assert.equal(candidateRecord.state, 'Publicado');
  assert.equal(
    candidateRecord.title,
    'Recuperação idempotente do texto do histórico e varredura resiliente (publicada)',
  );
  assert.match(candidateRecord.result, /ação humana autenticada/i);

  const orderMoveRecord = progressEntries.find(({ date, title }) =>
    date === '2026-08-26' && title.startsWith('Confirmação detalhada'),
  );
  assert.equal(orderMoveRecord.context, 'Produção');
  assert.equal(orderMoveRecord.state, 'Publicado');
  assert.match(orderMoveRecord.validation, /471\/471/);
  assert.match(orderMoveRecord.validation, /466\/466/);

  const assignmentRecord = progressEntries.find(({ date, title }) =>
    date === '2026-08-26' && title.startsWith('Configuração clara'),
  );
  assert.equal(assignmentRecord.context, 'Produção');
  assert.equal(assignmentRecord.state, 'Publicado');
  assert.match(assignmentRecord.summary, /comissão por indicação/i);
  assert.match(assignmentRecord.result, /papéis continuam distintos/i);
  assert.match(assignmentRecord.validation, /472\/472/);
  assert.match(assignmentRecord.validation, /467\/467/);

  const qaRecord = progressEntries.find(({ title }) => title.startsWith('Auditoria integral do CRM'));
  assert.equal(qaRecord.context, 'Local');
  assert.equal(qaRecord.state, 'Validado');
  assert.match(qaRecord.result, /aguardando autorização de push/i);
  assert.match(qaRecord.validation, /527\/527/);
  assert.match(qaRecord.validation, /526\/526/);

  const deployedQaRecord = progressEntries.find(({ title }) =>
    title.startsWith('Push da auditoria integral do CRM, migração segura'),
  );
  assert.equal(deployedQaRecord.context, 'Produção');
  assert.equal(deployedQaRecord.state, 'Publicado');
  assert.match(deployedQaRecord.summary, /paginaç[aã]o/i);
  assert.match(deployedQaRecord.result, /métricas derivadas/i);
  assert.match(deployedQaRecord.validation, /533\/533/);
  assert.match(deployedQaRecord.validation, /528\/528/);

  const historyCorrectionRecord = progressEntries.find(({ title }) =>
    title.startsWith('Correção local da recuperação histórica'),
  );
  assert.equal(historyCorrectionRecord.context, 'Local');
  assert.equal(historyCorrectionRecord.state, 'Validado');
  assert.match(historyCorrectionRecord.summary, /varredura automática/i);
  assert.match(historyCorrectionRecord.result, /aguarda autorização de push/i);
  assert.match(historyCorrectionRecord.validation, /537\/537/);

  const deployedHistoryRecord = progressEntries.find(({ title }) =>
    title === 'Push da correção da recuperação histórica e do salvamento comercial'
  );
  assert.equal(deployedHistoryRecord.context, 'Produção');
  assert.equal(deployedHistoryRecord.state, 'Publicado');
  assert.match(deployedHistoryRecord.summary, /botão explícito/i);
  assert.match(deployedHistoryRecord.result, /ainda não executada/i);
  assert.match(deployedHistoryRecord.validation, /537\/537/);
  assert.match(deployedHistoryRecord.validation, /532\/532/);
  assert.match(deployedHistoryRecord.validation, /sete snapshots/i);

  const cronCandidateRecord = progressEntries.find(({ title }) =>
    title === 'Correção local do atraso do node-cron (aguardando push)'
  );
  assert.equal(cronCandidateRecord.context, 'Local');
  assert.equal(cronCandidateRecord.kind, 'Implementação');
  assert.equal(cronCandidateRecord.state, 'Validado');
  assert.match(cronCandidateRecord.summary, /três avisos.*8,7 segundos/i);
  assert.match(cronCandidateRecord.result, /lote atômico/i);
  assert.match(cronCandidateRecord.result, /cinco jobs.*single-flight.*noOverlap.*catch-up/i);
  assert.match(cronCandidateRecord.result, /uma recuperação pesada/i);
  assert.match(cronCandidateRecord.validation, /545\/545/);
  assert.match(cronCandidateRecord.validation, /produção permanece inalterada/i);

  const cronReleaseRecord = progressEntries.find(({ title }) =>
    title === 'Push da resiliência do node-cron e retomada serial da recuperação histórica'
  );
  assert.equal(cronReleaseRecord.context, 'Produção');
  assert.equal(cronReleaseRecord.kind, 'Implantação');
  assert.equal(cronReleaseRecord.state, 'Publicado');
  assert.equal(
    cronReleaseRecord.title,
    'Push da resiliência do node-cron e retomada serial da recuperação histórica',
  );
  assert.match(cronReleaseRecord.summary, /agendador.*salvamento comercial atômico/i);
  assert.match(cronReleaseRecord.result, /primeira recuperação.*ainda estava ativa/i);
  assert.match(cronReleaseRecord.result, /controle manual do usuário autenticado/i);
  assert.match(cronReleaseRecord.result, /automação temporária excluída/i);
  assert.match(cronReleaseRecord.validation, /545\/545/);
  assert.match(cronReleaseRecord.validation, /540\/540/);
  assert.match(cronReleaseRecord.validation, /nove snapshots/i);

  const qrReleaseRecord = progressEntries.find(({ title }) =>
    title === 'Push da correção do QR da quarta conta CRM'
  );
  assert.equal(qrReleaseRecord.context, 'Produção');
  assert.equal(qrReleaseRecord.kind, 'Implantação');
  assert.equal(qrReleaseRecord.state, 'Publicado');
  assert.equal(qrReleaseRecord.title, 'Push da correção do QR da quarta conta CRM');
  assert.match(qrReleaseRecord.summary, /corrida.*inicialização.*reconexão/i);
  assert.match(qrReleaseRecord.summary, /single-flight/i);
  assert.match(qrReleaseRecord.result, /QR.*disponível.*leitura manual/i);
  assert.match(qrReleaseRecord.result, /sem logout.*exclusão de sessão/i);
  assert.match(qrReleaseRecord.validation, /52\/52/);
  assert.match(qrReleaseRecord.validation, /561\/561/);
  assert.match(qrReleaseRecord.validation, /556\/556/);
  assert.match(qrReleaseRecord.validation, /12 snapshots/i);
  assert.match(qrReleaseRecord.validation, /serviço.*API.*banco.*backups.*restauração.*TLS/i);

  const semaxRecord = progressEntries.find(({ date, title }) =>
    date === '2026-08-25' && title.startsWith('Semax'),
  );
  assert.match(semaxRecord.validation, /462\/462/);

  const logisticsPlanningRecord = progressEntries.find(({ title }) =>
    title === 'Abertura da fase Melhor Envio e logística manual (planejamento local)'
  );
  assert.equal(logisticsPlanningRecord.context, 'Documentação');
  assert.equal(logisticsPlanningRecord.kind, 'Planejamento');
  assert.equal(logisticsPlanningRecord.state, 'Planejado');
  assert.match(logisticsPlanningRecord.summary, /frete padrão de R\$ 50/i);
  assert.match(logisticsPlanningRecord.summary, /acima de R\$ 1\.500/i);
  assert.match(logisticsPlanningRecord.summary, /motoboy manual de R\$ 150/i);
  assert.match(logisticsPlanningRecord.summary, /até 12h/i);
  assert.match(logisticsPlanningRecord.result, /30 × 20 × 15 cm.*900 g/i);
  assert.match(logisticsPlanningRecord.result, /escolha humana da cotação/i);
  assert.match(logisticsPlanningRecord.validation, /não houve edição de código/i);
  assert.match(logisticsPlanningRecord.validation, /mutação em produção/i);

  const paymentShortcutRecord = progressEntries.find(({ title }) =>
    title === 'Atalho de confirmação manual na aba Pedidos (local, aguardando push)'
  );
  assert.equal(paymentShortcutRecord.context, 'Local');
  assert.equal(paymentShortcutRecord.kind, 'Implementação');
  assert.equal(paymentShortcutRecord.state, 'Validado');
  assert.match(paymentShortcutRecord.summary, /aba Pedidos.*confirmação manual de pagamento/i);
  assert.match(paymentShortcutRecord.summary, /criação do pedido.*separada/i);
  assert.match(paymentShortcutRecord.result, /aguardando pagamento.*saldo positivo/i);
  assert.match(paymentShortcutRecord.result, /quitados.*cancelados.*sem saldo.*não exibem/i);
  assert.match(paymentShortcutRecord.result, /sem nova rota ou automação financeira/i);
  assert.match(paymentShortcutRecord.validation, /641\/641 testes locais/i);
  assert.match(paymentShortcutRecord.validation, /aguarda um push isolado/i);
  assert.match(paymentShortcutRecord.validation, /produção foi alterado/i);

  const approvalCustomerRecord = progressEntries.find(({ title }) =>
    title === 'Nome do cliente nas Aprovações (local, aguardando push)'
  );
  assert.equal(approvalCustomerRecord.context, 'Local');
  assert.equal(approvalCustomerRecord.kind, 'Implementação');
  assert.equal(approvalCustomerRecord.state, 'Validado');
  assert.match(approvalCustomerRecord.summary, /Aprovações.*cliente.*lista.*detalhe.*modal/i);
  assert.match(approvalCustomerRecord.summary, /primeira página de contatos/i);
  assert.match(approvalCustomerRecord.result, /consulta mínima.*autorizada.*escopo da conta/i);
  assert.match(approvalCustomerRecord.result, /cache separado.*resultados concorrentes/i);
  assert.match(approvalCustomerRecord.result, /fallback neutro.*não há nome cadastrado/i);
  assert.match(approvalCustomerRecord.validation, /659\/659 testes locais/i);
  assert.match(approvalCustomerRecord.validation, /dois?.*hotfix|Este hotfix.*atalho de pagamento/i);
  assert.match(approvalCustomerRecord.validation, /candidatos locais.*push isolado/i);
  assert.match(approvalCustomerRecord.validation, /VPS operacional permaneceu intocada/i);

  const logisticsImplementationRecord = progressEntries.find(({ title }) =>
    title === 'Fundação logística Melhor Envio e motoboy concluída localmente'
  );
  assert.equal(
    logisticsImplementationRecord.title,
    'Fundação logística Melhor Envio e motoboy concluída localmente',
  );
  assert.equal(logisticsImplementationRecord.context, 'Local');
  assert.equal(logisticsImplementationRecord.kind, 'Implementação');
  assert.equal(logisticsImplementationRecord.state, 'Validado');
  assert.match(logisticsImplementationRecord.summary, /fundação logística.*concluída localmente/i);
  assert.match(logisticsImplementationRecord.summary, /cotação.*escolha humana.*compra explícita/i);
  assert.match(logisticsImplementationRecord.summary, /motoboy manual/i);
  assert.match(logisticsImplementationRecord.result, /recuperação consultiva.*descarte.*revisão auditável/i);
  assert.match(logisticsImplementationRecord.result, /sandbox.*push explícito/i);
  assert.match(logisticsImplementationRecord.validation, /199\/199.*480\/480.*20\/20/i);
  assert.match(logisticsImplementationRecord.validation, /699\/699/i);
  assert.match(logisticsImplementationRecord.validation, /nenhum provedor.*ambiente operacional foi alterado/i);

  const sandboxReleaseRecord = progressEntries.find(({ title }) =>
    title === 'Sandbox logístico instalado na VPS e ativação interrompida de forma segura'
  );
  assert.equal(
    sandboxReleaseRecord.title,
    'Sandbox logístico instalado na VPS e ativação interrompida de forma segura',
  );
  assert.equal(sandboxReleaseRecord.context, 'Produção');
  assert.equal(sandboxReleaseRecord.kind, 'Implantação');
  assert.equal(sandboxReleaseRecord.state, 'Publicado');
  assert.match(sandboxReleaseRecord.summary, /Sandbox-only.*desativada.*sem credenciais.*chamadas externas/i);
  assert.match(sandboxReleaseRecord.summary, /Pedidos.*Aprovações.*cards CBL/i);
  assert.match(sandboxReleaseRecord.result, /cinco contas conectadas.*estado protegido/i);
  assert.match(sandboxReleaseRecord.result, /OAuth.*Jadlog.*smoke.*API real.*não foram executados/i);
  assert.match(sandboxReleaseRecord.result, /dois hardenings.*apenas locais/i);
  assert.match(sandboxReleaseRecord.validation, /772 testes locais.*sem falhas.*skip esperado/i);
  assert.match(sandboxReleaseRecord.validation, /768\/768.*Linux/i);
  assert.match(sandboxReleaseRecord.validation, /backup.*restauração.*TLS.*14 snapshots/i);
  assert.match(sandboxReleaseRecord.validation, /10\/10 focados.*integral.*interrompida.*não constitui gate verde/i);

  const reliabilityCandidateRecord = progressEntries.find(
    ({ title }) => title === 'Força-tarefa de confiabilidade concluída localmente (aguardando push)',
  );
  assert.equal(
    reliabilityCandidateRecord.title,
    'Força-tarefa de confiabilidade concluída localmente (aguardando push)',
  );
  assert.equal(reliabilityCandidateRecord.context, 'Local');
  assert.equal(reliabilityCandidateRecord.kind, 'Implementação');
  assert.equal(reliabilityCandidateRecord.state, 'Validado');
  assert.match(reliabilityCandidateRecord.summary, /Guardião IA.*fila durável.*confirmação idempotente/i);
  assert.match(reliabilityCandidateRecord.summary, /cliente.*pedido.*pagamento manual/i);
  assert.match(reliabilityCandidateRecord.result, /148\.000 abordagens de produto.*37 produtos.*4\.000 formulações/i);
  assert.match(reliabilityCandidateRecord.result, /Separadamente.*robô-a-robô.*111\/111 turnos.*respostas humanas.*agregada.*sanitizada/i);
  assert.match(reliabilityCandidateRecord.result, /Etiquetas.*integração logística real.*fora/i);
  assert.match(reliabilityCandidateRecord.result, /21 combinações.*sem arte exata.*indisponibilidade segura/i);
  assert.match(reliabilityCandidateRecord.validation, /936 testes.*935 aprovados.*um skip esperado.*sem falhas/i);
  assert.match(reliabilityCandidateRecord.validation, /370 arquivos.*114\.395\.897 bytes/i);
  assert.match(reliabilityCandidateRecord.validation, /931 testes.*930 aprovados.*um skip esperado.*zero falhas/i);
  assert.match(reliabilityCandidateRecord.validation, /cinco contratos do empacotador.*fora do payload/i);
  assert.match(reliabilityCandidateRecord.validation, /não iniciou WhatsApp.*Chrome.*aplicação.*rede externa.*dados pessoais/i);
  assert.match(reliabilityCandidateRecord.validation, /permanece local.*nenhum push do candidato para a VPS.*runtime de produção/i);
  assert.match(reliabilityCandidateRecord.validation, /Retificação posterior.*combinações determinísticas.*roteiros fixos.*sem LLM real.*semântica.*respostas humanas/i);
  assert.match(reliabilityCandidateRecord.validation, /aceite deste ciclo anterior não valida as alterações atuais/i);

  const timestampGovernanceRecord = progressEntries.find(({ sequence }) => sequence === 79);
  assert.equal(
    timestampGovernanceRecord.title,
    'Horário de Brasília tornado obrigatório na prestação de contas',
  );
  assert.equal(timestampGovernanceRecord.context, 'Documentação');
  assert.equal(timestampGovernanceRecord.kind, 'Governança');
  assert.equal(timestampGovernanceRecord.state, 'Publicado');
  assert.match(timestampGovernanceRecord.summary, /data.*horário.*Brasília.*fuso.*navegador/i);
  assert.match(timestampGovernanceRecord.result, /Hero.*nota executiva.*rodapé/i);
  assert.match(timestampGovernanceRecord.validation, /ISO.*-03:00.*America\/Sao_Paulo.*manifesto/i);
});

test('reauditoria delimita evidência offline, limites humanos e ausência de novo push', () => {
  const record = progressEntries.at(-1);
  assert.equal(record.context, 'Local');
  assert.equal(record.kind, 'Reauditoria');
  assert.equal(record.state, 'Validado');
  assert.match(record.summary, /cópia descartável do pacote.*aprovadas em ambiente local e isolado.*sem alterar a produção.*aceite operacional/i);
  assert.match(record.result, /160\.000 casos combinatórios offline.*40 produtos.*4\.000 casos.*20 famílias/i);
  assert.match(record.result, /240 turnos fixos.*240 falhas injetadas.*30 turnos.*160 chamadas.*simulado.*casos isolados/i);
  assert.match(record.result, /96 botões estáticos.*40 templates dinâmicos.*24 formulários.*20.*exercitados.*quatro.*excluídos/i);
  assert.match(record.result, /máquina virtual de testes \(VM\).*não é QA em navegador real/i);
  assert.match(record.result, /20 combinações.*sem arte exata/i);
  assert.match(record.result, /carregamento inconsistente de configuração.*quórum insuficiente/i);
  assert.match(record.result, /mídia sem legenda.*revisão manual/i);
  assert.match(record.validation, /integral local aprovada.*1\.059 testes concluídos.*1\.058 aprovados.*zero falhas.*skip ambiental esperado.*macOS/i);
  assert.match(record.validation, /2\.147 arquivos operacionais.*código de origem e da cópia.*idênticos antes e depois/i);
  assert.match(record.validation, /375 arquivos.*114\.552\.419 bytes.*aprovado em cópia descartável.*1\.054 testes.*1\.053 aprovados.*zero falhas.*skip esperado/i);
  assert.match(record.validation, /cinco testes do empacotador ficam fora por desenho/i);
  assert.match(record.validation, /novamente 160\.000 de 160\.000 casos na cópia/i);
  assert.match(record.validation, /não usa LLM real nem WhatsApp/i);
  assert.match(record.validation, /somente agregado.*não uma avaliação semântica/i);
  assert.match(record.validation, /produção de 29\/08 não foi alterada.*push.*pendente/i);
  assert.match(record.validation, /gates do Linux de destino ainda por executar/i);
});

test('cada registro traz prestação de contas completa', () => {
  const allowedContexts = new Set(['Local', 'Produção', 'Documentação']);
  for (const record of progressEntries) {
    assert.match(record.date, /^2026-08-\d{2}$/);
    assert.ok(record.title.length >= 12);
    assert.ok(record.summary.length >= 70);
    assert.ok(record.result.length >= 45);
    assert.ok(record.validation.length >= 20);
    assert.ok(record.tags.length >= 2);
    assert.ok(allowedContexts.has(record.context));
    assert.ok(record.kind);
    assert.ok(record.state);
  }
});

test('conteúdo público não contém indicadores sensíveis ou exploráveis', () => {
  const publicData = JSON.stringify({ reportMeta, executiveMetrics, roadmap, progressEntries });
  const forbidden = [
    { label: 'IPv4', pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/ },
    { label: 'telefone longo', pattern: /\b\d{10,15}\b/ },
    { label: 'hash longo', pattern: /\b[a-f0-9]{40,}\b/i },
    { label: 'caminho operacional', pattern: /(?:\/opt\/|\/Users\/|\.ssh\/|file:\/\/)/i },
    { label: 'identificador interno', pattern: /(?:assignedSellerId|accountId|externalId|orderId|skuId|trackingCode|customerCpf|shippingAddress|@lid|@c\.us)/i },
    { label: 'credencial em URL', pattern: /https?:\/\/[^\s"/]+:[^\s"@]+@/i },
  ];
  for (const { label, pattern } of forbidden) {
    assert.doesNotMatch(publicData, pattern, `encontrado: ${label}`);
  }
});

test('roadmap preserva os gates humanos, logísticos e externos vigentes', () => {
  assert.equal(roadmap.length, 7);
  const roadmapText = roadmap.map((item) => Object.values(item).join(' ')).join(' ');
  assert.match(roadmapText, /credenciais iniciais/i);
  assert.match(roadmapText, /vendedora real/i);
  assert.match(roadmapText, /alerta externo/i);
  assert.match(roadmapText, /usuário autenticado/i);
  assert.match(roadmapText, /prestação de contas sincronizada/i);
  assert.match(roadmapText, /candidato local.*pedido explícito de push/i);
  assert.match(roadmapText, /etiquetas.*integração logística real.*fora do escopo/i);
  assert.match(roadmapText, /20 combinações.*sem arte exata/i);
  assert.match(roadmapText, /recuperação histórica.*moderação.*conversação.*cards/i);
  assert.match(roadmapText, /quórum insuficiente.*IA real.*comparação semântica humana/i);
});
