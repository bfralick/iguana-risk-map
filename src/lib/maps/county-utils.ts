/**
 * County name normalization and utility functions
 * Handles variations in county names between GeoJSON and risk data
 */

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com';

/**
 * Normalize county name for matching
 * Removes "County" suffix and trims whitespace
 */
export function normalizeCountyName(name: string): string {
  return name
    .replace(/\s+County$/i, '')
    .trim();
}

/**
 * Format county name for display
 * Ensures "County" suffix is present
 */
export function formatCountyName(name: string): string {
  const normalized = normalizeCountyName(name);
  return normalized.endsWith('County') ? normalized : `${normalized} County`;
}

/**
 * Generate provider search URL for a county (points to main site with UTM tracking)
 */
export function getProviderSearchUrl(countyName: string): string {
  const normalized = normalizeCountyName(countyName);
  return `${MAIN_SITE_URL}/providers?county=${encodeURIComponent(normalized)}&utm_source=riskmap&utm_medium=referral&utm_campaign=county_${normalized.toLowerCase().replace(/\s+/g, '_')}`;
}

/**
 * Check if two county names match (case-insensitive, normalized)
 */
export function countyNamesMatch(name1: string, name2: string): boolean {
  return normalizeCountyName(name1).toLowerCase() ===
         normalizeCountyName(name2).toLowerCase();
}

/**
 * Format YYYY-MM date to readable format (e.g., "November 2024")
 */
export function formatLastUpdated(dateString: string): string {
  if (!dateString || !dateString.match(/^\d{4}-\d{2}$/)) {
    return dateString;
  }

  const [year, month] = dateString.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) {
    return dateString;
  }

  return `${monthNames[monthIndex]} ${year}`;
}
