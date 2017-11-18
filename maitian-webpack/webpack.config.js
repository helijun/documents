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

var entryList = {
	'js/index/index': ROOT + '/src/js/index/index'
};

var pageArray = [
	new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: ROOT + '/dist/index.html',
		template: ROOT + '/index.html',
		chunks: ['common', 'js/index/index'],
		minify: {
			removeAttributeQuotes: true, // 移除属性的引号
			removeComments: true, //移除html注释
		},
		hash: true
	}),
	new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: ROOT + '/dist/page/base/one1.html',
		template: ROOT + '/src/page/base/one.html',
		chunks: ['common', 'js/index/index'],
		minify: {
			removeAttributeQuotes: true, // 移除属性的引号
			removeComments: true, //移除html注释
		},
		hash: true
	}),

]

module.exports = {
	entry: entryList,
	output: {
		filename: '[name].js',
		path: ROOT + '/dist',
		publicPath: '/dist'
	},
	devServer: {
        contentBase: 'dist',
        host: '0.0.0.0',
        port: 1118, 
        inline: true, //可以监控js变化
        hot: true, //热启动
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
	externals: {
		jQuery: 'window.jQuery'
	},
	resolve: {
		alias: {
			//pages: ROOT + '/pages'
		}
	},
	postcss: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
	watch: true,
	plugins: [
		extractCSS,
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: ROOT + '/dist/index.html',
			template: ROOT + '/index.html',
			chunks: ['common', 'js/index/index'],
			minify: {
				removeAttributeQuotes: true, // 移除属性的引号
				removeComments: true, //移除html注释
			},
			hash: true
		}),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: ROOT + '/dist/page/base/one.html',
			template: ROOT + '/src/page/base/one.html',
			chunks: ['common', 'js/index/index'],
			minify: {
				removeAttributeQuotes: true, // 移除属性的引号
				removeComments: true, //移除html注释
			},
			hash: true
		}),
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin('common','common.js'),
		new HtmlWebpackHarddiskPlugin(),
	]
}