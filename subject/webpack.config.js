const autoprefixer = require("autoprefixer");
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
    AJAX: '/sw'
}

module.exports = {
    entry: './main.js', // 入口文件路径
    output: {
        path: '/',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        host: '192.168.1.104',
        port: 2018
    },
    module: {
        loaders: [
            {
                test: /\.js$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "stage-0"],
                    plugins: [
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
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test:/\.(png|jpg|gif|woff|svg|ttf)$/,
                loader:"url?limit=25000&name=images/[name].[ext]"
            },
            {
                test: require.resolve('./src/js/common.config'),//根据不用的环境来改变js变量（ajaxUrl）的值；
                loader: "imports-loader?URL=>" + JSON.stringify(URL)
            }
        ]
    },
    postcss: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
    watch: true
}