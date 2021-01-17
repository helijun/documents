(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("print-js", [], factory);
	else if(typeof exports === 'object')
		exports["print-js"] = factory();
	else
		root["print-js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal__ = __webpack_require__(3);



var Print = {
  send: function send(params, printFrame) {
    // Append iframe element to document body
    document.getElementsByTagName('body')[0].appendChild(printFrame);

    // Get iframe element
    var iframeElement = document.getElementById(params.frameId);

    // Wait for iframe to load all content
    if (params.type === 'pdf' && (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isIE() || __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isEdge())) {
      iframeElement.setAttribute('onload', finishPrint(iframeElement, params));
    } else {
      printFrame.onload = function () {
        if (params.type === 'pdf') {
          finishPrint(iframeElement, params);
        } else {
          // Get iframe element document
          var printDocument = iframeElement.contentWindow || iframeElement.contentDocument;
          if (printDocument.document) printDocument = printDocument.document;

          // Inject printable html into iframe body
          printDocument.body.innerHTML = params.htmlData;

          // Add custom style
          if (params.type !== 'pdf' && params.style !== null) {
            // Create style element
            var style = document.createElement('style');
            style.innerHTML = params.style;

            // Append style element to iframe's head
            printDocument.head.appendChild(style);
          }

          // If printing image, wait for it to load inside the iframe
          if (params.type === 'image') {
            loadIframeImages(printDocument, params).then(function () {
              finishPrint(iframeElement, params);
            });
          } else {
            finishPrint(iframeElement, params);
          }
        }
      };
    }
  }
};

function finishPrint(iframeElement, params) {
  iframeElement.focus();

  // If Edge or IE, try catch with execCommand
  if (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isEdge() || __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isIE()) {
    try {
      iframeElement.contentWindow.document.execCommand('print', false, null);
    } catch (e) {
      iframeElement.contentWindow.print();
    }
  } else {
    // Other browsers
    iframeElement.contentWindow.print();
  }

  // If we are showing a feedback message to user, remove it
  if (params.showModal) __WEBPACK_IMPORTED_MODULE_1__modal__["a" /* default */].close();

  // Check for a finished loading hook function
  if (params.onLoadingEnd) params.onLoadingEnd();

  // If preloading pdf files, clean blob url
  if (params.showModal || params.onLoadingStart) window.URL.revokeObjectURL(params.printable);

  // If a onPrintDialogClose callback is given, execute it
  if (params.onPrintDialogClose) {
    var event = 'mouseover';

    if (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isChrome() || __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isFirefox()) {
      // Firefox will require an extra click in the document
      // to fire the focus event. Should we console.warn that?
      event = 'focus';
    }
    var handler = function handler() {
      // Make sure the event only happens once.
      window.removeEventListener(event, handler);

      params.onPrintDialogClose();
    };

    window.addEventListener(event, handler);
  }
}

function loadIframeImages(printDocument, params) {
  var promises = [];

  params.printable.forEach(function (image, index) {
    return promises.push(loadIframeImage(printDocument, index));
  });

  return Promise.all(promises);
}

function loadIframeImage(printDocument, index) {
  return new Promise(function (resolve) {
    var image = printDocument ? printDocument.getElementById('printableImage' + index) : null;

    if (!image || typeof image.naturalWidth === 'undefined' || image.naturalWidth === 0) {
      setTimeout(function () {
        loadIframeImage(printDocument, index);
      }, 500);
    } else {
      resolve();
    }
  });
}

/* harmony default export */ __webpack_exports__["a"] = (Print);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addWrapper;
/* harmony export (immutable) */ __webpack_exports__["b"] = capitalizePrint;
/* harmony export (immutable) */ __webpack_exports__["c"] = collectStyles;
/* harmony export (immutable) */ __webpack_exports__["d"] = loopNodesCollectStyles;
/* harmony export (immutable) */ __webpack_exports__["e"] = addHeader;
function addWrapper(htmlData, params) {
  var bodyStyle = 'font-family:' + params.font + ' !important; font-size: ' + params.font_size + ' !important; width:100%;';
  return '<div style="' + bodyStyle + '">' + htmlData + '</div>';
}

function capitalizePrint(obj) {
  return obj.charAt(0).toUpperCase() + obj.slice(1);
}

function collectStyles(element, params) {
  var win = document.defaultView || window;

  // String variable to hold styling for each element
  var elementStyle = '';

  // Loop over computed styles
  var styles = win.getComputedStyle(element, '');

  Object.keys(styles).map(function (key) {
    // Check if style should be processed
    if (params.targetStyles.indexOf('*') !== -1 || params.targetStyle.indexOf(styles[key]) !== -1 || targetStylesMatch(params.targetStyles, styles[key])) {
      if (styles.getPropertyValue(styles[key])) elementStyle += styles[key] + ':' + styles.getPropertyValue(styles[key]) + ';';
    }
  });

  // Print friendly defaults
  elementStyle += 'max-width: ' + params.maxWidth + 'px !important;' + params.font_size + ' !important;';

  return elementStyle;
}

function targetStylesMatch(styles, value) {
  for (var i = 0; i < styles.length; i++) {
    if (value.indexOf(styles[i]) !== -1) return true;
  }
  return false;
}

function loopNodesCollectStyles(elements, params) {
  for (var n = 0; n < elements.length; n++) {
    var currentElement = elements[n];

    // Check if we are skiping this element
    if (params.ignoreElements.indexOf(currentElement.getAttribute('id')) !== -1) {
      currentElement.parentNode.removeChild(currentElement);
      continue;
    }

    // Form Printing - check if is element Input
    var tag = currentElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      // Save style to variable
      var textStyle = collectStyles(currentElement, params);

      // Remove INPUT element and insert a text node
      var parent = currentElement.parentNode;

      // Get text value
      var textNode = tag === 'SELECT' ? document.createTextNode(currentElement.options[currentElement.selectedIndex].text) : document.createTextNode(currentElement.value);

      // Create text element
      var textElement = document.createElement('div');
      textElement.appendChild(textNode);

      // Add style to text
      textElement.setAttribute('style', textStyle);

      // Add text
      parent.appendChild(textElement);

      // Remove input
      parent.removeChild(currentElement);
    } else {
      // Get all styling for print element
      currentElement.setAttribute('style', collectStyles(currentElement, params));
    }

    // Check if more elements in tree
    var children = currentElement.children;

    if (children && children.length) {
      loopNodesCollectStyles(children, params);
    }
  }
}

function addHeader(printElement, header, headerStyle) {
  // Create header element
  var headerElement = document.createElement('h1');

  // Create header text node
  var headerNode = document.createTextNode(header);

  // Build and style
  headerElement.appendChild(headerNode);
  headerElement.setAttribute('style', headerStyle);

  printElement.insertBefore(headerElement, printElement.childNodes[0]);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Browser = {
  // Firefox 1.0+
  isFirefox: function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
  },
  // Internet Explorer 6-11
  isIE: function isIE() {
    return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;
  },
  // Edge 20+
  isEdge: function isEdge() {
    return !Browser.isIE() && !!window.StyleMedia;
  },
  // Chrome 1+
  isChrome: function isChrome() {
    return !!window.chrome && !!window.chrome.webstore;
  },
  // At least Safari 3+: "[object HTMLElementConstructor]"
  isSafari: function isSafari() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || navigator.userAgent.toLowerCase().indexOf('safari') !== -1;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Browser);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Modal = {
  show: function show(params) {
    // Build modal
    var modalStyle = 'font-family:sans-serif; ' + 'display:table; ' + 'text-align:center; ' + 'font-weight:300; ' + 'font-size:30px; ' + 'left:0; top:0;' + 'position:fixed; ' + 'z-index: 9990;' + 'color: #0460B5; ' + 'width: 100%; ' + 'height: 100%; ' + 'background-color:rgba(255,255,255,.9);' + 'transition: opacity .3s ease;';

    // Create wrapper
    var printModal = document.createElement('div');
    printModal.setAttribute('style', modalStyle);
    printModal.setAttribute('id', 'printJS-Modal');

    // Create content div
    var contentDiv = document.createElement('div');
    contentDiv.setAttribute('style', 'display:table-cell; vertical-align:middle; padding-bottom:100px;');

    // Add close button (requires print.css)
    var closeButton = document.createElement('div');
    closeButton.setAttribute('class', 'printClose');
    closeButton.setAttribute('id', 'printClose');
    contentDiv.appendChild(closeButton);

    // Add spinner (requires print.css)
    var spinner = document.createElement('span');
    spinner.setAttribute('class', 'printSpinner');
    contentDiv.appendChild(spinner);

    // Add message
    var messageNode = document.createTextNode(params.modalMessage);
    contentDiv.appendChild(messageNode);

    // Add contentDiv to printModal
    printModal.appendChild(contentDiv);

    // Append print modal element to document body
    document.getElementsByTagName('body')[0].appendChild(printModal);

    // Add event listener to close button
    document.getElementById('printClose').addEventListener('click', function () {
      Modal.close();
    });
  },
  close: function close() {
    var printFrame = document.getElementById('printJS-Modal');

    printFrame.parentNode.removeChild(printFrame);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_init__ = __webpack_require__(7);


var printjs = __WEBPACK_IMPORTED_MODULE_0__js_init__["a" /* default */].init;

if (typeof window !== 'undefined') {
  window.printJS = printjs;
}

/* harmony default export */ __webpack_exports__["default"] = (printjs);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__print__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = ({
  print: function print(params, printFrame) {
    // Get HTML printable element
    var printElement = document.getElementById(params.printable);

    // Check if element exists
    if (!printElement) {
      window.console.error('Invalid HTML element id: ' + params.printable);

      return false;
    }

    // Make a copy of the printElement to prevent DOM changes
    var printableElement = document.createElement('div');
    printableElement.appendChild(printElement.cloneNode(true));

    // Add cloned element to DOM, to have DOM element methods available. It will also be easier to colect styles
    printableElement.setAttribute('style', 'height:0; overflow:hidden;');
    printableElement.setAttribute('id', 'printJS-html');
    printElement.parentNode.appendChild(printableElement);

    // Update printableElement variable with newly created DOM element
    printableElement = document.getElementById('printJS-html');

    // Process html styles
    if (params.scanStyles === true) {
      // Optional - include margin and padding
      if (params.honorMarginPadding) params.targetStyles.push('margin', 'padding');

      // Optional - include color
      if (params.honorColor) params.targetStyles.push('color');

      // Get main element styling
      printableElement.setAttribute('style', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions__["c" /* collectStyles */])(printableElement, params) + 'margin:0 !important;');

      // Get all children elements
      var elements = printableElement.children;

      // Get styles for all children elements
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions__["d" /* loopNodesCollectStyles */])(elements, params);
    }

    // Add header
    if (params.header) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions__["e" /* addHeader */])(printableElement, params.header, params.headerStyle);
    }

    // Remove DOM printableElement
    printableElement.parentNode.removeChild(printableElement);

    // Store html data
    params.htmlData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions__["a" /* addWrapper */])(printableElement.innerHTML, params);

    // Print html element contents
    __WEBPACK_IMPORTED_MODULE_1__print__["a" /* default */].send(params, printFrame);
  }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__print__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = ({
  print: function print(params, printFrame) {
    // Check if we are printing one image or multiple images
    if (params.printable.constructor !== Array) {
      // Create array with one image
      params.printable = [params.printable];
    }

    // Create printable element (container)
    var printableElement = document.createElement('div');
    printableElement.setAttribute('style', 'width:100%');

    // Load images and append
    loadImagesAndAppendToPrintableElement(printableElement, params).then(function () {
      // Check if we are adding a header
      if (params.header) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions__["e" /* addHeader */])(printableElement, params.header, params.headerStyle);

      // Store html data
      params.htmlData = printableElement.outerHTML;

      // Print image
      __WEBPACK_IMPORTED_MODULE_1__print__["a" /* default */].send(params, printFrame);
    });
  }
});

function loadImagesAndAppendToPrintableElement(printableElement, params) {
  var promises = [];

  params.printable.forEach(function (image, index) {
    // Create the image element
    var img = document.createElement('img');

    // Set image src with image file url
    img.src = image;

    // Load image
    promises.push(loadImageAndAppendToPrintableElement(printableElement, params, img, index));
  });

  return Promise.all(promises);
}

function loadImageAndAppendToPrintableElement(printableElement, params, img, index) {
  return new Promise(function (resolve) {
    img.onload = function () {
      // Create image wrapper
      var imageWrapper = document.createElement('div');
      imageWrapper.setAttribute('style', params.imageStyle);

      img.setAttribute('style', 'width:100%;');
      img.setAttribute('id', 'printableImage' + index);

      // Append image to wrapper element
      imageWrapper.appendChild(img);

      // Append wrapper element to printable element
      printableElement.appendChild(imageWrapper);

      resolve();
    };
  });
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pdf__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__html__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__image__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__json__ = __webpack_require__(8);


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };








var printTypes = ['pdf', 'html', 'image', 'json'];

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    var params = {
      printable: null,
      fallbackPrintable: null,
      type: 'pdf',
      header: null,
      headerStyle: 'font-weight: 300;',
      maxWidth: 800,
      font: 'TimesNewRoman',
      font_size: '12pt',
      honorMarginPadding: true,
      honorColor: false,
      properties: null,
      gridHeaderStyle: 'font-weight: bold; padding: 5px; border: 1px solid #dddddd;',
      gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
      showModal: false,
      onLoadingStart: null,
      onLoadingEnd: null,
      onPrintDialogClose: null,
      modalMessage: 'Retrieving Document...',
      frameId: 'printJS',
      htmlData: '',
      documentTitle: 'Document',
      targetStyle: ['clear', 'display', 'width', 'min-width', 'height', 'min-height', 'max-height'],
      targetStyles: ['border', 'box', 'break', 'text-decoration'],
      ignoreElements: [],
      imageStyle: 'width:100%;',
      repeatTableHeader: true,
      css: null,
      style: null,
      scanStyles: true

      // Check if a printable document or object was supplied
    };var args = arguments[0];
    if (args === undefined) throw new Error('printJS expects at least 1 attribute.');

    // Process parameters
    switch (typeof args === 'undefined' ? 'undefined' : _typeof(args)) {
      case 'string':
        params.printable = encodeURI(args);
        params.fallbackPrintable = params.printable;
        params.type = arguments[1] || params.type;
        break;
      case 'object':
        params.printable = args.printable;
        params.fallbackPrintable = typeof args.fallbackPrintable !== 'undefined' ? args.fallbackPrintable : params.printable;
        params.type = typeof args.type !== 'undefined' ? args.type : params.type;
        params.frameId = typeof args.frameId !== 'undefined' ? args.frameId : params.frameId;
        params.header = typeof args.header !== 'undefined' ? args.header : params.header;
        params.headerStyle = typeof args.headerStyle !== 'undefined' ? args.headerStyle : params.headerStyle;
        params.maxWidth = typeof args.maxWidth !== 'undefined' ? args.maxWidth : params.maxWidth;
        params.font = typeof args.font !== 'undefined' ? args.font : params.font;
        params.font_size = typeof args.font_size !== 'undefined' ? args.font_size : params.font_size;
        params.honorMarginPadding = typeof args.honorMarginPadding !== 'undefined' ? args.honorMarginPadding : params.honorMarginPadding;
        params.properties = typeof args.properties !== 'undefined' ? args.properties : params.properties;
        params.gridHeaderStyle = typeof args.gridHeaderStyle !== 'undefined' ? args.gridHeaderStyle : params.gridHeaderStyle;
        params.gridStyle = typeof args.gridStyle !== 'undefined' ? args.gridStyle : params.gridStyle;
        params.showModal = typeof args.showModal !== 'undefined' ? args.showModal : params.showModal;
        params.onLoadingStart = typeof args.onLoadingStart !== 'undefined' ? args.onLoadingStart : params.onLoadingStart;
        params.onLoadingEnd = typeof args.onLoadingEnd !== 'undefined' ? args.onLoadingEnd : params.onLoadingEnd;
        params.onPrintDialogClose = typeof args.onPrintDialogClose !== 'undefined' ? args.onPrintDialogClose : params.onPrintDialogClose;
        params.modalMessage = typeof args.modalMessage !== 'undefined' ? args.modalMessage : params.modalMessage;
        params.documentTitle = typeof args.documentTitle !== 'undefined' ? args.documentTitle : params.documentTitle;
        params.targetStyle = typeof args.targetStyle !== 'undefined' ? args.targetStyle : params.targetStyle;
        params.targetStyles = typeof args.targetStyles !== 'undefined' ? args.targetStyles : params.targetStyles;
        params.ignoreElements = typeof args.ignoreElements !== 'undefined' ? args.ignoreElements : params.ignoreElements;
        params.imageStyle = typeof args.imageStyle !== 'undefined' ? args.imageStyle : params.imageStyle;
        params.repeatTableHeader = typeof args.repeatTableHeader !== 'undefined' ? args.repeatTableHeader : params.repeatTableHeader;
        params.css = typeof args.css !== 'undefined' ? args.css : params.css;
        params.style = typeof args.style !== 'undefined' ? args.style : params.style;
        params.scanStyles = typeof args.scanStyles !== 'undefined' ? args.scanStyles : params.scanStyles;
        break;
      default:
        throw new Error('Unexpected argument type! Expected "string" or "object", got ' + (typeof args === 'undefined' ? 'undefined' : _typeof(args)));
    }

    // Validate printable
    if (!params.printable) throw new Error('Missing printable information.');

    // Validate type
    if (!params.type || typeof params.type !== 'string' || printTypes.indexOf(params.type.toLowerCase()) === -1) {
      throw new Error('Invalid print type. Available types are: pdf, html, image and json.');
    }

    // Check if we are showing a feedback message to the user (useful for large files)
    if (params.showModal) __WEBPACK_IMPORTED_MODULE_1__modal__["a" /* default */].show(params);

    // Check for a print start hook function
    if (params.onLoadingStart) params.onLoadingStart();

    // To prevent duplication and issues, remove any used printFrame from the DOM
    var usedFrame = document.getElementById(params.frameId);

    if (usedFrame) usedFrame.parentNode.removeChild(usedFrame);

    // Create a new iframe or embed element (IE prints blank pdf's if we use iframe)
    var printFrame = void 0;

    // Create iframe element
    printFrame = document.createElement('iframe');

    // Hide iframe
    printFrame.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute;');

    // Set iframe element id
    printFrame.setAttribute('id', params.frameId);

    // For non pdf printing, pass an html document string to srcdoc (force onload callback)
    if (params.type !== 'pdf') {
      printFrame.srcdoc = '<html><head><title>' + params.documentTitle + '</title>';

      // Attach css files
      if (params.css !== null) {
        // Add support for single file
        if (!Array.isArray(params.css)) params.css = [params.css];

        // Create link tags for each css file
        params.css.forEach(function (file) {
          printFrame.srcdoc += '<link rel="stylesheet" href="' + file + '">';
        });
      }

      printFrame.srcdoc += '</head><body></body></html>';
    }

    // Check printable type
    switch (params.type) {
      case 'pdf':
        // Check browser support for pdf and if not supported we will just open the pdf file instead
        if (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isFirefox() || __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isEdge() || __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isIE()) {
          console.info('PrintJS currently doesn\'t support PDF printing in Firefox, Internet Explorer and Edge.');
          var win = window.open(params.fallbackPrintable, '_blank');
          win.focus();
          // Make sure there is no loading modal opened
          if (params.showModal) __WEBPACK_IMPORTED_MODULE_1__modal__["a" /* default */].close();
          if (params.onLoadingEnd) params.onLoadingEnd();
        } else {
          __WEBPACK_IMPORTED_MODULE_2__pdf__["a" /* default */].print(params, printFrame);
        }
        break;
      case 'image':
        __WEBPACK_IMPORTED_MODULE_4__image__["a" /* default */].print(params, printFrame);
        break;
      case 'html':
        __WEBPACK_IMPORTED_MODULE_3__html__["a" /* default */].print(params, printFrame);
        break;
      case 'json':
        __WEBPACK_IMPORTED_MODULE_5__json__["a" /* default */].print(params, printFrame);
        break;
    }
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__print__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




/* harmony default export */ __webpack_exports__["a"] = ({
  print: function print(params, printFrame) {
    // Check if we received proper data
    if (_typeof(params.printable) !== 'object') {
      throw new Error('Invalid javascript data object (JSON).');
    }

    // Check if the repeatTableHeader is boolean
    if (typeof params.repeatTableHeader !== 'boolean') {
      throw new Error('Invalid value for repeatTableHeader attribute (JSON).');
    }

    // Check if properties were provided
    if (!params.properties || !Array.isArray(params.properties)) throw new Error('Invalid properties array for your JSON data.');

    // Variable to hold the html string
    var htmlData = '';

    // Check if there is a header on top of the table
    if (params.header) htmlData += '<h1 style="' + params.headerStyle + '">' + params.header + '</h1>';

    // Build the printable html data
    htmlData += jsonToHTML(params);

    // Store the data
    params.htmlData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions__["a" /* addWrapper */])(htmlData, params);

    // Print the json data
    __WEBPACK_IMPORTED_MODULE_1__print__["a" /* default */].send(params, printFrame);
  }
});

function jsonToHTML(params) {
  // Get the row and column data
  var data = params.printable;
  var properties = params.properties;

  // Create a html table
  var htmlData = '<table style="border-collapse: collapse; width: 100%;">';

  // Check if the header should be repeated
  if (params.repeatTableHeader) {
    htmlData += '<thead>';
  }

  // Add the table header row
  htmlData += '<tr>';

  // Add the table header columns
  for (var a = 0; a < properties.length; a++) {
    htmlData += '<th style="width:' + properties.columnSize / properties.length + '%; ' + params.gridHeaderStyle + '">' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions__["b" /* capitalizePrint */])(properties[a].displayName) + '</th>';
  }

  // Add the closing tag for the table header row
  htmlData += '</tr>';

  // If the table header is marked as repeated, add the closing tag
  if (params.repeatTableHeader) {
    htmlData += '</thead>';
  }

  // Create the table body
  htmlData += '<tbody>';

  // Add the table data rows
  for (var i = 0; i < data.length; i++) {
    // Add the row starting tag
    htmlData += '<tr>';

    // Print selected properties only
    for (var n = 0; n < properties.length; n++) {
      var stringData = data[i];

      // Support nested objects
      var property = properties[n].field.split('.');
      if (property.length > 1) {
        for (var p = 0; p < property.length; p++) {
          stringData = stringData[property[p]];
        }
      } else {
        stringData = stringData[properties[n].field];
      }

      // Add the row contents and styles
      htmlData += '<td style="width:' + properties[n].columnSize / properties.length + '%;' + params.gridStyle + '">' + stringData + '</td>';
    }

    // Add the row closing tag
    htmlData += '</tr>';
  }

  // Add the table and body closing tags
  htmlData += '</tbody></table>';

  return htmlData;
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__print__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
  print: function print(params, printFrame) {
    // Format pdf url
    params.printable = params.printable.indexOf('http') !== -1 ? params.printable : window.location.origin + (params.printable.charAt(0) !== '/' ? '/' + params.printable : params.printable);

    // If showing a loading modal or using a hook function, we will preload the pdf file
    if (params.showModal || params.onLoadingStart) {
      // Get the file through a http request
      var req = new window.XMLHttpRequest();
      req.responseType = 'arraybuffer';

      req.addEventListener('load', function () {
        // Pass response data to a blob and create a local object url
        var localPdf = new window.Blob([req.response], { type: 'application/pdf' });
        localPdf = window.URL.createObjectURL(localPdf);

        // Pass the url to the printable parameter (replacing the original pdf file url)
        // This will prevent a second request to the file (server) once the iframe loads
        params.printable = localPdf;

        send(params, printFrame);
      });

      req.open('GET', params.printable, true);
      req.send();
    } else {
      send(params, printFrame);
    }
  }
});

function send(params, printFrame) {
  // Set iframe src with pdf document url
  printFrame.setAttribute('src', params.printable);
  __WEBPACK_IMPORTED_MODULE_0__print__["a" /* default */].send(params, printFrame);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
});