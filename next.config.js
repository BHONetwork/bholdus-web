const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
