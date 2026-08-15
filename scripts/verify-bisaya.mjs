#!/usr/bin/env node

import fs from 'fs';

const content = fs.readFileSync('C:\\Projects\\betterbayawan\\assets\\js\\translations.js', 'utf8');

const bisStart = content.indexOf('  bis: {');
const bisEnd = content.indexOf('};', bisStart);
const bisSection = content.slice(bisStart, bisEnd + 2);

const keys = [
  'nav-home', 'nav-services', 'nav-government', 'hero-welcome', 
  'hero-subtitle', 'stats-title', 'footer-cost', 'language-bis', 
  'emergency-hotlines', 'weather-location', 'map-attribution', 
  'quiz-title', 'history-title', 'gov-subtitle', 'budget-title', 
  'news-title', 'contact-title', 'service-requirements', 
  'cert-birth', 'biz-permit', 'health-title', 'social-title', 
  'agri-title', 'env-title', 'infra-title', 'edu-title', 
  'safety-title', 'tax-title'
];

for (const key of keys) {
  const regex = new RegExp("'" + key + "'\\s*:\\s*'([^']*)'");
  const match = bisSection.match(regex);
  if (match) {
    console.log(key + ': ' + match[1]);
  } else {
    console.log(key + ': MISSING');
  }
}