const merge = require('babel-merge');

const configuration = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ],
  plugins: ['@babel/proposal-class-properties'],
};

module.exports = {
  env: {
    production: configuration,
    development: configuration,
    test: merge(configuration, {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: ['require-context-hook'],
    }),
  },
};
