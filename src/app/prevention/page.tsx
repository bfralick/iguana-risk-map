import Link from 'next/link'
import { Shield, Leaf, Home, Droplet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export const metadata = {
  title: 'Iguana Prevention Tips for Florida Homeowners | Risk Map',
  description: 'Effective strategies to deter iguanas from your property. Landscaping tips, habitat modification, and prevention methods that work.',
}

export default function PreventionPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Iguana Prevention Strategies
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Proven methods to make your property less attractive to invasive iguanas
        </p>

        {/* Prevention Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Leaf className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Landscape Modification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Remove or protect fruit trees and flowering plants</p>
              <p>• Eliminate dense vegetation that provides cover</p>
              <p>• Trim tree branches away from structures</p>
              <p>• Use less attractive plant species in landscaping</p>
              <p>• Keep grass short and remove debris piles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Home className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Physical Barriers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Install sheet metal guards on trees (18&quot;+ wide)</p>
              <p>• Use mesh or netting over plants</p>
              <p>• Fill in holes and burrows promptly</p>
              <p>• Secure gaps under decks and sheds</p>
              <p>• Install fencing around sensitive areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Droplet className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Water Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Cover pool when not in use</p>
              <p>• Eliminate standing water sources</p>
              <p>• Use motion-activated sprinklers in problem areas</p>
              <p>• Install pool cage enclosures</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Exclusion Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Use hardware cloth to protect specific plants</p>
              <p>• Apply taste deterrents to vegetation</p>
              <p>• Remove food sources (don&apos;t feed wildlife)</p>
              <p>• Keep compost bins sealed</p>
            </CardContent>
          </Card>
        </div>

        {/* What NOT to Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What NOT to Do</h2>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 space-y-2 text-sm text-gray-700">
              <p>✗ <strong>Never feed iguanas</strong> - This encourages them to stay and attracts more</p>
              <p>✗ <strong>Don&apos;t use pesticides or poisons</strong> - Illegal and dangerous to pets/wildlife</p>
              <p>✗ <strong>Avoid harming native species</strong> - Learn to identify iguanas correctly</p>
              <p>✗ <strong>Don&apos;t handle iguanas yourself</strong> - They can bite, scratch, and carry salmonella</p>
            </CardContent>
          </Card>
        </section>

        {/* Professional Help */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Already Have an Iguana Problem?
              </h2>
              <p className="text-muted-foreground mb-6">
                Professional removal is the safest and most effective solution for established iguana populations
              </p>
              <a href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=prevention_cta`}>
                <Button size="lg">Find Licensed Removal Professionals</Button>
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
