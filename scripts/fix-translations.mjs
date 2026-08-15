#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const filePath = 'C:\\Projects\\betterbayawan\\assets\\js\\translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// Fix remaining issues
const fixes = [
  // Fix "nueva-vizcaya" in translation keys and values
  { from: 'Bayawan City-nueva-vizcaya', to: 'Bayawan City, Negros Oriental' },
  { from: 'nueva-vizcaya-district', to: 'negros-oriental-district' },
  { from: 'nueva-vizcaya-caregiver-academy', to: 'negros-oriental-caregiver-academy' },
  { from: 'Negros Oriental Caregiver Academy', to: 'Negros Oriental Caregiver Academy' },
  
  // Fix Magat River references
  { from: 'Magat River Flood Control', to: 'Bayawan River Flood Control' },
  { from: 'Magat River, Bagahabag Section', to: 'Bayawan River, Bayawan City' },
  { from: 'Magat River, Bangar Section 1', to: 'Bayawan River, Bangar Section 1' },
  { from: 'Magat River, Bangar Section 2', to: 'Bayawan River, Bangar Section 2' },
  { from: 'Magat River, Bangar Seksyon 1', to: 'Bayawan River, Bangar Section 1' },
  { from: 'Magat River, Bangar Seksyon 2', to: 'Bayawan River, Bangar Section 2' },
  { from: 'Magat River, Bangar Seksion 1', to: 'Bayawan River, Bangar Section 1' },
  { from: 'Magat River, Bangar Seksion 2', to: 'Bayawan River, Bangar Section 2' },
  
  // Fix "Municipal Hall" to "City Hall" in translation values
  { from: 'Bayawan City Hall, Negros Oriental', to: 'Bayawan City Hall, Negros Oriental' },
  { from: 'City Hall, Bayawan City, Negros Oriental', to: 'City Hall, Bayawan City, Negros Oriental' },
  
  // Fix email-like keys
  { from: 'lguBayawan Citynvgmailcom', to: 'lguBayawanCity@gmail.com' },
  { from: 'assessorBayawan Citygovph', to: 'assessor@BayawanCity.gov.ph' },
  { from: 'lcrBayawan Citygovph', to: 'lcr@BayawanCity.gov.ph' },
  
  // Fix "Munisipyo" and "Munisipalidad" - these are Filipino/Bisaya for municipality
  // In a city context, these should be "Lungsod" or "Ciudad"
  // But let's keep the translations as they are for now since they're in other languages
];

for (const { from, to } of fixes) {
  if (from && to) {
    const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    content = content.replace(regex, to);
  }
}

// Fix translation keys that have spaces (should use hyphens)
// This is more complex, let's just fix the values

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed translations.js');