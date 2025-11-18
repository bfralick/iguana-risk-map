# Deployment Guide - Florida Iguana Risk Map

## Quick Start Checklist

Follow these steps to get your standalone iguana risk map site live on iguanariskmap.com.

---

## Step 1: Initialize Git Repository

```bash
cd "C:\Users\bfral\OneDrive\Desktop\Claude Code\iguana risk map"
git init
git add .
git commit -m "Initial commit: Florida Iguana Risk Map standalone site"
```

---

## Step 2: Push to GitHub

1. **Create new repository on GitHub** (if not already done)
   - Go to https://github.com/new
   - Repository name: `iguana-risk-map`
   - Set to Public (already is according to your notes)
   - Do NOT initialize with README, .gitignore, or license (we have these)

2. **Push code**
   ```bash
   git remote add origin https://github.com/bfralick/iguana-risk-map.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 3: Set Up Supabase (Shared Database)

You mentioned you want to use the same Supabase database as the main site. Here's how:

1. **Use Same Credentials**
   - Use the SAME Supabase project from Iguana Removal Pros
   - Copy the following from your main site's `.env`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

2. **Create Analytics Tables** (if not already exist)

   Go to Supabase SQL Editor and run:

   ```sql
   -- Page views tracking
   CREATE TABLE IF NOT EXISTS analytics_page_views (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     page TEXT NOT NULL,
     county TEXT,
     source TEXT,
     timestamp TIMESTAMPTZ NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- CTA click tracking
   CREATE TABLE IF NOT EXISTS analytics_cta_clicks (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     cta_type TEXT NOT NULL,
     county TEXT,
     utm_campaign TEXT,
     source TEXT,
     timestamp TIMESTAMPTZ NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Map interaction tracking
   CREATE TABLE IF NOT EXISTS analytics_map_interactions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     county TEXT NOT NULL,
     risk_level TEXT,
     source TEXT,
     timestamp TIMESTAMPTZ NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Indexes for performance
   CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON analytics_page_views(timestamp DESC);
   CREATE INDEX IF NOT EXISTS idx_cta_clicks_timestamp ON analytics_cta_clicks(timestamp DESC);
   CREATE INDEX IF NOT EXISTS idx_map_interactions_timestamp ON analytics_map_interactions(timestamp DESC);
   CREATE INDEX IF NOT EXISTS idx_map_interactions_county ON analytics_map_interactions(county);
   ```

3. **Set Up Row Level Security (RLS)**

   ```sql
   -- Enable RLS
   ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;
   ALTER TABLE analytics_cta_clicks ENABLE ROW LEVEL SECURITY;
   ALTER TABLE analytics_map_interactions ENABLE ROW LEVEL SECURITY;

   -- Allow public inserts (for tracking)
   CREATE POLICY "Allow public inserts" ON analytics_page_views
     FOR INSERT TO anon WITH CHECK (true);

   CREATE POLICY "Allow public inserts" ON analytics_cta_clicks
     FOR INSERT TO anon WITH CHECK (true);

   CREATE POLICY "Allow public inserts" ON analytics_map_interactions
     FOR INSERT TO anon WITH CHECK (true);

   -- Only authenticated users can read (admins viewing analytics)
   CREATE POLICY "Authenticated read" ON analytics_page_views
     FOR SELECT TO authenticated USING (true);

   CREATE POLICY "Authenticated read" ON analytics_cta_clicks
     FOR SELECT TO authenticated USING (true);

   CREATE POLICY "Authenticated read" ON analytics_map_interactions
     FOR SELECT TO authenticated USING (true);
   ```

---

## Step 4: Deploy to Vercel

1. **Import Repository**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your `iguana-risk-map` GitHub repository
   - Click "Import"

2. **Configure Build Settings** (should auto-detect)
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Add Environment Variables**

   In Vercel Dashboard → Settings → Environment Variables, add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_MAIN_SITE_URL=https://iguanaremovalpros.com
   ```

   **Important:** Add these for all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at a Vercel URL (e.g., `iguana-risk-map.vercel.app`)

---

## Step 5: Configure Custom Domain

1. **Add Domain in Vercel**
   - Go to Vercel Dashboard → Domains
   - Click "Add"
   - Enter `iguanariskmap.com`
   - Click "Add"

2. **Configure DNS**

   Vercel will provide DNS instructions. Typically:

   **Option A: Use Vercel Nameservers (Recommended)**
   - Update your domain registrar to use Vercel's nameservers
   - Vercel handles all DNS configuration

   **Option B: Add DNS Records Manually**
   - Add A record: `@` → Vercel's IP (provided by Vercel)
   - Add CNAME record: `www` → `cname.vercel-dns.com`

3. **SSL Certificate**
   - Vercel automatically provisions SSL
   - Usually ready within minutes
   - Site will be accessible via `https://iguanariskmap.com`

4. **Add www Redirect**
   - In Vercel, add `www.iguanariskmap.com` as another domain
   - Set it to redirect to `iguanariskmap.com`

---

## Step 6: Test Deployment

1. **Visit Your Site**
   - https://iguanariskmap.com
   - Check all pages load correctly
   - Test interactive map functionality
   - Click counties to ensure details display

2. **Test Cross-Site Links**
   - Click "Find Providers" buttons
   - Verify they redirect to `iguanaremovalpros.com` with UTM parameters
   - Check that UTM tracking is working:
     ```
     ?utm_source=riskmap&utm_medium=referral&utm_campaign=...
     ```

3. **Test Analytics** (optional)
   - Check Supabase analytics tables
   - Verify page views are being logged
   - Confirm CTA clicks are tracked

4. **Mobile Testing**
   - Test on mobile devices
   - Verify map is responsive
   - Check bottom sheet appears on county click

---

## Step 7: Set Up GitHub Actions (Optional but Recommended)

The repository includes a workflow for monthly data updates. To enable:

1. **GitHub Settings**
   - Go to your repo → Settings → Actions → General
   - Enable "Allow all actions and reusable workflows"

2. **Secrets** (if fetching data requires auth)
   - No secrets needed for iNaturalist (public API)
   - Workflow will run automatically on 1st of each month

3. **Test Workflow**
   ```bash
   # Trigger manually to test
   # Go to repo → Actions → "Update Risk Data" → Run workflow
   ```

---

## Step 8: Local Development Setup

To continue developing locally:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create `.env.local`**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials

3. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

---

## Troubleshooting

### Build Fails on Vercel

**Error: Missing environment variables**
- Solution: Add all required env vars in Vercel dashboard

**Error: Module not found**
- Solution: Ensure `package.json` has all dependencies
- Run `npm install` locally first to verify

### Map Doesn't Load

**Blank map or errors**
- Check browser console for errors
- Verify data files are in `src/data/` directory
- Ensure Leaflet CSS is imported in `layout.tsx`

### Links Don't Work

**404 on page navigation**
- Ensure all page.tsx files are in correct directories
- Check Next.js app router structure
- Rebuild and redeploy

### Analytics Not Tracking

**No data in Supabase**
- Verify Supabase credentials are correct
- Check that analytics tables exist
- Ensure RLS policies allow inserts
- Check browser console for errors

---

## Maintenance

### Monthly Data Updates

- **Automated:** GitHub Actions runs monthly
- **Manual:** Run `npm run update-data`
- Review and merge automated PRs

### Monitoring

- **Vercel Analytics:** Track traffic and performance
- **Supabase Dashboard:** Monitor database usage
- **Error Tracking:** Check Vercel logs for errors

---

## Next Steps After Deployment

1. ✅ **Test thoroughly** - Click through all pages and features
2. ✅ **Monitor analytics** - Check Supabase for incoming data
3. ✅ **Share the link** - Announce on social media, add to main site
4. ✅ **Update main site** - Add link to risk map from iguanaremovalpros.com
5. ✅ **Set up Google Search Console** - Submit sitemap
6. ✅ **Monitor conversions** - Track how many leads come from risk map

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Verify environment variables
4. Test locally first (`npm run dev`)

---

## Success! 🎉

Your Florida Iguana Risk Map should now be live and generating leads for Iguana Removal Pros!
