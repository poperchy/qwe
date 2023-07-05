"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (factory) {
  typeof define === 'function' && define.amd ? define('scripts', factory) : factory();
})(function () {
  'use strict';

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var svg4everybody = createCommonjsModule(function (module) {
    !function (root, factory) {
      module.exports ? // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory() : root.svg4everybody = factory();
    }(commonjsGlobal, function () {
      /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
      function embed(parent, svg, target) {
        // if the target exists
        if (target) {
          // create a document fragment to hold the contents of the target
          var fragment = document.createDocumentFragment(),
              viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox"); // conditionally set the viewBox on the svg

          viewBox && svg.setAttribute("viewBox", viewBox); // copy the contents of the clone into the fragment

          for ( // clone the target
          var clone = target.cloneNode(!0); clone.childNodes.length;) {
            fragment.appendChild(clone.firstChild);
          } // append the fragment into the svg


          parent.appendChild(fragment);
        }
      }

      function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function () {
          // if the request is ready
          if (4 === xhr.readyState) {
            // get the cached html document
            var cachedDocument = xhr._cachedDocument; // ensure the cached html document based on the xhr response

            cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
            xhr._embeds.splice(0).map(function (item) {
              // get the cached target
              var target = xhr._cachedTarget[item.id]; // ensure the cached target

              target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), // embed the target into the svg
              embed(item.parent, item.svg, target);
            });
          }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
      }

      function svg4everybody(rawopts) {
        function oninterval() {
          // while the index exists in the live <use> collection
          for ( // get the cached <use> index
          var index = 0; index < uses.length;) {
            // get the current <use>
            var use = uses[index],
                parent = use.parentNode,
                svg = getSVGAncestor(parent),
                src = use.getAttribute("xlink:href") || use.getAttribute("href");

            if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), svg && src) {
              if (polyfill) {
                if (!opts.validate || opts.validate(src, svg, use)) {
                  // remove the <use> element
                  parent.removeChild(use); // parse the src and get the url and id

                  var srcSplit = src.split("#"),
                      url = srcSplit.shift(),
                      id = srcSplit.join("#"); // if the link is external

                  if (url.length) {
                    // get the cached xhr request
                    var xhr = requests[url]; // ensure the xhr request exists

                    xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                    xhr._embeds.push({
                      parent: parent,
                      svg: svg,
                      id: id
                    }), // prepare the xhr ready state change event
                    loadreadystatechange(xhr);
                  } else {
                    // embed the local id into the svg
                    embed(parent, svg, document.getElementById(id));
                  }
                } else {
                  // increase the index when the previous value was not "valid"
                  ++index, ++numberOfSvgUseElementsToBypass;
                }
              }
            } else {
              // increase the index when the previous value was not "valid"
              ++index;
            }
          } // continue the interval


          (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }

        var polyfill,
            opts = Object(rawopts),
            newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
            webkitUA = /\bAppleWebKit\/(\d+)\b/,
            olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
            edgeUA = /\bEdge\/.(\d+)\b/,
            inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe; // create xhr requests object

        var requests = {},
            requestAnimationFrame = window.requestAnimationFrame || setTimeout,
            uses = document.getElementsByTagName("use"),
            numberOfSvgUseElementsToBypass = 0; // conditionally start the interval if the polyfill is active

        polyfill && oninterval();
      }

      function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) {}

        return svg;
      }

      return svg4everybody;
    });
  });
  var scrollLock = createCommonjsModule(function (module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module.exports = factory();
    })(commonjsGlobal, function () {
      return (
        /******/
        function (modules) {
          // webpackBootstrap

          /******/
          // The module cache

          /******/
          var installedModules = {};
          /******/

          /******/
          // The require function

          /******/

          function __webpack_require__(moduleId) {
            /******/

            /******/
            // Check if module is in cache

            /******/
            if (installedModules[moduleId]) {
              /******/
              return installedModules[moduleId].exports;
              /******/
            }
            /******/
            // Create a new module (and put it into the cache)

            /******/


            var module = installedModules[moduleId] = {
              /******/
              i: moduleId,

              /******/
              l: false,

              /******/
              exports: {}
              /******/

            };
            /******/

            /******/
            // Execute the module function

            /******/

            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/

            /******/
            // Flag the module as loaded

            /******/

            module.l = true;
            /******/

            /******/
            // Return the exports of the module

            /******/

            return module.exports;
            /******/
          }
          /******/

          /******/

          /******/
          // expose the modules object (__webpack_modules__)

          /******/


          __webpack_require__.m = modules;
          /******/

          /******/
          // expose the module cache

          /******/

          __webpack_require__.c = installedModules;
          /******/

          /******/
          // define getter function for harmony exports

          /******/

          __webpack_require__.d = function (exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
              /******/
              Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
              });
              /******/
            }
            /******/

          };
          /******/

          /******/
          // define __esModule on exports

          /******/


          __webpack_require__.r = function (exports) {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
              /******/
              Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
              });
              /******/
            }
            /******/


            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            /******/
          };
          /******/

          /******/
          // create a fake namespace object

          /******/
          // mode & 1: value is a module id, require it

          /******/
          // mode & 2: merge all properties of value into the ns

          /******/
          // mode & 4: return value when already ns object

          /******/
          // mode & 8|1: behave like require

          /******/


          __webpack_require__.t = function (value, mode) {
            /******/
            if (mode & 1) value = __webpack_require__(value);
            /******/

            if (mode & 8) return value;
            /******/

            if (mode & 4 && _typeof(value) === 'object' && value && value.__esModule) return value;
            /******/

            var ns = Object.create(null);
            /******/

            __webpack_require__.r(ns);
            /******/


            Object.defineProperty(ns, 'default', {
              enumerable: true,
              value: value
            });
            /******/

            if (mode & 2 && typeof value != 'string') for (var key in value) {
              __webpack_require__.d(ns, key, function (key) {
                return value[key];
              }.bind(null, key));
            }
            /******/

            return ns;
            /******/
          };
          /******/

          /******/
          // getDefaultExport function for compatibility with non-harmony modules

          /******/


          __webpack_require__.n = function (module) {
            /******/
            var getter = module && module.__esModule ?
            /******/
            function getDefault() {
              return module['default'];
            } :
            /******/
            function getModuleExports() {
              return module;
            };
            /******/

            __webpack_require__.d(getter, 'a', getter);
            /******/


            return getter;
            /******/
          };
          /******/

          /******/
          // Object.prototype.hasOwnProperty.call

          /******/


          __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          /******/

          /******/
          // __webpack_public_path__

          /******/


          __webpack_require__.p = "";
          /******/

          /******/

          /******/
          // Load entry module and return exports

          /******/

          return __webpack_require__(__webpack_require__.s = 0);
          /******/
        }(
        /************************************************************************/

        /******/
        [
        /* 0 */

        /***/
        function (module, __webpack_exports__, __webpack_require__) {
          __webpack_require__.r(__webpack_exports__); // CONCATENATED MODULE: ./src/tools.js


          var argumentAsArray = function argumentAsArray(argument) {
            return Array.isArray(argument) ? argument : [argument];
          };

          var isElement = function isElement(target) {
            return target instanceof Node;
          };

          var isElementList = function isElementList(nodeList) {
            return nodeList instanceof NodeList;
          };

          var eachNode = function eachNode(nodeList, callback) {
            if (nodeList && callback) {
              nodeList = isElementList(nodeList) ? nodeList : [nodeList];

              for (var i = 0; i < nodeList.length; i++) {
                if (callback(nodeList[i], i, nodeList.length) === true) {
                  break;
                }
              }
            }
          };

          var throwError = function throwError(message) {
            return console.error("[scroll-lock] ".concat(message));
          };

          var arrayAsSelector = function arrayAsSelector(array) {
            if (Array.isArray(array)) {
              var selector = array.join(', ');
              return selector;
            }
          };

          var nodeListAsArray = function nodeListAsArray(nodeList) {
            var nodes = [];
            eachNode(nodeList, function (node) {
              return nodes.push(node);
            });
            return nodes;
          };

          var findParentBySelector = function findParentBySelector($el, selector) {
            var self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var $root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

            if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
              return $el;
            }

            while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1) {}

            return $el;
          };

          var elementHasSelector = function elementHasSelector($el, selector) {
            var $root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
            var has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
            return has;
          };

          var elementHasOverflowHidden = function elementHasOverflowHidden($el) {
            if ($el) {
              var computedStyle = getComputedStyle($el);
              var overflowIsHidden = computedStyle.overflow === 'hidden';
              return overflowIsHidden;
            }
          };

          var elementScrollTopOnStart = function elementScrollTopOnStart($el) {
            if ($el) {
              if (elementHasOverflowHidden($el)) {
                return true;
              }

              var scrollTop = $el.scrollTop;
              return scrollTop <= 0;
            }
          };

          var elementScrollTopOnEnd = function elementScrollTopOnEnd($el) {
            if ($el) {
              if (elementHasOverflowHidden($el)) {
                return true;
              }

              var scrollTop = $el.scrollTop;
              var scrollHeight = $el.scrollHeight;
              var scrollTopWithHeight = scrollTop + $el.offsetHeight;
              return scrollTopWithHeight >= scrollHeight;
            }
          };

          var elementScrollLeftOnStart = function elementScrollLeftOnStart($el) {
            if ($el) {
              if (elementHasOverflowHidden($el)) {
                return true;
              }

              var scrollLeft = $el.scrollLeft;
              return scrollLeft <= 0;
            }
          };

          var elementScrollLeftOnEnd = function elementScrollLeftOnEnd($el) {
            if ($el) {
              if (elementHasOverflowHidden($el)) {
                return true;
              }

              var scrollLeft = $el.scrollLeft;
              var scrollWidth = $el.scrollWidth;
              var scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
              return scrollLeftWithWidth >= scrollWidth;
            }
          };

          var elementIsScrollableField = function elementIsScrollableField($el) {
            var selector = 'textarea, [contenteditable="true"]';
            return elementHasSelector($el, selector);
          };

          var elementIsInputRange = function elementIsInputRange($el) {
            var selector = 'input[type="range"]';
            return elementHasSelector($el, selector);
          }; // CONCATENATED MODULE: ./src/scroll-lock.js

          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "disablePageScroll", function () {
            return disablePageScroll;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "enablePageScroll", function () {
            return enablePageScroll;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "getScrollState", function () {
            return getScrollState;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function () {
            return clearQueueScrollLocks;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function () {
            return scroll_lock_getTargetScrollBarWidth;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function () {
            return scroll_lock_getCurrentTargetScrollBarWidth;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function () {
            return getPageScrollBarWidth;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function () {
            return getCurrentPageScrollBarWidth;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function () {
            return scroll_lock_addScrollableTarget;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function () {
            return scroll_lock_removeScrollableTarget;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function () {
            return scroll_lock_addScrollableSelector;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function () {
            return scroll_lock_removeScrollableSelector;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "addLockableTarget", function () {
            return scroll_lock_addLockableTarget;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "addLockableSelector", function () {
            return scroll_lock_addLockableSelector;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function () {
            return scroll_lock_setFillGapMethod;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function () {
            return scroll_lock_addFillGapTarget;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function () {
            return scroll_lock_removeFillGapTarget;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function () {
            return scroll_lock_addFillGapSelector;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function () {
            return scroll_lock_removeFillGapSelector;
          });
          /* harmony export (binding) */


          __webpack_require__.d(__webpack_exports__, "refillGaps", function () {
            return refillGaps;
          });

          function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i] != null ? arguments[i] : {};
              var ownKeys = Object.keys(source);

              if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                  return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
              }

              ownKeys.forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            }

            return target;
          }

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              obj[key] = value;
            }

            return obj;
          }

          var FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
          var TOUCH_DIRECTION_DETECT_OFFSET = 3;
          var state = {
            scroll: true,
            queue: 0,
            scrollableSelectors: ['[data-scroll-lock-scrollable]'],
            lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
            fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
            fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
            //
            startTouchY: 0,
            startTouchX: 0
          };

          var disablePageScroll = function disablePageScroll(target) {
            if (state.queue <= 0) {
              state.scroll = false;
              scroll_lock_hideLockableOverflow();
              fillGaps();
            }

            scroll_lock_addScrollableTarget(target);
            state.queue++;
          };

          var enablePageScroll = function enablePageScroll(target) {
            state.queue > 0 && state.queue--;

            if (state.queue <= 0) {
              state.scroll = true;
              scroll_lock_showLockableOverflow();
              unfillGaps();
            }

            scroll_lock_removeScrollableTarget(target);
          };

          var getScrollState = function getScrollState() {
            return state.scroll;
          };

          var clearQueueScrollLocks = function clearQueueScrollLocks() {
            state.queue = 0;
          };

          var scroll_lock_getTargetScrollBarWidth = function getTargetScrollBarWidth($target) {
            var onlyExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (isElement($target)) {
              var currentOverflowYProperty = $target.style.overflowY;

              if (onlyExists) {
                if (!getScrollState()) {
                  $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-overflow-y-property');
                }
              } else {
                $target.style.overflowY = 'scroll';
              }

              var width = scroll_lock_getCurrentTargetScrollBarWidth($target);
              $target.style.overflowY = currentOverflowYProperty;
              return width;
            } else {
              return 0;
            }
          };

          var scroll_lock_getCurrentTargetScrollBarWidth = function getCurrentTargetScrollBarWidth($target) {
            if (isElement($target)) {
              if ($target === document.body) {
                var documentWidth = document.documentElement.clientWidth;
                var windowWidth = window.innerWidth;
                var currentWidth = windowWidth - documentWidth;
                return currentWidth;
              } else {
                var borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
                var borderRightWidthCurrentProperty = $target.style.borderRightWidth;
                $target.style.borderLeftWidth = '0px';
                $target.style.borderRightWidth = '0px';

                var _currentWidth = $target.offsetWidth - $target.clientWidth;

                $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
                $target.style.borderRightWidth = borderRightWidthCurrentProperty;
                return _currentWidth;
              }
            } else {
              return 0;
            }
          };

          var getPageScrollBarWidth = function getPageScrollBarWidth() {
            var onlyExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            return scroll_lock_getTargetScrollBarWidth(document.body, onlyExists);
          };

          var getCurrentPageScrollBarWidth = function getCurrentPageScrollBarWidth() {
            return scroll_lock_getCurrentTargetScrollBarWidth(document.body);
          };

          var scroll_lock_addScrollableTarget = function addScrollableTarget(target) {
            if (target) {
              var targets = argumentAsArray(target);
              targets.map(function ($targets) {
                eachNode($targets, function ($target) {
                  if (isElement($target)) {
                    $target.setAttribute('data-scroll-lock-scrollable', '');
                  } else {
                    throwError("\"".concat($target, "\" is not a Element."));
                  }
                });
              });
            }
          };

          var scroll_lock_removeScrollableTarget = function removeScrollableTarget(target) {
            if (target) {
              var targets = argumentAsArray(target);
              targets.map(function ($targets) {
                eachNode($targets, function ($target) {
                  if (isElement($target)) {
                    $target.removeAttribute('data-scroll-lock-scrollable');
                  } else {
                    throwError("\"".concat($target, "\" is not a Element."));
                  }
                });
              });
            }
          };

          var scroll_lock_addScrollableSelector = function addScrollableSelector(selector) {
            if (selector) {
              var selectors = argumentAsArray(selector);
              selectors.map(function (selector) {
                state.scrollableSelectors.push(selector);
              });
            }
          };

          var scroll_lock_removeScrollableSelector = function removeScrollableSelector(selector) {
            if (selector) {
              var selectors = argumentAsArray(selector);
              selectors.map(function (selector) {
                state.scrollableSelectors = state.scrollableSelectors.filter(function (sSelector) {
                  return sSelector !== selector;
                });
              });
            }
          };

          var scroll_lock_addLockableTarget = function addLockableTarget(target) {
            if (target) {
              var targets = argumentAsArray(target);
              targets.map(function ($targets) {
                eachNode($targets, function ($target) {
                  if (isElement($target)) {
                    $target.setAttribute('data-scroll-lock-lockable', '');
                  } else {
                    throwError("\"".concat($target, "\" is not a Element."));
                  }
                });
              });

              if (!getScrollState()) {
                scroll_lock_hideLockableOverflow();
              }
            }
          };

          var scroll_lock_addLockableSelector = function addLockableSelector(selector) {
            if (selector) {
              var selectors = argumentAsArray(selector);
              selectors.map(function (selector) {
                state.lockableSelectors.push(selector);
              });

              if (!getScrollState()) {
                scroll_lock_hideLockableOverflow();
              }

              scroll_lock_addFillGapSelector(selector);
            }
          };

          var scroll_lock_setFillGapMethod = function setFillGapMethod(method) {
            if (method) {
              if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
                state.fillGapMethod = method;
                refillGaps();
              } else {
                var methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
                throwError("\"".concat(method, "\" method is not available!\nAvailable fill gap methods: ").concat(methods, "."));
              }
            }
          };

          var scroll_lock_addFillGapTarget = function addFillGapTarget(target) {
            if (target) {
              var targets = argumentAsArray(target);
              targets.map(function ($targets) {
                eachNode($targets, function ($target) {
                  if (isElement($target)) {
                    $target.setAttribute('data-scroll-lock-fill-gap', '');

                    if (!state.scroll) {
                      scroll_lock_fillGapTarget($target);
                    }
                  } else {
                    throwError("\"".concat($target, "\" is not a Element."));
                  }
                });
              });
            }
          };

          var scroll_lock_removeFillGapTarget = function removeFillGapTarget(target) {
            if (target) {
              var targets = argumentAsArray(target);
              targets.map(function ($targets) {
                eachNode($targets, function ($target) {
                  if (isElement($target)) {
                    $target.removeAttribute('data-scroll-lock-fill-gap');

                    if (!state.scroll) {
                      scroll_lock_unfillGapTarget($target);
                    }
                  } else {
                    throwError("\"".concat($target, "\" is not a Element."));
                  }
                });
              });
            }
          };

          var scroll_lock_addFillGapSelector = function addFillGapSelector(selector) {
            if (selector) {
              var selectors = argumentAsArray(selector);
              selectors.map(function (selector) {
                if (state.fillGapSelectors.indexOf(selector) === -1) {
                  state.fillGapSelectors.push(selector);

                  if (!state.scroll) {
                    scroll_lock_fillGapSelector(selector);
                  }
                }
              });
            }
          };

          var scroll_lock_removeFillGapSelector = function removeFillGapSelector(selector) {
            if (selector) {
              var selectors = argumentAsArray(selector);
              selectors.map(function (selector) {
                state.fillGapSelectors = state.fillGapSelectors.filter(function (fSelector) {
                  return fSelector !== selector;
                });

                if (!state.scroll) {
                  scroll_lock_unfillGapSelector(selector);
                }
              });
            }
          };

          var refillGaps = function refillGaps() {
            if (!state.scroll) {
              fillGaps();
            }
          };

          var scroll_lock_hideLockableOverflow = function hideLockableOverflow() {
            var selector = arrayAsSelector(state.lockableSelectors);
            scroll_lock_hideLockableOverflowSelector(selector);
          };

          var scroll_lock_showLockableOverflow = function showLockableOverflow() {
            var selector = arrayAsSelector(state.lockableSelectors);
            scroll_lock_showLockableOverflowSelector(selector);
          };

          var scroll_lock_hideLockableOverflowSelector = function hideLockableOverflowSelector(selector) {
            var $targets = document.querySelectorAll(selector);
            eachNode($targets, function ($target) {
              scroll_lock_hideLockableOverflowTarget($target);
            });
          };

          var scroll_lock_showLockableOverflowSelector = function showLockableOverflowSelector(selector) {
            var $targets = document.querySelectorAll(selector);
            eachNode($targets, function ($target) {
              scroll_lock_showLockableOverflowTarget($target);
            });
          };

          var scroll_lock_hideLockableOverflowTarget = function hideLockableOverflowTarget($target) {
            if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') !== 'true') {
              var computedStyle = window.getComputedStyle($target);
              $target.setAttribute('data-scroll-lock-saved-overflow-y-property', computedStyle.overflowY);
              $target.setAttribute('data-scroll-lock-saved-inline-overflow-property', $target.style.overflow);
              $target.setAttribute('data-scroll-lock-saved-inline-overflow-y-property', $target.style.overflowY);
              $target.style.overflow = 'hidden';
              $target.setAttribute('data-scroll-lock-locked', 'true');
            }
          };

          var scroll_lock_showLockableOverflowTarget = function showLockableOverflowTarget($target) {
            if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') === 'true') {
              $target.style.overflow = $target.getAttribute('data-scroll-lock-saved-inline-overflow-property');
              $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-inline-overflow-y-property');
              $target.removeAttribute('data-scroll-lock-saved-overflow-property');
              $target.removeAttribute('data-scroll-lock-saved-inline-overflow-property');
              $target.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');
              $target.removeAttribute('data-scroll-lock-locked');
            }
          };

          var fillGaps = function fillGaps() {
            state.fillGapSelectors.map(function (selector) {
              scroll_lock_fillGapSelector(selector);
            });
          };

          var unfillGaps = function unfillGaps() {
            state.fillGapSelectors.map(function (selector) {
              scroll_lock_unfillGapSelector(selector);
            });
          };

          var scroll_lock_fillGapSelector = function fillGapSelector(selector) {
            var $targets = document.querySelectorAll(selector);
            var isLockable = state.lockableSelectors.indexOf(selector) !== -1;
            eachNode($targets, function ($target) {
              scroll_lock_fillGapTarget($target, isLockable);
            });
          };

          var scroll_lock_fillGapTarget = function fillGapTarget($target) {
            var isLockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (isElement($target)) {
              var scrollBarWidth;

              if ($target.getAttribute('data-scroll-lock-lockable') === '' || isLockable) {
                scrollBarWidth = scroll_lock_getTargetScrollBarWidth($target, true);
              } else {
                var $lockableParent = findParentBySelector($target, arrayAsSelector(state.lockableSelectors));
                scrollBarWidth = scroll_lock_getTargetScrollBarWidth($lockableParent, true);
              }

              if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
                scroll_lock_unfillGapTarget($target);
              }

              var computedStyle = window.getComputedStyle($target);
              $target.setAttribute('data-scroll-lock-filled-gap', 'true');
              $target.setAttribute('data-scroll-lock-current-fill-gap-method', state.fillGapMethod);

              if (state.fillGapMethod === 'margin') {
                var currentMargin = parseFloat(computedStyle.marginRight);
                $target.style.marginRight = "".concat(currentMargin + scrollBarWidth, "px");
              } else if (state.fillGapMethod === 'width') {
                $target.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
              } else if (state.fillGapMethod === 'max-width') {
                $target.style.maxWidth = "calc(100% - ".concat(scrollBarWidth, "px)");
              } else if (state.fillGapMethod === 'padding') {
                var currentPadding = parseFloat(computedStyle.paddingRight);
                $target.style.paddingRight = "".concat(currentPadding + scrollBarWidth, "px");
              }
            }
          };

          var scroll_lock_unfillGapSelector = function unfillGapSelector(selector) {
            var $targets = document.querySelectorAll(selector);
            eachNode($targets, function ($target) {
              scroll_lock_unfillGapTarget($target);
            });
          };

          var scroll_lock_unfillGapTarget = function unfillGapTarget($target) {
            if (isElement($target)) {
              if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
                var currentFillGapMethod = $target.getAttribute('data-scroll-lock-current-fill-gap-method');
                $target.removeAttribute('data-scroll-lock-filled-gap');
                $target.removeAttribute('data-scroll-lock-current-fill-gap-method');

                if (currentFillGapMethod === 'margin') {
                  $target.style.marginRight = "";
                } else if (currentFillGapMethod === 'width') {
                  $target.style.width = "";
                } else if (currentFillGapMethod === 'max-width') {
                  $target.style.maxWidth = "";
                } else if (currentFillGapMethod === 'padding') {
                  $target.style.paddingRight = "";
                }
              }
            }
          };

          var onResize = function onResize(e) {
            refillGaps();
          };

          var onTouchStart = function onTouchStart(e) {
            if (!state.scroll) {
              state.startTouchY = e.touches[0].clientY;
              state.startTouchX = e.touches[0].clientX;
            }
          };

          var scroll_lock_onTouchMove = function onTouchMove(e) {
            if (!state.scroll) {
              var startTouchY = state.startTouchY,
                  startTouchX = state.startTouchX;
              var currentClientY = e.touches[0].clientY;
              var currentClientX = e.touches[0].clientX;

              if (e.touches.length < 2) {
                var selector = arrayAsSelector(state.scrollableSelectors);
                var direction = {
                  up: startTouchY < currentClientY,
                  down: startTouchY > currentClientY,
                  left: startTouchX < currentClientX,
                  right: startTouchX > currentClientX
                };
                var directionWithOffset = {
                  up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
                  down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
                  left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
                  right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX
                };

                var handle = function handle($el) {
                  var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                  if ($el) {
                    var parentScrollableEl = findParentBySelector($el, selector, false);

                    if (elementIsInputRange($el)) {
                      return false;
                    }

                    if (skip || elementIsScrollableField($el) && findParentBySelector($el, selector) || elementHasSelector($el, selector)) {
                      var prevent = false;

                      if (elementScrollLeftOnStart($el) && elementScrollLeftOnEnd($el)) {
                        if (direction.up && elementScrollTopOnStart($el) || direction.down && elementScrollTopOnEnd($el)) {
                          prevent = true;
                        }
                      } else if (elementScrollTopOnStart($el) && elementScrollTopOnEnd($el)) {
                        if (direction.left && elementScrollLeftOnStart($el) || direction.right && elementScrollLeftOnEnd($el)) {
                          prevent = true;
                        }
                      } else if (directionWithOffset.up && elementScrollTopOnStart($el) || directionWithOffset.down && elementScrollTopOnEnd($el) || directionWithOffset.left && elementScrollLeftOnStart($el) || directionWithOffset.right && elementScrollLeftOnEnd($el)) {
                        prevent = true;
                      }

                      if (prevent) {
                        if (parentScrollableEl) {
                          handle(parentScrollableEl, true);
                        } else {
                          if (e.cancelable) {
                            e.preventDefault();
                          }
                        }
                      }
                    } else {
                      handle(parentScrollableEl);
                    }
                  } else {
                    if (e.cancelable) {
                      e.preventDefault();
                    }
                  }
                };

                handle(e.target);
              }
            }
          };

          var onTouchEnd = function onTouchEnd(e) {
            if (!state.scroll) {
              state.startTouchY = 0;
              state.startTouchX = 0;
            }
          };

          if (typeof window !== 'undefined') {
            window.addEventListener('resize', onResize);
          }

          if (typeof document !== 'undefined') {
            document.addEventListener('touchstart', onTouchStart);
            document.addEventListener('touchmove', scroll_lock_onTouchMove, {
              passive: false
            });
            document.addEventListener('touchend', onTouchEnd);
          }

          var deprecatedMethods = {
            hide: function hide(target) {
              throwError('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');
              disablePageScroll(target);
            },
            show: function show(target) {
              throwError('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');
              enablePageScroll(target);
            },
            toggle: function toggle(target) {
              throwError('"toggle" is deprecated! Do not use it.');

              if (getScrollState()) {
                disablePageScroll();
              } else {
                enablePageScroll(target);
              }
            },
            getState: function getState() {
              throwError('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');
              return getScrollState();
            },
            getWidth: function getWidth() {
              throwError('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth');
              return getPageScrollBarWidth();
            },
            getCurrentWidth: function getCurrentWidth() {
              throwError('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');
              return getCurrentPageScrollBarWidth();
            },
            setScrollableTargets: function setScrollableTargets(target) {
              throwError('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');
              scroll_lock_addScrollableTarget(target);
            },
            setFillGapSelectors: function setFillGapSelectors(selector) {
              throwError('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');
              scroll_lock_addFillGapSelector(selector);
            },
            setFillGapTargets: function setFillGapTargets(target) {
              throwError('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');
              scroll_lock_addFillGapTarget(target);
            },
            clearQueue: function clearQueue() {
              throwError('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');
              clearQueueScrollLocks();
            }
          };

          var scrollLock = _objectSpread({
            disablePageScroll: disablePageScroll,
            enablePageScroll: enablePageScroll,
            getScrollState: getScrollState,
            clearQueueScrollLocks: clearQueueScrollLocks,
            getTargetScrollBarWidth: scroll_lock_getTargetScrollBarWidth,
            getCurrentTargetScrollBarWidth: scroll_lock_getCurrentTargetScrollBarWidth,
            getPageScrollBarWidth: getPageScrollBarWidth,
            getCurrentPageScrollBarWidth: getCurrentPageScrollBarWidth,
            addScrollableSelector: scroll_lock_addScrollableSelector,
            removeScrollableSelector: scroll_lock_removeScrollableSelector,
            addScrollableTarget: scroll_lock_addScrollableTarget,
            removeScrollableTarget: scroll_lock_removeScrollableTarget,
            addLockableSelector: scroll_lock_addLockableSelector,
            addLockableTarget: scroll_lock_addLockableTarget,
            addFillGapSelector: scroll_lock_addFillGapSelector,
            removeFillGapSelector: scroll_lock_removeFillGapSelector,
            addFillGapTarget: scroll_lock_addFillGapTarget,
            removeFillGapTarget: scroll_lock_removeFillGapTarget,
            setFillGapMethod: scroll_lock_setFillGapMethod,
            refillGaps: refillGaps,
            _state: state
          }, deprecatedMethods);
          /* harmony default export */


          var scroll_lock = __webpack_exports__["default"] = scrollLock;
          /***/
        }
        /******/
        ])["default"]
      );
    });
  });
  var scrollLock$1 = unwrapExports(scrollLock);

  function Header(container) {
    var body = document.querySelector('body');

    if (container) {
      var btn = container.querySelector('.js-burger');
      var btnClose = container.querySelector('.js-burger-close');
      var nav = container.querySelector('.js-nav');

      if (btn) {
        btn.addEventListener('click', function () {
          btn.classList.add('active');
          nav.classList.add('active');

          if (btn.classList.contains('active') && nav.classList.contains('active')) {
            body.classList.add('no-scroll');
          } else {
            body.classList.remove('no-scroll');
          }
        });
        btnClose.addEventListener('click', function () {
          btn.classList.remove('active');
          nav.classList.remove('active');
          body.classList.remove('no-scroll');
        });
      }

      window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;

        if (scrollY >= 1) {
          container.classList.add("is-scroll");
        } else {
          container.classList.remove("is-scroll");
        }
      });
    }
  }
  /**
   * SSR Window 4.0.2
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2021, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: December 13, 2021
   */

  /* eslint-disable no-param-reassign */


  function isObject(obj) {
    return obj !== null && _typeof(obj) === 'object' && 'constructor' in obj && obj.constructor === Object;
  }

  function extend() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.keys(src).forEach(function (key) {
      if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }

  var ssrDocument = {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ''
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS: function createElementNS() {
      return {};
    },
    importNode: function importNode() {
      return null;
    },
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: ''
    }
  };

  function getDocument() {
    var doc = typeof document !== 'undefined' ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }

  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ''
    },
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: ''
    },
    history: {
      replaceState: function replaceState() {},
      pushState: function pushState() {},
      go: function go() {},
      back: function back() {}
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
    matchMedia: function matchMedia() {
      return {};
    },
    requestAnimationFrame: function requestAnimationFrame(callback) {
      if (typeof setTimeout === 'undefined') {
        callback();
        return null;
      }

      return setTimeout(callback, 0);
    },
    cancelAnimationFrame: function cancelAnimationFrame(id) {
      if (typeof setTimeout === 'undefined') {
        return;
      }

      clearTimeout(id);
    }
  };

  function getWindow() {
    var win = typeof window !== 'undefined' ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      try {
        object[key] = null;
      } catch (e) {// no getter for object
      }

      try {
        delete object[key];
      } catch (e) {// something got wrong
      }
    });
  }

  function nextTick(callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return setTimeout(callback, delay);
  }

  function now() {
    return Date.now();
  }

  function getComputedStyle$1(el) {
    var window = getWindow();
    var style;

    if (window.getComputedStyle) {
      style = window.getComputedStyle(el, null);
    }

    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }

    if (!style) {
      style = el.style;
    }

    return style;
  }

  function getTranslate(el) {
    var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
    var window = getWindow();
    var matrix;
    var curTransform;
    var transformMatrix;
    var curStyle = getComputedStyle$1(el);

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;

      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) {
          return a.replace(',', '.');
        }).join(', ');
      } // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case


      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
        else curTransform = parseFloat(matrix[4]);
    }

    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
        else curTransform = parseFloat(matrix[5]);
    }

    return curTransform || 0;
  }

  function isObject$1(o) {
    return _typeof(o) === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
  }

  function isNode(node) {
    // eslint-disable-next-line
    if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
      return node instanceof HTMLElement;
    }

    return node && (node.nodeType === 1 || node.nodeType === 11);
  }

  function extend$1() {
    var to = Object(arguments.length <= 0 ? undefined : arguments[0]);
    var noExtend = ['__proto__', 'constructor', 'prototype'];

    for (var i = 1; i < arguments.length; i += 1) {
      var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

      if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
        var keysArray = Object.keys(Object(nextSource)).filter(function (key) {
          return noExtend.indexOf(key) < 0;
        });

        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

          if (desc !== undefined && desc.enumerable) {
            if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend$1(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
              to[nextKey] = {};

              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend$1(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }

    return to;
  }

  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }

  function animateCSSModeScroll(_ref) {
    var swiper = _ref.swiper,
        targetPosition = _ref.targetPosition,
        side = _ref.side;
    var window = getWindow();
    var startPosition = -swiper.translate;
    var startTime = null;
    var time;
    var duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = 'none';
    window.cancelAnimationFrame(swiper.cssModeFrameID);
    var dir = targetPosition > startPosition ? 'next' : 'prev';

    var isOutOfBound = function isOutOfBound(current, target) {
      return dir === 'next' && current >= target || dir === 'prev' && current <= target;
    };

    var animate = function animate() {
      time = new Date().getTime();

      if (startTime === null) {
        startTime = time;
      }

      var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      var easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      var currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }

      swiper.wrapperEl.scrollTo(_defineProperty2({}, side, currentPosition));

      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = 'hidden';
        swiper.wrapperEl.style.scrollSnapType = '';
        setTimeout(function () {
          swiper.wrapperEl.style.overflow = '';
          swiper.wrapperEl.scrollTo(_defineProperty2({}, side, currentPosition));
        });
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }

      swiper.cssModeFrameID = window.requestAnimationFrame(animate);
    };

    animate();
  }

  function elementChildren(element) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return _toConsumableArray(element.children).filter(function (el) {
      return el.matches(selector);
    });
  }

  function createElement(tag) {
    var _el$classList;

    var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var el = document.createElement(tag);

    (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(Array.isArray(classes) ? classes : [classes]));

    return el;
  }

  function elementPrevAll(el, selector) {
    var prevEls = [];

    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line

      if (selector) {
        if (prev.matches(selector)) prevEls.push(prev);
      } else prevEls.push(prev);

      el = prev;
    }

    return prevEls;
  }

  function elementNextAll(el, selector) {
    var nextEls = [];

    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line

      if (selector) {
        if (next.matches(selector)) nextEls.push(next);
      } else nextEls.push(next);

      el = next;
    }

    return nextEls;
  }

  function elementStyle(el, prop) {
    var window = getWindow();
    return window.getComputedStyle(el, null).getPropertyValue(prop);
  }

  function elementIndex(el) {
    var child = el;
    var i;

    if (child) {
      i = 0; // eslint-disable-next-line

      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }

      return i;
    }

    return undefined;
  }

  function elementParents(el, selector) {
    var parents = []; // eslint-disable-line

    var parent = el.parentElement; // eslint-disable-line

    while (parent) {
      if (selector) {
        if (parent.matches(selector)) parents.push(parent);
      } else {
        parents.push(parent);
      }

      parent = parent.parentElement;
    }

    return parents;
  }

  function elementOuterSize(el, size, includeMargins) {
    var window = getWindow();

    if (includeMargins) {
      return el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'));
    }

    return el.offsetWidth;
  }

  var support;

  function calcSupport() {
    var window = getWindow();
    var document = getDocument();
    return {
      smoothScroll: document.documentElement && document.documentElement.style && 'scrollBehavior' in document.documentElement.style,
      touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
    };
  }

  function getSupport() {
    if (!support) {
      support = calcSupport();
    }

    return support;
  }

  var deviceCached;

  function calcDevice() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        userAgent = _ref2.userAgent;

    var support = getSupport();
    var window = getWindow();
    var platform = window.navigator.platform;
    var ua = userAgent || window.navigator.userAgent;
    var device = {
      ios: false,
      android: false
    };
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    var windows = platform === 'Win32';
    var macos = platform === 'MacIntel'; // iPadOs 13 fix

    var iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];

    if (!ipad && macos && support.touch && iPadScreens.indexOf("".concat(screenWidth, "x").concat(screenHeight)) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad) ipad = [0, 1, '13_0_0'];
      macos = false;
    } // Android


    if (android && !windows) {
      device.os = 'android';
      device.android = true;
    }

    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    } // Export object


    return device;
  }

  function getDevice() {
    var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }

    return deviceCached;
  }

  var browser;

  function calcBrowser() {
    var window = getWindow();
    var needPerspectiveFix = false;

    function isSafari() {
      var ua = window.navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
    }

    if (isSafari()) {
      var ua = String(window.navigator.userAgent);

      if (ua.includes('Version/')) {
        var _ua$split$1$split$0$s = ua.split('Version/')[1].split(' ')[0].split('.').map(function (num) {
          return Number(num);
        }),
            _ua$split$1$split$0$s2 = _slicedToArray(_ua$split$1$split$0$s, 2),
            major = _ua$split$1$split$0$s2[0],
            minor = _ua$split$1$split$0$s2[1];

        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }

    return {
      isSafari: needPerspectiveFix || isSafari(),
      needPerspectiveFix: needPerspectiveFix,
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
    };
  }

  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }

    return browser;
  }

  function Resize(_ref3) {
    var swiper = _ref3.swiper,
        on = _ref3.on,
        emit = _ref3.emit;
    var window = getWindow();
    var observer = null;
    var animationFrame = null;

    var resizeHandler = function resizeHandler() {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit('beforeResize');
      emit('resize');
    };

    var createObserver = function createObserver() {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      observer = new ResizeObserver(function (entries) {
        animationFrame = window.requestAnimationFrame(function () {
          var width = swiper.width,
              height = swiper.height;
          var newWidth = width;
          var newHeight = height;
          entries.forEach(function (_ref4) {
            var contentBoxSize = _ref4.contentBoxSize,
                contentRect = _ref4.contentRect,
                target = _ref4.target;
            if (target && target !== swiper.el) return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });

          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };

    var removeObserver = function removeObserver() {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };

    var orientationChangeHandler = function orientationChangeHandler() {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit('orientationchange');
    };

    on('init', function () {
      if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
        createObserver();
        return;
      }

      window.addEventListener('resize', resizeHandler);
      window.addEventListener('orientationchange', orientationChangeHandler);
    });
    on('destroy', function () {
      removeObserver();
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('orientationchange', orientationChangeHandler);
    });
  }

  function Observer(_ref5) {
    var swiper = _ref5.swiper,
        extendParams = _ref5.extendParams,
        on = _ref5.on,
        emit = _ref5.emit;
    var observers = [];
    var window = getWindow();

    var attach = function attach(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (swiper.__preventObserver__) return;

        if (mutations.length === 1) {
          emit('observerUpdate', mutations[0]);
          return;
        }

        var observerUpdate = function observerUpdate() {
          emit('observerUpdate', mutations[0]);
        };

        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(observerUpdate);
        } else {
          window.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });
      observers.push(observer);
    };

    var init = function init() {
      if (!swiper.params.observer) return;

      if (swiper.params.observeParents) {
        var containerParents = elementParents(swiper.el);

        for (var i = 0; i < containerParents.length; i += 1) {
          attach(containerParents[i]);
        }
      } // Observe container


      attach(swiper.el, {
        childList: swiper.params.observeSlideChildren
      }); // Observe wrapper

      attach(swiper.wrapperEl, {
        attributes: false
      });
    };

    var destroy = function destroy() {
      observers.forEach(function (observer) {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };

    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on('init', init);
    on('destroy', destroy);
  }
  /* eslint-disable no-underscore-dangle */


  var eventsEmitter = {
    on: function on(events, handler, priority) {
      var self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== 'function') return self;
      var method = priority ? 'unshift' : 'push';
      events.split(' ').forEach(function (event) {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event][method](handler);
      });
      return self;
    },
    once: function once(events, handler, priority) {
      var self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== 'function') return self;

      function onceHandler() {
        self.off(events, onceHandler);

        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        handler.apply(self, args);
      }

      onceHandler.__emitterProxy = handler;
      return self.on(events, onceHandler, priority);
    },
    onAny: function onAny(handler, priority) {
      var self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== 'function') return self;
      var method = priority ? 'unshift' : 'push';

      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }

      return self;
    },
    offAny: function offAny(handler) {
      var self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsAnyListeners) return self;
      var index = self.eventsAnyListeners.indexOf(handler);

      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }

      return self;
    },
    off: function off(events, handler) {
      var self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsListeners) return self;
      events.split(' ').forEach(function (event) {
        if (typeof handler === 'undefined') {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event]) {
          self.eventsListeners[event].forEach(function (eventHandler, index) {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit: function emit() {
      var self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsListeners) return self;
      var events;
      var data;
      var context;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (typeof args[0] === 'string' || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }

      data.unshift(context);
      var eventsArray = Array.isArray(events) ? events : events.split(' ');
      eventsArray.forEach(function (event) {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach(function (eventHandler) {
            eventHandler.apply(context, [event].concat(_toConsumableArray(data)));
          });
        }

        if (self.eventsListeners && self.eventsListeners[event]) {
          self.eventsListeners[event].forEach(function (eventHandler) {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }
  };

  function updateSize() {
    var swiper = this;
    var width;
    var height;
    var el = swiper.el;

    if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = el.clientWidth;
    }

    if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
      height = swiper.params.height;
    } else {
      height = el.clientHeight;
    }

    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    } // Subtract paddings


    width = width - parseInt(elementStyle(el, 'padding-left') || 0, 10) - parseInt(elementStyle(el, 'padding-right') || 0, 10);
    height = height - parseInt(elementStyle(el, 'padding-top') || 0, 10) - parseInt(elementStyle(el, 'padding-bottom') || 0, 10);
    if (Number.isNaN(width)) width = 0;
    if (Number.isNaN(height)) height = 0;
    Object.assign(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height
    });
  }

  function updateSlides() {
    var swiper = this;

    function getDirectionLabel(property) {
      if (swiper.isHorizontal()) {
        return property;
      } // prettier-ignore


      return {
        'width': 'height',
        'margin-top': 'margin-left',
        'margin-bottom ': 'margin-right',
        'margin-left': 'margin-top',
        'margin-right': 'margin-bottom',
        'padding-left': 'padding-top',
        'padding-right': 'padding-bottom',
        'marginRight': 'marginBottom'
      }[property];
    }

    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
    }

    var params = swiper.params;
    var wrapperEl = swiper.wrapperEl,
        slidesEl = swiper.slidesEl,
        swiperSize = swiper.size,
        rtl = swiper.rtlTranslate,
        wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = elementChildren(slidesEl, ".".concat(swiper.params.slideClass, ", swiper-slide"));
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];
    var offsetBefore = params.slidesOffsetBefore;

    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;

    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.slidesGrid.length;
    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;

    if (typeof swiperSize === 'undefined') {
      return;
    }

    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
    } else if (typeof spaceBetween === 'string') {
      spaceBetween = parseFloat(spaceBetween);
    }

    swiper.virtualSize = -spaceBetween; // reset margins

    slides.forEach(function (slideEl) {
      if (rtl) {
        slideEl.style.marginLeft = '';
      } else {
        slideEl.style.marginRight = '';
      }

      slideEl.style.marginBottom = '';
      slideEl.style.marginTop = '';
    }); // reset cssMode offsets

    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(wrapperEl, '--swiper-centered-offset-before', '');
      setCSSProperty(wrapperEl, '--swiper-centered-offset-after', '');
    }

    var gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

    if (gridEnabled) {
      swiper.grid.initSlides(slidesLength);
    } // Calc slides


    var slideSize;
    var shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(function (key) {
      return typeof params.breakpoints[key].slidesPerView !== 'undefined';
    }).length > 0;

    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;

      var _slide = void 0;

      if (slides[i]) _slide = slides[i];

      if (gridEnabled) {
        swiper.grid.updateSlide(i, _slide, slidesLength, getDirectionLabel);
      }

      if (slides[i] && elementStyle(_slide, 'display') === 'none') continue; // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        if (shouldResetSlideSize) {
          slides[i].style[getDirectionLabel('width')] = "";
        }

        var slideStyles = getComputedStyle(_slide);
        var currentTransform = _slide.style.transform;
        var currentWebKitTransform = _slide.style.webkitTransform;

        if (currentTransform) {
          _slide.style.transform = 'none';
        }

        if (currentWebKitTransform) {
          _slide.style.webkitTransform = 'none';
        }

        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? elementOuterSize(_slide, 'width', true) : elementOuterSize(_slide, 'height', true);
        } else {
          // eslint-disable-next-line
          var width = getDirectionPropertyValue(slideStyles, 'width');
          var paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
          var paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
          var marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
          var marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
          var boxSizing = slideStyles.getPropertyValue('box-sizing');

          if (boxSizing && boxSizing === 'border-box') {
            slideSize = width + marginLeft + marginRight;
          } else {
            var _slide2 = _slide,
                clientWidth = _slide2.clientWidth,
                offsetWidth = _slide2.offsetWidth;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }

        if (currentTransform) {
          _slide.style.transform = currentTransform;
        }

        if (currentWebKitTransform) {
          _slide.style.webkitTransform = currentWebKitTransform;
        }

        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);

        if (slides[i]) {
          slides[i].style[getDirectionLabel('width')] = "".concat(slideSize, "px");
        }
      }

      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }

      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }

    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

    if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      wrapperEl.style.width = "".concat(swiper.virtualSize + spaceBetween, "px");
    }

    if (params.setWrapperSize) {
      wrapperEl.style[getDirectionLabel('width')] = "".concat(swiper.virtualSize + spaceBetween, "px");
    }

    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
    } // Remove last grid elements depending on width


    if (!params.centeredSlides) {
      var newSlidesGrid = [];

      for (var _i2 = 0; _i2 < snapGrid.length; _i2 += 1) {
        var slidesGridItem = snapGrid[_i2];
        if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

        if (snapGrid[_i2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }

      snapGrid = newSlidesGrid;

      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }

    if (isVirtual && params.loop) {
      var size = slidesSizesGrid[0] + spaceBetween;

      if (params.slidesPerGroup > 1) {
        var groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
        var groupSize = size * params.slidesPerGroup;

        for (var _i3 = 0; _i3 < groups; _i3 += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }

      for (var _i4 = 0; _i4 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; _i4 += 1) {
        if (params.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }

        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper.virtualSize += size;
      }
    }

    if (snapGrid.length === 0) snapGrid = [0];

    if (spaceBetween !== 0) {
      var key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
      slides.filter(function (_, slideIndex) {
        if (!params.cssMode || params.loop) return true;

        if (slideIndex === slides.length - 1) {
          return false;
        }

        return true;
      }).forEach(function (slideEl) {
        slideEl.style[key] = "".concat(spaceBetween, "px");
      });
    }

    if (params.centeredSlides && params.centeredSlidesBounds) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      var maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map(function (snap) {
        if (snap < 0) return -offsetBefore;
        if (snap > maxSnap) return maxSnap + offsetAfter;
        return snap;
      });
    }

    if (params.centerInsufficientSlides) {
      var _allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        _allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      _allSlidesSize -= spaceBetween;

      if (_allSlidesSize < swiperSize) {
        var allSlidesOffset = (swiperSize - _allSlidesSize) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Object.assign(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid
    });

    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, '--swiper-centered-offset-before', "".concat(-snapGrid[0], "px"));
      setCSSProperty(wrapperEl, '--swiper-centered-offset-after', "".concat(swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2, "px"));
      var addToSnapGrid = -swiper.snapGrid[0];
      var addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map(function (v) {
        return v + addToSnapGrid;
      });
      swiper.slidesGrid = swiper.slidesGrid.map(function (v) {
        return v + addToSlidesGrid;
      });
    }

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }

    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      swiper.emit('snapGridLengthChange');
    }

    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }

    if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
      var backFaceHiddenClass = "".concat(params.containerModifierClass, "backface-hidden");
      var hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);

      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.el.classList.remove(backFaceHiddenClass);
      }
    }
  }

  function updateAutoHeight(speed) {
    var swiper = this;
    var activeSlides = [];
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var newHeight = 0;
    var i;

    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }

    var getSlideByIndex = function getSlideByIndex(index) {
      if (isVirtual) {
        return swiper.slides[swiper.getSlideIndexByData(index)];
      }

      return swiper.slides[index];
    }; // Find slides currently in view


    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        (swiper.visibleSlides || []).forEach(function (slide) {
          activeSlides.push(slide);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          var index = swiper.activeIndex + i;
          if (index > swiper.slides.length && !isVirtual) break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    } // Find new height from highest slide in view


    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    } // Update Height


    if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = "".concat(newHeight, "px");
  }

  function updateSlidesOffset() {
    var swiper = this;
    var slides = swiper.slides; // eslint-disable-next-line

    var minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;

    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
  }

  function updateSlidesProgress() {
    var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;
    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides,
        rtl = swiper.rtlTranslate,
        snapGrid = swiper.snapGrid;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
    var offsetCenter = -translate;
    if (rtl) offsetCenter = translate; // Visible Slides

    slides.forEach(function (slideEl) {
      slideEl.classList.remove(params.slideVisibleClass);
    });
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    var spaceBetween = params.spaceBetween;

    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
    } else if (typeof spaceBetween === 'string') {
      spaceBetween = parseFloat(spaceBetween);
    }

    for (var i = 0; i < slides.length; i += 1) {
      var _slide3 = slides[i];
      var slideOffset = _slide3.swiperSlideOffset;

      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }

      var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (_slide3.swiperSlideSize + spaceBetween);
      var originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (_slide3.swiperSlideSize + spaceBetween);
      var slideBefore = -(offsetCenter - slideOffset);
      var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

      if (isVisible) {
        swiper.visibleSlides.push(_slide3);
        swiper.visibleSlidesIndexes.push(i);
        slides[i].classList.add(params.slideVisibleClass);
      }

      _slide3.progress = rtl ? -slideProgress : slideProgress;
      _slide3.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }

  function updateProgress(translate) {
    var swiper = this;

    if (typeof translate === 'undefined') {
      var multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

      translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }

    var params = swiper.params;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress,
        isBeginning = swiper.isBeginning,
        isEnd = swiper.isEnd,
        progressLoop = swiper.progressLoop;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;

    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      var isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
      var isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded) progress = 0;
      if (isEndRounded) progress = 1;
    }

    if (params.loop) {
      var firstSlideIndex = swiper.getSlideIndexByData(0);
      var lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
      var firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
      var lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
      var translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
      var translateAbs = Math.abs(translate);

      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }

      if (progressLoop > 1) progressLoop -= 1;
    }

    Object.assign(swiper, {
      progress: progress,
      progressLoop: progressLoop,
      isBeginning: isBeginning,
      isEnd: isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }

    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }

    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses() {
    var swiper = this;
    var slides = swiper.slides,
        params = swiper.params,
        slidesEl = swiper.slidesEl,
        activeIndex = swiper.activeIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    var getFilteredSlide = function getFilteredSlide(selector) {
      return elementChildren(slidesEl, ".".concat(params.slideClass).concat(selector, ", swiper-slide").concat(selector))[0];
    };

    slides.forEach(function (slideEl) {
      slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
    });
    var activeSlide;

    if (isVirtual) {
      if (params.loop) {
        var slideIndex = activeIndex - swiper.virtual.slidesBefore;
        if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
        activeSlide = getFilteredSlide("[data-swiper-slide-index=\"".concat(slideIndex, "\"]"));
      } else {
        activeSlide = getFilteredSlide("[data-swiper-slide-index=\"".concat(activeIndex, "\"]"));
      }
    } else {
      activeSlide = slides[activeIndex];
    }

    if (activeSlide) {
      // Active classes
      activeSlide.classList.add(params.slideActiveClass); // Next Slide

      var nextSlide = elementNextAll(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];

      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }

      if (nextSlide) {
        nextSlide.classList.add(params.slideNextClass);
      } // Prev Slide


      var prevSlide = elementPrevAll(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];

      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }

      if (prevSlide) {
        prevSlide.classList.add(params.slidePrevClass);
      }
    }

    swiper.emitSlidesClasses();
  }

  var processLazyPreloader = function processLazyPreloader(swiper, imageEl) {
    if (!swiper || swiper.destroyed || !swiper.params) return;

    var slideSelector = function slideSelector() {
      return swiper.isElement ? "swiper-slide" : ".".concat(swiper.params.slideClass);
    };

    var slideEl = imageEl.closest(slideSelector());

    if (slideEl) {
      var lazyEl = slideEl.querySelector(".".concat(swiper.params.lazyPreloaderClass));
      if (lazyEl) lazyEl.remove();
    }
  };

  var unlazy = function unlazy(swiper, index) {
    if (!swiper.slides[index]) return;
    var imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
    if (imageEl) imageEl.removeAttribute('loading');
  };

  var preload = function preload(swiper) {
    if (!swiper || swiper.destroyed || !swiper.params) return;
    var amount = swiper.params.lazyPreloadPrevNext;
    var len = swiper.slides.length;
    if (!len || !amount || amount < 0) return;
    amount = Math.min(amount, len);
    var slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
    var activeIndex = swiper.activeIndex;
    var slideIndexLastInView = activeIndex + slidesPerView - 1;

    if (swiper.params.rewind) {
      for (var i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
        var realIndex = (i % len + len) % len;
        if (realIndex !== activeIndex && realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
      }
    } else {
      for (var _i5 = Math.max(slideIndexLastInView - amount, 0); _i5 <= Math.min(slideIndexLastInView + amount, len - 1); _i5 += 1) {
        if (_i5 !== activeIndex && _i5 > slideIndexLastInView) unlazy(swiper, _i5);
      }
    }
  };

  function getActiveIndexByTranslate(swiper) {
    var slidesGrid = swiper.slidesGrid,
        params = swiper.params;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var activeIndex;

    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    } // Normalize slideIndex


    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
    }

    return activeIndex;
  }

  function updateActiveIndex(newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var snapGrid = swiper.snapGrid,
        params = swiper.params,
        previousIndex = swiper.activeIndex,
        previousRealIndex = swiper.realIndex,
        previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;

    var getVirtualRealIndex = function getVirtualRealIndex(aIndex) {
      var realIndex = aIndex - swiper.virtual.slidesBefore;

      if (realIndex < 0) {
        realIndex = swiper.virtual.slides.length + realIndex;
      }

      if (realIndex >= swiper.virtual.slides.length) {
        realIndex -= swiper.virtual.slides.length;
      }

      return realIndex;
    };

    if (typeof activeIndex === 'undefined') {
      activeIndex = getActiveIndexByTranslate(swiper);
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }

    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }

      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.realIndex = getVirtualRealIndex(activeIndex);
      }

      return;
    } // Get real index


    var realIndex;

    if (swiper.virtual && params.virtual.enabled && params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else if (swiper.slides[activeIndex]) {
      realIndex = parseInt(swiper.slides[activeIndex].getAttribute('data-swiper-slide-index') || activeIndex, 10);
    } else {
      realIndex = activeIndex;
    }

    Object.assign(swiper, {
      previousSnapIndex: previousSnapIndex,
      snapIndex: snapIndex,
      previousRealIndex: previousRealIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex
    });

    if (swiper.initialized) {
      preload(swiper);
    }

    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');

    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }

    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit('slideChange');
    }
  }

  function updateClickedSlide(e) {
    var swiper = this;
    var params = swiper.params;
    var slide = e.closest(".".concat(params.slideClass, ", swiper-slide"));
    var slideFound = false;
    var slideIndex;

    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) {
          slideFound = true;
          slideIndex = i;
          break;
        }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }

    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide
  };

  function getSwiperTranslate() {
    var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isHorizontal() ? 'x' : 'y';
    var swiper = this;
    var params = swiper.params,
        rtl = swiper.rtlTranslate,
        translate = swiper.translate,
        wrapperEl = swiper.wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    if (params.cssMode) {
      return translate;
    }

    var currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper.cssOverflowAdjustment();
    if (rtl) currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }

  function setTranslate(translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate,
        params = swiper.params,
        wrapperEl = swiper.wrapperEl,
        progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      if (swiper.isHorizontal()) {
        x -= swiper.cssOverflowAdjustment();
      } else {
        y -= swiper.cssOverflowAdjustment();
      }

      wrapperEl.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px)");
    } // Check if we need to update progress


    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate() {
    return -this.snapGrid[0];
  }

  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }

  function translateTo() {
    var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
    var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var translateBounds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var internal = arguments.length > 4 ? arguments[4] : undefined;
    var swiper = this;
    var params = swiper.params,
        wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var minTranslate = swiper.minTranslate();
    var maxTranslate = swiper.maxTranslate();
    var newTranslate;
    if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

    swiper.updateProgress(newTranslate);

    if (params.cssMode) {
      var isH = swiper.isHorizontal();

      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
      } else {
        var _wrapperEl$scrollTo;

        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper: swiper,
            targetPosition: -newTranslate,
            side: isH ? 'left' : 'top'
          });
          return true;
        }

        wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, _defineProperty2(_wrapperEl$scrollTo, isH ? 'left' : 'top', -newTranslate), _defineProperty2(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionEnd');
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionStart');
      }

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.wrapperEl.removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;

            if (runCallbacks) {
              swiper.emit('transitionEnd');
            }
          };
        }

        swiper.wrapperEl.addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
      }
    }

    return true;
  }

  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo
  };

  function setTransition(duration, byController) {
    var swiper = this;

    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style.transitionDuration = "".concat(duration, "ms");
    }

    swiper.emit('setTransition', duration, byController);
  }

  function transitionEmit(_ref6) {
    var swiper = _ref6.swiper,
        runCallbacks = _ref6.runCallbacks,
        direction = _ref6.direction,
        step = _ref6.step;
    var activeIndex = swiper.activeIndex,
        previousIndex = swiper.previousIndex;
    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
    }

    swiper.emit("transition".concat(step));

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit("slideResetTransition".concat(step));
        return;
      }

      swiper.emit("slideChangeTransition".concat(step));

      if (dir === 'next') {
        swiper.emit("slideNextTransition".concat(step));
      } else {
        swiper.emit("slidePrevTransition".concat(step));
      }
    }
  }

  function transitionStart() {
    var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var direction = arguments.length > 1 ? arguments[1] : undefined;
    var swiper = this;
    var params = swiper.params;
    if (params.cssMode) return;

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    transitionEmit({
      swiper: swiper,
      runCallbacks: runCallbacks,
      direction: direction,
      step: 'Start'
    });
  }

  function transitionEnd() {
    var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var direction = arguments.length > 1 ? arguments[1] : undefined;
    var swiper = this;
    var params = swiper.params;
    swiper.animating = false;
    if (params.cssMode) return;
    swiper.setTransition(0);
    transitionEmit({
      swiper: swiper,
      runCallbacks: runCallbacks,
      direction: direction,
      step: 'End'
    });
  }

  var transition = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd
  };

  function slideTo() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
    var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var internal = arguments.length > 3 ? arguments[3] : undefined;
    var initial = arguments.length > 4 ? arguments[4] : undefined;

    if (typeof index === 'string') {
      index = parseInt(index, 10);
    }

    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;
    var params = swiper.params,
        snapGrid = swiper.snapGrid,
        slidesGrid = swiper.slidesGrid,
        previousIndex = swiper.previousIndex,
        activeIndex = swiper.activeIndex,
        rtl = swiper.rtlTranslate,
        wrapperEl = swiper.wrapperEl,
        enabled = swiper.enabled;

    if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
      return false;
    }

    var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
    var translate = -snapGrid[snapIndex]; // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        var normalizedTranslate = -Math.floor(translate * 100);
        var normalizedGrid = Math.floor(slidesGrid[i] * 100);
        var normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i;
        }
      }
    } // Directions locks


    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }

      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }

    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    } // Update progress


    swiper.updateProgress(translate);
    var direction;
    if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

    if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
      swiper.updateActiveIndex(slideIndex); // Update Height

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      swiper.updateSlidesClasses();

      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }

      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }

      return false;
    }

    if (params.cssMode) {
      var isH = swiper.isHorizontal();
      var t = rtl ? translate : -translate;

      if (speed === 0) {
        var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = 'none';
          swiper._immediateVirtual = true;
        }

        if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
          swiper._cssModeVirtualInitialSet = true;
          requestAnimationFrame(function () {
            wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
          });
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        }

        if (isVirtual) {
          requestAnimationFrame(function () {
            swiper.wrapperEl.style.scrollSnapType = '';
            swiper._immediateVirtual = false;
          });
        }
      } else {
        var _wrapperEl$scrollTo2;

        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper: swiper,
            targetPosition: t,
            side: isH ? 'left' : 'top'
          });
          return true;
        }

        wrapperEl.scrollTo((_wrapperEl$scrollTo2 = {}, _defineProperty2(_wrapperEl$scrollTo2, isH ? 'left' : 'top', t), _defineProperty2(_wrapperEl$scrollTo2, "behavior", 'smooth'), _wrapperEl$scrollTo2));
      }

      return true;
    }

    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks, direction);

    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;

      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }

      swiper.wrapperEl.addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
    }

    return true;
  }

  function slideToLoop() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
    var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var internal = arguments.length > 3 ? arguments[3] : undefined;

    if (typeof index === 'string') {
      var indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }

    var swiper = this;
    var newIndex = index;

    if (swiper.params.loop) {
      if (swiper.virtual && swiper.params.virtual.enabled) {
        // eslint-disable-next-line
        newIndex = newIndex + swiper.virtual.slidesBefore;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideNext() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var internal = arguments.length > 2 ? arguments[2] : undefined;
    var swiper = this;
    var enabled = swiper.enabled,
        params = swiper.params,
        animating = swiper.animating;
    if (!enabled) return swiper;
    var perGroup = params.slidesPerGroup;

    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
    }

    var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding) return false;
      swiper.loopFix({
        direction: 'next'
      }); // eslint-disable-next-line

      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }

    if (params.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }

    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slidePrev() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var internal = arguments.length > 2 ? arguments[2] : undefined;
    var swiper = this;
    var params = swiper.params,
        snapGrid = swiper.snapGrid,
        slidesGrid = swiper.slidesGrid,
        rtlTranslate = swiper.rtlTranslate,
        enabled = swiper.enabled,
        animating = swiper.animating;
    if (!enabled) return swiper;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding) return false;
      swiper.loopFix({
        direction: 'prev'
      }); // eslint-disable-next-line

      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }

    var translate = rtlTranslate ? swiper.translate : -swiper.translate;

    function normalize(val) {
      if (val < 0) return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }

    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) {
      return normalize(val);
    });
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

    if (typeof prevSnap === 'undefined' && params.cssMode) {
      var prevSnapIndex;
      snapGrid.forEach(function (snap, snapIndex) {
        if (normalizedTranslate >= snap) {
          // prevSnap = snap;
          prevSnapIndex = snapIndex;
        }
      });

      if (typeof prevSnapIndex !== 'undefined') {
        prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }

    var prevIndex = 0;

    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

      if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }

    if (params.rewind && swiper.isBeginning) {
      var lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    }

    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideReset() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var internal = arguments.length > 2 ? arguments[2] : undefined;
    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideToClosest() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var internal = arguments.length > 2 ? arguments[2] : undefined;
    var threshold = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
    var swiper = this;
    var index = swiper.activeIndex;
    var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    if (translate >= swiper.snapGrid[snapIndex]) {
      // The current translate is on or after the current snap index, so the choice
      // is between the current index and the one after it.
      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      // The current translate is before the current snap index, so the choice
      // is between the current index and the one before it.
      var prevSnap = swiper.snapGrid[snapIndex - 1];
      var _currentSnap = swiper.snapGrid[snapIndex];

      if (translate - prevSnap <= (_currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }

    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide() {
    var swiper = this;
    var params = swiper.params,
        slidesEl = swiper.slidesEl;
    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;
    var slideSelector = swiper.isElement ? "swiper-slide" : ".".concat(params.slideClass);

    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);

      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, "".concat(slideSelector, "[data-swiper-slide-index=\"").concat(realIndex, "\"]"))[0]);
          nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, "".concat(slideSelector, "[data-swiper-slide-index=\"").concat(realIndex, "\"]"))[0]);
        nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide
  };

  function loopCreate(slideRealIndex) {
    var swiper = this;
    var params = swiper.params,
        slidesEl = swiper.slidesEl;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
    var slides = elementChildren(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
    slides.forEach(function (el, index) {
      el.setAttribute('data-swiper-slide-index', index);
    });
    swiper.loopFix({
      slideRealIndex: slideRealIndex,
      direction: params.centeredSlides ? undefined : 'next'
    });
  }

  function loopFix() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        slideRealIndex = _ref7.slideRealIndex,
        _ref7$slideTo = _ref7.slideTo,
        slideTo = _ref7$slideTo === void 0 ? true : _ref7$slideTo,
        direction = _ref7.direction,
        setTranslate = _ref7.setTranslate,
        activeSlideIndex = _ref7.activeSlideIndex,
        byController = _ref7.byController,
        byMousewheel = _ref7.byMousewheel;

    var swiper = this;
    if (!swiper.params.loop) return;
    swiper.emit('beforeLoopFix');
    var slides = swiper.slides,
        allowSlidePrev = swiper.allowSlidePrev,
        allowSlideNext = swiper.allowSlideNext,
        slidesEl = swiper.slidesEl,
        params = swiper.params;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;

    if (swiper.virtual && params.virtual.enabled) {
      if (slideTo) {
        if (!params.centeredSlides && swiper.snapIndex === 0) {
          swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
        } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
          swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
        } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
          swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
        }
      }

      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit('loopFix');
      return;
    }

    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
    var loopedSlides = params.loopedSlides || slidesPerView;

    if (loopedSlides % params.slidesPerGroup !== 0) {
      loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
    }

    swiper.loopedSlides = loopedSlides;
    var prependSlidesIndexes = [];
    var appendSlidesIndexes = [];
    var activeIndex = swiper.activeIndex;

    if (typeof activeSlideIndex === 'undefined') {
      activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter(function (el) {
        return el.classList.contains(params.slideActiveClass);
      })[0]);
    } else {
      activeIndex = activeSlideIndex;
    }

    var isNext = direction === 'next' || !direction;
    var isPrev = direction === 'prev' || !direction;
    var slidesPrepended = 0;
    var slidesAppended = 0; // prepend last slides before start

    if (activeSlideIndex < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);

      for (var i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
        var index = i - Math.floor(i / slides.length) * slides.length;
        prependSlidesIndexes.push(slides.length - index - 1);
      }
    } else if (activeSlideIndex
    /* + slidesPerView */
    > swiper.slides.length - loopedSlides * 2) {
      slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);

      for (var _i6 = 0; _i6 < slidesAppended; _i6 += 1) {
        var _index = _i6 - Math.floor(_i6 / slides.length) * slides.length;

        appendSlidesIndexes.push(_index);
      }
    }

    if (isPrev) {
      prependSlidesIndexes.forEach(function (index) {
        swiper.slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(swiper.slides[index]);
        swiper.slides[index].swiperLoopMoveDOM = false;
      });
    }

    if (isNext) {
      appendSlidesIndexes.forEach(function (index) {
        swiper.slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(swiper.slides[index]);
        swiper.slides[index].swiperLoopMoveDOM = false;
      });
    }

    swiper.recalcSlides();

    if (params.slidesPerView === 'auto') {
      swiper.updateSlides();
    }

    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }

    if (slideTo) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === 'undefined') {
          var currentSlideTranslate = swiper.slidesGrid[activeIndex];
          var newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
          var diff = newSlideTranslate - currentSlideTranslate;

          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);

            if (setTranslate) {
              swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += diff;
            }
          }
        } else {
          if (setTranslate) {
            swiper.slideToLoop(slideRealIndex, 0, false, true);
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === 'undefined') {
          var _currentSlideTranslate = swiper.slidesGrid[activeIndex];
          var _newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];

          var _diff = _newSlideTranslate - _currentSlideTranslate;

          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - _diff);
          } else {
            swiper.slideTo(activeIndex - slidesAppended, 0, false, true);

            if (setTranslate) {
              swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += _diff;
            }
          }
        } else {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
        }
      }
    }

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.controller && swiper.controller.control && !byController) {
      var loopParams = {
        slideRealIndex: slideRealIndex,
        slideTo: false,
        direction: direction,
        setTranslate: setTranslate,
        activeSlideIndex: activeSlideIndex,
        byController: true
      };

      if (Array.isArray(swiper.controller.control)) {
        swiper.controller.control.forEach(function (c) {
          if (!c.destroyed && c.params.loop) c.loopFix(loopParams);
        });
      } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
        swiper.controller.control.loopFix(loopParams);
      }
    }

    swiper.emit('loopFix');
  }

  function loopDestroy() {
    var swiper = this;
    var params = swiper.params,
        slidesEl = swiper.slidesEl;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
    swiper.recalcSlides();
    var newSlidesOrder = [];
    swiper.slides.forEach(function (slideEl) {
      var index = typeof slideEl.swiperSlideIndex === 'undefined' ? slideEl.getAttribute('data-swiper-slide-index') * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper.slides.forEach(function (slideEl) {
      slideEl.removeAttribute('data-swiper-slide-index');
    });
    newSlidesOrder.forEach(function (slideEl) {
      slidesEl.append(slideEl);
    });
    swiper.recalcSlides();
    swiper.slideTo(swiper.realIndex, 0);
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy
  };

  function setGrabCursor(moving) {
    var swiper = this;
    if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
    var el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;

    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }

    el.style.cursor = 'move';
    el.style.cursor = moving ? 'grabbing' : 'grab';

    if (swiper.isElement) {
      requestAnimationFrame(function () {
        swiper.__preventObserver__ = false;
      });
    }
  }

  function unsetGrabCursor() {
    var swiper = this;

    if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }

    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }

    swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';

    if (swiper.isElement) {
      requestAnimationFrame(function () {
        swiper.__preventObserver__ = false;
      });
    }
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor
  };

  function closestElement(selector) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow()) return null;
      if (el.assignedSlot) el = el.assignedSlot;
      var found = el.closest(selector);

      if (!found && !el.getRootNode) {
        return null;
      }

      return found || __closestFrom(el.getRootNode().host);
    }

    return __closestFrom(base);
  }

  function onTouchStart(event) {
    var swiper = this;
    var document = getDocument();
    var window = getWindow();
    var data = swiper.touchEventsData;
    data.evCache.push(event);
    var params = swiper.params,
        touches = swiper.touches,
        enabled = swiper.enabled;
    if (!enabled) return;
    if (!params.simulateTouch && event.pointerType === 'mouse') return;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }

    if (!swiper.animating && params.cssMode && params.loop) {
      swiper.loopFix();
    }

    var e = event;
    if (e.originalEvent) e = e.originalEvent;
    var targetEl = e.target;

    if (params.touchEventsTarget === 'wrapper') {
      if (!swiper.wrapperEl.contains(targetEl)) return;
    }

    if ('which' in e && e.which === 3) return;
    if ('button' in e && e.button > 0) return;
    if (data.isTouched && data.isMoved) return; // change target el for shadow root component

    var swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== ''; // eslint-disable-next-line

    var eventPath = event.composedPath ? event.composedPath() : event.path;

    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }

    var noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : ".".concat(params.noSwipingClass);
    var isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper.allowClick = true;
      return;
    }

    if (params.swipeHandler) {
      if (!targetEl.closest(params.swipeHandler)) return;
    }

    touches.currentX = e.pageX;
    touches.currentY = e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === 'prevent') {
        event.preventDefault();
      } else {
        return;
      }
    }

    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) data.allowThresholdMove = false;
    var preventDefault = true;

    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;

      if (targetEl.nodeName === 'SELECT') {
        data.isTouched = false;
      }
    }

    if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) {
      document.activeElement.blur();
    }

    var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e.preventDefault();
    }

    if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
      swiper.freeMode.onTouchStart();
    }

    swiper.emit('touchStart', e);
  }

  function onTouchMove(event) {
    var document = getDocument();
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params,
        touches = swiper.touches,
        rtl = swiper.rtlTranslate,
        enabled = swiper.enabled;
    if (!enabled) return;
    if (!params.simulateTouch && event.pointerType === 'mouse') return;
    var e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      return;
    }

    var pointerIndex = data.evCache.findIndex(function (cachedEv) {
      return cachedEv.pointerId === e.pointerId;
    });
    if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
    var targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
    var pageX = targetTouch.pageX;
    var pageY = targetTouch.pageY;

    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }

    if (!swiper.allowTouchMove) {
      if (!e.target.matches(data.focusableElements)) {
        swiper.allowClick = false;
      }

      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          prevX: swiper.touches.currentX,
          prevY: swiper.touches.currentY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }

      return;
    }

    if (params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }

    if (document.activeElement) {
      if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }

    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }

    if (e.targetTouches && e.targetTouches.length > 1) return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) return;

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;

      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }

    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }

    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }

    if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
      data.isTouched = false;
      return;
    }

    if (!data.startMoving) {
      return;
    }

    swiper.allowClick = false;

    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }

    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    var diff = swiper.isHorizontal() ? diffX : diffY;
    var touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;

    if (params.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }

    touches.diff = diff;
    diff *= params.touchRatio;

    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }

    var prevTouchesDirection = swiper.touchesDirection;
    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';
    var isLoop = swiper.params.loop && !params.cssMode;

    if (!data.isMoved) {
      if (isLoop) {
        swiper.loopFix({
          direction: swiper.swipeDirection
        });
      }

      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);

      if (swiper.animating) {
        var evt = new window.CustomEvent('transitionend', {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      }

      data.allowMomentumBounce = false; // Grab Cursor

      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }

      swiper.emit('sliderFirstMove', e);
    }

    var loopFixed;

    if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
      // need another loop fix
      swiper.loopFix({
        direction: swiper.swipeDirection,
        setTranslate: true
      });
      loopFixed = true;
    }

    swiper.emit('sliderMove', e);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;

    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }

    if (diff > 0) {
      if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
        swiper.loopFix({
          direction: 'prev',
          setTranslate: true,
          activeSlideIndex: 0
        });
      }

      if (data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;

        if (params.resistance) {
          data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
        }
      }
    } else if (diff < 0) {
      if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
        swiper.loopFix({
          direction: 'next',
          setTranslate: true,
          activeSlideIndex: swiper.slides.length - (params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
        });
      }

      if (data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;

        if (params.resistance) {
          data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
        }
      }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    } // Directions locks


    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }

    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }

    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    } // Threshold


    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger || params.cssMode) return; // Update active index in free mode

    if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    } // Update progress


    swiper.updateProgress(data.currentTranslate); // Update translate

    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var pointerIndex = data.evCache.findIndex(function (cachedEv) {
      return cachedEv.pointerId === event.pointerId;
    });

    if (pointerIndex >= 0) {
      data.evCache.splice(pointerIndex, 1);
    }

    if (['pointercancel', 'pointerout', 'pointerleave'].includes(event.type)) {
      var proceed = event.type === 'pointercancel' && (swiper.browser.isSafari || swiper.browser.isWebView);

      if (!proceed) {
        return;
      }
    }

    var params = swiper.params,
        touches = swiper.touches,
        rtl = swiper.rtlTranslate,
        slidesGrid = swiper.slidesGrid,
        enabled = swiper.enabled;
    if (!enabled) return;
    if (!params.simulateTouch && event.pointerType === 'mouse') return;
    var e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }

    data.allowTouchCallbacks = false;

    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }

      data.isMoved = false;
      data.startMoving = false;
      return;
    } // Return Grab Cursor


    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    } // Time diff


    var touchEndTime = now();
    var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

    if (swiper.allowClick) {
      var pathTree = e.path || e.composedPath && e.composedPath();
      swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
      swiper.emit('tap click', e);

      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit('doubleTap doubleClick', e);
      }
    }

    data.lastClickTime = now();
    nextTick(function () {
      if (!swiper.destroyed) swiper.allowClick = true;
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }

    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    var currentPos;

    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.cssMode) {
      return;
    }

    if (swiper.params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos: currentPos
      });
      return;
    } // Find current slide


    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];

    for (var i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      var _increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (typeof slidesGrid[i + _increment] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + _increment]) {
          stopIndex = i;
          groupSize = slidesGrid[i + _increment] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    var rewindFirstIndex = null;
    var rewindLastIndex = null;

    if (params.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    } // Find current slide size


    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    var increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
      }

      if (swiper.swipeDirection === 'prev') {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === 'next') {
          swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }

        if (swiper.swipeDirection === 'prev') {
          swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize() {
    var swiper = this;
    var params = swiper.params,
        el = swiper.el;
    if (el && el.offsetWidth === 0) return; // Breakpoints

    if (params.breakpoints) {
      swiper.setBreakpoint();
    } // Save locks


    var allowSlideNext = swiper.allowSlideNext,
        allowSlidePrev = swiper.allowSlidePrev,
        snapGrid = swiper.snapGrid;
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled; // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    var isVirtualLoop = isVirtual && params.loop;

    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      if (swiper.params.loop && !isVirtual) {
        swiper.slideToLoop(swiper.realIndex, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }

    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      clearTimeout(swiper.autoplay.resizeTimeout);
      swiper.autoplay.resizeTimeout = setTimeout(function () {
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
          swiper.autoplay.resume();
        }
      }, 500);
    } // Return locks after resize


    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick(e) {
    var swiper = this;
    if (!swiper.enabled) return;

    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();

      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function onScroll() {
    var swiper = this;
    var wrapperEl = swiper.wrapperEl,
        rtlTranslate = swiper.rtlTranslate,
        enabled = swiper.enabled;
    if (!enabled) return;
    swiper.previousTranslate = swiper.translate;

    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    } // eslint-disable-next-line


    if (swiper.translate === 0) swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }

    swiper.emit('setTranslate', swiper.translate, false);
  }

  function onLoad(e) {
    var swiper = this;
    processLazyPreloader(swiper, e.target);

    if (swiper.params.cssMode || swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight) {
      return;
    }

    swiper.update();
  }

  var dummyEventAttached = false;

  function dummyEventListener() {}

  var events = function events(swiper, method) {
    var document = getDocument();
    var params = swiper.params,
        el = swiper.el,
        wrapperEl = swiper.wrapperEl,
        device = swiper.device;
    var capture = !!params.nested;
    var domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    var swiperMethod = method; // Touch Events

    el[domMethod]('pointerdown', swiper.onTouchStart, {
      passive: false
    });
    document[domMethod]('pointermove', swiper.onTouchMove, {
      passive: false,
      capture: capture
    });
    document[domMethod]('pointerup', swiper.onTouchEnd, {
      passive: true
    });
    document[domMethod]('pointercancel', swiper.onTouchEnd, {
      passive: true
    });
    document[domMethod]('pointerout', swiper.onTouchEnd, {
      passive: true
    });
    document[domMethod]('pointerleave', swiper.onTouchEnd, {
      passive: true
    }); // Prevent Links Clicks

    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]('click', swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl[domMethod]('scroll', swiper.onScroll);
    } // Resize handler


    if (params.updateOnWindowResize) {
      swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
    } else {
      swiper[swiperMethod]('observerUpdate', onResize, true);
    } // Images loader


    el[domMethod]('load', swiper.onLoad, {
      capture: true
    });
  };

  function attachEvents() {
    var swiper = this;
    var document = getDocument();
    var params = swiper.params;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);

    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);
    swiper.onLoad = onLoad.bind(swiper);

    if (!dummyEventAttached) {
      document.addEventListener('touchstart', dummyEventListener);
      dummyEventAttached = true;
    }

    events(swiper, 'on');
  }

  function detachEvents() {
    var swiper = this;
    events(swiper, 'off');
  }

  var events$1 = {
    attachEvents: attachEvents,
    detachEvents: detachEvents
  };

  var isGridEnabled = function isGridEnabled(swiper, params) {
    return swiper.grid && params.grid && params.grid.rows > 1;
  };

  function setBreakpoint() {
    var swiper = this;
    var realIndex = swiper.realIndex,
        initialized = swiper.initialized,
        params = swiper.params,
        el = swiper.el;
    var breakpoints = params.breakpoints;
    if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters

    var breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
    if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
    var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
    var breakpointParams = breakpointOnlyParams || swiper.originalParams;
    var wasMultiRow = isGridEnabled(swiper, params);
    var isMultiRow = isGridEnabled(swiper, breakpointParams);
    var wasEnabled = params.enabled;

    if (wasMultiRow && !isMultiRow) {
      el.classList.remove("".concat(params.containerModifierClass, "grid"), "".concat(params.containerModifierClass, "grid-column"));
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add("".concat(params.containerModifierClass, "grid"));

      if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
        el.classList.add("".concat(params.containerModifierClass, "grid-column"));
      }

      swiper.emitContainerClasses();
    } // Toggle navigation, pagination, scrollbar


    ['navigation', 'pagination', 'scrollbar'].forEach(function (prop) {
      var wasModuleEnabled = params[prop] && params[prop].enabled;
      var isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;

      if (wasModuleEnabled && !isModuleEnabled) {
        swiper[prop].disable();
      }

      if (!wasModuleEnabled && isModuleEnabled) {
        swiper[prop].enable();
      }
    });
    var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

    if (directionChanged && initialized) {
      swiper.changeDirection();
    }

    extend$1(swiper.params, breakpointParams);
    var isEnabled = swiper.params.enabled;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev
    });

    if (wasEnabled && !isEnabled) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper.enable();
    }

    swiper.currentBreakpoint = breakpoint;
    swiper.emit('_beforeBreakpoint', breakpointParams);

    if (needsReLoop && initialized) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    }

    swiper.emit('breakpoint', breakpointParams);
  }

  function getBreakpoint(breakpoints) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'window';
    var containerEl = arguments.length > 2 ? arguments[2] : undefined;
    if (!breakpoints || base === 'container' && !containerEl) return undefined;
    var breakpoint = false;
    var window = getWindow();
    var currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
    var points = Object.keys(breakpoints).map(function (point) {
      if (typeof point === 'string' && point.indexOf('@') === 0) {
        var minRatio = parseFloat(point.substr(1));
        var value = currentHeight * minRatio;
        return {
          value: value,
          point: point
        };
      }

      return {
        value: point,
        point: point
      };
    });
    points.sort(function (a, b) {
      return parseInt(a.value, 10) - parseInt(b.value, 10);
    });

    for (var i = 0; i < points.length; i += 1) {
      var _points$i = points[i],
          point = _points$i.point,
          value = _points$i.value;

      if (base === 'window') {
        if (window.matchMedia("(min-width: ".concat(value, "px)")).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }

    return breakpoint || 'max';
  }

  var breakpoints = {
    setBreakpoint: setBreakpoint,
    getBreakpoint: getBreakpoint
  };

  function prepareClasses(entries, prefix) {
    var resultClasses = [];
    entries.forEach(function (item) {
      if (_typeof(item) === 'object') {
        Object.keys(item).forEach(function (classNames) {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === 'string') {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }

  function addClasses() {
    var _el$classList2;

    var swiper = this;
    var classNames = swiper.classNames,
        params = swiper.params,
        rtl = swiper.rtl,
        el = swiper.el,
        device = swiper.device; // prettier-ignore

    var suffixes = prepareClasses(['initialized', params.direction, {
      'free-mode': swiper.params.freeMode && params.freeMode.enabled
    }, {
      'autoheight': params.autoHeight
    }, {
      'rtl': rtl
    }, {
      'grid': params.grid && params.grid.rows > 1
    }, {
      'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
    }, {
      'android': device.android
    }, {
      'ios': device.ios
    }, {
      'css-mode': params.cssMode
    }, {
      'centered': params.cssMode && params.centeredSlides
    }, {
      'watch-progress': params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push.apply(classNames, _toConsumableArray(suffixes));

    (_el$classList2 = el.classList).add.apply(_el$classList2, _toConsumableArray(classNames));

    swiper.emitContainerClasses();
  }

  function removeClasses() {
    var _el$classList3;

    var swiper = this;
    var el = swiper.el,
        classNames = swiper.classNames;

    (_el$classList3 = el.classList).remove.apply(_el$classList3, _toConsumableArray(classNames));

    swiper.emitContainerClasses();
  }

  var classes = {
    addClasses: addClasses,
    removeClasses: removeClasses
  };

  function checkOverflow() {
    var swiper = this;
    var wasLocked = swiper.isLocked,
        params = swiper.params;
    var slidesOffsetBefore = params.slidesOffsetBefore;

    if (slidesOffsetBefore) {
      var lastSlideIndex = swiper.slides.length - 1;
      var lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }

    if (params.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }

    if (params.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }

    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
    }
  }

  var checkOverflow$1 = {
    checkOverflow: checkOverflow
  };
  var defaults = {
    init: true,
    direction: 'horizontal',
    oneWayMovement: false,
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    enabled: true,
    focusableElements: 'input, select, option, textarea, button, video, label',
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: 'slide',
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: undefined,
    breakpointsBase: 'window',
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: true,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // loop
    loop: false,
    loopedSlides: null,
    loopPreventsSliding: true,
    // rewind
    rewind: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    // NS
    containerModifierClass: 'swiper-',
    // NEW
    slideClass: 'swiper-slide',
    slideActiveClass: 'swiper-slide-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideNextClass: 'swiper-slide-next',
    slidePrevClass: 'swiper-slide-prev',
    wrapperClass: 'swiper-wrapper',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    lazyPreloadPrevNext: 0,
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false
  };

  function moduleExtendParams(params, allModulesParams) {
    return function extendParams() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var moduleParamName = Object.keys(obj)[0];
      var moduleParams = obj[moduleParamName];

      if (_typeof(moduleParams) !== 'object' || moduleParams === null) {
        extend$1(allModulesParams, obj);
        return;
      }

      if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
        params[moduleParamName] = {
          auto: true
        };
      }

      if (!(moduleParamName in params && 'enabled' in moduleParams)) {
        extend$1(allModulesParams, obj);
        return;
      }

      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }

      if (_typeof(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }

      if (!params[moduleParamName]) params[moduleParamName] = {
        enabled: false
      };
      extend$1(allModulesParams, obj);
    };
  }
  /* eslint no-param-reassign: "off" */


  var prototypes = {
    eventsEmitter: eventsEmitter,
    update: update,
    translate: translate,
    transition: transition,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    events: events$1,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes
  };
  var extendedDefaults = {};

  var Swiper =
  /*#__PURE__*/
  function () {
    function Swiper() {
      _classCallCheck(this, Swiper);

      var el;
      var params;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
        params = args[0];
      } else {
        el = args[0];
        params = args[1];
      }

      if (!params) params = {};
      params = extend$1({}, params);
      if (el && !params.el) params.el = el;
      var document = getDocument();

      if (params.el && typeof params.el === 'string' && document.querySelectorAll(params.el).length > 1) {
        var swipers = [];
        document.querySelectorAll(params.el).forEach(function (containerEl) {
          var newParams = extend$1({}, params, {
            el: containerEl
          });
          swipers.push(new Swiper(newParams));
        }); // eslint-disable-next-line no-constructor-return

        return swipers;
      } // Swiper Instance


      var swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = _toConsumableArray(swiper.__modules__);

      if (params.modules && Array.isArray(params.modules)) {
        var _swiper$modules;

        (_swiper$modules = swiper.modules).push.apply(_swiper$modules, _toConsumableArray(params.modules));
      }

      var allModulesParams = {};
      swiper.modules.forEach(function (mod) {
        mod({
          params: params,
          swiper: swiper,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper)
        });
      }); // Extend defaults with modules params

      var swiperParams = extend$1({}, defaults, allModulesParams); // Extend defaults with passed params

      swiper.params = extend$1({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = extend$1({}, swiper.params);
      swiper.passedParams = extend$1({}, params); // add event listeners

      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach(function (eventName) {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }

      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      } // Extend Swiper


      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el: el,
        // Classes
        classNames: [],
        // Slides
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment: function cssOverflowAdjustment() {
          // Returns 0 unless `translate` is > 2**23
          // Should be subtracted from css values to prevent overflow
          return Math.trunc(this.translate / Math.pow(2, 23)) * Math.pow(2, 23);
        },
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          focusableElements: swiper.params.focusableElements,
          // Last click time
          lastClickTime: 0,
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          startMoving: undefined,
          evCache: []
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper.emit('_swiper'); // Init

      if (swiper.params.init) {
        swiper.init();
      } // Return app instance
      // eslint-disable-next-line no-constructor-return


      return swiper;
    }

    _createClass(Swiper, [{
      key: "getSlideIndex",
      value: function getSlideIndex(slideEl) {
        var slidesEl = this.slidesEl,
            params = this.params;
        var slides = elementChildren(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
        var firstSlideIndex = elementIndex(slides[0]);
        return elementIndex(slideEl) - firstSlideIndex;
      }
    }, {
      key: "getSlideIndexByData",
      value: function getSlideIndexByData(index) {
        return this.getSlideIndex(this.slides.filter(function (slideEl) {
          return slideEl.getAttribute('data-swiper-slide-index') * 1 === index;
        })[0]);
      }
    }, {
      key: "recalcSlides",
      value: function recalcSlides() {
        var swiper = this;
        var slidesEl = swiper.slidesEl,
            params = swiper.params;
        swiper.slides = elementChildren(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
      }
    }, {
      key: "enable",
      value: function enable() {
        var swiper = this;
        if (swiper.enabled) return;
        swiper.enabled = true;

        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }

        swiper.emit('enable');
      }
    }, {
      key: "disable",
      value: function disable() {
        var swiper = this;
        if (!swiper.enabled) return;
        swiper.enabled = false;

        if (swiper.params.grabCursor) {
          swiper.unsetGrabCursor();
        }

        swiper.emit('disable');
      }
    }, {
      key: "setProgress",
      value: function setProgress(progress, speed) {
        var swiper = this;
        progress = Math.min(Math.max(progress, 0), 1);
        var min = swiper.minTranslate();
        var max = swiper.maxTranslate();
        var current = (max - min) * progress + min;
        swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
    }, {
      key: "emitContainerClasses",
      value: function emitContainerClasses() {
        var swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        var cls = swiper.el.className.split(' ').filter(function (className) {
          return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
        });
        swiper.emit('_containerClasses', cls.join(' '));
      }
    }, {
      key: "getSlideClasses",
      value: function getSlideClasses(slideEl) {
        var swiper = this;
        if (swiper.destroyed) return '';
        return slideEl.className.split(' ').filter(function (className) {
          return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
        }).join(' ');
      }
    }, {
      key: "emitSlidesClasses",
      value: function emitSlidesClasses() {
        var swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        var updates = [];
        swiper.slides.forEach(function (slideEl) {
          var classNames = swiper.getSlideClasses(slideEl);
          updates.push({
            slideEl: slideEl,
            classNames: classNames
          });
          swiper.emit('_slideClass', slideEl, classNames);
        });
        swiper.emit('_slideClasses', updates);
      }
    }, {
      key: "slidesPerViewDynamic",
      value: function slidesPerViewDynamic() {
        var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
        var exact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var swiper = this;
        var params = swiper.params,
            slides = swiper.slides,
            slidesGrid = swiper.slidesGrid,
            slidesSizesGrid = swiper.slidesSizesGrid,
            swiperSize = swiper.size,
            activeIndex = swiper.activeIndex;
        var spv = 1;

        if (params.centeredSlides) {
          var slideSize = slides[activeIndex].swiperSlideSize;
          var breakLoop;

          for (var i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }

          for (var _i7 = activeIndex - 1; _i7 >= 0; _i7 -= 1) {
            if (slides[_i7] && !breakLoop) {
              slideSize += slides[_i7].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }
        } else {
          // eslint-disable-next-line
          if (view === 'current') {
            for (var _i8 = activeIndex + 1; _i8 < slides.length; _i8 += 1) {
              var slideInView = exact ? slidesGrid[_i8] + slidesSizesGrid[_i8] - slidesGrid[activeIndex] < swiperSize : slidesGrid[_i8] - slidesGrid[activeIndex] < swiperSize;

              if (slideInView) {
                spv += 1;
              }
            }
          } else {
            // previous
            for (var _i9 = activeIndex - 1; _i9 >= 0; _i9 -= 1) {
              var _slideInView = slidesGrid[activeIndex] - slidesGrid[_i9] < swiperSize;

              if (_slideInView) {
                spv += 1;
              }
            }
          }
        }

        return spv;
      }
    }, {
      key: "update",
      value: function update() {
        var swiper = this;
        if (!swiper || swiper.destroyed) return;
        var snapGrid = swiper.snapGrid,
            params = swiper.params; // Breakpoints

        if (params.breakpoints) {
          swiper.setBreakpoint();
        }

        _toConsumableArray(swiper.el.querySelectorAll('[loading="lazy"]')).forEach(function (imageEl) {
          if (imageEl.complete) {
            processLazyPreloader(swiper, imageEl);
          }
        });

        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        function setTranslate() {
          var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
          var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }

        var translated;

        if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
          setTranslate();

          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
            var slides = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
            translated = swiper.slideTo(slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }

          if (!translated) {
            setTranslate();
          }
        }

        if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }

        swiper.emit('update');
      }
    }, {
      key: "changeDirection",
      value: function changeDirection(newDirection) {
        var needUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var swiper = this;
        var currentDirection = swiper.params.direction;

        if (!newDirection) {
          // eslint-disable-next-line
          newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
        }

        if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
          return swiper;
        }

        swiper.el.classList.remove("".concat(swiper.params.containerModifierClass).concat(currentDirection));
        swiper.el.classList.add("".concat(swiper.params.containerModifierClass).concat(newDirection));
        swiper.emitContainerClasses();
        swiper.params.direction = newDirection;
        swiper.slides.forEach(function (slideEl) {
          if (newDirection === 'vertical') {
            slideEl.style.width = '';
          } else {
            slideEl.style.height = '';
          }
        });
        swiper.emit('changeDirection');
        if (needUpdate) swiper.update();
        return swiper;
      }
    }, {
      key: "changeLanguageDirection",
      value: function changeLanguageDirection(direction) {
        var swiper = this;
        if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
        swiper.rtl = direction === 'rtl';
        swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;

        if (swiper.rtl) {
          swiper.el.classList.add("".concat(swiper.params.containerModifierClass, "rtl"));
          swiper.el.dir = 'rtl';
        } else {
          swiper.el.classList.remove("".concat(swiper.params.containerModifierClass, "rtl"));
          swiper.el.dir = 'ltr';
        }

        swiper.update();
      }
    }, {
      key: "mount",
      value: function mount(element) {
        var swiper = this;
        if (swiper.mounted) return true; // Find el

        var el = element || swiper.params.el;

        if (typeof el === 'string') {
          el = document.querySelector(el);
        }

        if (!el) {
          return false;
        }

        el.swiper = swiper;

        if (el.shadowEl) {
          swiper.isElement = true;
        }

        var getWrapperSelector = function getWrapperSelector() {
          return ".".concat((swiper.params.wrapperClass || '').trim().split(' ').join('.'));
        };

        var getWrapper = function getWrapper() {
          if (el && el.shadowRoot && el.shadowRoot.querySelector) {
            var res = el.shadowRoot.querySelector(getWrapperSelector()); // Children needs to return slot items

            return res;
          }

          return elementChildren(el, getWrapperSelector())[0];
        }; // Find Wrapper


        var wrapperEl = getWrapper();

        if (!wrapperEl && swiper.params.createElements) {
          wrapperEl = createElement('div', swiper.params.wrapperClass);
          el.append(wrapperEl);
          elementChildren(el, ".".concat(swiper.params.slideClass)).forEach(function (slideEl) {
            wrapperEl.append(slideEl);
          });
        }

        Object.assign(swiper, {
          el: el,
          wrapperEl: wrapperEl,
          slidesEl: swiper.isElement ? el : wrapperEl,
          mounted: true,
          // RTL
          rtl: el.dir.toLowerCase() === 'rtl' || elementStyle(el, 'direction') === 'rtl',
          rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || elementStyle(el, 'direction') === 'rtl'),
          wrongRTL: elementStyle(wrapperEl, 'display') === '-webkit-box'
        });
        return true;
      }
    }, {
      key: "init",
      value: function init(el) {
        var swiper = this;
        if (swiper.initialized) return swiper;
        var mounted = swiper.mount(el);
        if (mounted === false) return swiper;
        swiper.emit('beforeInit'); // Set breakpoint

        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        } // Add Classes


        swiper.addClasses(); // Update size

        swiper.updateSize(); // Update slides

        swiper.updateSlides();

        if (swiper.params.watchOverflow) {
          swiper.checkOverflow();
        } // Set Grab Cursor


        if (swiper.params.grabCursor && swiper.enabled) {
          swiper.setGrabCursor();
        } // Slide To Initial Slide


        if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
          swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
        } // Create loop


        if (swiper.params.loop) {
          swiper.loopCreate();
        } // Attach events


        swiper.attachEvents();

        _toConsumableArray(swiper.el.querySelectorAll('[loading="lazy"]')).forEach(function (imageEl) {
          if (imageEl.complete) {
            processLazyPreloader(swiper, imageEl);
          } else {
            imageEl.addEventListener('load', function (e) {
              processLazyPreloader(swiper, e.target);
            });
          }
        });

        preload(swiper); // Init Flag

        swiper.initialized = true;
        preload(swiper); // Emit

        swiper.emit('init');
        swiper.emit('afterInit');
        return swiper;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var swiper = this;
        var params = swiper.params,
            el = swiper.el,
            wrapperEl = swiper.wrapperEl,
            slides = swiper.slides;

        if (typeof swiper.params === 'undefined' || swiper.destroyed) {
          return null;
        }

        swiper.emit('beforeDestroy'); // Init Flag

        swiper.initialized = false; // Detach events

        swiper.detachEvents(); // Destroy loop

        if (params.loop) {
          swiper.loopDestroy();
        } // Cleanup styles


        if (cleanStyles) {
          swiper.removeClasses();
          el.removeAttribute('style');
          wrapperEl.removeAttribute('style');

          if (slides && slides.length) {
            slides.forEach(function (slideEl) {
              slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
              slideEl.removeAttribute('style');
              slideEl.removeAttribute('data-swiper-slide-index');
            });
          }
        }

        swiper.emit('destroy'); // Detach emitter events

        Object.keys(swiper.eventsListeners).forEach(function (eventName) {
          swiper.off(eventName);
        });

        if (deleteInstance !== false) {
          swiper.el.swiper = null;
          deleteProps(swiper);
        }

        swiper.destroyed = true;
        return null;
      }
    }], [{
      key: "extendDefaults",
      value: function extendDefaults(newDefaults) {
        extend$1(extendedDefaults, newDefaults);
      }
    }, {
      key: "installModule",
      value: function installModule(mod) {
        if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
        var modules = Swiper.prototype.__modules__;

        if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
          modules.push(mod);
        }
      }
    }, {
      key: "use",
      value: function use(module) {
        if (Array.isArray(module)) {
          module.forEach(function (m) {
            return Swiper.installModule(m);
          });
          return Swiper;
        }

        Swiper.installModule(module);
        return Swiper;
      }
    }, {
      key: "extendedDefaults",
      get: function get() {
        return extendedDefaults;
      }
    }, {
      key: "defaults",
      get: function get() {
        return defaults;
      }
    }]);

    return Swiper;
  }();

  Object.keys(prototypes).forEach(function (prototypeGroup) {
    Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);

  function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
    if (swiper.params.createElements) {
      Object.keys(checkProps).forEach(function (key) {
        if (!params[key] && params.auto === true) {
          var element = elementChildren(swiper.el, ".".concat(checkProps[key]))[0];

          if (!element) {
            element = createElement('div', checkProps[key]);
            element.className = checkProps[key];
            swiper.el.append(element);
          }

          params[key] = element;
          originalParams[key] = element;
        }
      });
    }

    return params;
  }

  function Navigation(_ref8) {
    var swiper = _ref8.swiper,
        extendParams = _ref8.extendParams,
        on = _ref8.on,
        emit = _ref8.emit;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock',
        navigationDisabledClass: 'swiper-navigation-disabled'
      }
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null
    };

    var makeElementsArray = function makeElementsArray(el) {
      if (!Array.isArray(el)) el = [el].filter(function (e) {
        return !!e;
      });
      return el;
    };

    function getEl(el) {
      var res;

      if (el && typeof el === 'string' && swiper.isElement) {
        res = swiper.el.shadowRoot.querySelector(el);
        if (res) return res;
      }

      if (el) {
        if (typeof el === 'string') res = _toConsumableArray(document.querySelectorAll(el));

        if (swiper.params.uniqueNavElements && typeof el === 'string' && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
          res = swiper.el.querySelector(el);
        }
      }

      if (el && !res) return el; // if (Array.isArray(res) && res.length === 1) res = res[0];

      return res;
    }

    function toggleEl(el, disabled) {
      var params = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        if (subEl) {
          var _subEl$classList;

          (_subEl$classList = subEl.classList)[disabled ? 'add' : 'remove'].apply(_subEl$classList, _toConsumableArray(params.disabledClass.split(' ')));

          if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;

          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
          }
        }
      });
    }

    function update() {
      // Update Navigation Buttons
      var _swiper$navigation = swiper.navigation,
          nextEl = _swiper$navigation.nextEl,
          prevEl = _swiper$navigation.prevEl;

      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }

      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }

    function onPrevClick(e) {
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slidePrev();
      emit('navigationPrev');
    }

    function onNextClick(e) {
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slideNext();
      emit('navigationNext');
    }

    function init() {
      var params = swiper.params.navigation;
      swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
        nextEl: 'swiper-button-next',
        prevEl: 'swiper-button-prev'
      });
      if (!(params.nextEl || params.prevEl)) return;
      var nextEl = getEl(params.nextEl);
      var prevEl = getEl(params.prevEl);
      Object.assign(swiper.navigation, {
        nextEl: nextEl,
        prevEl: prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);

      var initButton = function initButton(el, dir) {
        if (el) {
          el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
        }

        if (!swiper.enabled && el) {
          var _el$classList4;

          (_el$classList4 = el.classList).add.apply(_el$classList4, _toConsumableArray(params.lockClass.split(' ')));
        }
      };

      nextEl.forEach(function (el) {
        return initButton(el, 'next');
      });
      prevEl.forEach(function (el) {
        return initButton(el, 'prev');
      });
    }

    function destroy() {
      var _swiper$navigation2 = swiper.navigation,
          nextEl = _swiper$navigation2.nextEl,
          prevEl = _swiper$navigation2.prevEl;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);

      var destroyButton = function destroyButton(el, dir) {
        var _el$classList5;

        el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);

        (_el$classList5 = el.classList).remove.apply(_el$classList5, _toConsumableArray(swiper.params.navigation.disabledClass.split(' ')));
      };

      nextEl.forEach(function (el) {
        return destroyButton(el, 'next');
      });
      prevEl.forEach(function (el) {
        return destroyButton(el, 'prev');
      });
    }

    on('init', function () {
      if (swiper.params.navigation.enabled === false) {
        // eslint-disable-next-line
        disable();
      } else {
        init();
        update();
      }
    });
    on('toEdge fromEdge lock unlock', function () {
      update();
    });
    on('destroy', function () {
      destroy();
    });
    on('enable disable', function () {
      var _swiper$navigation3 = swiper.navigation,
          nextEl = _swiper$navigation3.nextEl,
          prevEl = _swiper$navigation3.prevEl;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      [].concat(_toConsumableArray(nextEl), _toConsumableArray(prevEl)).filter(function (el) {
        return !!el;
      }).forEach(function (el) {
        return el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.navigation.lockClass);
      });
    });
    on('click', function (_s, e) {
      var _swiper$navigation4 = swiper.navigation,
          nextEl = _swiper$navigation4.nextEl,
          prevEl = _swiper$navigation4.prevEl;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      var targetEl = e.target;

      if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
        if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
        var isHidden;

        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        }

        if (isHidden === true) {
          emit('navigationShow');
        } else {
          emit('navigationHide');
        }

        [].concat(_toConsumableArray(nextEl), _toConsumableArray(prevEl)).filter(function (el) {
          return !!el;
        }).forEach(function (el) {
          return el.classList.toggle(swiper.params.navigation.hiddenClass);
        });
      }
    });

    var enable = function enable() {
      var _swiper$el$classList;

      (_swiper$el$classList = swiper.el.classList).remove.apply(_swiper$el$classList, _toConsumableArray(swiper.params.navigation.navigationDisabledClass.split(' ')));

      init();
      update();
    };

    var disable = function disable() {
      var _swiper$el$classList2;

      (_swiper$el$classList2 = swiper.el.classList).add.apply(_swiper$el$classList2, _toConsumableArray(swiper.params.navigation.navigationDisabledClass.split(' ')));

      destroy();
    };

    Object.assign(swiper.navigation, {
      enable: enable,
      disable: disable,
      update: update,
      init: init,
      destroy: destroy
    });
  }

  function classesToSelector() {
    var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return ".".concat(classes.trim().replace(/([\.:!+\/])/g, '\\$1') // eslint-disable-line
    .replace(/ /g, '.'));
  }

  function Pagination(_ref9) {
    var swiper = _ref9.swiper,
        extendParams = _ref9.extendParams,
        on = _ref9.on,
        emit = _ref9.emit;
    var pfx = 'swiper-pagination';
    extendParams({
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets',
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function formatFractionCurrent(number) {
          return number;
        },
        formatFractionTotal: function formatFractionTotal(number) {
          return number;
        },
        bulletClass: "".concat(pfx, "-bullet"),
        bulletActiveClass: "".concat(pfx, "-bullet-active"),
        modifierClass: "".concat(pfx, "-"),
        currentClass: "".concat(pfx, "-current"),
        totalClass: "".concat(pfx, "-total"),
        hiddenClass: "".concat(pfx, "-hidden"),
        progressbarFillClass: "".concat(pfx, "-progressbar-fill"),
        progressbarOppositeClass: "".concat(pfx, "-progressbar-opposite"),
        clickableClass: "".concat(pfx, "-clickable"),
        lockClass: "".concat(pfx, "-lock"),
        horizontalClass: "".concat(pfx, "-horizontal"),
        verticalClass: "".concat(pfx, "-vertical"),
        paginationDisabledClass: "".concat(pfx, "-disabled")
      }
    });
    swiper.pagination = {
      el: null,
      bullets: []
    };
    var bulletSize;
    var dynamicBulletIndex = 0;

    var makeElementsArray = function makeElementsArray(el) {
      if (!Array.isArray(el)) el = [el].filter(function (e) {
        return !!e;
      });
      return el;
    };

    function isPaginationDisabled() {
      return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
    }

    function setSideBullets(bulletEl, position) {
      var bulletActiveClass = swiper.params.pagination.bulletActiveClass;
      if (!bulletEl) return;
      bulletEl = bulletEl["".concat(position === 'prev' ? 'previous' : 'next', "ElementSibling")];

      if (bulletEl) {
        bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position));
        bulletEl = bulletEl["".concat(position === 'prev' ? 'previous' : 'next', "ElementSibling")];

        if (bulletEl) {
          bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position, "-").concat(position));
        }
      }
    }

    function onBulletClick(e) {
      var bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));

      if (!bulletEl) {
        return;
      }

      e.preventDefault();
      var index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;

      if (swiper.params.loop) {
        if (swiper.realIndex === index) return;
        var newSlideIndex = swiper.getSlideIndexByData(index);
        var currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);

        if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
          swiper.loopFix({
            direction: newSlideIndex > currentSlideIndex ? 'next' : 'prev',
            activeSlideIndex: newSlideIndex,
            slideTo: false
          });
        }

        swiper.slideToLoop(index);
      } else {
        swiper.slideTo(index);
      }
    }

    function update() {
      // Render || Update Pagination bullets/items
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      var el = swiper.pagination.el;
      el = makeElementsArray(el); // Current/Total

      var current;
      var previousIndex;
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

      if (swiper.params.loop) {
        previousIndex = swiper.previousRealIndex || 0;
        current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
        previousIndex = swiper.previousSnapIndex;
      } else {
        previousIndex = swiper.previousIndex || 0;
        current = swiper.activeIndex || 0;
      } // Types


      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;

        if (params.dynamicBullets) {
          bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
          el.forEach(function (subEl) {
            subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = "".concat(bulletSize * (params.dynamicMainBullets + 4), "px");
          });

          if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
            dynamicBulletIndex += current - (previousIndex || 0);

            if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (dynamicBulletIndex < 0) {
              dynamicBulletIndex = 0;
            }
          }

          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }

        bullets.forEach(function (bulletEl) {
          var _bulletEl$classList;

          var classesToRemove = _toConsumableArray(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(function (suffix) {
            return "".concat(params.bulletActiveClass).concat(suffix);
          })).map(function (s) {
            return typeof s === 'string' && s.includes(' ') ? s.split(' ') : s;
          }).flat();

          (_bulletEl$classList = bulletEl.classList).remove.apply(_bulletEl$classList, _toConsumableArray(classesToRemove));
        });

        if (el.length > 1) {
          bullets.forEach(function (bullet) {
            var bulletIndex = elementIndex(bullet);

            if (bulletIndex === current) {
              var _bullet$classList;

              (_bullet$classList = bullet.classList).add.apply(_bullet$classList, _toConsumableArray(params.bulletActiveClass.split(' ')));
            }

            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                var _bullet$classList2;

                (_bullet$classList2 = bullet.classList).add.apply(_bullet$classList2, _toConsumableArray("".concat(params.bulletActiveClass, "-main").split(' ')));
              }

              if (bulletIndex === firstIndex) {
                setSideBullets(bullet, 'prev');
              }

              if (bulletIndex === lastIndex) {
                setSideBullets(bullet, 'next');
              }
            }
          });
        } else {
          var bullet = bullets[current];

          if (bullet) {
            var _bullet$classList3;

            (_bullet$classList3 = bullet.classList).add.apply(_bullet$classList3, _toConsumableArray(params.bulletActiveClass.split(' ')));
          }

          if (params.dynamicBullets) {
            var firstDisplayedBullet = bullets[firstIndex];
            var lastDisplayedBullet = bullets[lastIndex];

            for (var i = firstIndex; i <= lastIndex; i += 1) {
              if (bullets[i]) {
                var _bullets$i$classList;

                (_bullets$i$classList = bullets[i].classList).add.apply(_bullets$i$classList, _toConsumableArray("".concat(params.bulletActiveClass, "-main").split(' ')));
              }
            }

            setSideBullets(firstDisplayedBullet, 'prev');
            setSideBullets(lastDisplayedBullet, 'next');
          }
        }

        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
          var offsetProp = rtl ? 'right' : 'left';
          bullets.forEach(function (bullet) {
            bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = "".concat(bulletsOffset, "px");
          });
        }
      }

      el.forEach(function (subEl, subElIndex) {
        if (params.type === 'fraction') {
          subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach(function (fractionEl) {
            fractionEl.textContent = params.formatFractionCurrent(current + 1);
          });
          subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach(function (totalEl) {
            totalEl.textContent = params.formatFractionTotal(total);
          });
        }

        if (params.type === 'progressbar') {
          var progressbarDirection;

          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
          } else {
            progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
          }

          var scale = (current + 1) / total;
          var scaleX = 1;
          var scaleY = 1;

          if (progressbarDirection === 'horizontal') {
            scaleX = scale;
          } else {
            scaleY = scale;
          }

          subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach(function (progressEl) {
            progressEl.style.transform = "translate3d(0,0,0) scaleX(".concat(scaleX, ") scaleY(").concat(scaleY, ")");
            progressEl.style.transitionDuration = "".concat(swiper.params.speed, "ms");
          });
        }

        if (params.type === 'custom' && params.renderCustom) {
          subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
          if (subElIndex === 0) emit('paginationRender', subEl);
        } else {
          if (subElIndex === 0) emit('paginationRender', subEl);
          emit('paginationUpdate', subEl);
        }

        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      });
    }

    function render() {
      // Render Container
      var params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var el = swiper.pagination.el;
      el = makeElementsArray(el);
      var paginationHTML = '';

      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
          numberOfBullets = slidesLength;
        }

        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<".concat(params.bulletElement, " class=\"").concat(params.bulletClass, "\"></").concat(params.bulletElement, ">");
          }
        }
      }

      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"".concat(params.currentClass, "\"></span>") + ' / ' + "<span class=\"".concat(params.totalClass, "\"></span>");
        }
      }

      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"".concat(params.progressbarFillClass, "\"></span>");
        }
      }

      swiper.pagination.bullets = [];
      el.forEach(function (subEl) {
        if (params.type !== 'custom') {
          subEl.innerHTML = paginationHTML || '';
        }

        if (params.type === 'bullets') {
          var _swiper$pagination$bu;

          (_swiper$pagination$bu = swiper.pagination.bullets).push.apply(_swiper$pagination$bu, _toConsumableArray(subEl.querySelectorAll(classesToSelector(params.bulletClass))));
        }
      });

      if (params.type !== 'custom') {
        emit('paginationRender', el[0]);
      }
    }

    function init() {
      swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
        el: 'swiper-pagination'
      });
      var params = swiper.params.pagination;
      if (!params.el) return;
      var el;

      if (typeof params.el === 'string' && swiper.isElement) {
        el = swiper.el.shadowRoot.querySelector(params.el);
      }

      if (!el && typeof params.el === 'string') {
        el = _toConsumableArray(document.querySelectorAll(params.el));
      }

      if (!el) {
        el = params.el;
      }

      if (!el || el.length === 0) return;

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
        el = _toConsumableArray(swiper.el.querySelectorAll(params.el)); // check if it belongs to another nested Swiper

        if (el.length > 1) {
          el = el.filter(function (subEl) {
            if (elementParents(subEl, '.swiper')[0] !== swiper.el) return false;
            return true;
          })[0];
        }
      }

      if (Array.isArray(el) && el.length === 1) el = el[0];
      Object.assign(swiper.pagination, {
        el: el
      });
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        if (params.type === 'bullets' && params.clickable) {
          subEl.classList.add(params.clickableClass);
        }

        subEl.classList.add(params.modifierClass + params.type);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

        if (params.type === 'bullets' && params.dynamicBullets) {
          subEl.classList.add("".concat(params.modifierClass).concat(params.type, "-dynamic"));
          dynamicBulletIndex = 0;

          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }

        if (params.type === 'progressbar' && params.progressbarOpposite) {
          subEl.classList.add(params.progressbarOppositeClass);
        }

        if (params.clickable) {
          subEl.addEventListener('click', onBulletClick);
        }

        if (!swiper.enabled) {
          subEl.classList.add(params.lockClass);
        }
      });
    }

    function destroy() {
      var params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      var el = swiper.pagination.el;

      if (el) {
        el = makeElementsArray(el);
        el.forEach(function (subEl) {
          subEl.classList.remove(params.hiddenClass);
          subEl.classList.remove(params.modifierClass + params.type);
          subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

          if (params.clickable) {
            subEl.removeEventListener('click', onBulletClick);
          }
        });
      }

      if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(function (subEl) {
        var _subEl$classList2;

        return (_subEl$classList2 = subEl.classList).remove.apply(_subEl$classList2, _toConsumableArray(params.bulletActiveClass.split(' ')));
      });
    }

    on('changeDirection', function () {
      if (!swiper.pagination || !swiper.pagination.el) return;
      var params = swiper.params.pagination;
      var el = swiper.pagination.el;
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        subEl.classList.remove(params.horizontalClass, params.verticalClass);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      });
    });
    on('init', function () {
      if (swiper.params.pagination.enabled === false) {
        // eslint-disable-next-line
        disable();
      } else {
        init();
        render();
        update();
      }
    });
    on('activeIndexChange', function () {
      if (typeof swiper.snapIndex === 'undefined') {
        update();
      }
    });
    on('snapIndexChange', function () {
      update();
    });
    on('snapGridLengthChange', function () {
      render();
      update();
    });
    on('destroy', function () {
      destroy();
    });
    on('enable disable', function () {
      var el = swiper.pagination.el;

      if (el) {
        el = makeElementsArray(el);
        el.forEach(function (subEl) {
          return subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass);
        });
      }
    });
    on('lock unlock', function () {
      update();
    });
    on('click', function (_s, e) {
      var targetEl = e.target;
      var el = swiper.pagination.el;
      if (!Array.isArray(el)) el = [el].filter(function (element) {
        return !!element;
      });

      if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
        if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
        var isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);

        if (isHidden === true) {
          emit('paginationShow');
        } else {
          emit('paginationHide');
        }

        el.forEach(function (subEl) {
          return subEl.classList.toggle(swiper.params.pagination.hiddenClass);
        });
      }
    });

    var enable = function enable() {
      swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
      var el = swiper.pagination.el;

      if (el) {
        el = makeElementsArray(el);
        el.forEach(function (subEl) {
          return subEl.classList.remove(swiper.params.pagination.paginationDisabledClass);
        });
      }

      init();
      render();
      update();
    };

    var disable = function disable() {
      swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
      var el = swiper.pagination.el;

      if (el) {
        el = makeElementsArray(el);
        el.forEach(function (subEl) {
          return subEl.classList.add(swiper.params.pagination.paginationDisabledClass);
        });
      }

      destroy();
    };

    Object.assign(swiper.pagination, {
      enable: enable,
      disable: disable,
      render: render,
      update: update,
      init: init,
      destroy: destroy
    });
  }

  Swiper.use([Navigation]);
  Swiper.use([Pagination]);

  function carousel() {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      lazyLoading: true,
      keyboard: {
        enabled: true
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        formatFractionCurrent: function formatFractionCurrent(number) {
          return ('0' + number).slice(-2);
        },
        formatFractionTotal: function formatFractionTotal(number) {
          return ('0' + number).slice(-2);
        },
        renderFraction: function renderFraction(currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + ' <span>/</span> ' + '<span class="' + totalClass + '"></span>';
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        428: {
          slidesPerView: "auto",
          spaceBetween: 10,
          lazyLoading: true,
          keyboard: {
            enabled: true
          }
        }
      }
    });
    var swiperGallery = new Swiper(".s-gallery__swiper", {
      spaceBetween: 15,
      slidesPerView: 'auto',
      centeredSlides: true,
      lazyLoading: true,
      loop: true
    });
    var galleryCheck = document.querySelector('.js-gallery-check');

    if (galleryCheck) {
      var countSlides = galleryCheck.querySelectorAll('.swiper-slide').length;

      if (countSlides > 1) {
        galleryCheck.classList.remove('single');
      } else {
        galleryCheck.classList.add('single');
      }
    }
  }

  function Tabs() {
    var tabs = document.querySelectorAll("[data-tab-target]");
    var tabContents = document.querySelectorAll(".s-our__tabs-content");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (tab) {
          tab.classList.remove("active");
        });
        tab.classList.add("active");
        tabContents.forEach(function (tabContent) {
          tabContent.classList.remove("active");
        });
        var target = document.querySelector(tab.dataset.tabTarget);
        target.classList.add("active");
      });
    });
    var accordionBtns = document.querySelectorAll(".s-our__accordion-item");
    accordionBtns.forEach(function (accordion) {
      accordion.onclick = function () {
        this.classList.toggle("is-open");
        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      };
    });
  }

  function Modals() {
    var btnClose = document.querySelectorAll('.js-close-modal');
    var modal = document.querySelector('.js-modal');
    var form = document.querySelector('.js-form');

    if (form) {
      form.addEventListener('submit', function () {
        modal.classList.add('show');
      });
    }

    if (btnClose) {
      btnClose.forEach(function (item) {
        item.addEventListener('click', function () {
          modal.classList.remove('show');
        });
      });
    }
  }

  function formProcessing() {
    var count = document.querySelector('.s-payment__count');
    var textarea = document.querySelector('textarea');
    var btnCard = document.querySelector('.js-card');
    var cardItems = document.querySelectorAll('.js-block-hide');
    $('.js-form input').on('keyup', function () {
      var empty = false;
      $('.js-form input').each(function () {
        empty = $(this).val().length == 0;
      });
      if (empty) $('.js-form-submit').attr('disabled', 'disabled');else $('.js-form-submit').attr('disabled', false);
    });

    if (btnCard) {
      btnCard.addEventListener('click', function (e) {
        e.preventDefault();
        cardItems.forEach(function (item) {
          item.classList.remove('js-block-hide');
        });
      });
    }

    if (textarea) {
      if (count) {
        count.innerHTML = "1000/1000";
      }

      textarea.onkeyup = function () {
        count.innerHTML = 1000 - this.value.length + "/1000";
      };
    }

    document.querySelector('textarea');
    var formObj = {
      $block: $(this),
      postLink: $(this).attr('action'),
      $submitBtn: $(this).find('[data-form-submit]'),
      $files: $(this).find('input[type="file"]')
    };
    var validateRules = {
      'name-user': {
        required: true,
        minlength: 1,
        maxlength: 30
      },
      email: {
        required: true
      },
      phone: {
        required: true,
        minlength: 1
      },
      company: {
        minlength: 1
      },
      comment: {
        minlength: 1
      },
      file: {
        accept: ""
      },
      accept: {
        required: true
      }
    };
    var validateMessages = {};
    var fieldsViewChange = {
      setError: function setError(element) {
        $(element).closest('[data-form-item]').addClass('error');
      },
      removeError: function removeError(element) {
        $(element).closest('[data-form-item]').removeClass('error');
      },
      showErrorMessage: function showErrorMessage(error, element) {
        $(element).closest('[data-form-item]').find('.el-error').html(error);
      },
      changing: function changing(element) {
        var $this = $(element);

        if ($this.val().trim() !== '') {
          $this.addClass('hasValue');
        } else {
          $this.removeClass('hasValue');
        }
      },
      checkEmpty: function checkEmpty(removeFlag) {
        formObj.$block.find('.el-input__field').each(function () {
          if (removeFlag) {
            $(this).removeClass('hasValue');
          } else {
            fieldsViewChange.changing(this);
          }
        });
      }
    };
    fieldsViewChange.checkEmpty();
    formObj.jsValidator = formObj.$block.validate({
      rules: validateRules,
      messages: validateMessages,
      highlight: fieldsViewChange.setError,
      unhighlight: fieldsViewChange.removeError,
      errorPlacement: fieldsViewChange.showErrorMessage,
      onkeyup: fieldsViewChange.changing,
      submitHandler: function submitHandler() {
        return false;
      }
    });
    /* wpcf7 wp plagin
    $(window).on('wpcf7invalid', function (event) {
        let wpResponse = event.detail.apiResponse;
        wpResponse.invalidFields.forEach(function (fitem, index) {
            let $field = formObj.$block.find('#' + fitem.idref + '.wpcf7-form-control');
            fieldsViewChange.setError($field);
            fieldsViewChange.showErrorMessage(fitem.message, $field);
            if (index === 0) {
                $field.focus();
            }
        });
         //  console.log(event.detail);
         formObj.$submitBtn.removeClass('waiting');
     }).on('wpcf7submit', function (event) {
         //    console.log('wpcf7submit');
     }).on('wpcf7mailsent', function () {
        if (responseId) {
            $.ajax({
                type: "post",
                dataType: "json",
                url: ajaxObject.ajaxUrl,
                data: 'id=' + responseId + '&action=deleteDataInDBFromAjax',
                success: function (response) {
                    if (response.success != true) {
                        console.log(response)
                    } else {
                        console.log(response);
                    }
                }
            })
        }
        formStates.sent();
        fieldsViewChange.checkEmpty(true);
     }).on('wpcf7mailfailed', function (event) {
         formStates.clean();
        let wpResponse = event.detail.apiResponse;
         failModal.updateContent({
            content: wpResponse.message
        });
         failModal.open();
         //   console.log('sending fail');
     }).on('wpcf7spam', function (event) {
        formStates.clean();
        let wpResponse = event.detail.apiResponse;
         failModal.updateContent({
            content: wpResponse.message
        });
         failModal.open();
         //    console.log('sending fail - spam');
    });
    */
    // let failModal = new Modal();
    // failModal.updateContent({
    //     title: ' Oops... <br> Something went wrong :( ',
    //     content: 'server Error'
    // });
    //
    // formObj.$submitBtn.on('click', function (event) {
    //     let wpcf7Form = document.querySelector('.wpcf7');
    //     let str = $(wpcf7Form).find("form").serialize();
    //     $.ajax({
    //         type: "post",
    //         dataType: "json",
    //         url: ajaxObject.ajaxUrl,
    //         data: str + '&action=saveDataInDBFromAjax',
    //         success: function (response) {
    //             if (response.success != true) {
    //                 console.log(response)
    //             } else {
    //                 if (typeof response.data !== 'undefined') {
    //                     responseId = response.data;
    //                 } else {
    //                     console.log(response)
    //                 }
    //             }
    //         }
    //     });
    //     formObj.$submitBtn.removeClass('send');
    //
    //     if (formObj.$block.valid()) {
    //         formStates.sending();
    //     } else {
    //         formObj.jsValidator.focusInvalid();
    //
    //         event.preventDefault();
    //         return false;
    //     }
    //
    // });
  }

  svg4everybody();
  window.app = {
    content: null,
    header: null,
    scroll: {
      disable: scrollLock$1.disablePageScroll,
      enable: scrollLock$1.enablePageScroll
    },
    setInert: function setInert() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (item) {
        item.setAttribute('inert', true);
      });
    },
    removeInert: function removeInert() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.forEach(function (item) {
        item.removeAttribute('inert');
      });
    },
    initModule: function initModule(Module, selector) {
      if (!!selector) {
        var blocks = Array.prototype.slice.call(document.querySelectorAll(selector));
        blocks.forEach(function (block) {
          new Module(block);
        });
      } else {
        new Module();
      }
    },
    init: function init() {
      app.initModule(Header, ".js-header");
      app.initModule(carousel);
      app.initModule(Tabs);
      app.initModule(Modals);
      $('.js-form').each(formProcessing);
    }
  };
  window.addEventListener('DOMContentLoaded', app.init);
});