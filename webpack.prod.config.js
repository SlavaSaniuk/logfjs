const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RenameOutputPlugin = require('rename-output-webpack-plugin');
const environment = require('./env.js'); // Custom env variables from 'env.js'

//Webpack configuration
module.exports = env => {

	return {

		// entrypoint
		entry:{
			'index': './src/LogfjsIndex.js'
		},

		// Production mode
		mode: 'production',

		// Path to bundle
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: '[name].js',
			library: "",
			libraryTarget: 'umd'
		},

		// Modules
		module: {
			rules: [
			// Babel loader:
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			}
		]},

		// Plugins
		plugins: [
		// Clean dist folder
		new CleanWebpackPlugin(),
		// Rename output bundle
	    new RenameOutputPlugin({
	    	'index': environment.LIBRARY_NAME +'.' +environment.LIBRARY_VERSION +'.' +env.profile +'.js'
	    }),
		]

	}
};