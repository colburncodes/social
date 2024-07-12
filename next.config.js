// @ts-check
const { withBlitz } = require("@blitzjs/next");
const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  experimental: {
    esmExternals: false,
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/tailwind'
    ]
  },
}

module.exports = withBlitz(withContentlayer(config))
