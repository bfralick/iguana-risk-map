"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import countiesGeoJSON from '@/data/florida-counties.geojson'
import riskDataImport from '@/data/iguana-risk-data.json'
import { getRiskColor, getFillOpacity, FLORIDA_CENTER, MAP_ZOOM } from '@/lib/maps/risk-config'
import { normalizeCountyName, getProviderSearchUrl } from '@/lib/maps/county-utils'
import { RiskDataMap, SelectedCounty } from '@/types/maps'
import { CountyDetailsCard } from './CountyDetailsCard'

// Extract counties data from the new JSON structure
const riskData = riskDataImport.counties as RiskDataMap

// Type for Leaflet (will be imported dynamically)
type LeafletModule = typeof import('leaflet')

interface IguanaRiskMapProps {
  /** Optional callback when a county is selected */
  onCountySelect?: (county: SelectedCounty | null) => void;
}

export function IguanaRiskMap({ onCountySelect }: IguanaRiskMapProps) {
  const mapRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const geoJsonLayerRef = useRef<any>(null)
  const [selectedCounty, setSelectedCounty] = useState<SelectedCounty | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Don't initialize if already initialized
    if (mapRef.current) return

    // Dynamically import Leaflet and CSS
    let map: any

    const initMap = async () => {
      // Import Leaflet dynamically
      const L = (await import('leaflet')).default

      // Get the container element
      const container = containerRef.current
      if (!container) return

      // Check if the container already has a map instance and remove it
      if ((container as any)._leaflet_id) {
        // Container already has a Leaflet map, remove it first
        const existingMap = (container as any)._leaflet_map
        if (existingMap) {
          existingMap.remove()
        }
        delete (container as any)._leaflet_id
        delete (container as any)._leaflet_map
      }

      // Create map
      map = L.map(container, {
        center: FLORIDA_CENTER,
        zoom: isMobile ? MAP_ZOOM.mobile : MAP_ZOOM.default,
        minZoom: MAP_ZOOM.min,
        maxZoom: MAP_ZOOM.max,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true
      })

      mapRef.current = map
      // Store reference on container for cleanup
      if (container) {
        (container as any)._leaflet_map = map
      }

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map)

      // Style function for counties
      const style = (feature: any) => {
        const countyName = feature.properties.NAME
        const normalizedName = normalizeCountyName(countyName)
        const countyRisk = (riskData as RiskDataMap)[normalizedName]

        return {
          fillColor: countyRisk?.color || '#9CA3AF',
          weight: 2,
          opacity: 1,
          color: '#ffffff',
          dashArray: '3',
          fillOpacity: countyRisk ? getFillOpacity(countyRisk.risk) : 0.3
        }
      }

      // Highlight feature on hover (desktop only)
      const highlightFeature = (e: any) => {
        const layer = e.target

        layer.setStyle({
          weight: 3,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.8
        })

        layer.bringToFront()
      }

      // Reset highlight
      const resetHighlight = (e: any) => {
        geoJsonLayerRef.current?.resetStyle(e.target)
      }

      // Click handler
      const onCountyClick = (e: any) => {
        const feature = e.target.feature
        const countyName = feature.properties.NAME
        const normalizedName = normalizeCountyName(countyName)
        const countyRisk = (riskData as RiskDataMap)[normalizedName]

        if (countyRisk) {
          const selected: SelectedCounty = {
            name: countyName,
            risk: countyRisk.risk,
            rationale: countyRisk.rationale,
            source: countyRisk.source,
            lastUpdated: countyRisk.lastUpdated
          }
          setSelectedCounty(selected)
          onCountySelect?.(selected)
        }
      }

      // Attach event handlers to each feature
      const onEachFeature = (feature: any, layer: any) => {
        const countyName = feature.properties.NAME
        const normalizedName = normalizeCountyName(countyName)
        const countyRisk = (riskData as RiskDataMap)[normalizedName]

        // Bind tooltip (hover)
        if (countyRisk) {
          layer.bindTooltip(
            `<div class="font-semibold">${countyName}</div>
             <div class="text-sm">Risk: ${countyRisk.risk}</div>`,
            {
              sticky: true,
              className: 'leaflet-tooltip-custom'
            }
          )
        }

        // Event listeners
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: onCountyClick
        })
      }

      // Add GeoJSON layer
      const geoJsonLayer = L.geoJSON(countiesGeoJSON as any, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map)

      geoJsonLayerRef.current = geoJsonLayer

      // Fit bounds to Florida
      map.fitBounds(geoJsonLayer.getBounds())
    }

    // Call the async init function
    initMap()

    // Cleanup
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove()
        } catch (e) {
          // Ignore errors during cleanup
          console.warn('Error cleaning up map:', e)
        }
        mapRef.current = null
      }
      // Clear container references
      if (containerRef.current) {
        delete (containerRef.current as any)._leaflet_id
        delete (containerRef.current as any)._leaflet_map
      }
    }
  }, [])

  const handleFindProviders = () => {
    if (selectedCounty) {
      const url = getProviderSearchUrl(selectedCounty.name)
      // Redirect to main site
      window.location.href = url
    }
  }

  const handleCloseDetails = () => {
    setSelectedCounty(null)
    onCountySelect?.(null)
  }

  return (
    <div className="w-full space-y-4">
      {/* Map and Desktop Sidebar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Map Container */}
        <div className="flex-1 relative">
          <div
            ref={containerRef}
            id="iguana-risk-map"
            className="w-full h-[400px] md:h-[600px] rounded-lg border-2 border-gray-200 shadow-lg"
            style={{ zIndex: 0 }}
          />

          {/* Mobile instruction overlay */}
          {!selectedCounty && (
            <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm text-gray-700">
              Tap any county to see details
            </div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 space-y-4">
          {selectedCounty && (
            <CountyDetailsCard
              county={selectedCounty}
              onFindProviders={handleFindProviders}
              onClose={handleCloseDetails}
            />
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {selectedCounty && isMobile && (
        <div className="fixed inset-x-0 bottom-0 bg-white border-t-2 border-gray-200 rounded-t-2xl shadow-2xl p-6 animate-slide-up z-50">
          <CountyDetailsCard
            county={selectedCounty}
            onFindProviders={handleFindProviders}
            onClose={handleCloseDetails}
          />
        </div>
      )}

      {/* Custom CSS for tooltips */}
      <style jsx global>{`
        .leaflet-tooltip-custom {
          background-color: rgba(0, 0, 0, 0.8);
          border: none;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
