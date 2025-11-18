'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { AlertCircle, MapIcon, TrendingUp, Shield, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Dynamically import the map component (client-side only)
const IguanaRiskMap = dynamic(
  () => import('@/components/maps/IguanaRiskMap').then((mod) => mod.IguanaRiskMap),
  { ssr: false }
)

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Updated Monthly with Latest Data
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Florida Iguana Risk Map
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Track iguana population levels across Florida's 67 counties. Interactive map powered by verified sighting data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=hero_cta`}>
                <Button size="lg">
                  Find Removal Services
                </Button>
              </a>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <MapIcon className="h-8 w-8 text-primary" />
              Interactive Risk Map
            </h2>
            <p className="text-muted-foreground">
              Click any county to view detailed risk assessment and find local removal professionals.
            </p>
          </div>

          <IguanaRiskMap />
        </div>
      </section>

      {/* Understanding Risk Levels */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Understanding Risk Levels
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-red-600"></div>
                    <CardTitle className="text-lg">High Risk</CardTitle>
                  </div>
                  <CardDescription>
                    Established breeding populations with frequent sightings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    These areas have confirmed iguana populations that require active management. Professional removal is recommended.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-orange-600"></div>
                    <CardTitle className="text-lg">Medium Risk</CardTitle>
                  </div>
                  <CardDescription>
                    Growing populations with regular sightings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Increasing iguana activity in these counties. Monitor your property and consider preventive measures.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-yellow-600"></div>
                    <CardTitle className="text-lg">Low (Watch)</CardTitle>
                  </div>
                  <CardDescription>
                    Occasional sightings; emerging risk areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sporadic iguana sightings reported. Stay vigilant and report any sightings to help track populations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-gray-400"></div>
                    <CardTitle className="text-lg">Minimal Risk</CardTitle>
                  </div>
                  <CardDescription>
                    Rare or no documented sightings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Little to no iguana activity reported. Remain aware as populations can expand into new areas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  Need Professional Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you're dealing with iguanas on your property, connect with licensed removal professionals in your area. Available for both routine removal and emergency situations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=bottom_cta_providers`} className="flex-1">
                    <Button variant="default" size="lg" className="w-full">
                      Find Local Providers
                    </Button>
                  </a>
                  <a href={`${MAIN_SITE_URL}/emergency?utm_source=riskmap&utm_medium=referral&utm_campaign=bottom_cta_emergency`} className="flex-1">
                    <Button variant="destructive" size="lg" className="w-full">
                      Emergency Service
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Learn More About Iguanas in Florida
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/identification">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Info className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Identify Iguanas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn how to identify green iguanas and distinguish them from native species.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/prevention">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Prevention Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Discover effective methods to deter iguanas from your property.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/what-to-do">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">What To Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guidance on what to do if you encounter an iguana.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
