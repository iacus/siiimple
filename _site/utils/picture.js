// Generate an picture tag with image src URLs which use Neltify image transforms

// Lazy sourceset in TEST
module.exports = (url, alt = "Missing alt text",picClass,lazy = false) => {
  if (lazy !== 'lazy') {
    return `<picture class="${picClass}">
    <source srcset="/images/${url}?nf_resize=fit&w=700" media="(min-width: 1200px)">
    <source srcset="/images/${url}?nf_resize=fit&w=600" media="(min-width: 740px)">
    <img src="/images/${url}?nf_resize=fit&w=500" alt="${alt}" />
  </picture>`;
} else {
  return `<picture>
  <source data-srcset="/images/${url}?nf_resize=fit&w=700" media="(min-width: 1200px)">
  <source data-srcset="/images/${url}?nf_resize=fit&w=600" media="(min-width: 740px)">
  <img data-src="/images/${url}?nf_resize=fit&w=500" alt="${alt}" />
</picture>`;
}

};
