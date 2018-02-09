"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common2 = require("../common/common");

var _common3 = _interopRequireDefault(_common2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dog2 = function (_common) {
    _inherits(Dog2, _common);

    function Dog2() {
        _classCallCheck(this, Dog2);

        //执行一次父类的构造，否则会报错
        var _this = _possibleConstructorReturn(this, (Dog2.__proto__ || Object.getPrototypeOf(Dog2)).call(this));

        console.log("==constructor dog==");
        return _this;
    }

    return Dog2;
}(_common3.default);

var dog2 = new Dog2();
dog2.showToast3();

exports.default = Dog2;