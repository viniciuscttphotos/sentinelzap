import './styles.css';
import {
  executiveMetrics,
  filterOptions,
  progressEntries,
  reportMeta,
  roadmap,
} from './data.js';

const $ = (selector, scope = document) => scope.querySelector(selector);

function createElement(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`));
}

function appendMetric(metric) {
  const card = createElement('article', 'metric-card');
  const value = createElement('strong', 'metric-value', metric.value);
  const label = createElement('h3', null, metric.label);
  const note = createElement('p', null, metric.note);
  card.append(value, label, note);
  $('[data-metrics]').append(card);
}

function appendRoadmapItem(item, index) {
  const row = createElement('li', 'roadmap-item');
  const number = createElement('span', 'roadmap-number', String(index + 1).padStart(2, '0'));
  number.setAttribute('aria-hidden', 'true');

  const content = createElement('div', 'roadmap-content');
  const priority = createElement('p', 'roadmap-priority', item.priority);
  const title = createElement('h3', null, item.title);
  const description = createElement('p', 'roadmap-description', item.description);
  content.append(priority, title, description);

  const meta = createElement('dl', 'roadmap-meta');
  const ownerWrap = createElement('div');
  ownerWrap.append(createElement('dt', null, 'Responsável'), createElement('dd', null, item.owner));
  const gateWrap = createElement('div');
  gateWrap.append(createElement('dt', null, 'Gate'), createElement('dd', null, item.gate));
  meta.append(ownerWrap, gateWrap);

  row.append(number, content, meta);
  $('[data-roadmap]').append(row);
}

function createBadge(text, modifier = '') {
  return createElement('span', `record-badge${modifier ? ` record-badge--${modifier}` : ''}`, text);
}

function createEvidenceBlock(label, value) {
  const block = createElement('div', 'evidence-block');
  block.append(createElement('h4', null, label), createElement('p', null, value));
  return block;
}

function createRecordCard(record) {
  const card = createElement('article', 'timeline-card');
  card.dataset.recordId = record.id;
  card.dataset.context = record.context;
  card.dataset.kind = record.kind;

  const rail = createElement('div', 'timeline-rail');
  const dot = createElement('span', 'timeline-dot');
  dot.setAttribute('aria-hidden', 'true');
  rail.append(dot);

  const content = createElement('div', 'timeline-card__content');
  const top = createElement('div', 'record-topline');
  const badges = createElement('div', 'record-badges');
  badges.append(createBadge(record.context, normalize(record.context)), createBadge(record.kind));
  const recordNumber = createElement(
    'span',
    'record-number',
    `Registro ${String(record.sequence).padStart(2, '0')}`,
  );
  top.append(badges, recordNumber);

  const heading = createElement('h3', null, record.title);
  const summary = createElement('p', 'record-summary', record.summary);

  const statusLine = createElement('div', 'record-status-line');
  statusLine.append(createBadge(record.state, 'state'));
  if (record.time) {
    const time = createElement('time', 'record-time', record.time);
    time.dateTime = record.date;
    statusLine.append(time);
  }

  const details = createElement('details', 'record-details');
  const detailsSummary = createElement('summary');
  detailsSummary.append(
    createElement('span', null, 'Ver resultado e comprovação'),
    createElement('span', 'details-icon', '+'),
  );
  const evidence = createElement('div', 'evidence-grid');
  evidence.append(
    createEvidenceBlock('Resultado', record.result),
    createEvidenceBlock('Validação', record.validation),
  );

  const tags = createElement('ul', 'record-tags');
  tags.setAttribute('aria-label', 'Temas deste registro');
  record.tags.forEach((tag) => tags.append(createElement('li', null, tag)));
  details.append(detailsSummary, evidence, tags);

  content.append(top, heading, summary, statusLine, details);
  card.append(rail, content);
  return card;
}

function renderTimeline(entries) {
  const timeline = $('[data-timeline]');
  timeline.replaceChildren();
  const fragment = document.createDocumentFragment();
  let currentDate = null;
  let dayGroup = null;
  let dayList = null;

  entries.forEach((record) => {
    if (record.date !== currentDate) {
      currentDate = record.date;
      dayGroup = createElement('section', 'timeline-day');
      dayGroup.setAttribute('aria-labelledby', `date-${record.date}`);

      const dayHeading = createElement('div', 'timeline-date');
      const time = createElement('time', null, formatDate(record.date));
      time.id = `date-${record.date}`;
      time.dateTime = record.date;
      dayHeading.append(time);

      dayList = createElement('div', 'timeline-day__records');
      dayGroup.append(dayHeading, dayList);
      fragment.append(dayGroup);
    }

    dayList.append(createRecordCard(record));
  });

  timeline.append(fragment);
}

function populateSelect(select, values) {
  values.forEach((value) => {
    const option = createElement('option', null, value);
    option.value = value;
    select.append(option);
  });
}

const controls = {
  search: $('[data-search]'),
  context: $('[data-context-filter]'),
  kind: $('[data-kind-filter]'),
  clearSearch: $('[data-clear-search]'),
  reset: $('[data-reset-filters]'),
  emptyReset: $('[data-empty-reset]'),
};

function getRecordHaystack(record) {
  return normalize(
    [
      record.title,
      record.summary,
      record.result,
      record.validation,
      record.context,
      record.kind,
      record.state,
      ...record.tags,
    ].join(' '),
  );
}

function persistFilters() {
  const params = new URLSearchParams();
  if (controls.search.value.trim()) params.set('q', controls.search.value.trim());
  if (controls.context.value) params.set('ambiente', controls.context.value);
  if (controls.kind.value) params.set('tipo', controls.kind.value);
  const query = params.toString();
  window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
}

function applyFilters({ persist = true } = {}) {
  const query = normalize(controls.search.value);
  const context = controls.context.value;
  const kind = controls.kind.value;
  const filtered = progressEntries.filter((record) => {
    const matchesQuery = !query || getRecordHaystack(record).includes(query);
    const matchesContext = !context || record.context === context;
    const matchesKind = !kind || record.kind === kind;
    return matchesQuery && matchesContext && matchesKind;
  });

  renderTimeline(filtered);
  controls.clearSearch.hidden = !controls.search.value;
  $('[data-empty-state]').hidden = filtered.length !== 0;
  $('[data-timeline]').hidden = filtered.length === 0;

  const countLabel = filtered.length === 1 ? '1 registro exibido' : `${filtered.length} registros exibidos`;
  $('[data-result-count]').textContent = `${countLabel} de ${reportMeta.publishedRecords}`;
  if (persist) persistFilters();
}

function resetFilters() {
  controls.search.value = '';
  controls.context.value = '';
  controls.kind.value = '';
  applyFilters();
  controls.search.focus();
}

let printState = null;

function prepareFullReportPrint() {
  if (printState) return;

  printState = {
    search: controls.search.value,
    context: controls.context.value,
    kind: controls.kind.value,
    openRecordIds: new Set(
      [...document.querySelectorAll('.timeline-card details[open]')]
        .map((details) => details.closest('.timeline-card')?.dataset.recordId)
        .filter(Boolean),
    ),
  };

  controls.search.value = '';
  controls.context.value = '';
  controls.kind.value = '';
  applyFilters({ persist: false });
  document.querySelectorAll('.timeline-card details').forEach((details) => {
    details.open = true;
  });
}

function restoreAfterPrint() {
  if (!printState) return;

  const previousState = printState;
  printState = null;
  controls.search.value = previousState.search;
  controls.context.value = previousState.context;
  controls.kind.value = previousState.kind;
  applyFilters({ persist: false });
  document.querySelectorAll('.timeline-card').forEach((card) => {
    const details = card.querySelector('details');
    if (details) details.open = previousState.openRecordIds.has(card.dataset.recordId);
  });
}

function restoreFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') ?? '';
  const context = params.get('ambiente') ?? '';
  const kind = params.get('tipo') ?? '';
  controls.search.value = query;
  if (filterOptions.contexts.includes(context)) controls.context.value = context;
  if (filterOptions.kinds.includes(kind)) controls.kind.value = kind;
}

function updateReadingProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
  $('[data-reading-progress]').style.transform = `scaleX(${progress})`;
  $('[data-back-to-top]').hidden = window.scrollY < 720;
  $('[data-site-header]').classList.toggle('site-header--scrolled', window.scrollY > 12);
}

function initialize() {
  executiveMetrics.forEach(appendMetric);
  roadmap.forEach(appendRoadmapItem);
  populateSelect(controls.context, filterOptions.contexts);
  populateSelect(controls.kind, filterOptions.kinds);
  $('[data-ordering-note]').textContent = reportMeta.orderingNote;

  restoreFiltersFromUrl();
  applyFilters({ persist: false });

  controls.search.addEventListener('input', applyFilters);
  controls.context.addEventListener('change', applyFilters);
  controls.kind.addEventListener('change', applyFilters);
  controls.clearSearch.addEventListener('click', () => {
    controls.search.value = '';
    applyFilters();
    controls.search.focus();
  });
  controls.reset.addEventListener('click', resetFilters);
  controls.emptyReset.addEventListener('click', resetFilters);
  $('[data-print]').addEventListener('click', () => {
    prepareFullReportPrint();
    window.print();
  });
  $('[data-back-to-top]').addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  window.addEventListener('beforeprint', prepareFullReportPrint);
  window.addEventListener('afterprint', restoreAfterPrint);

  let framePending = false;
  window.addEventListener(
    'scroll',
    () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(() => {
        updateReadingProgress();
        framePending = false;
      });
    },
    { passive: true },
  );
  updateReadingProgress();
}

initialize();
