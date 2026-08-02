export const projects = [
  // ⭐ Projets épinglés en tête — l'ordre est donné par `pin` (1 = premier).
  {
    title: "La Carte",
    category: "web",
    year: 2026,
    pin: 1,
    private: false,
    link: "https://cm-lacarte.com",
    client: "La Carte",
    description: { fr: "Plateforme de commande & menu digital (QR code) avec paiement en ligne intégré et notifications via l'API WhatsApp / Meta.", en: "Digital ordering & menu platform (QR code) with integrated online payment and notifications through the WhatsApp / Meta API." },
    tech: ["Next.js", "ASP.NET Core", "C#", "SQL Server", "Cloudflare", "API Paiement", "WhatsApp / Meta API"]
  },
  {
    title: "Mapanes",
    category: "web",
    year: 2026,
    pin: 2,
    private: false,
    link: "https://mapanes-cm.com",
    client: "Mapanes",
    description: { fr: "Plateforme web moderne et responsive pour Mapanes, déployée derrière Cloudflare.", en: "Modern, responsive web platform for Mapanes, deployed behind Cloudflare." },
    tech: ["Next.js", "React", "Laravel", "MySQL", "Cloudflare"]
  },
  {
    title: "Complexe Gueb's",
    category: "web",
    year: 2023,
    pin: 3,
    private: false,
    link: "https://complexe-guebs.com",
    featured: true,
    client: "Hôtellerie",
    description: { fr: "Site du complexe (hôtel, appartements, salles de fêtes, restaurant) avec visite virtuelle 360° immersive.", en: "Website for the complex (hotel, apartments, event halls, restaurant) with an immersive 360° virtual tour." },
    tech: ["Next.js", "Three.js", "WebGL", "Lapentor", "Laravel"]
  },
  {
    title: "The Gas Master",
    category: "web",
    year: 2026,
    pin: 4,
    private: false,
    link: "https://thegasmaster-plumber.com",
    client: "The Gas Master — Plomberie",
    description: { fr: "Site web de l'entreprise The Gas Master — plomberie, gaz et installations sanitaires, optimisé SEO.", en: "Website for The Gas Master — plumbing, gas and sanitary installations, SEO-optimised." },
    tech: ["Next.js", "React", "Laravel", "MySQL", "Cloudflare"]
  },
  {
    title: "Visite virtuelle 360°",
    category: "web",
    year: 2026,
    private: false,
    link: "https://app.lapentor.com/sphere/my-world-thuran-junior",
    client: "Expérience immersive · Portfolio",
    description: { fr: "Visite virtuelle 360° immersive et interactive, navigable au navigateur ou au casque VR.", en: "Immersive, interactive 360° virtual tour, navigable in the browser or a VR headset." },
    tech: ["Lapentor", "WebXR", "Three.js", "360°"]
  },
  {
    title: "Move to Cloud Applicatifs",
    category: "app",
    year: 2024,
    private: true,
    link: "",
    client: "AGL (ex-Bolloré / MSC)",
    description: { fr: "Refonte des applications logistiques aux standards cloud & sécurité du groupe MSC.", en: "Rebuild of logistics apps to MSC group's cloud & security standards." },
    tech: ["C#", "ASP.NET Core", "Next.js", "Azure DevOps", "SQL Server", "Power Platform", "Talend", "IBM System i"]
  },
  {
    title: "SNIGS Education",
    category: "app",
    year: 2023,
    private: true,
    link: "",
    client: "EMENEC",
    description: { fr: "ERP de gestion d'établissement scolaire avec paiement dématérialisé des frais de scolarité.", en: "School management ERP with cashless tuition payments." },
    tech: ["Laravel", "React", "PostgreSQL", "Docker", "API Paiement"]
  },
  {
    title: "Indic 1.0",
    category: "app",
    year: 2022,
    private: true,
    link: "",
    client: "ZENN AKUMA Consulting",
    description: { fr: "Surveillance des risques et alertes (indicateurs prudentiels) dans le secteur bancaire.", en: "Risk and alert monitoring (prudential indicators) for the banking sector." },
    tech: ["Laravel", "React", "MySQL", "Docker", "REST API"]
  },
  {
    title: "Portefeuille numérique & crypto",
    category: "app",
    year: 2023,
    private: true,
    link: "",
    client: "Privé",
    description: { fr: "Application Android / iOS de mobile money, vente et échange de crypto-monnaie.", en: "Android / iOS app for mobile money and crypto trading." },
    tech: ["Flutter", "Dart", "Firebase", "API Paiement", "Crypto API"]
  },
  {
    title: "Tracking conteneurs & actualité portuaire",
    category: "app",
    year: 2022,
    private: true,
    link: "",
    client: "Privé",
    description: { fr: "Application Android / iOS de suivi de conteneurs et de l'actualité portuaire.", en: "Android / iOS app for container tracking and port news." },
    tech: ["Flutter", "Dart", "Google Maps API", "REST API"]
  },
  {
    title: "Gestion stock, ventes & personnel",
    category: "app",
    year: 2021,
    private: true,
    link: "",
    client: "Privé",
    description: { fr: "Gestion de stock, impôts, ventes, ravitaillement et gestion du personnel.", en: "Inventory, tax, sales, restocking and staff management." },
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "REST API"]
  },
  {
    title: "Suivi clientèle & procédures",
    category: "app",
    year: 2021,
    private: true,
    link: "",
    client: "Privé",
    description: { fr: "Suivi de la clientèle et monitoring des procédures engagées par les clients de l'agence.", en: "Client tracking and monitoring of agency procedures." },
    tech: ["React", "Laravel", "PostgreSQL", "REST API"]
  },
  {
    title: "GoodShepherd",
    category: "web",
    year: 2024,
    private: false,
    link: "https://my-goodshepherd.org",
    client: "Orphelinat",
    description: { fr: "Site vitrine pour l'orphelinat GoodShepherd.", en: "Showcase website for the GoodShepherd orphanage." },
    tech: ["WordPress", "PHP", "SEO"]
  },
  {
    title: "Xtralog",
    category: "web",
    year: 2019,
    private: false,
    link: "https://xtralog-log.com",
    client: "Salon logistique",
    description: { fr: "Site du salon national de la logistique et du transport au Cameroun.", en: "Website for Cameroon's national logistics & transport fair." },
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"]
  },
  {
    title: "Trendhers",
    category: "web",
    year: 2020,
    private: false,
    link: "https://threndhers.com",
    client: "Projet personnel · CMS",
    description: { fr: "CMS sur-mesure conçu, développé et déployé de A à Z.", en: "Custom CMS designed, built and deployed end to end." },
    tech: ["Laravel", "PHP", "MySQL", "CMS sur-mesure"]
  },
  {
    title: "Nguess Consulting",
    category: "web",
    year: 2022,
    private: false,
    link: "https://nguess-consulting.com",
    client: "Facilitation de visas",
    description: { fr: "Site pour l'agence de facilitation de visas Nguess Consulting.", en: "Website for the Nguess Consulting visa agency." },
    tech: ["WordPress", "PHP", "SEO"]
  },
  {
    title: "Mairie d'Ebone",
    category: "web",
    year: 2022,
    private: false,
    link: "https://mairie-ebone.com",
    client: "Collectivité",
    description: { fr: "Site institutionnel de la Mairie d'Ebone.", en: "Institutional website for the Ebone city hall." },
    tech: ["WordPress", "PHP", "SEO"]
  },
  {
    title: "Chikafritude",
    category: "web",
    year: 2021,
    private: false,
    link: "https://chikafritudes.com",
    client: "Marque food",
    description: { fr: "Site web pour la marque Chikafritude.", en: "Website for the Chikafritude brand." },
    tech: ["WordPress", "PHP", "SEO"]
  },
  {
    title: "Congélo de Mémé",
    category: "web",
    year: 2021,
    private: false,
    link: "",
    client: "Commerce",
    description: { fr: "Site web pour Congélo de Mémé.", en: "Website for Congélo de Mémé." },
    tech: ["WordPress", "PHP"]
  }
];
