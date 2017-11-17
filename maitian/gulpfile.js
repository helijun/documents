var gulp = require('gulp'),
    connect = require('gulp-connect'),//本地server
    livereload   = require("gulp-livereload"),//实时刷新
    runSequence = require('run-sequence'),//同步执行
	sass = require('gulp-sass'),//编译scss --> css
	autoprefixer = require('gulp-autoprefixer'),//给css自动添加兼容性前缀
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
    live: './src/main/webapp/'
}
//使用connect启动一个Web服务器
gulp.task('server', function () {
    connect.server({
        name: 'dev ntpc dist',
        port: 2017,
        root: path.live,
        livereload: true
    });
});
gulp.task('reload-dev',function() {
    gulp.src(path.live + '*.*')
      .pipe(connect.reload());
});
//编译sass
gulp.task('revSass', function () {
    gulp.src(path.live + 'dist/static/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(mincss())//默认不保留注释
        .pipe(gulp.dest(path.live + 'dist/static/css'));
});

//监听 -->> 开发环境实时编译sass、以及实时刷新页面
gulp.task('watch', function() {
    gulp.watch(
        [path.live + '**/*.html', path.live + 'dist/static/sass/**/*.scss'],
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