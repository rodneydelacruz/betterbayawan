#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const rootDir = 'C:\\Projects\\betterbayawan';

function shouldSkip(filePath) {
  const skipDirs = ['node_modules', '.git', 'dist', '.commandcode'];
  const relative = path.relative(rootDir, filePath);
  const parts = relative.split(path.sep);
  return parts.some(p => skipDirs.includes(p));
}

function replaceInFile(filePath) {
  if (shouldSkip(filePath)) return false;
  
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.html') return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changed = false;
  
  // Replace ILO button text with BIS - handle multiline
  const patterns = [
    // Match ILO between > and < with optional whitespace
    { from: />\s*ILO\s*</g, to: '>BIS<' },
    { from: 'data-lang="ilo"', to: 'data-lang="bis"' },
  ];
  
  for (const { from, to } of patterns) {
    if (from && to) {
      const newContent = content.replace(from, to);
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }
  }
  
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

console.log('Fixing ILO button text to BIS...');
const updatedCount = walkDir(rootDir);
console.log(`\nDone! Updated ${updatedCount} files.`);