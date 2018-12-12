var gulp = require('gulp'),
    connect = require('gulp-connect');//本地server  用来验证build
    
    
var path = {
    live: './'
}
//使用connect启动一个Web服务器
gulp.task('server', function () {
    connect.server({
        name: 'mt build',
        port: 1123,
        root: path.live
    });
});