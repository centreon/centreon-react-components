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
					test: /\.css$/,
					include: path.resolve(__dirname, '..'),
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[local]__[hash:base64:5]',
								},
								sourceMap: true,
							},
						},
						'sass-loader',
					],
					include: path.resolve(__dirname, '..'),
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
