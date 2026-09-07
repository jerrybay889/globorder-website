import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const sitemap = read('sitemap.xml');
const helperSource = read('assets/js/tally-consultation.js');
const sharedCss = read('assets/css/globals.css');

const publicUrls = [...sitemap.matchAll(/<loc>https:\/\/www\.globorder\.kr(\/[^<]*)?<\/loc>/g)]
  .map((match) => match[1] || '/');
const publicFiles = publicUrls.map((url) => url === '/' ? 'index.html' : `${url.slice(1)}.html`);

assert.equal(publicFiles.length, 11, 'sitemap must contain the 11 public non-contact routes');
assert.equal(new Set(publicFiles).size, publicFiles.length, 'sitemap routes must be unique');
assert.equal(fs.existsSync(path.join(root, 'contact.html')), false, 'contact.html must not exist');
assert.doesNotMatch(sitemap, /\/contact(?:<|\/|\?|#)/i, 'sitemap must not publish /contact');

const forbiddenContactDestination = /href\s*=\s*["'](?:https:\/\/www\.globorder\.kr)?\/?contact(?:\.html)?(?:[?#][^"']*)?["']/i;
const forbiddenContactAnchor = /href\s*=\s*["']#contact["']/i;
const tallyTrigger = /<([a-z][\w-]*)\b([^>]*\bdata-tally-open\b[^>]*)>/gi;

for (const file of publicFiles) {
  const html = read(file);
  assert.doesNotMatch(html, forbiddenContactDestination, `${file} must not link to /contact`);
  assert.doesNotMatch(html, forbiddenContactAnchor, `${file} inquiry CTAs must open the popup directly`);
  assert.doesNotMatch(html, /<a\b[^>]*>[^<]*(?:문의|상담|제휴)[^<]*<\/a>/i, `${file} inquiry CTAs must be popup buttons`);
  assert.equal(
    (html.match(/<script src=["']\/assets\/js\/tally-consultation\.js["'] defer><\/script>/g) || []).length,
    1,
    `${file} must load the shared helper exactly once`
  );
  assert.doesNotMatch(html, /<form\b/i, `${file} must not retain a local inquiry form`);
  assert.equal(
    (html.match(/<button\b/gi) || []).length,
    (html.match(/<\/button>/gi) || []).length,
    `${file} button markup must stay balanced`
  );

  const triggers = [...html.matchAll(tallyTrigger)];
  assert.ok(triggers.length >= 3, `${file} must expose header, mobile, and footer popup triggers`);
  for (const [, tag, attributes] of triggers) {
    assert.equal(tag.toLowerCase(), 'button', `${file} popup triggers must be buttons`);
    assert.match(attributes, /\btype=["']button["']/i, `${file} popup buttons need type=button`);
    assert.match(attributes, /\bdata-cta=["'][a-z0-9-]+["']/i, `${file} popup buttons need token-only attribution`);
    assert.doesNotMatch(attributes, /\bhref=/i, `${file} popup buttons must not navigate`);
  }
}

const siteSource = [...publicFiles, 'assets/js/tally-consultation.js']
  .map(read)
  .concat(sharedCss)
  .join('\n');
const forbiddenPopupBrand = ['JERRY', 'BAY'].join('');
assert.equal(siteSource.toUpperCase().includes(forbiddenPopupBrand), false, 'site source must not hardcode a brand-specific popup title');

assert.match(helperSource, /const TALLY_FORM_ID = 'Y5bypd';/);
assert.match(helperSource, /window\.Tally\.openPopup\(TALLY_FORM_ID,/);
assert.match(helperSource, /layout: 'modal'/);
assert.match(helperSource, /width: 540/);
assert.match(helperSource, /overlay: true/);
assert.match(helperSource, /source: 'globorder'/);
assert.match(helperSource, /source_page:/);
assert.match(helperSource, /cta:/);
assert.match(helperSource, /const UTM_KEYS = \['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'\];/);
assert.doesNotMatch(helperSource, /\btitle\s*:/i, 'popup title must remain owned by Tally');
assert.doesNotMatch(helperSource, /hiddenFields[\s\S]*?\b(?:name|email|phone|message)\s*:/i, 'site helper must not send visitor PII');
assert.match(helperSource, /const FLOATING_LABEL = '\\uC0C1\\uB2F4\\uBC0F\\uBB38\\uC758';/);
assert.match(helperSource, /button\.setAttribute\('aria-label', FLOATING_LABEL\)/);

const floatingRule = sharedCss.match(/\.tally-floating\s*\{([\s\S]*?)\}/)?.[1] || '';
const desktopRight = Number(floatingRule.match(/right:\s*(\d+)px/)?.[1]);
const desktopBottom = Number(floatingRule.match(/bottom:\s*(\d+)px/)?.[1]);
const reviewedFooterCta = { x: 1276, y: 831, width: 45, height: 21 };
const reviewedFloatingSize = { width: 111, height: 46 };
const reviewedViewport = { clientWidth: 1425, height: 900 };
const correctedFloatingCta = {
  x: reviewedViewport.clientWidth - desktopRight - reviewedFloatingSize.width,
  y: reviewedViewport.height - desktopBottom - reviewedFloatingSize.height,
  ...reviewedFloatingSize
};
const overlapArea = (a, b) => Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))
  * Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
assert.equal(desktopBottom, 72, 'desktop floating control must clear the footer CTA hit-area');
assert.equal(overlapArea(reviewedFooterCta, correctedFloatingCta), 0, '1440 footer and floating CTA hit-areas must not overlap');

class FakeElement {
  constructor(tagName, owner) {
    this.tagName = tagName.toUpperCase();
    this.owner = owner;
    this.dataset = {};
    this.children = [];
    this.listeners = new Map();
    this.attributes = {};
    this.disabled = false;
    this.hidden = false;
    this.textContent = '';
  }

  append(...children) {
    this.children.push(...children);
    for (const child of children) child.parent = this;
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  removeEventListener(type, listener) {
    if (this.listeners.get(type) === listener) this.listeners.delete(type);
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  closest(selector) {
    if (selector !== '[data-tally-surface]') return null;
    let current = this;
    while (current) {
      if (Object.hasOwn(current.dataset, 'tallySurface')) return current;
      current = current.parent;
    }
    return null;
  }

  querySelector(selector) {
    if (selector !== '[data-tally-status]') return null;
    return this.children.find((child) => Object.hasOwn(child.dataset, 'tallyStatus')) || null;
  }

  remove() {
    this.owner.scripts = this.owner.scripts.filter((script) => script !== this);
  }

  dispatch(type) {
    this.listeners.get(type)?.();
  }
}

const document = {
  scripts: [],
  floating: null,
  triggers: [],
  createElement(tagName) {
    return new FakeElement(tagName, this);
  },
  querySelector(selector) {
    if (selector === '.tally-floating') return this.floating;
    if (selector === '.tally-floating [data-tally-status]') return this.floating?.querySelector('[data-tally-status]') || null;
    return null;
  },
  querySelectorAll(selector) {
    return selector === '[data-tally-open]' ? this.triggers : [];
  }
};
document.head = {
  appendChild(script) {
    document.scripts.push(script);
  }
};
document.body = {
  appendChild(surface) {
    document.floating = surface;
    const button = surface.children.find((child) => Object.hasOwn(child.dataset, 'tallyOpen'));
    document.triggers.push(button);
  }
};

const pageSurface = new FakeElement('div', document);
pageSurface.dataset.tallySurface = '';
const pageButton = new FakeElement('button', document);
pageButton.dataset.tallyOpen = '';
pageButton.dataset.cta = 'hero<script>-consultation';
const pageStatus = new FakeElement('p', document);
pageStatus.dataset.tallyStatus = '';
pageStatus.hidden = true;
pageSurface.append(pageButton, pageStatus);
document.triggers.push(pageButton);

const popupCalls = [];
const settle = () => new Promise((resolve) => setImmediate(resolve));
const window = {
  location: {
    pathname: '/ai-consulting',
    search: '?utm_source=newsletter%3Cscript%3E&utm_campaign=fall_launch'
  }
};

vm.runInNewContext(helperSource, { document, window, URLSearchParams, Promise, Error });

assert.equal(document.floating.children[0].attributes['aria-label'], '\uC0C1\uB2F4\uBC0F\uBB38\uC758');
assert.equal(document.floating.children[0].dataset.cta, 'floating-consultation');

pageButton.listeners.get('click')();
assert.equal(pageButton.disabled, true);
assert.equal(document.scripts.length, 1);
document.scripts[0].dispatch('error');
await settle();
assert.equal(pageButton.disabled, false);
assert.equal(pageStatus.hidden, false);
assert.match(pageStatus.textContent, /다시 시도/);

pageButton.listeners.get('click')();
assert.equal(document.scripts.length, 1, 'retry must create one fresh widget script');
window.Tally = {
  openPopup(formId, options) {
    popupCalls.push({ formId, options });
  }
};
document.scripts[0].dispatch('load');
await settle();

assert.equal(popupCalls.length, 1);
assert.equal(popupCalls[0].formId, 'Y5bypd');
assert.deepEqual(
  JSON.parse(JSON.stringify(popupCalls[0].options)),
  {
    layout: 'modal',
    width: 540,
    overlay: true,
    hiddenFields: {
      source: 'globorder',
      source_page: 'ai-consulting',
      cta: 'heroscript-consultation',
      utm_source: 'newsletterscript',
      utm_campaign: 'fall_launch'
    }
  }
);
assert.equal(pageStatus.hidden, true);
assert.equal(pageButton.disabled, false);

console.log(`PASS consultation popup contract: ${publicFiles.length} public routes + retry/success runtime`);
