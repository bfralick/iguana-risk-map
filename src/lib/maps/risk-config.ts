/**
 * Iguana Risk Tier Configuration
 * Defines risk levels, colors, and descriptions for the Florida Iguana Risk Map
 */

export type RiskLevel = 'High' | 'Medium' | 'Low (Watch)' | 'Minimal';

export interface RiskTier {
  label: RiskLevel;
  color: string;
  description: string;
  action: string;
}

export const RISK_TIERS: Record<RiskLevel, RiskTier> = {
  'High': {
    label: 'High',
    color: '#DC2626',      // red-600 - Tailwind
    description: 'Established breeding populations; active management needed',
    action: 'Immediate professional removal recommended'
  },
  'Medium': {
    label: 'Medium',
    color: '#EA580C',      // orange-600
    description: 'Growing populations; regular sightings',
    action: 'Monitor closely; professional removal available'
  },
  'Low (Watch)': {
    label: 'Low (Watch)',
    color: '#CA8A04',      // yellow-600
    description: 'Occasional sightings; emerging risk',
    action: 'Prevention measures recommended'
  },
  'Minimal': {
    label: 'Minimal',
    color: '#9CA3AF',      // gray-400
    description: 'Rare or no documented sightings',
    action: 'Remain vigilant'
  }
} as const;

/**
 * Florida map bounds for Leaflet
 * [southwest corner, northeast corner]
 */
export const FLORIDA_BOUNDS: [[number, number], [number, number]] = [
  [24.5, -87.6],  // Southwest: Key West area
  [31.0, -80.0]   // Northeast: Georgia border
];

/**
 * Default map center (Central Florida)
 */
export const FLORIDA_CENTER: [number, number] = [27.8, -81.5];

/**
 * Map zoom levels
 */
export const MAP_ZOOM = {
  default: 7,
  mobile: 6,
  min: 6,
  max: 10
} as const;

/**
 * Get color for a risk level
 */
export function getRiskColor(riskLevel: RiskLevel): string {
  return RISK_TIERS[riskLevel]?.color || RISK_TIERS['Minimal'].color;
}

/**
 * Get opacity for county fill
 */
export function getFillOpacity(riskLevel: RiskLevel): number {
  switch (riskLevel) {
    case 'High':
      return 0.7;
    case 'Medium':
      return 0.6;
    case 'Low (Watch)':
      return 0.5;
    case 'Minimal':
    default:
      return 0.3;
  }
}
