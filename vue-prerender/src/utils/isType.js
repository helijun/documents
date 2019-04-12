
// 类型判断

export default {
  /* 判断 obj 是否为 null
     Usage:
       var obj = null;
       t.isNull(obj); // 输出 true
  */
  isNull: function(obj) {
    return obj === null || obj !== obj;
  },

  /* 判断 obj 是否为 function
     Usage:
       var obj = 'abc';
       t.isFunction(obj); // 输出 false
  */
  isFunction: isType('Function'),

  /* 判断 obj 是否为 object
     Usage:
       var obj = {};
       t.isObject(obj); // 输出 true
  */
  isObject: isType('Object'),

  /* 判断 obj 是否为 array
     Usage:
       var obj = ['abc'];
       t.isArray(obj); // 输出 true
  */
  isArray: window.isArray || isType('Array'),

  /* 判断 obj 是否为 string
     Usage:
       var obj = 'abc';
       t.isString(obj); // 输出 true
  */
  isString: isType('String'),

  /* 判断 obj 是否为 undefined
     Usage:
       var obj = 'abc';
       t.isUndefined(obj); // 输出 false
  */
  isUndefined: isType('Undefined'),
}


function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) == '[object ' + type + ']';
  }
}
