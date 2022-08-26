const yaml = require("js-yaml");

const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  // .yaml extension in _data
  eleventyConfig.addDataExtension('yml', (contents) => yaml.load(contents));

  let markdownLibrary = markdownIt().disable('code').use(markdownItAttrs);
  eleventyConfig.setLibrary('md', markdownLibrary);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy('_site/_admin');
  eleventyConfig.addPassthroughCopy('_site/_redirects');
  eleventyConfig.addPassthroughCopy('_site/_assets');
  eleventyConfig.addPassthroughCopy('_site/*.ico');
  eleventyConfig.addPassthroughCopy('_site/*.png');
  eleventyConfig.addPassthroughCopy('_site/site.webmanifest');
  eleventyConfig.addShortcode('version', () => `${String(Date.now())}`);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addPairedShortcode('md', function(content) {
    return markdownLibrary.render(content)
  });
  // | randomLimit(6, page.url)
  eleventyConfig.addFilter('randomLimit', (arr, limit, currPage) => {
    const pageArr = arr.filter((page) => page.url !== currPage);
    pageArr.sort(() => {
      return 0.5 - Math.random();
    });
    return pageArr.slice(0, limit);
  });
  eleventyConfig.addFilter('pluck', function (arr, value, attr) {
    return arr.filter((item) => item[attr] === value);
  });
  // for zine in (magazines | flatMap('series') | unique('series'))
  eleventyConfig.addFilter('flatMap', (list, key) => list.flatMap((x) => x[key]));
  eleventyConfig.addFilter('unique', (list, key) => {
    const map = new Map(list.map((x) => [x[key], x]))
    return [...map.values()]
  });
  return {
    jsDataFileSuffix: '.data',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: '_site',
      output: 'public',
    },
  };
};