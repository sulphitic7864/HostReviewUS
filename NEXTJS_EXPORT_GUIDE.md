# Web Hosting Review Site (Next.js & Tailwind CSS Export Guide)

This project is built with **Next.js (App Router)**, **React 19**, and **Tailwind CSS**.

---

## 🚀 How to Run Locally with Next.js

1. **Extract or clone** the exported project directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the Next.js development server**:
   ```bash
   npm run dev:next
   ```
   Or:
   ```bash
   npx next dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 How to Build & Deploy (e.g. Vercel)

### Deploy to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project into **Vercel** ([vercel.com](https://vercel.com)).
3. Set Framework Preset: **Next.js**.
4. Set Build Command: `npm run build:next` (or default `next build`).
5. Deploy!

### Production Build via CLI
```bash
npm run build:next
npm run start:next
```

---

## 📁 Project Architecture

- **`app/`**: Next.js App Router entry points (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`).
- **`src/components/`**:
  - `Navbar.tsx`: Smooth sticky top navigation bar with 5 primary links and comparison badge.
  - `Footer.tsx`: Authoritative footer with FTC Affiliate Disclosure, methodology links, and company coordinates.
  - `HostProfileModal.tsx`: Detailed modal breakdown with 5-pillar scores, pros & cons, and hardware specifications.
  - `StarRating.tsx`: Accessible star rating display with tabular numerals.
- **`src/pages/`**:
  - `HomePage.tsx`: Hero with data center backdrop, Top 5 Picks, "How We Rate" teaser, and latest blog guides.
  - `HostsPage.tsx`: Directory of 130 hosting providers with filtering, search, and 6-card-per-page pagination.
  - `ComparePage.tsx`: Side-by-side comparison matrix with host pickers and popular 1-click comparison pairs.
  - `BlogPage.tsx`: SEO guides, tutorials, reader comments, and WordPress REST API live feed connector.
  - `ContactPage.tsx`: Contact form with validation and Chicago review lab info.
  - `TrustPages.tsx`: 5-Pillar Testing Methodology, Affiliate Disclosure, Privacy Policy, Terms, and About.
- **`src/data/`**:
  - `hostsData.ts`: 130 fully specified US hosting providers with starting prices, renewal prices, and scores.
  - `blogData.ts`: Formatted editorial guides and speed test articles.
- **`src/services/`**:
  - `wordpressApi.ts`: Live WordPress REST API connector supporting `/wp-json/wp/v2/posts`.
- **`next.config.mjs`**: Next.js configuration.
- **`src/index.css` & `app/globals.css`**: Global styles with `cursor: pointer` enforcement on all links, buttons, and interactive elements.
