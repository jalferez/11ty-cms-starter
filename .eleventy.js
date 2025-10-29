module.exports = function(eleventyConfig) {
  //Filters
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  //Passthroughs
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");

  //Watch targets for css n js

  eleventyConfig.addWatchTarget("assets/css/");
  eleventyConfig.addWatchTarget("assets/js/");


  //Collections
  eleventyConfig.addCollection("bread", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/cms_content/bread/*.md");
  });

  //Directory settings 
  return {
    dir: {
      input: "content",            
      includes: "../_includes",    
      layouts: "../_includes",
      output: "_site"              
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
