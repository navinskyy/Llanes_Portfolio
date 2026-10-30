// All portfolio content lives here so it can be edited without touching markup.
// A `url` left as `undefined` hides that link until a real destination exists.
import type { ImageMetadata } from 'astro';

import nurseprepShot from '../assets/projects/nurseprep.png';

import deansListBronze from '../assets/certs/deans-list-bronze.png';
import deansListSilver from '../assets/certs/deans-list-silver.png';
import webDevSmartContract from '../assets/certs/web-dev-smart-contract.png';
import pccInnovision from '../assets/certs/pcc-innovision-2026.png';
import cloudGaming from '../assets/certs/cloud-gaming.png';
import innovatingIntelligence from '../assets/certs/innovating-intelligence.jpg';
import aiLifeToCome from '../assets/certs/ai-life-to-come.png';

export const person = {
  name: 'Navin',
  displayName: 'Navin Llanes',
  fullName: 'Navin Byron Llanes',
  role: 'Computer Science student',
  school: 'Lyceum of the Philippines University – Manila',
  schoolShort: 'LPU Manila',
  location: 'Caloocan City, Metro Manila',
  email: 'navinbyronllanes@gmail.com',
  phone: '0915 980 1407',
  phoneHref: 'tel:+639159801407',
  /** The cover headline. */
  headline: 'I build practical software, and I’m levelling up in AI and cybersecurity.',
  statement:
    "I'm a computer science student and developer interested in building useful software, exploring AI-powered applications, and learning cybersecurity.",
  /** The line the cover's status window types out. Keep it short and true. */
  status: 'Building a dental clinic website',
  /** Put the file in public/ (e.g. public/resume.pdf) and set this to '/resume.pdf'. */
  resume: undefined as string | undefined,
};

export const socials = [
  { label: 'GitHub', handle: 'navinskyy', href: 'https://github.com/navinskyy', icon: 'github' },
  { label: 'LinkedIn', handle: 'navin-llanes', href: 'https://linkedin.com/in/navin-llanes-b50871317', icon: 'linkedin' },
  { label: 'Instagram', handle: '_nabean', href: 'https://www.instagram.com/_nabean/', icon: 'instagram' },
] as const;

/**
 * The booklet's chapters, in page order. `label` is the plain navigation name,
 * `title` the chapter heading, `plain` the line under it that says what it is.
 */
export const sections = [
  { id: 'about', label: 'About', title: 'Player profile', plain: 'About me' },
  { id: 'projects', label: 'Projects', title: 'Inventory', plain: 'Selected projects' },
  { id: 'journey', label: 'Journey', title: 'World map', plain: 'Experience & education' },
  { id: 'skills', label: 'Skills', title: 'Loadout', plain: 'Skills and tools, no percentage bars' },
  { id: 'learning', label: 'Learning', title: 'Side quests', plain: 'What I’m exploring now' },
  { id: 'contact', label: 'Contact', title: 'Continue?', plain: 'Get in touch' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export type ProjectStatus = 'Live' | 'In progress' | 'Early stage' | 'Research';
/** Drawn pixel icons for the inventory slots (src/components/PixelIcon.astro). */
export type ItemIcon = 'cross' | 'book' | 'tooth' | 'shield' | 'cup' | 'receipt';

export interface Project {
  name: string;
  /** One line under the name. */
  kind: string;
  /** The problem it addresses, in one sentence. */
  problem: string;
  description: string;
  status?: ProjectStatus;
  /** Only what the project actually uses (checked against each repository). */
  tech: string[];
  /** Navin's part, when it was not a solo project. */
  role?: string;
  /** Highlighted figure. */
  figure?: { value: string; label: string };
  icon: ItemIcon;
  /** A real screenshot of the project; omitted when none exists. */
  image?: { src: ImageMetadata; alt: string };
  url?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    name: 'NursePrep',
    kind: 'Web app for nursing students',
    status: 'Live',
    icon: 'cross',
    problem: 'Reviewing for the Philippine Nurse Licensure Examination means a lot of practice with little feedback on weak subjects.',
    description:
      'A personalized PNLE review platform with adaptive quizzes, spaced-repetition flashcards, progress tracking and AI-powered explanations.',
    tech: ['JavaScript', 'Vite', 'Firebase', 'Anime.js'],
    image: { src: nurseprepShot, alt: 'NursePrep home page: a practice question with its rationale beside the headline "Study smarter. Pass the PNLE with confidence."' },
    url: 'https://github.com/navinskyy/NursePrep',
    demo: 'https://nurse-prep-pi.vercel.app',
  },
  {
    name: 'LIBR-A.I-RY',
    kind: 'Library management system',
    icon: 'book',
    problem: 'Cataloguing, lending and returns are slow when a library runs them by hand.',
    description:
      'A web-based library system for cataloguing books, borrowing and returns, and managing user accounts. A React front end talks to a Flask API, and the whole stack runs in Docker.',
    tech: ['React', 'Flask', 'SQLAlchemy', 'Docker'],
    role: 'Co-developer, team of three',
    url: 'https://github.com/navinskyy/LIBR-A.I-RY',
  },
  {
    name: 'Dental Clinic Website',
    kind: 'Website for a dental and braces clinic',
    status: 'In progress',
    icon: 'tooth',
    problem: 'Patients need one clear place to learn about the clinic and its appointments.',
    description: 'A website for a dental and braces clinic, with appointment-related functionality. Integration work is ongoing.',
    tech: [],
    // The repository is private for now; add the URL here once it is public.
    url: undefined,
  },
  {
    name: 'IoT Intrusion Detection',
    kind: 'Machine learning research',
    status: 'Research',
    icon: 'shield',
    problem: 'IoT networks are hard to watch for malicious traffic by hand.',
    description:
      'A machine learning-based intrusion detection system for IoT networks, trained on the IoT-23 dataset. A Random Forest model detected malicious traffic with 98.42% accuracy.',
    tech: ['Python', 'Random Forest', 'IoT-23 dataset'],
    figure: { value: '98.42%', label: 'detection accuracy' },
    url: undefined,
  },
  {
    name: 'CoffeeQuest',
    kind: 'Café discovery app',
    status: 'Early stage',
    icon: 'cup',
    problem: 'Finding a café in Metro Manila that fits what you want takes too much searching.',
    description:
      'A planned platform with a searchable map, filters, and community reviews and ratings. The repository holds the initial app setup.',
    tech: ['Expo', 'TypeScript', 'Supabase'],
    url: 'https://github.com/navinskyy/CoffeeQuest',
  },
  {
    name: 'Red Warriors Ordering & POS',
    kind: 'Android app',
    icon: 'receipt',
    problem: 'Taking orders and completing sales at the counter has to be quick and hard to get wrong.',
    description:
      'An Android ordering and point-of-sale app. I designed and built the screens for placing orders, browsing the menu and completing sales.',
    tech: ['Android Studio'],
    role: 'Front-end',
    url: undefined,
  },
];

/** Player profile, one paragraph per entry. */
export const story = [
  "I'm a computer science student at Lyceum of the Philippines University – Manila, learning through coursework and through projects that people can actually use.",
  'Most of my work sits on the front end, where I care about interfaces that feel clear and quick. I’m also interested in software engineering as a whole, in putting AI to practical use, and in cybersecurity, which my IoT intrusion detection research got me into.',
  "I'm also a working student: alongside classes I work as a sales advisor at H&M and serve on the vice presidential committee of the Lyceum Pirate Esports Organization.",
];

/** The character sheet beside the story. Real facts only. */
export const profile = [
  { key: 'Class', value: 'Computer Science student' },
  { key: 'Guild', value: 'LPU Manila' },
  { key: 'Home', value: 'Caloocan City' },
  { key: 'Side job', value: 'Sales Advisor, H&M' },
  { key: 'Best GWA', value: "1.45 · Dean's List" },
  { key: 'Interests', value: 'Front-end, AI, cybersecurity' },
];

export type RoleKind = 'Employment' | 'Organization' | 'Academic';

export interface Role {
  start: string;
  end: string;
  title: string;
  org: string;
  place: string;
  kind: RoleKind;
}

export const experience: Role[] = [
  { start: 'May 2026', end: 'Present', title: 'Sales Advisor', org: 'H&M', place: 'Quezon City', kind: 'Employment' },
  { start: 'Nov 2025', end: 'Present', title: 'Vice Presidential Committee', org: 'Lyceum Pirate Esports Organization', place: 'Manila', kind: 'Organization' },
  { start: 'Oct 2023', end: 'May 2024', title: 'Membership Committee', org: 'Lyceum Pirate Esports Organization', place: 'Manila', kind: 'Organization' },
  { start: 'Apr 2023', end: 'May 2023', title: 'Leader, Work Immersion', org: 'Work immersion', place: 'Caloocan City', kind: 'Academic' },
];

export const education = {
  school: 'Lyceum of the Philippines University – Manila',
  program: 'Computer Science',
  status: 'Current student',
};

/** No proficiency scores: a group is a list, nothing more. `training` marks a
 *  group that is being learned rather than used in shipped work. */
export const skills: { group: string; items: string[]; training?: boolean }[] = [
  { group: 'Languages', items: ['JavaScript', 'Java', 'Python', 'PHP', 'SQL', 'HTML', 'CSS'] },
  { group: 'Front end & web', items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Node.js'] },
  { group: 'Data & backend', items: ['MySQL', 'MongoDB', 'Firebase'] },
  { group: 'AI-assisted development', items: ['OpenAI', 'Claude Code', 'Codex'] },
  { group: 'Cybersecurity & networking', items: ['Networking fundamentals', 'Security fundamentals', 'ML intrusion detection (research)'], training: true },
  { group: 'Developer tools', items: ['Git', 'GitHub', 'VS Code', 'Linux', 'Prettier', 'Trello', 'Discord'] },
  { group: 'Design & media', items: ['Adobe Photoshop', 'Adobe Premiere Pro', 'Canva'] },
];

/** Side quests: what Navin is exploring now. Edit freely; keep it honest. */
export const quests: { title: string; note: string; state: 'Active' | 'In progress' }[] = [
  { title: 'Ship the dental clinic website', note: 'Appointment features and integration work are under way.', state: 'In progress' },
  { title: 'Computer networking', note: 'How traffic actually moves: addressing, routing, and the protocols under the apps I build.', state: 'Active' },
  { title: 'Cybersecurity fundamentals', note: 'Common attacks and defences, building on what my intrusion detection research taught me.', state: 'Active' },
  { title: 'AI-powered applications', note: 'Putting language models to practical use, like the explanations in NursePrep.', state: 'Active' },
];

export interface Certificate {
  title: string;
  date: string;
  /** Certificate type as printed on it, e.g. "Attendance". */
  kind: string;
  /** Issuer, only where the certificate itself names it. */
  issuer?: string;
  /** e.g. "GWA 1.45" */
  detail?: string;
  image: ImageMetadata;
  alt: string;
}

export const honors: Certificate[] = [
  {
    title: "Dean's List, Silver Seal",
    date: 'AY 2024–2025, 2nd sem',
    kind: 'Academic honor',
    issuer: 'Lyceum of the Philippines University',
    detail: 'GWA 1.45',
    image: deansListSilver,
    alt: "Lyceum of the Philippines University Dean's List certificate, Silver Seal Award, second semester 2024–2025",
  },
  {
    title: "Dean's List, Bronze Seal",
    date: 'AY 2024–2025, 1st sem',
    kind: 'Academic honor',
    issuer: 'Lyceum of the Philippines University',
    detail: 'GWA 1.59',
    image: deansListBronze,
    alt: "Lyceum of the Philippines University Dean's List certificate, Bronze Seal Award, first semester 2024–2025",
  },
];

export const certificates: Certificate[] = [
  { title: 'Web Development and Smart Contract', date: 'May 2026', kind: 'Completion', image: webDevSmartContract, alt: 'Certificate for the Web Development and Smart Contract seminar' },
  { title: 'InnoVision: 2026 Campus Series', date: 'Feb 2026', kind: 'Certification', issuer: 'Philippine Coding Camp', image: pccInnovision, alt: "Certificate for Philippine Coding Camp's InnoVision 2026 Campus Series" },
  { title: 'Cloud Gaming: The Future of Interactive Entertainment', date: 'Apr 2024', kind: 'Attendance', image: cloudGaming, alt: 'Certificate for the Cloud Gaming seminar' },
  { title: 'Innovating Intelligence: A.I. Ethics & Big Data Transparency', date: 'Mar 2024', kind: 'Attendance', image: innovatingIntelligence, alt: 'Certificate for the Innovating Intelligence seminar on AI ethics' },
  { title: 'Artificial Intelligence: The Life That Is to Come', date: 'Oct 2023', kind: 'Participation', image: aiLifeToCome, alt: 'Certificate for the Artificial Intelligence: The Life That Is to Come seminar' },
];
