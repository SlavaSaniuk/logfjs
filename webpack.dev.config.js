const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RenameOutputPlugin = require('rename-output-webpack-plugin');
const environment = require('./env.js');

//Webpack configuration
module.exports = env =>  {

	return {
		// Entrypoint
		entry:{
			'index': './src/LogfjsIndex.js'
		},

		// Developemnt mode
		mode: 'development',

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
		// Generate html output
		new HtmlWebpackPlugin({
			title: "Development html."
		}),
		// Clean dist folder
		new CleanWebpackPlugin(),
	    new RenameOutputPlugin({
	    	'index': environment.LIBRARY_NAME +'.' +environment.LIBRARY_VERSION +'.' +env.profile +'.js'
	    }),
		]
	}
};
;