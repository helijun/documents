var path = require('path')
var ROOT = path.resolve(__dirname)
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
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
	'common': ROOT + '/src/js/common/common',
	'page/common/header': ROOT + '/src/page/common/header',
	'js/index/index': ROOT + '/src/js/index/index'
};

module.exports = {
	entry: entryList,
	output: {
		filename: '[name].js',
		path: ROOT + '/dist',
		publicPath: '/dist'
	},
	devServer: {
        contentBase: 'dist',
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
	　　　　　　 test: /\.html$/,
	　　　　　　 loader: 'html-withimg-loader'
	 　　　　},
			{
				test: /\.html$/,
				loader: "raw-loader" 
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=8192&name=[path][name].[ext]'
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!postcss-loader"
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
	watch: true,
	postcss: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: ROOT + '/dist/page/common/header.html',
			template: ROOT + '/src/page/common/header.html',
			chunks: ['common', 'page/common/header'],
			minify: {
				removeAttributeQuotes: true, // 移除属性的引号
				removeComments: true, //移除html注释
			},
			hash: true
		}),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			favicon: './favicon.ico',
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', // 不用.js后缀
			chunks: ['common'] //对应entry
		}),
		new HtmlWebpackHarddiskPlugin()
	]
}