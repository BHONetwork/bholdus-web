const locales = require("./locales.json");

module.exports = {
  locales,
  defaultLocale: "en",
  localeDetection: false,
  pages: {
    "*": ["common"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./translations/${lang}/${ns}.json`).then((m) => m.default),
};
