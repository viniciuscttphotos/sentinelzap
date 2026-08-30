import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

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
  assert.match(html, /78 consolidados/);
  assert.match(html, /772 testes locais aprovados[^.]{0,160}768 de 768 testes no pacote Linux/i);
  assert.match(html, /cinco contas estão conectadas/i);
  assert.match(html, /fundação logística instalada[^.]{0,120}desativada[^.]{0,100}sem credenciais[^.]{0,100}chamadas\s+ao provedor/i);
  assert.match(html, /candidato local de confiabilidade[^.]{0,200}Guardião IA[^.]{0,160}recuperação de mensagens/i);
  assert.match(html, /935 testes aprovados e um skip esperado em 936[^.]{0,80}sem falhas/i);
  assert.match(html, /370 arquivos[^.]{0,80}114\.395\.897[^.]{0,120}930 de 931 testes/i);
  assert.match(html, /cinco contratos do empacotador[^.]{0,100}fora do payload/i);
  assert.match(html, /148\.000 abordagens[^.]{0,100}37 produtos[^.]{0,100}4\.000 formulações/i);
  assert.match(html, /sem iniciar WhatsApp[^.]{0,100}Chrome[^.]{0,100}rede externa[^.]{0,100}dados pessoais/i);
  assert.match(html, /Etiquetas[^.]{0,120}integração logística real[^.]{0,100}fora/i);
  assert.match(html, /21[^.]{0,100}produto e card[^.]{0,120}indisponibilidade segura/i);
  assert.match(html, /candidato ainda não foi enviado à VPS/i);
  assert.match(html, /próximo ciclo é o push controlado do candidato[^.]{0,100}pedido explícito/i);
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
  assert.equal(manifest.entryCount, 78);
  assert.equal(manifest.technicalSourceRecords, 77);
  assert.match(manifest.sha256, /^[a-f0-9]{64}$/);
  assert.equal(
    manifest.newestHeading,
    'Força-tarefa de confiabilidade concluída localmente (aguardando push)',
  );
  assert.match(verifier, /createHash\('sha256'\)/);
  assert.match(verifier, /heading\.date >= latest\.date/);
  assert.match(verifier, /progressEntries\.at\(-1\)/);
  assert.doesNotMatch(verifier, /writeFile|appendFile/);
});

test('a página pública não se apresenta como dashboard operacional', async () => {
  const html = await read('index.html');
  assert.match(html, /não hospeda nem substitui o dashboard operacional/i);
  assert.doesNotMatch(html, /\/api\//);
  assert.doesNotMatch(html, /(?:\d{1,3}\.){3}\d{1,3}/);
});
