import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**', //news website
    renderMode: RenderMode.Server
  },
  // {
  //   path: '**',
  //   renderMode: RenderMode.Prerender,
  // }
];
