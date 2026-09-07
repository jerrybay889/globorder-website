(() => {
  'use strict';

  const TALLY_FORM_ID = 'Y5bypd';
  const TALLY_WIDGET_URL = 'https://tally.so/widgets/embed.js';
  const FLOATING_LABEL = '\uC0C1\uB2F4\uBC0F\uBB38\uC758';
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  let widgetPromise;

  // Attribution is deliberately token-only. Visitor-entered form values never enter this page script.
  const sanitize = (value) => String(value == null ? '' : value)
    .replace(/[^a-zA-Z0-9_.\- ]/g, '')
    .trim()
    .slice(0, 120);

  const loadWidget = () => {
    if (window.Tally && typeof window.Tally.openPopup === 'function') return Promise.resolve();
    if (widgetPromise) return widgetPromise;

    widgetPromise = new Promise((resolve, reject) => {
      const existing = [...document.scripts].find((script) => script.src === TALLY_WIDGET_URL);
      const script = existing || document.createElement('script');
      const cleanup = () => {
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
      };
      const fail = (error) => {
        cleanup();
        if (!(window.Tally && typeof window.Tally.openPopup === 'function')) script.remove();
        reject(error);
      };
      const onLoad = () => {
        if (window.Tally && typeof window.Tally.openPopup === 'function') {
          cleanup();
          resolve();
          return;
        }
        fail(new Error('Tally widget unavailable'));
      };
      const onError = () => fail(new Error('Tally widget failed to load'));

      script.addEventListener('load', onLoad, { once: true });
      script.addEventListener('error', onError, { once: true });
      if (!existing) {
        script.src = TALLY_WIDGET_URL;
        script.async = true;
        document.head.appendChild(script);
      }
    }).catch((error) => {
      widgetPromise = undefined;
      throw error;
    });

    return widgetPromise;
  };

  const hiddenFields = (button) => {
    const query = new URLSearchParams(window.location.search);
    const fields = {
      source: 'globorder',
      source_page: sanitize(window.location.pathname) || '/',
      cta: sanitize(button.dataset.cta) || 'commercial-consultation'
    };

    UTM_KEYS.forEach((key) => {
      const value = sanitize(query.get(key));
      if (value) fields[key] = value;
    });
    return fields;
  };

  const statusFor = (button) => button.closest('[data-tally-surface]')?.querySelector('[data-tally-status]')
    || document.querySelector('.tally-floating [data-tally-status]');

  const showLoadError = (button) => {
    const status = statusFor(button);
    if (!status) return;
    status.hidden = false;
    status.textContent = '상담 신청서를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
  };

  const clearLoadError = (button) => {
    const status = statusFor(button);
    if (!status) return;
    status.hidden = true;
    status.textContent = '';
  };

  const addFloatingTrigger = () => {
    if (document.querySelector('.tally-floating')) return;

    const surface = document.createElement('div');
    surface.className = 'tally-floating';
    surface.dataset.tallySurface = '';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tally-floating__button';
    button.dataset.tallyOpen = '';
    button.dataset.cta = 'floating-consultation';
    button.setAttribute('aria-label', FLOATING_LABEL);

    const icon = document.createElement('span');
    icon.className = 'tally-floating__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '✦';

    const label = document.createElement('span');
    label.textContent = FLOATING_LABEL;

    const status = document.createElement('p');
    status.className = 'tally-floating__status';
    status.dataset.tallyStatus = '';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.hidden = true;

    button.append(icon, label);
    surface.append(button, status);
    document.body.appendChild(surface);
  };

  addFloatingTrigger();

  document.querySelectorAll('[data-tally-open]').forEach((button) => {
    button.addEventListener('click', () => {
      clearLoadError(button);
      button.disabled = true;
      loadWidget()
        .then(() => window.Tally.openPopup(TALLY_FORM_ID, {
          layout: 'modal',
          width: 540,
          overlay: true,
          hiddenFields: hiddenFields(button)
        }))
        .catch(() => showLoadError(button))
        .finally(() => { button.disabled = false; });
    });
  });
})();
