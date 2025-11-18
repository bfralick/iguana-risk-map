import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"
import "leaflet/dist/leaflet.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Florida Iguana Risk Map | Track Iguana Populations by County",
  description:
    "Interactive risk map showing iguana population levels across Florida counties. Find out your area's risk level and connect with professional removal services.",
  keywords: [
    "Florida iguana risk map",
    "iguana sightings Florida",
    "iguana population map",
    "Florida wildlife map",
    "iguana risk assessment",
    "green iguana Florida counties",
  ],
  openGraph: {
    title: "Florida Iguana Risk Map",
    description: "Interactive map tracking iguana population risk across Florida counties",
    url: "https://iguanariskmap.com",
    siteName: "Florida Iguana Risk Map",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
