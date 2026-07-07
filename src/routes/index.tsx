import { createFileRoute, useRouter } from "@tanstack/react-router";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";
import { useT, type Locale } from "../i18n/useT";
import { en } from "../i18n/en";
import type { Translations, TierCopy, StepCopy, CaseStudyCopy, TeamMemberCopy, FaqItemCopy, SoundFamiliarScenario } from "../i18n/types";

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
  "Smithers: Operations & Automation Consulting for Canadian Small Businesses";
const DESCRIPTION =
  "Smithers helps Canadian small businesses fix the systems they've outgrown: CRMs, spreadsheets, automations, and AI workflows that actually ship. Remote across Canada.";

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
          <SoundFamiliar t={t} />
          <Services t={t} />
          <HowItWorks t={t} />
          <CaseStudyBanner t={t} />
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

/** Section heading. */
function SectionHeading({ title }: { title: string }) {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <h2 ref={ref} className="reveal display pb-12 text-3xl md:text-4xl">
      {title}
    </h2>
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
    <section id="top" className="hero-wash relative">
      <div className="mx-auto grid min-h-[88dvh] max-w-[1400px] grid-cols-12 gap-x-6 px-6 pb-20 pt-16 md:px-12 md:pt-24">
        <p
          className="hero-stagger label-mono col-span-12 mt-2"
          style={{ color: "var(--color-saffron)", animationDelay: "100ms" }}
        >
          {t.hero.eyebrow}
        </p>

        <h1
          ref={ref}
          className="hero-stagger reveal display col-span-12 mt-10 md:mt-16"
          style={{ fontSize: "clamp(2.75rem, 8.5vw, 7.5rem)", animationDelay: "250ms" }}
        >
          {t.hero.h1Pre}{" "}
          <em className="display-italic text-coral">{t.hero.h1Em}</em>
        </h1>

        <div
          className="hero-stagger col-span-12 mt-auto pt-16 md:col-span-8 md:col-start-1 md:pt-24"
          style={{ animationDelay: "450ms" }}
        >
          <p className="text-lg leading-relaxed text-foreground/70 md:text-xl">
            {t.hero.sub}
          </p>
          <div
            className="hero-stagger mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "600ms" }}
          >
            <a
              ref={ctaRef}
              href="mailto:e@smithers.app?subject=Discovery%20call"
              className="inline-flex min-h-11 items-center justify-center bg-coral px-6 py-3 text-sm font-medium text-ink transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
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

/* ─── Logo Strip (industry chips) ────────────────────────────── */

function LogoStrip({ t }: { t: T }) {
  return (
    <section aria-label={t.logoStrip.label} className="border-t border-border py-10">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12">
        <span className="label-mono shrink-0 text-foreground/45">
          {t.logoStrip.label}
        </span>
        <ul className="flex flex-wrap items-center gap-2">
          {t.logoStrip.chips.map((chip) => (
            <li
              key={chip}
              className="border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground/55"
            >
              {chip}
            </li>
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

/* ─── Sound Familiar (n8n-style workflow pipelines) ────────── */

/** Tool icon slug → Simple Icons CDN URL map. */
const TOOL_SLUG_MAP: Record<string, { slug: string; color: string }> = {
  /* ── Proper tools (fixed state) ──────────────── */
  HubSpot: { slug: "hubspot", color: "FF7A59" },
  Salesforce: { slug: "salesforce", color: "00A1E0" },
  Airtable: { slug: "airtable", color: "FCB400" },
  Notion: { slug: "notion", color: "EAE6DD" },
  Zapier: { slug: "zapier", color: "FF4F00" },
  Make: { slug: "make", color: "6D00CC" },
  n8n: { slug: "n8n", color: "EA4B71" },
  Supabase: { slug: "supabase", color: "3ECF8E" },
  Retool: { slug: "retool", color: "EAE6DD" },
  "Google Sheets": { slug: "googlesheets", color: "34A853" },
  Stripe: { slug: "stripe", color: "635BFF" },
  QuickBooks: { slug: "quickbooks", color: "2CA01C" },
  Shopify: { slug: "shopify", color: "95BF47" },
  OpenAI: { slug: "openai", color: "EAE6DD" },
  Anthropic: { slug: "anthropic", color: "D97757" },
  Slack: { slug: "slack", color: "E01E5A" },
  /* ── Google / generic tools (broken state) ──── */
  Gmail: { slug: "gmail", color: "EA4335" },
  "Google Docs": { slug: "googledocs", color: "4285F4" },
  "Google Chat": { slug: "googlechat", color: "00AC47" },
  "Google Calendar": { slug: "googlecalendar", color: "4285F4" },
};

function SmallToolIcon({ name }: { name: string }) {
  const info = TOOL_SLUG_MAP[name];

  if (!info) {
    return (
      <span
        className="flex h-5 w-5 items-center justify-center rounded-sm text-[9px] font-semibold"
        style={{
          backgroundColor: "#3A3D47",
          color: "#EAE6DD",
        }}
      >
        {name[0]}
      </span>
    );
  }

  return (
    <img
      src={`/icons/${info.slug}.svg`}
      alt={name}
      width={20}
      height={20}
      className="h-5 w-5 object-contain"
    />
  );
}

type WfNodeStatus = "idle" | "running" | "success" | "error" | "fixing";

function SoundFamiliar({ t }: { t: T }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [globalPhase, setGlobalPhase] = useState<"broken" | "fixing" | "fixed">("broken");
  const reducedMotion = useReducedMotion();
  const ctaRef = useMagneticHover();

  /* Trigger animation when section scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const handleFix = useCallback(() => {
    setGlobalPhase("fixing");
    /* Preload fixed-state icons while the progress bar runs */
    t.soundFamiliar.scenarios.forEach((s: SoundFamiliarScenario) => {
      s.fixedNodes.forEach((node) => {
        const info = TOOL_SLUG_MAP[node.tool];
        if (info) {
          const img = new Image();
          img.src = `/icons/${info.slug}.svg`;
        }
      });
    });
    setTimeout(() => setGlobalPhase("fixed"), 1800);
  }, [t.soundFamiliar.scenarios]);

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-20 border-t border-border bg-[var(--ink-warm)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        {/* Title swaps after fix */}
        <SectionHeading
          title={globalPhase === "fixed" ? t.soundFamiliar.fixedTitle : t.soundFamiliar.sectionTitle}
        />

        {/* Workflow pipelines */}
        <div className="mt-12 space-y-12">
          {t.soundFamiliar.scenarios.map((scenario: SoundFamiliarScenario, i: number) => (
            <WorkflowPipeline
              key={i}
              scenario={scenario}
              globalPhase={globalPhase}
              visible={visible}
              index={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p
            className="display text-xl md:text-2xl"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
          >
            {globalPhase === "fixed" ? t.soundFamiliar.fixedCtaLine : t.soundFamiliar.ctaLine}
          </p>

          {globalPhase === "broken" && (
            <button
              onClick={handleFix}
              className="mt-10 inline-flex min-h-14 cursor-pointer items-center justify-center bg-coral px-12 py-4 text-base font-medium text-ink transition-all hover:opacity-90 active:scale-[0.98]"
            >
              {t.soundFamiliar.ctaButton}
            </button>
          )}

          {globalPhase === "fixing" && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-sm text-foreground/65">
                {t.soundFamiliar.fixingText}
              </p>
              <div className="wf-progress-track">
                <div className="wf-progress-bar" />
              </div>
            </div>
          )}

          {globalPhase === "fixed" && (
            <a
              ref={ctaRef}
              href="mailto:e@smithers.app?subject=Discovery%20call"
              className="mt-10 inline-flex min-h-14 items-center justify-center bg-coral px-12 py-4 text-base font-medium text-ink transition-all hover:opacity-90 active:scale-[0.98]"
            >
              {t.soundFamiliar.fixedCtaButton}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Workflow pipeline row ─────────────────────────────────── */

function WorkflowPipeline({
  scenario,
  globalPhase,
  visible,
  index,
  reducedMotion,
}: {
  scenario: SoundFamiliarScenario;
  globalPhase: "broken" | "fixing" | "fixed";
  visible: boolean;
  index: number;
  reducedMotion: boolean;
}) {
  const [typedText, setTypedText] = useState("");
  const [nodeStatuses, setNodeStatuses] = useState<WfNodeStatus[]>(
    () => scenario.brokenNodes.map(() => "idle"),
  );
  const [showOutput, setShowOutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    clearTimers();
    if (!visible) return;

    const isFixed = globalPhase === "fixed";
    const nodes = isFixed ? scenario.fixedNodes : scenario.brokenNodes;

    const addTimer = (fn: () => void, delay: number) => {
      timersRef.current.push(setTimeout(fn, delay));
    };

    /* ── Fixing phase: just mark error nodes ────────────── */
    if (globalPhase === "fixing") {
      setNodeStatuses((prev) =>
        prev.map((s, i) => (i === scenario.errorNodeIndex ? "fixing" : s)),
      );
      setShowOutput(false);
      return;
    }

    /* ── Broken / Fixed: run the full sequence ──────────── */
    const stagger = isFixed ? index * 600 : index * 1200;

    /* Reset everything */
    setTypedText("");
    setNodeStatuses(nodes.map(() => "idle"));
    setShowOutput(false);
    setIsError(false);

    /* Reduced motion: skip to end state immediately */
    if (reducedMotion) {
      addTimer(() => {
        setTypedText(scenario.inputText);
        setNodeStatuses(
          nodes.map((_, i) =>
            !isFixed && i === scenario.errorNodeIndex ? "error" : "success",
          ),
        );
        setShowOutput(true);
        setIsError(!isFixed);
      }, 100);
      return;
    }

    const charDelay = 45;
    const text = scenario.inputText;

    addTimer(() => {
      /* Type characters one by one */
      for (let c = 1; c <= text.length; c++) {
        addTimer(() => setTypedText(text.slice(0, c)), c * charDelay);
      }

      const typingDone = text.length * charDelay + 250;

      /* Run nodes sequentially */
      nodes.forEach((_, ni) => {
        addTimer(() => {
          setNodeStatuses((prev) => {
            const next = [...prev];
            next[ni] = "running";
            return next;
          });
        }, typingDone + ni * 500);

        addTimer(() => {
          setNodeStatuses((prev) => {
            const next = [...prev];
            next[ni] =
              !isFixed && ni === scenario.errorNodeIndex ? "error" : "success";
            return next;
          });
        }, typingDone + ni * 500 + 380);
      });

      /* Show output */
      addTimer(() => {
        setShowOutput(true);
        setIsError(!isFixed);
      }, typingDone + nodes.length * 500 + 500);
    }, stagger);

    return clearTimers;
  }, [visible, globalPhase, index, scenario, reducedMotion, clearTimers]);

  /* Cleanup on unmount */
  useEffect(() => clearTimers, [clearTimers]);

  const isFixed = globalPhase === "fixed";
  const activeNodes = isFixed ? scenario.fixedNodes : scenario.brokenNodes;
  const inputDone = typedText.length === scenario.inputText.length;

  return (
    <div className="group">
      {/* Scenario label */}
      <p
        className="label-mono mb-4"
        style={{ color: "var(--color-teal)" }}
      >
        {scenario.label}
      </p>

      {/* Pipeline — fills width, horizontal scroll on mobile */}
      <div className="wf-pipeline-scroll flex items-center gap-2 overflow-x-auto pt-3 pb-2 md:gap-3">
        {/* Input field */}
        <div className="wf-input-field shrink-0">
          <span className="wf-typed-text font-mono text-xs text-foreground/90">
            {typedText}
            <span className="wf-cursor" aria-hidden />
          </span>
          <span
            className={`wf-action-btn label-mono ${inputDone ? "wf-action-active" : ""}`}
          >
            {scenario.inputAction}
          </span>
        </div>

        {/* Connector out of input */}
        <WfConnector active={inputDone} />

        {/* Nodes + connectors */}
        {activeNodes.map((node, ni) => (
          <Fragment key={`${isFixed ? "f" : "b"}-${ni}`}>
            <WfNode
              tool={node.tool}
              label={node.label}
              status={nodeStatuses[ni]}
            />
            {ni < activeNodes.length - 1 && (
              <WfConnector active={nodeStatuses[ni] === "success"} />
            )}
          </Fragment>
        ))}

        {/* Connector into output */}
        <WfConnector
          active={nodeStatuses[nodeStatuses.length - 1] === "success"}
        />

        {/* Output field */}
        <div
          className={`wf-output-field shrink-0 font-mono text-xs ${
            showOutput ? "wf-output-visible" : "wf-output-hidden"
          } ${isError ? "wf-output-error" : "wf-output-success"}`}
        >
          {showOutput
            ? isError
              ? scenario.brokenOutput
              : scenario.fixedOutput
            : " "}
        </div>
      </div>
    </div>
  );
}

/* ── Workflow sub-components ───────────────────────────────── */

function WfConnector({ active }: { active: boolean }) {
  return (
    <div className="flex shrink-0 items-center">
      <div className={`wf-connector-line ${active ? "wf-connector-active" : ""}`} />
      <svg
        viewBox="0 0 8 8"
        className="h-2 w-2 shrink-0 transition-colors duration-300"
        fill="currentColor"
        style={{ color: active ? "var(--color-teal)" : "var(--border)" }}
        aria-hidden
      >
        <polygon points="0,0 8,4 0,8" />
      </svg>
    </div>
  );
}

function WfNode({
  tool,
  label,
  status,
}: {
  tool: string;
  label: string;
  status: WfNodeStatus;
}) {
  const borderColor: Record<WfNodeStatus, string> = {
    idle: "var(--border)",
    running: "var(--color-saffron)",
    success: "var(--color-teal)",
    error: "var(--coral)",
    fixing: "var(--color-saffron)",
  };

  return (
    <div
      className={`wf-node shrink-0 ${status === "running" ? "wf-node-running" : ""} ${status === "fixing" ? "wf-node-fixing" : ""}`}
      style={{ borderColor: borderColor[status] }}
    >
      <SmallToolIcon name={tool} />
      <span className="wf-node-label">{label}</span>

      {/* Status badge */}
      <span className="wf-node-status" aria-hidden>
        {status === "success" && <span className="wf-badge-ok">&#10003;</span>}
        {status === "error" && <span className="wf-badge-err">&#10005;</span>}
        {status === "running" && <span className="wf-badge-run" />}
        {status === "fixing" && <span className="wf-badge-fix">&#9881;</span>}
      </span>
    </div>
  );
}

/* ─── Services ───────────────────────────────────────────────── */

function Services({ t }: { t: T }) {
  return (
    <section id="services" className="scroll-mt-20 border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading title={t.services.sectionTitle} />
        <p className="max-w-2xl text-lg text-foreground/65">{t.services.intro}</p>

        <div className="mt-14 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {t.services.tiers.map((tier: TierCopy) => (
            <ServiceCard key={tier.name} tier={tier} />
          ))}
        </div>

        {t.services.priceCaption && (
          <p className="mt-8 label-mono opacity-50">{t.services.priceCaption}</p>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ tier }: { tier: TierCopy }) {
  return (
    <article className="group relative flex flex-col bg-background p-8 transition-all duration-200 hover:bg-card hover:translate-y-[-2px] md:p-10">
      <h3 className="display text-3xl md:text-4xl">
        <span className="relative inline-block">
          {tier.name}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-coral transition-transform duration-200 ease-out group-hover:scale-x-100" />
        </span>
      </h3>
      <p className="mt-3 text-sm text-coral">{tier.tagline}</p>
      <p className="mt-5 text-base text-foreground/75">{tier.body}</p>
      <ul className="mt-6 space-y-2 text-sm text-foreground/85">
        {tier.outcomes.map((o) => (
          <li key={o} className="flex gap-3">
            <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-coral" />
            <span>{o}</span>
          </li>
        ))}
      </ul>
      {tier.typical && (
        <div className="mt-auto pt-10">
          <span className="label-mono">
            <span className="text-foreground">{tier.typical}</span>
          </span>
        </div>
      )}
    </article>
  );
}

/* (Stack section removed — tools now shown in SoundFamiliar resolution pipeline) */

/* ─── How it works ───────────────────────────────────────────── */

function HowItWorks({ t }: { t: T }) {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading title={t.how.sectionTitle} />
        <ol className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-4">
          {t.how.steps.map((s: StepCopy, i: number) => (
            <HowStep
              key={s.t}
              step={s}
              index={i}
              total={t.how.steps.length}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

const HOW_ICONS = [
  /* Phone / call */
  <svg key="call" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  /* Search / diagnosis */
  <svg key="diag" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  /* Document / proposal */
  <svg key="prop" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  /* Rocket / build & handoff */
  <svg key="ship" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
];

function HowStep({
  step,
  index,
  total,
}: {
  step: { t: string; d: string };
  index: number;
  total: number;
}) {
  const ref = useReveal<HTMLLIElement>();
  const isLast = index === total - 1;

  return (
    <li
      ref={ref}
      className="reveal group relative flex flex-col items-start px-0 py-8 md:px-6 md:py-0"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Connecting line (horizontal on desktop, vertical on mobile) */}
      {!isLast && (
        <>
          {/* Desktop horizontal line */}
          <div
            aria-hidden
            className="absolute right-0 top-[28px] hidden h-px w-6 md:block"
            style={{ background: "var(--color-teal)", opacity: 0.3 }}
          />
          {/* Mobile vertical line */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[19px] h-8 w-px md:hidden"
            style={{ background: "var(--color-teal)", opacity: 0.3 }}
          />
        </>
      )}

      {/* Icon circle */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-300 group-hover:border-coral"
        style={{
          borderColor: "color-mix(in oklab, var(--teal) 40%, transparent)",
          color: "var(--color-teal)",
        }}
      >
        {HOW_ICONS[index]}
      </div>

      {/* Step number */}
      <p
        className="label-mono mt-5"
        style={{ color: "var(--color-teal)", fontWeight: 500 }}
      >
        {String(index + 1).padStart(2, "0")}
      </p>

      {/* Title */}
      <h3
        className="display mt-2"
        style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
      >
        {step.t}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
        {step.d}
      </p>
    </li>
  );
}

/* ─── Case Study transition banner ───────────────────────────── */

/** Narrow static coral strip signaling the transition into Case Studies. */
function CaseStudyBanner({ t }: { t: T }) {
  return (
    <div className="border-y border-border bg-coral py-3 text-center text-ink">
      <span className="label-mono" style={{ color: "var(--ink)" }}>
        {t.caseStudies.banner}
      </span>
    </div>
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
        <SectionHeading title={t.caseStudies.sectionTitle} />
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
            <span
              className="mt-2 inline-flex w-fit border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest"
              style={{ color: "var(--coral)", borderColor: "var(--coral)" }}
            >
              {study.tier}
            </span>

            {/* Headline metric — static, not animated in compact view.
                Uses --saffron-on-paper (darker) for AA contrast against surface-paper. */}
            <p
              className="display mt-5 tabular-nums"
              style={{
                fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                color: "var(--saffron-on-paper)",
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
              <figure className="border-l-2 border-coral pl-5 text-left">
                <blockquote>
                  <p
                    className="display-italic text-base md:text-lg"
                    style={{ color: "var(--ink)", opacity: 0.85 }}
                  >
                    "{study.quote}"
                  </p>
                </blockquote>
                <figcaption
                  className="mt-2 font-mono text-xs"
                  style={{ color: "var(--ink)", opacity: 0.5 }}
                >
                  {study.attribution.name}, {study.attribution.role},{" "}
                  {study.attribution.company}
                </figcaption>
              </figure>
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
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
          <div className="col-span-12 md:col-span-5 md:sticky md:top-24 md:self-start">
            <SectionHeading title={t.team.sectionTitle} />
            <p className="max-w-md text-lg text-foreground/65">{t.team.intro}</p>
          </div>

          <div
            ref={ref}
            className="reveal col-span-12 divide-y divide-border md:col-span-7"
          >
            {t.team.members.map((member: TeamMemberCopy, i: number) => (
              <TeamRow key={member.name} member={member} colorIndex={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamRow({
  member,
  colorIndex,
}: {
  member: TeamMemberCopy;
  colorIndex: number;
}) {
  const bg = MONOGRAM_COLORS[colorIndex % MONOGRAM_COLORS.length];
  const isLight = bg === "var(--paper)" || bg === "var(--color-saffron)";

  return (
    <article className="flex gap-6 py-8 first:pt-0">
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm font-sans text-lg font-semibold tracking-tight"
        style={{
          backgroundColor: bg,
          color: isLight ? "var(--ink)" : "var(--paper)",
        }}
      >
        {member.initials}
      </div>
      <div className="min-w-0">
        <h3 className="display text-xl md:text-2xl">{member.name}</h3>
        <p className="mt-1 text-sm" style={{ color: "var(--coral)" }}>
          {member.role}
        </p>
        <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
          {member.specialty}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {member.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-sm border px-2 py-0.5 font-mono text-xs text-[var(--color-teal)]"
              style={{ borderColor: "color-mix(in oklab, var(--teal) 40%, transparent)" }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */

function FaqSection({ t }: { t: T }) {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading title={t.faq.sectionTitle} />
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
