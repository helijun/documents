/* eslint-disable */

// 通用方法集

import isType from './isType'
import qs from 'qs'

// 路由跳转时url参数会被覆盖,所以仅在首次进入时读取
// href = path + search + hash || path + hash + search
let search = location.href.split('?')[1] || ''
search = search.split("#")[0] //去掉hash
let params = qs.parse(search) || ''
console.log('url参数', params)

const util = {

  // 注入util
  ...isType,

  mergeObj() {
    return Object.assign(...arguments)
  },
  extend() {
    return Object.assign(...arguments)
  },

  /**
   * 获取当前时间戳
   * @returns {string}
   */
  getTimeString() {
      var date = new Date();
      // 格式化日期  格式：yyyyMMddHHmmss
      var Ystr = date
          .toISOString()
          .split("T")[0]
          .split("-")
          .join("");
      var Tstr = date
          .toISOString()
          .split("T")[1]
          .split(".")[0]
          .split(":")
          .join("");
      var str = Ystr + Tstr;
      return str;
  },

  /*
  * 获取参数
  *
  */
  getParams(field) {
      // let url = window.location.href,
      //     param = {},
      //     splitArray = url.split("?"),
      //     searchLocation = splitArray.length <= 1 ? "" : splitArray[1].split("#")[0],
      //     searchParams = searchLocation.split("&"),
      //     value,
      //     key;
      // for (var i = 0, leni = searchParams.length; i < leni; i++) {
      //     key = searchParams[i].split("=")[0];
      //     value = searchParams[i].split("=")[1];
      //     if (!key) {
      //         continue;
      //     }
      //     param[key] = value;
      // }

      // 路由跳转时url参数会被覆盖,所以仅在首次进入时读取
      return field ? params[field] : params;
  },

  // 判断环境
  browser: {
    versions: (function() {
       var u = navigator.userAgent,
           app = navigator.appVersion;
       return {
           trident: u.indexOf("Trident") > -1, //IE内核
           presto: u.indexOf("Presto") > -1, //opera内核
           webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
           gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
           mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
           ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
           android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
           iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
           iPad: u.indexOf("iPad") > -1, //是否iPad
           webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
           weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
           // qq: u.match(/\sQQ/i) == " qq", //是否QQ
           weibo: u.indexOf("Weibo") > -1 || u.indexOf("weibo") > -1 //android终端
           // weibo: 'ffffff', //android终端
       };
     })(),
     language: (
         navigator.browserLanguage || navigator.language
     ).toLowerCase()
  },

  // 根据经纬度计算距离
  getDistance (lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
  },

  //去掉所有空格
  trimAll(txt) {
    return txt && txt.replace(/\s+/g, "");
  },

  // 时间格式化
  format(value,format){
    let date = moment(value)
    if(!value || ! date.isValid()) {
      return ''
    }
    return date.format(format)
    // if(!value){
    //   return '';
    // }
    // var date = '';
    // try {
    //   date = new Date(value);
    // } catch (e) {
    //   console.log(e);
    //   return '';
    // }
    //
    // if(!format){
    //   format = 'MM-dd hh:mm';
    //   if(date.getFullYear() != new Date().getFullYear()){
    //     format = 'yyyy-MM-dd hh:mm';
    //   }
    // }
    //
    // var o = {
    //     "M+": date.getMonth() + 1,
    //     "d+": date.getDate(),
    //     "h+": date.getHours(),
    //     "m+": date.getMinutes(),
    //     "s+": date.getSeconds(),
    //     "q+": Math.floor((date.getMonth() + 3) / 3),
    //     "S": date.getMilliseconds()
    // };
    //
    // if (/(y+)/.test(format)) {
    //     format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    // }
    // for (var k in o) {
    //     if (new RegExp("(" + k + ")").test(format)) {
    //         format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    //     }
    // }
    // return format;
  },

  // 千分位分隔
  // digits 小数位数
  // result 123,456,789.00
  moneyFormat(value, digits = 2) {
    if(!value && value !== 0) {
      return ''
    }

    let array = value.toFixed(digits).split('.')
    let num = array[0]
    let dgt = array[1]

    num = num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return dgt ? num + '.' + dgt : num
  },

  //用***代替
  stringHide(value, start, end, count){
    if(!count){
      count = end - start;
    }

    let hideStr = '';
    for (let index = 0; index < count; index++) {
      hideStr += '*'
    }
    let startValue = value.substr(0, start);
    let endValue = value.substr(end, value.length);

    return startValue + hideStr + endValue;
  },

  isEmpty(value) {
    return !value && value !== 0
  },
  //号码/身份证格式化
  // value -- 需要格式的原始数据
  // num -- 格式化间隔
  idFormat(value,num = 4){
    if(!value && value !== 0) return '';
    var re =new RegExp("(\\d{" + num + "})","g"); // re为/(\d{num})/g
    let newValue = value.replace(/\s/g,'').replace(re,'$1 ');
    if(/\s$/.test(newValue)) newValue=newValue.replace(/\s$/g,'');
    return newValue;
  },

  // 对象格式化
  formatUrlData (data = {}) {
    let paramsArray = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        paramsArray.push(key + "=" + encodeURIComponent(data[key]));
      }
    }
    return paramsArray.join("&");
  },

  // 获取字符长度（中文2个字符）
  // 匹配中文字符的正则表达式： [\u4e00-\u9fa5]
  // 匹配双字节字符(包括汉字在内)：[^\x00-\xff]
  getCharLen(value) {
    if(!value) return 0
    value = String(value)
    let len = value.replace(/[^\x00-\xff]/g, '11').length
    return len
  },

  seekForValue

}

// 检索对象属性
// seekForValue(res, ['data', 'flag']) => res.data.flag
function seekForValue(data, path) {
  let value = data
  path.forEach(key => {
    if(!value && value !== 0) {
      value = undefined
      return
    }
    else {
      value = value[key]
    }
  })
  return value
}

export {seekForValue}
export default util
