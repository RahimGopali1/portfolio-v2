import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './shared/data/projects.data';

export const serverRoutes: ServerRoute[] = [
  {
    // enumerate every project so each case study is prerendered to static HTML
    path: 'portfolio/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map((project) => ({ slug: project.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
