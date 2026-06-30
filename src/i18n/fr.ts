import type { Translations } from "./types";

export const fr: Translations = {
  // Header
  header: {
    logo: "Smithers",
    nav: {
      services: "Services",
      stack: "Outils",
      how: "Comment ça marche",
      faq: "FAQ",
      contact: "Contact",
    },
    cta: "Réserver un appel",
    langSwitcher: "EN / FR",
  },

  // Hero
  hero: {
    eyebrow: "Fondé à Montréal · Opérations & automatisation · Partout au Canada",
    h1Pre: "Opérations et automatisation pour les PME qui ont",
    h1Em: "dépassé le bricolage.",
    sub: "On démêle les CRM, les chiffriers et les automatisations à moitié construits sur lesquels votre équipe s'appuie — et on les remplace par des systèmes qui tournent tout seuls. En télétravail, partout au Canada.",
    ctaBook: "Réserver un appel découverte",
    ctaHow: "Voir comment on travaille",
  },

  // Logo strip
  logoStrip: {
    label: "Mandats récents",
  },

  // Problem
  problem: {
    sectionTitle: "Ça vous parle?",
    intro:
      "Les mêmes six problèmes reviennent dans presque toutes les PME qu'on rencontre. Pris séparément, aucun n'est catastrophique. Ensemble, ils vous coûtent silencieusement des semaines chaque année.",
    pains: [
      "Un CRM que personne ne met à jour",
      "14 chiffriers qui devraient être une seule base de données",
      "Des automatisations Zapier qui tiennent avec de la broche",
      "Des rapports qui prennent 3 heures et ne disent rien",
      "Un processus d'intégration qui dépend de la mémoire d'une seule personne",
      "« Il faudrait vraiment faire quelque chose avec l'IA » sur un Post-it",
    ],
  },

  // Marquee
  marquee: {
    items: [
      "Un CRM que personne ne met à jour",
      "14 chiffriers qui devraient être une seule base de données",
      "Des automatisations Zapier qui tiennent avec de la broche",
      "Des rapports qui prennent 3 heures et ne disent rien",
      "Un processus qui dépend de la mémoire d'une seule personne",
      "« Il faudrait faire quelque chose avec l'IA » sur un Post-it",
    ],
  },

  // Services
  services: {
    sectionTitle: "Comment on travaille avec vous",
    intro:
      "Trois formats d'engagement. Choisissez celui qui correspond au travail — ou commencez petit et évoluez vers le suivant.",
    priceCaption: "Tous les prix en CAD. L'appel découverte est gratuit.",
    tiers: [
      {
        name: "Demandes",
        tagline: "Des correctifs ciblés, bien délimités.",
        priceFrom: "À partir de 150 $ CAD/h · Payez seulement le temps utilisé",
        body: "Pour quand quelque chose de précis est cassé ou manquant — une automatisation coincée, un nettoyage de données, un rapport rapide. Vous soumettez la demande, on cadre serré, et on livre en heures ou en jours.",
        outcomes: [
          "Correctifs dans vos outils existants",
          "Petites automatisations",
          "Nettoyage et migrations de données",
          "Rapports ponctuels",
        ],
        typical: "Quelques heures à quelques jours",
      },
      {
        name: "Missions",
        tagline: "Des projets définis avec un résultat clair.",
        priceFrom: "5 000 $ – 50 000 $ CAD · Prix fixe, portée écrite",
        body: "Pour les travaux plus importants qui demandent de la planification, de la conception et un déploiement. Vous recevez un aperçu de Mission avant le début — vous savez exactement ce que vous payez.",
        outcomes: [
          "Reconstructions de CRM",
          "Automatisation de bout en bout",
          "Outils internes sur mesure",
          "Flux IA qui livrent vraiment",
        ],
        typical: "2 à 8 semaines",
      },
      {
        name: "Conseil & support",
        tagline: "Un deuxième avis en tout temps.",
        priceFrom: "À partir de 2 000 $ CAD/mois · Résiliable en tout temps",
        body: "Stratégie continue, résolution de problèmes et validation par Slack, courriel ou vidéo. Pour les fondateurs qui veulent un opérateur aguerri dans leur équipe sans l'embaucher.",
        outcomes: [
          "Orientation stratégique",
          "Choix d'outils et revue d'architecture",
          "Évaluation de fournisseurs et d'embauches",
          "Dépannage sur demande",
        ],
        typical: "Forfait mensuel",
      },
    ],
  },

  // Stack
  stack: {
    sectionTitle: "Les outils qu'on maîtrise",
    intro:
      "On travaille avec les plateformes sur lesquelles les PME s'appuient déjà — et on bâtit sur mesure quand les solutions clés en main ne suffisent pas.",
    footer:
      "Vous utilisez une plateforme qu'on ne liste pas? Écrivez-nous — la plupart des outils parlent les mêmes API, et on y a probablement déjà touché.",
  },

  // How it works
  how: {
    sectionTitle: "Comment ça marche",
    steps: [
      { t: "Appel d'introduction", d: "30 minutes. On écoute, vous videz votre sac." },
      {
        t: "Diagnostic",
        d: "On cartographie ce que vous avez, ce qui est cassé, et ce qui vaut la peine d'être réglé en premier.",
      },
      {
        t: "Proposition",
        d: "Un court aperçu de Mission avec la portée, le prix et l'échéancier. Aucune surprise.",
      },
      {
        t: "Livraison & transfert",
        d: "On livre, on documente, et on forme votre équipe pour que le système survive à notre départ.",
      },
    ],
  },

  // Case Studies
  caseStudies: {
    sectionTitle: "Ce qu'on a livré",
    intro:
      "Des PME partout au Canada — généralement 5 à 50 personnes, souvent dirigées par leur fondateur. Voici à quoi ressemble la livraison en pratique.",
    beforeLabel: "Avant",
    shippedLabel: "Ce qu'on a livré",
    resultLabel: "Résultat",
    toolsLabel: "Outils utilisés",
    ratingLabel: "Note de {n} sur 5",
    studies: [
      {
        client: "Bellwether Law",
        meta: "Services professionnels · 15 personnes · Mission",
        rating: 5,
        teaser: "On a arrêté de faire le travail qui n'était pas du droit.",
        headline: "8 h/sem → 45 min/sem sur les ouvertures de dossier",
        before:
          "La gestion des dossiers entrants accaparait 8 heures par semaine aux associés, et les prospects se perdaient entre Clio, les courriels et un tableur partagé.",
        shipped:
          "Un pipeline d'accueil centré sur Clio avec déclencheurs Zapier, une vérification automatisée des conflits d'intérêts, et un tableau de bord central pour le groupe d'associés.",
        metricPrimary: "−7,25 h/sem",
        metricPrimaryFrom: "8",
        metricPrimaryTo: "45 min",
        metricSecondary: "Zéro prospect perdu en 6 mois après le lancement.",
        quote:
          "On a arrêté de faire le travail qui n'était pas du droit. Le premier mois a remboursé le mandat.",
        quoteAttrib: "Daniel Reyes, associé directeur, Bellwether Law",
        tools: ["Clio", "Zapier", "Google Sheets"],
      },
      {
        client: "North & Pine Goods",
        meta: "Commerce en ligne (DTC) · 8 personnes · Mission + Conseil",
        rating: 5,
        teaser: "Les retours sont passés de trois jours à une demi-journée.",
        headline: "Retours : 3 jours → 4 h",
        before:
          "Les retours s'accumulaient dans une boîte Gmail, les remboursements se perdaient entre Shopify et QuickBooks, et les flux Klaviyo s'envoyaient avec des données périmées.",
        shipped:
          "Portail de retours personnalisé dans Retool sur Supabase, synchronisation bidirectionnelle Shopify ↔ QuickBooks, et segments Klaviyo reconstruits à partir de données clients nettoyées.",
        metricPrimary: "3 jours → 4 h",
        metricPrimaryFrom: "3 jours",
        metricPrimaryTo: "4 h",
        metricSecondary:
          "~12 000 $/mois en remboursements autrefois bloqués, maintenant traités en un jour ouvrable.",
        quote:
          "J'ai arrêté de déplacer de l'argent manuellement entre les systèmes. Ça seul valait la reconstruction.",
        quoteAttrib: "Émilie Lavoie, fondatrice, North & Pine Goods",
        tools: ["Retool", "Supabase", "Shopify", "QuickBooks", "Klaviyo"],
      },
      {
        client: "Coastline Physio",
        meta: "Santé (multi-cliniques) · 30 personnes · Mission",
        rating: 5,
        teaser: "Les rendez-vous manqués coupés de moitié; un après-midi récupéré par clinique.",
        headline: "Rendez-vous manqués : 22 % → 9 %",
        before:
          "Les rendez-vous manqués coûtaient plusieurs milliers de dollars par semaine. Le personnel de la réception passait ses matinées à téléphoner aux patients pour les rappels de rendez-vous.",
        shipped:
          "Couche de planification sur Airtable avec rappels SMS via Twilio, pré-remplissage du formulaire d'accueil à partir des visites précédentes, et tableau de bord des absences par clinique que la directrice consulte vraiment.",
        metricPrimary: "22 % → 9 %",
        metricPrimaryFrom: "22 %",
        metricPrimaryTo: "9 %",
        metricSecondary:
          "~80 000 $/an en revenus de rendez-vous récupérés dans quatre cliniques.",
        quote:
          "Les rappels se font tout seuls. Mon équipe d'accueil a récupéré un après-midi.",
        quoteAttrib: "Dre Anika Chen, directrice clinique, Coastline Physio",
        tools: ["Airtable", "Twilio", "n8n"],
      },
      {
        client: "Meridian Commercial",
        meta: "Immobilier commercial · 22 personnes · Mission + Conseil",
        rating: 5,
        teaser: "Les courtiers ont arrêté de combattre le système et l'ont adopté.",
        headline: "Délai prospect-visite : 5 jours → 36 h",
        before:
          "Les inscriptions étaient gérées dans un HubSpot déformé pour un usage non prévu, en plus de trois chiffriers autour desquels les agents se disputaient.",
        shipped:
          "HubSpot reconstruit autour du vrai flux de travail du courtage, plus un portail d'inscriptions Retool + Supabase utilisé par les agents et les clients. Rédaction assistée par IA pour les descriptions d'inscriptions.",
        metricPrimary: "5 jours → 36 h",
        metricPrimaryFrom: "5 jours",
        metricPrimaryTo: "36 h",
        metricSecondary:
          "Les agents récupèrent ~6 h/sem chacun sur la gestion des inscriptions.",
        quote:
          "Nos agents ont arrêté de se battre contre le système et ont commencé à l'utiliser. La visibilité du pipeline a triplé.",
        quoteAttrib: "James MacIntyre, associé principal, Meridian Commercial",
        tools: ["HubSpot", "Retool", "Supabase", "OpenAI"],
      },
    ],
  },

  // Team
  team: {
    sectionTitle: "L'équipe",
    intro:
      "Une petite équipe senior. Vous travaillerez directement avec les personnes qui construisent votre système — aucun transfert à un gestionnaire de compte.",
    members: [
      {
        initials: "ED",
        name: "Erico Di Teodoro",
        role: "Stratège principal",
        specialty: "Diagnostic, cadrage et responsable de chaque Mission.",
        tools: ["Stratégie", "Cadrage de mission", "Architecture"],
      },
      {
        initials: "CT",
        name: "Camille Tremblay",
        role: "Ingénieure en automatisation",
        specialty: "Bilingue FR/EN. Vit dans Zapier, Make et n8n.",
        tools: ["Zapier", "Make", "n8n", "Intégrations API"],
      },
      {
        initials: "MO",
        name: "Marcus Okafor",
        role: "Développeur full-stack",
        specialty: "Livre les outils internes et les flux IA sur mesure.",
        tools: ["Retool", "Supabase", "TypeScript", "OpenAI", "Anthropic"],
      },
      {
        initials: "PS",
        name: "Priya Shah",
        role: "Spécialiste CRM & RevOps",
        specialty: "Reconstruit des CRM que les équipes utilisent vraiment.",
        tools: ["HubSpot", "Salesforce", "Pipedrive", "Rapports"],
      },
    ],
  },

  // FAQ
  faq: {
    sectionTitle: "Questions fréquentes",
    items: [
      {
        q: "Qu'est-ce que Smithers fait concrètement?",
        a: "Smithers est une firme-conseil canadienne en opérations et automatisation pour les PME. On intervient quand la configuration de vos outils a atteint ses limites — CRM emmêlés, chiffriers envahissants, automatisations Zapier à moitié construites, rapports manuels — et on les remplace par des systèmes qui travaillent en silence. Les mandats vont du correctif ponctuel aux constructions de plusieurs semaines jusqu'à l'accompagnement continu.",
      },
      {
        q: "Où est basé Smithers et avec qui travaillez-vous?",
        a: "Smithers est basé à Montréal, au Québec, et travaille à distance avec des PME partout au Canada. Notre client type est une entreprise de 5 à 50 personnes, souvent dirigée par son fondateur, quelque part entre « on a réussi à s'en sortir » et « on ne peut pas continuer comme ça ». On travaille le plus souvent en services professionnels, commerce en ligne, santé, immobilier et métiers de la construction.",
      },
      {
        q: "En quoi Smithers est-il différent d'une firme-conseil ou d'une agence classique?",
        a: "Les firmes-conseils traditionnelles font des présentations et partent. Les agences construisent quelque chose et vous facturent indéfiniment pour le maintenir. Smithers est une petite équipe senior qui cadre des mandats serrés, livre des systèmes qui fonctionnent, les documente, et forme votre équipe pour qu'elle soit propriétaire de ce qu'on a construit. On est payés pour se rendre inutiles sur chaque projet — pas pour s'intégrer indéfiniment.",
      },
      {
        q: "Avec quels outils et plateformes travaillez-vous?",
        a: "On travaille couramment avec les plateformes sur lesquelles la plupart des PME s'appuient déjà : des CRM comme HubSpot, Salesforce et Pipedrive; des outils d'opérations et de données comme Airtable, Notion et Monday; des plateformes d'automatisation comme Zapier, Make et n8n; des bases de données et outils internes comme Supabase et Retool; et des outils de commerce et de finance comme Stripe, QuickBooks et Shopify. On construit aussi des outils internes sur mesure quand rien d'existant ne convient. Pour le travail IA, on livre des flux propulsés par les API OpenAI et Anthropic.",
      },
      {
        q: "Combien ça coûte de travailler avec Smithers?",
        a: "Les Demandes — des correctifs ponctuels et bien ciblés — sont facturées à l'heure ou en petits blocs à prix fixe. Les Missions sont des projets à prix fixe cadrés à partir d'un aperçu de Mission écrit, généralement entre 5 000 $ et 50 000 $ CAD selon la complexité. Les forfaits de conseil et support commencent à 2 000 $ CAD par mois. L'appel d'introduction est gratuit, et vous verrez toujours la portée et le prix par écrit avant que tout travail payant commence.",
      },
      {
        q: "Combien de temps dure une Mission typique?",
        a: "La plupart des Missions se déroulent sur 2 à 8 semaines du coup d'envoi à la remise. Les Missions plus courtes portent généralement sur une seule automatisation ou construction d'outil; les plus longues impliquent la reconstruction d'un CRM, l'intégration de plusieurs systèmes, ou la livraison d'un flux IA de bout en bout. On cadre chaque Mission avec un échéancier écrit avant que vous vous engagiez, pour que vous sachiez ce que vous payez et quand ça arrive.",
      },
      {
        q: "Travaillez-vous avec des entreprises hors Canada?",
        a: "Oui. Smithers est canadien et sert principalement les PME canadiennes, mais on accepte des clients américains au cas par cas quand le projet est un bon match. Tout notre travail est à distance, donc la géographie compte moins que le chevauchement de fuseaux horaires et une portée claire.",
      },
      {
        q: "Notre équipe pourra-t-elle maintenir ce que vous construisez après votre départ?",
        a: "Oui. Chaque Mission se termine par une documentation écrite et une session de formation pour les membres de votre équipe qui seront propriétaires du système. On construit pour la passation, pas pour le verrouillage — l'objectif est que votre équipe puisse étendre, déboguer et opérer ce qu'on a construit sans avoir besoin de nous rappeler.",
      },
      {
        q: "Pouvez-vous nous aider à comprendre où l'IA s'inscrit dans notre entreprise?",
        a: "Oui, mais seulement là où elle justifie son coût. On a livré des flux IA pour le triage du support client, l'extraction de documents, la qualification de prospects et la recherche interne dans les connaissances. On vous dira aussi quand l'IA est la mauvaise réponse et qu'une automatisation plus simple ou un chiffrier mieux conçu ferait le travail pour une fraction du coût.",
      },
      {
        q: "Comment on commence?",
        a: "Réservez un appel découverte gratuit de 30 minutes. On écoutera ce qui est cassé, on posera quelques questions, et on vous dira honnêtement si Smithers est la bonne équipe pour le réparer — et si ce n'est pas nous, vers qui vous tourner. Écrivez-nous à e@smithers.app ou appelez le 514-806-0510 pour le planifier.",
      },
    ],
  },

  // Contact
  contact: {
    eyebrow: "Parlons-en",
    h2Pre: "Voyons si on est",
    h2Em: "faits pour travailler ensemble.",
    body: "Trente minutes, pas de présentation, pas de pitch. Dites-nous ce qui est cassé et on vous dira honnêtement si Smithers est la bonne équipe pour le réparer — et si ce n'est pas nous, on vous indiquera où chercher.",
    contactLabel: "Votre point de contact",
    contactName: "Erico Di Teodoro",
    contactRole: "Stratège principal",
    emailLabel: "Courriel",
    phoneLabel: "Téléphone",
    cta: "Réserver un appel découverte",
  },

  // Footer
  footer: {
    copy: "© Smithers. Fondé à Montréal, au service du Canada.",
    nav: {
      services: "Services",
      how: "Comment ça marche",
      faq: "FAQ",
      contact: "Contact",
    },
  },
};
