const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require ('path');
const webpack = require('webpack');
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
});
var isProd = process.env.NODE_ENV === "production";
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssConfig = isProd ? cssProd : cssDev;

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
				use: cssConfig
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
		hot: true,
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
			    filename: "[name].[contenthash].css",
			    disable: process.env.NODE_ENV === "development"
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
  	]
}
