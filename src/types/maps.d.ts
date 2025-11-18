/**
 * Type definitions for Florida Iguana Risk Map
 */

import { RiskLevel } from '@/lib/maps/risk-config';

/**
 * County risk data structure
 */
export interface CountyRiskData {
  risk: RiskLevel;
  rationale: string;
  source: string;
  lastUpdated: string;
  color: string;
}

/**
 * Risk data dictionary (county name -> risk data)
 */
export type RiskDataMap = Record<string, CountyRiskData>;

/**
 * Metadata for risk data file
 */
export interface RiskDataMetadata {
  lastUpdated: string;
  totalCounties: number;
  generatedAt: string;
}

/**
 * Complete risk data file structure
 */
export interface RiskDataFile {
  metadata: RiskDataMetadata;
  counties: RiskDataMap;
}

/**
 * GeoJSON Feature properties for Florida counties
 */
export interface CountyProperties {
  NAME: string;
  GEOID: string;
}

/**
 * Selected county state
 */
export interface SelectedCounty {
  name: string;
  risk: RiskLevel;
  rationale: string;
  source: string;
  lastUpdated: string;
}
