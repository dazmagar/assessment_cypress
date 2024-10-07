const { defineConfig } = require('cypress');

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: 'cypress/test-results',
        overwrite: false,
        html: true,
        json: true,
        charts: true
    },
    e2e: {
        baseUrl: 'https://delivery.publix.com',
        supportFile: './cypress/support/e2e.js',
        specPattern: 'tests/**/*.spec.js',
        chromeWebSecurity: false,
        defaultCommandTimeout: 5000,
        viewportWidth: 1920,
        viewportHeight: 1080,
        env: {
            productFilePath: 'cypress/test-results/productInfo.json',
            pacingTimeConst: 500,
            pacingTimeDev: 250
        },
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
            return require('./cypress/plugins/index.js')(on, config);
        }
    }
});
