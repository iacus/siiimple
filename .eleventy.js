module.exports = function(config) {

  let sortArray = []

  config.addCollection('menu', collection => {
      // Guardamos en el array sortArray los elementos los items buscados
      collection.getFilteredByGlob('_site/collections/utils/collectionOrder.md').map((a) => {
           a.data.collection.map((a) => {
             sortArray.push(a.title)
           })
      })

    // Primero filtramos el array quitando los elementos que no están
     const collectionSorted = collection.getFilteredByGlob('_site/collections/menu/*.md').filter((a) => {
       // Chequeamos que está dentro del array (mayor que 0)
       if (sortArray.indexOf(a.data.title) >= 0) {
         return 1
       }
     })
     // Despues lo ordenamos según el array de orden
     collectionSorted.sort((a,b) => {
       return sortArray.indexOf(a.data.title) - sortArray.indexOf(b.data.title);
     })
     // Devolvemos el array
     return collectionSorted

  });

  config.addFilter('markdown', function(value) {
    let markdown = require('markdown-it')({
      html: true
    });
    return markdown.render(value);
  });

  config.addFilter('nospaces', function(value) {
    return value.replace(/\s/g, '');
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
