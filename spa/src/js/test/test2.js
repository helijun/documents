define([
    'common'
], function () {
    return function () {

        setTimeout(function () {
            $('.module-test1').html('5秒后将跳转到page-test1..............................');
        }, 2000);
        

        setTimeout(function() {
            router.to('page-test1')
        }, 5000);

        console.log('执行了test2.js')
    }
})