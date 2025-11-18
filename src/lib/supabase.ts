import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * Supabase client for the Florida Iguana Risk Map
 * This connects to the shared database used by Iguana Removal Pros
 *
 * Usage:
 * - Tracking page views and analytics
 * - Logging county selections and CTA clicks
 * - Optionally storing newsletter signups (if implemented)
 *
 * Note: This site primarily uses read-only access to the shared database
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Track a page view event
 * @param page - Page path (e.g., '/', '/about', '/identification')
 * @param county - Optional county name if viewing county details
 */
export async function trackPageView(page: string, county?: string) {
  try {
    const { error } = await supabase
      .from('analytics_page_views')
      .insert({
        page,
        county,
        source: 'risk_map_site',
        timestamp: new Date().toISOString()
      })

    if (error) console.error('Analytics error:', error)
  } catch (err) {
    console.error('Failed to track page view:', err)
  }
}

/**
 * Track a CTA click event
 * @param ctaType - Type of CTA (e.g., 'find_providers', 'emergency', 'quote')
 * @param county - Optional county name if county-specific
 * @param utmCampaign - UTM campaign parameter for tracking
 */
export async function trackCTAClick(
  ctaType: string,
  county?: string,
  utmCampaign?: string
) {
  try {
    const { error } = await supabase
      .from('analytics_cta_clicks')
      .insert({
        cta_type: ctaType,
        county,
        utm_campaign: utmCampaign,
        source: 'risk_map_site',
        timestamp: new Date().toISOString()
      })

    if (error) console.error('Analytics error:', error)
  } catch (err) {
    console.error('Failed to track CTA click:', err)
  }
}

/**
 * Track a county selection on the map
 * @param county - County name
 * @param riskLevel - Risk level of the county
 */
export async function trackCountySelection(county: string, riskLevel: string) {
  try {
    const { error } = await supabase
      .from('analytics_map_interactions')
      .insert({
        county,
        risk_level: riskLevel,
        source: 'risk_map_site',
        timestamp: new Date().toISOString()
      })

    if (error) console.error('Analytics error:', error)
  } catch (err) {
    console.error('Failed to track county selection:', err)
  }
}
