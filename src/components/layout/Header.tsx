'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://iguanaremovalpros.com'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/assets/Iguana-Risk-Map-logo.png"
              alt="Florida Iguana Risk Map"
              width={200}
              height={80}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary no-underline transition-colors">
              About
            </Link>
            <Link href="/identification" className="text-sm font-medium text-foreground hover:text-primary no-underline transition-colors">
              Identify Iguanas
            </Link>
            <Link href="/faq" className="text-sm font-medium text-foreground hover:text-primary no-underline transition-colors">
              FAQ
            </Link>
            <a
              href={`${MAIN_SITE_URL}?utm_source=riskmap&utm_medium=referral&utm_campaign=header_link`}
              className="text-sm font-medium text-foreground hover:text-primary no-underline transition-colors"
            >
              Find Removal Services
            </a>
            <a href={`${MAIN_SITE_URL}/emergency?utm_source=riskmap&utm_medium=referral&utm_campaign=header_emergency`} className="no-underline">
              <Button variant="default" size="sm">
                Emergency Help
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container mx-auto px-4 max-w-7xl py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary no-underline transition-colors py-2"
              >
                About
              </Link>
              <Link
                href="/identification"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary no-underline transition-colors py-2"
              >
                Identify Iguanas
              </Link>
              <Link
                href="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary no-underline transition-colors py-2"
              >
                FAQ
              </Link>
              <a
                href={`${MAIN_SITE_URL}?utm_source=riskmap&utm_medium=referral&utm_campaign=mobile_menu`}
                className="text-base font-medium text-foreground hover:text-primary no-underline transition-colors py-2"
              >
                Find Removal Services
              </a>
              <a href={`${MAIN_SITE_URL}/emergency?utm_source=riskmap&utm_medium=referral&utm_campaign=mobile_emergency`} className="no-underline">
                <Button variant="default" size="sm" className="w-full">
                  Emergency Help
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
