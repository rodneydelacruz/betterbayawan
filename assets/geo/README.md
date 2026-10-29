# Map boundary

Used by the home page "Bayawan City at a Glance" map (`assets/js/pages/glance-map.js`).

- `bayawan.geojson`: City of Bayawan (PSGC 1804606000) from GIS.ph,
  `GET https://api.gis.ph/v1/municities/1804606000?format=geojson&geometry=detailed`,
  coordinates rounded to 5 decimals. The source and fetch date are in the feature properties.

The file is committed as a static asset; nothing fetches it at build or run time, so no API key
is needed to build or serve the site. To refresh it, re-run the request above with a GIS.ph API key
and commit the result.

Boundary data © GIS.ph (https://gis.ph). The credit is shown in the map attribution.
