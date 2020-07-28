const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//Webpack configuration
const webpack_config = {

	//entrypoint
	entry: './src/LogfjsIndex.js',

	//Developemnt mode
	mode: 'development',

	//Path tu bundle
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'logfjs.dev.js',
		library: "",
		libraryTarget: 'umd'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			}
		]
	},

	plugins: [
	// Generate html output
	new HtmlWebpackPlugin({
			title: "Development html."
		}),
	// Clean dist folder
	new CleanWebpackPlugin() 
	],
};

//Export webpack config
module.exports = webpack_config;