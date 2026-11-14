import type { NextConfig } from 'next'

const staticFrontend = process.env.FIBETECH_STATIC_FRONTEND === '1'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Le projet n'embarque pas ESLint : la vérification se fait avec `npm run typecheck`.
  eslint: { ignoreDuringBuilds: true },
  // Les types sont vérifiés avant chaque envoi avec `npm run typecheck` ; on ne les
  // revérifie pas pendant le build de l'hébergeur (étape qui échouait sur Railway).
  typescript: { ignoreBuildErrors: true },
  ...(staticFrontend ? { output: 'export' as const } : {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          ],
        },
        {
          // L'espace d'administration ne doit jamais apparaître dans les moteurs de recherche.
          source: '/admin/:path*',
          headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
        },
      ]
    },
  }),
}

export default nextConfig
