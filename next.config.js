const path = require("path");
const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    HOST: process.env.HOST,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
