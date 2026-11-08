# FOLIO — SEO & Growth Engine Blueprint (25-Year-Old Senior AI SEO Playbook)

## 1. High-Intent Organic Keyword Map
- **Primary Head**: "CV dating app", "resume dating", "professional networking dating"
- **High-Converting Long-Tail**:
  - "best dating apps for ambitious professionals 2026"
  - "anonymous slow dating app no swipe"
  - "meet cofounders and partners without linkedin"
  - "hinge alternative for careers"

## 2. On-Page Programmatic SEO Architecture
- `/sitemap.xml` & `/robots.txt` automatically crawlable.
- Dynamic JSON-LD Structured Data: `SoftwareApplication`, `AggregateRating`, `Organization`.
- Next.js dynamic OpenGraph tags with automated social preview generation.

## 3. Product-Led Virality & Growth Loops
1. **The 30-Day Permanent Connection Badge**: Shareable dynamic Twitter/LinkedIn cards when users reach Day 30 without exposing personal identity.
2. **Folio Score Leaderboards**: Gamified profile completeness prompting direct friend referrals (+10% visibility boost per referral).
3. **9:00 AM Daily Ritual Push**: Engineered re-engagement notification loop based on the Hook model (Trigger -> Action -> Variable Reward -> Investment).

## 4. One-Click Vercel Deployment Instructions
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of FOLIO"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/new) -> Import repository.
3. Configure Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Click **Deploy**.
