const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, { bundler: 'vite' }),
    baseUrl: 'http://localhost:4200',
  },
});
