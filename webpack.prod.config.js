const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//Webpack configuration
const webpack_config = {

	//entrypoint
	entry: './src/LogfjsIndex.js',

	//Developemnt mode
	mode: 'production',

	//Path tu bundle
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'logfjs.prod.js',
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
		new CleanWebpackPlugin()
	],
};

//Export webpack config
module.exports = webpack_config;