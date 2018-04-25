let gulp = require('gulp');
    connect = require('gulp-connect'),//本地server
    livereload   = require("gulp-livereload"),//实时刷新
    del = require('del'),
    rev = require('gulp-rev'),
    assetRev = require('gulp-asset-rev'),
    revCollector = require('gulp-rev-collector');//静态资源版本号
    sass = require('gulp-sass'),//编译scss --> css
    mincss = require('gulp-mini-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    imageMin = require('gulp-imagemin'), //图片压缩
    htmlmin = require('gulp-htmlmin'), //html压缩
    stripDebug = require('gulp-strip-debug'),//去掉调试信息
    autoprefixer = require('gulp-autoprefixer'),//给css自动添加兼容性前缀
    replace = require('gulp-replace'), //变量替换
    domSrc = require('gulp-dom-src'),//获取dom
    cheerio = require('gulp-cheerio'),
    header = require('gulp-header'), //添加头部注释
    runSequence = require('run-sequence'),//同步执行
    rename = require("gulp-rename"),//重命名
    proxy = require('http-proxy-middleware');//跨域代理

let annotation = '/** v1.0 by helijun **/ \n';
let path = {
    dev: './src', //开发根目录
    build: './dist', //生产根目录
    js: ['*.js', "!gulpfile.js", '!./node_modules/**/*.js'],
    css: ['*.css', '!./node_modules/**/*.css'],
    html: ['./src/**/*.html', '!./node_modules/**/*.html']
}
let reloadArray = [
    path.dev + '/assets/sass/**.scss',
    path.dev + '/assets/js/**.js',
    path.dev + '/*.html',
];

//使用connect启动一个Web服务器
gulp.task('server', function () {
    connect.server({
        name: 'erp',
        port: 418,
        root: path.dev,
        livereload: true
    });
});

//自动重新加载
gulp.task('reload-dev',function() {
    gulp.src(reloadArray)
    .pipe(connect.reload());
});
//编译sass
gulp.task('revSass', function () {
    gulp.src(path.dev + '/assets/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],//保留最近两个版本的前缀
            cascade: false
        }))
        .pipe(gulp.dest(path.dev + '/assets/css'));
});

//监听 -->> npm 实时刷新页面
gulp.task('watch', function() {
    gulp.watch(
        reloadArray,
        ['reload-dev', 'revSass']
    );
})

//按顺序执行server/watch task 
gulp.task('live', function(done) {
    condition = false;
    runSequence(//按顺序运行
        ['server'],
        ['watch'],
        done);
})

//build---------------------------------------------------------
gulp.task("revHtml", function() {
    gulp.src(path.html)
        .pipe(assetRev())
        .pipe(gulp.dest(path.build));
});
 
gulp.task("revCss",function () {
    return gulp.src(path.css)
        .pipe(assetRev())
        .pipe(gulp.dest(path.build))
});
gulp.task("revJs",function () {
    return gulp.src(path.js)
        .pipe(assetRev())
        .pipe(gulp.dest(path.build))
});

//复制移动 
gulp.task('copyCss', function () {
    gulp.src([
        path.dev + '/css/**/**.*'
    ])
    //.pipe(mincss())//默认不保留注释             -----因为css里面包含其他文件，暂时不压缩，下面js同理
    //.pipe(header(annotation))
    .pipe(gulp.dest(path.build + '/css'))
});

gulp.task('copyJs', function () {
    gulp.src([
        path.dev + '/js/**/**.*'
    ])
    //.pipe(stripDebug())//去掉js console.log
    //.pipe(uglify())//压缩js 不保留注释
    //.pipe(header(annotation))
    .pipe(gulp.dest(path.build + '/js'))

    gulp.src([
        path.dev + '/text.js',
        path.dev + '/css.js'
    ])
    .pipe(gulp.dest(path.build))
});



gulp.task('copyHtml', function () {
    gulp.src(path.dev + '/index.html')
        .pipe(gulp.dest(path.build))
    /*del([
        path.build + '/index.html'
    ], function(){
        
    });*/
})

gulp.task('moveHtml-zh', function () {
    gulp.src(path.build + '/index.html')
    .pipe(replace("./", "../"))
    .pipe(replace('lang="en"', 'lang="zh-CN"'))
    .pipe(gulp.dest(path.build + '/zh'))
})
gulp.task('moveHtml-zh-tw', function () {
    gulp.src(path.build + '/index.html')
    .pipe(replace("./", "../"))
    .pipe(replace('lang="en"', 'lang="zh-cmn-Hant"'))
    .pipe(gulp.dest(path.build + '/zh-tw'))
})

let i18n = require(path.dev + '/assets/i18n/i18n.js');
let i18nArrEN = ['copyHtml'];
let i18nArrZH = ['copyHtml'];
let i18nArrZHTW = ['copyHtml'];

for (const key in i18n) {
    i18nArrEN.push(key);
    gulp.task(key, function () {
        return gulp.src(path.build + '/index.html')
                .pipe(cheerio(function ($) {
                    let $el = $("*[data-i18n="+ key +"]");
                    $el.html(i18n[key]['en']);
                    console.log($el.html())
                }))
                .pipe(gulp.dest(path.build))
    });
}

for (const key in i18n) {
    i18nArrZH.push(key);
    gulp.task(key, function () {
        return gulp.src(path.build + '/index.html')
                .pipe(cheerio(function ($) {
                    let $el = $("*[data-i18n="+ key +"]");
                    $el.html(i18n[key]['zh']);
                    console.log('key', key)
                    console.log('value', i18n[key]['zh'])
                    console.log($el.html())
                }))
                .pipe(gulp.dest(path.build))
    });
}
i18nArrZH.push('moveHtml-zh');

for (const key in i18n) {
    i18nArrZHTW.push(key + '-zh-tw');
    gulp.task(key + '-zh-tw', function () {
        return gulp.src(path.build + '/index.html')
                .pipe(cheerio(function ($) {
                    let $el = $("*[data-i18n="+ key +"]");
                    $el.html(i18n[key]['zh-tw']);
                    console.log('key', key)
                    console.log('value', i18n[key]['zh-tw'])
                    console.log($el.html())
                }))
                .pipe(gulp.dest(path.build))
    });
}
i18nArrZHTW.push('moveHtml-zh-tw');

gulp.task('i18n:zh-tw', function(done) {
    condition = false;

    function doCallback(fn,args){    
        fn.apply(this, args);  
    } 
    i18nArrZHTW.push(done);
    doCallback(runSequence, i18nArrZHTW)
})

gulp.task('i18n:zh', function(done) {
    condition = false;

    function doCallback(fn,args){    
        fn.apply(this, args);  
    } 
    i18nArrZH.push(done);
    console.log('i18n:zh', i18nArrZH)
    doCallback(runSequence, i18nArrZH)
})

gulp.task('i18n:en', function(done) {
    gulp.src(path.dev + '/index.html')
        .pipe(gulp.dest(path.build))
})

//复制src
gulp.task('copySrc',function(){
    gulp.src([
              path.dev + '/src/assets/**.*', '!/src/assets/sass/**.*','!index.html'
         ])
        .pipe(gulp.dest(path.build))
})

//先删除原来的dist
gulp.task('clean:dist', function (cb) {
    del([
        path.build
    ], cb);
});

//按顺序执行
gulp.task('build', function(done) {
    condition = false;
    runSequence(//按顺序运行
        ['clean:dist'],
        ['copySrc'],
        done);
})




