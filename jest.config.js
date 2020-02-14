const jestConfig = require('@centreon/frontend-core/jest');
const merge = require('lodash/merge');

module.exports = merge(jestConfig, {
  roots: ['<rootDir>/src/'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
});
