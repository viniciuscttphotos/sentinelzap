import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse, parseFragment } from 'parse5';

import { roadmap, roadmapPresentation } from '../src/data.js';

export const SUMMARY_CONTRACT = 'pt-BR-unicode-v1';
export const SUMMARY_WORD_LIMIT = 500;
export const SUMMARY_SECTION_IDS = Object.freeze(['inicio', 'direcao']);
export const WORD_PATTERN = /\p{N}+(?:[.,:/]\p{N}+)+(?:%|º|ª)?|[\p{L}\p{M}\p{N}]+(?:[-'’][\p{L}\p{M}\p{N}]+)*/gu;

const PROJECT_ROOT = new URL('../', import.meta.url);
const ROADMAP_FIELDS = Object.freeze(['priority', 'title', 'description', 'owner', 'gate']);
const EXCLUDED_VISIBLE_TEXT_ELEMENTS = new Set(['script', 'style', 'template']);

function getAttribute(node, name) {
  return node.attrs?.find((attribute) => attribute.name === name)?.value;
}

function visitElements(node, visitor) {
  if (node?.tagName) visitor(node);
  if (node?.tagName === 'template') return;
  for (const child of node?.childNodes ?? []) visitElements(child, visitor);
}

function extractUniqueSectionNode(root, id) {
  const normalizedId = String(id).normalize('NFC');
  const matches = [];

  visitElements(root, (element) => {
    const elementId = getAttribute(element, 'id');
    if (typeof elementId === 'string' && elementId.normalize('NFC') === normalizedId) {
      matches.push(element);
    }
  });

  if (matches.length !== 1) {
    throw new Error(`A seção #${id} deve existir exatamente uma vez; encontrado: ${matches.length}.`);
  }
  const [match] = matches;
  if (match.tagName !== 'section') {
    throw new Error(`#${id} deve identificar um elemento <section>.`);
  }
  return match;
}

function collectVisibleText(node, chunks) {
  if (node?.nodeName === '#text') {
    chunks.push(node.value);
    return;
  }
  if (EXCLUDED_VISIBLE_TEXT_ELEMENTS.has(node?.tagName)) return;
  for (const child of node?.childNodes ?? []) collectVisibleText(child, chunks);
}

export function countWords(value) {
  const normalized = String(value ?? '').normalize('NFC');
  const pattern = new RegExp(WORD_PATTERN.source, WORD_PATTERN.flags);
  return [...normalized.matchAll(pattern)].length;
}

export function assertWithinWordLimit(wordCount, limit = SUMMARY_WORD_LIMIT) {
  if (!Number.isSafeInteger(wordCount) || wordCount < 0) {
    throw new TypeError('A contagem de palavras deve ser um inteiro não negativo.');
  }
  if (!Number.isSafeInteger(limit) || limit < 1) {
    throw new TypeError('O limite de palavras deve ser um inteiro positivo.');
  }
  if (wordCount > limit) {
    throw new Error(`Resumo público excede o limite: ${wordCount}/${limit} palavras.`);
  }
}

export function extractUniqueSectionMarkup(html, id) {
  return extractUniqueSectionNode(parse(String(html)), id);
}

export function htmlToVisibleText(markupOrNode) {
  const root = typeof markupOrNode === 'string'
    ? parseFragment(markupOrNode)
    : markupOrNode;
  const chunks = [];
  collectVisibleText(root, chunks);
  return chunks.join(' ').replace(/\s+/gu, ' ').trim().normalize('NFC');
}

export function renderRoadmapVisibleText(items, presentation = roadmapPresentation) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('O roadmap deve conter ao menos um item.');
  }
  if (!Number.isSafeInteger(presentation.numberWidth) || presentation.numberWidth < 1) {
    throw new Error('A largura do número do roadmap é inválida.');
  }
  for (const label of ['ownerLabel', 'gateLabel']) {
    if (typeof presentation[label] !== 'string' || presentation[label].trim() === '') {
      throw new Error(`O rótulo ${label} do roadmap é obrigatório.`);
    }
  }

  return items
    .map((item, index) => {
      for (const field of ROADMAP_FIELDS) {
        if (typeof item?.[field] !== 'string' || item[field].trim() === '') {
          throw new Error(`Roadmap ${index + 1}: campo ${field} ausente ou vazio.`);
        }
      }
      return [
        String(index + 1).padStart(presentation.numberWidth, '0'),
        item.priority,
        item.title,
        item.description,
        presentation.ownerLabel,
        item.owner,
        presentation.gateLabel,
        item.gate,
      ].join(' ');
    })
    .join(' ')
    .normalize('NFC');
}

export function measurePublicSummary({ html, items = roadmap, presentation = roadmapPresentation }) {
  const document = parse(String(html));
  const sectionText = SUMMARY_SECTION_IDS.map((id) =>
    htmlToVisibleText(extractUniqueSectionNode(document, id)),
  );
  const roadmapText = renderRoadmapVisibleText(items, presentation);
  const text = [...sectionText, roadmapText].filter(Boolean).join(' ').normalize('NFC');
  const wordCount = countWords(text);
  return Object.freeze({
    contract: SUMMARY_CONTRACT,
    limit: SUMMARY_WORD_LIMIT,
    sectionIds: [...SUMMARY_SECTION_IDS],
    wordCount,
    text,
  });
}

export function verifyPublicSummary({ html, manifest, items = roadmap, presentation = roadmapPresentation }) {
  const measurement = measurePublicSummary({ html, items, presentation });
  assertWithinWordLimit(measurement.wordCount, measurement.limit);

  const declared = manifest?.publicSummary;
  if (!declared || typeof declared !== 'object' || Array.isArray(declared)) {
    throw new Error('Manifesto sem o contrato publicSummary.');
  }
  if (declared.contract !== measurement.contract) {
    throw new Error(`Contrato divergente: ${declared.contract ?? 'ausente'} != ${measurement.contract}.`);
  }
  if (declared.limit !== measurement.limit) {
    throw new Error(`Limite divergente: ${declared.limit ?? 'ausente'} != ${measurement.limit}.`);
  }
  if (
    !Array.isArray(declared.sectionIds)
    || declared.sectionIds.length !== measurement.sectionIds.length
    || declared.sectionIds.some((id, index) => id !== measurement.sectionIds[index])
  ) {
    throw new Error('IDs de seção divergentes no manifesto.');
  }
  if (declared.wordCount !== measurement.wordCount) {
    throw new Error(
      `Contagem divergente no manifesto: ${declared.wordCount ?? 'ausente'} != ${measurement.wordCount}.`,
    );
  }
  return measurement;
}

async function run() {
  const [html, manifestSource] = await Promise.all([
    readFile(new URL('index.html', PROJECT_ROOT), 'utf8'),
    readFile(new URL('sync/progress-source.json', PROJECT_ROOT), 'utf8'),
  ]);
  const manifest = JSON.parse(manifestSource);
  const measurement = verifyPublicSummary({ html, manifest });
  process.stdout.write(
    `Resumo público aprovado: ${measurement.wordCount}/${measurement.limit} palavras (${measurement.contract}).\n`,
  );
}

const executedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (executedPath === import.meta.url) {
  run().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
