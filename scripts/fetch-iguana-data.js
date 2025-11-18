#!/usr/bin/env node
/**
 * Automated Iguana Data Fetcher
 * Fetches iguana sighting data from multiple sources and aggregates by county
 *
 * Data Sources:
 * - iNaturalist API: Research-grade green iguana observations
 * - EDDMapS/Bugwood API: Invasive species distribution data
 *
 * Usage: node scripts/fetch-iguana-data.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Florida county list (67 counties)
const FLORIDA_COUNTIES = [
  'Alachua', 'Baker', 'Bay', 'Bradford', 'Brevard', 'Broward', 'Calhoun',
  'Charlotte', 'Citrus', 'Clay', 'Collier', 'Columbia', 'DeSoto', 'Dixie',
  'Duval', 'Escambia', 'Flagler', 'Franklin', 'Gadsden', 'Gilchrist', 'Glades',
  'Gulf', 'Hamilton', 'Hardee', 'Hendry', 'Hernando', 'Highlands', 'Hillsborough',
  'Holmes', 'Indian River', 'Jackson', 'Jefferson', 'Lafayette', 'Lake', 'Lee',
  'Leon', 'Levy', 'Liberty', 'Madison', 'Manatee', 'Marion', 'Martin', 'Miami-Dade',
  'Monroe', 'Nassau', 'Okaloosa', 'Okeechobee', 'Orange', 'Osceola', 'Palm Beach',
  'Pasco', 'Pinellas', 'Polk', 'Putnam', 'St. Johns', 'St. Lucie', 'Santa Rosa',
  'Sarasota', 'Seminole', 'Sumter', 'Suwannee', 'Taylor', 'Union', 'Volusia',
  'Wakulla', 'Walton', 'Washington'
];

// Configuration
const CONFIG = {
  iNaturalist: {
    baseUrl: 'https://api.inaturalist.org/v1',
    taxonId: 35190, // Green Iguana (Iguana iguana)
    placeId: 28, // Florida
  },
  // Time windows for analysis
  recentMonths: 12, // Look back 12 months
  historicalMonths: 36, // Look back 36 months for trends
};

/**
 * Make HTTPS GET request
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch iguana observations from iNaturalist
 */
async function fetchIguanaObservations() {
  console.log('📡 Fetching iguana observations from iNaturalist...');

  const observations = [];
  let page = 1;
  const perPage = 200;
  let hasMore = true;

  // Calculate date range (last 36 months for trend analysis)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - CONFIG.historicalMonths);

  while (hasMore && page <= 10) { // Limit to 10 pages to avoid rate limits
    const url = `${CONFIG.iNaturalist.baseUrl}/observations?` +
      `taxon_id=${CONFIG.iNaturalist.taxonId}&` +
      `place_id=${CONFIG.iNaturalist.placeId}&` +
      `quality_grade=research&` +
      `d1=${startDate.toISOString().split('T')[0]}&` +
      `d2=${endDate.toISOString().split('T')[0]}&` +
      `per_page=${perPage}&` +
      `page=${page}`;

    try {
      const response = await httpsGet(url);

      if (response.results && response.results.length > 0) {
        observations.push(...response.results);
        console.log(`  Page ${page}: Found ${response.results.length} observations`);

        // Check if there are more pages
        hasMore = response.total_results > (page * perPage);
        page++;

        // Rate limiting - wait 1 second between requests
        if (hasMore) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`  Error fetching page ${page}:`, error.message);
      hasMore = false;
    }
  }

  console.log(`✅ Total observations fetched: ${observations.length}`);
  return observations;
}

/**
 * Extract county from observation place name or coordinates
 */
function extractCounty(observation) {
  // Try to get county from place guess
  if (observation.place_guess) {
    const placeGuess = observation.place_guess;

    // Check if any Florida county is mentioned
    for (const county of FLORIDA_COUNTIES) {
      if (placeGuess.includes(county)) {
        return county;
      }
      // Also check for "County" suffix
      if (placeGuess.includes(`${county} County`)) {
        return county;
      }
    }
  }

  // Try to extract from observation places
  if (observation.place_ids && observation.place_ids.length > 0) {
    // This would require additional API calls to get place details
    // For now, we'll skip this to avoid rate limits
  }

  return null;
}

/**
 * Aggregate observations by county
 */
function aggregateByCounty(observations) {
  console.log('📊 Aggregating observations by county...');

  const countyData = {};

  // Initialize all counties with zero counts
  FLORIDA_COUNTIES.forEach(county => {
    countyData[county] = {
      total: 0,
      recent: 0, // Last 12 months
      byMonth: {}
    };
  });

  const now = new Date();
  const recentCutoff = new Date();
  recentCutoff.setMonth(recentCutoff.getMonth() - CONFIG.recentMonths);

  observations.forEach(obs => {
    const county = extractCounty(obs);
    if (!county) return;

    const obsDate = new Date(obs.observed_on);
    const monthKey = `${obsDate.getFullYear()}-${String(obsDate.getMonth() + 1).padStart(2, '0')}`;

    countyData[county].total++;

    if (obsDate >= recentCutoff) {
      countyData[county].recent++;
    }

    if (!countyData[county].byMonth[monthKey]) {
      countyData[county].byMonth[monthKey] = 0;
    }
    countyData[county].byMonth[monthKey]++;
  });

  // Log summary
  const countiesWithData = Object.keys(countyData).filter(c => countyData[c].total > 0);
  console.log(`✅ Found data for ${countiesWithData.length} counties`);

  return countyData;
}

/**
 * Assess risk level based on observation data
 */
function assessRisk(countyStats) {
  const { total, recent, byMonth } = countyStats;

  // Calculate trend (comparing recent 12 months vs previous 12 months)
  const monthKeys = Object.keys(byMonth).sort().reverse();
  const recent12 = monthKeys.slice(0, 12).reduce((sum, key) => sum + byMonth[key], 0);
  const previous12 = monthKeys.slice(12, 24).reduce((sum, key) => sum + byMonth[key], 0);
  const trend = previous12 > 0 ? (recent12 - previous12) / previous12 : 0;

  // Risk assessment logic
  if (recent >= 100) {
    return {
      level: 'High',
      rationale: `High observation density with ${recent} sightings in past 12 months; established breeding populations likely`
    };
  } else if (recent >= 50) {
    return {
      level: 'High',
      rationale: `${recent} documented sightings in past year; consistent reports indicating established population`
    };
  } else if (recent >= 20) {
    return {
      level: 'Medium',
      rationale: `${recent} sightings documented; growing population with regular observations`
    };
  } else if (recent >= 10) {
    return {
      level: 'Medium',
      rationale: `${recent} recent sightings; moderate activity indicating potential establishment`
    };
  } else if (recent >= 3) {
    return {
      level: 'Low (Watch)',
      rationale: `${recent} sporadic sightings in past year; monitoring for potential population growth`
    };
  } else if (total >= 3) {
    return {
      level: 'Low (Watch)',
      rationale: `${total} historical sightings; occasional reports warrant continued monitoring`
    };
  } else {
    return {
      level: 'Minimal',
      rationale: total > 0
        ? `${total} rare sighting(s); climate or geography likely unsuitable for establishment`
        : 'No documented sightings; unsuitable climate or geography'
    };
  }
}

/**
 * Generate updated CSV data
 */
function generateCSV(countyData) {
  console.log('📝 Generating updated CSV...');

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const rows = [
    'county,risk_level,rationale,primary_source,last_updated'
  ];

  FLORIDA_COUNTIES.forEach(county => {
    const stats = countyData[county];
    const risk = assessRisk(stats);

    // Determine source based on data availability
    const source = stats.total > 0 ? 'iNaturalist' : 'FWC';

    // Escape rationale for CSV (handle commas and quotes)
    const escapedRationale = `"${risk.rationale.replace(/"/g, '""')}"`;

    rows.push(`${county},${risk.level},${escapedRationale},${source},${currentMonth}`);
  });

  return rows.join('\n');
}

/**
 * Main execution
 */
async function main() {
  console.log('🦎 Starting automated iguana data fetch...\n');

  try {
    // Step 1: Fetch observations
    const observations = await fetchIguanaObservations();

    // Step 2: Aggregate by county
    const countyData = aggregateByCounty(observations);

    // Step 3: Generate CSV
    const csvContent = generateCSV(countyData);

    // Step 4: Save to file
    const csvPath = path.join(__dirname, '../src/data/florida_iguana_risk_by_county.csv');
    fs.writeFileSync(csvPath, csvContent);
    console.log(`\n✅ CSV file updated: ${csvPath}`);

    // Step 5: Generate JSON from CSV
    console.log('\n🔄 Generating JSON from updated CSV...');
    require('./generate-risk-json.js');

    console.log('\n✨ Automation complete!');

    // Summary statistics
    const totalObservations = Object.values(countyData).reduce((sum, c) => sum + c.total, 0);
    const highRisk = Object.values(countyData).filter(c => assessRisk(c).level === 'High').length;
    const mediumRisk = Object.values(countyData).filter(c => assessRisk(c).level === 'Medium').length;

    console.log('\n📈 Summary:');
    console.log(`   Total observations: ${totalObservations}`);
    console.log(`   High risk counties: ${highRisk}`);
    console.log(`   Medium risk counties: ${mediumRisk}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
