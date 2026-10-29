// Bayawan City at a Glance map (issue #2). MapLibre GL is loaded from a pinned CDN build.
(function () {
  const el = document.getElementById('glance-map');
  if (!el) return;
  const CITY_HALL = [122.7892, 9.3839];
  function start() {
    if (!window.maplibregl) return;
    const mobile = matchMedia('(max-width: 768px)').matches;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const map = new maplibregl.Map({
      container: el,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [122.82, 9.45],
      zoom: 9.5,
      attributionControl: false,
      cooperativeGestures: true,
    });
    map.addControl(
      new maplibregl.AttributionControl({
        compact: true,
        customAttribution:
          'Boundary © <a href="https://gis.ph" target="_blank" rel="noopener">GIS.ph</a>',
      }),
      'bottom-right'
    );
    // Start collapsed to the (i) button; MapLibre auto-expands compact attribution on wide maps.
    map.once('load', () =>
      el
        .querySelectorAll('.maplibregl-compact-show')
        .forEach((n) => n.classList.remove('maplibregl-compact-show'))
    );
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    const load = (u) => fetch(u).then((r) => r.json());
    Promise.all([
      load('/assets/geo/bayawan.geojson'),
      new Promise((ok) => (map.loaded() ? ok() : map.on('load', ok))),
    ])
      .then(([city]) => {
        const g = city.geometry;
        const rings = g.type === 'Polygon' ? [g.coordinates[0]] : g.coordinates.map((p) => p[0]);
        map.addSource('city', { type: 'geojson', data: city });
        map.addLayer({
          id: 'city-fill',
          type: 'fill',
          source: 'city',
          paint: { 'fill-color': '#0032a0', 'fill-opacity': 0.2 },
        });
        map.addLayer({
          id: 'city-halo',
          type: 'line',
          source: 'city',
          paint: { 'line-color': '#fff', 'line-width': 5, 'line-opacity': 0.9 },
        });
        map.addLayer({
          id: 'city-line',
          type: 'line',
          source: 'city',
          paint: { 'line-color': '#0032a0', 'line-width': 2.5 },
        });
        new maplibregl.Marker({ color: '#f77f00' }).setLngLat(CITY_HALL).addTo(map);
        const bounds = new maplibregl.LngLatBounds();
        rings.flat().forEach((p) => bounds.extend(p));
        // Desktop: keep the city clear of the stat cards (left) and weather card (right),
        // which follow the page container edge.
        const box = el.getBoundingClientRect();
        const stats = document.querySelector('.glance-stats')?.getBoundingClientRect();
        const wx = document.querySelector('.glance-wx')?.getBoundingClientRect();
        const padding = mobile
          ? { top: 40, bottom: 206, left: 16, right: 16 }
          : {
              top: 40,
              bottom: 60,
              left: stats ? Math.round(stats.right - box.left) + 20 : 380,
              right: wx ? Math.round(box.right - wx.left) + 20 : 340,
            };
        // Keep the view around the city: up to 4 zoom levels in and 1.5 out from the
        // fitted view, and no panning beyond the area visible when fully zoomed
        // out (the fitted extent scaled 2^1.5x around its centre).
        const fit = map.cameraForBounds(bounds, { padding });
        map.setMinZoom(fit.zoom - 1.5);
        map.setMaxZoom(fit.zoom + 4);
        map.once('moveend', () => {
          const b = map.getBounds();
          const dx = (b.getEast() - b.getWest()) * ((2 ** 1.5 - 1) / 2);
          const dy = (b.getNorth() - b.getSouth()) * ((2 ** 1.5 - 1) / 2);
          map.setMaxBounds([
            [b.getWest() - dx, b.getSouth() - dy],
            [b.getEast() + dx, b.getNorth() + dy],
          ]);
        });
        map.fitBounds(bounds, { padding, duration: reduce ? 0 : 1200 });
      })
      .catch((error) => console.error('Glance map:', error));
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
