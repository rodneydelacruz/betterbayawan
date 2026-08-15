#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const rootDir = 'C:\\Projects\\betterbayawan';

// Replacements to make
const replacements = [
  // Core location changes
  { from: 'Bayawan City, Negros Oriental', to: 'Bayawan City, Negros Oriental' },
  { from: 'Bayawan City, Negros Oriental 6221', to: 'Bayawan City, Negros Oriental 6221' },
  { from: 'Negros Oriental', to: 'Negros Oriental' },
  { from: 'Bayawan City', to: 'Bayawan City' },
  
  // Government terminology (city vs municipality)
  { from: 'City of Bayawan', to: 'City of Bayawan' },
  { from: 'City of Bayawan', to: 'City of Bayawan' },
  { from: 'City Hall', to: 'City Hall' },
  { from: 'City Health Office', to: 'City Health Office' },
  { from: 'City Accounting Office', to: 'City Accounting Office' },
  { from: 'City Agriculture Office', to: 'City Agriculture Office' },
  { from: 'City Assessor', to: 'City Assessor' },
  { from: 'City Budget Office', to: 'City Budget Office' },
  { from: 'City Civil Registrar', to: 'City Civil Registrar' },
  { from: 'City Disaster Risk Reduction', to: 'City Disaster Risk Reduction' },
  { from: 'City Engineering Office', to: 'City Engineering Office' },
  { from: 'City Environment', to: 'City Environment' },
  { from: 'City General Services', to: 'City General Services' },
  { from: 'City Legal Office', to: 'City Legal Office' },
  { from: 'City Planning', to: 'City Planning' },
  { from: 'City Social Welfare', to: 'City Social Welfare' },
  { from: 'City Treasurer', to: 'City Treasurer' },
  { from: 'City Vice Mayor', to: 'City Vice Mayor' },
  { from: 'City Mayor', to: 'City Mayor' },
  { from: 'City Council', to: 'City Council' },
  { from: 'City Ordinance', to: 'City Ordinance' },
  { from: 'City Resolution', to: 'City Resolution' },
  { from: 'City Development Council', to: 'City Development Council' },
  { from: 'City Nutrition', to: 'City Nutrition' },
  { from: 'City Pharmacy', to: 'City Pharmacy' },
  { from: 'City Public Market', to: 'City Public Market' },
  { from: 'City Solid Waste', to: 'City Solid Waste' },
  { from: 'City Trial Court', to: 'City Trial Court' },
  
  // Sangguniang Panlungsod → Sangguniang Panlungsod
  { from: 'Sangguniang Panlungsod ng Bayawan', to: 'Sangguniang Panlungsod ng Bayawan' },
  { from: 'Sangguniang Panlungsod ng Bayawan', to: 'Sangguniang Panlungsod ng Bayawan' },
  { from: 'Sangguniang Panlungsod', to: 'Sangguniang Panlungsod' },
  { from: 'Sangguniang Panlungsod ng Bayawan', to: 'Sangguniang Panlungsod ng Bayawan' },
  
  // LGU references
  { from: 'LGU Bayawan City', to: 'LGU Bayawan City' },
  { from: 'LGU Bayawan City', to: 'LGU Bayawan City' }, // already correct
  
  // Branding
  { from: 'BetterBayawan City', to: 'BetterBayawan' },
  { from: 'betterBayawan City', to: 'betterbayawan' },
  { from: 'betterbayawan.org', to: 'betterbayawan.org' }, // already correct
  
  // URLs and social media
  { from: 'Bayawan City.gov.ph', to: 'bayawan.gov.ph' },
  { from: 'OfficialLGUBayawan City', to: 'OfficialLGUBayawan' },
  { from: 'OfficialLguBayawan City', to: 'OfficialLguBayawan' },
  { from: 'OfficialLguBayawan CityFanpage', to: 'OfficialLguBayawanFanpage' },
  
  // Specific names that should NOT change (historical figures)
  // These will be handled carefully - we need to preserve "___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___" as historical name
  
  // Postal code
  { from: '6221', to: '6221' },
  
  // Province references in addresses
  { from: 'Negros Oriental 6221', to: 'Negros Oriental 6221' },
  { from: 'Negros Oriental', to: 'Negros Oriental' },
  
  // Contact office names
  { from: 'BFP Bayawan City', to: 'BFP Bayawan' },
  { from: 'DILG Bayawan City', to: 'DILG Bayawan' },
  { from: 'MAGRO Bayawan City', to: 'MAGRO Bayawan' },
  { from: 'MDRRMO Bayawan City', to: 'MDRRMO Bayawan' },
  { from: 'MSWDO Bayawan City', to: 'MSWDO Bayawan' },
  { from: 'NUVELCO Bayawan City', to: 'NUVELCO Bayawan' },
  { from: 'PNP Bayawan City', to: 'PNP Bayawan' },
  { from: 'RHU Bayawan City', to: 'RHU Bayawan' },
  
  // Education institutions (these might be specific to Bayawan City)
  { from: 'Isaiah Christian Academy of Bayawan City, Inc.', to: 'Isaiah Christian Academy of Bayawan, Inc.' },
  { from: 'Negros Oriental Caregiver Academy', to: 'Negros Oriental Caregiver Academy' },
  { from: 'Negros Oriental State University', to: 'Negros Oriental State University' },
  { from: 'Saint Mary', to: 'Saint Mary' }, // keep as is
  
  // Hospitals/Health
  { from: 'Bayawan City Public Market', to: 'Bayawan Public Market' },
  { from: 'Bayawan City Municipal Hospital', to: 'Bayawan City Hospital' },
  { from: 'Bayawan City District Jail', to: 'Bayawan City Jail' },
  
  // Barangays - these are specific to Bayawan City, would need actual Bayawan barangays
  // We'll leave barangay names as placeholders for now
  { from: 'Barangay Quezon, Bayawan City', to: 'Barangay, Bayawan City' },
  { from: 'Barangay Bagahabag, Bayawan City', to: 'Barangay, Bayawan City' },
  { from: 'Barangay Bangar, Bayawan City', to: 'Barangay, Bayawan City' },
  { from: 'Barangay Curifang, Bayawan City', to: 'Barangay, Bayawan City' },
  { from: 'Barangay Dadap, Bayawan City', to: 'Barangay, Bayawan City' },
  { from: 'Barangay Poblacion, Bayawan City', to: 'Barangay, Bayawan City' },
  { from: 'Barangay Wacal, Bayawan City', to: 'Barangay, Bayawan City' },
  { from: 'Brgy. Quezon, Bayawan City', to: 'Brgy., Bayawan City' },
  { from: 'Brgy. Bangar, Bayawan City', to: 'Brgy., Bayawan City' },
  { from: 'Brgy. Curifang, Bayawan City', to: 'Brgy., Bayawan City' },
  { from: 'Brgy. Dadap, Bayawan City', to: 'Brgy., Bayawan City' },
  { from: 'Brgy. Poblacion, Bayawan City', to: 'Brgy., Bayawan City' },
  { from: 'Brgy. Wacal, Bayawan City', to: 'Brgy., Bayawan City' },
  { from: 'Sitios Mendoza Road, Nampayacan and Tanggal Bato', to: '' }, // remove specific Bayawan City references
  
  // Historical figure - KEEP "___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___" as historical name
  // We'll handle this by not replacing when it's part of the historical name
];

// Files to skip
const skipDirs = ['node_modules', '.git', 'dist', 'docs', '.commandcode'];
const skipFiles = ['package-lock.json', 'version.json'];

function shouldSkip(filePath) {
  const relative = path.relative(rootDir, filePath);
  const parts = relative.split(path.sep);
  return parts.some(p => skipDirs.includes(p)) || skipFiles.includes(path.basename(filePath));
}

function replaceInFile(filePath) {
  if (shouldSkip(filePath)) return false;
  
  const ext = path.extname(filePath).toLowerCase();
  const skipExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.lottie', '.json', '.map', '.min.js', '.min.css'];
  if (skipExts.includes(ext)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changed = false;
  
  // Special handling for historical figure "___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___"
  // Temporarily protect this phrase
  const historicalMarker = '___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___';
  content = content.replace(/___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___/g, historicalMarker);
  
  // Also protect "___Bayawan City_MARCH___" and "___Bayawan City_QUIZ___" as brand names that might need different handling
  const Bayawan CityMarchMarker = '___Bayawan City_MARCH___';
  content = content.replace(/___Bayawan City_MARCH___/g, Bayawan CityMarchMarker);
  
  const Bayawan CityQuizMarker = '___Bayawan City_QUIZ___';
  content = content.replace(/___Bayawan City_QUIZ___/g, Bayawan CityQuizMarker);
  
  // Apply replacements
  for (const { from, to } of replacements) {
    if (from && to) {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      if (regex.test(content)) {
        content = content.replace(regex, to);
        changed = true;
      }
    }
  }
  
  // Restore protected phrases (but with Bayawan City for the quiz)
  content = content.replace(new RegExp(historicalMarker, 'g'), '___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___');
  content = content.replace(new RegExp(Bayawan CityMarchMarker, 'g'), 'Bayawan March');
  content = content.replace(new RegExp(Bayawan CityQuizMarker, 'g'), 'Bayawan Quiz');
  
  // Fix any double replacements like "City of Bayawan"
  content = content.replace(/City of Bayawan/g, 'City of Bayawan');
  content = content.replace(/Bayawan City/g, 'Bayawan City');
  content = content.replace(/LGU Bayawan City/g, 'LGU Bayawan City');
  content = content.replace(/Sangguniang Panlungsod ng Bayawan/g, 'Sangguniang Panlungsod ng Bayawan');
  
  // Fix "Municipal" that became "City" incorrectly in some contexts
  content = content.replace(/City Mayor/g, 'City Mayor');
  content = content.replace(/City Vice Mayor/g, 'City Vice Mayor');
  
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

console.log('Starting location replacement...');
const updatedCount = walkDir(rootDir);
console.log(`\nDone! Updated ${updatedCount} files.`);