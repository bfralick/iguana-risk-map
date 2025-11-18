import Link from 'next/link'
import { MapIcon, Database, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export const metadata = {
  title: 'About | Florida Iguana Risk Map',
  description: 'Learn about our data-driven approach to tracking iguana populations across Florida counties. Powered by verified sighting data and expert analysis.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About the Florida Iguana Risk Map
          </h1>
          <p className="text-xl text-muted-foreground">
            Data-driven insights into invasive iguana populations across Florida&apos;s 67 counties
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            The Florida Iguana Risk Map provides residents, property owners, and wildlife professionals with accurate, up-to-date information about iguana population levels across the state. By visualizing risk data county-by-county, we help Floridians make informed decisions about iguana management and prevention.
          </p>
          <p className="text-muted-foreground">
            This project is maintained by{' '}
            <a
              href={`${MAIN_SITE_URL}?utm_source=riskmap&utm_medium=referral&utm_campaign=about_mission`}
              className="text-primary hover:underline"
            >
              Iguana Removal Pros
            </a>
            , Florida&apos;s premier directory for licensed iguana removal services.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">How It Works</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We aggregate verified iguana sighting data from iNaturalist, a citizen science platform used by wildlife experts and researchers worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our automated system analyzes sighting frequency and patterns to calculate risk levels: High, Medium, Low (Watch), and Minimal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Monthly Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The map updates automatically on the 1st of each month with the latest data, ensuring you have current information about iguana populations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect directly with licensed iguana removal professionals in high-risk areas through our partner network.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Risk Methodology */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Risk Level Methodology</h2>
          <div className="bg-muted/50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-600"></div>
                High Risk
              </h3>
              <p className="text-sm text-muted-foreground">
                50+ verified sightings in the past 12 months. Indicates established breeding populations requiring active management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-600"></div>
                Medium Risk
              </h3>
              <p className="text-sm text-muted-foreground">
                10-49 verified sightings in the past 12 months. Growing populations with regular activity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-600"></div>
                Low (Watch)
              </h3>
              <p className="text-sm text-muted-foreground">
                3-9 recent or historical sightings. Emerging risk areas that require monitoring.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-400"></div>
                Minimal Risk
              </h3>
              <p className="text-sm text-muted-foreground">
                Fewer than 3 total sightings. Little to no documented iguana activity.
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Data Sources</h2>
          <p className="text-muted-foreground mb-4">
            Our risk assessments are based on data from the following trusted sources:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>iNaturalist</strong> - Research-grade observations of Green Iguanas (Iguana iguana) in Florida
            </li>
            <li>
              <strong>Florida Fish and Wildlife Conservation Commission (FWC)</strong> - Official wildlife management data
            </li>
            <li>
              <strong>Local reports</strong> - Verified sightings from wildlife professionals and removal specialists
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Need Professional Iguana Removal?
              </h2>
              <p className="text-muted-foreground mb-6">
                Connect with licensed, vetted removal professionals in your county
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=about_cta`}>
                  <Button size="lg">
                    Find Local Providers
                  </Button>
                </a>
                <Link href="/">
                  <Button variant="outline" size="lg">
                    View Risk Map
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
