#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const rootDir = 'C:\\Projects\\betterbayawan';

const replacements = [
  // Language code
  { from: 'data-lang="bis"', to: 'data-lang="bis"' },
  { from: "data-lang='bis'", to: "data-lang='bis'" },
  { from: 'data-lang="bis"', to: 'data-lang="bis"' },
  
  // Language display text
  { from: '>BIS<', to: '>BIS<' },
  { from: '>Bisaya<', to: '>Bisaya<' },
  
  // LanguageContext.tsx
  { from: "'bis': {", to: "'bis': {" },
  { from: '"bis": {', to: '"bis": {' },
  { from: 'bis: {', to: 'bis: {' },
  
  // Comments and labels
  { from: '// Bisaya', to: '// Bisaya' },
  { from: '// Navigation - Bisaya', to: '// Navigation - Bisaya' },
  { from: '// Common Labels - Bisaya', to: '// Common Labels - Bisaya' },
  { from: '// Health Page - Bisaya', to: '// Health Page - Bisaya' },
  
  // Documentation
  { from: 'Translate to Filipino or Bisaya', to: 'Translate to Filipino or Bisaya' },
  { from: 'Bisaya translations', to: 'Bisaya translations' },
  { from: 'Bisaya vocabulary', to: 'Bisaya vocabulary' },
  
  // Content references
  { from: 'Bisaya', to: 'Bisaya' },
  { from: 'Bisaya', to: 'bisaya' },
];

function shouldSkip(filePath) {
  const skipDirs = ['node_modules', '.git', 'dist', '.commandcode'];
  const relative = path.relative(rootDir, filePath);
  const parts = relative.split(path.sep);
  return parts.some(p => skipDirs.includes(p));
}

function replaceInFile(filePath) {
  if (shouldSkip(filePath)) return false;
  
  const ext = path.extname(filePath).toLowerCase();
  const skipExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.lottie', '.map', '.min.js', '.min.css'];
  if (skipExts.includes(ext)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changed = false;
  
  // Protect historical references - "Bisaya" might appear in historical context
  // But for this project, we want to replace all instances since it's a language change
  
  for (const { from, to } of replacements) {
    if (from && to) {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      if (regex.test(content)) {
        content = content.replace(regex, to);
        changed = true;
      }
    }
  }
  
  // Fix double replacements
  content = content.replace(/data-lang="bis"/g, 'data-lang="bis"');
  content = content.replace(/bis: {/g, 'bis: {');
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += walkDir(fullPath);
    } else {
      if (replaceInFile(fullPath)) count++;
    }
  }
  return count;
}

console.log('Starting ILO to BIS replacement...');
const updatedCount = walkDir(rootDir);
console.log(`\nDone! Updated ${updatedCount} files.`);