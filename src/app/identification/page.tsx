import Link from 'next/link'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export const metadata = {
  title: 'How to Identify Green Iguanas in Florida | Iguana Risk Map',
  description: 'Learn to identify invasive green iguanas and distinguish them from native Florida reptiles. Visual guide and key identification features.',
}

export default function IdentificationPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Identifying Green Iguanas
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Learn to recognize invasive green iguanas and distinguish them from native species
        </p>

        {/* Key Identification Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Identification Features</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Green Iguana (Iguana iguana) - Invasive</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Size:</strong> Adults 4-6 feet long (including tail), some reaching 7 feet</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Color:</strong> Bright green when young, adults may be brownish-orange or gray-green</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Spines:</strong> Prominent row of spines along the back from head to tail</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Dewlap:</strong> Large throat fan (dewlap), especially prominent in males</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Tail:</strong> Long, whip-like tail with dark bands</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm"><strong>Head:</strong> Large jowls, especially in older males; round scale on cheek</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vs Native Species */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Don&apos;t Confuse With Native Species</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Green Anole (Native)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Much smaller:</strong> Only 5-8 inches total length
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Slender body</strong> without prominent spines
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Can change color</strong> from bright green to brown
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eastern Glass Lizard (Native)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Legless</strong> - looks snake-like
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Brown or tan color,</strong> not green
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>No dewlap or spines</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Behavior */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Common Behaviors</h2>
          <div className="bg-muted/50 p-6 rounded-lg space-y-3">
            <p className="text-muted-foreground">
              • <strong>Basking:</strong> Often seen sunbathing on seawalls, docks, pool decks, and tree branches
            </p>
            <p className="text-muted-foreground">
              • <strong>Swimming:</strong> Excellent swimmers, frequently found near water
            </p>
            <p className="text-muted-foreground">
              • <strong>Feeding:</strong> Herbivorous - eat flowers, fruits, and ornamental plants
            </p>
            <p className="text-muted-foreground">
              • <strong>Burrowing:</strong> Dig extensive burrow systems, damaging seawalls and foundations
            </p>
          </div>
        </section>

        {/* What To Do */}
        <section className="mb-12">
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <CardTitle>If You Spot an Iguana</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">
                1. <strong>Keep your distance</strong> - Iguanas can bite and use their tails as whips when threatened
              </p>
              <p className="text-sm text-gray-700">
                2. <strong>Document the sighting</strong> - Take a photo if safe to do so
              </p>
              <p className="text-sm text-gray-700">
                3. <strong>Report it</strong> - Help track populations by reporting to iNaturalist
              </p>
              <p className="text-sm text-gray-700">
                4. <strong>Don&apos;t attempt removal yourself</strong> - Contact licensed professionals
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Need Professional Assistance?
              </h2>
              <p className="text-muted-foreground mb-6">
                Licensed iguana removal experts can safely handle and remove iguanas from your property
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=identification_cta`}>
                  <Button size="lg">Find Local Providers</Button>
                </a>
                <Link href="/what-to-do">
                  <Button variant="outline" size="lg">What To Do Next</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
