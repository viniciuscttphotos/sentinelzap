import assert from 'node:assert/strict';
import test from 'node:test';

import {
  executiveMetrics,
  progressEntries,
  reportMeta,
  roadmap,
} from '../src/data.js';

test('prepara 92 registros separando validação local, produção e publicação documental', () => {
  assert.equal(reportMeta.sourceRecords, 91);
  assert.equal(reportMeta.publishedRecords, 92);
  assert.equal(progressEntries.length, 92);
  assert.equal(progressEntries.at(-1).date, '2026-09-04');
  assert.equal(reportMeta.productionReleaseDate, '4 de setembro de 2026');
  assert.equal(
    progressEntries.at(-1).title,
    'Ficha de clientes com telefone, endereços e conversas validada localmente',
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
    /^04\/09\/2026 às \d{2}:\d{2}:\d{2}, horário de Brasília$/,
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
  assert.equal(progressEntries.filter(({ publishedAt }) => publishedAt).length, 14);
  const priorPublication = progressEntries.find(({ sequence }) => sequence === 79);
  assert.equal(priorPublication.publishedAt, '2026-08-30T09:34:04-03:00');
  assert.notEqual(priorPublication.publishedAt, reportMeta.updatedAtIso);
  assert.equal(progressEntries.find(({ sequence }) => sequence === 80).publishedAt, '2026-08-30T19:36:19-03:00');
  assert.equal(progressEntries.find(({ sequence }) => sequence === 81).publishedAt, '2026-08-31T03:19:54-03:00');
  assert.equal(progressEntries.find(({ sequence }) => sequence === 82).publishedAt, '2026-08-31T07:38:02-03:00');
  assert.equal(progressEntries.find(({ sequence }) => sequence === 83).publishedAt, '2026-09-01T13:02:26-03:00');
  assert.notEqual(progressEntries.find(({ sequence }) => sequence === 83).publishedAt, reportMeta.updatedAtIso);
  assert.equal(progressEntries.find(({ sequence }) => sequence === 84).publishedAt, '2026-09-01T20:34:50-03:00');
  assert.notEqual(progressEntries.find(({ sequence }) => sequence === 84).publishedAt, reportMeta.updatedAtIso);
  assert.equal(progressEntries.find(({ sequence }) => sequence === 85).publishedAt, '2026-09-01T21:49:28-03:00');
  assert.notEqual(progressEntries.find(({ sequence }) => sequence === 85).publishedAt, reportMeta.updatedAtIso);
  assert.equal(progressEntries.find(({ sequence }) => sequence === 86).publishedAt, '2026-09-01T23:56:17-03:00');
  assert.notEqual(progressEntries.find(({ sequence }) => sequence === 86).publishedAt, reportMeta.updatedAtIso);
  assert.equal(progressEntries.find(({ sequence }) => sequence === 87).publishedAt, '2026-09-02T09:20:43-03:00');
  assert.equal(progressEntries.find(({ sequence }) => sequence === 88).publishedAt, '2026-09-02T15:45:58-03:00');
  assert.notEqual(progressEntries.find(({ sequence }) => sequence === 88).publishedAt, reportMeta.updatedAtIso);
  assert.equal(progressEntries.find(({ sequence }) => sequence === 89).publishedAt, '2026-09-04T14:52:02-03:00');
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
    '2026-08-31': 2,
    '2026-09-01': 4,
    '2026-09-02': 2,
    '2026-09-04': 4,
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
    Array.from({ length: 92 }, (_, index) => index + 1),
  );
  assert.equal(new Set(progressEntries.map(({ id }) => id)).size, 92);
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
  const candidateMetric = executiveMetrics.find(({ value }) => value === '1.157 / 1.152');
  const campaignMetric = executiveMetrics.find(({ value }) => value === '160.000');
  const releaseMetric = executiveMetrics.find(({ value }) => value === '772 / 768');
  const scriptedMetric = executiveMetrics.find(({ value }) => value === '240 + 240');
  const generationMetric = executiveMetrics.find(({ value }) => value === '30 / 160');
  const crmMetric = executiveMetrics.find(({ value }) => value === '96 + 40');
  assert.match(candidateMetric.note, /1\.157 testes locais.*1\.156 aprovações.*zero falhas.*skip esperado.*31\/08 às 02:37:42 de Brasília.*1\.152 de 1\.152 aprovados às 02:33:41/i);
  assert.match(candidateMetric.note, /1\.126 testes locais.*1\.121 no Linux.*antecedem.*reparo.*principal.*falhou em um contrato de telemetria.*duas suítes integrais.*Sete eventos.*214 de 214.*31 regressões/i);
  assert.match(candidateMetric.note, /novos integrais foram aprovados.*pacote foi instalado em 31\/08 às 02:52:31 de Brasília.*runtime foi aceito.*cinco contas conectadas em duas checagens.*backup posterior e restauração isolada confirmados.*checagem final às 03:16:04,129 de Brasília.*cinco contas conectadas, nenhuma varredura ou job ativo e zero reinícios automáticos/i);
  assert.match(campaignMetric.note, /aprovou 160\.000 de 160\.000 casos offline/i);
  assert.match(campaignMetric.note, /40 produtos.*4\.000 casos.*20 famílias.*não equivale.*modelo.*real/i);
  assert.match(campaignMetric.note, /novo candidato local.*160\.000 de 160\.000 casos offline em 1\.177,965 segundos/i);
  assert.match(campaignMetric.note, /444,109 segundos.*local.*63,956 segundos no Linux.*gates históricos não validam o novo candidato/i);
  assert.match(releaseMetric.note, /Release anterior.*29\/08.*772 testes locais.*768.*Linux/i);
  assert.match(releaseMetric.note, /aceite.*cinco contas.*14 snapshots/i);
  assert.match(releaseMetric.note, /runtime e a continuidade da versão instalada em 31\/08 foram aceitos.*16 snapshots e restauração posterior aprovada/i);
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
  const record = progressEntries.find(({ sequence }) => sequence === 80);
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

test('confronto dos cards preserva divergências e separa implantação de aceite operacional', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 81);
  assert.equal(record.context, 'Produção');
  assert.equal(record.state, 'Publicado');
  assert.match(record.summary, /13 seções.*oito seções faltantes à compilação.*complemento da seção existente de GHK-Cu.*18 fontes visuais.*90 imagens/i);
  assert.match(record.summary, /push.*explicitamente autorizado.*novos testes integrais foram aprovados.*pacote foi instalado em 31\/08 às 02:52:31 de Brasília.*runtime e a continuidade foram aceitos.*cinco contas conectadas.*16 snapshots.*restauração isolada aprovada.*03:16:04,129.*nenhuma varredura ou job ativo/i);
  assert.match(record.summary, /segunda checagem às 03:17:24,238 confirmou a mesma estabilidade, sem novo reinício/i);
  assert.match(record.result, /produto, apresentação e via exatos/i);
  assert.match(record.result, /Três cards.*divergências.*quatro seções bloqueadas/i);
  assert.match(record.result, /não é validação clínica.*dose individual/i);
  assert.match(record.result, /22 indisponibilidades.*20 anteriores.*NAD nasal não reconciliado.*dois bloqueios/i);
  assert.match(record.result, /técnicos Retatrutida 20 mg e Somatropina 240 UI.*bloqueado.*planos repetidos.*pedidos mistos.*apresentações, preços e imagens originais.*preservados/i);
  assert.match(record.result, /nenhuma imagem foi fabricada/i);
  assert.match(record.validation, /local concluído às 01:36:02.*1\.126 testes.*1\.125 aprovações.*zero falhas.*skip esperado.*Linux concluído às 01:29:45.*1\.121 de 1\.121 aprovados/i);
  assert.match(record.validation, /Ambos aprovaram 160\.000 casos offline/i);
  assert.match(record.validation, /206 de 206 testes focais.*falhou em um contrato de telemetria nas duas suítes integrais, local e Linux/i);
  assert.match(record.validation, /sete eventos operacionais anteriores foram restaurados.*comportamento real do registrador/i);
  assert.match(record.validation, /214 de 214 testes.*31 regressões da conta principal.*revisão independente.*congelamento formal ocorreu às 02:26:08, horário de Brasília/i);
  assert.match(record.validation, /novos integrais foram aprovados em 31\/08.*local concluído às 02:37:42, horário de Brasília.*1\.157 testes.*1\.156 aprovações.*zero falhas.*skip esperado.*Linux concluído às 02:33:41.*1\.152 de 1\.152 aprovados.*sem skips ou cancelamentos/i);
  assert.match(record.validation, /160\.000 de 160\.000 aprovações.*444,109 segundos localmente.*63,956 segundos no Linux/i);
  assert.match(record.validation, /reconstrução às 02:37:58 de Brasília.*mesmo pacote de 378 arquivos e 114\.678\.851 bytes/i);
  assert.match(record.validation, /gates dos cards não validam esse reparo posterior/i);
  assert.match(record.validation, /integrais reprovados não foram tratados como aceite/i);
  assert.match(record.validation, /implantação concluiu em 31\/08 às 02:52:31, horário de Brasília.*76 arquivos alterados.*32 acrescentados.*nenhum removido.*estado protegido permaneceu igual antes da partida/i);
  assert.match(record.validation, /serviço iniciou ativo.*zero reinícios automáticos.*staging é separado.*produção agora usa o release de 31\/08/i);
  assert.match(record.validation, /primeira checagem às 02:53:04 de Brasília.*API, SQLite, autenticação, arquivos protegidos e logs.*contas ainda estavam inicializando/i);
  assert.match(record.validation, /checagens de 03:02:41 e 03:03:57 de Brasília.*cinco de cinco contas estavam conectadas.*sem scans ou jobs.*zero reinícios automáticos.*API, SQLite, autenticação, arquivos protegidos e logs passaram/i);
  assert.match(record.validation, /principal reautenticou sem novo QR, erro de conexão ou falha de observador.*runtime foi aceito antes do backup/i);
  assert.match(record.validation, /monitor TLS manual passou às 02:55:51 de Brasília.*cadeia, identidade do certificado, renovação automática e comparação local verificadas.*HTTPS externo respondeu 200.*TLS válido, cabeçalhos seguros.*redirecionamento HTTP 308/i);
  assert.match(record.validation, /infraestrutura secundária permaneceu protegida.*sem reinício ou alteração.*bot desativado.*backup autenticado, restrito internamente e somente de acréscimo/i);
  assert.match(record.validation, /backup posterior foi solicitado às 03:03:57,795 de Brasília e concluiu às 03:06:03,807.*consulta às 03:07:22,516 confirmou 16 snapshots e zero locks/i);
  assert.match(record.validation, /reinício normal ocorreu às 03:04:44.*zero reinícios automáticos.*checagem de 03:07:30,158.*cinco contas estavam conectadas.*cinco perfis de navegador.*API, SQLite, arquivos protegidos e logs aprovados.*uma varredura ativa e nenhum job/i);
  assert.match(record.validation, /restauração isolada iniciou às 03:07:41,059 e passou às 03:09:47,807 de Brasília.*sem falhas.*confirmação operacional entregue e execução não ignorada/i);
  assert.match(record.validation, /checagem final às 03:16:04,129 de Brasília.*cinco contas conectadas e cinco perfis de navegador, nenhuma varredura ou job ativo e zero reinícios automáticos/i);
  assert.match(record.validation, /verificações rápida, de integridade e de relações do SQLite passaram.*API respondeu com os códigos esperados de acesso e autenticação, restrita ao loopback/i);
  assert.match(record.validation, /mesmas contas e perfis foram preservados.*configuração protegida permaneceu inalterada.*integração logística continuou desativada.*sete contadores de alerta de logs ficaram em zero/i);
  assert.match(record.validation, /Implantação, runtime e continuidade foram aceitos.*timers recorrentes de TLS, backup e restauração permanecem desabilitados e inativos.*renovação automática de certificados continua habilitada e ativa/i);
  assert.match(record.validation, /IA real, entrega comercial no WhatsApp, recuperação histórica acompanhada e comparação semântica humana continuam sem aceite funcional.*conexão aprovada não substitui esses testes/i);
  assert.match(record.validation, /sincronização final do portal permanece uma publicação documental independente/i);
  assert.match(executiveMetrics.find(({ value }) => value === '13 + 8').note, /não é validação clínica/i);
  assert.match(executiveMetrics.find(({ value }) => value === '18 / 90').note, /22 indisponibilidades.*20 anteriores.*NAD.*dois técnicos existentes bloqueados.*Nenhuma arte foi fabricada/i);
  assert.match(executiveMetrics.find(({ value }) => value === '1.157 / 1.152').note, /gates dos cards.*antecedem o reparo da conta principal/i);
});

test('backup e incidente distinguem código vigente, reinício real e diagnóstico datado', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 81);
  assert.match(record.validation, /backup pré-publicação concluiu o 15º snapshot e reiniciou o serviço/i);
  assert.match(record.validation, /reinício revelou a falha da conta principal/i);
  assert.match(record.validation, /31\/08 às 01:57:33, horário de Brasília.*quatro contas gerenciadas estavam prontas.*principal estava em erro.*não havia jobs ou scans ativos/i);
  assert.match(record.validation, /diagnóstico datado, não aceite de conexão/i);
  const unchangedProductionClaim = /produção[^.!?]*(?:intacta|sem alteração nesta etapa|sem reinício)/i;
  assert.doesNotMatch(record.validation, unchangedProductionClaim);
  for (const claim of [
    'A produção permanece intacta.',
    'A produção ficou sem alteração nesta etapa.',
    'A produção segue sem reinício.',
  ]) assert.match(claim, unchangedProductionClaim);
  assert.doesNotMatch(
    'A produção usa o release novo. A infraestrutura secundária ficou sem reinício.',
    unchangedProductionClaim,
  );
  assert.match(record.validation, /produção agora usa o release de 31\/08.*runtime foi aceito antes do backup.*backup posterior foi solicitado.*concluiu.*16 snapshots e zero locks/i);
  assert.match(record.validation, /restauração isolada iniciou.*passou às 03:09:47,807.*checagem final às 03:16:04,129 de Brasília.*nenhuma varredura ou job ativo/i);
});

test('diagnóstico histórico do Guardião preserva o requisito da versão instalada', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 81);
  assert.match(record.validation, /somente leitura.*31\/08 às 01:17:48, horário de Brasília/i);
  assert.match(record.validation, /três slots completos, uma origem de provedor e três grupos monitorados/i);
  assert.match(record.validation, /quórum de duas origens independentes não foi atingido/i);
  assert.match(record.validation, /Configuração não equivale a votos reais.*nenhum provedor foi chamado.*nenhuma moderação foi executada/i);
  assert.doesNotMatch(record.validation, /carregamento inconsistente|moderação (?:aprovada|comprovada)/i);
});

test('novo Guardião separa decisão local, evidência por agente e limites do aceite', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 82);
  assert.equal(record.context, 'Local');
  assert.equal(record.state, 'Validado localmente');
  assert.match(record.summary, /três agentes.*validado localmente.*preservando os modelos atuais.*evidência, contexto e contestação/i);
  assert.match(record.summary, /pelo menos dois votos concordantes de agentes distintos.*mensagem corrente.*mesma rodada/i);
  assert.match(record.summary, /produção mantém o contrato anterior de duas origens.*31\/08/i);
  assert.match(record.result, /separadamente, sem ver os votos dos demais.*nova tentativa do mesmo agente não cria outro voto/i);
  assert.match(record.result, /mesmo modelo ou provedor.*sem garantia de independência estatística/i);
  assert.match(record.result, /Evidência literal, categorias permitidas e revalidação da política antes de qualquer efeito/i);
  assert.match(record.result, /Mídia sem legenda.*revisão manual/i);
  assert.match(record.validation, /interrompida por limite de uso.*focal reprovado.*06:12.*Brasília/i);
  assert.match(record.validation, /gates verdes da versão instalada não validam o novo candidato/i);
  assert.match(record.validation, /12 arquivos.*07:08:39 de Brasília.*161 de 161 testes aprovados, zero falhas, skips ou cancelamentos/i);
  assert.match(record.validation, /42 regressões.*33 no núcleo e nove no agendamento.*73 de 73 e 12 de 12 aprovados/i);
  assert.match(record.validation, /Não houve novo push para a VPS.*modelos, configurações, credenciais operacionais ou sessões.*nem aceite de IA real ou WhatsApp real/i);
  assert.match(record.validation, /07:31:57 de Brasília com saída zero.*1\.200 testes, 1\.199 aprovados, zero falhas ou cancelamentos e um skip esperado no macOS/i);
  assert.match(record.validation, /209 testes de CRM\/persistência aprovados.*971 gerais com 970 aprovações e um skip.*20 legados aprovados/i);
  assert.match(record.validation, /160\.000 de 160\.000 casos offline em 1\.177,965 segundos/i);
  assert.match(record.validation, /código congelado e o estado protegido permaneceram idênticos antes e depois.*conteúdo e metadados monitorados/i);
  assert.match(record.validation, /Pacote e novos testes Linux ficam para a janela autorizada/i);
});

test('corretivo local preserva sua evidência sanitizada como registro histórico', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 83);
  assert.equal(record.sequence, 83);
  assert.equal(record.context, 'Local');
  assert.equal(record.kind, 'Correção');
  assert.equal(record.state, 'Validado localmente');
  assert.match(record.summary, /ciclo de conexão, logout e acompanhamento.*operações ativas.*estados terminais/i);
  assert.match(record.summary, /referência expira.*área Contas.*orientação acionável/i);
  assert.match(record.summary, /ainda não foi implantado.*versão instalada permanece a de 31\/08/i);
  assert.match(record.result, /182 de 182 testes.*sem falhas, cancelamentos ou skips/i);
  assert.match(record.result, /1\.240 testes.*1\.239 aprovações.*zero falhas ou cancelamentos.*skip ambiental esperado/i);
  assert.match(record.result, /amplificação de escrita.*clonagem, validação, serialização e regravação integral.*capacidade de máquina disponível/i);
  assert.match(record.result, /normalizar o armazenamento.*operações incrementais.*índices.*paginação.*benchmark.*corte controlado/i);
  assert.match(record.validation, /governança, finalidade e opt-out.*versionado.*isolado por conta/i);
  assert.match(record.validation, /observação com memória própria.*retenção limitada.*avaliação humana sem envio.*copiloto de rascunhos.*canário.*baixo risco.*ajuste offline opcional por último/i);
  assert.match(record.validation, /594 pares.*referência de estilo.*não comprovam equivalência semântica/i);
  assert.match(record.validation, /Venda, pagamento, crédito, reembolso.*decisão clínica.*obrigatoriamente humanos/i);
  assert.match(record.validation, /Não houve implantação, novos testes Linux nem aceite de IA real ou atendimento real/i);

});

test('push seletivo publica o estado atual sem antecipar a correção estrutural ou a IA', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 84);
  assert.equal(record.sequence, 84);
  assert.equal(record.context, 'Produção');
  assert.equal(record.kind, 'Implantação');
  assert.equal(record.state, 'Publicado');
  assert.match(record.summary, /QR e conexões.*17 arquivos.*sem adições ou remoções.*preservação do estado operacional/i);
  assert.match(record.summary, /conta moderadora principal.*qrready.*painel Contas.*ler o QR quando puder/i);
  assert.match(record.summary, /quatro contas gerenciadas.*conectadas/i);
  assert.match(record.summary, /Guardião por três agentes.*não integrou.*validado somente no ambiente local/i);
  assert.match(record.result, /saúde final.*aprovada em repouso.*zero varreduras ou jobs ativos.*HTTPS público.*TLS aprovados/i);
  assert.match(record.result, /fila terminou.*latência e o consumo.*patamar normal/i);
  assert.match(record.result, /varredura.*sequencial sem deadline global.*causa estrutural não foi corrigida.*reaparecer após reinício/i);
  assert.match(record.result, /lotes duráveis.*checkpoint.*orçamento total.*cancelamento real.*retomada idempotente/i);
  assert.match(record.validation, /1\.192 testes.*1\.191 aprovações.*skip ambiental esperado.*1\.192 de 1\.192/i);
  assert.match(record.validation, /backup pré-push.*aprovado/i);
  assert.match(record.validation, /backup pós-push não foi executado porque exigiria novo reinício.*auto-scans.*restauração isolada não reinicia o serviço.*não foi repetida/i);
  assert.match(record.validation, /Nenhuma IA real.*aprendizado supervisionado.*planejamento.*decisões financeiras ou clínicas.*humanas/i);

  const releaseMetric = executiveMetrics.find(({ value }) => value === '17');
  const gateMetric = executiveMetrics.find(({ value }) => value === '1.192 / 1.192');
  assert.match(releaseMetric.note, /17 arquivos.*sem adições ou remoções.*principal.*ler o QR depois.*quatro contas gerenciadas.*conectadas/i);
  assert.match(releaseMetric.note, /Guardião por três agentes não integrou/i);
  assert.match(gateMetric.note, /1\.192 testes locais.*1\.191 aprovações.*skip ambiental esperado.*1\.192 de 1\.192 testes no Linux/i);
  assert.match(gateMetric.note, /saúde final.*repouso.*não constitui aceite.*IA real/i);
});

test('backup local temporário permanece candidato manual, local e com liberação condicionada', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 85);
  assert.equal(record.sequence, 85);
  assert.equal(record.title, 'Backup local temporário manual validado; implantação e liberação da VPS antiga pendentes');
  assert.equal(record.context, 'Local');
  assert.equal(record.kind, 'Continuidade');
  assert.equal(record.state, 'Validado localmente');
  assert.match(record.summary, /modo manual de backup cifrado.*mesma infraestrutura.*sem timer/i);
  assert.match(record.summary, /bloqueados a partir de 31\/10\/2026 às 20:00 de Brasília, inclusive/i);
  assert.match(record.summary, /Nenhum artefato foi instalado ou executado.*destino externo antigo ainda não foi liberado/i);
  assert.match(record.result, /snapshots existentes disponíveis.*novos backups estiverem bloqueados.*reserva de espaço.*captura consistente.*verificação do repositório.*restauração em área isolada/i);
  assert.match(record.result, /compartilhar host, disco e provedor.*não protege contra perda total.*novo destino externo/i);
  assert.match(record.validation, /22 de 22 testes.*1\.243 testes.*1\.242 aprovações.*zero falhas ou cancelamentos.*skip ambiental esperado.*160\.000 de 160\.000/i);
  assert.match(record.validation, /push explícito.*primeiro backup e verificação reais.*saúde após o reinício provocado pelo backup.*restauração isolada.*não chama systemctl nem reinicia o serviço.*17 snapshots históricos/i);

});

test('backup local instalado fecha os gates e mantém explícito o risco colocalizado', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 86);
  assert.equal(record.sequence, 86);
  assert.equal(record.title, 'Backup local temporário instalado, restore aprovado e VPS antiga desativada');
  assert.equal(record.context, 'Produção');
  assert.equal(record.kind, 'Continuidade');
  assert.equal(record.state, 'Publicado');
  assert.match(record.summary, /backup cifrado colocalizado.*infraestrutura principal.*estritamente manual.*sem timer/i);
  assert.match(record.summary, /a partir de 31\/10\/2026 às 20:00 de Brasília, inclusive/i);
  assert.match(record.summary, /primeiro snapshot.*verificação.*aprovados/i);
  assert.match(record.result, /quatro varreduras.*persistidas sem falhas.*saúde final.*repouso.*restore drill isolado.*sem reiniciar o serviço/i);
  assert.match(record.result, /infraestrutura antiga de backup.*desativada somente depois.*acervo histórico.*preservado offline.*indisponível.*host antigo.*cancelado/i);
  assert.match(record.validation, /não incluiu outras mudanças pendentes.*Snapshot, verificação, zero locks, saúde quiet, restauração em sandbox e ausência de timer.*comprovados/i);
  assert.match(record.validation, /mesma infraestrutura não é recuperação de desastre.*novo destino externo.*obrigatório/i);

  const cutoffMetric = executiveMetrics.find(({ value }) => value === '31/10');
  assert.match(cutoffMetric.note, /instalada na mesma infraestrutura.*estritamente manual.*sem timer/i);
  assert.match(cutoffMetric.note, /a partir de 31\/10\/2026 às 20:00 de Brasília, inclusive/i);
  assert.match(cutoffMetric.note, /primeiro snapshot.*verificação.*saúde em repouso.*restauração isolada.*passaram/i);
  assert.match(cutoffMetric.note, /infraestrutura antiga de backup.*desativada.*não é recuperação de desastre.*novo destino externo/i);
});

test('ML-0 fecha validado localmente sem antecipar dados reais ou operação', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 87);
  assert.equal(record.sequence, 87);
  assert.equal(record.title, 'Início da implementação local de machine learning');
  assert.equal(record.context, 'Local');
  assert.equal(record.kind, 'Implementação');
  assert.equal(record.state, 'Validado localmente');
  assert.match(record.summary, /fase ML-0.*concluída.*validada somente localmente.*estilo e estratégia.*fixture sintética.*conversa privada.*risco baixo/i);
  assert.doesNotMatch(`${record.summary} ${record.result} ${record.validation}`, /sintétic[oa] ou sanitizad[oa]/i);
  assert.match(record.result, /HMAC do envelope.*retenção de 1 a 30 dias.*revisão humana recente.*âncora e revisão.*remoção de sujeito somente em memória/i);
  assert.match(record.result, /24\/24.*5\/5.*29\/29.*1\.267 testes.*1\.266 aprovações.*zero falhas ou cancelamentos.*um skip ambiental.*160\.000\/160\.000.*936,683243611 segundos.*estado operacional monitorado permaneceu idêntico/i);
  assert.match(record.validation, /duas revisões finais.*não encontraram P1\/P2/i);
  assert.match(record.validation, /Regex ou prefixo não comprovam anonimização.*âncora persistida, CAS, armazenamento isolado, tombstone, ledger e deleção durável ainda não existem/i);
  assert.match(record.validation, /não houve coleta real.*treino.*embeddings.*fine-tuning.*inferência.*aplicativo.*WhatsApp.*SQLite.*provedor.*push.*produção ou VPS/i);
  assert.match(record.validation, /próximo gate.*governança.*armazenamento isolado.*CAS.*deleção real.*shadow separado sem envio.*copiloto ou canário/i);
});

test('registro 88 delimita os candidatos locais e a auditoria TLS sem antecipar implantação', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 88);
  assert.equal(record.sequence, 88);
  assert.equal(
    record.title,
    'Diagnóstico de CPU, candidatos locais de outbox e auto-scan e auditoria TLS',
  );
  assert.equal(record.context, 'Local');
  assert.equal(record.kind, 'Correção');
  assert.equal(record.state, 'Validado localmente');
  assert.match(record.summary, /diagnóstico ao vivo.*somente leitura.*claim periódico.*outbox vazia.*causa dominante/is);
  assert.match(record.summary, /dois corretivos.*apenas no workspace.*produção continua na release anterior.*nenhuma implantação/is);
  assert.match(record.result, /um chat.*25 mensagens.*job persistido.*checkpoint.*lease.*deadline.*cancelamento cooperativo/is);
  assert.match(record.result, /watermark.*próprio.*separado da recuperação manual/is);
  assert.match(record.result, /legacy_baseline.*sem certificação.*verified_v1.*barreira agregada/is);
  assert.match(record.result, /snapshot final limitado no navegador.*ponto de linearização/is);
  assert.match(record.validation, /TLS.*renovação automática.*comprovados.*sem mudança operacional/is);
  assert.match(record.validation, /não oferece atomicidade.*navegador.*SQLite.*worker thread.*preempção física/is);
  assert.match(record.validation, /1\.309 testes.*1\.308 aprovações.*zero falhas ou cancelamentos.*um skip ambiental esperado/is);
  assert.match(record.validation, /218\/218.*CRM.*persistência.*1\.071 gerais.*1\.070 aprovações.*um skip.*20\/20 legados/is);
  assert.match(record.validation, /160\.000\/160\.000.*655,568493104 segundos/is);
  assert.doesNotMatch(record.validation, /FINAL_INTEGRAL_PUBLIC/);
  assert.match(record.validation, /pacote.*gates Linux.*pedido explícito de push/is);
  assert.doesNotMatch(`${record.summary} ${record.result} ${record.validation}`, /\bQR\b|sess(?:ão|ões)/i);
});

test('registro 89 publica o push seletivo sem ocultar o risco residual do QR', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 89);
  assert.equal(record.sequence, 89);
  assert.equal(record.title, 'Push seletivo da correção de CPU e continuidade validada');
  assert.equal(record.context, 'Produção');
  assert.equal(record.kind, 'Implantação');
  assert.equal(record.state, 'Publicado');
  assert.match(record.summary, /sete arquivos alterados.*três adicionados.*Guardião.*ML-0/is);
  assert.match(record.result, /quatro jobs.*sem falha.*um concluiu.*três.*deadline.*4,07%.*2 e 8 ms/is);
  assert.match(record.validation, /1\.309 testes.*1\.308 aprovações.*1\.213\/1\.213.*backup.*SQLite.*HTTPS.*restore/is);
  assert.match(record.validation, /renovação periódica do QR.*2 de 30.*3 segundos.*risco residual/is);
});

test('registro 90 publica o Guardião seletivo sem afirmar consenso real', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 90);
  assert.equal(record.sequence, 90);
  assert.equal(record.title, 'Guardião por três agentes instalado em release seletiva');
  assert.equal(record.context, 'Produção');
  assert.match(record.summary, /oito arquivos alterados.*um adicionado.*ML-0 permaneceu local/is);
  assert.match(record.result, /três papéis fixos.*dois votos válidos.*agentes distintos.*mesma rodada/is);
  assert.match(record.validation, /1\.280\/1\.280.*160\.000\/160\.000.*backup.*SQLite.*HTTPS.*restore/is);
  assert.match(record.validation, /nenhuma chamada a IA real.*instalação não equivale a consenso real/is);
});

test('registro 91 publica catálogo, preços e estoque sem apagar o legado', () => {
  const record = progressEntries.find(({ sequence }) => sequence === 91);
  assert.equal(record.sequence, 91);
  assert.equal(record.title, 'Catálogo e preços do CRM implantados em produção');
  assert.equal(record.context, 'Produção');
  assert.match(record.summary, /seis arquivos alterados.*sem adições.*remoções.*machine learning/is);
  assert.match(record.result, /37 produtos.*41 ofertas.*preços confirmados.*sete estoques.*dez unidades/is);
  assert.match(record.validation, /1\.283\/1\.283.*160\.000\/160\.000.*backups.*restauração.*HTTPS/is);
});

test('cada registro traz prestação de contas completa', () => {
  const allowedContexts = new Set(['Local', 'Produção', 'Documentação']);
  for (const record of progressEntries) {
    assert.match(record.date, /^2026-(?:08|09)-\d{2}$/);
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
  assert.equal(roadmap.length, 8);
  assert.equal(roadmap[0].priority, 'Concluído');
  assert.equal(roadmap[0].title, 'Acompanhar a release de desempenho');
  assert.match(roadmap[0].description, /outbox vazia.*claim pesado.*auto-scan.*job durável.*1 chat\/25 mensagens.*checkpoint.*lease.*deadline.*cancelamento cooperativo/i);
  assert.match(roadmap[0].gate, /push.*Linux.*restore aprovados.*rajadas do QR/i);
  assert.equal(roadmap[1].priority, 'Concluído');
  assert.equal(roadmap[1].title, 'Manter release e TLS');
  const roadmapText = roadmap.map((item) => Object.values(item).join(' ')).join(' ');
  assert.match(roadmapText, /credenciais iniciais/i);
  assert.match(roadmapText, /vendedora real/i);
  assert.match(roadmapText, /destino externo/i);
  assert.match(roadmapText, /usuário autenticado/i);
  assert.match(roadmapText, /prestação de contas sincronizada/i);
  assert.match(roadmapText, /Release seletiva de 04\/09 instalada.*TLS.*renovação automática/i);
  assert.match(roadmapText, /22 casos bloqueados.*sem fabricar imagens.*adaptar números/i);
  assert.match(roadmapText, /governança.*isolamento.*CAS.*deleção durável.*shadow.*copiloto.*canário.*baixo risco/i);
  assert.match(roadmapText, /domínio de falha.*destino externo.*31\/10\/2026 às 20:00/i);
  assert.match(roadmapText, /síntese sanitizada.*cada push.*detalhes operacionais fora do portal/i);
  assert.doesNotMatch(roadmapText, /comprovar a segunda origem|exigir.*segunda origem/i);

  const detailedEvidence = [...executiveMetrics, ...progressEntries]
    .flatMap((item) => Object.values(item))
    .flat()
    .join(' ');
  assert.match(detailedEvidence, /17 arquivos.*sem adições ou remoções.*1\.192 testes locais.*1\.191 aprovações.*1\.192 de 1\.192/i);
  assert.match(detailedEvidence, /zero varreduras (?:ou|e) jobs ativos.*HTTPS (?:público )?e (?:o )?(?:monitor )?TLS.*(?:passaram|aprovados)/i);
  assert.match(detailedEvidence, /backup pós-push não foi executado.*novo reinício.*auto-scans.*restauração isolada.*não foi repetida/i);
  assert.match(detailedEvidence, /22 indisponibilidades.*20 anteriores.*NAD nasal.*dois técnicos existentes bloqueados/i);
  assert.match(detailedEvidence, /ML-0.*(?:aceita exclusivamente )?fixture (?:exclusivamente )?sintética.*conversa privada.*risco baixo/i);
  assert.match(detailedEvidence, /Regex ou prefixo não comprovam anonimização/i);
  assert.match(detailedEvidence, /594 pares.*não comprovam equivalência semântica/i);
  assert.match(detailedEvidence, /contingência cifrada.*estritamente manual.*sem timer.*31\/10\/2026 às 20:00 de Brasília, inclusive/i);
  assert.match(detailedEvidence, /infraestrutura antiga de backup.*desativada.*acervo histórico.*offline/i);
});
