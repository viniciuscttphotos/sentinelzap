import assert from 'node:assert/strict';
import test from 'node:test';

import {
  executiveMetrics,
  progressEntries,
  reportMeta,
  roadmap,
} from '../src/data.js';

test('prepara 83 registros separando o corretivo local da publicação operacional comprovada', () => {
  assert.equal(reportMeta.sourceRecords, 82);
  assert.equal(reportMeta.publishedRecords, 83);
  assert.equal(progressEntries.length, 83);
  assert.equal(progressEntries.at(-1).date, '2026-09-01');
  assert.equal(reportMeta.productionReleaseDate, '31 de agosto de 2026');
  assert.equal(
    progressEntries.at(-1).title,
    'Correção local do ciclo de QR/logout e diagnóstico da lentidão (aguardando push)',
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
    /^01 de setembro de 2026 às \d{2}:\d{2}:\d{2} \(horário de Brasília\)$/,
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
  assert.equal(progressEntries.filter(({ publishedAt }) => publishedAt).length, 5);
  const priorPublication = progressEntries.find(({ sequence }) => sequence === 79);
  assert.equal(priorPublication.publishedAt, '2026-08-30T09:34:04-03:00');
  assert.notEqual(priorPublication.publishedAt, reportMeta.updatedAtIso);
  assert.equal(progressEntries.find(({ sequence }) => sequence === 80).publishedAt, '2026-08-30T19:36:19-03:00');
  assert.equal(progressEntries.find(({ sequence }) => sequence === 81).publishedAt, '2026-08-31T03:19:54-03:00');
  assert.equal(progressEntries.find(({ sequence }) => sequence === 82).publishedAt, '2026-08-31T07:38:02-03:00');
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
    '2026-09-01': 1,
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
    Array.from({ length: 83 }, (_, index) => index + 1),
  );
  assert.equal(new Set(progressEntries.map(({ id }) => id)).size, 83);
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

test('corretivo local publica somente evidência sanitizada e direção supervisionada', () => {
  const record = progressEntries.at(-1);
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

  const focalMetric = executiveMetrics.find(({ value }) => value === '182 / 182');
  const integralMetric = executiveMetrics.find(({ value }) => value === '1.240');
  assert.match(focalMetric.note, /corretivo local.*182 de 182.*não foi implantado/i);
  assert.match(integralMetric.note, /01\/09 às 12:56:19 de Brasília.*1\.239 aprovações.*skip ambiental esperado.*Não houve novos testes Linux.*implantação/i);
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
  assert.equal(roadmap[0].priority, 'Próximo gate');
  assert.equal(roadmap[0].title, 'Autorizar o push dos candidatos validados localmente');
  assert.match(roadmap[0].gate, /Pedido explícito de push, pacote conferido e novos testes Linux na janela autorizada/i);
  assert.equal(roadmap[1].priority, 'Concluído');
  assert.equal(roadmap[1].title, 'Push instalado e validado');
  const roadmapText = roadmap.map((item) => Object.values(item).join(' ')).join(' ');
  assert.match(roadmapText, /credenciais iniciais/i);
  assert.match(roadmapText, /vendedora real/i);
  assert.match(roadmapText, /alerta externo/i);
  assert.match(roadmapText, /usuário autenticado/i);
  assert.match(roadmapText, /prestação de contas sincronizada/i);
  assert.match(roadmapText, /push instalado.*push foi explicitamente autorizado.*novos integrais foram aprovados.*1\.157 testes locais.*1\.152 de 1\.152 no Linux.*pacote idêntico, instalado em 31\/08 às 02:52:31 de Brasília/i);
  assert.match(roadmapText, /cinco de cinco contas conectadas foram comprovadas às 03:02:41 e 03:03:57 de Brasília.*runtime foi aceito antes do backup.*TLS manual passou às 02:55:51/i);
  assert.match(roadmapText, /backup posterior concluiu às 03:06:03,807 de Brasília.*16 snapshots e zero locks.*restauração isolada passou às 03:09:47,807.*checagem final às 03:16:04,129 de Brasília.*nenhuma varredura ou job ativo.*Implantação, runtime e continuidade foram aceitos/i);
  assert.match(roadmapText, /etiquetas.*integração logística real.*fora do escopo/i);
  assert.match(roadmapText, /22 indisponibilidades.*20 indisponibilidades anteriores.*NAD.*dois técnicos existentes bloqueados/i);
  assert.match(roadmapText, /aprendizado supervisionado.*governança.*opt-out.*isolado por conta.*observação.*avaliação humana sem envio.*copiloto.*canário.*baixo risco.*ajuste offline/i);
  assert.match(roadmapText, /594 pares de estilo.*não comprovam equivalência semântica.*Venda, pagamento, crédito, reembolso.*decisão clínica.*humanos/i);
  assert.doesNotMatch(roadmapText, /comprovar a segunda origem|exigir.*segunda origem/i);
});
