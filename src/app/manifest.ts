import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'collecttaste',
    name: 'Collect Taste',
    short_name: 'CollectTaste',
    description: 'Collect recipes. Share memories.',

    start_url: '/',

    display: 'standalone',

    background_color: '#FFF3CF',

    theme_color: '#55642E',

    icons: [
      {
        src: '/icons/icon-light.png',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  };
}
