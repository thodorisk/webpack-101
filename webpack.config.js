const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require ('path');

module.exports = {
	entry: {
		app: './src/app.js',
		about: './src/about.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	devtool: "source-map",
	module:{
		rules: [
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
          			fallback: "style-loader",
          			use: ['css-loader', 'sass-loader']
        		})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		stats: 'errors-only'
	},
  	plugins: [
    	new HtmlWebpackPlugin({
      		title: 'Homepage',
      		hash: true,
      		excludeChunks: ['about'],
      		template: './src/index.html'
    	}),
    	new HtmlWebpackPlugin({
      		title: 'About',
      		chunks: ['about'],
      		hash: true,
      		filename: 'about.html',
      		template: './src/about.html'
    	}),
    	new ExtractTextPlugin({
    		filename: 'app.css',
    		allChunks: true
    	})
  	]
}