import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  executiveMetrics,
  progressEntries,
  reportMeta,
  roadmap,
  roadmapPresentation,
} from '../src/data.js';
import {
  assertWithinWordLimit,
  countWords,
  extractUniqueSectionMarkup,
  htmlToVisibleText,
  measurePublicSummary,
  renderRoadmapVisibleText,
  SUMMARY_CONTRACT,
  SUMMARY_SECTION_IDS,
  SUMMARY_WORD_LIMIT,
  verifyPublicSummary,
} from '../scripts/verify-public-summary-limit.mjs';

const projectUrl = new URL('../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, projectUrl), 'utf8');
}

test('a narrativa começa no estado atual, segue para a direção e preserva a evidência detalhada', async () => {
  const pageHtml = await read('index.html');
  const detailedEvidence = [...executiveMetrics, ...progressEntries]
    .flatMap((item) => Object.values(item))
    .flat()
    .join(' ');
  const nowIndex = pageHtml.indexOf('Onde estamos agora');
  const directionIndex = pageHtml.indexOf('Para onde vamos');
  const progressIndex = pageHtml.indexOf('Progresso do mais recente ao mais antigo');

  assert.ok(nowIndex > -1);
  assert.ok(directionIndex > nowIndex);
  assert.ok(progressIndex > directionIndex);
  assert.match(pageHtml, /88 consolidados/);
  assert.match(pageHtml, /release operacional anterior/i);
  assert.match(pageHtml, /claim da outbox vazia.*persistência\s+completa/is);
  assert.match(pageHtml, /dois candidatos foram validados apenas localmente/i);
  assert.match(pageHtml, /TLS e renovação automática foram comprovados/i);
  assert.match(pageHtml, /evidências e limites completos permanecem na linha do tempo/i);
  assert.match(pageHtml, /implantar os candidatos ainda exige pacote, gates Linux\s+e push explícito/is);

  assert.match(detailedEvidence, /17 arquivos.*sem adições ou remoções/i);
  assert.match(detailedEvidence, /1\.192 testes locais.*1\.191 aprovações.*1\.192 de 1\.192 testes no Linux/i);
  assert.match(detailedEvidence, /zero varreduras ou jobs ativos.*HTTPS público e monitor TLS aprovados/i);
  assert.match(detailedEvidence, /backup pós-push não foi executado.*novo reinício.*auto-scans/is);
  assert.match(detailedEvidence, /1\.267 testes.*1\.266 aprovações.*160\.000(?:\/| de )160\.000/i);
  assert.match(detailedEvidence, /22 indisponibilidades.*NAD nasal.*Retatrutida 20 mg.*Somatropina 240 UI/i);
  assert.match(detailedEvidence, /decisões financeiras ou clínicas continuam humanas/i);
});
test('síntese mantém candidatos locais e o histórico conserva os gates do Guardião', async () => {
  const pageHtml = await read('index.html');
  const detailedEvidence = progressEntries
    .flatMap((item) => Object.values(item))
    .flat()
    .join(' ');

  assert.match(pageHtml, /Candidatos · somente locais/i);
  assert.match(detailedEvidence, /Guardião por três agentes.*validado localmente/i);
  assert.match(detailedEvidence, /pelo menos dois votos concordantes de agentes distintos/i);
  assert.match(detailedEvidence, /mesmo modelo ou provedor.*sem garantia de independência estatística/i);
  assert.match(detailedEvidence, /161 de 161 testes aprovados.*42 regressões/is);
  assert.match(detailedEvidence, /1\.200 testes, 1\.199 aprovados.*um skip esperado no macOS/is);
  assert.match(detailedEvidence, /produção mantém o contrato anterior de duas origens.*não houve novo push operacional/i);
});
test('síntese distingue a release vigente dos candidatos locais e dos gates humanos', async () => {
  const pageHtml = await read('index.html');
  const detailedEvidence = progressEntries
    .flatMap((item) => Object.values(item))
    .flat()
    .join(' ');

  assert.match(pageHtml, /Produção · release vigente/i);
  assert.match(pageHtml, /Causa · claim vazio da outbox/i);
  assert.match(pageHtml, /auto-scan usa job durável e limitado/is);
  assert.match(detailedEvidence, /trabalho sequencial sem deadline global.*causa estrutural não foi corrigida/is);
  assert.match(detailedEvidence, /lotes duráveis com checkpoint, orçamento total, cancelamento real e retomada idempotente/i);
  assert.match(detailedEvidence, /ML-0.*validada somente localmente/is);
  assert.match(detailedEvidence, /Regex ou prefixo não comprovam anonimização.*CAS.*deleção durável/is);
  assert.match(detailedEvidence, /decisões financeiras ou clínicas continuam humanas/i);
  assert.match(detailedEvidence, /Não houve coleta real, treino, embeddings, fine-tuning, inferência/is);
});
test('contrato pt-BR-unicode-v1 normaliza NFC e trata compostos como uma palavra', () => {
  const sample = "ação ação pós-venda d'água 31/10/2026 20:00 1.177,965 24/24 31º";
  assert.equal(countWords(sample), 9);
  assert.equal(countWords('ação'), countWords('ação'));
  assert.equal(countWords('lote–seguro'), 2);
  assert.equal(SUMMARY_CONTRACT, 'pt-BR-unicode-v1');
});

test('limite é inclusivo: 500 palavras passam e 501 falham', () => {
  assert.doesNotThrow(() => assertWithinWordLimit(500));
  assert.throws(() => assertWithinWordLimit(501), /501\/500 palavras/);
  assert.equal(countWords(Array.from({ length: 500 }, () => 'item').join(' ')), 500);
  assert.equal(countWords(Array.from({ length: 501 }, () => 'item').join(' ')), 501);
});

test('extração exige uma única seção por ID e conta apenas texto estático visível', () => {
  const html = `
    <!-- <section id="inicio">comentada</section> -->
    <section class="alvo" data-id="inicio" id = "inicio" data-oculto="atributo não conta">
      Visível <!-- comentário não conta --> <strong>também visível</strong>
      <script>conteúdo não visível</script>
    </section>
    <section id="direcao">Direção &amp; gate</section>
  `;
  const startMarkup = extractUniqueSectionMarkup(html, 'inicio');
  assert.equal(htmlToVisibleText(startMarkup), 'Visível também visível');
  assert.throws(
    () => extractUniqueSectionMarkup(`${html}<div id="inicio">duplicado</div>`, 'inicio'),
    /exatamente uma vez/,
  );
  assert.throws(
    () => extractUniqueSectionMarkup('<div id="inicio">inválida</div>', 'inicio'),
    /elemento <section>/,
  );
});

test('unicidade bloqueia ID duplicado sem aspas e entidade numérica sem ponto e vírgula', () => {
  const unquotedDuplicate = `
    <section id="inicio">Resumo</section>
    <div id=inicio>Duplicata sem aspas</div>
  `;
  assert.throws(
    () => extractUniqueSectionMarkup(unquotedDuplicate, 'inicio'),
    /exatamente uma vez; encontrado: 2/,
  );

  const entityDuplicate = `
    <section id=inicio>Resumo</section>
    <div id="in&#105cio">Duplicata codificada sem ponto e vírgula</div>
  `;
  assert.throws(
    () => extractUniqueSectionMarkup(entityDuplicate, 'inicio'),
    /exatamente uma vez; encontrado: 2/,
  );
});

test('comentário HTML5 encerrado por --!> não cria nem oculta duplicata real', () => {
  const fakeInsideComment = `
    <section id=inicio>Resumo válido</section>
    <!-- <div id=inicio>Falso dentro do comentário</div> --!>
  `;
  assert.equal(
    htmlToVisibleText(extractUniqueSectionMarkup(fakeInsideComment, 'inicio')),
    'Resumo válido',
  );

  const realAfterComment = `
    <section id=inicio>Resumo</section>
    <!-- comentário recuperável --!><div id=inicio>Duplicata real</div>
  `;
  assert.throws(
    () => extractUniqueSectionMarkup(realAfterComment, 'inicio'),
    /exatamente uma vez; encontrado: 2/,
  );
});

test('fechamento textual em atributo não encerra a seção', () => {
  const html = `
    <section id=inicio>
      <div title="marcador </section> textual">Antes</div>
      <p>Depois do atributo</p>
    </section>
  `;
  const visible = htmlToVisibleText(extractUniqueSectionMarkup(html, 'inicio'));
  assert.match(visible, /Antes/);
  assert.match(visible, /Depois do atributo/);
});

test('raw-text recuperável não encerra a seção e script/style/template não contam', () => {
  for (const scriptEndTag of ['</script data-recuperado>', '</script/>']) {
    const html = `
      <section id=inicio>
        <script>window.exemplo = "</section>";${scriptEndTag}
        <style>.segredo::after { content: "não conta"; }</style>
        <template><p>Também não conta</p></template>
        <p>Depois do script</p>
      </section>
    `;
    const visible = htmlToVisibleText(extractUniqueSectionMarkup(html, 'inicio'));
    assert.equal(visible, 'Depois do script');
  }
});

test('roadmap contado reproduz integralmente a ordem e os rótulos renderizados', () => {
  const text = renderRoadmapVisibleText(roadmap, roadmapPresentation);
  roadmap.forEach((item, index) => {
    assert.match(text, new RegExp(String(index + 1).padStart(2, '0')));
    for (const field of ['priority', 'title', 'description', 'owner', 'gate']) {
      assert.ok(text.includes(item[field]), `roadmap ${index + 1} sem ${field}`);
    }
  });
  assert.equal(text.match(/Responsável/gu)?.length, roadmap.length);
  assert.equal(text.match(/\bGate\b/gu)?.length, roadmap.length);
  assert.throws(
    () => renderRoadmapVisibleText([{ ...roadmap[0], gate: '' }], roadmapPresentation),
    /campo gate ausente ou vazio/,
  );
});

test('resumo executivo combinado respeita o manifesto e a margem editorial', async () => {
  const html = await read('index.html');
  const manifest = JSON.parse(await read('sync/progress-source.json'));
  const measurement = verifyPublicSummary({ html, manifest });

  assert.deepEqual(measurement.sectionIds, [...SUMMARY_SECTION_IDS]);
  assert.equal(measurement.contract, SUMMARY_CONTRACT);
  assert.equal(measurement.limit, SUMMARY_WORD_LIMIT);
  assert.equal(measurement.wordCount, 444);
  assert.ok(measurement.wordCount >= 350 && measurement.wordCount <= 450);
  assert.equal(measurement.wordCount, measurePublicSummary({ html }).wordCount);

  for (const [field, value] of [
    ['contract', 'outro-contrato'],
    ['limit', 499],
    ['sectionIds', ['direcao', 'inicio']],
    ['wordCount', measurement.wordCount + 1],
  ]) {
    const divergent = structuredClone(manifest);
    divergent.publicSummary[field] = value;
    assert.throws(() => verifyPublicSummary({ html, manifest: divergent }), /divergente/i);
  }
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
  const packageLock = JSON.parse(await read('package-lock.json'));
  assert.equal(packageJson.scripts.test, 'node --test');
  assert.equal(packageJson.scripts.build, 'vite build');
  assert.equal(packageJson.scripts['vercel:whoami'], 'vercel whoami');
  assert.match(packageJson.scripts['vercel:link'], /--project sentinelzap\b/);
  assert.match(packageJson.scripts['vercel:link'], /--scope viniciuscttphotos-projects\b/);
  assert.equal(packageJson.scripts['progress:verify'], 'node scripts/verify-progress-sync.mjs');
  assert.equal(packageJson.scripts['summary:verify'], 'node scripts/verify-public-summary-limit.mjs');
  assert.match(packageJson.scripts.check, /summary:verify/);
  assert.match(packageJson.scripts['deploy:check'], /summary:verify/);
  assert.equal(packageJson.dependencies.parse5, '8.0.1');
  assert.equal(packageLock.packages[''].dependencies.parse5, '8.0.1');
  assert.equal(packageLock.packages['node_modules/parse5'].version, '8.0.1');
  assert.match(packageJson.scripts['vercel:prod'], /^vercel deploy --prod --yes /);
  for (const [name, command] of Object.entries(packageJson.scripts)) {
    if (name.startsWith('vercel:')) assert.doesNotMatch(command, /npx|@latest/);
  }
});

test('mantém um gate verificável entre o PROGRESS canônico e a publicação', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  const manifest = JSON.parse(await read('sync/progress-source.json'));
  const verifier = await read('scripts/verify-progress-sync.mjs');
  const summaryVerifier = await read('scripts/verify-public-summary-limit.mjs');

  assert.match(packageJson.scripts.check, /progress:verify/);
  assert.equal(manifest.entryCount, 88);
  assert.equal(manifest.technicalSourceRecords, 87);
  assert.equal(manifest.synchronizedAt, reportMeta.updatedAtIso);
  assert.deepEqual(manifest.publicSummary, {
    contract: SUMMARY_CONTRACT,
    limit: SUMMARY_WORD_LIMIT,
    sectionIds: [...SUMMARY_SECTION_IDS],
    wordCount: 444,
  });
  assert.match(manifest.sha256, /^[a-f0-9]{64}$/);
  assert.equal(
    manifest.newestHeading,
    'Diagnóstico de CPU, candidatos locais de outbox e auto-scan e auditoria TLS',
  );
  assert.match(verifier, /createHash\('sha256'\)/);
  assert.match(verifier, /heading\.date >= latest\.date/);
  assert.match(verifier, /progressEntries\.at\(-1\)/);
  assert.match(verifier, /reportMeta\.updatedAtIso !== manifest\.synchronizedAt/);
  assert.match(verifier, /publishedNewest\.publishedAt !== reportMeta\.updatedAtIso/);
  assert.match(verifier, /pendingPublicMarkers/);
  assert.match(verifier, /marcador público pendente/);
  assert.doesNotMatch(verifier, /writeFile|appendFile/);
  assert.match(summaryVerifier, /from 'parse5'/);
  assert.match(summaryVerifier, /parse\(String\(html\)\)/);
  assert.match(summaryVerifier, /EXCLUDED_VISIBLE_TEXT_ELEMENTS.*script.*style.*template/);
  assert.doesNotMatch(summaryVerifier, /scanHtmlTags|parseHtmlAttributes/);
});

test('a página pública não se apresenta como dashboard operacional', async () => {
  const html = await read('index.html');
  assert.match(html, /não hospeda nem substitui o dashboard operacional/i);
  assert.doesNotMatch(html, /\/api\//);
  assert.doesNotMatch(html, /(?:\d{1,3}\.){3}\d{1,3}/);
});
