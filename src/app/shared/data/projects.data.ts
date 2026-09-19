/**
 * Single source of truth for portfolio projects.
 *
 * Used by both the portfolio grid and the `/portfolio/:slug` case-study page.
 * The case-study fields are optional and intentionally left empty — populate
 * `summary`, `role`, `stack`, `year` and `highlights` with real information and
 * the detail page renders those sections automatically.
 */
export interface Project {
  /** URL segment, e.g. /portfolio/seirim */
  slug: string;
  title: string;
  /** Live project URL. */
  link: string;
  image: string;
  /** Optional case-study content (nothing is invented here). */
  summary?: string;
  role?: string;
  stack?: string[];
  year?: number;
  highlights?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'allstar-solution-ltd',
    title: 'Allstar Solution LTD',
    link: 'https://allstar.com.np/',
    image: 'assets/images/portfolio/allstar.webp',
  },
  {
    slug: 'seirim',
    title: 'Seirim',
    link: 'https://seirim.com/',
    image: 'assets/images/portfolio/seirim.webp',
  },
  {
    slug: 'saim-college',
    title: 'SAIM College',
    link: 'https://www.saim.edu.np/',
    image: 'assets/images/portfolio/saim.webp',
  },
  {
    slug: 'six-sigma-education',
    title: 'Six Sigma Education',
    link: 'https://sixsigmaedu.com.np/',
    image: 'assets/images/portfolio/sixsigma.webp',
  },
  {
    slug: 'allstar-ems',
    title: 'Allstar EMS',
    link: 'https://allstarems.com/ems/register',
    image: 'assets/images/portfolio/ems.webp',
  },
  {
    slug: 'rising-star-school-college',
    title: 'Rising Star school/college',
    link: 'https://school.risingstar.edu.np/',
    image: 'assets/images/portfolio/risingstar.webp',
  },
  {
    slug: 'the-excel-public-school',
    title: 'The excel public school',
    link: 'https://excelschool.edu.np/',
    image: 'assets/images/portfolio/excel.webp',
  },
  {
    slug: 'santi-foundation',
    title: 'Santi Foundation',
    link: 'https://www.shantifoundation.org.np/',
    image: 'assets/images/portfolio/santifoun.webp',
  },
  {
    slug: 'care-school',
    title: 'Care School',
    link: 'https://careschool.edu.np/',
    image: 'assets/images/portfolio/care.webp',
  },
  {
    slug: 'xybernova',
    title: 'xybernova',
    link: 'https://github.com/RahimGopali1/XyberNova.git',
    image: 'assets/images/portfolio/xybernova.webp',
  },
  {
    slug: 'gunraj-nursing-college',
    title: 'Gunraj nursing college',
    link: 'https://github.com/RahimGopali1/Gunraj-College.git',
    image: 'assets/images/portfolio/gunraj.webp',
  },
];

/** Look up a project by its URL slug. */
export function getProjectBySlug(slug: string | null): Project | undefined {
  if (!slug) return undefined;
  return PROJECTS.find((project) => project.slug === slug);
}
