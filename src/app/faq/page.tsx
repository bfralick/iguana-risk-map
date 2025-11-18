import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export const metadata = {
  title: 'FAQ - Florida Iguana Risk Map | Common Questions Answered',
  description: 'Answers to frequently asked questions about iguanas in Florida, risk levels, removal options, and prevention strategies.',
}

const faqs = [
  {
    question: 'How accurate is the risk data?',
    answer: 'Our risk assessments are based on verified sighting data from iNaturalist and Florida Fish & Wildlife Commission (FWC). Data is updated monthly and represents research-grade observations. While highly reliable, actual iguana populations may vary due to unreported sightings or recent changes.'
  },
  {
    question: 'How often is the map updated?',
    answer: 'The map updates automatically on the 1st of each month with the latest iguana sighting data from the previous month. This ensures you have current information about population trends in your area.'
  },
  {
    question: 'Are iguanas dangerous?',
    answer: 'While generally not aggressive, iguanas can be dangerous if cornered or threatened. They can bite with powerful jaws, whip with their tails, and scratch with sharp claws. They also carry salmonella bacteria. Never attempt to handle an iguana yourself - contact licensed professionals for removal.'
  },
  {
    question: 'Are iguanas protected in Florida?',
    answer: 'No. Green iguanas are an invasive species in Florida and are NOT protected by law. In fact, they are encouraged to be removed from properties. However, removal must be done humanely and you must have permission if on someone else\'s property. We recommend hiring licensed professionals for safe, legal removal.'
  },
  {
    question: 'What attracts iguanas to my property?',
    answer: 'Iguanas are attracted to lush landscaping, fruit trees, flowering plants, and water features. They prefer areas with dense vegetation for shelter, sunny spots for basking, and accessible food sources like hibiscus flowers, fruit, and tender vegetation.'
  },
  {
    question: 'How much does professional iguana removal cost?',
    answer: 'Costs vary based on the severity of the infestation, property size, and location. Most professionals offer free initial consultations. Contact local providers through our partner network for detailed pricing specific to your situation.'
  },
  {
    question: 'Can I remove iguanas myself?',
    answer: 'While not illegal on your own property, DIY removal is strongly discouraged due to safety risks. Iguanas can be aggressive when cornered, carry diseases, and require proper handling techniques. Licensed professionals have the training, equipment, and insurance to remove iguanas safely and humanely.'
  },
  {
    question: 'Why are there so many iguanas in South Florida?',
    answer: 'Green iguanas were introduced to Florida through the pet trade and accidental releases. South Florida\'s warm climate, abundant vegetation, and lack of natural predators have allowed populations to thrive and expand. They can now be found in areas from the Keys to Central Florida.'
  },
  {
    question: 'Do iguanas cause damage?',
    answer: 'Yes. Iguanas can cause significant property damage by burrowing under foundations and seawalls, eating landscaping, defecating on pool decks and docks, and nesting in attics or crawl spaces. Their burrows can destabilize structures and cause erosion.'
  },
  {
    question: 'What should I do if I find an iguana nest?',
    answer: 'Do not disturb the nest yourself. Contact a licensed removal professional immediately. Iguana nests can contain 20-70 eggs, and females may become aggressive when protecting nest sites. Professionals can safely remove nests and prevent future nesting.'
  },
  {
    question: 'Are there any benefits to having iguanas around?',
    answer: 'While some people find iguanas interesting to observe, they provide no ecological benefit to Florida and cause significant harm. They are invasive, outcompete native species, damage property, spread diseases, and disrupt local ecosystems.'
  },
  {
    question: 'What happens to removed iguanas?',
    answer: 'Licensed professionals must handle iguanas humanely according to Florida law. Euthanasia, if necessary, must be done using approved methods. Some professionals may relocate iguanas to licensed facilities, but this is rare. Always verify your provider follows legal and humane practices.'
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Common questions about iguanas in Florida and our risk map
        </p>

        {/* FAQ List */}
        <div className="space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Connect with licensed iguana removal professionals who can answer your specific questions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=faq_cta`}>
                  <Button size="lg">Find Local Experts</Button>
                </a>
                <Link href="/">
                  <Button variant="outline" size="lg">View Risk Map</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
