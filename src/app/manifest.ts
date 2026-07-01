import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'collecttaste',
    name: 'Collect Taste',
    short_name: 'CollectTaste',
    description: 'Collect recipes. Share memories.',

    start_url: '/',
    scope: '/',

    display: 'standalone',

    background_color: '#FFF3CF',

    theme_color: '#55642E',

    categories: ['food', 'productivity'],

    icons: [
      {
        src: '/icons/icon-light.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-light.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
