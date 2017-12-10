const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

//CSS configuration
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader', 'sass-loader']
});
const isProd = process.env.NODE_ENV === "production";
const cssDev = ['style-loader','css-loader', 'postcss-loader', 'sass-loader'];
const cssConfig = isProd ? cssProd : cssDev;

//Bootstrap configuration
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;


module.exports = {
	entry: {
    fontAwesome: 'font-awesome/scss/font-awesome.scss',
		app: './src/app.js',
		about: './src/about.js',
    bootstrap: bootstrapConfig
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module:{
		rules: [
			{
				test: /\.(css|scss)$/,
				use: cssConfig
			},
      {
        test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
						'file-loader?name=images/[name][hash:6].[ext]',
						'image-webpack-loader'
					]
			},
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&name=fonts/[name].[ext]',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, use: 'imports-loader?jQuery=jquery'
      },
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' }
        ]
},
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
			    filename: "/css/[name].css",
			    disable: process.env.NODE_ENV === "development",
          allChunks: true
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin({
          postcss: [autoprefixer],
      }),
      new PurifyCSSPlugin({
          paths: glob.sync(path.join(__dirname, 'src/*.html')),
          purifyOptions: { info: true, minify: true }
      }),
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          tether: 'tether',
          Tether: 'tether',
          'window.Tether': 'tether',
          Popper: ['popper.js', 'default'],
          'window.Tether': 'tether',
          Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
          Button: 'exports-loader?Button!bootstrap/js/dist/button',
          Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
          Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
          Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
          Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
          Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
          Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
          Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
          Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
          Util: 'exports-loader?Util!bootstrap/js/dist/util'
      })
  	]
}
