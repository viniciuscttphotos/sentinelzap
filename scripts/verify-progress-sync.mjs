import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { progressEntries, reportMeta } from '../src/data.js';

const manifestUrl = new URL('../sync/progress-source.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
const sourcePath = process.env.SENTINEL_PROGRESS_SOURCE
  ? resolve(process.cwd(), process.env.SENTINEL_PROGRESS_SOURCE)
  : resolve(process.cwd(), manifest.source);
const source = await readFile(sourcePath, 'utf8');
const sha256 = createHash('sha256').update(source).digest('hex');
const headings = [...source.matchAll(/^###\s+(\d{4}-\d{2}-\d{2})\s+—\s+(.+)$/gm)].map(
  ([, date, title]) => ({ date, title: title.trim() }),
);
const newest = headings.reduce(
  (latest, heading) => (!latest || heading.date >= latest.date ? heading : latest),
  null,
);
const publishedNewest = progressEntries.at(-1);
const errors = [];
const updateMatch = reportMeta.updatedAtIso.match(
  /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:Z|[+-]\d{2}:\d{2})$/,
);
const updateInstant = new Date(reportMeta.updatedAtIso);
const zonedParts = Number.isNaN(updateInstant.getTime())
  ? null
  : Object.fromEntries(
      new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
        timeZone: 'America/Sao_Paulo',
      })
        .formatToParts(updateInstant)
        .filter(({ type }) => type !== 'literal')
        .map(({ type, value }) => [type, value]),
    );
const zonedCivilTime = zonedParts
  ? `${zonedParts.year}-${zonedParts.month}-${zonedParts.day}T${zonedParts.hour}:${zonedParts.minute}:${zonedParts.second}`
  : null;

if (sha256 !== manifest.sha256) errors.push('o digest do PROGRESS.md mudou');
if (headings.length !== manifest.entryCount) errors.push('a contagem de registros da fonte mudou');
if (reportMeta.sourceRecords !== manifest.technicalSourceRecords) {
  errors.push('a contagem de registros técnicos públicos diverge do manifesto');
}
if (reportMeta.updatedAtIso !== manifest.synchronizedAt) {
  errors.push('o horário público de atualização diverge do manifesto');
}
if (
  !updateMatch ||
  Number.isNaN(updateInstant.getTime()) ||
  zonedCivilTime !== updateMatch?.[1] ||
  reportMeta.timeZone !== 'America/Sao_Paulo' ||
  reportMeta.timeZoneLabel !== 'horário de Brasília'
) {
  errors.push('o horário público não cumpre o contrato de Brasília');
}
if (progressEntries.length !== manifest.entryCount) {
  errors.push('a linha do tempo pública não cobre todos os registros documentais');
}
if (!newest || newest.date !== manifest.newestDate || newest.title !== manifest.newestHeading) {
  errors.push('o cabeçalho mais recente da fonte diverge do manifesto');
}
if (
  !publishedNewest ||
  publishedNewest.date !== manifest.newestDate ||
  publishedNewest.title !== manifest.newestHeading ||
  publishedNewest.publishedAt !== reportMeta.updatedAtIso
) {
  errors.push('o registro público mais recente não corresponde à fonte');
}

if (errors.length) {
  console.error('Prestação de contas fora de sincronia:');
  errors.forEach((error) => console.error(`- ${error}`));
  console.error('Atualize a síntese sanitizada e o manifesto antes de publicar.');
  process.exitCode = 1;
} else {
  console.log(
    `Sincronização comprovada: ${headings.length} registros documentais, ` +
      `${reportMeta.sourceRecords} registros técnicos e digest ${sha256.slice(0, 12)}…`,
  );
}
