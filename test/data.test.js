import assert from 'node:assert/strict';
import test from 'node:test';

import {
  executiveMetrics,
  progressEntries,
  reportMeta,
  roadmap,
} from '../src/data.js';

test('publica os 76 registros documentais sincronizados', () => {
  assert.equal(reportMeta.sourceRecords, 75);
  assert.equal(reportMeta.publishedRecords, 76);
  assert.equal(progressEntries.length, 76);
  assert.equal(progressEntries.at(-1).date, '2026-08-29');
  assert.equal(
    progressEntries.at(-1).title,
    'Fundação logística Melhor Envio e motoboy concluída localmente',
  );
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
    '2026-08-29': 4,
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
    Array.from({ length: 76 }, (_, index) => index + 1),
  );
  assert.equal(new Set(progressEntries.map(({ id }) => id)).size, 76);
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

test('distingue o release vigente, o pacote Linux e o estado das contas', () => {
  const localMetric = executiveMetrics.find(({ value }) => value === '561/561');
  const linuxMetric = executiveMetrics.find(({ value }) => value === '556/556');
  const accountsMetric = executiveMetrics.find(({ value }) => value === '4 + 1 QR');
  const snapshotsMetric = executiveMetrics.find(({ value }) => value === '12');
  assert.match(localMetric.note, /release.*publicado/i);
  assert.match(linuxMetric.note, /staging Linux.*push/i);
  assert.match(accountsMetric.note, /principal.*gerenciadas.*quinta.*QR/i);
  assert.match(snapshotsMetric.label, /snapshots reais/i);

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

  const logisticsImplementationRecord = progressEntries.at(-1);
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
  assert.equal(roadmap.length, 6);
  const roadmapText = roadmap.map((item) => Object.values(item).join(' ')).join(' ');
  assert.match(roadmapText, /credenciais iniciais/i);
  assert.match(roadmapText, /vendedora real/i);
  assert.match(roadmapText, /alerta externo/i);
  assert.match(roadmapText, /usuário autenticado/i);
  assert.match(roadmapText, /conta CRM adicional/i);
  assert.match(roadmapText, /escanear manualmente.*QR já disponível/i);
  assert.match(roadmapText, /sem automação de acompanhamento/i);
  assert.match(roadmapText, /prestação de contas sincronizada/i);
  assert.match(roadmapText, /fundação logística validada/i);
  assert.match(roadmapText, /sandbox/i);
  assert.match(roadmapText, /configuração fiscal.*armazenamento privado.*webhook.*autorização.*conciliação/i);
  assert.match(roadmapText, /push explícito antes de produção/i);
});
