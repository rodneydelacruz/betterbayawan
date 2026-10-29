/* Framework-free behavior for the preserved civic pages. */
(() => {
  'use strict';
  const t = (s) => window.TranslationEngine?.t(s) || s;
  const services = window.BayawanData?.services || [];
  const normalize = (s) => s.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
  function matches(query) {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    return services.filter((s) => {
      const corpus = normalize(
        [
          s.title,
          s.description,
          s.office,
          s.category,
          ...s.keywords,
          t(s.title),
          t(s.description),
        ].join(' ')
      );
      return terms.every((term) => corpus.includes(term));
    });
  }
  function card(s) {
    const a = document.createElement('a');
    a.className = 'service-category-card';
    a.href = s.url;
    const content = document.createElement('div');
    content.className = 'service-category-content';
    for (const [tag, key, cls] of [
      ['h2', 'title', 'service-category-title'],
      ['p', 'description', 'service-category-desc'],
      ['span', 'office', 'service-category-link'],
    ]) {
      const e = document.createElement(tag);
      e.className = cls;
      e.textContent = t(s[key]);
      content.append(e);
    }
    a.append(content);
    return a;
  }
  function directory() {
    const input = document.querySelector('.directory-search input');
    if (!input) return;
    const section = document.createElement('section');
    section.className = 'section';
    section.hidden = true;
    section.innerHTML =
      '<div class="container"><p role="status"></p><div class="grid grid-3"></div></div>';
    document.querySelector('.page-header').after(section);
    input.value = new URLSearchParams(location.search).get('q') || '';
    function update() {
      const query = input.value.trim();
      section.hidden = !query;
      const results = matches(query);
      section.querySelector('[role="status"]').textContent = results.length
        ? `${t('Search results')}: ${results.length}`
        : t('No services found. Try another search or browse a category.');
      section.querySelector('.grid').replaceChildren(...results.map(card));
    }
    input.addEventListener('input', update);
    input.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = new URL(location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      else url.searchParams.delete('q');
      history.replaceState(null, '', url);
      update();
    });
    window.addEventListener('languagechange', update);
    update();
  }
  function autocomplete() {
    const input = document.getElementById('hero-search');
    if (!input) return;
    const wrapper = input.closest('.search-autocomplete-wrapper') || input.parentElement;
    const list = document.createElement('ul');
    list.className = 'search-results-panel';
    list.id = 'service-suggestions';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    wrapper.append(list);
    input.setAttribute('aria-controls', list.id);
    input.setAttribute('aria-autocomplete', 'list');
    let active = -1;
    const close = () => {
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      active = -1;
    };
    function update() {
      active = -1;
      const results = input.value.trim().length >= 2 ? matches(input.value).slice(0, 6) : [];
      list.replaceChildren();
      results.forEach((s, i) => {
        const li = document.createElement('li');
        li.id = `service-option-${i}`;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', 'false');
        const a = document.createElement('a');
        a.href = s.url;
        a.textContent = t(s.title);
        a.tabIndex = -1;
        li.append(a);
        list.append(li);
      });
      list.hidden = results.length === 0;
      input.setAttribute('aria-expanded', String(!list.hidden));
    }
    input.addEventListener('input', update);
    input.addEventListener('focus', update);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (list.hidden) return;
      const items = [...list.children];
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
        input.setAttribute('aria-activedescendant', items[active].id);
        items[active].scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter' && active >= 0) {
        e.preventDefault();
        location.assign(items[active].querySelector('a').href);
      }
    });
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) close();
    });
    input.addEventListener('blur', () => setTimeout(close, 150));
  }
  async function weather() {
    const target = document.querySelector('.weather-loading');
    if (!target) return;
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=9.3839&longitude=122.7892&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=2&timezone=Asia%2FManila',
        { signal: AbortSignal.timeout(12000) }
      );
      if (!response.ok) throw Error('Weather request failed');
      const data = await response.json(),
        c = data.current;
      if (!c || !Number.isFinite(c.temperature_2m)) throw Error('Weather unavailable');
      const code = c.weather_code;
      const label =
        code === 0
          ? 'Clear sky'
          : code <= 3
            ? 'Cloudy'
            : code < 50
              ? 'Fog'
              : code < 70
                ? 'Rain'
                : code >= 95
                  ? 'Thunderstorm'
                  : 'Showers';
      const iconFor = (code) =>
        code === 0
          ? 'bi-sun-fill'
          : code >= 95
            ? 'bi-cloud-lightning-rain-fill'
            : code >= 50
              ? 'bi-cloud-rain-fill'
              : 'bi-cloud-fill';
      const icon = iconFor(code);
      const hours = data.hourly.time
        .map((time, i) => ({
          time,
          temp: data.hourly.temperature_2m[i],
          code: data.hourly.weather_code[i],
        }))
        .filter((h) => h.time > c.time)
        .slice(0, 4);
      target.className = 'weather-widget';
      target.removeAttribute('aria-busy');
      target.innerHTML = `<div class="weather-current"><div class="weather-current-icon" aria-hidden="true"><i class="bi ${icon}"></i></div><div class="weather-current-info"><div class="weather-current-temp">${Math.round(c.temperature_2m)}°C</div><div class="weather-current-condition">${t(label)}</div><div class="weather-current-location"><i class="bi bi-geo-alt" aria-hidden="true"></i> Bayawan City</div></div></div><div class="weather-stats"><div class="weather-stat"><i class="bi bi-droplet" aria-hidden="true"></i><span>${c.relative_humidity_2m}%</span></div><div class="weather-stat"><i class="bi bi-wind" aria-hidden="true"></i><span>${Math.round(c.wind_speed_10m)} km/h</span></div></div><div class="weather-hourly">${hours.map((h) => `<div class="weather-hour"><span class="weather-hour-time">${new Intl.DateTimeFormat('en-PH', { hour: 'numeric', timeZone: 'Asia/Manila' }).format(new Date(h.time + '+08:00'))}</span><i class="bi ${iconFor(h.code)}" aria-hidden="true"></i><span class="weather-hour-temp">${Math.round(h.temp)}°</span></div>`).join('')}</div>`;
      target.setAttribute('aria-label', t('Current conditions'));
      target.removeAttribute('data-loading');
    } catch {
      target.className = 'weather-widget';
      target.removeAttribute('aria-busy');
      target.innerHTML =
        '<p>' +
        t('Weather unavailable') +
        '</p><p>' +
        t('Live weather could not be loaded. Try again later.') +
        '</p>';
    }
  }
  function init() {
    directory();
    autocomplete();
    weather();
    document.querySelectorAll('.table-responsive').forEach((e) => {
      e.tabIndex = 0;
      e.setAttribute('role', 'region');
      e.setAttribute('aria-label', t('Scrollable table'));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
