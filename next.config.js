const path = require("path");
const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    HOST: process.env.HOST,
    HCAPTCHA_SITEKEY: process.env.HCAPTCHA_SITEKEY,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["bholdus.s3.ap-southeast-1.amazonaws.com"],
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; frame-ancestors 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },
});
