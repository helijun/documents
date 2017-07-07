var gulp = require('gulp'),
    connect = require('gulp-connect'),//本地server
    livereload   = require("gulp-livereload"),//实时刷新
    runSequence = require('run-sequence'),//同步执行
    mincss = require('gulp-mini-css'),//css压缩   
    uglify = require('gulp-uglify'),//js压缩
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),//静态资源版本号
    concat = require('gulp-concat'),//文件合并
    stripDebug = require('gulp-strip-debug'),//去掉调试信息
    amdOptimize = require("amd-optimize"),//requirejs优化
    rename = require('gulp-rename'),//文件重命名
    clean = require('gulp-clean'),//文件清理
    notify = require("gulp-notify");//消息提示

var path = {
    dev: './src/', //开发根目录
    build: './dist/' //生成根目录
}

//使用connect启动一个Web服务器
gulp.task('server', function () {
    connect.server({
        name: 'dev h5',
        port: 8888,
        root: path.dev,
        livereload: true
    });
});
gulp.task('reload-dev',function() {
    gulp.src(path.dev + 'html/**/*.html')
      .pipe(connect.reload());
});

//开启一个监听
gulp.task('watch', function() {
    gulp.watch(path.dev + 'html/**/*.html',['reload-dev']);
})
//按顺序执行server/watch task
gulp.task('live', function(done) {
    condition = false;
    runSequence(//按顺序运行
        ['server'],
        ['watch'],
        done);
})

//压缩js
gulp.task('minjs', function() {
    gulp.src(path.dev + '/js/**/*.js')
        .pipe(stripDebug())//去掉console.log
        .pipe(uglify())//不保留注释
        .pipe(rename({suffix: '.min'}))//重命名为*.min
        .pipe(gulp.dest(path.build + '/js'));//输出
});
//压缩css
gulp.task('mincss', function () {
    gulp.src(path.dev + '/css/**/*.css')
        .pipe(mincss())//默认不保留注释
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build + '/css'))
});

//合并js
gulp.task('concatjs', function(){
    gulp.src(path.dev + '/css/**/*.css')
        .pipe(stripDebug())
        .pipe(uglify())//先压缩
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build + '/js/concat'));
});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    gulp.src(path.dev + 'css/**/*.css')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.build + '/css'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    gulp.src(path.dev + 'js/**/*.js')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.build + '/js'));
});
//Html替换css、js文件版本
gulp.task('revHtml', function () {
    gulp.src([path.build + '**/*.json', path.dev + 'html/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.build + '/html'));
});

//按顺序执行revCss/revJs/revHtml task
gulp.task('md5', function(done) {
    condition = false;
    runSequence(//按顺序运行
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
})

gulp.task("require", function () {  
   gulp.src(path.dev + '/js/**/*.js')
    .pipe(amdOptimize('config',{
        configFile: './config.js',
        findNestedDependencies: true,
        include: false
    }))  
    .pipe(concat("lottery.js"))      //合并后的文件，如何合并后的文件和主入口名一样，构建后便只有一个文件  
    .pipe(gulp.dest("build"));  //输出目录  
});


gulp.task('help',function () {
    console.log('----------------- 一个神奇的工具gulp -----------------');
    console.log('task-- md5       按顺序执行revCss/revJs/revHtml task');
    console.log('task-- revHtml       Html替换css、js文件版本');
    console.log('task-- revJs       js生成文件hash编码并生成 rev-manifest.json文件名对照映射');
    console.log('task-- revCss       //js生成文件hash编码并生成 rev-manifest.json文件名对照映射');
    console.log('task-- concatjs       合并js  ');
    console.log('task-- mincss       压缩css  ');
    console.log('task-- minjs       压缩js  ');
    console.log('task-- server       按顺序执行server/watch task  ');
    console.log('task-- live       使用connect启动一个Web服务器');
    console.log('----------------- END -----------------');
});