var gulp = require('gulp'),
    connect = require('gulp-connect'),//本地server
    livereload   = require("gulp-livereload"),//实时刷新
    runSequence = require('run-sequence'),//同步执行
	sass = require('gulp-sass'),//编译scss --> css
    autoprefixer = require('gulp-autoprefixer'),//给css自动添加兼容性前缀
    proxy = require('http-proxy-middleware'),//跨域代理
	mincss = require('gulp-mini-css');//css压缩   
    /* 
    
    uglify = require('gulp-uglify'),//js压缩
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),//静态资源版本号
    concat = require('gulp-concat'),//文件合并
    stripDebug = require('gulp-strip-debug'),//去掉调试信息
    sass = require('gulp-sass'),//编译scss --> css
    amdOptimize = require("amd-optimize"),//requirejs优化
    rename = require('gulp-rename'),//文件重命名
    clean = require('gulp-clean'),//文件清理
    notify = require("gulp-notify");//消息提示 */
    
var path = {
    live: './src/'
}
//使用connect启动一个Web服务器
gulp.task('server', function () {
    connect.server({
        name: 'dev hs dist',
        port: 1224,
        root: path.live,
        livereload: true,
        /* middleware: function (connect, opt) {
            return [
                proxy('/facemeeting', {
                    target: 'http://39.108.233.191:8081/facemeeting',
                    headers: { 
                        host: '127.0.0.1' 
                    },
                    cookieDomainRewrite: "http://39.108.233.191:8081/",
                    changeOrigin: true
                })
            ]
        } */
    });
});
gulp.task('reload-dev',function() {
    gulp.src(path.live + '*.*')
      .pipe(connect.reload());
});
//编译sass
gulp.task('revSass', function () {
    gulp.src(path.live + 'sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(mincss())//默认不保留注释
        .pipe(gulp.dest(path.live + 'css'));
});

//监听 -->> 开发环境实时编译sass、以及实时刷新页面
gulp.task('watch', function() {
    gulp.watch(
        [path.live + '**/*.html', path.live + 'sass/**/*.scss'],
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