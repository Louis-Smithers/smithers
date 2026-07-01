import { createFileRoute } from "@tanstack/react-router";
import { SmithersLanding } from "./index";
import { fr } from "../i18n/fr";
import type { FaqItemCopy } from "../i18n/types";

const SITE_URL = "https://smithers.app";
const OG_IMAGE = `${SITE_URL}/og.png`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Smithers",
  url: SITE_URL,
  logo: `${SITE_URL}/og.png`,
  description:
    "Smithers est une firme-conseil canadienne en opérations et automatisation qui aide les PME à corriger les CRM, tableaux, automatisations et flux IA qu'elles ont dépassés.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  areaServed: "CA",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-514-806-0510",
      email: "e@smithers.app",
      contactType: "service client",
      areaServed: "CA",
      availableLanguage: ["English", "French"],
    },
  ],
  sameAs: [],
};

const faqJsonLdFr = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: fr.faq.items.map(({ q, a }: FaqItemCopy) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const TITLE_FR =
  "Smithers : Conseil en opérations et automatisation pour les PME canadiennes";
const DESCRIPTION_FR =
  "Smithers aide les PME canadiennes à corriger les systèmes qu'elles ont dépassés : CRM, tableaux, automatisations et flux IA qui livrent vraiment. En télétravail partout au Canada.";

export const Route = createFileRoute("/fr")({
  head: () => ({
    meta: [
      { title: TITLE_FR },
      { name: "description", content: DESCRIPTION_FR },
      { name: "theme-color", content: "#0F1014" },
      { property: "og:title", content: TITLE_FR },
      { property: "og:description", content: DESCRIPTION_FR },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/fr` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:locale", content: "fr_CA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE_FR },
      { name: "twitter:description", content: DESCRIPTION_FR },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/fr` },
      { rel: "alternate", hrefLang: "en", href: SITE_URL + "/" },
      { rel: "alternate", hrefLang: "fr", href: SITE_URL + "/fr" },
      { rel: "alternate", hrefLang: "x-default", href: SITE_URL + "/" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLdFr) },
    ],
  }),
  component: FrPage,
});

function FrPage() {
  return <SmithersLanding locale="fr" />;
}
