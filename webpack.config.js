const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require ('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
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
      		template: './src/index.html'
    	}),
    	new ExtractTextPlugin({
    		filename: 'app.css'
    	})
  	]
}