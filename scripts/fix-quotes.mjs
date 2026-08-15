#!/usr/bin/env node

import fs from 'fs';

const filePath = 'C:\\Projects\\betterbayawan\\assets\\js\\translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// Fix unescaped single quotes in single-quoted strings
const fixes = [
  { from: "Mayor's", to: "Mayor\\'s" },
  { from: "City's", to: "City\\'s" },
  { from: "People's", to: "People\\'s" },
  { from: "LGU's", to: "LGU\\'s" },
  { from: "City Hall's", to: "City Hall\\'s" },
];

let changed = false;
for (const { from, to } of fixes) {
  if (from && to) {
    const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (regex.test(content)) {
      content = content.replace(regex, to);
      changed = true;
    }
  }
}

if (changed) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed unescaped quotes in translations.js');
} else {
  console.log('No unescaped quotes found');
}