module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("ils", (n) => "₪" + Number(n).toLocaleString("en-US"));
  eleventyConfig.addFilter("fill", (s, vars) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)));
  const words = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
  eleventyConfig.addFilter("numword", (n) => words[Number(n)] ?? String(n));
  eleventyConfig.addFilter("capfirst", (s) => { s = String(s); return s.charAt(0).toUpperCase() + s.slice(1); });
  // Layouts for pages rendered from content live in src/_layouts (not in _includes); never emit them as pages.
  eleventyConfig.ignores.add("src/_layouts/**");
  eleventyConfig.addWatchTarget("src/content/");
  eleventyConfig.addWatchTarget("content/content-model.json");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_headers");
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
  };
};
