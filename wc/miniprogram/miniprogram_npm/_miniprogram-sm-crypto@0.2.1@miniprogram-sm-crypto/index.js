module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("jsbn");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-bitwise, no-mixed-operators, no-use-before-define, max-len */
var _require = __webpack_require__(0),
    BigInteger = _require.BigInteger,
    SecureRandom = _require.SecureRandom;

var _require2 = __webpack_require__(6),
    ECCurveFp = _require2.ECCurveFp;

var rng = new SecureRandom();

var _generateEcparam = generateEcparam(),
    curve = _generateEcparam.curve,
    G = _generateEcparam.G,
    n = _generateEcparam.n;

/**
 * 获取公共椭圆曲线
 */


function getGlobalCurve() {
  return curve;
}

/**
 * 生成ecparam
 */
function generateEcparam() {
  // 椭圆曲线
  var p = new BigInteger('FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF', 16);
  var a = new BigInteger('FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC', 16);
  var b = new BigInteger('28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93', 16);
  var curve = new ECCurveFp(p, a, b);

  // 基点
  var gxHex = '32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7';
  var gyHex = 'BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0';
  var G = curve.decodePointHex('04' + gxHex + gyHex);

  var n = new BigInteger('FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123', 16);

  return { curve: curve, G: G, n: n };
}

/**
 * 生成密钥对
 */
function generateKeyPairHex() {
  var d = new BigInteger(n.bitLength(), rng).mod(n.subtract(BigInteger.ONE)).add(BigInteger.ONE); // 随机数
  var privateKey = leftPad(d.toString(16), 64);

  var P = G.multiply(d); // P = dG，p 为公钥，d 为私钥
  var Px = leftPad(P.getX().toBigInteger().toString(16), 64);
  var Py = leftPad(P.getY().toBigInteger().toString(16), 64);
  var publicKey = '04' + Px + Py;

  return { privateKey: privateKey, publicKey: publicKey };
}

/**
 * 解析utf8字符串到16进制
 */
function parseUtf8StringToHex(input) {
  input = unescape(encodeURIComponent(input));

  var length = input.length;

  // 转换到字数组
  var words = [];
  for (var i = 0; i < length; i++) {
    words[i >>> 2] |= (input.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
  }

  // 转换到16进制
  var hexChars = [];
  for (var _i = 0; _i < length; _i++) {
    var bite = words[_i >>> 2] >>> 24 - _i % 4 * 8 & 0xff;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 0x0f).toString(16));
  }

  return hexChars.join('');
}

/**
 * 解析arrayBuffer到16进制字符串
 */
function parseArrayBufferToHex(input) {
  return Array.prototype.map.call(new Uint8Array(input), function (x) {
    return ('00' + x.toString(16)).slice(-2);
  }).join('');
}

/**
 * 补全16进制字符串
 */
function leftPad(input, num) {
  if (input.length >= num) return input;

  return new Array(num - input.length + 1).join('0') + input;
}

/**
 * 转成16进制串
 */
function arrayToHex(arr) {
  var words = [];
  var j = 0;
  for (var i = 0; i < arr.length * 2; i += 2) {
    words[i >>> 3] |= parseInt(arr[j], 10) << 24 - i % 8 * 4;
    j++;
  }

  // 转换到16进制
  var hexChars = [];
  for (var _i2 = 0; _i2 < arr.length; _i2++) {
    var bite = words[_i2 >>> 2] >>> 24 - _i2 % 4 * 8 & 0xff;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 0x0f).toString(16));
  }

  return hexChars.join('');
}

/**
 * 转成utf8串
 */
function arrayToUtf8(arr) {
  var words = [];
  var j = 0;
  for (var i = 0; i < arr.length * 2; i += 2) {
    words[i >>> 3] |= parseInt(arr[j], 10) << 24 - i % 8 * 4;
    j++;
  }

  try {
    var latin1Chars = [];

    for (var _i3 = 0; _i3 < arr.length; _i3++) {
      var bite = words[_i3 >>> 2] >>> 24 - _i3 % 4 * 8 & 0xff;
      latin1Chars.push(String.fromCharCode(bite));
    }

    return decodeURIComponent(escape(latin1Chars.join('')));
  } catch (e) {
    throw new Error('Malformed UTF-8 data');
  }
}

/**
 * 转成ascii码数组
 */
function hexToArray(hexStr) {
  var words = [];
  var hexStrLength = hexStr.length;

  if (hexStrLength % 2 !== 0) {
    hexStr = leftPad(hexStr, hexStrLength + 1);
  }

  hexStrLength = hexStr.length;

  for (var i = 0; i < hexStrLength; i += 2) {
    words.push(parseInt(hexStr.substr(i, 2), 16));
  }
  return words;
}

module.exports = {
  getGlobalCurve: getGlobalCurve,
  generateEcparam: generateEcparam,
  generateKeyPairHex: generateKeyPairHex,
  parseUtf8StringToHex: parseUtf8StringToHex,
  parseArrayBufferToHex: parseArrayBufferToHex,
  leftPad: leftPad,
  arrayToHex: arrayToHex,
  arrayToUtf8: arrayToUtf8,
  hexToArray: hexToArray
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-bitwise, no-mixed-operators, class-methods-use-this, camelcase */
var _require = __webpack_require__(0),
    BigInteger = _require.BigInteger;

var _ = __webpack_require__(1);

var copyArray = function copyArray(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
  for (var i = 0; i < length; i++) {
    destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
  }
};

var Int32 = {
  minValue: -2147483648,
  maxValue: 2147483647,
  parse: function parse(n) {
    if (n < this.minValue) {
      var bigInteger = Number(-n);
      var bigIntegerRadix = bigInteger.toString(2);
      var subBigIntegerRadix = bigIntegerRadix.substr(bigIntegerRadix.length - 31, 31);
      var reBigIntegerRadix = '';
      for (var i = 0; i < subBigIntegerRadix.length; i++) {
        var subBigIntegerRadixItem = subBigIntegerRadix.substr(i, 1);
        reBigIntegerRadix += subBigIntegerRadixItem === '0' ? '1' : '0';
      }
      var result = parseInt(reBigIntegerRadix, 2);
      return result + 1;
    } else if (n > this.maxValue) {
      var _bigInteger = Number(n);
      var _bigIntegerRadix = _bigInteger.toString(2);
      var _subBigIntegerRadix = _bigIntegerRadix.substr(_bigIntegerRadix.length - 31, 31);
      var _reBigIntegerRadix = '';
      for (var _i = 0; _i < _subBigIntegerRadix.length; _i++) {
        var _subBigIntegerRadixItem = _subBigIntegerRadix.substr(_i, 1);
        _reBigIntegerRadix += _subBigIntegerRadixItem === '0' ? '1' : '0';
      }
      var _result = parseInt(_reBigIntegerRadix, 2);
      return -(_result + 1);
    } else {
      return n;
    }
  },
  parseByte: function parseByte(n) {
    if (n < 0) {
      var bigInteger = Number(-n);
      var bigIntegerRadix = bigInteger.toString(2);
      var subBigIntegerRadix = bigIntegerRadix.substr(bigIntegerRadix.length - 8, 8);
      var reBigIntegerRadix = '';
      for (var i = 0; i < subBigIntegerRadix.length; i++) {
        var subBigIntegerRadixItem = subBigIntegerRadix.substr(i, 1);
        reBigIntegerRadix += subBigIntegerRadixItem === '0' ? '1' : '0';
      }
      var result = parseInt(reBigIntegerRadix, 2);
      return (result + 1) % 256;
    } else if (n > 255) {
      var _bigInteger2 = Number(n);
      var _bigIntegerRadix2 = _bigInteger2.toString(2);
      return parseInt(_bigIntegerRadix2.substr(_bigIntegerRadix2.length - 8, 8), 2);
    } else {
      return n;
    }
  }
};

var SM3Digest = function () {
  function SM3Digest() {
    _classCallCheck(this, SM3Digest);

    this.xBuf = [];
    this.xBufOff = 0;
    this.byteCount = 0;
    this.DIGEST_LENGTH = 32;
    this.v0 = [0x7380166f, 0x4914b2b9, 0x172442d7, 0xda8a0600, 0xa96f30bc, 0x163138aa, 0xe38dee4d, 0xb0fb0e4e];
    this.v0 = [0x7380166f, 0x4914b2b9, 0x172442d7, -628488704, -1452330820, 0x163138aa, -477237683, -1325724082];
    this.v = new Array(8);
    this.v_ = new Array(8);
    this.X0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.X = new Array(68);
    this.xOff = 0;
    this.T_00_15 = 0x79cc4519;
    this.T_16_63 = 0x7a879d8a;
    if (arguments.length > 0) {
      this.initDigest(arguments.length <= 0 ? undefined : arguments[0]);
    } else {
      this.init();
    }
  }

  SM3Digest.prototype.init = function init() {
    this.xBuf = new Array(4);
    this.reset();
  };

  SM3Digest.prototype.initDigest = function initDigest(t) {
    this.xBuf = [].concat(t.xBuf);
    this.xBufOff = t.xBufOff;
    this.byteCount = t.byteCount;
    copyArray(t.X, 0, this.X, 0, t.X.length);
    this.xOff = t.xOff;
    copyArray(t.v, 0, this.v, 0, t.v.length);
  };

  SM3Digest.prototype.getDigestSize = function getDigestSize() {
    return this.DIGEST_LENGTH;
  };

  SM3Digest.prototype.reset = function reset() {
    this.byteCount = 0;
    this.xBufOff = 0;

    var keys = Object.keys(this.xBuf);
    for (var i = 0, len = keys.length; i < len; i++) {
      this.xBuf[keys[i]] = null;
    }copyArray(this.v0, 0, this.v, 0, this.v0.length);
    this.xOff = 0;
    copyArray(this.X0, 0, this.X, 0, this.X0.length);
  };

  SM3Digest.prototype.processBlock = function processBlock() {
    var i = void 0;
    var ww = this.X;
    var ww_ = new Array(64);
    for (i = 16; i < 68; i++) {
      ww[i] = this.p1(ww[i - 16] ^ ww[i - 9] ^ this.rotate(ww[i - 3], 15)) ^ this.rotate(ww[i - 13], 7) ^ ww[i - 6];
    }
    for (i = 0; i < 64; i++) {
      ww_[i] = ww[i] ^ ww[i + 4];
    }
    var vv = this.v;
    var vv_ = this.v_;
    copyArray(vv, 0, vv_, 0, this.v0.length);
    var SS1 = void 0;
    var SS2 = void 0;
    var TT1 = void 0;
    var TT2 = void 0;
    var aaa = void 0;
    for (i = 0; i < 16; i++) {
      aaa = this.rotate(vv_[0], 12);
      SS1 = Int32.parse(Int32.parse(aaa + vv_[4]) + this.rotate(this.T_00_15, i));
      SS1 = this.rotate(SS1, 7);
      SS2 = SS1 ^ aaa;
      TT1 = Int32.parse(Int32.parse(this.ff_00_15(vv_[0], vv_[1], vv_[2]) + vv_[3]) + SS2) + ww_[i];
      TT2 = Int32.parse(Int32.parse(this.gg_00_15(vv_[4], vv_[5], vv_[6]) + vv_[7]) + SS1) + ww[i];
      vv_[3] = vv_[2];
      vv_[2] = this.rotate(vv_[1], 9);
      vv_[1] = vv_[0];
      vv_[0] = TT1;
      vv_[7] = vv_[6];
      vv_[6] = this.rotate(vv_[5], 19);
      vv_[5] = vv_[4];
      vv_[4] = this.p0(TT2);
    }
    for (i = 16; i < 64; i++) {
      aaa = this.rotate(vv_[0], 12);
      SS1 = Int32.parse(Int32.parse(aaa + vv_[4]) + this.rotate(this.T_16_63, i));
      SS1 = this.rotate(SS1, 7);
      SS2 = SS1 ^ aaa;
      TT1 = Int32.parse(Int32.parse(this.ff_16_63(vv_[0], vv_[1], vv_[2]) + vv_[3]) + SS2) + ww_[i];
      TT2 = Int32.parse(Int32.parse(this.gg_16_63(vv_[4], vv_[5], vv_[6]) + vv_[7]) + SS1) + ww[i];
      vv_[3] = vv_[2];
      vv_[2] = this.rotate(vv_[1], 9);
      vv_[1] = vv_[0];
      vv_[0] = TT1;
      vv_[7] = vv_[6];
      vv_[6] = this.rotate(vv_[5], 19);
      vv_[5] = vv_[4];
      vv_[4] = this.p0(TT2);
    }
    for (i = 0; i < 8; i++) {
      vv[i] ^= Int32.parse(vv_[i]);
    }
    this.xOff = 0;
    copyArray(this.X0, 0, this.X, 0, this.X0.length);
  };

  SM3Digest.prototype.processWord = function processWord(in_Renamed, inOff) {
    var n = in_Renamed[inOff] << 24;
    n |= (in_Renamed[++inOff] & 0xff) << 16;
    n |= (in_Renamed[++inOff] & 0xff) << 8;
    n |= in_Renamed[++inOff] & 0xff;
    this.X[this.xOff] = n;
    if (++this.xOff === 16) {
      this.processBlock();
    }
  };

  SM3Digest.prototype.processLength = function processLength(bitLength) {
    if (this.xOff > 14) {
      this.processBlock();
    }
    this.X[14] = this.urShiftLong(bitLength, 32);
    this.X[15] = bitLength & 0xffffffff;
  };

  SM3Digest.prototype.intToBigEndian = function intToBigEndian(n, bs, off) {
    bs[off] = Int32.parseByte(this.urShift(n, 24)) & 0xff;
    bs[++off] = Int32.parseByte(this.urShift(n, 16)) & 0xff;
    bs[++off] = Int32.parseByte(this.urShift(n, 8)) & 0xff;
    bs[++off] = Int32.parseByte(n) & 0xff;
  };

  SM3Digest.prototype.doFinal = function doFinal(out_Renamed, outOff) {
    this.finish();
    for (var i = 0; i < 8; i++) {
      this.intToBigEndian(this.v[i], out_Renamed, outOff + i * 4);
    }
    this.reset();
    return this.DIGEST_LENGTH;
  };

  SM3Digest.prototype.update = function update(input) {
    this.xBuf[this.xBufOff++] = input;
    if (this.xBufOff === this.xBuf.length) {
      this.processWord(this.xBuf, 0);
      this.xBufOff = 0;
    }
    this.byteCount++;
  };

  SM3Digest.prototype.blockUpdate = function blockUpdate(input, inOff, length) {
    while (this.xBufOff !== 0 && length > 0) {
      this.update(input[inOff]);
      inOff++;
      length--;
    }
    while (length > this.xBuf.length) {
      this.processWord(input, inOff);
      inOff += this.xBuf.length;
      length -= this.xBuf.length;
      this.byteCount += this.xBuf.length;
    }
    while (length > 0) {
      this.update(input[inOff]);
      inOff++;
      length--;
    }
  };

  SM3Digest.prototype.finish = function finish() {
    var bitLength = this.byteCount << 3;
    this.update(128);
    while (this.xBufOff !== 0) {
      this.update(0);
    }this.processLength(bitLength);
    this.processBlock();
  };

  SM3Digest.prototype.rotate = function rotate(x, n) {
    return x << n | this.urShift(x, 32 - n);
  };

  SM3Digest.prototype.p0 = function p0(X) {
    return X ^ this.rotate(X, 9) ^ this.rotate(X, 17);
  };

  SM3Digest.prototype.p1 = function p1(X) {
    return X ^ this.rotate(X, 15) ^ this.rotate(X, 23);
  };

  SM3Digest.prototype.ff_00_15 = function ff_00_15(X, Y, Z) {
    return X ^ Y ^ Z;
  };

  SM3Digest.prototype.ff_16_63 = function ff_16_63(X, Y, Z) {
    return X & Y | X & Z | Y & Z;
  };

  SM3Digest.prototype.gg_00_15 = function gg_00_15(X, Y, Z) {
    return X ^ Y ^ Z;
  };

  SM3Digest.prototype.gg_16_63 = function gg_16_63(X, Y, Z) {
    return X & Y | ~X & Z;
  };

  SM3Digest.prototype.urShift = function urShift(number, bits) {
    if (number > Int32.maxValue || number < Int32.minValue) {
      number = Int32.parse(number);
    }
    return number >>> bits;
  };

  SM3Digest.prototype.urShiftLong = function urShiftLong(number, bits) {
    var returnV = void 0;
    var big = new BigInteger();
    big.fromInt(number);
    if (big.signum() >= 0) {
      returnV = big.shiftRight(bits).intValue();
    } else {
      var bigAdd = new BigInteger();
      bigAdd.fromInt(2);
      var shiftLeftBits = ~bits;
      var shiftLeftNumber = '';
      if (shiftLeftBits < 0) {
        var shiftRightBits = 64 + shiftLeftBits;
        for (var i = 0; i < shiftRightBits; i++) {
          shiftLeftNumber += '0';
        }
        var shiftLeftNumberBigAdd = new BigInteger();
        shiftLeftNumberBigAdd.fromInt(number >> bits);
        var shiftLeftNumberBig = new BigInteger('10' + shiftLeftNumber, 2);
        shiftLeftNumber = shiftLeftNumberBig.toRadix(10);
        var r = shiftLeftNumberBig.add(shiftLeftNumberBigAdd);
        returnV = r.toRadix(10);
      } else {
        shiftLeftNumber = bigAdd.shiftLeft(~bits).intValue();
        returnV = (number >> bits) + shiftLeftNumber;
      }
    }
    return returnV;
  };

  SM3Digest.prototype.getZ = function getZ(g, publicKey, userId) {
    // ZA=H256(ENTLA ∥ IDA ∥ a ∥ b ∥ xG ∥ yG ∥xA ∥yA)
    var len = 0;
    if (userId) {
      if (typeof userId !== 'string') throw new Error('sm2: Type of userId Must be String! Receive Type: ' + (typeof userId === 'undefined' ? 'undefined' : _typeof(userId)));
      if (userId.length >= 8192) throw new Error('sm2: The Length of userId Must Less Than 8192! Length: ' + userId.length);

      userId = _.parseUtf8StringToHex(userId);
      len = userId.length * 4;
    }
    this.update(len >> 8 & 0x00ff);
    this.update(len & 0x00ff);
    if (userId) {
      var userIdWords = _.hexToArray(userId);
      this.blockUpdate(userIdWords, 0, userIdWords.length);
    }
    var aWords = _.hexToArray(_.leftPad(g.curve.a.toBigInteger().toRadix(16), 64));
    var bWords = _.hexToArray(_.leftPad(g.curve.b.toBigInteger().toRadix(16), 64));
    var gxWords = _.hexToArray(_.leftPad(g.getX().toBigInteger().toRadix(16), 64));
    var gyWords = _.hexToArray(_.leftPad(g.getY().toBigInteger().toRadix(16), 64));
    var pxWords = _.hexToArray(publicKey.substr(0, 64));
    var pyWords = _.hexToArray(publicKey.substr(64, 64));
    this.blockUpdate(aWords, 0, aWords.length);
    this.blockUpdate(bWords, 0, bWords.length);
    this.blockUpdate(gxWords, 0, gxWords.length);
    this.blockUpdate(gyWords, 0, gyWords.length);
    this.blockUpdate(pxWords, 0, pxWords.length);
    this.blockUpdate(pyWords, 0, pyWords.length);
    var md = new Array(this.getDigestSize());
    this.doFinal(md, 0);
    return md;
  };

  return SM3Digest;
}();

module.exports = SM3Digest;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  sm2: __webpack_require__(4),
  sm3: __webpack_require__(8),
  sm4: __webpack_require__(9)
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-use-before-define */
var _require = __webpack_require__(0),
    BigInteger = _require.BigInteger;

var _require2 = __webpack_require__(5),
    encodeDer = _require2.encodeDer,
    decodeDer = _require2.decodeDer;

var SM3Digest = __webpack_require__(2);
var SM2Cipher = __webpack_require__(7);
var _ = __webpack_require__(1);

var _$generateEcparam = _.generateEcparam(),
    G = _$generateEcparam.G,
    curve = _$generateEcparam.curve,
    n = _$generateEcparam.n;

var C1C2C3 = 0;

/**
 * 加密
 */
function doEncrypt(msg, publicKey) {
  var cipherMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var cipher = new SM2Cipher();
  msg = _.hexToArray(_.parseUtf8StringToHex(msg));

  if (publicKey.length > 128) {
    publicKey = publicKey.substr(publicKey.length - 128);
  }
  var xHex = publicKey.substr(0, 64);
  var yHex = publicKey.substr(64);
  publicKey = cipher.createPoint(xHex, yHex);

  var c1 = cipher.initEncipher(publicKey);

  cipher.encryptBlock(msg);
  var c2 = _.arrayToHex(msg);

  var c3 = new Array(32);
  cipher.doFinal(c3);
  c3 = _.arrayToHex(c3);

  return cipherMode === C1C2C3 ? c1 + c2 + c3 : c1 + c3 + c2;
}

/**
 * 解密
 */
function doDecrypt(encryptData, privateKey) {
  var cipherMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var cipher = new SM2Cipher();

  privateKey = new BigInteger(privateKey, 16);

  var c1X = encryptData.substr(0, 64);
  var c1Y = encryptData.substr(0 + c1X.length, 64);
  var c1Length = c1X.length + c1Y.length;

  var c3 = encryptData.substr(c1Length, 64);
  var c2 = encryptData.substr(c1Length + 64);

  if (cipherMode === C1C2C3) {
    c3 = encryptData.substr(encryptData.length - 64);
    c2 = encryptData.substr(c1Length, encryptData.length - c1Length - 64);
  }

  var data = _.hexToArray(c2);

  var c1 = cipher.createPoint(c1X, c1Y);
  cipher.initDecipher(privateKey, c1);
  cipher.decryptBlock(data);
  var c3_ = new Array(32);
  cipher.doFinal(c3_);

  var isDecrypt = _.arrayToHex(c3_) === c3;

  if (isDecrypt) {
    var decryptData = _.arrayToUtf8(data);
    return decryptData;
  } else {
    return '';
  }
}

/**
 * 签名
 */
function doSignature(msg, privateKey) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      pointPool = _ref.pointPool,
      der = _ref.der,
      hash = _ref.hash,
      publicKey = _ref.publicKey,
      userId = _ref.userId;

  var hashHex = typeof msg === 'string' ? _.parseUtf8StringToHex(msg) : _.parseArrayBufferToHex(msg);

  if (hash) {
    // sm3杂凑
    publicKey = publicKey || getPublicKeyFromPrivateKey(privateKey);
    hashHex = doSm3Hash(hashHex, publicKey, userId);
  }

  var dA = new BigInteger(privateKey, 16);
  var e = new BigInteger(hashHex, 16);

  // k
  var k = null;
  var r = null;
  var s = null;

  do {
    do {
      var point = void 0;
      if (pointPool && pointPool.length) {
        point = pointPool.pop();
      } else {
        point = getPoint();
      }
      k = point.k;

      // r = (e + x1) mod n
      r = e.add(point.x1).mod(n);
    } while (r.equals(BigInteger.ZERO) || r.add(k).equals(n));

    // s = ((1 + dA)^-1 * (k - r * dA)) mod n
    s = dA.add(BigInteger.ONE).modInverse(n).multiply(k.subtract(r.multiply(dA))).mod(n);
  } while (s.equals(BigInteger.ZERO));

  if (der) {
    // asn1 der编码
    return encodeDer(r, s);
  }

  return _.leftPad(r.toString(16), 64) + _.leftPad(s.toString(16), 64);
}

/**
 * 验签
 */
function doVerifySignature(msg, signHex, publicKey) {
  var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      der = _ref2.der,
      hash = _ref2.hash,
      userId = _ref2.userId;

  var hashHex = typeof msg === 'string' ? _.parseUtf8StringToHex(msg) : _.parseArrayBufferToHex(msg);

  if (hash) {
    // sm3杂凑
    hashHex = doSm3Hash(hashHex, publicKey, userId);
  }

  var r = void 0;var s = void 0;
  if (der) {
    var decodeDerObj = decodeDer(signHex);
    r = decodeDerObj.r;
    s = decodeDerObj.s;
  } else {
    r = new BigInteger(signHex.substring(0, 64), 16);
    s = new BigInteger(signHex.substring(64), 16);
  }

  var PA = curve.decodePointHex(publicKey);
  var e = new BigInteger(hashHex, 16);

  // t = (r + s) mod n
  var t = r.add(s).mod(n);

  if (t.equals(BigInteger.ZERO)) return false;

  // x1y1 = s * G + t * PA
  var x1y1 = G.multiply(s).add(PA.multiply(t));

  // R = (e + x1) mod n
  var R = e.add(x1y1.getX().toBigInteger()).mod(n);

  return r.equals(R);
}

/**
 * sm3杂凑算法
 * 计算M值: Hash(za || msg)
 */
function doSm3Hash(hashHex, publicKey) {
  var userId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1234567812345678';

  var smDigest = new SM3Digest();

  var z = new SM3Digest().getZ(G, publicKey.substr(2, 128), userId);
  var zValue = _.hexToArray(_.arrayToHex(z).toString());

  var p = hashHex;
  var pValue = _.hexToArray(p);

  var hashData = new Array(smDigest.getDigestSize());
  smDigest.blockUpdate(zValue, 0, zValue.length);
  smDigest.blockUpdate(pValue, 0, pValue.length);
  smDigest.doFinal(hashData, 0);

  return _.arrayToHex(hashData).toString();
}

/**
 * 计算公钥
 */
function getPublicKeyFromPrivateKey(privateKey) {
  var PA = G.multiply(new BigInteger(privateKey, 16));
  var x = _.leftPad(PA.getX().toBigInteger().toString(16), 64);
  var y = _.leftPad(PA.getY().toBigInteger().toString(16), 64);
  return '04' + x + y;
}

/**
 * 获取椭圆曲线点
 */
function getPoint() {
  var keypair = _.generateKeyPairHex();
  var PA = curve.decodePointHex(keypair.publicKey);

  keypair.k = new BigInteger(keypair.privateKey, 16);
  keypair.x1 = PA.getX().toBigInteger();

  return keypair;
}

module.exports = {
  generateKeyPairHex: _.generateKeyPairHex,
  doEncrypt: doEncrypt,
  doDecrypt: doDecrypt,
  doSignature: doSignature,
  doVerifySignature: doVerifySignature,
  getPoint: getPoint
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var _require = __webpack_require__(0),
    BigInteger = _require.BigInteger;

function bigIntToMinTwosComplementsHex(bigIntegerValue) {
  var h = bigIntegerValue.toString(16);
  if (h.substr(0, 1) !== '-') {
    if (h.length % 2 === 1) {
      h = '0' + h;
    } else if (!h.match(/^[0-7]/)) {
      h = '00' + h;
    }
  } else {
    var hPos = h.substr(1);
    var xorLen = hPos.length;
    if (xorLen % 2 === 1) {
      xorLen += 1;
    } else if (!h.match(/^[0-7]/)) {
      xorLen += 2;
    }
    var hMask = '';
    for (var i = 0; i < xorLen; i++) {
      hMask += 'f';
    }
    var biMask = new BigInteger(hMask, 16);
    var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
    h = biNeg.toString(16).replace(/^-/, '');
  }
  return h;
}

/**
 * base class for ASN.1 DER encoder object
 */

var ASN1Object = function () {
  function ASN1Object() {
    _classCallCheck(this, ASN1Object);

    this.isModified = true;
    this.hTLV = null;
    this.hT = '00';
    this.hL = '00';
    this.hV = '';
  }

  /**
     * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
     */


  ASN1Object.prototype.getLengthHexFromValue = function getLengthHexFromValue() {
    var n = this.hV.length / 2;
    var hN = n.toString(16);
    if (hN.length % 2 === 1) {
      hN = '0' + hN;
    }
    if (n < 128) {
      return hN;
    } else {
      var hNlen = hN.length / 2;
      var head = 128 + hNlen;
      return head.toString(16) + hN;
    }
  };

  /**
     * get hexadecimal string of ASN.1 TLV bytes
     */


  ASN1Object.prototype.getEncodedHex = function getEncodedHex() {
    if (this.hTLV == null || this.isModified) {
      this.hV = this.getFreshValueHex();
      this.hL = this.getLengthHexFromValue();
      this.hTLV = this.hT + this.hL + this.hV;
      this.isModified = false;
    }
    return this.hTLV;
  };

  ASN1Object.prototype.getFreshValueHex = function getFreshValueHex() {
    return '';
  };

  return ASN1Object;
}();

/**
 * class for ASN.1 DER Integer
 */


var DERInteger = function (_ASN1Object) {
  _inherits(DERInteger, _ASN1Object);

  function DERInteger(options) {
    _classCallCheck(this, DERInteger);

    var _this = _possibleConstructorReturn(this, _ASN1Object.call(this));

    _this.hT = '02';
    if (options && options.bigint) {
      _this.hTLV = null;
      _this.isModified = true;
      _this.hV = bigIntToMinTwosComplementsHex(options.bigint);
    }
    return _this;
  }

  DERInteger.prototype.getFreshValueHex = function getFreshValueHex() {
    return this.hV;
  };

  return DERInteger;
}(ASN1Object);

/**
 * class for ASN.1 DER Sequence
 */


var DERSequence = function (_ASN1Object2) {
  _inherits(DERSequence, _ASN1Object2);

  function DERSequence(options) {
    _classCallCheck(this, DERSequence);

    var _this2 = _possibleConstructorReturn(this, _ASN1Object2.call(this));

    _this2.hT = '30';
    _this2.asn1Array = [];
    if (options && options.array) {
      _this2.asn1Array = options.array;
    }
    return _this2;
  }

  DERSequence.prototype.getFreshValueHex = function getFreshValueHex() {
    var h = '';
    for (var i = 0; i < this.asn1Array.length; i++) {
      var asn1Obj = this.asn1Array[i];
      h += asn1Obj.getEncodedHex();
    }
    this.hV = h;
    return this.hV;
  };

  return DERSequence;
}(ASN1Object);

/**
 * get byte length for ASN.1 L(length) bytes
 */


function getByteLengthOfL(s, pos) {
  if (s.substring(pos + 2, pos + 3) !== '8') return 1;
  var i = parseInt(s.substring(pos + 3, pos + 4), 10);
  if (i === 0) return -1; // length octet '80' indefinite length
  if (i > 0 && i < 10) return i + 1; // including '8?' octet;
  return -2; // malformed format
}

/**
 * get hexadecimal string for ASN.1 L(length) bytes
 */
function getHexOfL(s, pos) {
  var len = getByteLengthOfL(s, pos);
  if (len < 1) return '';
  return s.substring(pos + 2, pos + 2 + len * 2);
}

/**
 * get integer value of ASN.1 length for ASN.1 data
 */
function getIntOfL(s, pos) {
  var hLength = getHexOfL(s, pos);
  if (hLength === '') return -1;
  var bi = void 0;
  if (parseInt(hLength.substring(0, 1), 10) < 8) {
    bi = new BigInteger(hLength, 16);
  } else {
    bi = new BigInteger(hLength.substring(2), 16);
  }
  return bi.intValue();
}

/**
 * get ASN.1 value starting string position for ASN.1 object refered by index 'idx'.
 */
function getStartPosOfV(s, pos) {
  var lLen = getByteLengthOfL(s, pos);
  if (lLen < 0) return lLen;
  return pos + (lLen + 1) * 2;
}

/**
 * get hexadecimal string of ASN.1 V(value)
 */
function getHexOfV(s, pos) {
  var pos1 = getStartPosOfV(s, pos);
  var len = getIntOfL(s, pos);
  return s.substring(pos1, pos1 + len * 2);
}

/**
 * get next sibling starting index for ASN.1 object string
 */
function getPosOfNextSibling(s, pos) {
  var pos1 = getStartPosOfV(s, pos);
  var len = getIntOfL(s, pos);
  return pos1 + len * 2;
}

/**
 * get array of indexes of child ASN.1 objects
 */
function getPosArrayOfChildren(h, pos) {
  var a = [];
  var p0 = getStartPosOfV(h, pos);
  a.push(p0);

  var len = getIntOfL(h, pos);
  var p = p0;
  var k = 0;
  for (;;) {
    var pNext = getPosOfNextSibling(h, p);
    if (pNext == null || pNext - p0 >= len * 2) break;
    if (k >= 200) break;

    a.push(pNext);
    p = pNext;

    k++;
  }

  return a;
}

module.exports = {
  /**
     * ASN.1 DER编码
     */
  encodeDer: function encodeDer(r, s) {
    var derR = new DERInteger({ bigint: r });
    var derS = new DERInteger({ bigint: s });
    var derSeq = new DERSequence({ array: [derR, derS] });

    return derSeq.getEncodedHex();
  },


  /**
     * 解析 ASN.1 DER
     */
  decodeDer: function decodeDer(input) {
    // 1. Items of ASN.1 Sequence Check
    var a = getPosArrayOfChildren(input, 0);

    // 2. Integer check
    var iTLV1 = a[0];
    var iTLV2 = a[1];

    // 3. getting value
    var hR = getHexOfV(input, iTLV1);
    var hS = getHexOfV(input, iTLV2);

    var r = new BigInteger(hR, 16);
    var s = new BigInteger(hS, 16);

    return { r: r, s: s };
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-case-declarations, max-len */
var _require = __webpack_require__(0),
    BigInteger = _require.BigInteger;

/**
 * thanks for Tom Wu : http://www-cs-students.stanford.edu/~tjw/jsbn/
 *
 * Basic Javascript Elliptic Curve implementation
 * Ported loosely from BouncyCastle's Java EC code
 * Only Fp curves implemented for now
 */

var THREE = new BigInteger('3');

/**
 * 椭圆曲线域元素
 */

var ECFieldElementFp = function () {
  function ECFieldElementFp(q, x) {
    _classCallCheck(this, ECFieldElementFp);

    this.x = x;
    this.q = q;
    // TODO if (x.compareTo(q) >= 0) error
  }

  /**
   * 判断相等
   */


  ECFieldElementFp.prototype.equals = function equals(other) {
    if (other === this) return true;
    return this.q.equals(other.q) && this.x.equals(other.x);
  };

  /**
   * 返回具体数值
   */


  ECFieldElementFp.prototype.toBigInteger = function toBigInteger() {
    return this.x;
  };

  /**
   * 取反
   */


  ECFieldElementFp.prototype.negate = function negate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
  };

  /**
   * 相加
   */


  ECFieldElementFp.prototype.add = function add(b) {
    return new ECFieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q));
  };

  /**
   * 相减
   */


  ECFieldElementFp.prototype.subtract = function subtract(b) {
    return new ECFieldElementFp(this.q, this.x.subtract(b.toBigInteger()).mod(this.q));
  };

  /**
   * 相乘
   */


  ECFieldElementFp.prototype.multiply = function multiply(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger()).mod(this.q));
  };

  /**
   * 相除
   */


  ECFieldElementFp.prototype.divide = function divide(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q));
  };

  /**
   * 平方
   */


  ECFieldElementFp.prototype.square = function square() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
  };

  return ECFieldElementFp;
}();

var ECPointFp = function () {
  function ECPointFp(curve, x, y, z) {
    _classCallCheck(this, ECPointFp);

    this.curve = curve;
    this.x = x;
    this.y = y;
    // 标准射影坐标系：zinv == null 或 z * zinv == 1
    this.z = z == null ? BigInteger.ONE : z;
    this.zinv = null;
    // TODO: compression flag
  }

  ECPointFp.prototype.getX = function getX() {
    if (this.zinv === null) this.zinv = this.z.modInverse(this.curve.q);

    return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  };

  ECPointFp.prototype.getY = function getY() {
    if (this.zinv === null) this.zinv = this.z.modInverse(this.curve.q);

    return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  };

  /**
   * 判断相等
   */


  ECPointFp.prototype.equals = function equals(other) {
    if (other === this) return true;
    if (this.isInfinity()) return other.isInfinity();
    if (other.isInfinity()) return this.isInfinity();

    // u = y2 * z1 - y1 * z2
    var u = other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q);
    if (!u.equals(BigInteger.ZERO)) return false;

    // v = x2 * z1 - x1 * z2
    var v = other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q);
    return v.equals(BigInteger.ZERO);
  };

  /**
   * 是否是无穷远点
   */


  ECPointFp.prototype.isInfinity = function isInfinity() {
    if (this.x === null && this.y === null) return true;
    return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
  };

  /**
   * 取反，x 轴对称点
   */


  ECPointFp.prototype.negate = function negate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
  };

  /**
   * 相加
   *
   * 标准射影坐标系：
   *
   * λ1 = x1 * z2
   * λ2 = x2 * z1
   * λ3 = λ1 − λ2
   * λ4 = y1 * z2
   * λ5 = y2 * z1
   * λ6 = λ4 − λ5
   * λ7 = λ1 + λ2
   * λ8 = z1 * z2
   * λ9 = λ3^2
   * λ10 = λ3 * λ9
   * λ11 = λ8 * λ6^2 − λ7 * λ9
   * x3 = λ3 * λ11
   * y3 = λ6 * (λ9 * λ1 − λ11) − λ4 * λ10
   * z3 = λ10 * λ8
   */


  ECPointFp.prototype.add = function add(b) {
    if (this.isInfinity()) return b;
    if (b.isInfinity()) return this;

    var x1 = this.x.toBigInteger();
    var y1 = this.y.toBigInteger();
    var z1 = this.z;
    var x2 = b.x.toBigInteger();
    var y2 = b.y.toBigInteger();
    var z2 = b.z;
    var q = this.curve.q;

    var w1 = x1.multiply(z2).mod(q);
    var w2 = x2.multiply(z1).mod(q);
    var w3 = w1.subtract(w2);
    var w4 = y1.multiply(z2).mod(q);
    var w5 = y2.multiply(z1).mod(q);
    var w6 = w4.subtract(w5);

    if (BigInteger.ZERO.equals(w3)) {
      if (BigInteger.ZERO.equals(w6)) {
        return this.twice(); // this == b，计算自加
      }
      return this.curve.infinity; // this == -b，则返回无穷远点
    }

    var w7 = w1.add(w2);
    var w8 = z1.multiply(z2).mod(q);
    var w9 = w3.square().mod(q);
    var w10 = w3.multiply(w9).mod(q);
    var w11 = w8.multiply(w6.square()).subtract(w7.multiply(w9)).mod(q);

    var x3 = w3.multiply(w11).mod(q);
    var y3 = w6.multiply(w9.multiply(w1).subtract(w11)).subtract(w4.multiply(w10)).mod(q);
    var z3 = w10.multiply(w8).mod(q);

    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
  };

  /**
   * 自加
   *
   * 标准射影坐标系：
   *
   * λ1 = 3 * x1^2 + a * z1^2
   * λ2 = 2 * y1 * z1
   * λ3 = y1^2
   * λ4 = λ3 * x1 * z1
   * λ5 = λ2^2
   * λ6 = λ1^2 − 8 * λ4
   * x3 = λ2 * λ6
   * y3 = λ1 * (4 * λ4 − λ6) − 2 * λ5 * λ3
   * z3 = λ2 * λ5
   */


  ECPointFp.prototype.twice = function twice() {
    if (this.isInfinity()) return this;
    if (!this.y.toBigInteger().signum()) return this.curve.infinity;

    var x1 = this.x.toBigInteger();
    var y1 = this.y.toBigInteger();
    var z1 = this.z;
    var q = this.curve.q;
    var a = this.curve.a.toBigInteger();

    var w1 = x1.square().multiply(THREE).add(a.multiply(z1.square())).mod(q);
    var w2 = y1.shiftLeft(1).multiply(z1).mod(q);
    var w3 = y1.square().mod(q);
    var w4 = w3.multiply(x1).multiply(z1).mod(q);
    var w5 = w2.square().mod(q);
    var w6 = w1.square().subtract(w4.shiftLeft(3)).mod(q);

    var x3 = w2.multiply(w6).mod(q);
    var y3 = w1.multiply(w4.shiftLeft(2).subtract(w6)).subtract(w5.shiftLeft(1).multiply(w3)).mod(q);
    var z3 = w2.multiply(w5).mod(q);

    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
  };

  /**
   * 倍点计算
   */


  ECPointFp.prototype.multiply = function multiply(k) {
    if (this.isInfinity()) return this;
    if (!k.signum()) return this.curve.infinity;

    // 使用加减法
    var k3 = k.multiply(THREE);
    var neg = this.negate();
    var Q = this;

    for (var i = k3.bitLength() - 2; i > 0; i--) {
      Q = Q.twice();

      var k3Bit = k3.testBit(i);
      var kBit = k.testBit(i);

      if (k3Bit !== kBit) {
        Q = Q.add(k3Bit ? this : neg);
      }
    }

    return Q;
  };

  return ECPointFp;
}();

/**
 * 椭圆曲线 y^2 = x^3 + ax + b
 */


var ECCurveFp = function () {
  function ECCurveFp(q, a, b) {
    _classCallCheck(this, ECCurveFp);

    this.q = q;
    this.a = this.fromBigInteger(a);
    this.b = this.fromBigInteger(b);
    this.infinity = new ECPointFp(this, null, null); // 无穷远点
  }

  /**
   * 判断两个椭圆曲线是否相等
   */


  ECCurveFp.prototype.equals = function equals(other) {
    if (other === this) return true;
    return this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b);
  };

  /**
   * 生成椭圆曲线域元素
   */


  ECCurveFp.prototype.fromBigInteger = function fromBigInteger(x) {
    return new ECFieldElementFp(this.q, x);
  };

  /**
   * 解析 16 进制串为椭圆曲线点
   */


  ECCurveFp.prototype.decodePointHex = function decodePointHex(s) {
    switch (parseInt(s.substr(0, 2), 16)) {
      // 第一个字节
      case 0:
        return this.infinity;
      case 2:
      case 3:
        // 不支持的压缩方式
        return null;
      case 4:
      case 6:
      case 7:
        var len = (s.length - 2) / 2;
        var xHex = s.substr(2, len);
        var yHex = s.substr(len + 2, len);

        return new ECPointFp(this, this.fromBigInteger(new BigInteger(xHex, 16)), this.fromBigInteger(new BigInteger(yHex, 16)));
      default:
        // 不支持
        return null;
    }
  };

  return ECCurveFp;
}();

module.exports = {
  ECPointFp: ECPointFp,
  ECCurveFp: ECCurveFp
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-bitwise, no-mixed-operators, class-methods-use-this */
var _require = __webpack_require__(0),
    BigInteger = _require.BigInteger;

var SM3Digest = __webpack_require__(2);
var _ = __webpack_require__(1);

var SM2Cipher = function () {
  function SM2Cipher() {
    _classCallCheck(this, SM2Cipher);

    this.ct = 1;
    this.p2 = null;
    this.sm3keybase = null;
    this.sm3c3 = null;
    this.key = new Array(32);
    this.keyOff = 0;
  }

  SM2Cipher.prototype.reset = function reset() {
    this.sm3keybase = new SM3Digest();
    this.sm3c3 = new SM3Digest();
    var xWords = _.hexToArray(_.leftPad(this.p2.getX().toBigInteger().toRadix(16), 64));
    var yWords = _.hexToArray(_.leftPad(this.p2.getY().toBigInteger().toRadix(16), 64));
    this.sm3keybase.blockUpdate(xWords, 0, xWords.length);
    this.sm3c3.blockUpdate(xWords, 0, xWords.length);
    this.sm3keybase.blockUpdate(yWords, 0, yWords.length);
    this.ct = 1;
    this.nextKey();
  };

  SM2Cipher.prototype.nextKey = function nextKey() {
    var sm3keycur = new SM3Digest(this.sm3keybase);
    sm3keycur.update(this.ct >> 24 & 0x00ff);
    sm3keycur.update(this.ct >> 16 & 0x00ff);
    sm3keycur.update(this.ct >> 8 & 0x00ff);
    sm3keycur.update(this.ct & 0x00ff);
    sm3keycur.doFinal(this.key, 0);
    this.keyOff = 0;
    this.ct++;
  };

  SM2Cipher.prototype.initEncipher = function initEncipher(userKey) {
    var keypair = _.generateKeyPairHex();
    var k = new BigInteger(keypair.privateKey, 16);
    var publicKey = keypair.publicKey;

    this.p2 = userKey.multiply(k); // [k](Pb)
    this.reset();

    if (publicKey.length > 128) {
      publicKey = publicKey.substr(publicKey.length - 128);
    }

    return publicKey;
  };

  SM2Cipher.prototype.encryptBlock = function encryptBlock(data) {
    this.sm3c3.blockUpdate(data, 0, data.length);
    for (var i = 0; i < data.length; i++) {
      if (this.keyOff === this.key.length) {
        this.nextKey();
      }
      data[i] ^= this.key[this.keyOff++] & 0xff;
    }
  };

  SM2Cipher.prototype.initDecipher = function initDecipher(userD, c1) {
    this.p2 = c1.multiply(userD);
    this.reset();
  };

  SM2Cipher.prototype.decryptBlock = function decryptBlock(data) {
    for (var i = 0; i < data.length; i++) {
      if (this.keyOff === this.key.length) {
        this.nextKey();
      }
      data[i] ^= this.key[this.keyOff++] & 0xff;
    }
    this.sm3c3.blockUpdate(data, 0, data.length);
  };

  SM2Cipher.prototype.doFinal = function doFinal(c3) {
    var yWords = _.hexToArray(_.leftPad(this.p2.getY().toBigInteger().toRadix(16), 64));
    this.sm3c3.blockUpdate(yWords, 0, yWords.length);
    this.sm3c3.doFinal(c3, 0);
    this.reset();
  };

  SM2Cipher.prototype.createPoint = function createPoint(x, y) {
    var publicKey = '04' + x + y;
    var point = _.getGlobalCurve().decodePointHex(publicKey);
    return point;
  };

  return SM2Cipher;
}();

module.exports = SM2Cipher;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 左补0到指定长度
 */
function leftPad(input, num) {
  if (input.length >= num) return input;

  return new Array(num - input.length + 1).join('0') + input;
}

/**
 * 二进制转化为十六进制
 */
function binary2hex(binary) {
  var binaryLength = 8;
  var hex = '';
  for (var i = 0; i < binary.length / binaryLength; i++) {
    hex += leftPad(parseInt(binary.substr(i * binaryLength, binaryLength), 2).toString(16), 2);
  }
  return hex;
}

/**
 * 十六进制转化为二进制
 */
function hex2binary(hex) {
  var hexLength = 2;
  var binary = '';
  for (var i = 0; i < hex.length / hexLength; i++) {
    binary += leftPad(parseInt(hex.substr(i * hexLength, hexLength), 16).toString(2), 8);
  }
  return binary;
}

/**
 * 普通字符串转化为二进制
 */
function str2binary(str) {
  var binary = '';
  for (var i = 0, len = str.length; i < len; i++) {
    var ch = str[i];
    binary += leftPad(ch.codePointAt(0).toString(2), 8);
  }
  return binary;
}

/**
 * 循环左移
 */
function rol(str, n) {
  return str.substring(n % str.length) + str.substr(0, n % str.length);
}

/**
 * 二进制运算
 */
function binaryCal(x, y, method) {
  var a = x || '';
  var b = y || '';
  var result = [];
  var prevResult = void 0;

  for (var i = a.length - 1; i >= 0; i--) {
    // 大端
    prevResult = method(a[i], b[i], prevResult);
    result[i] = prevResult[0];
  }
  return result.join('');
}

/**
 * 二进制异或运算
 */
function xor(x, y) {
  return binaryCal(x, y, function (a, b) {
    return [a === b ? '0' : '1'];
  });
}

/**
 * 二进制与运算
 */
function and(x, y) {
  return binaryCal(x, y, function (a, b) {
    return [a === '1' && b === '1' ? '1' : '0'];
  });
}

/**
 * 二进制或运算
 */
function or(x, y) {
  return binaryCal(x, y, function (a, b) {
    return [a === '1' || b === '1' ? '1' : '0'];
  }); // a === '0' && b === '0' ? '0' : '1'
}

/**
 * 二进制与运算
 */
function add(x, y) {
  var result = binaryCal(x, y, function (a, b, prevResult) {
    var carry = prevResult ? prevResult[1] : '0' || false;

    // a,b不等时,carry不变，结果与carry相反
    // a,b相等时，结果等于原carry，新carry等于a
    if (a !== b) return [carry === '0' ? '1' : '0', carry];

    return [carry, a];
  });

  return result;
}

/**
 * 二进制非运算
 */
function not(x) {
  return binaryCal(x, undefined, function (a) {
    return [a === '1' ? '0' : '1'];
  });
}

function calMulti(method) {
  return function () {
    for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
      arr[_key] = arguments[_key];
    }

    return arr.reduce(function (prev, curr) {
      return method(prev, curr);
    });
  };
}

/**
 * 压缩函数中的置换函数 P1(X) = X xor (X <<< 9) xor (X <<< 17)
 */
function P0(X) {
  return calMulti(xor)(X, rol(X, 9), rol(X, 17));
}

/**
 * 消息扩展中的置换函数 P1(X) = X xor (X <<< 15) xor (X <<< 23)
 */
function P1(X) {
  return calMulti(xor)(X, rol(X, 15), rol(X, 23));
}

function FF(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? calMulti(xor)(X, Y, Z) : calMulti(or)(and(X, Y), and(X, Z), and(Y, Z));
}

function GG(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? calMulti(xor)(X, Y, Z) : or(and(X, Y), and(not(X), Z));
}

function T(j) {
  return j >= 0 && j <= 15 ? hex2binary('79cc4519') : hex2binary('7a879d8a');
}

/**
 * 压缩函数
 */
function CF(V, Bi) {
  // 消息扩展
  var wordLength = 32;
  var W = [];
  var M = []; // W'

  // 将消息分组B划分为16个字W0， W1，…… ，W15 （字为长度为32的比特串）
  for (var i = 0; i < 16; i++) {
    W.push(Bi.substr(i * wordLength, wordLength));
  }

  // W[j] <- P1(W[j−16] xor W[j−9] xor (W[j−3] <<< 15)) xor (W[j−13] <<< 7) xor W[j−6]
  for (var j = 16; j < 68; j++) {
    W.push(calMulti(xor)(P1(calMulti(xor)(W[j - 16], W[j - 9], rol(W[j - 3], 15))), rol(W[j - 13], 7), W[j - 6]));
  }

  // W′[j] = W[j] xor W[j+4]
  for (var _j = 0; _j < 64; _j++) {
    M.push(xor(W[_j], W[_j + 4]));
  }

  // 压缩
  var wordRegister = []; // 字寄存器
  for (var _j2 = 0; _j2 < 8; _j2++) {
    wordRegister.push(V.substr(_j2 * wordLength, wordLength));
  }

  var A = wordRegister[0];
  var B = wordRegister[1];
  var C = wordRegister[2];
  var D = wordRegister[3];
  var E = wordRegister[4];
  var F = wordRegister[5];
  var G = wordRegister[6];
  var H = wordRegister[7];

  // 中间变量
  var SS1 = void 0;
  var SS2 = void 0;
  var TT1 = void 0;
  var TT2 = void 0;
  for (var _j3 = 0; _j3 < 64; _j3++) {
    SS1 = rol(calMulti(add)(rol(A, 12), E, rol(T(_j3), _j3)), 7);
    SS2 = xor(SS1, rol(A, 12));

    TT1 = calMulti(add)(FF(A, B, C, _j3), D, SS2, M[_j3]);
    TT2 = calMulti(add)(GG(E, F, G, _j3), H, SS1, W[_j3]);

    D = C;
    C = rol(B, 9);
    B = A;
    A = TT1;
    H = G;
    G = rol(F, 19);
    F = E;
    E = P0(TT2);
  }

  return xor([A, B, C, D, E, F, G, H].join(''), V);
}

module.exports = function (str) {
  var binary = str2binary(str);

  // 填充
  var len = binary.length;

  // k是满足len + 1 + k = 448mod512的最小的非负整数
  var k = len % 512;

  // 如果 448 <= (512 % len) < 512，需要多补充 (len % 448) 比特'0'以满足总比特长度为512的倍数
  k = k >= 448 ? 512 - k % 448 - 1 : 448 - k - 1;

  var m = (binary + '1' + leftPad('', k) + leftPad(len.toString(2), 64)).toString(); // k个0

  // 迭代压缩
  var n = (len + k + 65) / 512;

  var V = hex2binary('7380166f4914b2b9172442d7da8a0600a96f30bc163138aae38dee4db0fb0e4e');
  for (var i = 0; i <= n - 1; i++) {
    var B = m.substr(512 * i, 512);
    V = CF(V, B);
  }
  return binary2hex(V);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-bitwise, no-mixed-operators, complexity */
var DECRYPT = 0;
var CBC = 0;
var ROUND = 32;
var BLOCK = 16;

var Sbox = [0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05, 0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99, 0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62, 0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6, 0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8, 0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35, 0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87, 0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e, 0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1, 0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3, 0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f, 0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51, 0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8, 0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0, 0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84, 0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48];

var CK = [0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269, 0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9, 0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249, 0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9, 0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229, 0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299, 0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209, 0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279];

/**
 * 16 进制串转字节数组
 */
function hexToArray(str) {
  var arr = [];
  for (var i = 0, len = str.length; i < len; i += 2) {
    arr.push(parseInt(str.substr(i, 2), 16));
  }
  return arr;
}

/**
 * 字节数组转 16 进制串
 */
function ArrayToHex(arr) {
  return arr.map(function (item) {
    item = item.toString(16);
    return item.length === 1 ? '0' + item : item;
  }).join('');
}

/**
 * utf8 串转字节数组
 */
function utf8ToArray(str) {
  var arr = [];

  for (var i = 0, len = str.length; i < len; i++) {
    var point = str.charCodeAt(i);

    if (point <= 0x007f) {
      // 单子节，标量值：00000000 00000000 0zzzzzzz
      arr.push(point);
    } else if (point <= 0x07ff) {
      // 双字节，标量值：00000000 00000yyy yyzzzzzz
      arr.push(0xc0 | point >>> 6); // 110yyyyy（0xc0-0xdf）
      arr.push(0x80 | point & 0x3f); // 10zzzzzz（0x80-0xbf）
    } else {
      // 三字节：标量值：00000000 xxxxyyyy yyzzzzzz
      arr.push(0xe0 | point >>> 12); // 1110xxxx（0xe0-0xef）
      arr.push(0x80 | point >>> 6 & 0x3f); // 10yyyyyy（0x80-0xbf）
      arr.push(0x80 | point & 0x3f); // 10zzzzzz（0x80-0xbf）
    }
  }

  return arr;
}

/**
 * 字节数组转 utf8 串
 */
function arrayToUtf8(arr) {
  var str = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] >= 0xe0 && arr[i] <= 0xef) {
      // 三字节
      str.push(String.fromCharCode(((arr[i] & 0x0f) << 12) + ((arr[i + 1] & 0x3f) << 6) + (arr[i + 2] & 0x3f)));
      i += 2;
    } else if (arr[i] >= 0xc0 && arr[i] <= 0xdf) {
      // 双字节
      str.push(String.fromCharCode(((arr[i] & 0x1f) << 6) + (arr[i + 1] & 0x3f)));
      i++;
    } else {
      // 单字节
      str.push(String.fromCharCode(arr[i]));
    }
  }

  return str.join('');
}

/**
 * 32 比特循环左移
 */
function rotl(x, y) {
  return x << y | x >>> 32 - y;
}

/**
 * 非线性变换
 */
function byteSub(a) {
  return (Sbox[a >>> 24 & 0xFF] & 0xFF) << 24 | (Sbox[a >>> 16 & 0xFF] & 0xFF) << 16 | (Sbox[a >>> 8 & 0xFF] & 0xFF) << 8 | Sbox[a & 0xFF] & 0xFF;
}

/**
 * 线性变换，加密/解密用
 */
function l1(b) {
  return b ^ rotl(b, 2) ^ rotl(b, 10) ^ rotl(b, 18) ^ rotl(b, 24);
}

/**
 * 线性变换，生成轮密钥用
 */
function l2(b) {
  return b ^ rotl(b, 13) ^ rotl(b, 23);
}

/**
 * 以一组 128 比特进行加密/解密操作
 */
function sms4Crypt(input, output, roundKey) {
  var x = new Array(4);

  // 字节数组转成字数组（此处 1 字 = 32 比特）
  var tmp = new Array(4);
  for (var i = 0; i < 4; i++) {
    tmp[0] = input[0 + 4 * i] & 0xff;
    tmp[1] = input[1 + 4 * i] & 0xff;
    tmp[2] = input[2 + 4 * i] & 0xff;
    tmp[3] = input[3 + 4 * i] & 0xff;
    x[i] = tmp[0] << 24 | tmp[1] << 16 | tmp[2] << 8 | tmp[3];
  }

  // x[i + 4] = x[i] ^ l1(byteSub(x[i + 1] ^ x[i + 2] ^ x[i + 3] ^ roundKey[i]))
  for (var r = 0, mid; r < 32; r += 4) {
    mid = x[1] ^ x[2] ^ x[3] ^ roundKey[r + 0];
    x[0] ^= l1(byteSub(mid)); // x[4]

    mid = x[2] ^ x[3] ^ x[0] ^ roundKey[r + 1];
    x[1] ^= l1(byteSub(mid)); // x[5]

    mid = x[3] ^ x[0] ^ x[1] ^ roundKey[r + 2];
    x[2] ^= l1(byteSub(mid)); // x[6]

    mid = x[0] ^ x[1] ^ x[2] ^ roundKey[r + 3];
    x[3] ^= l1(byteSub(mid)); // x[7]
  }

  // 反序变换
  for (var j = 0; j < 16; j += 4) {
    output[j] = x[3 - j / 4] >>> 24 & 0xff;
    output[j + 1] = x[3 - j / 4] >>> 16 & 0xff;
    output[j + 2] = x[3 - j / 4] >>> 8 & 0xff;
    output[j + 3] = x[3 - j / 4] & 0xff;
  }
}

/**
 * 密钥扩展算法
 */
function sms4KeyExt(key, roundKey, cryptFlag) {
  var x = new Array(4);

  // 字节数组转成字数组（此处 1 字 = 32 比特）
  var tmp = new Array(4);
  for (var i = 0; i < 4; i++) {
    tmp[0] = key[0 + 4 * i] & 0xff;
    tmp[1] = key[1 + 4 * i] & 0xff;
    tmp[2] = key[2 + 4 * i] & 0xff;
    tmp[3] = key[3 + 4 * i] & 0xff;
    x[i] = tmp[0] << 24 | tmp[1] << 16 | tmp[2] << 8 | tmp[3];
  }

  // 与系统参数做异或
  x[0] ^= 0xa3b1bac6;
  x[1] ^= 0x56aa3350;
  x[2] ^= 0x677d9197;
  x[3] ^= 0xb27022dc;

  // roundKey[i] = x[i + 4] = x[i] ^ l2(byteSub(x[i + 1] ^ x[i + 2] ^ x[i + 3] ^ CK[i]))
  for (var r = 0, mid; r < 32; r += 4) {
    mid = x[1] ^ x[2] ^ x[3] ^ CK[r + 0];
    roundKey[r + 0] = x[0] ^= l2(byteSub(mid)); // x[4]

    mid = x[2] ^ x[3] ^ x[0] ^ CK[r + 1];
    roundKey[r + 1] = x[1] ^= l2(byteSub(mid)); // x[5]

    mid = x[3] ^ x[0] ^ x[1] ^ CK[r + 2];
    roundKey[r + 2] = x[2] ^= l2(byteSub(mid)); // x[6]

    mid = x[0] ^ x[1] ^ x[2] ^ CK[r + 3];
    roundKey[r + 3] = x[3] ^= l2(byteSub(mid)); // x[7]
  }

  // 解密时使用反序的轮密钥
  if (cryptFlag === DECRYPT) {
    for (var _r = 0, _mid; _r < 16; _r++) {
      _mid = roundKey[_r];
      roundKey[_r] = roundKey[31 - _r];
      roundKey[31 - _r] = _mid;
    }
  }
}

function sm4(inArray, key, cryptFlag) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$padding = _ref.padding,
      padding = _ref$padding === undefined ? 'pkcs#5' : _ref$padding,
      mode = _ref.mode,
      _ref$output = _ref.output,
      output = _ref$output === undefined ? 'string' : _ref$output;

  if (mode === CBC) {}
  // @TODO，CBC 模式，默认走 ECB 模式


  // 检查 key
  if (typeof key === 'string') key = hexToArray(key);
  if (key.length !== 128 / 8) {
    // key 不是 128 比特
    throw new Error('key is invalid');
  }

  // 检查输入
  if (typeof inArray === 'string') {
    if (cryptFlag !== DECRYPT) {
      // 加密，输入为 utf8 串
      inArray = utf8ToArray(inArray);
    } else {
      // 解密，输入为 16 进制串
      inArray = hexToArray(inArray);
    }
  } else {
    inArray = [].concat(inArray);
  }

  // 新增填充
  if (padding === 'pkcs#5' && cryptFlag !== DECRYPT) {
    var paddingCount = BLOCK - inArray.length % BLOCK;
    for (var i = 0; i < paddingCount; i++) {
      inArray.push(paddingCount);
    }
  }

  // 生成轮密钥
  var roundKey = new Array(ROUND);
  sms4KeyExt(key, roundKey, cryptFlag);

  var outArray = [];
  var restLen = inArray.length;
  var point = 0;
  while (restLen >= BLOCK) {
    var input = inArray.slice(point, point + 16);
    var _output = new Array(16);
    sms4Crypt(input, _output, roundKey);

    for (var _i = 0; _i < BLOCK; _i++) {
      outArray[point + _i] = _output[_i];
    }

    restLen -= BLOCK;
    point += BLOCK;
  }

  // 去除填充
  if (padding === 'pkcs#5' && cryptFlag === DECRYPT) {
    var _paddingCount = outArray[outArray.length - 1];
    outArray.splice(outArray.length - _paddingCount, _paddingCount);
  }

  // 调整输出
  if (output !== 'array') {
    if (cryptFlag !== DECRYPT) {
      // 加密，输出转 16 进制串
      return ArrayToHex(outArray);
    } else {
      // 解密，输出转 utf8 串
      return arrayToUtf8(outArray);
    }
  } else {
    return outArray;
  }
}

module.exports = {
  encrypt: function encrypt(inArray, key, options) {
    return sm4(inArray, key, 1, options);
  },
  decrypt: function decrypt(inArray, key, options) {
    return sm4(inArray, key, 0, options);
  }
};

/***/ })
/******/ ]);