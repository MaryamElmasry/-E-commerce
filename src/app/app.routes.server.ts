import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:id', //dashboard
    renderMode: RenderMode.Client,
  },
  {
    path: 'brands/:id', //dashboard
    renderMode: RenderMode.Client,
  },
  {
    path: 'categoryDetails/:id', //dashboard
    renderMode: RenderMode.Client,
  },
  {
    path: 'details/:id', //dashboard
    renderMode: RenderMode.Client,
  },


  {
    path: '**', //news website
    renderMode: RenderMode.Server
  },
  // {
  //   path: '**',
  //   renderMode: RenderMode.Prerender,
  // }
];
