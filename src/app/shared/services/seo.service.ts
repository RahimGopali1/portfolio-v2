import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '../data/site.config';

export interface SeoConfig {
  /** Page title, without the site-name suffix. */
  title: string;
  description?: string;
  /** Route path used to build the canonical URL, e.g. '/portfolio'. */
  path: string;
  /** Absolute URL or asset-relative path. */
  image?: string;
  /** Optional structured-data object rendered as JSON-LD. */
  jsonLd?: Record<string, unknown>;
  /** When true, adds a robots noindex tag (e.g. for 404 pages). */
  noindex?: boolean;
}

/**
 * Sets per-route title, description, canonical, OpenGraph/Twitter tags and
 * JSON-LD. Works during SSR and client-side navigation.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${SITE_NAME}`;
    const description = config.description ?? SITE_DESCRIPTION;
    const url = this.absolute(config.path);
    const image = this.absolute(config.image ?? DEFAULT_OG_IMAGE);

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    if (config.noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
    } else {
      this.meta.removeTag("name='robots'");
    }

    this.setCanonical(url);
    this.setJsonLd(config.jsonLd);
  }

  private absolute(pathOrUrl: string): string {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return `${SITE_URL.replace(/\/$/, '')}/${pathOrUrl.replace(/^\//, '')}`;
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data?: Record<string, unknown>): void {
    const existing = this.doc.getElementById('app-jsonld');
    if (existing) existing.remove();
    if (!data) return;

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'app-jsonld';
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}
