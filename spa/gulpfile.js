const gulp = require('gulp'),
    connect = require('gulp-connect'),//本地server
    livereload   = require("gulp-livereload"),//实时刷新
    runSequence = require('run-sequence'),//同步执行
    del = require('del'), //删除文件
    babel = require('gulp-babel'),
    es2015 = require("babel-preset-es2015"),
    webpack = require("gulp-webpack"),
    vinylPaths = require('vinyl-paths'),
    concat = require('gulp-concat'),//合并文件
    htmlreplace = require('gulp-html-replace'),//html文件替换
    sass = require('gulp-sass'),//编译scss --> css
    mincss = require('gulp-mini-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    imageMin = require('gulp-imagemin'), //图片压缩
    htmlmin = require('gulp-htmlmin'), //html压缩
    stripDebug = require('gulp-strip-debug'),//去掉调试信息
    autoprefixer = require('gulp-autoprefixer'),//给css自动添加兼容性前缀
    replace = require('gulp-replace'), //变量替换
    header = require('gulp-header'), //添加头部注释
    proxy = require('http-proxy-middleware');//跨域代理
    
const annotation = '/** v1.0 by helijun **/ \n';
const path = {
    live: './src/',
    dist: './dist/'
}
//使用connect启动一个Web服务器
gulp.task('server', function () {
    connect.server({
        name: 'dev hs src',
        port: 1829,
        root: path.live,
        //root: path.dist,
        livereload: true,
        /* middleware: function (connect, opt) {
            return [
                proxy('/facemeeting', {
                    target: 'http://192.168.31.111:8088/facemeeting',
                    changeOrigin: true
                })
            ]
        } */
    });
});

//自动重新加载
gulp.task('reload-dev',function() {
    gulp.src([
        path.live + '**.*', 
        path.live + 'indext.html',
        path.live + 'js/**.js',
        path.live + 'tpl/**/*.tpl'
    ])
    .pipe(connect.reload());
});

// 编译并合并js
gulp.task('revEs', function () {
    gulp.src(path.live + 'es/**/*.js')
        .pipe(babel({ presets: [es2015] }))
        .pipe(gulp.dest(path.live + 'js'))//es6转js必须在webpack之前，否则webpack找不到要包装的js会报错
        .pipe(webpack({//babel编译import会转成require，webpack再包装以下代码让代码里支持require
            entry: path.live + "js/base/index.js",
            output: {
                filename: "all.js",
            }
        }))
        .pipe(gulp.dest(path.live + 'js'))
})

//先删除原来的all.js
gulp.task('clean:all.js', function (cb) {
    del([
        path.live + 'js/all.js'
    ], cb);
});

//编译sass、合并
gulp.task('revSass', function () {
    gulp.src(path.live + 'sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],//保留最近两个版本的前缀
            cascade: false
        }))
        .pipe(concat('all.css')) //合并css
        .pipe(mincss()) //压缩css
        .pipe(gulp.dest(path.live + 'css'));
});

//初次run push依赖插件
gulp.task('pushToHtml', function () {
    gulp.src(path.live + 'index.html')
        .pipe(htmlreplace({
            'css': './css/all.css',
            'js': ['./plugin/jquery/jquery-3.1.0.min.js', './js/all.js']
        }))
        .pipe(gulp.dest(path.live))
})

//给html引用的资源添加版本号
gulp.task('pushHtmlVersion', function () {
    var version = 'v=' + new Date().getTime();
    gulp.src(path.live + 'index.html')
        .pipe(gulp.dest(path.live))
})

//监听 -->> 开发环境实时编译sass、以及实时刷新页面
gulp.task('watch', function() {
    gulp.watch(path.live + 'sass/**/*.scss', ['revSass']);
    gulp.watch(path.live + 'es/**/*.js', ['revEs']);
    gulp.watch(path.live + '**/*.*', ['pushHtmlVersion', 'reload-dev']);
})

//按顺序执行server/watch task 
gulp.task('live', function(done) {
    condition = false;
    runSequence(//按顺序运行
        ['server'],
        ['watch'],
        done);
})


/** -------------------------生产构建------------------------------------- */
//复制移动 
gulp.task('copyCss', function () {
    gulp.src([
        path.live + 'css/**/**.*'
    ])
    .pipe(mincss())//默认不保留注释
    .pipe(header(annotation))
    .pipe(gulp.dest(path.dist + 'css'))
});

gulp.task('copyJs', function () {
    gulp.src([
        path.live + 'js/**/**.*'
    ])
    .pipe(stripDebug())//去掉js console.log
    .pipe(uglify())//压缩js 不保留注释
    .pipe(header(annotation))
    .pipe(gulp.dest(path.dist + 'js'))
});

//先删除原来的dist
gulp.task('clean:dist', function (cb) {
  del([
	path.dist
  ], cb);
});

//复制并压缩图片
gulp.task('copyImage',function(){
	gulp.src([
	          path.live + 'img/**/**.*'
	     ])
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest(path.dist + 'img'))
})

//复制并处理html 
gulp.task('copyHtml', function () {
    const options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src([
	          path.live + 'index.html'
         ])
        .pipe(replace("./", ""))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(path.dist))
        
    gulp.src([
	          path.live + 'page/**/**.*'
	     ])
        .pipe(htmlmin(options))
        .pipe(gulp.dest(path.dist + 'page'))
});

//替换变量
gulp.task('replace', function () {
    gulp.src(path.live + 'config.js')
        .pipe(replace("(new Date()).getTime()", (new Date()).getTime())) 
        .pipe(replace("PAGE: '/'", "PAGE: '/meeting/'")) 
        .pipe(replace("/page/apply/index.html", "/meeting/page/apply/index.html")) 
        .pipe(stripDebug())//去掉js console.log
        .pipe(uglify())//压缩js 不保留注释
        .pipe(header(annotation))
        .pipe(gulp.dest(path.dist))
});

//复制不需要处理的文件
gulp.task('copyNoHandle', function () {
	gulp.src([
	          path.live + 'css.js',
	          path.live + 'text.js',
	          path.live + 'favicon.ico'
	    ])
        .pipe(gulp.dest(path.dist))
    
    gulp.src([
        path.live + 'tpl/**/**.*',
    ])
    .pipe(gulp.dest(path.dist + 'tpl'))

	gulp.src([
            path.live + 'plugin/**/**.*',
    ])
    .pipe(gulp.dest(path.dist + 'plugin'))
        
    gulp.src([
            path.live + 'font/**/**.*',
    ])
    .pipe(gulp.dest(path.dist + 'font'))
        
    gulp.src([
            path.live + 'json/**/**.*',
    ])
    .pipe(gulp.dest(path.dist + 'json'))
});

//构建一个服务器来验证生产环境
gulp.task('server-build', function () {
    connect.server({
        name: 'build hs dist',
        port: 1819,
        root: path.dist
    });
});
//按顺序执行 copy、replace
gulp.task('build', function (done) {
    condition = false;
    runSequence(
        ['copyCss'],
        ['copyJs'],
        ['copyImage'],
        ['copyHtml'],
        ['copyNoHandle'],
        ['replace'],
        done);
})