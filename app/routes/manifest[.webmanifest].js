import { json } from '@remix-run/node';

export const loader = () => {
  return json(
    {
      short_name: 'PWA',
      name: 'OFFICE BILLS',
      start_url: '/internal',
      display: 'standalone',
      background_color: '#d3d7dd',
      theme_color: '#BD7C31',
      icons: [
        {
          src: "/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        }
      ],
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
