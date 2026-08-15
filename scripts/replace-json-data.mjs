#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const rootDir = 'C:\\Projects\\betterbayawan\\data';

const replacements = [
  // Core location
  { from: 'Solano, Nueva Vizcaya', to: 'Bayawan City, Negros Oriental' },
  { from: 'Solano, Nueva Vizcaya 3708', to: 'Bayawan City, Negros Oriental 6221' },
  { from: 'Nueva Vizcaya', to: 'Negros Oriental' },
  { from: 'Solano', to: 'Bayawan City' },
  
  // Government terminology
  { from: 'Municipality of Solano', to: 'City of Bayawan' },
  { from: 'Municipality of Bayawan City', to: 'City of Bayawan' },
  { from: 'Municipal Hall', to: 'City Hall' },
  { from: 'Municipal Health Office', to: 'City Health Office' },
  { from: 'Municipal Housing Board', to: 'City Housing Board' },
  { from: 'Municipal Development Council', to: 'City Development Council' },
  { from: 'Municipal Nutrition', to: 'City Nutrition' },
  { from: 'Municipal Pharmacy', to: 'City Pharmacy' },
  { from: 'Municipal Public Market', to: 'City Public Market' },
  { from: 'Municipal Solid Waste', to: 'City Solid Waste' },
  { from: 'Municipal Government', to: 'City Government' },
  { from: 'Municipal Mayor', to: 'City Mayor' },
  { from: 'Municipal Assessor', to: 'City Assessor' },
  { from: 'Municipal General Services', to: 'City General Services' },
  { from: 'Municipal Trial Court', to: 'City Trial Court' },
  { from: 'Municipal Ordinance', to: 'City Ordinance' },
  { from: 'Municipal Resolution', to: 'City Resolution' },
  
  // Sangguniang
  { from: 'Sangguniang Bayan ng Solano', to: 'Sangguniang Panlungsod ng Bayawan' },
  { from: 'Sangguniang Bayan ng Bayawan City', to: 'Sangguniang Panlungsod ng Bayawan' },
  { from: 'Sangguniang Bayan of Solano', to: 'Sangguniang Panlungsod of Bayawan' },
  { from: 'Sangguniang Bayan', to: 'Sangguniang Panlungsod' },
  { from: 'Sangguniang Panlalawigan of Nueva Vizcaya', to: 'Sangguniang Panlalawigan of Negros Oriental' },
  
  // LGU
  { from: 'LGU Solano', to: 'LGU Bayawan City' },
  { from: 'Local Government Unit of Solano', to: 'Local Government Unit of Bayawan City' },
  
  // Specific offices
  { from: 'BFP Solano', to: 'BFP Bayawan' },
  { from: 'DILG Solano', to: 'DILG Bayawan' },
  { from: 'MAGRO Solano', to: 'MAGRO Bayawan' },
  { from: 'MDRRMO Solano', to: 'MDRRMO Bayawan' },
  { from: 'MSWDO Solano', to: 'MSWDO Bayawan' },
  { from: 'NUVELCO Solano', to: 'NUVELCO Bayawan' },
  { from: 'PNP Solano', to: 'PNP Bayawan' },
  { from: 'RHU Solano', to: 'RHU Bayawan' },
  
  // Institutions
  { from: 'Nueva Vizcaya State University', to: 'Negros Oriental State University' },
  { from: 'Nueva Vizcaya Caregiver Academy', to: 'Negros Oriental Caregiver Academy' },
  { from: 'Nueva Vizcaya District Engineering Office', to: 'Negros Oriental District Engineering Office' },
  { from: 'Nueva Vizcaya Provincial Hospital', to: 'Negros Oriental Provincial Hospital' },
  { from: 'Nueva Vizcaya Provincial Athletic Association', to: 'Negros Oriental Provincial Athletic Association' },
  { from: 'Provincial Government Unit of Nueva Vizcaya', to: 'Provincial Government Unit of Negros Oriental' },
  { from: 'Governor Atty. Jose V. Gambito', to: 'Governor (Negros Oriental)' },
  
  // Locations
  { from: 'Solano Public Market', to: 'Bayawan Public Market' },
  { from: 'Solano District Jail', to: 'Bayawan City Jail' },
  { from: 'Solano Municipal Hall', to: 'Bayawan City Hall' },
  { from: 'Solano North ES', to: 'Bayawan North ES' },
  { from: 'Solano West Elementary School', to: 'Bayawan West Elementary School' },
  { from: 'Solano Swimming Team', to: 'Bayawan Swimming Team' },
  { from: 'Solano Cultural and Innovation Hub', to: 'Bayawan Cultural and Innovation Hub' },
  { from: 'Solano March', to: 'Bayawan March' },
  { from: 'Pagbiagan Song', to: 'Pagbiagan Song' }, // keep
  
  // Barangays - replace with generic
  { from: 'Brgy. Curifang, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Bangar, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Dadap, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Poblacion, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Quezon, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Wacal, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. San Juan, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Bagahabag, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Lactawan, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Uddiawan, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Brgy. Commonal, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Barangay Quezon, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Barangay Bagahabag, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Barangay Bangar, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Barangay Curifang, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Barangay Dadap, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Barangay Poblacion, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Barangay Wacal, Solano, Nueva Vizcaya', to: 'Barangay, Bayawan City, Negros Oriental' },
  { from: 'Sitios Mendoza Road, Nampayacan and Tanggal Bato', to: '' },
  { from: 'San Luis, Lone District, Solano, Nueva Vizcaya', to: 'Bayawan City, Negros Oriental' },
  { from: 'Lone District, Solano, Nueva Vizcaya', to: 'Bayawan City, Negros Oriental' },
  { from: 'Wacal, Lone District, Solano, Nueva Vizcaya', to: 'Bayawan City, Negros Oriental' },
  { from: 'Poblacion South, Solano, Nueva Vizcaya', to: 'Bayawan City, Negros Oriental' },
  { from: 'Magat River, Bagahabag Section, Solano, Nueva Vizcaya', to: 'Bayawan River, Bayawan City, Negros Oriental' },
  { from: 'Magat River, Bangar Section 1, Brgy. Bangar, Solano, Nueva Vizcaya', to: 'Bayawan River, Bayawan City, Negros Oriental' },
  { from: 'Magat River, Bangar Section 2, Brgy. Bangar, Solano, Nueva Vizcaya', to: 'Bayawan River, Bayawan City, Negros Oriental' },
  { from: 'Magat River', to: 'Bayawan River' },
  
  // Data fields
  { from: '"municipality": "Solano"', to: '"municipality": "Bayawan City"' },
  { from: '"province": "Nueva Vizcaya"', to: '"province": "Negros Oriental"' },
  
  // Postal code
  { from: '3708', to: '6221' },
  
  // Names - keep historical
  // Ramon Solano y Llanderal - keep as historical figure
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changed = false;
  
  // Protect historical figure
  const historicalMarker = '___HISTORICAL_RAMON_SOLANO_Y_LLANDERAL___';
  content = content.replace(/Ramon Solano y Llanderal/g, historicalMarker);
  
  for (const { from, to } of replacements) {
    if (from && to) {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      if (regex.test(content)) {
        content = content.replace(regex, to);
        changed = true;
      }
    }
  }
  
  // Restore
  content = content.replace(new RegExp(historicalMarker, 'g'), 'Ramon Solano y Llanderal');
  
  // Fix double replacements
  content = content.replace(/City of Bayawan City/g, 'City of Bayawan');
  content = content.replace(/Bayawan City City/g, 'Bayawan City');
  content = content.replace(/Sangguniang Panlungsod ng Bayawan City/g, 'Sangguniang Panlungsod ng Bayawan');
  content = content.replace(/LGU Bayawan City City/g, 'LGU Bayawan City');
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
    return true;
  }
  return false;
}

const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.json'));
let count = 0;
for (const file of files) {
  if (replaceInFile(path.join(rootDir, file))) count++;
}

console.log(`\nDone! Updated ${count} JSON files.`);