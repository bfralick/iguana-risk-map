import Link from 'next/link'
import { AlertCircle, Camera, Phone, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export const metadata = {
  title: 'What To Do If You See an Iguana in Florida | Action Guide',
  description: 'Step-by-step guide on what to do when you encounter an iguana on your property. Safety tips and reporting procedures.',
}

export default function WhatToDoPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          What To Do If You See an Iguana
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Follow these steps to safely handle an iguana sighting
        </p>

        {/* Step-by-Step Guide */}
        <div className="space-y-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <CardTitle>Stay Safe & Keep Your Distance</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                <strong>Never approach or corner an iguana.</strong> They can:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1">
                <li>Bite with powerful jaws</li>
                <li>Whip with their long, muscular tails</li>
                <li>Scratch with sharp claws</li>
                <li>Carry salmonella bacteria</li>
              </ul>
              <p className="text-muted-foreground text-sm mt-2">
                Keep children and pets away from the iguana.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Document the Sighting
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                If safe to do so, take a clear photo showing:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1">
                <li>The iguana&apos;s size and coloration</li>
                <li>Distinctive features (spines, dewlap)</li>
                <li>Location context (yard, seawall, pool, etc.)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Report the Sighting
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Help track iguana populations by reporting your sighting:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>iNaturalist:</strong>{' '}
                  <a
                    href="https://www.inaturalist.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Submit observation with photo
                  </a>
                </p>
                <p>
                  <strong>FWC Hotline:</strong> Report invasive species at{' '}
                  <a href="tel:888-483-4681" className="text-primary hover:underline">
                    888-IVE-GOT1 (888-483-4681)
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Professional Removal Services
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For iguanas on your property, contact licensed removal professionals who can:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1 mb-4">
                <li>Safely trap and remove iguanas</li>
                <li>Provide prevention recommendations</li>
                <li>Handle disposal humanely and legally</li>
                <li>Offer emergency response for aggressive iguanas</li>
              </ul>
              <a href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=whattodo_providers`}>
                <Button className="w-full sm:w-auto">Find Local Professionals</Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Situations */}
        <section className="mb-12">
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <CardTitle className="text-red-900">Emergency Situations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-red-900 space-y-2">
              <p>
                <strong>Seek immediate professional help if:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Iguana is acting aggressively or cornered</li>
                <li>Multiple iguanas are on your property</li>
                <li>Iguana has damaged structures or caused injury</li>
                <li>Iguana is inside your home or garage</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-red-300">
                <a href={`${MAIN_SITE_URL}/emergency?utm_source=riskmap&utm_medium=referral&utm_campaign=whattodo_emergency`}>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    Get Emergency Help Now
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Learn More</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/identification">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <p className="font-semibold text-foreground mb-1">Identify Iguanas</p>
                  <p className="text-xs text-muted-foreground">Learn key features</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/prevention">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <p className="font-semibold text-foreground mb-1">Prevention Tips</p>
                  <p className="text-xs text-muted-foreground">Deter iguanas</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <p className="font-semibold text-foreground mb-1">Risk Map</p>
                  <p className="text-xs text-muted-foreground">Check your county</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
