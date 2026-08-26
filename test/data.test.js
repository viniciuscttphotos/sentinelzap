import assert from 'node:assert/strict';
import test from 'node:test';

import {
  executiveMetrics,
  progressEntries,
  reportMeta,
  roadmap,
} from '../src/data.js';

test('publica os 65 registros documentais sincronizados', () => {
  assert.equal(reportMeta.sourceRecords, 64);
  assert.equal(reportMeta.publishedRecords, 65);
  assert.equal(progressEntries.length, 65);
  assert.equal(progressEntries.at(-1).date, '2026-08-26');
  assert.equal(
    progressEntries.at(-1).title,
    'Configuração clara de vendedora e indicador (publicada)',
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
    '2026-08-26': 4,
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
    Array.from({ length: 65 }, (_, index) => index + 1),
  );
  assert.equal(new Set(progressEntries.map(({ id }) => id)).size, 65);
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

test('reflete o release vigente e suas validações local e Linux', () => {
  const localMetric = executiveMetrics.find(({ value }) => value === '472/472');
  const linuxMetric = executiveMetrics.find(({ value }) => value === '467/467');
  assert.match(localMetric.note, /release vigente/i);
  assert.match(linuxMetric.note, /pacote isolado/i);

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

  const assignmentRecord = progressEntries.at(-1);
  assert.equal(assignmentRecord.context, 'Produção');
  assert.equal(assignmentRecord.state, 'Publicado');
  assert.match(assignmentRecord.summary, /comissão por indicação/i);
  assert.match(assignmentRecord.result, /papéis continuam distintos/i);
  assert.match(assignmentRecord.validation, /472\/472/);
  assert.match(assignmentRecord.validation, /467\/467/);

  const semaxRecord = progressEntries.find(({ date, title }) =>
    date === '2026-08-25' && title.startsWith('Semax'),
  );
  assert.match(semaxRecord.validation, /462\/462/);
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

test('roadmap preserva os gates humanos e externos vigentes', () => {
  assert.equal(roadmap.length, 5);
  const roadmapText = roadmap.map((item) => Object.values(item).join(' ')).join(' ');
  assert.match(roadmapText, /credenciais iniciais/i);
  assert.match(roadmapText, /vendedora real/i);
  assert.match(roadmapText, /alerta externo/i);
  assert.match(roadmapText, /sessão técnica autenticada/i);
  assert.match(roadmapText, /prestação de contas sincronizada/i);
});
