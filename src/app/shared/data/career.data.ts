/**
 * Single source of truth for career information.
 *
 * Everything time-sensitive (total experience, "Present" labels, the current
 * year, per-role durations) is derived from this file, so it only ever needs
 * to be updated in one place.
 */

export interface ExperienceItem {
  company: string;
  role: string;
  /** Year the role started, e.g. 2022. */
  startYear: number;
  /** Year the role ended, or `null` while it is the current role. */
  endYear: number | null;
  description: string;
  /** Optional; only rendered when present (nothing is invented here). */
  technologies?: string[];
}

export interface EducationItem {
  institution: string;
  qualification: string;
  startYear: number;
  endYear: number;
  description: string;
}

/** The year the professional career began. */
export const CAREER_START_YEAR = 2022;

/** Centralized location of the downloadable resume PDF — update here only. */
export const RESUME_PDF_PATH = 'assets/resume/Rahim-Gopali-Resume.pdf';
/** Filename suggested to the browser when the resume is downloaded. */
export const RESUME_PDF_FILENAME = 'Rahim-Gopali-Resume.pdf';

/** Current calendar year, evaluated at runtime (SSR-safe — no browser APIs). */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/** Total completed years of professional experience (2022 -> 2026 === 4). */
export function getTotalExperienceYears(): number {
  return Math.max(0, getCurrentYear() - CAREER_START_YEAR);
}

/** Human label shared by the Resume / Portfolio page headers, e.g. "4+ years". */
export function getExperienceLabel(): string {
  return `${getTotalExperienceYears()}+ years`;
}

/**
 * Duration of a single role in whole years. The current role (endYear: null)
 * counts up to the present year, so it grows automatically over time.
 */
export function getRoleDurationYears(item: ExperienceItem): number {
  const end = item.endYear ?? getCurrentYear();
  return Math.max(0, end - item.startYear);
}

/** Ordered most-recent-first, so the current role always leads the timeline. */
export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'SourceCode',
    role: 'Web Developer',
    startYear: 2026,
    endYear: null,
    description:
      'Building responsive, production web applications as part of the SourceCode team.',
  },
  {
    company: 'Freelance',
    role: 'Freelance Front-End Developer',
    startYear: 2023,
    endYear: 2025,
    description:
      'Worked as a Freelance Front-End Developer on a part-time basis, contributing to multiple real-world projects including Seirim and OnlineCourseHost. Focused on building scalable, responsive web applications using the Angular framework, while collaborating with clients to deliver clean, user-friendly interfaces.',
  },
  {
    company: 'Allstar IT Solution',
    role: 'Web Developer',
    startYear: 2022,
    endYear: 2024,
    description:
      'Worked as a Web Developer at Allstar IT Solution, building responsive websites and web applications using modern front-end technologies. Contributed to project planning, UI implementation, performance optimization, and maintaining clean, reusable code.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'The British College',
    qualification: 'BSc (Hons) Computing',
    startYear: 2018,
    endYear: 2021,
    description:
      'Completed a BSc (Hons) Computing at The British College. The program provided a strong foundation in computing principles, problem-solving, and practical project work, supporting my growth as a web and front-end developer.',
  },
  {
    institution: 'The Rising Star',
    qualification: 'Higher Secondary Education (+2)',
    startYear: 2015,
    endYear: 2017,
    description:
      'Completed Higher Secondary Education (+2) at The Rising Star College. The program built a strong academic foundation and helped develop discipline, critical thinking, and communication skills that supported my further studies in computing.',
  },
  {
    institution: 'Mount Chandragiri English High School',
    qualification: 'Secondary Education',
    startYear: 2003,
    endYear: 2015,
    description:
      'Completed Secondary Education at Mount Chandragiri English High School, where I built a strong academic foundation and developed discipline, teamwork, and learning skills that supported my future education.',
  },
];
