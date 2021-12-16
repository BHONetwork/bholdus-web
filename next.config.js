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
});
