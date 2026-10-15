const path = require("path");

module.exports = function (eleventyConfig) {
  // D-026: English-first launch. Hebrew sources are retained for future adaptation.
  eleventyConfig.ignores.add("src/he/**");
  for (const route of ["commercial-spying", "private-investigator", "not-it-support", "leaving-controlling-relationship"]) {
    eleventyConfig.ignores.add("src/en/" + route + ".njk");
  }
  // Russian remains unpublished until its translated mirror is ready.
  eleventyConfig.ignores.add("src/ru/**");

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("_routes.json");
  eleventyConfig.addPassthroughCopy("llms.txt");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("404.html");
  eleventyConfig.addPassthroughCopy("terms.html");
  eleventyConfig.addPassthroughCopy("privacy.html");

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
  };
};
