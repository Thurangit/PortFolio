// Technologies affichées dans la sphère 3D en orbite.
// `key: true` = techno mise en avant (nœud plus gros).
// Les descriptions (`usage`) disent ce que JE FAIS avec la techno (1re personne).
// Modifiez / ajoutez / retirez librement — la sphère se met à jour automatiquement.
export const tech = [
  // Front-end
  { name: "React", key: true, cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Je conçois des interfaces web dynamiques, réactives et performantes.", en: "I build dynamic, responsive and high-performance web interfaces." } },
  { name: "Next.js", key: true, cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Je développe des applications web SSR/SSG optimisées pour la vitesse et le SEO.", en: "I build SSR/SSG web apps optimised for speed and SEO." } },
  { name: "JavaScript", key: true, cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Je rends mes interfaces interactives et je pilote toute la logique côté client.", en: "I make my interfaces interactive and drive all the client-side logic." } },
  { name: "TypeScript", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Je fiabilise mes applications avec un typage strict, du front au back.", en: "I harden my applications with strict typing, from front to back." } },
  { name: "Angular", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Je structure des applications web d'entreprise à grande échelle.", en: "I structure large-scale enterprise web applications." } },
  { name: "Bootstrap", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Je prototype rapidement et je livre des interfaces responsives.", en: "I prototype quickly and ship responsive interfaces." } },
  { name: "Materialize", cat: { fr: "Front-end", en: "Front-end" }, usage: { fr: "Je crée des interfaces web soignées basées sur Material Design.", en: "I craft polished web interfaces based on Material Design." } },

  // Back-end
  { name: "ASP.NET Core", key: true, cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je développe des APIs et back-ends d'entreprise robustes et sécurisés en C#.", en: "I build robust, secure enterprise APIs and back-ends in C#." } },
  { name: "C#", key: true, cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je bâtis mes services, APIs et applications d'entreprise avec C#.", en: "I build my services, APIs and enterprise applications with C#." } },
  { name: "Laravel", key: true, cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je conçois des APIs et des plateformes web élégantes et maintenables.", en: "I build elegant, maintainable web APIs and platforms." } },
  { name: "Symfony", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je développe des applications PHP modulaires et évolutives.", en: "I build modular, scalable PHP applications." } },
  { name: "PHP", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je développe des sites, des APIs et des back-ends web sur mesure.", en: "I build custom websites, APIs and web back-ends." } },
  { name: "Spring Boot", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je conçois des microservices et des APIs Java d'entreprise.", en: "I build enterprise Java microservices and APIs." } },
  { name: "Node.js", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je construis des APIs rapides et des services en temps réel.", en: "I build fast APIs and real-time services." } },
  { name: "Python", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "J'automatise, je traite la donnée et je prototype des solutions d'IA.", en: "I automate, process data and prototype AI solutions." } },
  { name: "C / C++", cat: { fr: "Back-end", en: "Back-end" }, usage: { fr: "Je développe des logiques bas niveau et de l'algorithmique performante.", en: "I write low-level logic and performant algorithms." } },

  // Mobile
  { name: "Flutter", key: true, cat: { fr: "Mobile", en: "Mobile" }, usage: { fr: "Je développe des applications Android & iOS multiplateformes.", en: "I build cross-platform Android & iOS apps." } },
  { name: ".NET MAUI", cat: { fr: "Mobile", en: "Mobile" }, usage: { fr: "Je crée des applications desktop et mobiles .NET multiplateformes.", en: "I build cross-platform .NET desktop and mobile apps." } },

  // Cloud & DevOps
  { name: "Azure", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "J'héberge et j'architecture des infrastructures cloud scalables.", en: "I host and architect scalable cloud infrastructure." } },
  { name: "Azure AI", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "J'intègre des agents IA et des services cognitifs dans mes produits.", en: "I embed AI agents and cognitive services into my products." } },
  { name: "Azure DevOps", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je mets en place des pipelines CI/CD et je pilote les projets en Agile.", en: "I set up CI/CD pipelines and run projects in Agile." } },
  { name: "Docker", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je conteneurise mes applications pour des environnements reproductibles.", en: "I containerise my apps for reproducible environments." } },
  { name: "Power Platform", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je conçois des apps métiers low-code et j'automatise les processus.", en: "I build low-code business apps and automate processes." } },
  { name: "Git", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je versionne mon code et je collabore en équipe (GitHub / GitLab).", en: "I version my code and collaborate with teams (GitHub / GitLab)." } },
  { name: "IIS", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je déploie et j'héberge mes applications .NET sur Windows Server.", en: "I deploy and host my .NET applications on Windows Server." } },
  { name: "Vercel", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je déploie mes applications front-end et Next.js en continu.", en: "I continuously deploy my front-end and Next.js apps." } },
  { name: "Linux", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "J'administre mes serveurs et mes environnements de production.", en: "I administer my servers and production environments." } },
  { name: "SharePoint", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je mets en place des portails collaboratifs et de la gestion documentaire.", en: "I set up collaborative portals and document management." } },
  { name: "Prompt Engineering", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je conçois des prompts et des agents pour exploiter les modèles d'IA.", en: "I design prompts and agents to leverage AI models." } },
  { name: "Cloudflare", key: true, cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "Je sécurise et j'accélère mes applications (DNS, CDN, protection).", en: "I secure and speed up my applications (DNS, CDN, protection)." } },
  { name: "WhatsApp / Meta API", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "J'intègre WhatsApp Business & Meta : messages, notifications, paiement.", en: "I integrate WhatsApp Business & Meta: messaging, notifications, payment." } },
  { name: "API Paiement", cat: { fr: "Cloud & DevOps", en: "Cloud & DevOps" }, usage: { fr: "J'intègre les paiements en ligne : Mobile Money, cartes, agrégateurs.", en: "I integrate online payments: Mobile Money, cards, aggregators." } },

  // Données
  { name: "SQL Server", cat: { fr: "Données", en: "Data" }, usage: { fr: "Je modélise et j'optimise mes bases de données relationnelles.", en: "I model and optimise my relational databases." } },
  { name: "PostgreSQL", cat: { fr: "Données", en: "Data" }, usage: { fr: "Je conçois des bases relationnelles performantes et fiables.", en: "I design fast, reliable relational databases." } },
  { name: "MySQL", cat: { fr: "Données", en: "Data" }, usage: { fr: "Je gère les données de mes applications web.", en: "I manage the data behind my web applications." } },
  { name: "Firebase", cat: { fr: "Données", en: "Data" }, usage: { fr: "Je gère l'auth, le temps réel et le backend de mes apps mobiles.", en: "I handle auth, realtime and backend for my mobile apps." } },
  { name: "Talend", cat: { fr: "Données", en: "Data" }, usage: { fr: "J'intègre et je transforme les données (ETL, jobs).", en: "I integrate and transform data (ETL, jobs)." } },
  { name: "SQLite", cat: { fr: "Données", en: "Data" }, usage: { fr: "J'embarque une base locale dans mes applications mobiles et desktop.", en: "I embed a local database in my mobile and desktop apps." } },
  { name: "Dataverse", cat: { fr: "Données", en: "Data" }, usage: { fr: "Je structure les données de mes solutions Power Platform.", en: "I structure data for my Power Platform solutions." } },
  { name: "IBM System i (AS400)", cat: { fr: "Données", en: "Data" }, usage: { fr: "J'intègre et je modernise des applications héritées sur IBM i / AS400.", en: "I integrate and modernise legacy applications on IBM i / AS400." } },

  // 3D & Immersif
  { name: "Three.js", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Je crée des expériences 3D temps réel directement dans le navigateur.", en: "I create real-time 3D experiences right in the browser." } },
  { name: "WebGL", cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Je réalise du rendu graphique GPU performant sur le web.", en: "I build high-performance GPU rendering on the web." } },
  { name: "VR", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Je réalise des visites virtuelles immersives (casque ou navigateur).", en: "I build immersive VR tours (headset or browser)." } },
  { name: "AR", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Je crée des expériences de réalité augmentée directement dans le navigateur.", en: "I build augmented reality experiences right in the browser." } },
  { name: "AR.js", cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Je développe de la réalité augmentée web légère (marqueurs & localisation).", en: "I build lightweight web AR (markers & location)." } },
  { name: "Lapentor", key: true, cat: { fr: "3D & Immersif", en: "3D & Immersive" }, usage: { fr: "Je crée des visites virtuelles 360° immersives et interactives.", en: "I build immersive, interactive 360° virtual tours." } }
];
