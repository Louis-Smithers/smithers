import { createFileRoute, useRouter } from "@tanstack/react-router";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";
import { useT, type Locale } from "../i18n/useT";
import { en } from "../i18n/en";
import type { Translations, TierCopy, StepCopy, CaseStudyCopy, TeamMemberCopy, FaqItemCopy } from "../i18n/types";

/* ─── JSON-LD / meta ─────────────────────────────────────────── */

const SITE_URL = "https://smithers.app";
const OG_IMAGE = `${SITE_URL}/og.png`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Smithers",
  url: SITE_URL,
  logo: `${SITE_URL}/og.png`,
  description:
    "Smithers is a Canadian operations and automation consultancy helping small businesses fix the CRMs, spreadsheets, automations, and AI workflows they've outgrown.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montreal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  areaServed: "CA",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-514-806-0510",
      email: "e@smithers.app",
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: ["English", "French"],
    },
  ],
  sameAs: [],
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Smithers",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description:
    "Operations and automation consulting for Canadian small businesses. CRM rebuilds, automation, custom internal tools, and AI workflows.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montreal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  areaServed: "Canada",
  priceRange: "$$",
  serviceType: "Business Operations and Automation Consulting",
  telephone: "+1-514-806-0510",
  email: "e@smithers.app",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: en.faq.items.map(({ q, a }: FaqItemCopy) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const TITLE =
  "Smithers — Operations & Automation Consulting for Canadian Small Businesses";
const DESCRIPTION =
  "Smithers helps Canadian small businesses fix the systems they've outgrown — CRMs, spreadsheets, automations, and AI workflows that actually ship. Remote across Canada.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#0F1014" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "en", href: SITE_URL + "/" },
      { rel: "alternate", hrefLang: "fr", href: SITE_URL + "/fr" },
      { rel: "alternate", hrefLang: "x-default", href: SITE_URL + "/" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(professionalServiceJsonLd),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const router = useRouter();

  // Auto-detect FR on first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("smithers-lang");
    if (saved) return; // user has an explicit preference, don't redirect
    if (navigator.language.toLowerCase().startsWith("fr")) {
      router.navigate({ to: "/fr" });
    }
  }, [router]);

  return <SmithersLanding locale="en" />;
}

/* ─── Shared landing component ───────────────────────────────── */

const TOTAL_SECTIONS = "08";

export function SmithersLanding({ locale }: { locale: Locale }) {
  const t = useT(locale);

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      {/* Coral blob — CSS-only, behind hero */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-20vw] top-[-10vh] z-0 h-[70vh] w-[70vw] rounded-full opacity-[0.035]"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--coral) 0%, transparent 70%)",
          animation: "blob-drift 40s ease infinite alternate",
        }}
      />
      <div className="relative z-10">
        <SiteHeader locale={locale} t={t} />
        <main>
          <Hero t={t} />
          <LogoStrip t={t} />
          <Marquee t={t} />
          <Problem t={t} />
          <Services t={t} />
          <Stack t={t} />
          <HowItWorks t={t} />
          <CaseStudies t={t} />
          <Team t={t} />
          <FaqSection t={t} />
          <Contact t={t} />
        </main>
        <SiteFooter t={t} />
      </div>
    </div>
  );
}

/* ─── Shared hooks ───────────────────────────────────────────── */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      el.classList.add("reveal-in");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Parse a metric string into a leading number + trailing unit ("45 min" → [45, " min"]). */
function parseMetric(s: string): { num: number; suffix: string } | null {
  // Match optional minus/en-dash, digits, optional decimal (comma or dot).
  const m = s.match(/^([−–-]?\s*\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  const numStr = m[1].replace(/[−–]/g, "-").replace(",", ".").replace(/\s/g, "");
  const num = parseFloat(numStr);
  if (!isFinite(num)) return null;
  return { num, suffix: m[2] };
}

/** Animated counter — counts from `from` to `to` on first intersection. */
function AnimatedMetric({
  display,
  from,
  to,
  secondary,
}: {
  display: string;
  from?: string;
  to?: string;
  secondary?: string;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState<string>(display);
  const [started, setStarted] = useState(false);

  const target = to ? parseMetric(to) : null;
  const start = from ? parseMetric(from) : null;
  const canAnimate = !!target && !!start && start.suffix === target.suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion || !canAnimate) {
      setShown(display);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setShown(display);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            setStarted(true);
            io.unobserve(e.target);
            const t0 = performance.now();
            const dur = 1200;
            const a = start!.num;
            const b = target!.num;
            const suffix = target!.suffix;
            const isInt = Number.isInteger(a) && Number.isInteger(b);
            const tick = (now: number) => {
              const p = Math.min(1, (now - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              const v = a + (b - a) * eased;
              setShown((isInt ? Math.round(v).toString() : v.toFixed(1)) + suffix);
              if (p < 1) requestAnimationFrame(tick);
              else setShown(display); // snap to canonical formatted string
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, canAnimate, display, start, target, started]);

  return (
    <div ref={ref} className="text-center">
      <p
        className="display tabular-nums"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "var(--color-saffron)",
        }}
      >
        {shown}
      </p>
      {secondary && (
        <p className="mt-2 text-sm text-foreground/60 leading-snug max-w-[200px] mx-auto">
          {secondary}
        </p>
      )}
    </div>
  );
}

/** Magnetic hover — translates button slightly toward cursor. */
function useMagneticHover(cap = 6) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reducedMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-cap, Math.min(cap, (e.clientX - cx) * 0.25));
      const dy = Math.max(-cap, Math.min(cap, (e.clientY - cy) * 0.25));
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [reducedMotion, cap],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 300ms ease-out";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 310);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return ref;
}

/** Section heading with inline mono counter. */
function SectionHeading({ n, title }: { n: string; title: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal flex items-baseline gap-5 pb-12 md:gap-6">
      <span className="label-mono shrink-0">
        {n} / {TOTAL_SECTIONS}
      </span>
      <h2 className="display text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */

type T = Translations;

function SiteHeader({ locale, t }: { locale: Locale; t: T }) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next: Locale = locale === "en" ? "fr" : "en";
    localStorage.setItem("smithers-lang", next);
    router.navigate({ to: next === "fr" ? "/fr" : "/" });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-12">
        <a href="#top" className="display text-xl tracking-tight md:text-2xl">
          Smithers<span className="text-coral">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm md:flex">
          <a href="#services" className="underline-grow text-foreground/70 hover:text-foreground">
            {t.header.nav.services}
          </a>
          <a href="#stack" className="underline-grow text-foreground/70 hover:text-foreground">
            {t.header.nav.stack}
          </a>
          <a href="#how" className="underline-grow text-foreground/70 hover:text-foreground">
            {t.header.nav.how}
          </a>
          <a href="#faq" className="underline-grow text-foreground/70 hover:text-foreground">
            {t.header.nav.faq}
          </a>
          <a href="#contact" className="underline-grow text-foreground/70 hover:text-foreground">
            {t.header.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* EN / FR switcher */}
          <button
            onClick={switchLocale}
            aria-label={locale === "en" ? "Passer en français" : "Switch to English"}
            className="hidden items-center font-mono text-xs tracking-widest text-foreground/50 hover:text-foreground transition-colors sm:flex"
          >
            <span aria-current={locale === "en" ? "true" : undefined} className={locale === "en" ? "text-coral" : ""}>EN</span>
            <span className="mx-1.5 h-3 w-px bg-coral opacity-60" aria-hidden />
            <span aria-current={locale === "fr" ? "true" : undefined} className={locale === "fr" ? "text-coral" : ""}>FR</span>
          </button>

          <a
            href="mailto:e@smithers.app?subject=Discovery%20call"
            className="hidden min-h-11 items-center justify-center bg-coral px-5 text-sm font-medium text-ink transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {t.header.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */

function Hero({ t }: { t: T }) {
  const ref = useReveal<HTMLHeadingElement>();
  const ctaRef = useMagneticHover();

  return (
    <section id="top" className="relative">
      <div className="mx-auto grid min-h-[88dvh] max-w-[1400px] grid-cols-12 gap-x-6 px-6 pb-20 pt-20 md:px-12 md:pt-28">
        <p className="label-mono col-span-12 mt-2">{t.hero.eyebrow}</p>

        <h1
          ref={ref}
          className="reveal display col-span-12 mt-10 md:mt-16"
          style={{ fontSize: "clamp(2.75rem, 8.5vw, 7.5rem)" }}
        >
          {t.hero.h1Pre}{" "}
          <em className="display-italic text-coral">{t.hero.h1Em}</em>
        </h1>

        <div className="col-span-12 mt-auto pt-16 md:col-span-8 md:col-start-1 md:pt-24">
          <p className="text-lg leading-relaxed text-foreground/70 md:text-xl">
            {t.hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              ref={ctaRef}
              href="mailto:e@smithers.app?subject=Discovery%20call"
              className="inline-flex min-h-11 items-center justify-center bg-coral px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              {t.hero.ctaBook}
            </a>
            <a
              href="#how"
              className="underline-grow inline-flex min-h-11 items-center text-sm font-medium"
            >
              {t.hero.ctaHow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Logo Strip ─────────────────────────────────────────────── */

const LOGO_CLIENTS = [
  "Bellwether Law",
  "North & Pine Goods",
  "Coastline Physio",
  "Meridian Commercial",
  "Atlas Ledger",
  "Foundry Trades Co.",
];

function LogoWordmark({ name }: { name: string }) {
  // Approximate character count for viewBox width (each char ~13px at 20px font)
  const w = Math.max(120, name.length * 13 + 24);
  return (
    <svg
      viewBox={`0 0 ${w} 28`}
      height="28"
      aria-hidden
      className="shrink-0 cursor-default transition-all duration-200"
      style={{ fill: "var(--paper)", opacity: 0.55 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as SVGElement;
        el.style.fill = "var(--coral)";
        el.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as SVGElement;
        el.style.fill = "var(--paper)";
        el.style.opacity = "0.55";
      }}
    >
      <text
        x="0"
        y="21"
        fontFamily="Geist, system-ui, sans-serif"
        fontSize="20"
        fontWeight="500"
        letterSpacing="-0.02em"
      >
        {name}
      </text>
    </svg>
  );
}

function LogoStrip({ t }: { t: T }) {
  const reducedMotion = useReducedMotion();
  // Duplicate for seamless loop
  const items = [...LOGO_CLIENTS, ...LOGO_CLIENTS];

  return (
    <section aria-label={t.logoStrip.label} className="border-t border-border py-10 overflow-hidden">
      <p className="label-mono text-center mb-7">{t.logoStrip.label}</p>
      <div className="group relative">
        <div
          className="inline-flex items-center gap-16 whitespace-nowrap group-hover:[animation-play-state:paused]"
          style={{
            animation: reducedMotion ? "none" : "marquee 80s linear infinite",
            willChange: "transform",
          }}
          aria-hidden
        >
          {items.map((name, i) => (
            <LogoWordmark key={i} name={name} />
          ))}
        </div>
        {/* Accessible visible list for screen readers */}
        <ul className="sr-only">
          {LOGO_CLIENTS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Marquee ────────────────────────────────────────────────── */

function Marquee({ t }: { t: T }) {
  const items = [...t.marquee.items, ...t.marquee.items];
  return (
    <section
      aria-label="Common pain points"
      className="overflow-hidden border-y border-border bg-coral py-7 text-ink md:py-9"
    >
      <div className="group relative">
        <div className="marquee-track group-hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              <span
                className="display"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
              >
                {item}
              </span>
              <span aria-hidden className="text-2xl opacity-60">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Problem ────────────────────────────────────────────────── */

function Problem({ t }: { t: T }) {
  return (
    <section>
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="01" title={t.problem.sectionTitle} />
        <p className="max-w-2xl text-lg text-foreground/65">{t.problem.intro}</p>
        <ul className="mt-16">
          {t.problem.pains.map((p: string, i: number) => (
            <PainRow
              key={i}
              index={i}
              text={p}
              last={i === t.problem.pains.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PainRow({
  index,
  text,
  last,
}: {
  index: number;
  text: string;
  last: boolean;
}) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`reveal grid grid-cols-12 items-baseline gap-6 border-t border-border py-7 transition-colors hover:bg-card/40 md:py-9 ${
        last ? "border-b" : ""
      }`}
    >
      <span className="label-mono col-span-2 md:col-span-1">0{index + 1}</span>
      <p
        className="display col-span-10 md:col-span-11"
        style={{ fontSize: "clamp(1.375rem, 2.6vw, 2.25rem)", lineHeight: 1.15 }}
      >
        {text}
      </p>
    </li>
  );
}

/* ─── Services ───────────────────────────────────────────────── */

function Services({ t }: { t: T }) {
  return (
    <section id="services" className="scroll-mt-20 border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="02" title={t.services.sectionTitle} />
        <p className="max-w-2xl text-lg text-foreground/65">{t.services.intro}</p>

        <div className="mt-14 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {t.services.tiers.map((tier: TierCopy) => (
            <ServiceCard key={tier.name} tier={tier} />
          ))}
        </div>

        <p className="mt-8 label-mono opacity-50">{t.services.priceCaption}</p>
      </div>
    </section>
  );
}

function ServiceCard({ tier }: { tier: TierCopy }) {
  return (
    <article className="group relative flex flex-col bg-background p-8 transition-colors duration-200 hover:bg-card md:p-10">
      <h3 className="display text-3xl md:text-4xl">
        <span className="relative inline-block">
          {tier.name}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-coral transition-transform duration-200 ease-out group-hover:scale-x-100" />
        </span>
      </h3>
      <p className="mt-3 text-sm text-coral">{tier.tagline}</p>
      <p
        className="mt-1.5 font-mono text-xs"
        style={{ color: "var(--color-saffron)", opacity: 0.9 }}
      >
        {tier.priceFrom}
      </p>
      <p className="mt-5 text-base text-foreground/75">{tier.body}</p>
      <ul className="mt-6 space-y-2 text-sm text-foreground/85">
        {tier.outcomes.map((o) => (
          <li key={o} className="flex gap-3">
            <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-coral" />
            <span>{o}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-10">
        <span className="label-mono">
          Typical · <span className="text-foreground">{tier.typical}</span>
        </span>
      </div>
    </article>
  );
}

/* ─── Stack ──────────────────────────────────────────────────── */

type Tool = { name: string; slug: string; color: string };
type ToolGroup = { label: string; body: string; tools: Tool[] };

const TOOL_GROUPS: ToolGroup[] = [
  {
    label: "CRMs",
    body: "Where customer data lives.",
    tools: [
      { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
      { name: "Salesforce", slug: "salesforce", color: "00A1E0" },
      { name: "Pipedrive", slug: "pipedrive", color: "1FB6FF" },
    ],
  },
  {
    label: "Ops & data",
    body: "Where work gets organized.",
    tools: [
      { name: "Airtable", slug: "airtable", color: "FCB400" },
      { name: "Notion", slug: "notion", color: "EAE6DD" },
      { name: "monday.com", slug: "mondaydotcom", color: "FF3D57" },
    ],
  },
  {
    label: "Automation",
    body: "Where things start moving on their own.",
    tools: [
      { name: "Zapier", slug: "zapier", color: "FF4F00" },
      { name: "Make", slug: "make", color: "6D00CC" },
      { name: "n8n", slug: "n8n", color: "EA4B71" },
    ],
  },
  {
    label: "Internal tools",
    body: "When off-the-shelf doesn't fit.",
    tools: [
      { name: "Supabase", slug: "supabase", color: "3ECF8E" },
      { name: "Retool", slug: "retool", color: "EAE6DD" },
    ],
  },
  {
    label: "Commerce & finance",
    body: "Where money is counted.",
    tools: [
      { name: "Stripe", slug: "stripe", color: "635BFF" },
      { name: "QuickBooks", slug: "quickbooks", color: "2CA01C" },
      { name: "Shopify", slug: "shopify", color: "95BF47" },
    ],
  },
  {
    label: "AI",
    body: "Where it earns its keep.",
    tools: [
      { name: "OpenAI", slug: "openai", color: "10A37F" },
      { name: "Anthropic", slug: "anthropic", color: "D97757" },
    ],
  },
];

function ToolMark({ name, slug, color }: Tool) {
  const [src, setSrc] = useState(
    `https://cdn.simpleicons.org/${slug}/${color}`,
  );
  const [failed, setFailed] = useState(false);

  const tryNextOrFail = () => {
    const mirror = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
    if (src !== mirror) {
      setSrc(mirror);
      return;
    }
    setFailed(true);
  };

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center md:h-9 md:w-9">
        {failed ? (
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-md text-sm font-semibold md:h-8 md:w-8"
            style={{ backgroundColor: `#${color}`, color: "#0F1014" }}
          >
            {name[0]}
          </span>
        ) : (
          <img
            src={src}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            className="h-7 w-7 object-contain opacity-95 transition-opacity duration-200 group-hover/tool:opacity-100 md:h-8 md:w-8"
            onError={tryNextOrFail}
          />
        )}
      </div>
      <span className="text-xs leading-tight text-foreground/60 transition-colors duration-200 group-hover/tool:text-foreground">
        {name}
      </span>
    </div>
  );
}

function Stack({ t }: { t: T }) {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="03" title={t.stack.sectionTitle} />
        <p className="max-w-2xl text-lg text-foreground/65">{t.stack.intro}</p>

        <ul className="mt-16">
          {TOOL_GROUPS.map((g, i) => (
            <ToolRow
              key={g.label}
              group={g}
              last={i === TOOL_GROUPS.length - 1}
            />
          ))}
        </ul>

        <p className="mt-14 max-w-2xl text-sm text-foreground/55">
          {t.stack.footer}
        </p>
      </div>
    </section>
  );
}

function ToolRow({ group, last }: { group: ToolGroup; last: boolean }) {
  const ref = useReveal<HTMLLIElement>();
  const reducedMotion = useReducedMotion();

  return (
    <li
      ref={ref}
      className={`reveal grid grid-cols-12 items-center gap-x-6 gap-y-8 border-t border-border py-10 md:py-12 ${
        last ? "border-b" : ""
      }`}
    >
      <div className="col-span-12 md:col-span-4">
        <h3
          className="display text-2xl md:text-3xl"
          style={{ color: "var(--color-teal)" }}
        >
          {group.label}
        </h3>
        <p className="mt-2 text-sm text-foreground/55">{group.body}</p>
      </div>
      <ul
        aria-label={`${group.label} tools`}
        className="col-span-12 flex flex-wrap items-start gap-x-10 gap-y-7 md:col-span-8 md:gap-x-12"
      >
        {group.tools.map((tool, idx) => (
          <li
            key={tool.slug}
            className="group/tool min-w-[3.5rem]"
            style={
              reducedMotion
                ? {}
                : {
                    opacity: 0,
                    animation: `fade-in-up 400ms ease forwards ${idx * 50}ms`,
                  }
            }
          >
            <ToolMark {...tool} />
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ─── How it works ───────────────────────────────────────────── */

function HowItWorks({ t }: { t: T }) {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="04" title={t.how.sectionTitle} />
        <ol className="mt-8 grid grid-cols-12 gap-x-6">
          {t.how.steps.map((s: StepCopy, i: number) => (
            <Step
              key={s.t}
              index={i}
              step={s}
              last={i === t.how.steps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  step,
  last,
}: {
  index: number;
  step: { t: string; d: string };
  last: boolean;
}) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`reveal relative col-span-12 grid grid-cols-12 items-start gap-x-6 border-t border-border py-12 ${
        last ? "border-b" : ""
      }`}
    >
      <span
        aria-hidden
        className="outline-numeral pointer-events-none absolute -left-2 -top-6 select-none md:-left-4"
        style={{ fontSize: "clamp(5rem, 11vw, 9.5rem)" }}
      >
        0{index + 1}
      </span>
      <div className="col-span-12 md:col-span-4 md:col-start-3">
        <h3 className="display" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}>
          {step.t}
        </h3>
      </div>
      <p className="col-span-12 mt-3 text-base text-foreground/70 md:col-span-6 md:col-start-7 md:mt-0 md:text-lg">
        {step.d}
      </p>
    </li>
  );
}

/* ─── Case Studies ───────────────────────────────────────────── */

/** Star rating row — coral filled stars, bone/outline empty stars. */
function Stars({
  rating,
  total = 5,
  label,
}: {
  rating: number;
  total?: number;
  label: string;
}) {
  return (
    <div role="img" aria-label={label} className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => {
        const filled = i < rating;
        return (
          <svg
            key={i}
            aria-hidden
            viewBox="0 0 20 20"
            width="14"
            height="14"
            className="shrink-0"
          >
            <path
              d="M10 1.5l2.59 5.25 5.8.84-4.2 4.09.99 5.78L10 14.77l-5.18 2.69.99-5.78-4.2-4.09 5.8-.84L10 1.5z"
              fill={filled ? "var(--coral)" : "none"}
              stroke="var(--coral)"
              strokeWidth={filled ? 0 : 1.2}
              opacity={filled ? 1 : 0.45}
            />
          </svg>
        );
      })}
    </div>
  );
}

function CaseStudies({ t }: { t: T }) {
  return (
    <section className="surface-paper border-t border-border/30 scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="05" title={t.caseStudies.sectionTitle} />
        <p
          className="max-w-2xl text-lg"
          style={{ color: "var(--ink)", opacity: 0.7 }}
        >
          {t.caseStudies.intro}
        </p>

        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start"
        >
          {t.caseStudies.studies.map((study: CaseStudyCopy, i: number) => (
            <CaseStudyCard key={study.client} study={study} t={t} index={i} />
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}

function CaseStudyCard({
  study,
  t,
  index,
}: {
  study: CaseStudyCopy;
  t: T;
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const value = `case-study-${index}`;
  const triggerId = `case-study-trigger-${index}`;
  const panelId = `case-study-panel-${index}`;
  const ratingLabel = t.caseStudies.ratingLabel.replace(
    "{n}",
    String(study.rating),
  );

  return (
    <AccordionPrimitive.Item
      ref={ref}
      value={value}
      className="reveal group/card border-[rgba(15,16,20,0.15)] border transition-colors duration-200 data-[state=open]:border-coral data-[state=open]:shadow-[inset_0_0_0_1px_var(--coral)] data-[state=closed]:hover:border-[rgba(15,16,20,0.35)]"
    >
      <div className="h-full">
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger
            id={triggerId}
            aria-controls={panelId}
            className="flex min-h-[260px] w-full flex-col p-7 text-left transition-colors hover:bg-black/[0.03] md:p-8"
          >
            {/* Top row: stars + plus affordance */}
            <div className="flex items-start justify-between gap-4">
              <Stars rating={study.rating} label={ratingLabel} />
              <span
                aria-hidden
                className="mt-[-2px] inline-flex h-6 w-6 shrink-0 items-center justify-center text-2xl leading-none transition-transform duration-200 group-data-[state=open]/card:rotate-45"
                style={{ color: "var(--ink)" }}
              >
                +
              </span>
            </div>

            {/* Client name */}
            <h3
              className="display mt-4"
              style={{
                fontSize: "clamp(1.375rem, 2vw, 1.75rem)",
                color: "var(--ink)",
              }}
            >
              {study.client}
            </h3>

            {/* Meta line */}
            <p
              className="mt-1.5 font-mono text-xs tracking-widest uppercase"
              style={{ color: "var(--ink)", opacity: 0.45 }}
            >
              {study.meta}
            </p>

            {/* Headline metric — static, not animated in compact view */}
            <p
              className="display mt-5 tabular-nums"
              style={{
                fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                color: "var(--color-saffron)",
                lineHeight: 1.15,
              }}
            >
              {study.headline}
            </p>

            {/* Teaser */}
            <p
              className="display-italic mt-3 text-sm md:text-base"
              style={{ color: "var(--ink)", opacity: 0.7 }}
            >
              {study.teaser}
            </p>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>

        <AccordionPrimitive.Content
          id={panelId}
          aria-labelledby={triggerId}
          className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 px-7 pb-8 md:grid-cols-2 md:px-8">
            {/* Text column */}
            <div>
              <div className="space-y-6">
                <div>
                  <p
                    className="label-mono mb-2"
                    style={{ color: "var(--ink)", opacity: 0.45 }}
                  >
                    {t.caseStudies.beforeLabel}
                  </p>
                  <p
                    className="text-base"
                    style={{ color: "var(--ink)", opacity: 0.75 }}
                  >
                    {study.before}
                  </p>
                </div>
                <div>
                  <p
                    className="label-mono mb-2"
                    style={{ color: "var(--ink)", opacity: 0.45 }}
                  >
                    {t.caseStudies.shippedLabel}
                  </p>
                  <p
                    className="text-base"
                    style={{ color: "var(--ink)", opacity: 0.75 }}
                  >
                    {study.shipped}
                  </p>
                </div>
              </div>

              {/* Tool pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span
                  className="label-mono mr-1"
                  style={{ color: "var(--ink)", opacity: 0.4 }}
                >
                  {t.caseStudies.toolsLabel}:
                </span>
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-sm border px-2 py-0.5 font-mono text-xs"
                    style={{
                      color: "var(--ink)",
                      borderColor: "rgba(15,16,20,0.15)",
                      opacity: 0.7,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Metric + quote column */}
            <div className="flex flex-col items-center justify-start gap-8 text-center md:pt-1">
              <div>
                <p
                  className="label-mono mb-4"
                  style={{ color: "var(--ink)", opacity: 0.4 }}
                >
                  {t.caseStudies.resultLabel}
                </p>
                <AnimatedMetric
                  display={study.metricPrimary}
                  from={study.metricPrimaryFrom}
                  to={study.metricPrimaryTo}
                  secondary={study.metricSecondary}
                />
              </div>

              {/* Pull quote */}
              <blockquote className="border-l-2 border-coral pl-5 text-left">
                <p
                  className="display-italic text-base md:text-lg"
                  style={{ color: "var(--ink)", opacity: 0.85 }}
                >
                  "{study.quote}"
                </p>
                <cite
                  className="mt-2 block not-italic font-mono text-xs"
                  style={{ color: "var(--ink)", opacity: 0.5 }}
                >
                  — {study.quoteAttrib}
                </cite>
              </blockquote>
            </div>
          </div>
        </AccordionPrimitive.Content>
      </div>
    </AccordionPrimitive.Item>
  );
}

/* ─── Team ───────────────────────────────────────────────────── */

const MONOGRAM_COLORS = [
  "var(--coral)",
  "var(--color-saffron)",
  "var(--color-teal)",
  "var(--paper)",
] as const;

function Team({ t }: { t: T }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="06" title={t.team.sectionTitle} />
        <p className="max-w-2xl text-lg text-foreground/65">{t.team.intro}</p>

        <div
          ref={ref}
          className="reveal mt-14 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.team.members.map((member: TeamMemberCopy, i: number) => (
            <TeamCard key={member.name} member={member} colorIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  colorIndex,
}: {
  member: TeamMemberCopy;
  colorIndex: number;
}) {
  const bg = MONOGRAM_COLORS[colorIndex % MONOGRAM_COLORS.length];
  const isLight = bg === "var(--paper)" || bg === "var(--color-saffron)";

  return (
    <article className="flex flex-col bg-background p-8 transition-colors hover:bg-card md:p-10">
      <div
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-sm font-sans text-lg font-semibold tracking-tight"
        style={{
          backgroundColor: bg,
          color: isLight ? "var(--ink)" : "var(--paper)",
        }}
      >
        {member.initials}
      </div>
      <h3 className="display mt-5 text-xl md:text-2xl">{member.name}</h3>
      <p className="mt-1 text-sm" style={{ color: "var(--coral)" }}>
        {member.role}
      </p>
      <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
        {member.specialty}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {member.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-foreground/45"
          >
            {tool}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */

function FaqSection({ t }: { t: T }) {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="07" title={t.faq.sectionTitle} />
        <div className="grid grid-cols-12 gap-x-6">
          <AccordionPrimitive.Root
            type="single"
            collapsible
            className="col-span-12 md:col-span-10"
          >
            {t.faq.items.map((item: FaqItemCopy, i: number) => (
              <AccordionPrimitive.Item
                key={i}
                value={`item-${i}`}
                className="group border-t border-border last:border-b"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="flex w-full min-h-11 items-start justify-between gap-6 py-6 text-left transition-colors hover:text-coral data-[state=open]:text-coral">
                    <h3
                      className="display"
                      style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.375rem)" }}
                    >
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center text-2xl leading-none transition-transform duration-200 group-data-[state=open]:rotate-45"
                    >
                      +
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="grid grid-cols-12 gap-x-6 pb-8 pr-4 md:pr-12">
                    <p className="col-span-12 text-base leading-relaxed text-foreground/75 md:col-span-10 md:text-lg">
                      {item.a}
                    </p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */

function Contact({ t }: { t: T }) {
  const ref = useReveal<HTMLHeadingElement>();
  const ctaRef = useMagneticHover();

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-36">
        <p className="label-mono mb-8">
          08 / {TOTAL_SECTIONS} · {t.contact.eyebrow}
        </p>

        <h2
          ref={ref}
          className="reveal display"
          style={{ fontSize: "clamp(2.5rem, 7.5vw, 6rem)" }}
        >
          {t.contact.h2Pre}{" "}
          <em className="display-italic text-coral">{t.contact.h2Em}</em>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
          <p className="col-span-12 text-lg leading-relaxed text-foreground/75 md:col-span-7 md:text-xl">
            {t.contact.body}
          </p>

          <div className="col-span-12 border-l border-coral pl-6 md:col-span-5 md:col-start-8">
            <p className="label-mono">{t.contact.contactLabel}</p>
            <p className="display mt-4 text-3xl">{t.contact.contactName}</p>
            <p className="mt-1 text-sm text-foreground/60">{t.contact.contactRole}</p>
            <dl className="mt-6 space-y-2 text-base">
              <div className="flex gap-3">
                <dt className="w-20 text-foreground/55">{t.contact.emailLabel}</dt>
                <dd>
                  <a className="underline-grow" href="mailto:e@smithers.app">
                    e@smithers.app
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 text-foreground/55">{t.contact.phoneLabel}</dt>
                <dd>
                  <a className="underline-grow" href="tel:+15148060510">
                    514-806-0510
                  </a>
                </dd>
              </div>
            </dl>
            <a
              ref={ctaRef}
              href="mailto:e@smithers.app?subject=Discovery%20call"
              className="mt-8 inline-flex min-h-11 items-center justify-center bg-coral px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              {t.contact.cta}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

function SiteFooter({ t }: { t: T }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 md:px-12 md:pt-28">
        <h2
          aria-hidden
          className="display leading-none text-foreground/15"
          style={{
            fontSize: "clamp(4rem, 17vw, 15rem)",
            letterSpacing: "-0.05em",
          }}
        >
          Smithers<span className="text-coral/40">.</span>
        </h2>
        <div className="mt-12 flex flex-col gap-6 border-t border-border py-8 text-sm text-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>{t.footer.copy}</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6">
              <li><a href="#services" className="underline-grow hover:text-foreground">{t.footer.nav.services}</a></li>
              <li><a href="#how" className="underline-grow hover:text-foreground">{t.footer.nav.how}</a></li>
              <li><a href="#faq" className="underline-grow hover:text-foreground">{t.footer.nav.faq}</a></li>
              <li><a href="#contact" className="underline-grow hover:text-foreground">{t.footer.nav.contact}</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
