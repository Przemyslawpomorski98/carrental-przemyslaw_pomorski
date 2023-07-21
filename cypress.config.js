const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://qalab.pl.tivixlabs.com/',
    specPattern: "cypress/e2e/*.feature",
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
  },
});
