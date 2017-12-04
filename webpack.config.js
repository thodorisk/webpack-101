const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
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