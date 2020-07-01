module.exports = function (config) {

   config.addCollection('posts', collection => {
      return collection.getFilteredByGlob('_site/posts/*.md')
   });

   return {
      dir: {
         input: "_site",
         includes: "_templates",
         data: "_data",
         output: "dist"
      },
      templateFormats: ["html", "md", "njk"],
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk"
   }
}