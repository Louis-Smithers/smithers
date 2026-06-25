import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useEffect, useRef, useState } from "react";

/* If you edit a Q&A here, also update the FAQPage JSON-LD block in
 * index.html so the structured data matches what's on the page. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What does Smithers actually do?",
    a: "Smithers is a Canadian operations and automation consultancy for small businesses. We come in when your tools have outgrown the way you set them up — tangled CRMs, sprawling spreadsheets, half-built Zapier flows, manual reports — and we replace them with systems that quietly do the work. Engagements range from one-off fixes to multi-week builds to ongoing advisory.",
  },
  {
    q: "Where is Smithers based and who do you work with?",
    a: "Smithers is based in Montreal, Quebec, and works remotely with small businesses across Canada. Our typical client is a 5 to 50 person company, often founder-led, somewhere between 'we made it work' and 'we can't keep doing it this way.' We work most often in professional services, e-commerce, healthcare, real estate, and trades.",
  },
  {
    q: "How is Smithers different from a regular consulting firm or agency?",
    a: "Traditional consulting firms write slide decks and leave. Agencies build something and bill you forever to maintain it. Smithers is a small senior team that scopes tight engagements, ships working systems, documents them, and trains your team to own what we build. We're paid to make ourselves unnecessary on each project — not to embed indefinitely.",
  },
  {
    q: "What tools and platforms do you work with?",
    a: "We work fluently with the platforms most small businesses already rely on: CRMs like HubSpot, Salesforce, and Pipedrive; data and ops tools like Airtable, Notion, and Monday; automation platforms like Zapier, Make, and n8n; databases and internal tooling like Supabase and Retool; and commerce and finance tools like Stripe, QuickBooks, and Shopify. We also build custom internal tools when off-the-shelf doesn't fit. For AI work, we ship LLM-powered workflows using the OpenAI and Anthropic APIs.",
  },
  {
    q: "How much does it cost to work with Smithers?",
    a: "Requests — small, scoped fixes — are billed hourly or in small fixed-price blocks. Missions are fixed-price projects scoped from a written Mission Overview, typically ranging from $5,000 to $50,000 CAD depending on complexity. Advisory and support retainers start at $2,000 CAD per month. The intro call is free, and you'll always see scope and price in writing before any paid work starts.",
  },
  {
    q: "How long does a typical Mission take?",
    a: "Most Missions run between 2 and 8 weeks from kickoff to handoff. Shorter Missions are usually a single automation or tool build; longer ones involve rebuilding a CRM, stitching together multiple systems, or shipping an AI workflow end-to-end. We scope every Mission with a written timeline before you commit, so you know what you're paying for and when it lands.",
  },
  {
    q: "Do you work with companies outside Canada?",
    a: "Yes. Smithers is Canadian and serves Canadian small businesses primarily, but we take on US clients case by case when the project is a good fit. All of our work is remote, so geography matters less than time zone overlap and a clear scope.",
  },
  {
    q: "Will my team be able to maintain what you build after you're gone?",
    a: "Yes. Every Mission ends with written documentation and a training session for the people on your team who will own the system. We build for handoff, not lock-in — the goal is that your team can extend, debug, and operate what we built without needing to call us back.",
  },
  {
    q: "Can you help us figure out where AI fits in our business?",
    a: "Yes, but only where it earns its keep. We've shipped AI workflows for customer support triage, document extraction, lead qualification, and internal knowledge search. We'll also tell you when AI is the wrong answer and a simpler automation or a better-designed spreadsheet would do the job for a fraction of the cost.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call. We'll listen to what's broken, ask a few questions, and tell you honestly whether Smithers is the right fit. If it is, we move to a short diagnosis and a written proposal. If it isn't, we'll point you somewhere better. Email e@smithers.app or call 514-806-0510 to set it up.",
  },
];

const PAINS = [
  "A CRM nobody updates",
  "14 spreadsheets that should be one database",
  "Zapier flows held together by hope",
  "Reports that take 3 hours and tell you nothing",
  "Onboarding that depends on one person's memory",
  "“We should really do something with AI” sitting on a Post-it",
];

const MARQUEE_ITEMS = [
  "A CRM nobody updates",
  "14 spreadsheets that should be one database",
  "Zapier flows held together by hope",
  "Reports that take 3 hours and tell you nothing",
  "Onboarding that depends on one person's memory",
  "“We should really do something with AI” on a Post-it",
];

export default function App() {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <Hero />
          <Marquee />
          <Problem />
          <Services />
          <Stack />
          <HowItWorks />
          <WhoWeWorkWith />
          <FaqSection />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */

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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

const TOTAL_SECTIONS = "07";

function SectionHeading({ n, title }: { n: string; title: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal flex items-baseline gap-5 pb-12 md:gap-6">
      <span className="label-mono shrink-0">{n} / {TOTAL_SECTIONS}</span>
      <h2 className="display text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

/* ---------- header ---------- */

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
          <a href="#services" className="underline-grow text-foreground/70 hover:text-foreground">Services</a>
          <a href="#stack" className="underline-grow text-foreground/70 hover:text-foreground">Stack</a>
          <a href="#how" className="underline-grow text-foreground/70 hover:text-foreground">How it works</a>
          <a href="#faq" className="underline-grow text-foreground/70 hover:text-foreground">FAQ</a>
          <a href="#contact" className="underline-grow text-foreground/70 hover:text-foreground">Contact</a>
        </nav>
        <a
          href="mailto:e@smithers.app?subject=Discovery%20call"
          className="hidden min-h-11 items-center justify-center bg-coral px-5 text-sm font-medium text-ink transition-opacity hover:opacity-90 sm:inline-flex"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <section id="top" className="relative">
      <div className="mx-auto grid min-h-[88dvh] max-w-[1400px] grid-cols-12 gap-x-6 px-6 pb-20 pt-20 md:px-12 md:pt-28">
        <p className="label-mono col-span-12 mt-2">
          Est. Montreal · Operations &amp; Automation · Canada-wide
        </p>

        <h1
          ref={ref}
          className="reveal display col-span-12 mt-10 md:mt-16"
          style={{ fontSize: "clamp(2.75rem, 8.5vw, 7.5rem)" }}
        >
          Operations and automation for small businesses that have{" "}
          <em className="display-italic text-coral">outgrown duct tape.</em>
        </h1>

        <div className="col-span-12 mt-auto pt-16 md:col-span-8 md:col-start-1 md:pt-24">
          <p className="text-lg leading-relaxed text-foreground/70 md:text-xl">
            We untangle the CRMs, spreadsheets, and half-built Zapier flows your team relies on — and replace them with systems that quietly work. Remote-first, across Canada.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="mailto:e@smithers.app?subject=Discovery%20call"
              className="inline-flex min-h-11 items-center justify-center bg-coral px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Book a discovery call
            </a>
            <a href="#how" className="underline-grow inline-flex min-h-11 items-center text-sm font-medium">
              See how we work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- marquee ---------- */

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
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
              <span aria-hidden className="text-2xl opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- problem ---------- */

function Problem() {
  return (
    <section>
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="01" title="Sound familiar?" />
        <p className="max-w-2xl text-lg text-foreground/65">
          The same six problems show up in nearly every small business we meet. None of them are catastrophic on their own. Together, they quietly cost you weeks every year.
        </p>

        <ul className="mt-16">
          {PAINS.map((p, i) => (
            <PainRow key={i} index={i} text={p} last={i === PAINS.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PainRow({ index, text, last }: { index: number; text: string; last: boolean }) {
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

/* ---------- services ---------- */

type Tier = {
  name: string;
  tagline: string;
  body: string;
  outcomes: string[];
  typical: string;
};

const TIERS: Tier[] = [
  {
    name: "Requests",
    tagline: "Small, well-scoped fixes.",
    body: "For when something specific is broken or missing — a stuck automation, a data cleanup, a quick report. You send the request, we scope it tight, and we ship within hours or days.",
    outcomes: ["Bug fixes in your existing tools", "Small automations", "Data cleanup and migrations", "Ad-hoc reports"],
    typical: "Hours to a few days",
  },
  {
    name: "Missions",
    tagline: "Defined projects with a clear outcome.",
    body: "Bigger work that needs scoping, design, and rollout. You get a Mission Overview before we start so you know exactly what you're paying for.",
    outcomes: ["CRM rebuilds", "End-to-end automation", "Custom internal tools", "AI workflows that actually ship"],
    typical: "2–8 weeks",
  },
  {
    name: "Advisory & Support",
    tagline: "A second opinion on speed dial.",
    body: "Ongoing strategy, troubleshooting, and sanity checks over Slack, email, or video. For founders who want a sharp operator in their corner without hiring one.",
    outcomes: ["Strategic guidance", "Tool selection and architecture review", "Vendor and hire vetting", "On-call troubleshooting"],
    typical: "Monthly retainer",
  },
];

function Services() {
  const ordered: Tier[] = [
    TIERS.find((t) => t.name === "Requests")!,
    TIERS.find((t) => t.name === "Missions")!,
    TIERS.find((t) => t.name === "Advisory & Support")!,
  ];
  return (
    <section id="services" className="scroll-mt-20 border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="02" title="How we work with you" />
        <p className="max-w-2xl text-lg text-foreground/65">
          Three engagement shapes. Pick the one that fits the work — or start small and grow into the next.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {ordered.map((tier) => (
            <ServiceCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ tier }: { tier: Tier }) {
  return (
    <article className="group relative flex flex-col bg-background p-8 transition-colors duration-200 hover:bg-card md:p-10">
      <h3 className="display text-3xl md:text-4xl">
        <span className="relative inline-block">
          {tier.name}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-coral transition-transform duration-200 ease-out group-hover:scale-x-100" />
        </span>
      </h3>
      <p className="mt-3 text-sm text-coral">{tier.tagline}</p>
      <p className="mt-6 text-base text-foreground/75">{tier.body}</p>
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

/* ---------- stack ---------- */

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
  const [src, setSrc] = useState(`https://cdn.simpleicons.org/${slug}/${color}`);
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

function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="03" title="The stack we know" />
        <p className="max-w-2xl text-lg text-foreground/65">
          We work fluently with the platforms small businesses already rely on — and we build custom when off-the-shelf doesn&apos;t fit.
        </p>

        <ul className="mt-16">
          {TOOL_GROUPS.map((g, i) => (
            <ToolRow key={g.label} group={g} last={i === TOOL_GROUPS.length - 1} />
          ))}
        </ul>

        <p className="mt-14 max-w-2xl text-sm text-foreground/55">
          Already on a stack we don&apos;t list? Send it over — most platforms speak the same APIs, and we&apos;ve probably touched it.
        </p>
      </div>
    </section>
  );
}

function ToolRow({ group, last }: { group: ToolGroup; last: boolean }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`reveal grid grid-cols-12 items-center gap-x-6 gap-y-8 border-t border-border py-10 md:py-12 ${
        last ? "border-b" : ""
      }`}
    >
      <div className="col-span-12 md:col-span-4">
        <h3 className="display text-2xl md:text-3xl">{group.label}</h3>
        <p className="mt-2 text-sm text-foreground/55">{group.body}</p>
      </div>
      <ul
        aria-label={`${group.label} tools`}
        className="col-span-12 flex flex-wrap items-start gap-x-10 gap-y-7 md:col-span-8 md:gap-x-12"
      >
        {group.tools.map((t) => (
          <li key={t.slug} className="group/tool min-w-[3.5rem]">
            <ToolMark {...t} />
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ---------- how it works ---------- */

const STEPS = [
  { t: "Intro call", d: "30 minutes. We listen, you vent." },
  { t: "Diagnosis", d: "We map what you have, what's broken, and what's worth fixing first." },
  { t: "Proposal", d: "A short Mission Overview with scope, price, and timeline. No surprises." },
  { t: "Build & handoff", d: "We ship, document, and train your team so the system survives us leaving." },
];

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="04" title="How it works" />
        <ol className="mt-8 grid grid-cols-12 gap-x-6">
          {STEPS.map((s, i) => (
            <Step key={s.t} index={i} step={s} last={i === STEPS.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ index, step, last }: { index: number; step: { t: string; d: string }; last: boolean }) {
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

/* ---------- who we work with ---------- */

function WhoWeWorkWith() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-36">
        <p className="label-mono mb-6">05 / {TOTAL_SECTIONS} · Who we work with</p>
        <div ref={ref} className="reveal grid grid-cols-12 gap-x-6">
          <p
            className="display-italic col-span-12 md:col-span-11"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.2 }}
          >
            Small businesses across Canada — typically{" "}
            <span className="not-italic text-coral">5 to 50 people</span>, often founder-led, usually somewhere between{" "}
            <span className="not-italic">“we made it work”</span> and{" "}
            <span className="not-italic">“we can't keep doing it this way.”</span>
          </p>
          <p className="col-span-12 mt-10 max-w-2xl text-base text-foreground/65 md:col-span-8 md:col-start-1">
            Industries we know well: professional services, e-commerce, healthcare, real estate, and trades.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionHeading n="06" title="Frequently asked" />
        <div className="grid grid-cols-12 gap-x-6">
          <AccordionPrimitive.Root type="single" collapsible className="col-span-12 md:col-span-10">
            {FAQ.map((item, i) => (
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

/* ---------- contact ---------- */

function Contact() {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-36">
        <p className="label-mono mb-8">07 / {TOTAL_SECTIONS} · Let&apos;s talk</p>

        <h2
          ref={ref}
          className="reveal display"
          style={{ fontSize: "clamp(2.5rem, 7.5vw, 6rem)" }}
        >
          Let&apos;s see if we&apos;re{" "}
          <em className="display-italic text-coral">a fit.</em>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
          <p className="col-span-12 text-lg leading-relaxed text-foreground/75 md:col-span-7 md:text-xl">
            Thirty minutes, no slides, no pitch. Tell us what&apos;s broken and we&apos;ll tell you, honestly, whether Smithers is the right team to fix it — and if we&apos;re not, where to look instead.
          </p>

          <div className="col-span-12 border-l border-coral pl-6 md:col-span-5 md:col-start-8">
            <p className="label-mono">Your point of contact</p>
            <p className="display mt-4 text-3xl">Erico Di Teodoro</p>
            <p className="mt-1 text-sm text-foreground/60">Lead Strategist</p>
            <dl className="mt-6 space-y-2 text-base">
              <div className="flex gap-3">
                <dt className="w-14 text-foreground/55">Email</dt>
                <dd>
                  <a className="underline-grow" href="mailto:e@smithers.app">e@smithers.app</a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-14 text-foreground/55">Phone</dt>
                <dd>
                  <a className="underline-grow" href="tel:+15148060510">514-806-0510</a>
                </dd>
              </div>
            </dl>
            <a
              href="mailto:e@smithers.app?subject=Discovery%20call"
              className="mt-8 inline-flex min-h-11 items-center justify-center bg-coral px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Book a discovery call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function SiteFooter() {
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
          <p>© Smithers. Built in Montreal, working across Canada.</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6">
              <li><a href="#services" className="underline-grow hover:text-foreground">Services</a></li>
              <li><a href="#how" className="underline-grow hover:text-foreground">How it works</a></li>
              <li><a href="#faq" className="underline-grow hover:text-foreground">FAQ</a></li>
              <li><a href="#contact" className="underline-grow hover:text-foreground">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
