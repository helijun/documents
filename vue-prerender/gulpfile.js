var gulp = require('gulp'),
    connect = require('gulp-connect'); //本地server
    
var path = {
    live: './src/',
    dist: './dist/'
}
//使用connect启动一个Web服务器，用来验证dist prerender
gulp.task('server', function () {
    connect.server({
        port: 822,
        root: path.dist,
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