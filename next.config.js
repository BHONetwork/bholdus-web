import path from "path";

const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
