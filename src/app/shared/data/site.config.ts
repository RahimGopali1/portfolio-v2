/**
 * Site-wide configuration used for SEO / sharing metadata.
 *
 * Update SITE_URL once to the real production domain — canonical URLs, OpenGraph
 * tags and the sitemap all derive from it.
 */
export const SITE_URL = 'https://your-domain.com';

export const SITE_NAME = 'Rahim Gopali';
export const SITE_TITLE = 'Rahim Gopali — Web Developer';
export const SITE_DESCRIPTION =
  'Front-end and web developer building responsive, user-friendly web applications with Angular, JavaScript and modern front-end tooling.';

/** Absolute or asset-relative path to the default social share image. */
export const DEFAULT_OG_IMAGE = 'assets/images/pages/me-2.png';

/** Structured data describing the site owner (used on the home page). */
export const PERSON_JSON_LD: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Web Developer',
  url: SITE_URL,
};
