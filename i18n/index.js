const locales = require("./locales.json");

module.exports = {
  locales,
  defaultLocale: "en",
  localeDetection: false,
  pages: {
    "*": ["common", "roadmap"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./translations/${lang}/${ns}.json`).then((m) => m.default),
};
