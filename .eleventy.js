module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");

  eleventyConfig.addShortcode("copyrightYear", () => {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
