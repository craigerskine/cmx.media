const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy('src/_redirects');
  eleventyConfig.addPassthroughCopy('src/_assets');
  eleventyConfig.addPassthroughCopy('src/*.ico');
  eleventyConfig.addPassthroughCopy('src/*.png');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addShortcode('version', function(){
    return String(Date.now())
  });
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  // | randomLimit(6, page.url)
  eleventyConfig.addFilter('randomLimit', (arr, limit, currPage) => {
    const pageArr = arr.filter((page) => page.url !== currPage);
    pageArr.sort(() => {
      return 0.5 - Math.random();
    });
    return pageArr.slice(0, limit);
  });
  eleventyConfig.addFilter("pluck", function (arr, value, attr) {
    return arr.filter((item) => item[attr] === value);
  });
  // for zine in (magazines | flatMap('series') | unique('series'))
  eleventyConfig.addFilter('flatMap', (list, key) => list.flatMap((x) => x[key]));
  eleventyConfig.addFilter('unique', (list, key) => {
    const map = new Map(list.map((x) => [x[key], x]))
    return [...map.values()]
  });
  return {
    jsDataFileSuffix: ".data",
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};