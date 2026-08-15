#!/usr/bin/env node

import fs from 'fs';

// Fix info-bar.js
let content = fs.readFileSync('C:\\Projects\\betterbayawan\\assets\\js\\info-bar.js', 'utf8');

const replacements = [
  { from: 'Bayawan City_LAT', to: 'BayawanCity_LAT' },
  { from: 'Bayawan City_LON', to: 'BayawanCity_LON' },
];

for (const { from, to } of replacements) {
  const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  content = content.replace(regex, to);
}

fs.writeFileSync('C:\\Projects\\betterbayawan\\assets\\js\\info-bar.js', content, 'utf8');
console.log('Fixed info-bar.js');

// Fix weather-map.js
content = fs.readFileSync('C:\\Projects\\betterbayawan\\assets\\js\\weather-map.js', 'utf8');

for (const { from, to } of replacements) {
  const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  content = content.replace(regex, to);
}

fs.writeFileSync('C:\\Projects\\betterbayawan\\assets\\js\\weather-map.js', content, 'utf8');
console.log('Fixed weather-map.js');