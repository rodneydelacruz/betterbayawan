#!/usr/bin/env node

import fs from 'fs';

const content = fs.readFileSync('C:\\Projects\\betterbayawan\\react-app\\src\\contexts\\LanguageContext.tsx', 'utf8');

const bisStart = content.indexOf('  bis: {');
const bisEnd = content.indexOf('  },', bisStart) + 2;
const bisSection = content.slice(bisStart, bisEnd);

const keys = [
  'nav-home', 'nav-services', 'nav-government', 'hero-welcome', 
  'hero-subtitle', 'language-bis', 'emergency-hotlines', 
  'weather-location', 'map-attribution', 'quiz-title', 
  'history-title', 'gov-subtitle', 'budget-title', 
  'news-page-title', 'contact-page-title', 'footer-cost'
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