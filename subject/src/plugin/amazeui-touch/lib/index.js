'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fallback = exports.View = exports.Touchable = exports.Tabs = exports.TabBar = exports.Switch = exports.Slider = exports.PopoverTrigger = exports.Popover = exports.OffCanvasTrigger = exports.OffCanvas = exports.Notification = exports.NavBar = exports.Modal = exports.Loader = exports.List = exports.Field = exports.Icon = exports.Card = exports.ButtonToolbar = exports.ButtonGroup = exports.Button = exports.Badge = exports.Accordion = exports.Group = exports.Col = exports.Grid = exports.Container = exports.VERSION = undefined;

var _mixins = require('./mixins');

Object.keys(_mixins).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mixins[key];
    }
  });
});

var _Container2 = require('./Container');

var _Container3 = _interopRequireDefault(_Container2);

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

var _Col2 = require('./Col');

var _Col3 = _interopRequireDefault(_Col2);

var _Group2 = require('./Group');

var _Group3 = _interopRequireDefault(_Group2);

var _Accordion2 = require('./Accordion');

var _Accordion3 = _interopRequireDefault(_Accordion2);

var _Badge2 = require('./Badge');

var _Badge3 = _interopRequireDefault(_Badge2);

var _Button2 = require('./Button');

var _Button3 = _interopRequireDefault(_Button2);

var _ButtonGroup2 = require('./ButtonGroup');

var _ButtonGroup3 = _interopRequireDefault(_ButtonGroup2);

var _ButtonToolbar2 = require('./ButtonToolbar');

var _ButtonToolbar3 = _interopRequireDefault(_ButtonToolbar2);

var _Card2 = require('./Card');

var _Card3 = _interopRequireDefault(_Card2);

var _Icon2 = require('./Icon');

var _Icon3 = _interopRequireDefault(_Icon2);

var _Field2 = require('./Field');

var _Field3 = _interopRequireDefault(_Field2);

var _List2 = require('./List');

var _List3 = _interopRequireDefault(_List2);

var _Loader2 = require('./Loader');

var _Loader3 = _interopRequireDefault(_Loader2);

var _Modal2 = require('./Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

var _NavBar2 = require('./NavBar');

var _NavBar3 = _interopRequireDefault(_NavBar2);

var _Notification2 = require('./Notification');

var _Notification3 = _interopRequireDefault(_Notification2);

var _OffCanvas2 = require('./OffCanvas');

var _OffCanvas3 = _interopRequireDefault(_OffCanvas2);

var _OffCanvasTrigger2 = require('./OffCanvasTrigger');

var _OffCanvasTrigger3 = _interopRequireDefault(_OffCanvasTrigger2);

var _Popover2 = require('./Popover');

var _Popover3 = _interopRequireDefault(_Popover2);

var _PopoverTrigger2 = require('./PopoverTrigger');

var _PopoverTrigger3 = _interopRequireDefault(_PopoverTrigger2);

var _Slider2 = require('./Slider');

var _Slider3 = _interopRequireDefault(_Slider2);

var _Switch2 = require('./Switch');

var _Switch3 = _interopRequireDefault(_Switch2);

var _TabBar2 = require('./TabBar');

var _TabBar3 = _interopRequireDefault(_TabBar2);

var _Tabs2 = require('./Tabs');

var _Tabs3 = _interopRequireDefault(_Tabs2);

var _Touchable2 = require('./Touchable');

var _Touchable3 = _interopRequireDefault(_Touchable2);

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _fallback2 = require('./utils/fallback');

var _fallback3 = _interopRequireDefault(_fallback2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @see http://jamesknelson.com/re-exporting-es6-modules/
// @see http://exploringjs.com/es6/ch_modules.html#sec_all-exporting-styles

var VERSION = exports.VERSION = '1.0.0';

// Layout
exports.Container = _Container3.default;
exports.Grid = _Grid3.default;
exports.Col = _Col3.default;
exports.Group = _Group3.default;

// Components

exports.Accordion = _Accordion3.default;
exports.Badge = _Badge3.default;
exports.Button = _Button3.default;
exports.ButtonGroup = _ButtonGroup3.default;
exports.ButtonToolbar = _ButtonToolbar3.default;
exports.Card = _Card3.default;
exports.Icon = _Icon3.default;
exports.Field = _Field3.default;
exports.List = _List3.default;
exports.Loader = _Loader3.default;
exports.Modal = _Modal3.default;
exports.NavBar = _NavBar3.default;
exports.Notification = _Notification3.default;
exports.OffCanvas = _OffCanvas3.default;
exports.OffCanvasTrigger = _OffCanvasTrigger3.default;
exports.Popover = _Popover3.default;
exports.PopoverTrigger = _PopoverTrigger3.default;
exports.Slider = _Slider3.default;
exports.Switch = _Switch3.default;
exports.TabBar = _TabBar3.default;
exports.Tabs = _Tabs3.default;
exports.Touchable = _Touchable3.default;
exports.View = _View3.default;

// Mixins


// Compatibility fallback

exports.fallback = _fallback3.default;