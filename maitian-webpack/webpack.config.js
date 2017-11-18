var path = require('path')
var ROOT = path.resolve(__dirname)
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('[name].css')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
var autoprefixer = require("autoprefixer");

var AUTOPREFIXER_BROWSERS = [
	'ie_mob >= 10',
	'ff >= 40',
	'chrome >= 40',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 2.3',
	'bb >= 10'
];

module.exports = {
	entry: {
		'page2/main': ROOT + '/src/page2/main'
	},
	output: {
		filename: '[name].js',
		path: ROOT + '/dist',
		publicPath: '/dist'
	},
	module: {
		loaders: [
			{
			    test: /\.js$/,
			    loader: "babel",
			    exclude: /node_modules/
			}, 
			{
				test: /.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader"),
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		alias: {
			pages: ROOT + '/pages'
		}
	},
	postcss: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
	watch: true,
	plugins: [
		extractCSS,
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: ROOT + '/pages/html/page2.html',
			template: ROOT + '/pages/tpl/page2.html',
			chunks: ['page2/main'],
			minify: {
				removeAttributeQuotes: true // 移除属性的引号
			},
			hash: true
		}),
		new HtmlWebpackHarddiskPlugin(),
	]
}