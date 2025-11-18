/**
 * County Details Card Component
 * Displays detailed information about a selected county
 */

import { MapPin, AlertCircle, X, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SelectedCounty } from '@/types/maps'
import { RISK_TIERS } from '@/lib/maps/risk-config'

interface CountyDetailsCardProps {
  county: SelectedCounty;
  onFindProviders: () => void;
  onClose: () => void;
}

export function CountyDetailsCard({ county, onFindProviders, onClose }: CountyDetailsCardProps) {
  const riskTier = RISK_TIERS[county.risk]
  const isHighRisk = county.risk === 'High' || county.risk === 'Medium'

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="h-5 w-5 text-primary" />
              {county.name}
            </CardTitle>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Risk Level Badge */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">Risk Level</div>
          <Badge
            className="text-sm px-3 py-1"
            style={{
              backgroundColor: riskTier.color,
              color: 'white'
            }}
          >
            {county.risk}
          </Badge>
        </div>

        {/* Rationale */}
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Assessment
          </div>
          <p className="text-sm text-gray-700">
            {county.rationale}
          </p>
        </div>

        {/* Action Recommendation */}
        {isHighRisk && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-900">
                <span className="font-semibold">Recommendation: </span>
                {riskTier.action}
              </div>
            </div>
          </div>
        )}

        {/* Source & Date */}
        <div className="pt-3 border-t text-xs text-muted-foreground space-y-1">
          <div>Source: {county.source}</div>
          <div>Updated: {new Date(county.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          })}</div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onFindProviders}
          className="w-full"
          size="lg"
        >
          Find Providers in {county.name}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        {/* Additional Info for High Risk Areas */}
        {county.risk === 'High' && (
          <div className="text-xs text-center text-muted-foreground">
            Professional removal recommended for established populations
          </div>
        )}
      </CardContent>
    </Card>
  )
}
