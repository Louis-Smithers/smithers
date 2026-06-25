# Smithers

Marketing site for Smithers — Canadian operations and automation consultancy.

## Stack

- TanStack Start (React 19 + Vite)
- Tailwind CSS v4 + shadcn/ui
- TypeScript
- Bun

## Local development

```bash
bun install
bun run dev
```

The app runs at http://localhost:5173 (or whatever Vite picks).

## Build

```bash
bun run build
```

## Deploy

Hosted on Railway, deploys automatically from GitHub on every push to `main`. See [`DEPLOY.md`](./DEPLOY.md) for the one-time setup.

## Notes

- The single landing page lives in `src/routes/index.tsx`.
- Global styles, brand tokens (ink / paper / coral), and utility classes are in `src/styles.css`.
- SEO meta tags + JSON-LD schema (Organization, ProfessionalService, FAQPage) are wired in the route head.
- `src/routes/sitemap[.]xml.ts` serves the sitemap as a server route.
- Tool logos in the Stack section come from [Simple Icons](https://simpleicons.org/) via their CDN, with a colored brand-letter badge as fallback for any logo the CDN doesn't carry.
- This project was bootstrapped on Lovable and pulled local for further iteration.
