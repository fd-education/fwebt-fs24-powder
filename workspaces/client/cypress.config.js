const { defineConfig } = require("cypress");
const webpackConfig = require("./webpack.config");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    specPattern: "./tests/cypress-tests/**/*.spec.tsx",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
