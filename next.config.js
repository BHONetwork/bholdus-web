const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  env: {
    BACKEND_URL: "http://localhost:1337",
  },
});
