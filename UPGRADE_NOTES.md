# Lead Bag Website UI Upgrade

This package contains the upgraded source/configuration for the Lead Bag website.

## What was improved

### Public website
- Premium responsive navigation with WhatsApp CTA
- Full-screen video hero with stronger typography and calls to action
- Refined About section with stats and image layout
- Dark, premium Why Choose Us section
- Product catalogue with:
  - category filters
  - search-like category UI
  - availability badges
  - colour chips
  - product details modal
  - WhatsApp inquiry using the selected product's actual colours
- Celebrations redesigned as a gallery with a large image/lightbox viewer
- Improved CTA and contact/inquiry section
- Floating WhatsApp button
- More consistent spacing, typography, cards, hover effects and loading skeletons
- Better mobile layouts

### Admin
- Added `AdminGuard.jsx` to protect all admin routes.
- Admin guard checks both Supabase authentication and the existing `is_admin()` RPC.
- Added reusable `AdminLayout.jsx`.
- Redesigned login screen.
- Redesigned dashboard with product/availability/celebration counts.
- Redesigned product and celebration management pages with search/filter UI and cleaner cards.
- Existing CRUD, Storage and Supabase logic remains in place.

## Important

The uploaded ZIP did **not** contain the `public/` folder. The upgraded source still expects the same existing public assets, such as:

- `/media/hero-bags.mp4`
- `/images/garment.jpg`
- `/images/team.jpg`
- `/images/working.jpg`

Keep your current `public/` folder from your original local project. Do not delete it.

The package also intentionally does not include `node_modules` or `.env.local`.

## Supabase

No database tables, policies, Storage buckets, or environment variables were changed by this UI upgrade.

The admin protection expects your existing Supabase function:

`public.is_admin()`

and the existing `admin_users` table/RLS setup.

## After copying

1. Replace the `src/` folder in your local project with this package's `src/`.
2. Keep your existing `public/` folder.
3. Keep your `.env.local`.
4. Run:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Then test:
- `/`
- `/admin`
- `/admin/dashboard`
- `/admin/products`
- `/admin/celebrations`
- product add/edit/delete
- celebration add/edit/delete
- public product colour display
- WhatsApp inquiry buttons
- mobile navigation
