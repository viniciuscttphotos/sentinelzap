import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { reportMeta } from '../src/data.js';

const projectUrl = new URL('../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, projectUrl), 'utf8');
}

test('a narrativa começa no estado atual, segue para a direção e termina no progresso', async () => {
  const html = await read('index.html');
  const nowIndex = html.indexOf('Onde estamos agora');
  const directionIndex = html.indexOf('Para onde vamos');
  const progressIndex = html.indexOf('Progresso do mais recente ao mais antigo');
  assert.ok(nowIndex > -1);
  assert.ok(directionIndex > nowIndex);
  assert.ok(progressIndex > directionIndex);
  assert.match(html, /81 consolidados/);
  assert.match(html, /push de 31\/08 foi instalado e validado, com cinco contas conectadas/i);
  assert.match(html, /release de 31 de agosto foi instalado às 02:52:31 de Brasília/i);
  assert.match(html, /13 seções ao Markdown.*?oito seções\s+faltantes à compilação.*?complemento da seção existente de GHK-Cu/s);
  assert.match(html, /18 fontes\s+visuais.*90 imagens/s);
  assert.match(html, /Três cards com divergências\s+mantêm quatro seções técnicas bloqueadas/i);
  assert.match(html, /não é validação\s+clínica nem autorização para dose individual/i);
  assert.match(html, /772 testes locais aprovados[^.]{0,160}768 de 768 testes no pacote Linux/i);
  assert.match(html, /aceite comprovou cinco contas conectadas/i);
  assert.match(html, /fundação logística instalada[^.]{0,120}desativada[^.]{0,100}sem credenciais[^.]{0,100}chamadas\s+ao provedor/i);
  assert.match(html, /candidato local de confiabilidade[^.]{0,200}Guardião IA[^.]{0,160}recuperação de mensagens/i);
  assert.match(html, /1\.126 testes locais.*?1\.125 aprovações, zero falhas e um skip esperado.*?1\.121 de 1\.121 no Linux/is);
  assert.match(html, /gates não validam o reparo posterior da conta principal/i);
  assert.match(html, /candidato corrigido concluiu.*?1\.157 testes locais.*?1\.156 aprovações, zero falhas e um skip esperado.*?31\/08 às 02:37:42 de Brasília.*?1\.152 de 1\.152 no Linux.*?às 02:33:41/is);
  assert.match(html, /aceites anteriores.*?histórico; são testes isolados, não aceites operacionais/is);
  assert.match(html, /backup pré-publicação concluiu o <strong>15º snapshot<\/strong> e reiniciou o serviço/i);
  assert.match(html, /reinício revelou uma falha de conexão da conta principal/i);
  assert.match(html, /31\/08 às\s+01:57:33, horário de Brasília, quatro contas gerenciadas estavam prontas, a principal\s+estava em erro e não havia jobs ou scans ativos/i);
  assert.match(html, /diagnóstico datado, não um aceite\s+de conexão/i);
  assert.match(html, /primeiro pacote do reparo falhou em um contrato de telemetria nas duas\s+suítes integrais, local e Linux/i);
  assert.match(html, /sete eventos operacionais anteriores foram restaurados/i);
  assert.match(html, /214 de 214 testes focais.*?31 regressões da conta\s+principal.*?Após revisão independente, o congelamento formal ocorreu às 02:26:08,\s+horário de Brasília/is);
  assert.match(html, /novos testes\s+integrais foram aprovados e a reconstrução confirmou o pacote idêntico/i);
  assert.match(html, /implantação foi concluída às 02:52:31 de Brasília.*?serviço iniciou ativo e sem\s+reinícios automáticos/is);
  assert.match(html, /primeira checagem às 02:53:04 aprovou API, SQLite,\s+autenticação, arquivos protegidos e logs, mas as contas ainda estavam inicializando/i);
  assert.match(html, /checagens de 03:02:41 e 03:03:57 de Brasília, cinco de cinco contas estavam\s+conectadas, sem scans ou jobs e com zero reinícios automáticos/i);
  assert.match(html, /principal reautenticou sem\s+novo QR, erro de conexão ou falha de observador; o runtime foi aceito antes do backup/i);
  assert.match(html, /monitor TLS manual passou às 02:55:51; HTTPS externo respondeu 200, com TLS\s+válido, cabeçalhos seguros e redirecionamento HTTP 308/i);
  assert.match(html, /backup posterior,\s+solicitado às 03:03:57,795, concluiu às 03:06:03,807 de Brasília.*?03:07:22,516 confirmou 16 snapshots e zero locks/is);
  assert.match(html, /checagem de 03:07:30,158 manteve cinco contas conectadas, cinco perfis de navegador.*?uma varredura ativa e nenhum job/is);
  assert.match(html, /restauração isolada iniciou às 03:07:41,059 e passou às 03:09:47,807 de Brasília,\s+sem falhas, com confirmação operacional entregue/i);
  assert.match(html, /checagem final às 03:16:04,129\s+de Brasília aprovou cinco contas conectadas e cinco perfis de navegador, nenhuma\s+varredura ou job ativo e zero reinícios automáticos/i);
  assert.match(html, /Implantação, runtime e continuidade foram aceitos.*?segunda checagem às 03:17:24,238 de Brasília confirmou a mesma estabilidade,\s+sem novo reinício.*?rotinas recorrentes de TLS, backup e restauração\s+permanecem desabilitadas.*?renovação automática de certificados continua ativa/is);
  assert.match(html, /160\.000 casos combinatórios offline[^.]{0,100}40 produtos[^.]{0,100}4\.000 casos[^.]{0,100}20 famílias/i);
  assert.match(html, /240 turnos de diálogos fixos[^.]{0,80}240 falhas injetadas[^.]{0,80}30 turnos[^.]{0,80}160 chamadas a provedor simulado[^.]{0,80}casos isolados/i);
  assert.match(html, /não são conversas com LLM real[^.]{0,180}comparação semântica/i);
  assert.match(html, /96 botões estáticos[^.]{0,80}40 templates dinâmicos[^.]{0,80}24 formulários[^.]{0,80}20 foram[^.]{0,80}quatro logísticos[^.]{0,80}sem\s+navegador real/i);
  assert.match(html, /despacho foi testado em VM, sem\s+navegador real/i);
  assert.match(html, /Etiquetas[^.]{0,120}integração logística real[^.]{0,100}fora/i);
  assert.match(html, /22\s+indisponibilidades de cards: 20 anteriores, incluindo NAD nasal não reconciliado/i);
  assert.match(html, /dois técnicos existentes bloqueados.*?Retatrutida 20 mg\s+e Somatropina 240 UI/is);
  assert.match(html, /preserva as apresentações, os preços\s+e as imagens originais.*?indisponibilidade segura/is);
  assert.match(html, /implantação do novo pacote\s+preservou o estado protegido antes da partida/i);
  assert.match(html, /staging é separado/i);
  assert.doesNotMatch(html, /staging é separado e não altera o runtime ativo/i);
  const unchangedProductionClaim = /produção[^.!?]*(?:intacta|sem alteração nesta etapa|sem reinício)/i;
  assert.doesNotMatch(html, unchangedProductionClaim);
  for (const claim of [
    'A produção permanece intacta.',
    'A produção ficou sem alteração nesta etapa.',
    'A produção segue sem reinício.',
    'A produção\nsegue sem reinício.',
  ]) assert.match(claim, unchangedProductionClaim);
  assert.doesNotMatch(
    'A produção usa o release novo. A infraestrutura secundária ficou sem reinício.',
    unchangedProductionClaim,
  );
  assert.match(html, /31\/08 às 01:17:48, horário de Brasília.*?três slots completos, uma origem de provedor e três grupos monitorados/is);
  assert.match(html, /quórum de duas origens independentes não foi atingido/i);
  assert.match(html, /Configuração não equivale\s+a votos reais: nenhum provedor foi chamado e nenhuma moderação foi executada/is);
  assert.match(html, /Mídia sem legenda permanece para revisão\s+manual/i);
  assert.match(html, /push foi explicitamente autorizado e instalado às 02:52:31 de Brasília/i);
  assert.match(html, /integrais local e Linux foram aprovados.*?reconstrução confirmou o pacote idêntico.*?cinco conexões, o backup posterior, a restauração isolada e a checagem final\s+sem atividade foram aprovados/is);
});

test('HTML oferece SEO, OpenGraph e marcos básicos de acessibilidade', async () => {
  const html = await read('index.html');
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<meta\s+name="description"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /rel="canonical" href="https:\/\/sentinelzap\.vercel\.app\/"/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-label="Imprimir relatório completo"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /<main id="conteudo">/);
  assert.match(html, /alt="Zyntra"/);
  assert.doesNotMatch(html, /<script(?![^>]*type="module"[^>]*src=)[^>]*>/i);
  assert.doesNotMatch(html, /(?:src|href)="https?:\/\/(?!sentinelzap\.vercel\.app)/i);
});

test('renderiza data e horário de Brasília a partir de um contrato persistente', async () => {
  const html = await read('index.html');
  const data = await read('src/data.js');
  const javascript = await read('src/main.js');

  const reportTimes = [
    ...html.matchAll(/<time\b([^>]*)data-report-updated-at([^>]*)>([^<]+)<\/time>/g),
  ];
  assert.equal(reportTimes.length, 3);
  for (const [, attributesBefore, attributesAfter, text] of reportTimes) {
    const attributes = `${attributesBefore}${attributesAfter}`;
    assert.equal(attributes.match(/\bdatetime="([^"]+)"/)?.[1], reportMeta.updatedAtIso);
    assert.equal(text, `Conteúdo atualizado em ${reportMeta.updatedAtLabel}`);
  }
  assert.match(html, /<dt>Última atualização<\/dt>/);
  assert.match(
    data,
    /REPORT_UPDATED_AT = '\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})'/,
  );
  assert.match(data, /REPORT_TIME_ZONE = 'America\/Sao_Paulo'/);
  assert.match(data, /REPORT_TIME_ZONE_LABEL = 'horário de Brasília'/);
  assert.match(data, /timeZone: REPORT_TIME_ZONE/);
  assert.match(data, /publishedAt: REPORT_UPDATED_AT/);
  assert.match(javascript, /querySelectorAll\('\[data-report-updated-at\]'\)/);
  assert.match(javascript, /time\.dateTime = reportMeta\.updatedAtIso/);
  assert.match(javascript, /Conteúdo atualizado em \$\{reportMeta\.updatedAtLabel\}/);
  assert.match(javascript, /record\.publishedAt \?\? record\.date/);
});

test('impressão sempre inclui o relatório completo e restaura filtros depois', async () => {
  const javascript = await read('src/main.js');
  assert.match(javascript, /beforeprint.*prepareFullReportPrint/);
  assert.match(javascript, /afterprint.*restoreAfterPrint/);
  assert.match(javascript, /applyFilters\(\{ persist: false \}\)/);
  assert.match(javascript, /details\.open = true/);
});

test('linha do tempo inverte somente a apresentação e mantém a fonte canônica', async () => {
  const javascript = await read('src/main.js');
  assert.match(javascript, /Object\.freeze\(\[\.\.\.progressEntries\]\.reverse\(\)\)/);
  assert.match(javascript, /timelineEntries\.filter/);
  assert.doesNotMatch(javascript, /progressEntries\.reverse\(\)/);
});

test('retorno ao topo respeita a preferência de movimento reduzido', async () => {
  const javascript = await read('src/main.js');
  assert.match(javascript, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(javascript, /reduceMotion \? 'auto' : 'smooth'/);
});

test('CSS parte do mobile e progride apenas com breakpoints min-width', async () => {
  const css = await read('src/styles.css');
  const baseGrid = css.indexOf('.metric-grid');
  const firstBreakpoint = css.indexOf('@media (min-width:');
  assert.ok(baseGrid > -1 && firstBreakpoint > baseGrid);
  assert.doesNotMatch(css, /@media\s*\([^)]*max-width/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /forced-colors/);
  assert.match(css, /@media print/);
  assert.match(css, /:focus-visible/);
});

test('Vercel aplica cabeçalhos de segurança e fallback estático', async () => {
  const config = JSON.parse(await read('vercel.json'));
  const headers = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]));
  assert.match(headers['Content-Security-Policy'], /default-src 'self'/);
  assert.match(headers['Content-Security-Policy'], /frame-ancestors 'none'/);
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.match(headers['Strict-Transport-Security'], /includeSubDomains/);
  assert.equal(config.buildCommand, 'npm run deploy:check');
  assert.deepEqual(config.rewrites, [{ source: '/(.*)', destination: '/index.html' }]);
});

test('scripts npm usam Vite, node:test e a CLI Vercel persistente no projeto autorizado', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  assert.equal(packageJson.scripts.test, 'node --test');
  assert.equal(packageJson.scripts.build, 'vite build');
  assert.equal(packageJson.scripts['vercel:whoami'], 'vercel whoami');
  assert.match(packageJson.scripts['vercel:link'], /--project sentinelzap\b/);
  assert.match(packageJson.scripts['vercel:link'], /--scope viniciuscttphotos-projects\b/);
  assert.equal(packageJson.scripts['progress:verify'], 'node scripts/verify-progress-sync.mjs');
  assert.match(packageJson.scripts['vercel:prod'], /^vercel deploy --prod --yes /);
  for (const [name, command] of Object.entries(packageJson.scripts)) {
    if (name.startsWith('vercel:')) assert.doesNotMatch(command, /npx|@latest/);
  }
});

test('mantém um gate verificável entre o PROGRESS canônico e a publicação', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  const manifest = JSON.parse(await read('sync/progress-source.json'));
  const verifier = await read('scripts/verify-progress-sync.mjs');

  assert.match(packageJson.scripts.check, /progress:verify/);
  assert.equal(manifest.entryCount, 81);
  assert.equal(manifest.technicalSourceRecords, 80);
  assert.equal(manifest.synchronizedAt, reportMeta.updatedAtIso);
  assert.match(manifest.sha256, /^[a-f0-9]{64}$/);
  assert.equal(
    manifest.newestHeading,
    'Confronto dos cards, Markdown faltante e push autorizado',
  );
  assert.match(verifier, /createHash\('sha256'\)/);
  assert.match(verifier, /heading\.date >= latest\.date/);
  assert.match(verifier, /progressEntries\.at\(-1\)/);
  assert.match(verifier, /reportMeta\.updatedAtIso !== manifest\.synchronizedAt/);
  assert.match(verifier, /publishedNewest\.publishedAt !== reportMeta\.updatedAtIso/);
  assert.doesNotMatch(verifier, /writeFile|appendFile/);
});

test('a página pública não se apresenta como dashboard operacional', async () => {
  const html = await read('index.html');
  assert.match(html, /não hospeda nem substitui o dashboard operacional/i);
  assert.doesNotMatch(html, /\/api\//);
  assert.doesNotMatch(html, /(?:\d{1,3}\.){3}\d{1,3}/);
});
