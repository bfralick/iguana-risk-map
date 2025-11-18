# Florida Iguana Risk Map

An interactive, data-driven risk map showing iguana population levels across Florida's 67 counties. This standalone educational website serves as a lead generation tool for [Iguana Removal Pros](https://iguanaremovalpros.com).

## 🗺️ Live Site

**Production:** [iguanariskmap.com](https://iguanariskmap.com)
**Repository:** [github.com/bfralick/iguana-risk-map](https://github.com/bfralick/iguana-risk-map)

---

## Features

- 📍 **Interactive Map**: Click any Florida county to view detailed risk assessments
- 📊 **Data-Driven**: Powered by verified sighting data from iNaturalist
- 🔄 **Auto-Updated**: Monthly data refreshes via GitHub Actions
- 📱 **Responsive Design**: Optimized for mobile and desktop
- 🔗 **Lead Generation**: Strategic CTAs linking to Iguana Removal Pros
- 📈 **Analytics Integration**: Vercel Analytics + Supabase tracking
- 🎓 **Educational Content**: Comprehensive guides on identification, prevention, and safety

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **UI Library:** shadcn/ui + Tailwind CSS
- **Mapping:** Leaflet.js
- **Database:** Supabase (shared with main site)
- **Deployment:** Vercel
- **Data Source:** iNaturalist API
- **Automation:** GitHub Actions (monthly updates)

---

## Project Structure

```
iguana-risk-map/
├── .github/workflows/
│   └── update-risk-data.yml       # Monthly data update automation
├── public/                          # Static assets
├── scripts/
│   ├── fetch-iguana-data.js        # Fetch from iNaturalist API
│   └── generate-risk-json.js       # Convert CSV to JSON
├── src/
│   ├── app/                         # Next.js pages
│   │   ├── about/page.tsx
│   │   ├── identification/page.tsx
│   │   ├── prevention/page.tsx
│   │   ├── what-to-do/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage with map
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/                  # Header, Footer
│   │   ├── maps/                    # Risk map components
│   │   └── ui/                      # shadcn/ui components
│   ├── data/
│   │   ├── florida-counties.geojson # County boundaries
│   │   ├── iguana-risk-data.json    # Risk data (auto-generated)
│   │   └── florida_iguana_risk_by_county.csv # Source of truth
│   ├── lib/
│   │   ├── maps/                    # Map utilities & config
│   │   ├── supabase.ts              # Supabase client
│   │   └── utils.ts                 # General utilities
│   └── types/
│       └── maps.d.ts                # TypeScript definitions
├── .env.example
├── .env.local.example
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Supabase account (same project as Iguana Removal Pros)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bfralick/iguana-risk-map.git
   cd iguana-risk-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_MAIN_SITE_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Data Management

### How Risk Data Works

1. **Source:** iNaturalist API (Green Iguana observations in Florida)
2. **Processing:** `fetch-iguana-data.js` aggregates sightings by county
3. **Risk Calculation:**
   - **High:** ≥50 sightings in past 12 months
   - **Medium:** 10-49 sightings
   - **Low (Watch):** 3-9 sightings
   - **Minimal:** <3 sightings
4. **Output:** Generates both CSV and JSON formats
5. **Automation:** GitHub Actions updates data monthly (1st of each month)

### Manual Data Update

To manually update risk data:

```bash
npm run update-data
```

This runs `scripts/fetch-iguana-data.js` which:
- Fetches latest data from iNaturalist
- Calculates risk levels
- Updates both CSV and JSON files
- Ready to commit and deploy

---

## Deployment

### Deploy to Vercel

1. **Connect Repository**
   - Import your GitHub repo to Vercel
   - Select the `iguana-risk-map` repository

2. **Configure Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   NEXT_PUBLIC_MAIN_SITE_URL=https://iguanaremovalpros.com
   ```

3. **Set Custom Domain**
   - Go to Vercel Dashboard → Domains
   - Add `iguanariskmap.com`
   - Configure DNS as instructed by Vercel

4. **Deploy**
   - Pushes to `main` branch auto-deploy
   - Or click "Deploy" in Vercel Dashboard

---

## Supabase Integration

### Shared Database

This site shares the same Supabase project as Iguana Removal Pros. It primarily uses **read-only** access for:
- Tracking page views
- Logging CTA clicks
- Recording map interactions
- Optional: Newsletter signups (future)

### Analytics Tables

Ensure these tables exist in Supabase:

```sql
-- Page views
CREATE TABLE analytics_page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  county TEXT,
  source TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CTA clicks
CREATE TABLE analytics_cta_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cta_type TEXT NOT NULL,
  county TEXT,
  utm_campaign TEXT,
  source TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Map interactions
CREATE TABLE analytics_map_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  county TEXT NOT NULL,
  risk_level TEXT,
  source TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Architecture

### Cross-Site Integration

**Risk Map Site (iguanariskmap.com):**
- Educational content and interactive map
- Generates leads for main site
- Minimal authentication (public-facing)

**Main Site (iguanaremovalpros.com):**
- Provider directory and marketplace
- Lead management and payments
- Full authentication system

### Link Strategy

All links to the main site include UTM tracking:
```
https://iguanaremovalpros.com/providers?utm_source=riskmap&utm_medium=referral&utm_campaign=hero_cta
```

Track performance in Supabase analytics tables.

---

## Content Pages

- **Homepage (`/`)**: Interactive map + risk level overview
- **About (`/about`)**: Mission, methodology, data sources
- **Identification (`/identification`)**: Visual guide to identifying iguanas
- **Prevention (`/prevention`)**: Tips for deterring iguanas
- **What To Do (`/what-to-do`)**: Step-by-step safety guide
- **FAQ (`/faq`)**: Common questions and answers

Each page includes strategic CTAs linking to Iguana Removal Pros.

---

## SEO & Analytics

### SEO Optimization
- Unique meta descriptions per page
- Keyword-optimized content
- Open Graph tags for social sharing
- Sitemap auto-generated by Next.js

### Analytics
- **Vercel Analytics**: Built-in traffic and performance tracking
- **Supabase**: Custom event tracking (page views, clicks, map interactions)
- **UTM Parameters**: Track referral conversions from risk map to main site

---

## Maintenance

### Monthly Tasks
- ✅ **Automated:** Data updates via GitHub Actions
- ✅ **Automated:** Deployments via Vercel

### Manual Tasks
- Review and approve automated data update PRs
- Monitor analytics for unusual patterns
- Update educational content as needed
- Review and respond to any data quality issues

---

## Contributing

This is a private project for Iguana Removal Pros. For issues or suggestions, please contact the repository owner.

---

## License

© 2024 Iguana Removal Pros. All rights reserved.

---

## Support

For technical issues:
- Check [GitHub Issues](https://github.com/bfralick/iguana-risk-map/issues)
- Contact: [Your contact info]

For business inquiries:
- Visit [iguanaremovalpros.com](https://iguanaremovalpros.com)

---

## Roadmap

### Future Enhancements
- [ ] Newsletter signup integration
- [ ] Email alerts for high-risk county updates
- [ ] Historical trend visualizations
- [ ] Provider density overlay on map
- [ ] Spanish language support
- [ ] Mobile app version
