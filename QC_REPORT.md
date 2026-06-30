# Smithers redesign — QC report

## 1. Verdict

**BLOCKED.** The redesign was written against TanStack Start / TanStack Router, but those packages are not in `package.json`, not installed in `node_modules`, and there is no router plugin in `vite.config.ts`. On top of that, `src/main.tsx` still imports `./App` (the pre‑redesign single‑page version) instead of the route tree — so even with the deps installed, the new design wouldn't render. The actual redesign code (i18n, case studies, team, animated metric, FR route) is well executed and translation is solid Quebec FR; it just isn't wired to the build.

## 2. Per‑requirement checklist

| # | Requirement | Status | Notes |
|---|---|---|---|
| 1.1 | `--saffron`, `--teal` tokens in `:root` | ✓ | `src/styles.css:51-52` |
| 1.2 | Exposed via `@theme inline` as `--color-saffron` / `--color-teal` | ✓ | `src/styles.css:36-37` |
| 1.3 | `.surface-paper` utility (bone bg + ink text) | ✓ | `src/styles.css:226-229` |
| 1.4 | `surface-paper` applied to Case Studies section | ✓ | `src/routes/index.tsx:870` |
| 2.1 | `src/lib/useReducedMotion.ts` exists, SSR‑safe | ✓ | hook reads `matchMedia`, listens for `change` |
| 2.2 | `AnimatedMetric` counter | ✓ (after fix) | implementer originally shipped opacity fade; I replaced it with a real number counter using `metricPrimaryFrom` / `metricPrimaryTo` already present in the i18n data |
| 2.3 | Logo strip auto‑scrolls 80s, paused on hover | ⚠ | 80s animation present; `group-hover` pause CSS is **missing** on the inline‑style version. Spec said paused on hover |
| 2.4 | Stagger icon fade‑in (50ms) | ✓ | `index.tsx:786-799`, gated on reduced‑motion |
| 2.5 | Magnetic hover ≤6px | ✓ | `useMagneticHover(cap=6)`, gated |
| 2.6 | Hero coral blob drift CSS‑only | ✓ | `blob-drift` keyframes + reduced‑motion override |
| 3.1 | `/fr` route exists | ✓ | `src/routes/fr.tsx` |
| 3.2 | i18n files (`en.ts`, `fr.ts`, `useT.ts`, `types.ts`) | ✓ | complete, types match shape |
| 3.3 | EN/FR pill switcher in header | ✓ | persists `localStorage["smithers-lang"]`, navigates correctly |
| 3.4 | Auto‑redirect on first visit (`navigator.language`, only on `/`) | ✓ | `IndexPage` `useEffect`, checks `localStorage` first, only runs on `/` |
| 3.5 | hreflang alternates (en, fr, x‑default) on both routes | ✓ | both `/` and `/fr` route heads include all three |
| 3.6 | `/fr` added to sitemap | ✓ | both `src/routes/sitemap[.]xml.ts` and `public/sitemap.xml` |
| 3.7 | FAQ JSON‑LD translated for FR route | ✓ | built from `fr.faq.items` |
| 3.8 | Quebec French (courriel, PME, brand untranslated) | ✓ | "Courriel" `fr.ts:311`, "PME" used throughout, "Smithers" never translated |
| 4.1 | LogoStrip between Hero and Marquee | ✓ | `index.tsx:151-152` |
| 4.2 | 6 invented Canadian SMB wordmarks | ⚠ | All 6 names present, but they are rendered as **text spans**, not the spec'd "inline SVG (no external assets)". Visually similar effect (bone @ 0.55 → coral @ 1 on hover) but technically not SVG wordmarks |
| 4.3 | CaseStudies section (05), replaces WhoWeWorkWith, absorbs intro | ✓ | new section in place |
| 4.4 | 4 case studies with correct names, quotes, metrics | ✓ | Bellwether Law, North & Pine Goods, Coastline Physio, Meridian Commercial — all four match spec |
| 5.1 | `priceFrom` rendered under tagline in saffron | ✓ | `index.tsx:609-614` |
| 5.2 | Caption "All prices CAD. Discovery call is free." | ✓ | `index.tsx:593`, EN + FR translated |
| 5.3 | Three price strings match spec | ✓ | exact match |
| 6.1 | Team section (06, before FAQ) | ✓ | section order correct |
| 6.2 | 4 members with monogram tiles, alternating bg colors | ✓ | coral / saffron / teal / paper, no photos |
| 6.3 | Intro copy "A small senior team…" | ✓ | matches verbatim |
| 6.4 | Section order Hero → LogoStrip → Marquee → 01–08 | ✓ | confirmed |
| 6.5 | `TOTAL_SECTIONS = "08"` and hardcoded 01–08 numbers correct | ✓ | 01 Problem, 02 Services, 03 Stack, 04 How, 05 Case Studies, 06 Team, 07 FAQ, 08 Contact |

## 3. Bugs found

- **BLOCKER · `package.json` missing deps.** The route files import from `@tanstack/react-router`, `@tanstack/react-query`, `@tanstack/react-start`; none are in `package.json` and `node_modules/@tanstack` is empty. `npx tsc --noEmit` reports 16 missing‑module errors. **Fix:** add `@tanstack/react-router`, `@tanstack/react-router-with-query` (or wire the QueryClient yourself), `@tanstack/react-query`, `@tanstack/react-start` (with matching version), plus dev deps `@tanstack/router-plugin` / `@tanstack/react-start/plugin`. Re-run `npm i`.
- **BLOCKER · `vite.config.ts` missing TanStack Start plugin.** Even with deps installed, Vite would not resolve the route tree or run SSR. **Fix:** add `tanstackStart()` (or equivalent) plugin and configure `target: "node"` SSR entry.
- **BLOCKER · `src/main.tsx` still mounts `App.tsx`, not the route tree.** Entry: `import App from "./App"` then `createRoot(...).render(<App/>)`. **Fix:** for an SSR Start setup, delete `main.tsx` reliance or repoint it at `router.tsx`. For a CSR fallback, build `createRouter` + `RouterProvider` in `main.tsx`. Either way, `App.tsx` should be removed or repurposed once the new entry works.
- **`src/routeTree.gen.ts` was hand‑edited.** TanStack Router's plugin regenerates this on dev/build, so once the plugin is added the manual edits get clobbered. The current file content matches what the generator would produce for the three routes (`/`, `/fr`, `/sitemap.xml`), so it's safe in the meantime — but the implementer's comment that the file was edited needs caveating.
- **`src/App.tsx` is dead code that contradicts the redesign.** Contains the pre‑redesign 7‑section layout (`TOTAL_SECTIONS = "07"`, no LogoStrip, no CaseStudies, no Team, no i18n). Will mislead any future agent reading the repo. **Fix:** delete or rewrite once the entry is repointed.
- **`<html lang="en">` was hardcoded in `__root.tsx`** even on the `/fr` route. **Fixed below** to derive from `location.pathname`.
- **LogoStrip inline animation has no `group-hover` pause** despite the spec calling for it (`src/routes/index.tsx:455-462`). The visible row is `aria-hidden` and there's a `group` wrapper but no `[animation-play-state:paused]` on hover. **Fix:** add `group-hover:[animation-play-state:paused]` to the inline‑animated div, or convert it to use the `marquee-track` utility.
- **LogoStrip wordmarks are text spans, not inline SVG** (`src/routes/index.tsx:463-484`). Spec explicitly asked for SVG wordmarks. Minor visual deviation. Functions identically.
- **`AnimatedMetric` was an opacity fade**, not a counter. **Fixed below.**
- **`useT.ts:14-15` has a formatting nit** — closing brace on the same line as `return`. Compiles fine; just ugly: `return locales[locale] ?? en;}`.
- **`index.html` static fallback has no `og:locale` and no FR hreflang alternates.** Only matters if a crawler hits the raw HTML pre-hydration; nice‑to‑have. **Not fixed** — out of scope for a small QC pass.
- **`__root.tsx` head provides no per‑page `Content‑Language` HTTP header**. Minor SEO nit. Not fixed.

## 4. Build report

```
$ cd /sessions/great-blissful-sagan/mnt/smithers-website && npm run build
> smithers@ build
> vite build

/sessions/.../node_modules/rollup/dist/native.js:121
  throw new Error(
        ^
Error: Cannot find module @rollup/rollup-linux-x64-gnu. …
```

Workaround attempt:
```
$ npm install --no-save @rollup/rollup-linux-x64-gnu
npm error code E403
npm error 403 403 Forbidden - GET https://registry.npmjs.org/...
```

The sandbox's outbound network is firewalled (`registry.npmjs.org`, GitHub, etc. all return 403 from `curl -sI`). Setting `ROLLUP_SKIP_NODEJS_NATIVE=1` did not bypass — `rollup@4.62.2` still requires the native binding before checking. Bun is not installed.

Soundness check via TypeScript instead:
```
$ npx tsc --noEmit
src/router.tsx(1,29):  Cannot find module '@tanstack/react-query'
src/router.tsx(2,30):  Cannot find module '@tanstack/react-router'
src/routes/__root.tsx(1,50): Cannot find module '@tanstack/react-query'
src/routes/__root.tsx(9,8):  Cannot find module '@tanstack/react-router'
src/routes/fr.tsx(1,33):     Cannot find module '@tanstack/react-router'
src/routes/index.tsx(1,44):  Cannot find module '@tanstack/react-router'
src/routes/sitemap[.]xml.ts(1,33): Cannot find module '@tanstack/react-router'
src/routes/sitemap[.]xml.ts(2,21): Cannot find module '@tanstack/react-start'
src/server.ts(14,33): Cannot find module '@tanstack/react-start/server-entry'
…(plus pre-existing shadcn ui/* missing modules — separate concern)
```

**Bundle size: not produced.** Build cannot run in this environment until the package issues above are fixed AND outbound network access is restored for the missing rollup native module. Run on the user's local machine where the registry is reachable.

## 5. Translation notes (Quebec FR)

Quality is high overall. No France‑isms (no "courriel" oversights, no "petites entreprises"), no English bleed‑through, brand kept as "Smithers". A few small tightenings:

- **`fr.ts:23` hero sub** — "sur lesquels votre équipe s'appuie" is fine but heavy. Tighter: "sur lesquels votre équipe compte" or "que votre équipe utilise au quotidien".
- **`fr.ts:41` problem.pains[2]** — "tiennent par des miracles" reads as a translation of "held together by hope". A more colloquial Quebec phrasing: "qui tiennent avec de la broche" (regional, very natural). At minimum: "tiennent par miracle" (singular).
- **`fr.ts:122` how.steps[0].d** — "On écoute, vous déchargez." is okay; "vous videz votre sac" would be more idiomatic.
- **`fr.ts:202` Meridian before** — "tordu dans une forme qu'il n'était pas fait pour avoir" is a literal English calque. Try: "que les agents avaient tordu pour qu'il colle au métier — sans succès".
- **`fr.ts:265` FAQ #2** — "métiers de la construction" is fine but the EN spec says "trades" generally (could be plumbers/electricians/contractors). "métiers du bâtiment" or simply "métiers spécialisés" reads more naturally.
- **`fr.ts:269` FAQ #3** — "qu'elle soit propriétaire de ce qu'on a construit" sounds odd ("propriétaire" of code is weird). Better: "qu'elle s'approprie le système qu'on a construit".
- **`fr.ts:285` FAQ #7** — "un bon match" is anglicism. Use "un bon arrimage" or "une bonne adéquation".
- **`fr.ts:306` contact.h2Em** — "faits pour travailler ensemble" wraps long under the h2 clamp. The EN is the punchy 2‑word "a fit." Consider "compatibles." or "le bon arrimage." to keep the italic emphasis tight.
- **`fr.ts:155` Bellwether metricPrimary** — "−7,25 h/sem" uses comma decimal (correct FR) and "h/sem" abbreviation (correct CA‑FR). ✓

None of these are blockers; the file is shippable as is.

## 6. Fixes applied

- **`src/routes/index.tsx` — real counter-up `AnimatedMetric`.** Replaced the opacity‑fade with a counter that parses `metricPrimaryFrom`/`metricPrimaryTo` (already present in `en.ts`/`fr.ts`/`types.ts`), animates from start to target over 1.2s with easeOutCubic via `requestAnimationFrame`, then snaps to the canonical `display` string (preserves the en‑dash arrow + suffix formatting). Gated on `useReducedMotion()` → shows final string instantly. Handles integers, decimals, negatives, comma‑decimal, percent/hours/min suffixes. Adds `tabular-nums` to avoid jitter. ~50 lines including `parseMetric` helper.
- **`src/routes/index.tsx` — wired `from`/`to` props** at the `<AnimatedMetric />` call site in `CaseStudyCard`.
- **`src/routes/__root.tsx` — `<html lang>` derived from URL.** Defaults to `"en"` and switches to `"fr"` when `location.pathname.startsWith("/fr")`. SSR‑safe fallback to "en".
- **`src/routes/index.tsx` — added `aria-current` on EN/FR pill spans** so screen readers announce the active language. `aria-label` was already present on the button.

## 7. Recommended follow‑ups for Sonnet

1. **Add the missing dependencies** to `package.json` and run `npm install`:
   - `@tanstack/react-router`, `@tanstack/react-query`, `@tanstack/react-start`
   - dev: `@tanstack/router-plugin` (with vite preset), plus whatever TanStack Start currently needs (likely `vinxi` or `@tanstack/react-start/plugin` — check the version's docs)
2. **Wire TanStack Start in `vite.config.ts`** — add `tanstackStart()` plugin before `react()`, configure SSR entry to point at `src/server.ts`.
3. **Update `src/main.tsx`** — either delete it (Start owns the entry via its plugin) or rewrite it to render a CSR `<RouterProvider router={getRouter()} />` if a CSR fallback is wanted. Either way it must stop rendering `./App`.
4. **Delete `src/App.tsx`** once the router entry works — it's stale pre‑redesign code (`TOTAL_SECTIONS = "07"`, no Team, no Case Studies, no i18n).
5. **Drop the hand‑edited `src/routeTree.gen.ts`** and let the router plugin regenerate on the next `vite dev`. Add the file to `.gitignore` if not already.
6. **Run `bun run build` (or `npm run build`)** on the user's machine where the npm registry and GitHub are reachable. The current sandbox cannot install `@rollup/rollup-linux-x64-gnu` (network 403).
7. **LogoStrip polish**: add `group-hover:[animation-play-state:paused]` on the inline‑animated row, and consider replacing the text wordmarks with simple inline SVG wordmarks (per spec). Low priority.
8. **`index.html` static fallback** — add `og:locale="en_CA"`, `og:locale:alternate="fr_CA"`, and the three hreflang `<link rel="alternate">` tags so the raw HTML matches the SSR meta. Low priority.
9. **Update `useT.ts`** formatting (`return locales[locale] ?? en;}` on one line) — purely cosmetic.
10. **Optional Quebec‑FR polish** per §5 above; none block ship.
