const supportedLocales = require("./supportedLocales.json");

module.exports = {
  locales: supportedLocales,
  defaultLocale: "en",
  localeDetection: false,
  pages: {
    "*": ["common"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./translations/${lang}/${ns}.json`).then((m) => m.default),
};
