const path = require('path');

//Webpack configuration
const webpack_config = {

	//entrypoint
	entry: './src/LogfjsIndex.js',

	//Developemnt mode
	mode: 'development',

	//Path tu bundle
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'logfjs.js',
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

	plugins: [],
};

//Export webpack config
module.exports = webpack_config;