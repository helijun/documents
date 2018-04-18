var exploreVersion = getExplore();
if (
    (exploreVersion &&
        exploreVersion.indexOf('IE') > -1 &&
        parseInt(exploreVersion.split(":")[1]) < 11)
) {
    window.location.href = '../../page/info/no-compatible.html'
}

var isMicroMessenger = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
if (isMicroMessenger) {
    window.location.href = '../../page/info/no-compatible.html'
}

function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;

    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :


        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :


            (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :


                (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :


                    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :


                        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :


                            (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;

    // 根据关系进行判断

    if (sys.ie) return ('IE:' + sys.ie)


    if (sys.edge) return ('EDGE:' + sys.edge)


    if (sys.firefox) return ('Firefox:' + sys.firefox)


    if (sys.chrome) return ('Chrome:' + sys.chrome)


    if (sys.opera) return ('Opera:' + sys.opera)


    if (sys.safari) return ('Safari:' + sys.safari)

    if (sys.micromessenger) return ('micromessenger:' + sys.micromessenger)

    return 'Unkonwn'

}