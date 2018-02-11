define([
    'common'
], function () {
    return function () {
        console.log('执行了test1.js')

        if (router.getUrlParameter('test1')){
            alert('居然还带参过来了。。。。。。。。。。。' + router.getUrlParameter('test1'))
        }

        if (router.getParam('test1')){
            alert('居然还隐藏的带了参。。。。。。。。。。。' + router.getParam('test1'))

            router.clear();
        }
    }
})