#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const rootDir = 'C:\\Projects\\betterbayawan';

const scriptFiles = [
  'scripts/add-quiz-keys.py',
  'scripts/i18n-upgrade.py',
  'scripts/translate-pass2.py',
  'scripts/translate-pass3.py',
  'scripts/translate-pass3b.py',
  'scripts/translate-pass3c.py',
  'scripts/translate-pass3d.py',
  'scripts/translate-remaining.py',
];

for (const file of scriptFiles) {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Replace 'ilo' with 'bis' in language code contexts
  // Be careful not to replace 'ilocano' in comments or other contexts
  const patterns = [
    { from: "'ilo'", to: "'bis'" },
    { from: '"ilo"', to: '"bis"' },
    { from: 'ilo:', to: 'bis:' },
    { from: 'ilo =', to: 'bis =' },
    { from: 'ilo.get', to: 'bis.get' },
    { from: 'ilo[', to: 'bis[' },
    { from: '.ilo', to: '.bis' },
    { from: 'v_ilo', to: 'v_bis' },
    { from: 'bad_ilo', to: 'bad_bis' },
    { from: 'untranslated_ilo', to: 'untranslated_bis' },
    { from: 'Bisaya (ilo)', to: 'Bisaya (bis)' },
    { from: 'fil/ilo', to: 'fil/bis' },
    { from: 'fil\\/ilo', to: 'fil\\/bis' },
    { from: '# Bisaya (ilo)', to: '# Bisaya (bis)' },
    { from: "lang == 'ilo'", to: "lang == 'bis'" },
    { from: "['en', 'fil', 'ilo']", to: "['en', 'fil', 'bis']" },
    { from: "extract_lang_dict(content, 'ilo')", to: "extract_lang_dict(content, 'bis')" },
    { from: "replace_lang_block(content, 'ilo'", to: "replace_lang_block(content, 'bis'" },
    { from: "verify, 'ilo')", to: "verify, 'bis')" },
    { from: "bis = {}", to: "bis = {}" }, // already correct
    { from: "bis, bis_order =", to: "bis, bis_order =" }, // already correct
    { from: "build_ilo_from_fil", to: "build_bis_from_fil" },
    { from: "build_ilo(", to: "build_bis(" },
    { from: "is_bad_translation(en\\[k\\], ilo.get", to: "is_bad_translation(en[k], bis.get" },
  ];
  
  for (const { from, to } of patterns) {
    if (from && to) {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const newContent = content.replace(regex, to);
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
}

console.log('\nDone updating translation scripts!');