const path = require('path');

const storiesPath = '../src/**/*.stories';

module.exports = {
  stories: [`${storiesPath}.jsx`, `${storiesPath}.tsx`],
  addons: [],
  webpackFinal: (config) => ({
    ...config,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      ...config.module,
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, '..'),
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, '..'),
          exclude: /node_modules/,
          use: ['babel-loader', 'awesome-typescript-loader'],
        },
        {
          test: /\.s?[ac]ss$/i,
          include: path.resolve(__dirname, '..'),
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(?:woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
        },
        {
          test: /\.(?:png|jpg|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
          },
        },
      ],
    },
  }),
};
