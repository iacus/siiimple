module.exports = function (config) {

   config.addCollection('menu', collection => {
      return collection.getFilteredByGlob('_site/collections/menu/*.md')
   });

   config.addFilter('markdown', function(value) {
      let markdown = require('markdown-it')({
          html: true
      });
      return markdown.render(value);
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
