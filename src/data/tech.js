// Technologies affichées dans la sphère 3D en orbite.
// `key: true` = techno mise en avant (nœud plus gros).
// Modifiez / ajoutez / retirez librement — la sphère se met à jour automatiquement.
export const tech = [
  // Front-end
  { name: "React", key: true, cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Interfaces web dynamiques, PWA et sites performants.", en: "Dynamic web UIs, PWAs and fast websites." } },
  { name: "Next.js", key: true, cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Apps web SSR/SSG, PWA et App Router — performance et SEO.", en: "SSR/SSG web apps, PWAs and App Router — speed and SEO." } },
  { name: "JavaScript", key: true, cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Le langage du web — interactivité, DOM et logique côté client.", en: "The language of the web — interactivity, DOM and client logic." } },
  { name: "TypeScript", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Typage robuste des applications front et back.", en: "Robust typing across front and back ends." } },
  { name: "Angular", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Applications web structurées à grande échelle.", en: "Structured large-scale web applications." } },
  { name: "Bootstrap", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Prototypage rapide et interfaces responsives.", en: "Rapid prototyping and responsive layouts." } },
  { name: "Materialize", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Framework UI Material Design pour interfaces web soignées.", en: "Material Design UI framework for polished web interfaces." } },

  // Back-end
  { name: "ASP.NET Core", key: true, cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "APIs et back-ends d'entreprise en C#, robustes et sécurisés.", en: "Robust, secure enterprise APIs and back-ends in C#." } },
  { name: "C#", key: true, cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Langage principal côté entreprise — APIs, services, MAUI.", en: "Primary enterprise language — APIs, services, MAUI." } },
  { name: "Laravel", key: true, cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "APIs et plateformes web PHP élégantes (MVC).", en: "Elegant PHP APIs and web platforms (MVC)." } },
  { name: "Symfony", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Applications PHP modulaires et maintenables.", en: "Modular, maintainable PHP applications." } },
  { name: "PHP", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Développement web serveur et APIs.", en: "Server-side web development and APIs." } },
  { name: "Spring Boot", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Microservices et APIs Java d'entreprise.", en: "Enterprise Java microservices and APIs." } },
  { name: "Node.js", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "APIs JavaScript rapides et temps réel.", en: "Fast, real-time JavaScript APIs." } },
  { name: "Python", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Scripting, data et prototypage d'IA.", en: "Scripting, data and AI prototyping." } },
  { name: "C / C++", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Programmation système et algorithmique bas niveau.", en: "Systems programming and low-level algorithms." } },

  // Mobile
  { name: "Flutter", key: true, cat: { fr: "Mobile", en: "Mobile" }, usage: { fr: "Applications Android & iOS multiplateformes.", en: "Cross-platform Android & iOS apps." } },
  { name: ".NET MAUI", cat: { fr: "Mobile", en: "Mobile" }, usage: { fr: "Apps desktop et mobile .NET multiplateformes.", en: "Cross-platform .NET desktop and mobile apps." } },

  // Cloud & DevOps
  { name: "Azure", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Hébergement, App Services et infrastructure cloud scalable.", en: "Hosting, App Services and scalable cloud infrastructure." } },
  { name: "Azure AI", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Agents IA et services cognitifs intégrés aux produits.", en: "AI agents and cognitive services embedded in products." } },
  { name: "Azure DevOps", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "CI/CD, pipelines et suivi Agile des projets.", en: "CI/CD, pipelines and Agile project tracking." } },
  { name: "Docker", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Conteneurisation et environnements reproductibles.", en: "Containerisation and reproducible environments." } },
  { name: "Power Platform", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Apps métiers low-code (Model-Driven & Canvas) + Power Automate.", en: "Low-code business apps (Model-Driven & Canvas) + Power Automate." } },
  { name: "Git", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Versioning et collaboration (GitHub / GitLab).", en: "Versioning and collaboration (GitHub / GitLab)." } },
  { name: "IIS", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Hébergement et déploiement d'applications .NET sur Windows Server.", en: "Hosting and deploying .NET apps on Windows Server." } },
  { name: "Vercel", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Déploiement continu d'applications front-end et Next.js.", en: "Continuous deployment of front-end and Next.js apps." } },
  { name: "Linux", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Serveurs, conteneurs et environnements de production.", en: "Servers, containers and production environments." } },
  { name: "SharePoint", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Portails collaboratifs et gestion documentaire Microsoft 365.", en: "Collaborative portals and Microsoft 365 document management." } },
  { name: "Prompt Engineering", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Conception de prompts et d'agents pour les modèles d'IA.", en: "Designing prompts and agents for AI models." } },
  { name: "Cloudflare", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "DNS, CDN, sécurité et performance des applications web.", en: "DNS, CDN, security and performance for web apps." } },
  { name: "WhatsApp / Meta API", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Intégration WhatsApp Business & Meta (messages, notifications, paiement).", en: "WhatsApp Business & Meta integration (messaging, notifications, payment)." } },
  { name: "API Paiement", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Intégration de paiements en ligne : Mobile Money, cartes, agrégateurs.", en: "Online payment integration: Mobile Money, cards, aggregators." } },

  // Données
  { name: "SQL Server", cat: { fr: "Données", en: "Data" }, usage: { fr: "Modélisation et optimisation de bases relationnelles.", en: "Relational data modelling and optimisation." } },
  { name: "PostgreSQL", cat: { fr: "Données", en: "Data" }, usage: { fr: "Bases relationnelles performantes et fiables.", en: "Fast, reliable relational databases." } },
  { name: "MySQL", cat: { fr: "Données", en: "Data" }, usage: { fr: "Bases de données web robustes et éprouvées.", en: "Robust, battle-tested web databases." } },
  { name: "Firebase", cat: { fr: "Données", en: "Data" }, usage: { fr: "Auth, temps réel et backend-as-a-service mobile.", en: "Auth, realtime and mobile backend-as-a-service." } },
  { name: "Talend", cat: { fr: "Données", en: "Data" }, usage: { fr: "Intégration et ETL de données (jobs).", en: "Data integration and ETL (jobs)." } },
  { name: "SQLite", cat: { fr: "Données", en: "Data" }, usage: { fr: "Base de données embarquée pour apps mobiles et desktop.", en: "Embedded database for mobile and desktop apps." } },
  { name: "Dataverse", cat: { fr: "Données", en: "Data" }, usage: { fr: "Stockage de données de la Power Platform (Microsoft).", en: "Power Platform data storage (Microsoft)." } },
  { name: "IBM System i (AS400)", cat: { fr: "Données", en: "Data" }, usage: { fr: "Systèmes IBM i / AS400 (iSeries) — intégration et modernisation d'applications héritées.", en: "IBM i / AS400 (iSeries) systems — legacy application integration and modernisation." } },

  // 3D & Immersif
  { name: "Three.js", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Expériences 3D et temps réel dans le navigateur.", en: "Real-time 3D experiences in the browser." } },
  { name: "WebGL", cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Rendu graphique GPU haute performance sur le web.", en: "High-performance GPU rendering on the web." } },
  { name: "VR", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Visites virtuelles immersives au casque ou au navigateur (WebXR).", en: "Immersive VR tours in headset or browser (WebXR)." } },
  { name: "AR", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Réalité augmentée web sans installation d'application.", en: "Web augmented reality with no app to install." } },
  { name: "AR.js", cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Réalité augmentée web légère (marqueurs & localisation) pour des expériences AR dans le navigateur.", en: "Lightweight web AR (markers & location) for browser-based AR experiences." } },
  { name: "Lapentor", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Création de visites virtuelles 360° immersives et interactives.", en: "Building immersive, interactive 360° virtual tours." } }
];
