var gulp = require('gulp');
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
    header = require('gulp-header'), //添加头部注释
    runSequence = require('run-sequence'),//同步执行
    proxy = require('http-proxy-middleware');//跨域代理

var annotation = '/** v1.0 by helijun **/ \n';
var path = {
    dev: './src', //开发根目录
    build: './dist', //生产根目录
    js: ['*.js', "!gulpfile.js", '!./node_modules/**/*.js'],
    css: ['*.css', '!./node_modules/**/*.css'],
    html: ['./src/**/*.html', '!./node_modules/**/*.html']
}
var reloadArray = [
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

//替换变量
gulp.task('replace', function () {
    gulp.src(path.dev + '/config.js')
        .pipe(replace("(new Date()).getTime()", (new Date()).getTime())) 
        .pipe(replace("PAGE: '/'", "PAGE: '/erp/'")) 
        //.pipe(stripDebug())//去掉js console.log
        //.pipe(uglify())//压缩js 不保留注释
        //.pipe(header(annotation))
        .pipe(gulp.dest(path.build))
});

//复制并压缩图片
gulp.task('copyImage',function(){
	gulp.src([
	          path.dev + '/images/**/**.*'
	     ])
        //.pipe(imageMin({progressive: true}))
        .pipe(gulp.dest(path.build + '/images'))
})

//复制字体文件
gulp.task('copyFont',function(){
	gulp.src([
	          path.dev + '/fonts/**/**.*'
	     ])
        .pipe(gulp.dest(path.build + '/fonts'))
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
        ['revJs'],
        ['revCss'],
        ['revHtml'],
        ['copyImage'],
        ['copyJs'],
        ['replace'],
        ['copyCss'],
        ['copyFont'],
        done);
})