var webpack = require("webpack");
var path = require("path");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules_dir = path.resolve(__dirname, "node_modules");
var pathToReact = path.resolve(node_modules_dir, "react/dist/react.min.js");
var pathToReactDOM = path.resolve(node_modules_dir, "react-dom/dist/react-dom.min.js");

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

const URL = {
    //AJAX: '/sw' //孙伟电脑
    AJAX: ''
}

module.exports = {
    devtool: false,
    entry:{
        app:path.resolve(__dirname,"main_production.js"),
        endor:["react","react-dom","react-router"] //基于类库代码的变动性和浏览器缓存策略，将外部提供的类库提取出来整合一个chunk
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].[chunkhash:8].bundle.js",
        chunkFilename: '[id].chunk.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets:["es2015","stage-0"],
                    plugins:[
                              "transform-object-rest-spread",
                              "transform-react-jsx",
                              "transform-object-assign",
                              "transform-flow-strip-types",
                              ["import", {
                                  style: 'css',  // 'less',
                                  libraryName: 'antd-mobile',
                              }]
                            ]
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test:/\.css$/,
                loader:"style-loader!css-loader!postcss-loader"
            },
            {
                test:/\.scss$/,
                loader:"style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test:/\.(png|jpg|gif|woff|svg|ttf)$/,
                loader:"url?limit=25000&name=images/[name].[ext]"
            },
            {
                test: require.resolve('./src/js/common.config'),//根据不用的环境来改变js变量（ajaxUrl）的值；
                loader: "imports-loader?URL=>" + JSON.stringify(URL)
            }
        ],
        noParse:[pathToReact,pathToReactDOM]//每当webpack尝试去解析那个压缩后的文件，我们阻止它，因为这不必要
    },
    postcss: [ autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }) ],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
    plugins:[
        new ExtractTextPlugin("[name].[chunkhash:8].css"),
        new webpack.optimize.CommonsChunkPlugin("vendor","vendor.[chunkhash:8].bundle.js"),
        //在1.x的webpack中，配置使用UglifyJsPlugin插件会会对其他loader造成影响。
        //其中一个例子就是,它会将loader的上下文环境的minimize字段设置为true，从而导致css-loader和postcss-loader中开启优化模式，删除了很多样式的浏览器厂商前缀（-webkit）
        //具体的解决方案是：给css-loader添加-autoprefixer参数来告诉css-loader，虽然你被某股不知名的力量强制进行压缩了，但是在压缩的时候关闭掉autoprefixer这个功能，不要强制删除某些你觉得不重要的前缀。
        //方案来源：@see: https://segmentfault.com/a/1190000009928590
        new webpack.optimize.UglifyJsPlugin({
            //压缩时候去除开发环境下的warning 提示
            compress:{
                warnings:false
            }
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:path.resolve(__dirname,"index_production.html"),
            inject:true,
            chunks:["app","vendor"]
        }),
        new webpack.DefinePlugin({//Tell Webpack to use Node's production environment
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
}