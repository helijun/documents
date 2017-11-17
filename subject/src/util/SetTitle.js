// 该方法是为了hack在IOS系统上设置微信webview的document.title失效的问题。
//@see http://bbs.csdn.net/topics/391937154 或者 http://blog.csdn.net/code_for_free/article/details/51195468
export default function setDocumentTitle(title) {
    let body = document.getElementsByTagName('body')[0];
    document.title = title;
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute("src", "http://named.cn/page/take/img/icon_phone.png");
    let d = function () {
        setTimeout(function () {
            iframe.removeEventListener('load', d);
            document.body.removeChild(iframe);
        }, 0);
    };
    iframe.addEventListener('load', d);
    console.log('enter')
    document.body.appendChild(iframe);
}