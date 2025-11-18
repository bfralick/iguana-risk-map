#!/usr/bin/env node
/**
 * Generate iguana-risk-data.json from CSV
 * Converts the CSV source of truth into a JSON format for the map component
 */

const fs = require('fs');
const path = require('path');

// Risk tier color mappings (Tailwind colors)
const RISK_COLORS = {
  'High': '#DC2626',        // red-600
  'Medium': '#EA580C',      // orange-600
  'Low (Watch)': '#CA8A04', // yellow-600
  'Minimal': '#9CA3AF'      // gray-400
};

const csvPath = path.join(__dirname, '../src/data/florida_iguana_risk_by_county.csv');
const jsonPath = path.join(__dirname, '../src/data/iguana-risk-data.json');

// Read and parse CSV
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

const riskData = {};
let latestUpdateDate = '';

// Parse CSV (skip header)
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];

  // Handle quoted values with commas
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());

  const [county, risk_level, rationale, primary_source, last_updated] = values;

  riskData[county] = {
    risk: risk_level,
    rationale: rationale.replace(/^"|"$/g, ''), // Remove surrounding quotes
    source: primary_source,
    lastUpdated: last_updated,
    color: RISK_COLORS[risk_level] || '#9CA3AF'
  };

  // Track the latest update date
  if (!latestUpdateDate || last_updated > latestUpdateDate) {
    latestUpdateDate = last_updated;
  }
}

// Create output with metadata and data
const output = {
  metadata: {
    lastUpdated: latestUpdateDate,
    totalCounties: Object.keys(riskData).length,
    generatedAt: new Date().toISOString()
  },
  counties: riskData
};

// Write JSON
fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));

console.log(`✅ Generated ${jsonPath}`);
console.log(`   Last updated: ${latestUpdateDate}`);
console.log(`   Total counties: ${Object.keys(riskData).length}`);
console.log(`   High risk: ${Object.values(riskData).filter(d => d.risk === 'High').length}`);
console.log(`   Medium risk: ${Object.values(riskData).filter(d => d.risk === 'Medium').length}`);
console.log(`   Low (Watch): ${Object.values(riskData).filter(d => d.risk === 'Low (Watch)').length}`);
console.log(`   Minimal: ${Object.values(riskData).filter(d => d.risk === 'Minimal').length}`);
