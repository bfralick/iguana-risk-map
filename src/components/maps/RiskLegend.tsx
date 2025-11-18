/**
 * Risk Legend Component
 * Displays the risk tier color legend for the iguana risk map
 */

import { RISK_TIERS } from '@/lib/maps/risk-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RiskLegend() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Risk Levels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.values(RISK_TIERS).map((tier) => (
          <div key={tier.label} className="flex items-center gap-3">
            <div
              className="w-8 h-6 rounded border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: tier.color }}
              aria-label={`${tier.label} risk color`}
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{tier.label}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {tier.description}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
          <p>
            Click any county to view details and find local removal professionals.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
