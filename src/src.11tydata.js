// Default locale for every page. A future src/he/he.11tydata.js sets locale: "he".
module.exports = {
  locale: "en",
  eleventyComputed: { t: (d) => d.i18n[d.locale] },
};
