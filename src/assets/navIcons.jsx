// Icônes de la bottom navigation (mobile). Trait fin, hérite de currentColor.
const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function HomeNavIcon(p) { return (<svg {...base} {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>); }
export function AboutNavIcon(p) { return (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" /></svg>); }
export function ParcoursNavIcon(p) { return (<svg {...base} {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" /><path d="M3 12h18" /></svg>); }
export function ProjectsNavIcon(p) { return (<svg {...base} {...p}><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></svg>); }
export function LabNavIcon(p) { return (<svg {...base} {...p}><path d="M9 3h6" /><path d="M10 3v6l-5 8.5A2 2 0 0 0 6.8 21h10.4a2 2 0 0 0 1.8-3.5L14 9V3" /><path d="M7.5 15h9" /></svg>); }
export function ContactNavIcon(p) { return (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>); }

const map = { home: HomeNavIcon, about: AboutNavIcon, parcours: ParcoursNavIcon, projects: ProjectsNavIcon, lab: LabNavIcon, contact: ContactNavIcon };
export function NavIcon({ id, ...p }) {
  const Icon = map[id];
  return Icon ? <Icon {...p} /> : null;
}
