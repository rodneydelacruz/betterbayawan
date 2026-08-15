#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const filePath = 'C:\\Projects\\betterbayawan\\assets\\js\\translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// Fix translation keys that still have "nueva-vizcaya" in them
const keyFixes = [
  { from: 'home-Bayawan City-municipal-hall-nueva-vizcaya-6221', to: 'home-bayawan-city-hall-negros-oriental-6221' },
  { from: 'home-Bayawan City-nueva-vizcaya-6221', to: 'home-bayawan-city-negros-oriental-6221' },
  { from: 'home-how-well-do-you-know-Bayawan City-nueva-vizcaya', to: 'home-how-well-do-you-know-bayawan-city-negros-oriental' },
  { from: 'assessor-municipal-hall-ground-floor-Bayawan City-nueva-vizcaya', to: 'assessor-city-hall-ground-floor-bayawan-city-negros-oriental' },
  { from: 'bc-municipal-hall-2nd-floor-Bayawan City-nueva-vizcaya', to: 'bc-city-hall-2nd-floor-bayawan-city-negros-oriental' },
  { from: 'cr-municipal-hall-ground-floor-Bayawan City-nueva-vizcaya', to: 'cr-city-hall-ground-floor-bayawan-city-negros-oriental' },
  { from: 'dc-municipal-hall-2nd-floor-Bayawan City-nueva-vizcaya', to: 'dc-city-hall-2nd-floor-bayawan-city-negros-oriental' },
  { from: 'gs-municipal-hall-ground-floor-Bayawan City-nueva-vizcaya', to: 'gs-city-hall-ground-floor-bayawan-city-negros-oriental' },
  { from: 'mc-municipal-hall-2nd-floor-Bayawan City-nueva-vizcaya', to: 'mc-city-hall-2nd-floor-bayawan-city-negros-oriental' },
  { from: 'mpdo-2nd-floor-municipal-hall-Bayawan City-nueva-vizcaya', to: 'mpdo-2nd-floor-city-hall-bayawan-city-negros-oriental' },
  { from: 'market-seedo-office-public-market-Bayawan City-nueva-vizcaya', to: 'market-seedo-office-public-market-bayawan-city-negros-oriental' },
  { from: 'slaughter-seedo-slaughterhouse-Bayawan City-nueva-vizcaya', to: 'slaughter-seedo-slaughterhouse-bayawan-city-negros-oriental' },
  { from: 'treas-ground-floor-municipal-hall-Bayawan City-nueva-vizcaya', to: 'treas-ground-floor-city-hall-bayawan-city-negros-oriental' },
  { from: 'tricycle-municipal-hall-Bayawan City-nueva-vizcaya', to: 'tricycle-city-hall-bayawan-city-negros-oriental' },
  { from: 'offline-emergency-hotlines-Bayawan City-nueva-vizcaya', to: 'offline-emergency-hotlines-bayawan-city-negros-oriental' },
  { from: 'budget-implementing-agency-nueva-vizcaya-district', to: 'budget-implementing-agency-negros-oriental-district' },
  { from: 'edu-nueva-vizcaya-caregiver-academy', to: 'edu-negros-oriental-caregiver-academy' },
  { from: 'budget-fcds-package-5-magat-river-flood-control', to: 'budget-fcds-package-5-bayawan-river-flood-control' },
  { from: 'budget-magat-river-bagahabag-section-Bayawan City-nueva-vizcaya', to: 'budget-bayawan-river-bagahabag-section-bayawan-city-negros-oriental' },
  { from: 'budget-magat-river-bangar-section-1-brgy-bangar-Bayawan City', to: 'budget-bayawan-river-bangar-section-1-brgy-bangar-bayawan-city' },
  { from: 'budget-magat-river-bangar-section-2-brgy-bangar-Bayawan City', to: 'budget-bayawan-river-bangar-section-2-brgy-bangar-bayawan-city' },
];

for (const { from, to } of keyFixes) {
  if (from && to) {
    // Escape special regex characters
    const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, to);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed translation keys in translations.js');