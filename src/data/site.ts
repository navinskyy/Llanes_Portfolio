// All portfolio content lives here so it can be edited without touching markup.
// A `url` left as `undefined` hides that link until a real destination exists.
import type { ImageMetadata } from 'astro';

import deansListBronze from '../assets/certs/deans-list-bronze.png';
import deansListSilver from '../assets/certs/deans-list-silver.png';
import webDevSmartContract from '../assets/certs/web-dev-smart-contract.png';
import pccInnovision from '../assets/certs/pcc-innovision-2026.png';
import cloudGaming from '../assets/certs/cloud-gaming.png';
import innovatingIntelligence from '../assets/certs/innovating-intelligence.jpg';
import aiLifeToCome from '../assets/certs/ai-life-to-come.png';

export const person = {
  name: 'Navin',
  fullName: 'Navin Byron Llanes',
  lastNames: 'Byron Llanes',
  role: 'Computer Science Student',
  school: 'Lyceum of the Philippines University – Manila',
  location: 'Caloocan City, NCR',
  email: 'navinbyronllanes@gmail.com',
  phone: '0915 980 1407',
  phoneHref: 'tel:+639159801407',
  bio:
    "I'm a Computer Science and working student with a passion for front-end development, UI design, " +
    'and creating modern web applications. I also have a growing interest in computer networking and cybersecurity, ' +
    "and I'm committed to continuously learning and improving my technical skills.",
};

export const socials = [
  { label: 'GitHub', href: 'https://github.com/navinskyy', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/navin-llanes-b50871317', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/_nabean/', icon: 'instagram' },
] as const;

export type NavKey = 'P' | 'E' | 'S' | 'C';

export const sections: { key: NavKey; label: string; href: string; title: string }[] = [
  { key: 'P', label: 'Projects', href: '/projects/', title: "Things I've built" },
  { key: 'E', label: 'Experience', href: '/experience/', title: "Where I've worked" },
  { key: 'S', label: 'Stack', href: '/stack/', title: 'Tools I work with' },
  { key: 'C', label: 'Certifications', href: '/certifications/', title: 'Certifications & seminars' },
];

export interface Project {
  name: string;
  category: string;
  description: string;
  /** Highlighted figure, shown in a tabular field. */
  figure?: { value: string; label: string };
  url?: string;
  /** Live deployment, shown as a separate "Live demo" key. */
  demo?: string;
}

export const projects: Project[] = [
  {
    name: 'NursePrep',
    category: 'Web app',
    description:
      'A personalized review platform for the Philippine Nurse Licensure Examination (PNLE), with adaptive quizzes, spaced-repetition flashcards, progress tracking and AI-powered explanations. Built with vanilla JavaScript, Vite and Firebase.',
    url: 'https://github.com/navinskyy/NursePrep',
    demo: 'https://nurse-prep-pi.vercel.app',
  },
  {
    name: 'LIBR-AI-RY',
    category: 'AI website',
    description:
      'An AI-assisted library system exploring how smarter search and recommendations can make finding the right book faster and less frustrating.',
    url: 'https://github.com/navinskyy/LIBR-A.I-RY',
  },
  {
    name: 'IoT Intrusion Detection',
    category: 'Research',
    description:
      'A machine learning-based Intrusion Detection System for IoT networks using the IoT-23 dataset. A Random Forest model detected malicious traffic with 98.42% accuracy.',
    figure: { value: '98.42%', label: 'detection accuracy' },
    // Previously linked to the GitHub profile, not a repo; add the repo URL here when public.
    url: undefined,
  },
  {
    name: 'CoffeeQuest / KoFind',
    category: 'Mobile app',
    description:
      'A discovery app for finding coffee shops nearby, built around location-based search and a clean, quick browsing experience.',
    url: 'https://github.com/navinskyy/CoffeeQuest',
  },
  {
    name: 'Red Warriors Ordering & POS',
    category: 'Mobile app',
    description:
      'Developed the frontend of the Red Warriors Advance System Ordering and POS, a mobile application built with Android Studio. Designed and implemented intuitive user interfaces for order placement, menu browsing, and point-of-sale transactions, focusing on usability, responsiveness, and a seamless user experience.',
    url: undefined,
  },
];

export interface Role {
  start: string;
  end: string;
  title: string;
  org: string;
  place: string;
}

export const experience: Role[] = [
  { start: 'May 2026', end: 'Present', title: 'Sales Advisor', org: 'H&M', place: 'Quezon City' },
  { start: 'Nov 2025', end: 'Present', title: 'Vice Presidential Committee', org: 'Lyceum Pirate Esports Organization', place: 'Manila' },
  { start: 'Oct 2023', end: 'May 2024', title: 'Membership Committee', org: 'Lyceum Pirate Esports Organization', place: 'Manila' },
  { start: 'Apr 2023', end: 'May 2023', title: 'Leader, Work Immersion', org: 'Work immersion', place: 'Caloocan City' },
];

export const stack: { group: string; items: string[] }[] = [
  { group: 'Front end', items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Vite', 'Next.js', 'Tailwind CSS', 'Prettier'] },
  { group: 'Back end', items: ['Java', 'Python', 'Node.js', 'PHP', 'Linux', 'MySQL', 'SQL', 'Firebase', 'MongoDB'] },
  { group: 'AI & machine learning', items: ['OpenAI', 'Claude Code', 'Codex'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Visual Studio Code', 'Trello', 'Discord', 'Adobe Photoshop', 'Adobe Premiere Pro', 'Canva'] },
];

export interface Certificate {
  title: string;
  date: string;
  /** Certificate type as printed on it, e.g. "Attendance". */
  kind: string;
  /** Extra spec rows read from the certificate itself. */
  details?: { label: string; value: string }[];
  image: ImageMetadata;
  alt: string;
  verifyUrl?: string;
}

export const honors: Certificate[] = [
  {
    title: "Dean's List — Bronze Seal",
    date: 'AY 2024–2025, 1st semester',
    kind: 'Academic honor',
    details: [{ label: 'GWA', value: '1.59' }],
    image: deansListBronze,
    alt: "Lyceum of the Philippines University Dean's List certificate, Bronze Seal Award, first semester 2024–2025",
  },
  {
    title: "Dean's List — Silver Seal",
    date: 'AY 2024–2025, 2nd semester',
    kind: 'Academic honor',
    details: [{ label: 'GWA', value: '1.45' }],
    image: deansListSilver,
    alt: "Lyceum of the Philippines University Dean's List certificate, Silver Seal Award, second semester 2024–2025",
  },
];

export const certificates: Certificate[] = [
  { title: 'Web Development and Smart Contract', date: 'May 2026', kind: 'Completion', image: webDevSmartContract, alt: 'Certificate for the Web Development and Smart Contract seminar' },
  { title: "Philippine Coding Camp's InnoVision: 2026 Campus Series", date: 'February 2026', kind: 'Certification', image: pccInnovision, alt: "Certificate for Philippine Coding Camp's InnoVision 2026 Campus Series" },
  { title: 'Cloud Gaming: The Future of Interactive Entertainment', date: 'April 2024', kind: 'Attendance', image: cloudGaming, alt: 'Certificate for the Cloud Gaming seminar' },
  { title: 'Innovating Intelligence: A.I. Ethics & Big Data Transparency', date: 'March 2024', kind: 'Attendance', image: innovatingIntelligence, alt: 'Certificate for the Innovating Intelligence seminar on AI ethics' },
  { title: 'Artificial Intelligence: The Life That Is to Come', date: 'October 2023', kind: 'Participation', image: aiLifeToCome, alt: 'Certificate for the Artificial Intelligence: The Life That Is to Come seminar' },
];

// Navin's own typing-test run; visitors race against it.
export const typingBenchmark = { wpm: 92, accuracy: 97, durationSeconds: 30 };
