import Link from "next/link"
import { MapIcon, Facebook, Twitter, Instagram } from "lucide-react"

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 no-underline mb-4">
              <MapIcon className="h-6 w-6 text-primary" />
              <span className="font-bold text-foreground">FL Iguana Risk Map</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Track iguana populations across Florida counties. Educational resource by Iguana Removal Pros.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">
                  Risk Map
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/identification" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">
                  Identify Iguanas
                </Link>
              </li>
              <li>
                <Link href="/prevention" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">
                  Prevention Tips
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Help */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get Help</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`${MAIN_SITE_URL}/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=footer_providers`}
                  className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors"
                >
                  Find Local Providers
                </a>
              </li>
              <li>
                <a
                  href={`${MAIN_SITE_URL}/emergency?utm_source=riskmap&utm_medium=referral&utm_campaign=footer_emergency`}
                  className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors"
                >
                  Emergency Service
                </a>
              </li>
              <li>
                <a
                  href={`${MAIN_SITE_URL}/quote?utm_source=riskmap&utm_medium=referral&utm_campaign=footer_quote`}
                  className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors"
                >
                  Request a Quote
                </a>
              </li>
              <li>
                <a
                  href={`${MAIN_SITE_URL}?utm_source=riskmap&utm_medium=referral&utm_campaign=footer_home`}
                  className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors"
                >
                  Iguana Removal Pros
                </a>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/what-to-do" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">
                  What To Do If You See an Iguana
                </Link>
              </li>
              <li>
                <a
                  href="https://myfwc.com/wildlifehabitats/profiles/reptiles/green-iguana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors"
                >
                  FWC Iguana Info
                </a>
              </li>
              <li>
                <a
                  href="https://www.inaturalist.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors"
                >
                  Report Sighting (iNaturalist)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Florida Iguana Risk Map. A project by{" "}
            <a
              href={`${MAIN_SITE_URL}?utm_source=riskmap&utm_medium=referral&utm_campaign=footer_copyright`}
              className="text-primary hover:underline"
            >
              Iguana Removal Pros
            </a>.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Data updated monthly from iNaturalist
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
