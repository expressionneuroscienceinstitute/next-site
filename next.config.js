/** @type {import('next').NextConfig} */

// Centralized list of external origins we knowingly load resources from.
// Keeping it here makes the CSP easy to audit.
const SCRIPT_SRC_HOSTS = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://va.vercel-scripts.com",
  "https://donorbox.org",
  "https://*.donorbox.org",
];

const STYLE_SRC_HOSTS = [
  "https://donorbox.org",
  "https://*.donorbox.org",
  "https://fonts.googleapis.com",
];

const IMG_SRC_HOSTS = [
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.donorbox.org",
  "https://donorbox.org",
  "https://*.gstatic.com",
];

const FRAME_SRC_HOSTS = [
  "https://donorbox.org",
  "https://*.donorbox.org",
  "https://www.googletagmanager.com",
];

const CONNECT_SRC_HOSTS = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.googletagmanager.com",
  "https://stats.g.doubleclick.net",
  "https://donorbox.org",
  "https://*.donorbox.org",
  "https://vitals.vercel-insights.com",
  "https://vercel.live",
];

const buildCsp = () => {
  // We allow 'unsafe-inline' for scripts only because Next still injects a
  // small inline bootstrap and the GTM/structured-data shims rely on it.
  // Long-term we should migrate those to nonces, but the threat model here
  // (static marketing site, no user-generated HTML) keeps risk low.
  const directives = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", ...SCRIPT_SRC_HOSTS],
    "script-src-elem": ["'self'", "'unsafe-inline'", ...SCRIPT_SRC_HOSTS],
    "style-src": ["'self'", "'unsafe-inline'", ...STYLE_SRC_HOSTS],
    "style-src-elem": ["'self'", "'unsafe-inline'", ...STYLE_SRC_HOSTS],
    "img-src": ["'self'", "data:", "blob:", ...IMG_SRC_HOSTS],
    "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
    "connect-src": ["'self'", ...CONNECT_SRC_HOSTS],
    "frame-src": ["'self'", ...FRAME_SRC_HOSTS],
    "media-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'", "https://donorbox.org"],
    "frame-ancestors": ["'none'"],
    "upgrade-insecure-requests": [],
  };

  return Object.entries(directives)
    .map(([key, values]) => (values.length ? `${key} ${values.join(" ")}` : key))
    .join("; ");
};

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: buildCsp(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=(self \"https://donorbox.org\")",
      "interest-cohort=()",
      "browsing-topics=()",
    ].join(", "),
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  poweredByHeader: false,

  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  compress: true,

  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion', 'next-themes'],
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.resolve.alias['moment'] = 'moment/min/moment.min.js'
      config.optimization.concatenateModules = true
      config.optimization.runtimeChunk = 'single'
    }

    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      }
    }

    return config
  },

  async redirects() {
    return [
      // Old program slugs now redirect to the active research project so
      // external links / search-engine traffic don't 404.
      {
        source: '/programs/insight',
        destination: '/programs/microneedle-eeg',
        permanent: true,
      },
      {
        source: '/programs/ceEEG',
        destination: '/programs/microneedle-eeg',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/logos/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
