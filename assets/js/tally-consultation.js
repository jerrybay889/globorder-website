(() => {
  'use strict';

  const TALLY_FORM_ID = 'Y5bypd';
  const TALLY_WIDGET_URL = 'https://tally.so/widgets/embed.js';
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

  const showLoadError = (button) => {
    const status = button.closest('[data-tally-surface]')?.querySelector('[data-tally-status]');
    if (!status) return;
    status.hidden = false;
    status.textContent = '상담 신청서를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
  };

  const clearLoadError = (button) => {
    const status = button.closest('[data-tally-surface]')?.querySelector('[data-tally-status]');
    if (!status) return;
    status.hidden = true;
    status.textContent = '';
  };

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
