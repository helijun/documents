var path = require('path')
var ROOT = path.resolve(__dirname)
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
var autoprefixer = require("autoprefixer");

const AUTOPREFIXER_BROWSERS = [
	'ie_mob >= 10',
	'ff >= 40',
	'chrome >= 40',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 2.3',
	'bb >= 10'
];

//入口文件前置目录
let entryPath = ROOT + '/src';
//$开头的所有js(页面)入口
let $common = 'common';
let $header = 'js/base/header';
let $footer = 'js/base/footer';
let $index = 'js/index/index';
let $aboutUs = 'js/base/aboutUs';
let $cunguanIndex = 'js/cunguan/index';
let $wangdaiIndex = 'js/wangdai/index';
let $layui = 'plugin/layui/layui';
let $layuiForm = 'plugin/layui/lay/modules/form';
let $layuiLayer = 'plugin/layui/lay/modules/layer';
let $layuiJquery = 'plugin/layui/lay/modules/jquery';

let entryArray = [
		$common, 
		$header, 
		$footer, 
		$index, 
		$aboutUs,
		$cunguanIndex,
		$wangdaiIndex,
		$layui, 
		$layuiForm, 
		$layuiLayer, 
		$layuiJquery
	];

let entryList = {};
entryArray.forEach((v) => {
	if('common' === v ){
		entryList[v] = entryPath + '/js/common/' + v
	}else{
		entryList[v] = entryPath + '/' + v
	}
})

let config = {
	entry: entryList,
	output: {
		filename: '[name].js',
		path: ROOT + '/dist',
		publicPath: '/dist'
	},
	devServer: {
		contentBase: 'dist',
		host: '192.168.1.193',
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
				loader: ExtractTextPlugin.extract('style', 'css') 
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
			'mt-common': '../../js/common/common'  //../../开头的只能在页面级js中使用
		}
	},
	watch: true,
	postcss: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
}

let plugins = [
	new ExtractTextPlugin('[name].css'),
	new webpack.DefinePlugin({
		'ENV': JSON.stringify(process.env.ENV)
	}),
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery'
	}),
	new HtmlWebpackHarddiskPlugin()
];

//满足通用的chunks页面模板数组
let commonPage = [$header, $footer, $aboutUs, $cunguanIndex, $wangdaiIndex];

commonPage.forEach((v) => {
	let chunks = [$common, v];
	if(
		v === $cunguanIndex ||
		v === $aboutUs || 
		v === $wangdaiIndex
	){
		chunks.push($layui)
	}

	console.log('chunck', chunks)

	plugins.push(
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			favicon: './favicon.ico',
			filename: config.output.path + '/' + v.replace('js', 'page') + '.html',
			template: entryPath + '/' + v.replace('js', 'page') + '.html',
			chunks: chunks,
			chunksSortMode: 'manual',//让chunk按顺序加载
			hash: true
		})
	)
})

//不满足上面通用的页面模板（如首页），在这里push
plugins.push(
	new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		favicon: './favicon.ico',
		filename: config.output.path + '/index.html',
		template: ROOT + '/index.html',
		chunks: [$layui, $common, $index],
		chunksSortMode: 'manual',
		hash: true
	})
)

//生产环境开启压缩
if (process.env.ENV !== 'dev'){
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	)
}else{
	//开发环境开启热加载
	plugins.push(
		new webpack.HotModuleReplacementPlugin()
	)
}

config.plugins = plugins;

console.log('config', JSON.stringify(config))
module.exports = config;