const merge = require('lodash/merge');

module.exports = merge(require('@centreon/frontend-core/jest'), {
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
});
