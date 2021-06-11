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
});
