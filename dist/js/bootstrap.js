/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJib290c3RyYXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gICogQm9vdHN0cmFwIHY0LjEuMyAoaHR0cHM6Ly9nZXRib290c3RyYXAuY29tLylcbiAgKiBDb3B5cmlnaHQgMjAxMS0yMDE4IFRoZSBCb290c3RyYXAgQXV0aG9ycyAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2dyYXBocy9jb250cmlidXRvcnMpXG4gICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnanF1ZXJ5JyksIHJlcXVpcmUoJ3BvcHBlci5qcycpKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnLCAnanF1ZXJ5JywgJ3BvcHBlci5qcyddLCBmYWN0b3J5KSA6XG4gIChmYWN0b3J5KChnbG9iYWwuYm9vdHN0cmFwID0ge30pLGdsb2JhbC5qUXVlcnksZ2xvYmFsLlBvcHBlcikpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMsJCxQb3BwZXIpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICQgPSAkICYmICQuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/ICRbJ2RlZmF1bHQnXSA6ICQ7XG4gIFBvcHBlciA9IFBvcHBlciAmJiBQb3BwZXIuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/IFBvcHBlclsnZGVmYXVsdCddIDogUG9wcGVyO1xuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gICAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gICAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gICAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IHV0aWwuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFV0aWwgPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIFByaXZhdGUgVHJhbnNpdGlvbkVuZCBIZWxwZXJzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIFRSQU5TSVRJT05fRU5EID0gJ3RyYW5zaXRpb25lbmQnO1xuICAgIHZhciBNQVhfVUlEID0gMTAwMDAwMDtcbiAgICB2YXIgTUlMTElTRUNPTkRTX01VTFRJUExJRVIgPSAxMDAwOyAvLyBTaG91dG91dCBBbmd1c0Nyb2xsIChodHRwczovL2dvby5nbC9weHdRR3ApXG5cbiAgICBmdW5jdGlvbiB0b1R5cGUob2JqKSB7XG4gICAgICByZXR1cm4ge30udG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiaW5kVHlwZTogVFJBTlNJVElPTl9FTkQsXG4gICAgICAgIGRlbGVnYXRlVHlwZTogVFJBTlNJVElPTl9FTkQsXG4gICAgICAgIGhhbmRsZTogZnVuY3Rpb24gaGFuZGxlKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCQkJDEoZXZlbnQudGFyZ2V0KS5pcyh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kRW11bGF0b3IoZHVyYXRpb24pIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICAgICQkJDEodGhpcykub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgVXRpbC50cmlnZ2VyVHJhbnNpdGlvbkVuZChfdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFRyYW5zaXRpb25FbmRTdXBwb3J0KCkge1xuICAgICAgJCQkMS5mbi5lbXVsYXRlVHJhbnNpdGlvbkVuZCA9IHRyYW5zaXRpb25FbmRFbXVsYXRvcjtcbiAgICAgICQkJDEuZXZlbnQuc3BlY2lhbFtVdGlsLlRSQU5TSVRJT05fRU5EXSA9IGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBQdWJsaWMgVXRpbCBBcGlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICB2YXIgVXRpbCA9IHtcbiAgICAgIFRSQU5TSVRJT05fRU5EOiAnYnNUcmFuc2l0aW9uRW5kJyxcbiAgICAgIGdldFVJRDogZnVuY3Rpb24gZ2V0VUlEKHByZWZpeCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgICAgICBwcmVmaXggKz0gfn4oTWF0aC5yYW5kb20oKSAqIE1BWF9VSUQpOyAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgICAgIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpO1xuXG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgICB9LFxuICAgICAgZ2V0U2VsZWN0b3JGcm9tRWxlbWVudDogZnVuY3Rpb24gZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xuXG4gICAgICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09ICcjJykge1xuICAgICAgICAgIHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBudWxsO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50OiBmdW5jdGlvbiBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IC8vIEdldCB0cmFuc2l0aW9uLWR1cmF0aW9uIG9mIHRoZSBlbGVtZW50XG5cblxuICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gJCQkMShlbGVtZW50KS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICAgICAgdmFyIGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pOyAvLyBSZXR1cm4gMCBpZiBlbGVtZW50IG9yIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgbm90IGZvdW5kXG5cbiAgICAgICAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbikge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IC8vIElmIG11bHRpcGxlIGR1cmF0aW9ucyBhcmUgZGVmaW5lZCwgdGFrZSB0aGUgZmlyc3RcblxuXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbiA9IHRyYW5zaXRpb25EdXJhdGlvbi5zcGxpdCgnLCcpWzBdO1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pICogTUlMTElTRUNPTkRTX01VTFRJUExJRVI7XG4gICAgICB9LFxuICAgICAgcmVmbG93OiBmdW5jdGlvbiByZWZsb3coZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICB9LFxuICAgICAgdHJpZ2dlclRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHRyaWdnZXJUcmFuc2l0aW9uRW5kKGVsZW1lbnQpIHtcbiAgICAgICAgJCQkMShlbGVtZW50KS50cmlnZ2VyKFRSQU5TSVRJT05fRU5EKTtcbiAgICAgIH0sXG4gICAgICAvLyBUT0RPOiBSZW1vdmUgaW4gdjVcbiAgICAgIHN1cHBvcnRzVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihUUkFOU0lUSU9OX0VORCk7XG4gICAgICB9LFxuICAgICAgaXNFbGVtZW50OiBmdW5jdGlvbiBpc0VsZW1lbnQob2JqKSB7XG4gICAgICAgIHJldHVybiAob2JqWzBdIHx8IG9iaikubm9kZVR5cGU7XG4gICAgICB9LFxuICAgICAgdHlwZUNoZWNrQ29uZmlnOiBmdW5jdGlvbiB0eXBlQ2hlY2tDb25maWcoY29tcG9uZW50TmFtZSwgY29uZmlnLCBjb25maWdUeXBlcykge1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBjb25maWdUeXBlcykge1xuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnVHlwZXMsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgdmFyIGV4cGVjdGVkVHlwZXMgPSBjb25maWdUeXBlc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgICAgICAgICAgdmFyIHZhbHVlVHlwZSA9IHZhbHVlICYmIFV0aWwuaXNFbGVtZW50KHZhbHVlKSA/ICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICghbmV3IFJlZ0V4cChleHBlY3RlZFR5cGVzKS50ZXN0KHZhbHVlVHlwZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNvbXBvbmVudE5hbWUudG9VcHBlckNhc2UoKSArIFwiOiBcIiArIChcIk9wdGlvbiBcXFwiXCIgKyBwcm9wZXJ0eSArIFwiXFxcIiBwcm92aWRlZCB0eXBlIFxcXCJcIiArIHZhbHVlVHlwZSArIFwiXFxcIiBcIikgKyAoXCJidXQgZXhwZWN0ZWQgdHlwZSBcXFwiXCIgKyBleHBlY3RlZFR5cGVzICsgXCJcXFwiLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCgpO1xuICAgIHJldHVybiBVdGlsO1xuICB9KCQpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IGFsZXJ0LmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBBbGVydCA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAnYWxlcnQnO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMS4zJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMuYWxlcnQnO1xuICAgIHZhciBFVkVOVF9LRVkgPSBcIi5cIiArIERBVEFfS0VZO1xuICAgIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJCQkMS5mbltOQU1FXTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBESVNNSVNTOiAnW2RhdGEtZGlzbWlzcz1cImFsZXJ0XCJdJ1xuICAgIH07XG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgQ0xPU0U6IFwiY2xvc2VcIiArIEVWRU5UX0tFWSxcbiAgICAgIENMT1NFRDogXCJjbG9zZWRcIiArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLX0RBVEFfQVBJOiBcImNsaWNrXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgICB9O1xuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBBTEVSVDogJ2FsZXJ0JyxcbiAgICAgIEZBREU6ICdmYWRlJyxcbiAgICAgIFNIT1c6ICdzaG93J1xuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIEFsZXJ0ID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gQWxlcnQoZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBBbGVydC5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoZWxlbWVudCkge1xuICAgICAgICB2YXIgcm9vdEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50O1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgcm9vdEVsZW1lbnQgPSB0aGlzLl9nZXRSb290RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdXN0b21FdmVudCA9IHRoaXMuX3RyaWdnZXJDbG9zZUV2ZW50KHJvb3RFbGVtZW50KTtcblxuICAgICAgICBpZiAoY3VzdG9tRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHJvb3RFbGVtZW50KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9nZXRSb290RWxlbWVudCA9IGZ1bmN0aW9uIF9nZXRSb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgdmFyIHBhcmVudCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICBwYXJlbnQgPSAkJCQxKGVsZW1lbnQpLmNsb3Nlc3QoXCIuXCIgKyBDbGFzc05hbWUuQUxFUlQpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fdHJpZ2dlckNsb3NlRXZlbnQgPSBmdW5jdGlvbiBfdHJpZ2dlckNsb3NlRXZlbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgY2xvc2VFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuQ0xPU0UpO1xuICAgICAgICAkJCQxKGVsZW1lbnQpLnRyaWdnZXIoY2xvc2VFdmVudCk7XG4gICAgICAgIHJldHVybiBjbG9zZUV2ZW50O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9yZW1vdmVFbGVtZW50ID0gZnVuY3Rpb24gX3JlbW92ZUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQkJDEoZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICAgIGlmICghJCQkMShlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICB0aGlzLl9kZXN0cm95RWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAkJCQxKGVsZW1lbnQpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuX2Rlc3Ryb3lFbGVtZW50KGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgfSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZGVzdHJveUVsZW1lbnQgPSBmdW5jdGlvbiBfZGVzdHJveUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICAkJCQxKGVsZW1lbnQpLmRldGFjaCgpLnRyaWdnZXIoRXZlbnQuQ0xPU0VEKS5yZW1vdmUoKTtcbiAgICAgIH07IC8vIFN0YXRpY1xuXG5cbiAgICAgIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkJCQxKHRoaXMpO1xuICAgICAgICAgIHZhciBkYXRhID0gJGVsZW1lbnQuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgQWxlcnQodGhpcyk7XG4gICAgICAgICAgICAkZWxlbWVudC5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29uZmlnID09PSAnY2xvc2UnKSB7XG4gICAgICAgICAgICBkYXRhW2NvbmZpZ10odGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIEFsZXJ0Ll9oYW5kbGVEaXNtaXNzID0gZnVuY3Rpb24gX2hhbmRsZURpc21pc3MoYWxlcnRJbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFsZXJ0SW5zdGFuY2UuY2xvc2UodGhpcyk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoQWxlcnQsIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBBbGVydDtcbiAgICB9KCk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgJCQkMShkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRJU01JU1MsIEFsZXJ0Ll9oYW5kbGVEaXNtaXNzKG5ldyBBbGVydCgpKSk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkJCQxLmZuW05BTUVdID0gQWxlcnQuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQWxlcnQ7XG5cbiAgICAkJCQxLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkJCQxLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBBbGVydDtcbiAgfSgkKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBidXR0b24uanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIEJ1dHRvbiA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAnYnV0dG9uJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmJ1dHRvbic7XG4gICAgdmFyIEVWRU5UX0tFWSA9IFwiLlwiICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkJCQxLmZuW05BTUVdO1xuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBBQ1RJVkU6ICdhY3RpdmUnLFxuICAgICAgQlVUVE9OOiAnYnRuJyxcbiAgICAgIEZPQ1VTOiAnZm9jdXMnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBEQVRBX1RPR0dMRV9DQVJST1Q6ICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJyxcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScsXG4gICAgICBJTlBVVDogJ2lucHV0JyxcbiAgICAgIEFDVElWRTogJy5hY3RpdmUnLFxuICAgICAgQlVUVE9OOiAnLmJ0bidcbiAgICB9O1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIENMSUNLX0RBVEFfQVBJOiBcImNsaWNrXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVksXG4gICAgICBGT0NVU19CTFVSX0RBVEFfQVBJOiBcImZvY3VzXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVkgKyBcIiBcIiArIChcImJsdXJcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSlcbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgfTtcblxuICAgIHZhciBCdXR0b24gPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBCdXR0b24oZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBCdXR0b24ucHJvdG90eXBlO1xuXG4gICAgICAvLyBQdWJsaWNcbiAgICAgIF9wcm90by50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgIHZhciB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSB0cnVlO1xuICAgICAgICB2YXIgYWRkQXJpYVByZXNzZWQgPSB0cnVlO1xuICAgICAgICB2YXIgcm9vdEVsZW1lbnQgPSAkJCQxKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoU2VsZWN0b3IuREFUQV9UT0dHTEUpWzBdO1xuXG4gICAgICAgIGlmIChyb290RWxlbWVudCkge1xuICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5JTlBVVCk7XG5cbiAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgIGlmIChpbnB1dC5jaGVja2VkICYmIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5BQ1RJVkUpKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlckNoYW5nZUV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSByb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkFDVElWRSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgJCQkMShhY3RpdmVFbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgICBpZiAoaW5wdXQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpIHx8IHJvb3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fCBpbnB1dC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykgfHwgcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9ICF0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICAgJCQkMShpbnB1dCkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICBhZGRBcmlhUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhZGRBcmlhUHJlc3NlZCkge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAhdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLkFDVElWRSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBCdXR0b24uX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBCdXR0b24odGhpcyk7XG4gICAgICAgICAgICAkJCQxKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb25maWcgPT09ICd0b2dnbGUnKSB7XG4gICAgICAgICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgX2NyZWF0ZUNsYXNzKEJ1dHRvbiwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcIlZFUlNJT05cIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIEJ1dHRvbjtcbiAgICB9KCk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgJCQkMShkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFX0NBUlJPVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgaWYgKCEkJCQxKGJ1dHRvbikuaGFzQ2xhc3MoQ2xhc3NOYW1lLkJVVFRPTikpIHtcbiAgICAgICAgYnV0dG9uID0gJCQkMShidXR0b24pLmNsb3Nlc3QoU2VsZWN0b3IuQlVUVE9OKTtcbiAgICAgIH1cblxuICAgICAgQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkJCQxKGJ1dHRvbiksICd0b2dnbGUnKTtcbiAgICB9KS5vbihFdmVudC5GT0NVU19CTFVSX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRV9DQVJST1QsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIGJ1dHRvbiA9ICQkJDEoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFNlbGVjdG9yLkJVVFRPTilbMF07XG4gICAgICAkJCQxKGJ1dHRvbikudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkZPQ1VTLCAvXmZvY3VzKGluKT8kLy50ZXN0KGV2ZW50LnR5cGUpKTtcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQkJDEuZm5bTkFNRV0gPSBCdXR0b24uX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQnV0dG9uO1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBCdXR0b24uX2pRdWVyeUludGVyZmFjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJ1dHRvbjtcbiAgfSgkKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBjYXJvdXNlbC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgQ2Fyb3VzZWwgPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ2Nhcm91c2VsJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmNhcm91c2VsJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIEFSUk9XX0xFRlRfS0VZQ09ERSA9IDM3OyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBsZWZ0IGFycm93IGtleVxuXG4gICAgdmFyIEFSUk9XX1JJR0hUX0tFWUNPREUgPSAzOTsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgcmlnaHQgYXJyb3cga2V5XG5cbiAgICB2YXIgVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCA9IDUwMDsgLy8gVGltZSBmb3IgbW91c2UgY29tcGF0IGV2ZW50cyB0byBmaXJlIGFmdGVyIHRvdWNoXG5cbiAgICB2YXIgRGVmYXVsdCA9IHtcbiAgICAgIGludGVydmFsOiA1MDAwLFxuICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICBzbGlkZTogZmFsc2UsXG4gICAgICBwYXVzZTogJ2hvdmVyJyxcbiAgICAgIHdyYXA6IHRydWVcbiAgICB9O1xuICAgIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICAgIGludGVydmFsOiAnKG51bWJlcnxib29sZWFuKScsXG4gICAgICBrZXlib2FyZDogJ2Jvb2xlYW4nLFxuICAgICAgc2xpZGU6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICAgIHBhdXNlOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgICB3cmFwOiAnYm9vbGVhbidcbiAgICB9O1xuICAgIHZhciBEaXJlY3Rpb24gPSB7XG4gICAgICBORVhUOiAnbmV4dCcsXG4gICAgICBQUkVWOiAncHJldicsXG4gICAgICBMRUZUOiAnbGVmdCcsXG4gICAgICBSSUdIVDogJ3JpZ2h0J1xuICAgIH07XG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgU0xJREU6IFwic2xpZGVcIiArIEVWRU5UX0tFWSxcbiAgICAgIFNMSUQ6IFwic2xpZFwiICsgRVZFTlRfS0VZLFxuICAgICAgS0VZRE9XTjogXCJrZXlkb3duXCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUVOVEVSOiBcIm1vdXNlZW50ZXJcIiArIEVWRU5UX0tFWSxcbiAgICAgIE1PVVNFTEVBVkU6IFwibW91c2VsZWF2ZVwiICsgRVZFTlRfS0VZLFxuICAgICAgVE9VQ0hFTkQ6IFwidG91Y2hlbmRcIiArIEVWRU5UX0tFWSxcbiAgICAgIExPQURfREFUQV9BUEk6IFwibG9hZFwiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZLFxuICAgICAgQ0xJQ0tfREFUQV9BUEk6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIENBUk9VU0VMOiAnY2Fyb3VzZWwnLFxuICAgICAgQUNUSVZFOiAnYWN0aXZlJyxcbiAgICAgIFNMSURFOiAnc2xpZGUnLFxuICAgICAgUklHSFQ6ICdjYXJvdXNlbC1pdGVtLXJpZ2h0JyxcbiAgICAgIExFRlQ6ICdjYXJvdXNlbC1pdGVtLWxlZnQnLFxuICAgICAgTkVYVDogJ2Nhcm91c2VsLWl0ZW0tbmV4dCcsXG4gICAgICBQUkVWOiAnY2Fyb3VzZWwtaXRlbS1wcmV2JyxcbiAgICAgIElURU06ICdjYXJvdXNlbC1pdGVtJ1xuICAgIH07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgQUNUSVZFOiAnLmFjdGl2ZScsXG4gICAgICBBQ1RJVkVfSVRFTTogJy5hY3RpdmUuY2Fyb3VzZWwtaXRlbScsXG4gICAgICBJVEVNOiAnLmNhcm91c2VsLWl0ZW0nLFxuICAgICAgTkVYVF9QUkVWOiAnLmNhcm91c2VsLWl0ZW0tbmV4dCwgLmNhcm91c2VsLWl0ZW0tcHJldicsXG4gICAgICBJTkRJQ0FUT1JTOiAnLmNhcm91c2VsLWluZGljYXRvcnMnLFxuICAgICAgREFUQV9TTElERTogJ1tkYXRhLXNsaWRlXSwgW2RhdGEtc2xpZGUtdG9dJyxcbiAgICAgIERBVEFfUklERTogJ1tkYXRhLXJpZGU9XCJjYXJvdXNlbFwiXSdcbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgfTtcblxuICAgIHZhciBDYXJvdXNlbCA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIENhcm91c2VsKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvdWNoVGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gJCQkMShlbGVtZW50KVswXTtcbiAgICAgICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuSU5ESUNBVE9SUyk7XG5cbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBDYXJvdXNlbC5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLm5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAgIHRoaXMuX3NsaWRlKERpcmVjdGlvbi5ORVhUKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLm5leHRXaGVuVmlzaWJsZSA9IGZ1bmN0aW9uIG5leHRXaGVuVmlzaWJsZSgpIHtcbiAgICAgICAgLy8gRG9uJ3QgY2FsbCBuZXh0IHdoZW4gdGhlIHBhZ2UgaXNuJ3QgdmlzaWJsZVxuICAgICAgICAvLyBvciB0aGUgY2Fyb3VzZWwgb3IgaXRzIHBhcmVudCBpc24ndCB2aXNpYmxlXG4gICAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuICYmICQkJDEodGhpcy5fZWxlbWVudCkuaXMoJzp2aXNpYmxlJykgJiYgJCQkMSh0aGlzLl9lbGVtZW50KS5jc3MoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnByZXYgPSBmdW5jdGlvbiBwcmV2KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAgIHRoaXMuX3NsaWRlKERpcmVjdGlvbi5QUkVWKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnBhdXNlID0gZnVuY3Rpb24gcGF1c2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuTkVYVF9QUkVWKSkge1xuICAgICAgICAgIFV0aWwudHJpZ2dlclRyYW5zaXRpb25FbmQodGhpcy5fZWxlbWVudCk7XG4gICAgICAgICAgdGhpcy5jeWNsZSh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uY3ljbGUgPSBmdW5jdGlvbiBjeWNsZShldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuaW50ZXJ2YWwgJiYgIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID8gdGhpcy5uZXh0V2hlblZpc2libGUgOiB0aGlzLm5leHQpLmJpbmQodGhpcyksIHRoaXMuX2NvbmZpZy5pbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by50byA9IGZ1bmN0aW9uIHRvKGluZGV4KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkVfSVRFTSk7XG5cbiAgICAgICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHRoaXMuX2FjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEgfHwgaW5kZXggPCAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub25lKEV2ZW50LlNMSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50byhpbmRleCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICB0aGlzLmN5Y2xlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGluZGV4ID4gYWN0aXZlSW5kZXggPyBEaXJlY3Rpb24uTkVYVCA6IERpcmVjdGlvbi5QUkVWO1xuXG4gICAgICAgIHRoaXMuX3NsaWRlKGRpcmVjdGlvbiwgdGhpcy5faXRlbXNbaW5kZXhdKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKTtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWcgPSBudWxsO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCA9IG51bGw7XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9nZXRDb25maWcgPSBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBEZWZhdWx0LCBjb25maWcpO1xuICAgICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LktFWURPV04sIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5fa2V5ZG93bihldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5NT1VTRUVOVEVSLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczIucGF1c2UoZXZlbnQpO1xuICAgICAgICAgIH0pLm9uKEV2ZW50Lk1PVVNFTEVBVkUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5jeWNsZShldmVudCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2UsIG1vdXNlZW50ZXIvbGVhdmUgYXJlIGZpcmVkIGFzXG4gICAgICAgICAgICAvLyBwYXJ0IG9mIHRoZSBtb3VzZSBjb21wYXRpYmlsaXR5IGV2ZW50cyBvbiBmaXJzdCB0YXAgLSB0aGUgY2Fyb3VzZWxcbiAgICAgICAgICAgIC8vIHdvdWxkIHN0b3AgY3ljbGluZyB1bnRpbCB1c2VyIHRhcHBlZCBvdXQgb2YgaXQ7XG4gICAgICAgICAgICAvLyBoZXJlLCB3ZSBsaXN0ZW4gZm9yIHRvdWNoZW5kLCBleHBsaWNpdGx5IHBhdXNlIHRoZSBjYXJvdXNlbFxuICAgICAgICAgICAgLy8gKGFzIGlmIGl0J3MgdGhlIHNlY29uZCB0aW1lIHdlIHRhcCBvbiBpdCwgbW91c2VlbnRlciBjb21wYXQgZXZlbnRcbiAgICAgICAgICAgIC8vIGlzIE5PVCBmaXJlZCkgYW5kIGFmdGVyIGEgdGltZW91dCAodG8gYWxsb3cgZm9yIG1vdXNlIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIC8vIGV2ZW50cyB0byBmaXJlKSB3ZSBleHBsaWNpdGx5IHJlc3RhcnQgY3ljbGluZ1xuICAgICAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5UT1VDSEVORCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBfdGhpczIucGF1c2UoKTtcblxuICAgICAgICAgICAgICBpZiAoX3RoaXMyLnRvdWNoVGltZW91dCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpczIudG91Y2hUaW1lb3V0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF90aGlzMi50b3VjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuY3ljbGUoZXZlbnQpO1xuICAgICAgICAgICAgICB9LCBUT1VDSEVWRU5UX0NPTVBBVF9XQUlUICsgX3RoaXMyLl9jb25maWcuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2tleWRvd24gPSBmdW5jdGlvbiBfa2V5ZG93bihldmVudCkge1xuICAgICAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgY2FzZSBBUlJPV19MRUZUX0tFWUNPREU6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgQVJST1dfUklHSFRfS0VZQ09ERTpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRJdGVtSW5kZXggPSBmdW5jdGlvbiBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZSA/IFtdLnNsaWNlLmNhbGwoZWxlbWVudC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuSVRFTSkpIDogW107XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5pbmRleE9mKGVsZW1lbnQpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRJdGVtQnlEaXJlY3Rpb24gPSBmdW5jdGlvbiBfZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudCkge1xuICAgICAgICB2YXIgaXNOZXh0RGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVDtcbiAgICAgICAgdmFyIGlzUHJldkRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVY7XG5cbiAgICAgICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KGFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHZhciBsYXN0SXRlbUluZGV4ID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGlzR29pbmdUb1dyYXAgPSBpc1ByZXZEaXJlY3Rpb24gJiYgYWN0aXZlSW5kZXggPT09IDAgfHwgaXNOZXh0RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSBsYXN0SXRlbUluZGV4O1xuXG4gICAgICAgIGlmIChpc0dvaW5nVG9XcmFwICYmICF0aGlzLl9jb25maWcud3JhcCkge1xuICAgICAgICAgIHJldHVybiBhY3RpdmVFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFViA/IC0xIDogMTtcbiAgICAgICAgdmFyIGl0ZW1JbmRleCA9IChhY3RpdmVJbmRleCArIGRlbHRhKSAlIHRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGl0ZW1JbmRleCA9PT0gLTEgPyB0aGlzLl9pdGVtc1t0aGlzLl9pdGVtcy5sZW5ndGggLSAxXSA6IHRoaXMuX2l0ZW1zW2l0ZW1JbmRleF07XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3RyaWdnZXJTbGlkZUV2ZW50ID0gZnVuY3Rpb24gX3RyaWdnZXJTbGlkZUV2ZW50KHJlbGF0ZWRUYXJnZXQsIGV2ZW50RGlyZWN0aW9uTmFtZSkge1xuICAgICAgICB2YXIgdGFyZ2V0SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgocmVsYXRlZFRhcmdldCk7XG5cbiAgICAgICAgdmFyIGZyb21JbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleCh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFX0lURU0pKTtcblxuICAgICAgICB2YXIgc2xpZGVFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuU0xJREUsIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0LFxuICAgICAgICAgIGRpcmVjdGlvbjogZXZlbnREaXJlY3Rpb25OYW1lLFxuICAgICAgICAgIGZyb206IGZyb21JbmRleCxcbiAgICAgICAgICB0bzogdGFyZ2V0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzbGlkZUV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHNsaWRlRXZlbnQ7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQgPSBmdW5jdGlvbiBfc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCkge1xuICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gW10uc2xpY2UuY2FsbCh0aGlzLl9pbmRpY2F0b3JzRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkFDVElWRSkpO1xuICAgICAgICAgICQkJDEoaW5kaWNhdG9ycykucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG5cbiAgICAgICAgICB2YXIgbmV4dEluZGljYXRvciA9IHRoaXMuX2luZGljYXRvcnNFbGVtZW50LmNoaWxkcmVuW3RoaXMuX2dldEl0ZW1JbmRleChlbGVtZW50KV07XG5cbiAgICAgICAgICBpZiAobmV4dEluZGljYXRvcikge1xuICAgICAgICAgICAgJCQkMShuZXh0SW5kaWNhdG9yKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fc2xpZGUgPSBmdW5jdGlvbiBfc2xpZGUoZGlyZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkFDVElWRV9JVEVNKTtcblxuICAgICAgICB2YXIgYWN0aXZlRWxlbWVudEluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KGFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHZhciBuZXh0RWxlbWVudCA9IGVsZW1lbnQgfHwgYWN0aXZlRWxlbWVudCAmJiB0aGlzLl9nZXRJdGVtQnlEaXJlY3Rpb24oZGlyZWN0aW9uLCBhY3RpdmVFbGVtZW50KTtcblxuICAgICAgICB2YXIgbmV4dEVsZW1lbnRJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChuZXh0RWxlbWVudCk7XG5cbiAgICAgICAgdmFyIGlzQ3ljbGluZyA9IEJvb2xlYW4odGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB2YXIgZGlyZWN0aW9uYWxDbGFzc05hbWU7XG4gICAgICAgIHZhciBvcmRlckNsYXNzTmFtZTtcbiAgICAgICAgdmFyIGV2ZW50RGlyZWN0aW9uTmFtZTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICAgIGRpcmVjdGlvbmFsQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLkxFRlQ7XG4gICAgICAgICAgb3JkZXJDbGFzc05hbWUgPSBDbGFzc05hbWUuTkVYVDtcbiAgICAgICAgICBldmVudERpcmVjdGlvbk5hbWUgPSBEaXJlY3Rpb24uTEVGVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IENsYXNzTmFtZS5SSUdIVDtcbiAgICAgICAgICBvcmRlckNsYXNzTmFtZSA9IENsYXNzTmFtZS5QUkVWO1xuICAgICAgICAgIGV2ZW50RGlyZWN0aW9uTmFtZSA9IERpcmVjdGlvbi5SSUdIVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0RWxlbWVudCAmJiAkJCQxKG5leHRFbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzbGlkZUV2ZW50ID0gdGhpcy5fdHJpZ2dlclNsaWRlRXZlbnQobmV4dEVsZW1lbnQsIGV2ZW50RGlyZWN0aW9uTmFtZSk7XG5cbiAgICAgICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFjdGl2ZUVsZW1lbnQgfHwgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgLy8gU29tZSB3ZWlyZG5lc3MgaXMgaGFwcGVuaW5nLCBzbyB3ZSBiYWlsXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAoaXNDeWNsaW5nKSB7XG4gICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChuZXh0RWxlbWVudCk7XG5cbiAgICAgICAgdmFyIHNsaWRFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuU0xJRCwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IG5leHRFbGVtZW50LFxuICAgICAgICAgIGRpcmVjdGlvbjogZXZlbnREaXJlY3Rpb25OYW1lLFxuICAgICAgICAgIGZyb206IGFjdGl2ZUVsZW1lbnRJbmRleCxcbiAgICAgICAgICB0bzogbmV4dEVsZW1lbnRJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0xJREUpKSB7XG4gICAgICAgICAgJCQkMShuZXh0RWxlbWVudCkuYWRkQ2xhc3Mob3JkZXJDbGFzc05hbWUpO1xuICAgICAgICAgIFV0aWwucmVmbG93KG5leHRFbGVtZW50KTtcbiAgICAgICAgICAkJCQxKGFjdGl2ZUVsZW1lbnQpLmFkZENsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKTtcbiAgICAgICAgICAkJCQxKG5leHRFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSk7XG4gICAgICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQoYWN0aXZlRWxlbWVudCk7XG4gICAgICAgICAgJCQkMShhY3RpdmVFbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCQkMShuZXh0RWxlbWVudCkucmVtb3ZlQ2xhc3MoZGlyZWN0aW9uYWxDbGFzc05hbWUgKyBcIiBcIiArIG9yZGVyQ2xhc3NOYW1lKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICQkJDEoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSArIFwiIFwiICsgb3JkZXJDbGFzc05hbWUgKyBcIiBcIiArIGRpcmVjdGlvbmFsQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgIF90aGlzMy5faXNTbGlkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICQkJDEoX3RoaXMzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9KS5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQkJDEoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgJCQkMShuZXh0RWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2U7XG4gICAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNDeWNsaW5nKSB7XG4gICAgICAgICAgdGhpcy5jeWNsZSgpO1xuICAgICAgICB9XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlID0gZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSAkJCQxKHRoaXMpLmRhdGEoREFUQV9LRVkpO1xuXG4gICAgICAgICAgdmFyIF9jb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBEZWZhdWx0LCAkJCQxKHRoaXMpLmRhdGEoKSk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIF9jb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBfY29uZmlnLCBjb25maWcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBhY3Rpb24gPSB0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJyA/IGNvbmZpZyA6IF9jb25maWcuc2xpZGU7XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgQ2Fyb3VzZWwodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgICAkJCQxKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZGF0YS50byhjb25maWcpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVthY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGFjdGlvbiArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVthY3Rpb25dKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChfY29uZmlnLmludGVydmFsKSB7XG4gICAgICAgICAgICBkYXRhLnBhdXNlKCk7XG4gICAgICAgICAgICBkYXRhLmN5Y2xlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIENhcm91c2VsLl9kYXRhQXBpQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gX2RhdGFBcGlDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpO1xuXG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGFyZ2V0ID0gJCQkMShzZWxlY3RvcilbMF07XG5cbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgISQkJDEodGFyZ2V0KS5oYXNDbGFzcyhDbGFzc05hbWUuQ0FST1VTRUwpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sICQkJDEodGFyZ2V0KS5kYXRhKCksICQkJDEodGhpcykuZGF0YSgpKTtcblxuICAgICAgICB2YXIgc2xpZGVJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlLXRvJyk7XG5cbiAgICAgICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgICBjb25maWcuaW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkJCQxKHRhcmdldCksIGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAkJCQxKHRhcmdldCkuZGF0YShEQVRBX0tFWSkudG8oc2xpZGVJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfTtcblxuICAgICAgX2NyZWF0ZUNsYXNzKENhcm91c2VsLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gQ2Fyb3VzZWw7XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgICQkJDEoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1NMSURFLCBDYXJvdXNlbC5fZGF0YUFwaUNsaWNrSGFuZGxlcik7XG4gICAgJCQkMSh3aW5kb3cpLm9uKEV2ZW50LkxPQURfREFUQV9BUEksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjYXJvdXNlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuREFUQV9SSURFKSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYXJvdXNlbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyICRjYXJvdXNlbCA9ICQkJDEoY2Fyb3VzZWxzW2ldKTtcblxuICAgICAgICBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJGNhcm91c2VsLCAkY2Fyb3VzZWwuZGF0YSgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQkJDEuZm5bTkFNRV0gPSBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQkJDEuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDYXJvdXNlbDtcblxuICAgICQkJDEuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQkJDEuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENhcm91c2VsO1xuICB9KCQpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IGNvbGxhcHNlLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBDb2xsYXBzZSA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAnY29sbGFwc2UnO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMS4zJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMuY29sbGFwc2UnO1xuICAgIHZhciBFVkVOVF9LRVkgPSBcIi5cIiArIERBVEFfS0VZO1xuICAgIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJCQkMS5mbltOQU1FXTtcbiAgICB2YXIgRGVmYXVsdCA9IHtcbiAgICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICAgIHBhcmVudDogJydcbiAgICB9O1xuICAgIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICAgIHRvZ2dsZTogJ2Jvb2xlYW4nLFxuICAgICAgcGFyZW50OiAnKHN0cmluZ3xlbGVtZW50KSdcbiAgICB9O1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIFNIT1c6IFwic2hvd1wiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPV046IFwic2hvd25cIiArIEVWRU5UX0tFWSxcbiAgICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiBcImhpZGRlblwiICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0tfREFUQV9BUEk6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIFNIT1c6ICdzaG93JyxcbiAgICAgIENPTExBUFNFOiAnY29sbGFwc2UnLFxuICAgICAgQ09MTEFQU0lORzogJ2NvbGxhcHNpbmcnLFxuICAgICAgQ09MTEFQU0VEOiAnY29sbGFwc2VkJ1xuICAgIH07XG4gICAgdmFyIERpbWVuc2lvbiA9IHtcbiAgICAgIFdJRFRIOiAnd2lkdGgnLFxuICAgICAgSEVJR0hUOiAnaGVpZ2h0J1xuICAgIH07XG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgQUNUSVZFUzogJy5zaG93LCAuY29sbGFwc2luZycsXG4gICAgICBEQVRBX1RPR0dMRTogJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJ1xuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIENvbGxhcHNlID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gQ29sbGFwc2UoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJBcnJheSA9ICQkJDEubWFrZUFycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIl1baHJlZj1cXFwiI1wiICsgZWxlbWVudC5pZCArIFwiXFxcIl0sXCIgKyAoXCJbZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIl1bZGF0YS10YXJnZXQ9XFxcIiNcIiArIGVsZW1lbnQuaWQgKyBcIlxcXCJdXCIpKSk7XG4gICAgICAgIHZhciB0b2dnbGVMaXN0ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRvZ2dsZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlbSA9IHRvZ2dsZUxpc3RbaV07XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pO1xuICAgICAgICAgIHZhciBmaWx0ZXJFbGVtZW50ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuZmlsdGVyKGZ1bmN0aW9uIChmb3VuZEVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZEVsZW0gPT09IGVsZW1lbnQ7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoc2VsZWN0b3IgIT09IG51bGwgJiYgZmlsdGVyRWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQXJyYXkucHVzaChlbGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50ID8gdGhpcy5fZ2V0UGFyZW50KCkgOiBudWxsO1xuXG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnLnBhcmVudCkge1xuICAgICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLl9lbGVtZW50LCB0aGlzLl90cmlnZ2VyQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy50b2dnbGUpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gQ29sbGFwc2UucHJvdG90eXBlO1xuXG4gICAgICAvLyBQdWJsaWNcbiAgICAgIF9wcm90by50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgIGlmICgkJCQxKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uc2hvdyA9IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCAkJCQxKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3RpdmVzO1xuICAgICAgICB2YXIgYWN0aXZlc0RhdGE7XG5cbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgIGFjdGl2ZXMgPSBbXS5zbGljZS5jYWxsKHRoaXMuX3BhcmVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkFDVElWRVMpKS5maWx0ZXIoZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnKSA9PT0gX3RoaXMuX2NvbmZpZy5wYXJlbnQ7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoYWN0aXZlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFjdGl2ZXMgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3RpdmVzKSB7XG4gICAgICAgICAgYWN0aXZlc0RhdGEgPSAkJCQxKGFjdGl2ZXMpLm5vdCh0aGlzLl9zZWxlY3RvcikuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydEV2ZW50ID0gJCQkMS5FdmVudChFdmVudC5TSE9XKTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpO1xuXG4gICAgICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGl2ZXMpIHtcbiAgICAgICAgICBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCQkMShhY3RpdmVzKS5ub3QodGhpcy5fc2VsZWN0b3IpLCAnaGlkZScpO1xuXG4gICAgICAgICAgaWYgKCFhY3RpdmVzRGF0YSkge1xuICAgICAgICAgICAgJCQkMShhY3RpdmVzKS5kYXRhKERBVEFfS0VZLCBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKCk7XG5cbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gMDtcblxuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICQkJDEodGhpcy5fdHJpZ2dlckFycmF5KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSk7XG5cbiAgICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgJCQkMShfdGhpcy5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuICAgICAgICAgIF90aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJztcblxuICAgICAgICAgIF90aGlzLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpO1xuXG4gICAgICAgICAgJCQkMShfdGhpcy5fZWxlbWVudCkudHJpZ2dlcihFdmVudC5TSE9XTik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNhcGl0YWxpemVkRGltZW5zaW9uID0gZGltZW5zaW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoMSk7XG4gICAgICAgIHZhciBzY3JvbGxTaXplID0gXCJzY3JvbGxcIiArIGNhcGl0YWxpemVkRGltZW5zaW9uO1xuICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IHRoaXMuX2VsZW1lbnRbc2Nyb2xsU2l6ZV0gKyBcInB4XCI7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uaGlkZSA9IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHwgISQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0RXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LkhJREUpO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc3RhcnRFdmVudCk7XG5cbiAgICAgICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gdGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaW1lbnNpb25dICsgXCJweFwiO1xuICAgICAgICBVdGlsLnJlZmxvdyh0aGlzLl9lbGVtZW50KTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORykucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG4gICAgICAgIHZhciB0cmlnZ2VyQXJyYXlMZW5ndGggPSB0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0cmlnZ2VyQXJyYXlMZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmlnZ2VyQXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRyaWdnZXIgPSB0aGlzLl90cmlnZ2VyQXJyYXlbaV07XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodHJpZ2dlcik7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB2YXIgJGVsZW0gPSAkJCQxKFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpKTtcblxuICAgICAgICAgICAgICBpZiAoISRlbGVtLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgICAgICAgICQkJDEodHJpZ2dlcikuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCkuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyh0cnVlKTtcblxuICAgICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICBfdGhpczIuc2V0VHJhbnNpdGlvbmluZyhmYWxzZSk7XG5cbiAgICAgICAgICAkJCQxKF90aGlzMi5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSkudHJpZ2dlcihFdmVudC5ISURERU4pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnO1xuICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uc2V0VHJhbnNpdGlvbmluZyA9IGZ1bmN0aW9uIHNldFRyYW5zaXRpb25pbmcoaXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGlzVHJhbnNpdGlvbmluZztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJBcnJheSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IG51bGw7XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9nZXRDb25maWcgPSBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBEZWZhdWx0LCBjb25maWcpO1xuICAgICAgICBjb25maWcudG9nZ2xlID0gQm9vbGVhbihjb25maWcudG9nZ2xlKTsgLy8gQ29lcmNlIHN0cmluZyB2YWx1ZXNcblxuICAgICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0RGltZW5zaW9uID0gZnVuY3Rpb24gX2dldERpbWVuc2lvbigpIHtcbiAgICAgICAgdmFyIGhhc1dpZHRoID0gJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhEaW1lbnNpb24uV0lEVEgpO1xuICAgICAgICByZXR1cm4gaGFzV2lkdGggPyBEaW1lbnNpb24uV0lEVEggOiBEaW1lbnNpb24uSEVJR0hUO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRQYXJlbnQgPSBmdW5jdGlvbiBfZ2V0UGFyZW50KCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgcGFyZW50ID0gbnVsbDtcblxuICAgICAgICBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5fY29uZmlnLnBhcmVudCkpIHtcbiAgICAgICAgICBwYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50OyAvLyBJdCdzIGEgalF1ZXJ5IG9iamVjdFxuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jb25maWcucGFyZW50LmpxdWVyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnRbMF07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fY29uZmlnLnBhcmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZWN0b3IgPSBcIltkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiXVtkYXRhLXBhcmVudD1cXFwiXCIgKyB0aGlzLl9jb25maWcucGFyZW50ICsgXCJcXFwiXVwiO1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAgICQkJDEoY2hpbGRyZW4pLmVhY2goZnVuY3Rpb24gKGksIGVsZW1lbnQpIHtcbiAgICAgICAgICBfdGhpczMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhDb2xsYXBzZS5fZ2V0VGFyZ2V0RnJvbUVsZW1lbnQoZWxlbWVudCksIFtlbGVtZW50XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MgPSBmdW5jdGlvbiBfYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKGVsZW1lbnQsIHRyaWdnZXJBcnJheSkge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgIHZhciBpc09wZW4gPSAkJCQxKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICAgIGlmICh0cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAkJCQxKHRyaWdnZXJBcnJheSkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCwgIWlzT3BlbikuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3Blbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBDb2xsYXBzZS5fZ2V0VGFyZ2V0RnJvbUVsZW1lbnQgPSBmdW5jdGlvbiBfZ2V0VGFyZ2V0RnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBzZWxlY3RvciA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UgPSBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSAkJCQxKHRoaXMpO1xuICAgICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICB2YXIgX2NvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIERlZmF1bHQsICR0aGlzLmRhdGEoKSwgdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge30pO1xuXG4gICAgICAgICAgaWYgKCFkYXRhICYmIF9jb25maWcudG9nZ2xlICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgICAgX2NvbmZpZy50b2dnbGUgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgICAkdGhpcy5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGNvbmZpZyArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9jcmVhdGVDbGFzcyhDb2xsYXBzZSwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcIlZFUlNJT05cIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkRlZmF1bHRcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIENvbGxhcHNlO1xuICAgIH0oKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgLy8gcHJldmVudERlZmF1bHQgb25seSBmb3IgPGE+IGVsZW1lbnRzICh3aGljaCBjaGFuZ2UgdGhlIFVSTCkgbm90IGluc2lkZSB0aGUgY29sbGFwc2libGUgZWxlbWVudFxuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkdHJpZ2dlciA9ICQkJDEodGhpcyk7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcyk7XG4gICAgICB2YXIgc2VsZWN0b3JzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAkJCQxKHNlbGVjdG9ycykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJCQkMSh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGEgPSAkdGFyZ2V0LmRhdGEoREFUQV9LRVkpO1xuICAgICAgICB2YXIgY29uZmlnID0gZGF0YSA/ICd0b2dnbGUnIDogJHRyaWdnZXIuZGF0YSgpO1xuXG4gICAgICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkdGFyZ2V0LCBjb25maWcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkJCQxLmZuW05BTUVdID0gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQ29sbGFwc2U7XG5cbiAgICAkJCQxLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkJCQxLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBDb2xsYXBzZTtcbiAgfSgkKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4xLjMpOiBkcm9wZG93bi5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoJCQkMSkge1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuICAgIHZhciBOQU1FID0gJ2Ryb3Bkb3duJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjEuMyc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIEVTQ0FQRV9LRVlDT0RFID0gMjc7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIEVzY2FwZSAoRXNjKSBrZXlcblxuICAgIHZhciBTUEFDRV9LRVlDT0RFID0gMzI7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHNwYWNlIGtleVxuXG4gICAgdmFyIFRBQl9LRVlDT0RFID0gOTsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdGFiIGtleVxuXG4gICAgdmFyIEFSUk9XX1VQX0tFWUNPREUgPSAzODsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdXAgYXJyb3cga2V5XG5cbiAgICB2YXIgQVJST1dfRE9XTl9LRVlDT0RFID0gNDA7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIGRvd24gYXJyb3cga2V5XG5cbiAgICB2YXIgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMzsgLy8gTW91c2VFdmVudC53aGljaCB2YWx1ZSBmb3IgdGhlIHJpZ2h0IGJ1dHRvbiAoYXNzdW1pbmcgYSByaWdodC1oYW5kZWQgbW91c2UpXG5cbiAgICB2YXIgUkVHRVhQX0tFWURPV04gPSBuZXcgUmVnRXhwKEFSUk9XX1VQX0tFWUNPREUgKyBcInxcIiArIEFSUk9XX0RPV05fS0VZQ09ERSArIFwifFwiICsgRVNDQVBFX0tFWUNPREUpO1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiBcImhpZGRlblwiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0s6IFwiY2xpY2tcIiArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLX0RBVEFfQVBJOiBcImNsaWNrXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVksXG4gICAgICBLRVlET1dOX0RBVEFfQVBJOiBcImtleWRvd25cIiArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICAgIEtFWVVQX0RBVEFfQVBJOiBcImtleXVwXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgICB9O1xuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBESVNBQkxFRDogJ2Rpc2FibGVkJyxcbiAgICAgIFNIT1c6ICdzaG93JyxcbiAgICAgIERST1BVUDogJ2Ryb3B1cCcsXG4gICAgICBEUk9QUklHSFQ6ICdkcm9wcmlnaHQnLFxuICAgICAgRFJPUExFRlQ6ICdkcm9wbGVmdCcsXG4gICAgICBNRU5VUklHSFQ6ICdkcm9wZG93bi1tZW51LXJpZ2h0JyxcbiAgICAgIE1FTlVMRUZUOiAnZHJvcGRvd24tbWVudS1sZWZ0JyxcbiAgICAgIFBPU0lUSU9OX1NUQVRJQzogJ3Bvc2l0aW9uLXN0YXRpYydcbiAgICB9O1xuICAgIHZhciBTZWxlY3RvciA9IHtcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nLFxuICAgICAgRk9STV9DSElMRDogJy5kcm9wZG93biBmb3JtJyxcbiAgICAgIE1FTlU6ICcuZHJvcGRvd24tbWVudScsXG4gICAgICBOQVZCQVJfTkFWOiAnLm5hdmJhci1uYXYnLFxuICAgICAgVklTSUJMRV9JVEVNUzogJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJ1xuICAgIH07XG4gICAgdmFyIEF0dGFjaG1lbnRNYXAgPSB7XG4gICAgICBUT1A6ICd0b3Atc3RhcnQnLFxuICAgICAgVE9QRU5EOiAndG9wLWVuZCcsXG4gICAgICBCT1RUT006ICdib3R0b20tc3RhcnQnLFxuICAgICAgQk9UVE9NRU5EOiAnYm90dG9tLWVuZCcsXG4gICAgICBSSUdIVDogJ3JpZ2h0LXN0YXJ0JyxcbiAgICAgIFJJR0hURU5EOiAncmlnaHQtZW5kJyxcbiAgICAgIExFRlQ6ICdsZWZ0LXN0YXJ0JyxcbiAgICAgIExFRlRFTkQ6ICdsZWZ0LWVuZCdcbiAgICB9O1xuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgb2Zmc2V0OiAwLFxuICAgICAgZmxpcDogdHJ1ZSxcbiAgICAgIGJvdW5kYXJ5OiAnc2Nyb2xsUGFyZW50JyxcbiAgICAgIHJlZmVyZW5jZTogJ3RvZ2dsZScsXG4gICAgICBkaXNwbGF5OiAnZHluYW1pYydcbiAgICB9O1xuICAgIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICAgIG9mZnNldDogJyhudW1iZXJ8c3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgICBmbGlwOiAnYm9vbGVhbicsXG4gICAgICBib3VuZGFyeTogJyhzdHJpbmd8ZWxlbWVudCknLFxuICAgICAgcmVmZXJlbmNlOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gICAgICBkaXNwbGF5OiAnc3RyaW5nJ1xuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICB9O1xuXG4gICAgdmFyIERyb3Bkb3duID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gRHJvcGRvd24oZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fbWVudSA9IHRoaXMuX2dldE1lbnVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKCk7XG5cbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBEcm9wZG93bi5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQuZGlzYWJsZWQgfHwgJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgICB2YXIgaXNBY3RpdmUgPSAkJCQxKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICBEcm9wZG93bi5fY2xlYXJNZW51cygpO1xuXG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNob3dFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuU0hPVywgcmVsYXRlZFRhcmdldCk7XG4gICAgICAgICQkJDEocGFyZW50KS50cmlnZ2VyKHNob3dFdmVudCk7XG5cbiAgICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBEaXNhYmxlIHRvdGFsbHkgUG9wcGVyLmpzIGZvciBEcm9wZG93biBpbiBOYXZiYXJcblxuXG4gICAgICAgIGlmICghdGhpcy5faW5OYXZiYXIpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDaGVjayBmb3IgUG9wcGVyIGRlcGVuZGVuY3lcbiAgICAgICAgICAgKiBQb3BwZXIgLSBodHRwczovL3BvcHBlci5qcy5vcmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcCBkcm9wZG93biByZXF1aXJlIFBvcHBlci5qcyAoaHR0cHM6Ly9wb3BwZXIuanMub3JnKScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcblxuICAgICAgICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHBhcmVudDtcbiAgICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpKSB7XG4gICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fY29uZmlnLnJlZmVyZW5jZTsgLy8gQ2hlY2sgaWYgaXQncyBqUXVlcnkgZWxlbWVudFxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fY29uZmlnLnJlZmVyZW5jZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IC8vIElmIGJvdW5kYXJ5IGlzIG5vdCBgc2Nyb2xsUGFyZW50YCwgdGhlbiBzZXQgcG9zaXRpb24gdG8gYHN0YXRpY2BcbiAgICAgICAgICAvLyB0byBhbGxvdyB0aGUgbWVudSB0byBcImVzY2FwZVwiIHRoZSBzY3JvbGwgcGFyZW50J3MgYm91bmRhcmllc1xuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjQyNTFcblxuXG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5ib3VuZGFyeSAhPT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICAgICAgICAgICQkJDEocGFyZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuUE9TSVRJT05fU1RBVElDKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9wb3BwZXIgPSBuZXcgUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHRoaXMuX21lbnUsIHRoaXMuX2dldFBvcHBlckNvbmZpZygpKTtcbiAgICAgICAgfSAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgdG8gdGhlIGJvZHkncyBpbW1lZGlhdGUgY2hpbGRyZW47XG4gICAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuXG5cbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAkJCQxKHBhcmVudCkuY2xvc2VzdChTZWxlY3Rvci5OQVZCQVJfTkFWKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQkJDEubm9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgICAkJCQxKHRoaXMuX21lbnUpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgJCQkMShwYXJlbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKS50cmlnZ2VyKCQkJDEuRXZlbnQoRXZlbnQuU0hPV04sIHJlbGF0ZWRUYXJnZXQpKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX21lbnUgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKTtcblxuICAgICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fcG9wcGVyLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgICBfcHJvdG8uX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0ssIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCwgJCQkMSh0aGlzLl9lbGVtZW50KS5kYXRhKCksIGNvbmZpZyk7XG4gICAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0VHlwZSk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldE1lbnVFbGVtZW50ID0gZnVuY3Rpb24gX2dldE1lbnVFbGVtZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuX21lbnUpIHtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fbWVudSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLk1FTlUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZW51O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRQbGFjZW1lbnQgPSBmdW5jdGlvbiBfZ2V0UGxhY2VtZW50KCkge1xuICAgICAgICB2YXIgJHBhcmVudERyb3Bkb3duID0gJCQkMSh0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUpO1xuICAgICAgICB2YXIgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5CT1RUT007IC8vIEhhbmRsZSBkcm9wdXBcblxuICAgICAgICBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QVVApKSB7XG4gICAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5UT1A7XG5cbiAgICAgICAgICBpZiAoJCQkMSh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5UT1BFTkQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCRwYXJlbnREcm9wZG93bi5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUFJJR0hUKSkge1xuICAgICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuUklHSFQ7XG4gICAgICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QTEVGVCkpIHtcbiAgICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkxFRlQ7XG4gICAgICAgIH0gZWxzZSBpZiAoJCQkMSh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuQk9UVE9NRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsYWNlbWVudDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZGV0ZWN0TmF2YmFyID0gZnVuY3Rpb24gX2RldGVjdE5hdmJhcigpIHtcbiAgICAgICAgcmV0dXJuICQkJDEodGhpcy5fZWxlbWVudCkuY2xvc2VzdCgnLm5hdmJhcicpLmxlbmd0aCA+IDA7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2dldFBvcHBlckNvbmZpZyA9IGZ1bmN0aW9uIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHZhciBvZmZzZXRDb25mID0ge307XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jb25maWcub2Zmc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb2Zmc2V0Q29uZi5mbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLm9mZnNldHMgPSBfb2JqZWN0U3ByZWFkKHt9LCBkYXRhLm9mZnNldHMsIF90aGlzMi5fY29uZmlnLm9mZnNldChkYXRhLm9mZnNldHMpIHx8IHt9KTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0Q29uZi5vZmZzZXQgPSB0aGlzLl9jb25maWcub2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvcHBlckNvbmZpZyA9IHtcbiAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX2dldFBsYWNlbWVudCgpLFxuICAgICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXRDb25mLFxuICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLl9jb25maWcuZmxpcFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSAvLyBEaXNhYmxlIFBvcHBlci5qcyBpZiB3ZSBoYXZlIGEgc3RhdGljIGRpc3BsYXlcblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuZGlzcGxheSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICBwb3BwZXJDb25maWcubW9kaWZpZXJzLmFwcGx5U3R5bGUgPSB7XG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9wcGVyQ29uZmlnO1xuICAgICAgfTsgLy8gU3RhdGljXG5cblxuICAgICAgRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgPyBjb25maWcgOiBudWxsO1xuXG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGNvbmZpZyArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIERyb3Bkb3duLl9jbGVhck1lbnVzID0gZnVuY3Rpb24gX2NsZWFyTWVudXMoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50ICYmIChldmVudC53aGljaCA9PT0gUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQud2hpY2ggIT09IFRBQl9LRVlDT0RFKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b2dnbGVzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRvZ2dsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRvZ2dsZXNbaV0pO1xuXG4gICAgICAgICAgdmFyIGNvbnRleHQgPSAkJCQxKHRvZ2dsZXNbaV0pLmRhdGEoREFUQV9LRVkpO1xuICAgICAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogdG9nZ2xlc1tpXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgcmVsYXRlZFRhcmdldC5jbGlja0V2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZHJvcGRvd25NZW51ID0gY29udGV4dC5fbWVudTtcblxuICAgICAgICAgIGlmICghJCQkMShwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50ICYmIChldmVudC50eXBlID09PSAnY2xpY2snICYmIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQud2hpY2ggPT09IFRBQl9LRVlDT0RFKSAmJiAkJCQxLmNvbnRhaW5zKHBhcmVudCwgZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGhpZGVFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuSElERSwgcmVsYXRlZFRhcmdldCk7XG4gICAgICAgICAgJCQkMShwYXJlbnQpLnRyaWdnZXIoaGlkZUV2ZW50KTtcblxuICAgICAgICAgIGlmIChoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHdlIGFkZGVkIGZvciBpT1Mgc3VwcG9ydFxuXG5cbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub2ZmKCdtb3VzZW92ZXInLCBudWxsLCAkJCQxLm5vb3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRvZ2dsZXNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgJCQkMShkcm9wZG93bk1lbnUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKTtcbiAgICAgICAgICAkJCQxKHBhcmVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpLnRyaWdnZXIoJCQkMS5FdmVudChFdmVudC5ISURERU4sIHJlbGF0ZWRUYXJnZXQpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50ID0gZnVuY3Rpb24gX2dldFBhcmVudEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHBhcmVudDtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudCB8fCBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuXG5cbiAgICAgIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbiBfZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIElmIG5vdCBpbnB1dC90ZXh0YXJlYTpcbiAgICAgICAgLy8gIC0gQW5kIG5vdCBhIGtleSBpbiBSRUdFWFBfS0VZRE9XTiA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgICAgIC8vIElmIGlucHV0L3RleHRhcmVhOlxuICAgICAgICAvLyAgLSBJZiBzcGFjZSBrZXkgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgICAvLyAgLSBJZiBrZXkgaXMgb3RoZXIgdGhhbiBlc2NhcGVcbiAgICAgICAgLy8gICAgLSBJZiBrZXkgaXMgbm90IHVwIG9yIGRvd24gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgICAvLyAgICAtIElmIHRyaWdnZXIgaW5zaWRlIHRoZSBtZW51ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAgICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpID8gZXZlbnQud2hpY2ggPT09IFNQQUNFX0tFWUNPREUgfHwgZXZlbnQud2hpY2ggIT09IEVTQ0FQRV9LRVlDT0RFICYmIChldmVudC53aGljaCAhPT0gQVJST1dfRE9XTl9LRVlDT0RFICYmIGV2ZW50LndoaWNoICE9PSBBUlJPV19VUF9LRVlDT0RFIHx8ICQkJDEoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFNlbGVjdG9yLk1FTlUpLmxlbmd0aCkgOiAhUkVHRVhQX0tFWURPV04udGVzdChldmVudC53aGljaCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAkJCQxKHRoaXMpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMpO1xuXG4gICAgICAgIHZhciBpc0FjdGl2ZSA9ICQkJDEocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgaWYgKCFpc0FjdGl2ZSAmJiAoZXZlbnQud2hpY2ggIT09IEVTQ0FQRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoICE9PSBTUEFDRV9LRVlDT0RFKSB8fCBpc0FjdGl2ZSAmJiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFIHx8IGV2ZW50LndoaWNoID09PSBTUEFDRV9LRVlDT0RFKSkge1xuICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgICAgICAgIHZhciB0b2dnbGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5EQVRBX1RPR0dMRSk7XG4gICAgICAgICAgICAkJCQxKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkJCQxKHRoaXMpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZW1zID0gW10uc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5WSVNJQkxFX0lURU1TKSk7XG5cbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEFSUk9XX1VQX0tFWUNPREUgJiYgaW5kZXggPiAwKSB7XG4gICAgICAgICAgLy8gVXBcbiAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gRG93blxuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXNbaW5kZXhdLmZvY3VzKCk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoRHJvcGRvd24sIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0XCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0VHlwZVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIERyb3Bkb3duO1xuICAgIH0oKTtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxKGRvY3VtZW50KS5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcikub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuTUVOVSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcikub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEkgKyBcIiBcIiArIEV2ZW50LktFWVVQX0RBVEFfQVBJLCBEcm9wZG93bi5fY2xlYXJNZW51cykub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZS5jYWxsKCQkJDEodGhpcyksICd0b2dnbGUnKTtcbiAgICB9KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuRk9STV9DSElMRCwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkJCQxLmZuW05BTUVdID0gRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZTtcbiAgICAkJCQxLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gRHJvcGRvd247XG5cbiAgICAkJCQxLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkJCQxLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBEcm9wZG93bjtcbiAgfSgkLCBQb3BwZXIpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IG1vZGFsLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBNb2RhbCA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAnbW9kYWwnO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMS4zJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMubW9kYWwnO1xuICAgIHZhciBFVkVOVF9LRVkgPSBcIi5cIiArIERBVEFfS0VZO1xuICAgIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJCQkMS5mbltOQU1FXTtcbiAgICB2YXIgRVNDQVBFX0tFWUNPREUgPSAyNzsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgRXNjYXBlIChFc2MpIGtleVxuXG4gICAgdmFyIERlZmF1bHQgPSB7XG4gICAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgZm9jdXM6IHRydWUsXG4gICAgICBzaG93OiB0cnVlXG4gICAgfTtcbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICBiYWNrZHJvcDogJyhib29sZWFufHN0cmluZyknLFxuICAgICAga2V5Ym9hcmQ6ICdib29sZWFuJyxcbiAgICAgIGZvY3VzOiAnYm9vbGVhbicsXG4gICAgICBzaG93OiAnYm9vbGVhbidcbiAgICB9O1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiBcImhpZGRlblwiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgRk9DVVNJTjogXCJmb2N1c2luXCIgKyBFVkVOVF9LRVksXG4gICAgICBSRVNJWkU6IFwicmVzaXplXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19ESVNNSVNTOiBcImNsaWNrLmRpc21pc3NcIiArIEVWRU5UX0tFWSxcbiAgICAgIEtFWURPV05fRElTTUlTUzogXCJrZXlkb3duLmRpc21pc3NcIiArIEVWRU5UX0tFWSxcbiAgICAgIE1PVVNFVVBfRElTTUlTUzogXCJtb3VzZXVwLmRpc21pc3NcIiArIEVWRU5UX0tFWSxcbiAgICAgIE1PVVNFRE9XTl9ESVNNSVNTOiBcIm1vdXNlZG93bi5kaXNtaXNzXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogXCJjbGlja1wiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgU0NST0xMQkFSX01FQVNVUkVSOiAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnLFxuICAgICAgQkFDS0RST1A6ICdtb2RhbC1iYWNrZHJvcCcsXG4gICAgICBPUEVOOiAnbW9kYWwtb3BlbicsXG4gICAgICBGQURFOiAnZmFkZScsXG4gICAgICBTSE9XOiAnc2hvdydcbiAgICB9O1xuICAgIHZhciBTZWxlY3RvciA9IHtcbiAgICAgIERJQUxPRzogJy5tb2RhbC1kaWFsb2cnLFxuICAgICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJtb2RhbFwiXScsXG4gICAgICBEQVRBX0RJU01JU1M6ICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLFxuICAgICAgRklYRURfQ09OVEVOVDogJy5maXhlZC10b3AsIC5maXhlZC1ib3R0b20sIC5pcy1maXhlZCwgLnN0aWNreS10b3AnLFxuICAgICAgU1RJQ0tZX0NPTlRFTlQ6ICcuc3RpY2t5LXRvcCdcbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgfTtcblxuICAgIHZhciBNb2RhbCA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIE1vZGFsKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5ESUFMT0cpO1xuICAgICAgICB0aGlzLl9iYWNrZHJvcCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCA9IDA7XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gTW9kYWwucHJvdG90eXBlO1xuXG4gICAgICAvLyBQdWJsaWNcbiAgICAgIF9wcm90by50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUocmVsYXRlZFRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHJlbGF0ZWRUYXJnZXQpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLnNob3cgPSBmdW5jdGlvbiBzaG93KHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8IHRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3dFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuU0hPVywge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgfSk7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1Nob3duIHx8IHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2NoZWNrU2Nyb2xsYmFyKCk7XG5cbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsYmFyKCk7XG5cbiAgICAgICAgdGhpcy5fYWRqdXN0RGlhbG9nKCk7XG5cbiAgICAgICAgJCQkMShkb2N1bWVudC5ib2R5KS5hZGRDbGFzcyhDbGFzc05hbWUuT1BFTik7XG5cbiAgICAgICAgdGhpcy5fc2V0RXNjYXBlRXZlbnQoKTtcblxuICAgICAgICB0aGlzLl9zZXRSZXNpemVFdmVudCgpO1xuXG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0tfRElTTUlTUywgU2VsZWN0b3IuREFUQV9ESVNNSVNTLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuaGlkZShldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkJCQxKHRoaXMuX2RpYWxvZykub24oRXZlbnQuTU9VU0VET1dOX0RJU01JU1MsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkJCQxKF90aGlzLl9lbGVtZW50KS5vbmUoRXZlbnQuTU9VU0VVUF9ESVNNSVNTLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICgkJCQxKGV2ZW50LnRhcmdldCkuaXMoX3RoaXMuX2VsZW1lbnQpKSB7XG4gICAgICAgICAgICAgIF90aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuX3Nob3dFbGVtZW50KHJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5oaWRlID0gZnVuY3Rpb24gaGlkZShldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCAhdGhpcy5faXNTaG93bikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoaWRlRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LkhJREUpO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoaGlkZUV2ZW50KTtcblxuICAgICAgICBpZiAoIXRoaXMuX2lzU2hvd24gfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgICAgICB2YXIgdHJhbnNpdGlvbiA9ICQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpO1xuXG4gICAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldEVzY2FwZUV2ZW50KCk7XG5cbiAgICAgICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKTtcblxuICAgICAgICAkJCQxKGRvY3VtZW50KS5vZmYoRXZlbnQuRk9DVVNJTik7XG4gICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9mZihFdmVudC5DTElDS19ESVNNSVNTKTtcbiAgICAgICAgJCQkMSh0aGlzLl9kaWFsb2cpLm9mZihFdmVudC5NT1VTRURPV05fRElTTUlTUyk7XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcbiAgICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczIuX2hpZGVNb2RhbChldmVudCk7XG4gICAgICAgICAgfSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9oaWRlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAkJCQxLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuICAgICAgICAkJCQxKHdpbmRvdywgZG9jdW1lbnQsIHRoaXMuX2VsZW1lbnQsIHRoaXMuX2JhY2tkcm9wKS5vZmYoRVZFTlRfS0VZKTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gbnVsbDtcbiAgICAgICAgdGhpcy5faXNTaG93biA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzQm9keU92ZXJmbG93aW5nID0gbnVsbDtcbiAgICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Njcm9sbGJhcldpZHRoID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5oYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiBoYW5kbGVVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpO1xuICAgICAgfTsgLy8gUHJpdmF0ZVxuXG5cbiAgICAgIF9wcm90by5fZ2V0Q29uZmlnID0gZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3Nob3dFbGVtZW50ID0gZnVuY3Rpb24gX3Nob3dFbGVtZW50KHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb24gPSAkJCQxKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSB8fCB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgLy8gRG9uJ3QgbW92ZSBtb2RhbCdzIERPTSBwb3NpdGlvblxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc2Nyb2xsVG9wID0gMDtcblxuICAgICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICAgIHRoaXMuX2VuZm9yY2VGb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3duRXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LlNIT1dOLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdHJhbnNpdGlvbkNvbXBsZXRlID0gZnVuY3Rpb24gdHJhbnNpdGlvbkNvbXBsZXRlKCkge1xuICAgICAgICAgIGlmIChfdGhpczMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICAgICAgX3RoaXMzLl9lbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgICAkJCQxKF90aGlzMy5fZWxlbWVudCkudHJpZ2dlcihzaG93bkV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICAgICQkJDEodGhpcy5fZGlhbG9nKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgdHJhbnNpdGlvbkNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYW5zaXRpb25Db21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2VuZm9yY2VGb2N1cyA9IGZ1bmN0aW9uIF9lbmZvcmNlRm9jdXMoKSB7XG4gICAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICAgICQkJDEoZG9jdW1lbnQpLm9mZihFdmVudC5GT0NVU0lOKSAvLyBHdWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgICAgLm9uKEV2ZW50LkZPQ1VTSU4sIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGlmIChkb2N1bWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmIF90aGlzNC5fZWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmICQkJDEoX3RoaXM0Ll9lbGVtZW50KS5oYXMoZXZlbnQudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzNC5fZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3NldEVzY2FwZUV2ZW50ID0gZnVuY3Rpb24gX3NldEVzY2FwZUV2ZW50KCkge1xuICAgICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LktFWURPV05fRElTTUlTUywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgX3RoaXM1LmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgICAgICQkJDEodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LktFWURPV05fRElTTUlTUyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fc2V0UmVzaXplRXZlbnQgPSBmdW5jdGlvbiBfc2V0UmVzaXplRXZlbnQoKSB7XG4gICAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1Nob3duKSB7XG4gICAgICAgICAgJCQkMSh3aW5kb3cpLm9uKEV2ZW50LlJFU0laRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM2LmhhbmRsZVVwZGF0ZShldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCQkMSh3aW5kb3cpLm9mZihFdmVudC5SRVNJWkUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2hpZGVNb2RhbCA9IGZ1bmN0aW9uIF9oaWRlTW9kYWwoKSB7XG4gICAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblxuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9zaG93QmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQkJDEoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pO1xuXG4gICAgICAgICAgX3RoaXM3Ll9yZXNldEFkanVzdG1lbnRzKCk7XG5cbiAgICAgICAgICBfdGhpczcuX3Jlc2V0U2Nyb2xsYmFyKCk7XG5cbiAgICAgICAgICAkJCQxKF90aGlzNy5fZWxlbWVudCkudHJpZ2dlcihFdmVudC5ISURERU4pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fcmVtb3ZlQmFja2Ryb3AgPSBmdW5jdGlvbiBfcmVtb3ZlQmFja2Ryb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgICAgICQkJDEodGhpcy5fYmFja2Ryb3ApLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuX2JhY2tkcm9wID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9zaG93QmFja2Ryb3AgPSBmdW5jdGlvbiBfc2hvd0JhY2tkcm9wKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICAgIHZhciBhbmltYXRlID0gJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkgPyBDbGFzc05hbWUuRkFERSA6ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1Nob3duICYmIHRoaXMuX2NvbmZpZy5iYWNrZHJvcCkge1xuICAgICAgICAgIHRoaXMuX2JhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLkJBQ0tEUk9QO1xuXG4gICAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tkcm9wLmNsYXNzTGlzdC5hZGQoYW5pbWF0ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCQkMSh0aGlzLl9iYWNrZHJvcCkuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG4gICAgICAgICAgJCQkMSh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDS19ESVNNSVNTLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChfdGhpczguX2lnbm9yZUJhY2tkcm9wQ2xpY2spIHtcbiAgICAgICAgICAgICAgX3RoaXM4Ll9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfdGhpczguX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgICAgX3RoaXM4Ll9lbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpczguaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICAgIFV0aWwucmVmbG93KHRoaXMuX2JhY2tkcm9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkJCQxKHRoaXMuX2JhY2tkcm9wKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7XG5cbiAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFhbmltYXRlKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fYmFja2Ryb3ApO1xuICAgICAgICAgICQkJDEodGhpcy5fYmFja2Ryb3ApLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFjaykuZW11bGF0ZVRyYW5zaXRpb25FbmQoYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duICYmIHRoaXMuX2JhY2tkcm9wKSB7XG4gICAgICAgICAgJCQkMSh0aGlzLl9iYWNrZHJvcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpO1xuXG4gICAgICAgICAgdmFyIGNhbGxiYWNrUmVtb3ZlID0gZnVuY3Rpb24gY2FsbGJhY2tSZW1vdmUoKSB7XG4gICAgICAgICAgICBfdGhpczguX3JlbW92ZUJhY2tkcm9wKCk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICAgIHZhciBfYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2JhY2tkcm9wKTtcblxuICAgICAgICAgICAgJCQkMSh0aGlzLl9iYWNrZHJvcCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNhbGxiYWNrUmVtb3ZlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZChfYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFja1JlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIC8vIHRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG4gICAgICAvLyB0b2RvIChmYXQpOiB0aGVzZSBzaG91bGQgcHJvYmFibHkgYmUgcmVmYWN0b3JlZCBvdXQgb2YgbW9kYWwuanNcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgICBfcHJvdG8uX2FkanVzdERpYWxvZyA9IGZ1bmN0aW9uIF9hZGp1c3REaWFsb2coKSB7XG4gICAgICAgIHZhciBpc01vZGFsT3ZlcmZsb3dpbmcgPSB0aGlzLl9lbGVtZW50LnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAmJiBpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gdGhpcy5fc2Nyb2xsYmFyV2lkdGggKyBcInB4XCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgJiYgIWlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gdGhpcy5fc2Nyb2xsYmFyV2lkdGggKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fcmVzZXRBZGp1c3RtZW50cyA9IGZ1bmN0aW9uIF9yZXNldEFkanVzdG1lbnRzKCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gJyc7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJyc7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2NoZWNrU2Nyb2xsYmFyID0gZnVuY3Rpb24gX2NoZWNrU2Nyb2xsYmFyKCkge1xuICAgICAgICB2YXIgcmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuX2lzQm9keU92ZXJmbG93aW5nID0gcmVjdC5sZWZ0ICsgcmVjdC5yaWdodCA8IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCA9IHRoaXMuX2dldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3NldFNjcm9sbGJhciA9IGZ1bmN0aW9uIF9zZXRTY3JvbGxiYXIoKSB7XG4gICAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc0JvZHlPdmVyZmxvd2luZykge1xuICAgICAgICAgIC8vIE5vdGU6IERPTU5vZGUuc3R5bGUucGFkZGluZ1JpZ2h0IHJldHVybnMgdGhlIGFjdHVhbCB2YWx1ZSBvciAnJyBpZiBub3Qgc2V0XG4gICAgICAgICAgLy8gICB3aGlsZSAkKERPTU5vZGUpLmNzcygncGFkZGluZy1yaWdodCcpIHJldHVybnMgdGhlIGNhbGN1bGF0ZWQgdmFsdWUgb3IgMCBpZiBub3Qgc2V0XG4gICAgICAgICAgdmFyIGZpeGVkQ29udGVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5GSVhFRF9DT05URU5UKSk7XG4gICAgICAgICAgdmFyIHN0aWNreUNvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlQpKTsgLy8gQWRqdXN0IGZpeGVkIGNvbnRlbnQgcGFkZGluZ1xuXG4gICAgICAgICAgJCQkMShmaXhlZENvbnRlbnQpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgYWN0dWFsUGFkZGluZyA9IGVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0O1xuICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWRQYWRkaW5nID0gJCQkMShlbGVtZW50KS5jc3MoJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgICAgICQkJDEoZWxlbWVudCkuZGF0YSgncGFkZGluZy1yaWdodCcsIGFjdHVhbFBhZGRpbmcpLmNzcygncGFkZGluZy1yaWdodCcsIHBhcnNlRmxvYXQoY2FsY3VsYXRlZFBhZGRpbmcpICsgX3RoaXM5Ll9zY3JvbGxiYXJXaWR0aCArIFwicHhcIik7XG4gICAgICAgICAgfSk7IC8vIEFkanVzdCBzdGlja3kgY29udGVudCBtYXJnaW5cblxuICAgICAgICAgICQkJDEoc3RpY2t5Q29udGVudCkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBhY3R1YWxNYXJnaW4gPSBlbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0O1xuICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWRNYXJnaW4gPSAkJCQxKGVsZW1lbnQpLmNzcygnbWFyZ2luLXJpZ2h0Jyk7XG4gICAgICAgICAgICAkJCQxKGVsZW1lbnQpLmRhdGEoJ21hcmdpbi1yaWdodCcsIGFjdHVhbE1hcmdpbikuY3NzKCdtYXJnaW4tcmlnaHQnLCBwYXJzZUZsb2F0KGNhbGN1bGF0ZWRNYXJnaW4pIC0gX3RoaXM5Ll9zY3JvbGxiYXJXaWR0aCArIFwicHhcIik7XG4gICAgICAgICAgfSk7IC8vIEFkanVzdCBib2R5IHBhZGRpbmdcblxuICAgICAgICAgIHZhciBhY3R1YWxQYWRkaW5nID0gZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ7XG4gICAgICAgICAgdmFyIGNhbGN1bGF0ZWRQYWRkaW5nID0gJCQkMShkb2N1bWVudC5ib2R5KS5jc3MoJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLmRhdGEoJ3BhZGRpbmctcmlnaHQnLCBhY3R1YWxQYWRkaW5nKS5jc3MoJ3BhZGRpbmctcmlnaHQnLCBwYXJzZUZsb2F0KGNhbGN1bGF0ZWRQYWRkaW5nKSArIHRoaXMuX3Njcm9sbGJhcldpZHRoICsgXCJweFwiKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9yZXNldFNjcm9sbGJhciA9IGZ1bmN0aW9uIF9yZXNldFNjcm9sbGJhcigpIHtcbiAgICAgICAgLy8gUmVzdG9yZSBmaXhlZCBjb250ZW50IHBhZGRpbmdcbiAgICAgICAgdmFyIGZpeGVkQ29udGVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5GSVhFRF9DT05URU5UKSk7XG4gICAgICAgICQkJDEoZml4ZWRDb250ZW50KS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgIHZhciBwYWRkaW5nID0gJCQkMShlbGVtZW50KS5kYXRhKCdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgICAgJCQkMShlbGVtZW50KS5yZW1vdmVEYXRhKCdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nID8gcGFkZGluZyA6ICcnO1xuICAgICAgICB9KTsgLy8gUmVzdG9yZSBzdGlja3kgY29udGVudFxuXG4gICAgICAgIHZhciBlbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlwiICsgU2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlQpKTtcbiAgICAgICAgJCQkMShlbGVtZW50cykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgbWFyZ2luID0gJCQkMShlbGVtZW50KS5kYXRhKCdtYXJnaW4tcmlnaHQnKTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgbWFyZ2luICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJCQkMShlbGVtZW50KS5jc3MoJ21hcmdpbi1yaWdodCcsIG1hcmdpbikucmVtb3ZlRGF0YSgnbWFyZ2luLXJpZ2h0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTsgLy8gUmVzdG9yZSBib2R5IHBhZGRpbmdcblxuICAgICAgICB2YXIgcGFkZGluZyA9ICQkJDEoZG9jdW1lbnQuYm9keSkuZGF0YSgncGFkZGluZy1yaWdodCcpO1xuICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLnJlbW92ZURhdGEoJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nID8gcGFkZGluZyA6ICcnO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXRTY3JvbGxiYXJXaWR0aCA9IGZ1bmN0aW9uIF9nZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICAgICAgLy8gdGh4IGQud2Fsc2hcbiAgICAgICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLlNDUk9MTEJBUl9NRUFTVVJFUjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoO1xuICAgICAgfTsgLy8gU3RhdGljXG5cblxuICAgICAgTW9kYWwuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnLCByZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgRGVmYXVsdCwgJCQkMSh0aGlzKS5kYXRhKCksIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9KTtcblxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBNb2RhbCh0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICQkJDEodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vIG1ldGhvZCBuYW1lZCBcXFwiXCIgKyBjb25maWcgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKF9jb25maWcuc2hvdykge1xuICAgICAgICAgICAgZGF0YS5zaG93KHJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoTW9kYWwsIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0XCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBNb2RhbDtcbiAgICB9KCk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuXG4gICAgJCQkMShkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczEwID0gdGhpcztcblxuICAgICAgdmFyIHRhcmdldDtcbiAgICAgIHZhciBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKTtcblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29uZmlnID0gJCQkMSh0YXJnZXQpLmRhdGEoREFUQV9LRVkpID8gJ3RvZ2dsZScgOiBfb2JqZWN0U3ByZWFkKHt9LCAkJCQxKHRhcmdldCkuZGF0YSgpLCAkJCQxKHRoaXMpLmRhdGEoKSk7XG5cbiAgICAgIGlmICh0aGlzLnRhZ05hbWUgPT09ICdBJyB8fCB0aGlzLnRhZ05hbWUgPT09ICdBUkVBJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgJHRhcmdldCA9ICQkJDEodGFyZ2V0KS5vbmUoRXZlbnQuU0hPVywgZnVuY3Rpb24gKHNob3dFdmVudCkge1xuICAgICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgLy8gT25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICR0YXJnZXQub25lKEV2ZW50LkhJRERFTiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICgkJCQxKF90aGlzMTApLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICBfdGhpczEwLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCQkMSh0YXJnZXQpLCBjb25maWcsIHRoaXMpO1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJCQkMS5mbltOQU1FXSA9IE1vZGFsLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJCQkMS5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IE1vZGFsO1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gTW9kYWw7XG4gIH0oJCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogdG9vbHRpcC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgVG9vbHRpcCA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAndG9vbHRpcCc7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4xLjMnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy50b29sdGlwJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJCQkMS5mbltOQU1FXTtcbiAgICB2YXIgQ0xBU1NfUFJFRklYID0gJ2JzLXRvb2x0aXAnO1xuICAgIHZhciBCU0NMU19QUkVGSVhfUkVHRVggPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIgKyBDTEFTU19QUkVGSVggKyBcIlxcXFxTK1wiLCAnZycpO1xuICAgIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICAgIGFuaW1hdGlvbjogJ2Jvb2xlYW4nLFxuICAgICAgdGVtcGxhdGU6ICdzdHJpbmcnLFxuICAgICAgdGl0bGU6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJyxcbiAgICAgIHRyaWdnZXI6ICdzdHJpbmcnLFxuICAgICAgZGVsYXk6ICcobnVtYmVyfG9iamVjdCknLFxuICAgICAgaHRtbDogJ2Jvb2xlYW4nLFxuICAgICAgc2VsZWN0b3I6ICcoc3RyaW5nfGJvb2xlYW4pJyxcbiAgICAgIHBsYWNlbWVudDogJyhzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgICAgIG9mZnNldDogJyhudW1iZXJ8c3RyaW5nKScsXG4gICAgICBjb250YWluZXI6ICcoc3RyaW5nfGVsZW1lbnR8Ym9vbGVhbiknLFxuICAgICAgZmFsbGJhY2tQbGFjZW1lbnQ6ICcoc3RyaW5nfGFycmF5KScsXG4gICAgICBib3VuZGFyeTogJyhzdHJpbmd8ZWxlbWVudCknXG4gICAgfTtcbiAgICB2YXIgQXR0YWNobWVudE1hcCA9IHtcbiAgICAgIEFVVE86ICdhdXRvJyxcbiAgICAgIFRPUDogJ3RvcCcsXG4gICAgICBSSUdIVDogJ3JpZ2h0JyxcbiAgICAgIEJPVFRPTTogJ2JvdHRvbScsXG4gICAgICBMRUZUOiAnbGVmdCdcbiAgICB9O1xuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+JyArICc8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+JyxcbiAgICAgIHRyaWdnZXI6ICdob3ZlciBmb2N1cycsXG4gICAgICB0aXRsZTogJycsXG4gICAgICBkZWxheTogMCxcbiAgICAgIGh0bWw6IGZhbHNlLFxuICAgICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgIG9mZnNldDogMCxcbiAgICAgIGNvbnRhaW5lcjogZmFsc2UsXG4gICAgICBmYWxsYmFja1BsYWNlbWVudDogJ2ZsaXAnLFxuICAgICAgYm91bmRhcnk6ICdzY3JvbGxQYXJlbnQnXG4gICAgfTtcbiAgICB2YXIgSG92ZXJTdGF0ZSA9IHtcbiAgICAgIFNIT1c6ICdzaG93JyxcbiAgICAgIE9VVDogJ291dCdcbiAgICB9O1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiBcImhpZGRlblwiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgSU5TRVJURUQ6IFwiaW5zZXJ0ZWRcIiArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLOiBcImNsaWNrXCIgKyBFVkVOVF9LRVksXG4gICAgICBGT0NVU0lOOiBcImZvY3VzaW5cIiArIEVWRU5UX0tFWSxcbiAgICAgIEZPQ1VTT1VUOiBcImZvY3Vzb3V0XCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUVOVEVSOiBcIm1vdXNlZW50ZXJcIiArIEVWRU5UX0tFWSxcbiAgICAgIE1PVVNFTEVBVkU6IFwibW91c2VsZWF2ZVwiICsgRVZFTlRfS0VZXG4gICAgfTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgRkFERTogJ2ZhZGUnLFxuICAgICAgU0hPVzogJ3Nob3cnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBUT09MVElQOiAnLnRvb2x0aXAnLFxuICAgICAgVE9PTFRJUF9JTk5FUjogJy50b29sdGlwLWlubmVyJyxcbiAgICAgIEFSUk9XOiAnLmFycm93J1xuICAgIH07XG4gICAgdmFyIFRyaWdnZXIgPSB7XG4gICAgICBIT1ZFUjogJ2hvdmVyJyxcbiAgICAgIEZPQ1VTOiAnZm9jdXMnLFxuICAgICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgICBNQU5VQUw6ICdtYW51YWwnXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgVG9vbHRpcCA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIFRvb2x0aXAoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBmb3IgUG9wcGVyIGRlcGVuZGVuY3lcbiAgICAgICAgICogUG9wcGVyIC0gaHR0cHM6Ly9wb3BwZXIuanMub3JnXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXAgdG9vbHRpcHMgcmVxdWlyZSBQb3BwZXIuanMgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKTtcbiAgICAgICAgfSAvLyBwcml2YXRlXG5cblxuICAgICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gMDtcbiAgICAgICAgdGhpcy5faG92ZXJTdGF0ZSA9ICcnO1xuICAgICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyID0ge307XG4gICAgICAgIHRoaXMuX3BvcHBlciA9IG51bGw7IC8vIFByb3RlY3RlZFxuXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMudGlwID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zZXRMaXN0ZW5lcnMoKTtcbiAgICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICAgIHZhciBfcHJvdG8gPSBUb29sdGlwLnByb3RvdHlwZTtcblxuICAgICAgLy8gUHVibGljXG4gICAgICBfcHJvdG8uZW5hYmxlID0gZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmRpc2FibGUgPSBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLl9pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by50b2dnbGVFbmFibGVkID0gZnVuY3Rpb24gdG9nZ2xlRW5hYmxlZCgpIHtcbiAgICAgICAgdGhpcy5faXNFbmFibGVkID0gIXRoaXMuX2lzRW5hYmxlZDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVk7XG4gICAgICAgICAgdmFyIGNvbnRleHQgPSAkJCQxKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSk7XG5cbiAgICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihldmVudC5jdXJyZW50VGFyZ2V0LCB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpKTtcbiAgICAgICAgICAgICQkJDEoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyLmNsaWNrID0gIWNvbnRleHQuX2FjdGl2ZVRyaWdnZXIuY2xpY2s7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9lbnRlcihudWxsLCBjb250ZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5fbGVhdmUobnVsbCwgY29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgkJCQxKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlYXZlKG51bGwsIHRoaXMpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fZW50ZXIobnVsbCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuICAgICAgICAkJCQxLnJlbW92ZURhdGEodGhpcy5lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKTtcbiAgICAgICAgJCQkMSh0aGlzLmVsZW1lbnQpLm9mZih0aGlzLmNvbnN0cnVjdG9yLkVWRU5UX0tFWSk7XG4gICAgICAgICQkJDEodGhpcy5lbGVtZW50KS5jbG9zZXN0KCcubW9kYWwnKS5vZmYoJ2hpZGUuYnMubW9kYWwnKTtcblxuICAgICAgICBpZiAodGhpcy50aXApIHtcbiAgICAgICAgICAkJCQxKHRoaXMudGlwKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9ob3ZlclN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlciA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG51bGw7XG4gICAgICAgIHRoaXMudGlwID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5zaG93ID0gZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoJCQkMSh0aGlzLmVsZW1lbnQpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB1c2Ugc2hvdyBvbiB2aXNpYmxlIGVsZW1lbnRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2hvd0V2ZW50ID0gJCQkMS5FdmVudCh0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LlNIT1cpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzV2l0aENvbnRlbnQoKSAmJiB0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgICAgICAkJCQxKHRoaXMuZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuICAgICAgICAgIHZhciBpc0luVGhlRG9tID0gJCQkMS5jb250YWlucyh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8ICFpc0luVGhlRG9tKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHRpcCA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpO1xuICAgICAgICAgIHZhciB0aXBJZCA9IFV0aWwuZ2V0VUlEKHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XG4gICAgICAgICAgdGlwLnNldEF0dHJpYnV0ZSgnaWQnLCB0aXBJZCk7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRpcElkKTtcbiAgICAgICAgICB0aGlzLnNldENvbnRlbnQoKTtcblxuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICQkJDEodGlwKS5hZGRDbGFzcyhDbGFzc05hbWUuRkFERSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHBsYWNlbWVudCA9IHR5cGVvZiB0aGlzLmNvbmZpZy5wbGFjZW1lbnQgPT09ICdmdW5jdGlvbicgPyB0aGlzLmNvbmZpZy5wbGFjZW1lbnQuY2FsbCh0aGlzLCB0aXAsIHRoaXMuZWxlbWVudCkgOiB0aGlzLmNvbmZpZy5wbGFjZW1lbnQ7XG5cbiAgICAgICAgICB2YXIgYXR0YWNobWVudCA9IHRoaXMuX2dldEF0dGFjaG1lbnQocGxhY2VtZW50KTtcblxuICAgICAgICAgIHRoaXMuYWRkQXR0YWNobWVudENsYXNzKGF0dGFjaG1lbnQpO1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbmZpZy5jb250YWluZXIgPT09IGZhbHNlID8gZG9jdW1lbnQuYm9keSA6ICQkJDEoZG9jdW1lbnQpLmZpbmQodGhpcy5jb25maWcuY29udGFpbmVyKTtcbiAgICAgICAgICAkJCQxKHRpcCkuZGF0YSh0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZLCB0aGlzKTtcblxuICAgICAgICAgIGlmICghJCQkMS5jb250YWlucyh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMudGlwKSkge1xuICAgICAgICAgICAgJCQkMSh0aXApLmFwcGVuZFRvKGNvbnRhaW5lcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCQkMSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5JTlNFUlRFRCk7XG4gICAgICAgICAgdGhpcy5fcG9wcGVyID0gbmV3IFBvcHBlcih0aGlzLmVsZW1lbnQsIHRpcCwge1xuICAgICAgICAgICAgcGxhY2VtZW50OiBhdHRhY2htZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5jb25maWcub2Zmc2V0XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogdGhpcy5jb25maWcuZmFsbGJhY2tQbGFjZW1lbnRcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYXJyb3c6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBTZWxlY3Rvci5BUlJPV1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5jb25maWcuYm91bmRhcnlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ3JlYXRlOiBmdW5jdGlvbiBvbkNyZWF0ZShkYXRhKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLm9yaWdpbmFsUGxhY2VtZW50ICE9PSBkYXRhLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9oYW5kbGVQb3BwZXJQbGFjZW1lbnRDaGFuZ2UoZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gb25VcGRhdGUoZGF0YSkge1xuICAgICAgICAgICAgICBfdGhpcy5faGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgICQkJDEodGlwKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVyk7IC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAgICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgICAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAgICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG5cbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAkJCQxKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQkJDEubm9vcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICBfdGhpcy5fZml4VHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJldkhvdmVyU3RhdGUgPSBfdGhpcy5faG92ZXJTdGF0ZTtcbiAgICAgICAgICAgIF90aGlzLl9ob3ZlclN0YXRlID0gbnVsbDtcbiAgICAgICAgICAgICQkJDEoX3RoaXMuZWxlbWVudCkudHJpZ2dlcihfdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5TSE9XTik7XG5cbiAgICAgICAgICAgIGlmIChwcmV2SG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5PVVQpIHtcbiAgICAgICAgICAgICAgX3RoaXMuX2xlYXZlKG51bGwsIF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKCQkJDEodGhpcy50aXApLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy50aXApO1xuICAgICAgICAgICAgJCQkMSh0aGlzLnRpcCkub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmhpZGUgPSBmdW5jdGlvbiBoaWRlKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHZhciB0aXAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKTtcbiAgICAgICAgdmFyIGhpZGVFdmVudCA9ICQkJDEuRXZlbnQodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5ISURFKTtcblxuICAgICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLl9ob3ZlclN0YXRlICE9PSBIb3ZlclN0YXRlLlNIT1cgJiYgdGlwLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRpcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRpcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMyLl9jbGVhblRpcENsYXNzKCk7XG5cbiAgICAgICAgICBfdGhpczIuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKTtcblxuICAgICAgICAgICQkJDEoX3RoaXMyLmVsZW1lbnQpLnRyaWdnZXIoX3RoaXMyLmNvbnN0cnVjdG9yLkV2ZW50LkhJRERFTik7XG5cbiAgICAgICAgICBpZiAoX3RoaXMyLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIF90aGlzMi5fcG9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQkJDEodGhpcy5lbGVtZW50KS50cmlnZ2VyKGhpZGVFdmVudCk7XG5cbiAgICAgICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQkJDEodGlwKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVyk7IC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSByZW1vdmUgdGhlIGV4dHJhXG4gICAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG5cbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICQkJDEoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vZmYoJ21vdXNlb3ZlcicsIG51bGwsICQkJDEubm9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuQ0xJQ0tdID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5GT0NVU10gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkhPVkVSXSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICgkJCQxKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aXApO1xuICAgICAgICAgICQkJDEodGlwKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hvdmVyU3RhdGUgPSAnJztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9wb3BwZXIuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfTsgLy8gUHJvdGVjdGVkXG5cblxuICAgICAgX3Byb3RvLmlzV2l0aENvbnRlbnQgPSBmdW5jdGlvbiBpc1dpdGhDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldFRpdGxlKCkpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmFkZEF0dGFjaG1lbnRDbGFzcyA9IGZ1bmN0aW9uIGFkZEF0dGFjaG1lbnRDbGFzcyhhdHRhY2htZW50KSB7XG4gICAgICAgICQkJDEodGhpcy5nZXRUaXBFbGVtZW50KCkpLmFkZENsYXNzKENMQVNTX1BSRUZJWCArIFwiLVwiICsgYXR0YWNobWVudCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uZ2V0VGlwRWxlbWVudCA9IGZ1bmN0aW9uIGdldFRpcEVsZW1lbnQoKSB7XG4gICAgICAgIHRoaXMudGlwID0gdGhpcy50aXAgfHwgJCQkMSh0aGlzLmNvbmZpZy50ZW1wbGF0ZSlbMF07XG4gICAgICAgIHJldHVybiB0aGlzLnRpcDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudCgpIHtcbiAgICAgICAgdmFyIHRpcCA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpO1xuICAgICAgICB0aGlzLnNldEVsZW1lbnRDb250ZW50KCQkJDEodGlwLnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuVE9PTFRJUF9JTk5FUikpLCB0aGlzLmdldFRpdGxlKCkpO1xuICAgICAgICAkJCQxKHRpcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkZBREUgKyBcIiBcIiArIENsYXNzTmFtZS5TSE9XKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5zZXRFbGVtZW50Q29udGVudCA9IGZ1bmN0aW9uIHNldEVsZW1lbnRDb250ZW50KCRlbGVtZW50LCBjb250ZW50KSB7XG4gICAgICAgIHZhciBodG1sID0gdGhpcy5jb25maWcuaHRtbDtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdvYmplY3QnICYmIChjb250ZW50Lm5vZGVUeXBlIHx8IGNvbnRlbnQuanF1ZXJ5KSkge1xuICAgICAgICAgIC8vIENvbnRlbnQgaXMgYSBET00gbm9kZSBvciBhIGpRdWVyeVxuICAgICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgICBpZiAoISQkJDEoY29udGVudCkucGFyZW50KCkuaXMoJGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICRlbGVtZW50LmVtcHR5KCkuYXBwZW5kKGNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0KCQkJDEoY29udGVudCkudGV4dCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGVsZW1lbnRbaHRtbCA/ICdodG1sJyA6ICd0ZXh0J10oY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5nZXRUaXRsZSA9IGZ1bmN0aW9uIGdldFRpdGxlKCkge1xuICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLXRpdGxlJyk7XG5cbiAgICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICAgIHRpdGxlID0gdHlwZW9mIHRoaXMuY29uZmlnLnRpdGxlID09PSAnZnVuY3Rpb24nID8gdGhpcy5jb25maWcudGl0bGUuY2FsbCh0aGlzLmVsZW1lbnQpIDogdGhpcy5jb25maWcudGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9nZXRBdHRhY2htZW50ID0gZnVuY3Rpb24gX2dldEF0dGFjaG1lbnQocGxhY2VtZW50KSB7XG4gICAgICAgIHJldHVybiBBdHRhY2htZW50TWFwW3BsYWNlbWVudC50b1VwcGVyQ2FzZSgpXTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fc2V0TGlzdGVuZXJzID0gZnVuY3Rpb24gX3NldExpc3RlbmVycygpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRyaWdnZXJzID0gdGhpcy5jb25maWcudHJpZ2dlci5zcGxpdCgnICcpO1xuICAgICAgICB0cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICAgICAgaWYgKHRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgICQkJDEoX3RoaXMzLmVsZW1lbnQpLm9uKF90aGlzMy5jb25zdHJ1Y3Rvci5FdmVudC5DTElDSywgX3RoaXMzLmNvbmZpZy5zZWxlY3RvciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpczMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPT0gVHJpZ2dlci5NQU5VQUwpIHtcbiAgICAgICAgICAgIHZhciBldmVudEluID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUiA/IF90aGlzMy5jb25zdHJ1Y3Rvci5FdmVudC5NT1VTRUVOVEVSIDogX3RoaXMzLmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTSU47XG4gICAgICAgICAgICB2YXIgZXZlbnRPdXQgPSB0cmlnZ2VyID09PSBUcmlnZ2VyLkhPVkVSID8gX3RoaXMzLmNvbnN0cnVjdG9yLkV2ZW50Lk1PVVNFTEVBVkUgOiBfdGhpczMuY29uc3RydWN0b3IuRXZlbnQuRk9DVVNPVVQ7XG4gICAgICAgICAgICAkJCQxKF90aGlzMy5lbGVtZW50KS5vbihldmVudEluLCBfdGhpczMuY29uZmlnLnNlbGVjdG9yLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMy5fZW50ZXIoZXZlbnQpO1xuICAgICAgICAgICAgfSkub24oZXZlbnRPdXQsIF90aGlzMy5jb25maWcuc2VsZWN0b3IsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMzLl9sZWF2ZShldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkJCQxKF90aGlzMy5lbGVtZW50KS5jbG9zZXN0KCcubW9kYWwnKS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczMuaGlkZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0b3IpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIHRoaXMuY29uZmlnLCB7XG4gICAgICAgICAgICB0cmlnZ2VyOiAnbWFudWFsJyxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2ZpeFRpdGxlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZml4VGl0bGUgPSBmdW5jdGlvbiBfZml4VGl0bGUoKSB7XG4gICAgICAgIHZhciB0aXRsZVR5cGUgPSB0eXBlb2YgdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScpO1xuXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8IHRpdGxlVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywgdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fCAnJyk7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZW50ZXIgPSBmdW5jdGlvbiBfZW50ZXIoZXZlbnQsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZO1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAkJCQxKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSk7XG5cbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGV2ZW50LmN1cnJlbnRUYXJnZXQsIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKCkpO1xuICAgICAgICAgICQkJDEoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nID8gVHJpZ2dlci5GT0NVUyA6IFRyaWdnZXIuSE9WRVJdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkJCQxKGNvbnRleHQuZ2V0VGlwRWxlbWVudCgpKS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykgfHwgY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5TSE9XKSB7XG4gICAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuU0hPVztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQoY29udGV4dC5fdGltZW91dCk7XG4gICAgICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLlNIT1c7XG5cbiAgICAgICAgaWYgKCFjb250ZXh0LmNvbmZpZy5kZWxheSB8fCAhY29udGV4dC5jb25maWcuZGVsYXkuc2hvdykge1xuICAgICAgICAgIGNvbnRleHQuc2hvdygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5TSE9XKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9sZWF2ZSA9IGZ1bmN0aW9uIF9sZWF2ZShldmVudCwgY29udGV4dCkge1xuICAgICAgICB2YXIgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVk7XG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8ICQkJDEoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5KTtcblxuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZXZlbnQuY3VycmVudFRhcmdldCwgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKSk7XG4gICAgICAgICAgJCQkMShldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXksIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlcltldmVudC50eXBlID09PSAnZm9jdXNvdXQnID8gVHJpZ2dlci5GT0NVUyA6IFRyaWdnZXIuSE9WRVJdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KGNvbnRleHQuX3RpbWVvdXQpO1xuICAgICAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID0gSG92ZXJTdGF0ZS5PVVQ7XG5cbiAgICAgICAgaWYgKCFjb250ZXh0LmNvbmZpZy5kZWxheSB8fCAhY29udGV4dC5jb25maWcuZGVsYXkuaGlkZSkge1xuICAgICAgICAgIGNvbnRleHQuaGlkZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5PVVQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgY29udGV4dC5jb25maWcuZGVsYXkuaGlkZSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX2lzV2l0aEFjdGl2ZVRyaWdnZXIgPSBmdW5jdGlvbiBfaXNXaXRoQWN0aXZlVHJpZ2dlcigpIHtcbiAgICAgICAgZm9yICh2YXIgdHJpZ2dlciBpbiB0aGlzLl9hY3RpdmVUcmlnZ2VyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRyaWdnZXJbdHJpZ2dlcl0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0Q29uZmlnID0gZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gX29iamVjdFNwcmVhZCh7fSwgdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0LCAkJCQxKHRoaXMuZWxlbWVudCkuZGF0YSgpLCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY29uZmlnLmRlbGF5ID0ge1xuICAgICAgICAgICAgc2hvdzogY29uZmlnLmRlbGF5LFxuICAgICAgICAgICAgaGlkZTogY29uZmlnLmRlbGF5XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRpdGxlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbmZpZy50aXRsZSA9IGNvbmZpZy50aXRsZS50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuY29udGVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBjb25maWcuY29udGVudCA9IGNvbmZpZy5jb250ZW50LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGUpO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9nZXREZWxlZ2F0ZUNvbmZpZyA9IGZ1bmN0aW9uIF9nZXREZWxlZ2F0ZUNvbmZpZygpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZykge1xuICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFtrZXldICE9PSB0aGlzLmNvbmZpZ1trZXldKSB7XG4gICAgICAgICAgICAgIGNvbmZpZ1trZXldID0gdGhpcy5jb25maWdba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9jbGVhblRpcENsYXNzID0gZnVuY3Rpb24gX2NsZWFuVGlwQ2xhc3MoKSB7XG4gICAgICAgIHZhciAkdGlwID0gJCQkMSh0aGlzLmdldFRpcEVsZW1lbnQoKSk7XG4gICAgICAgIHZhciB0YWJDbGFzcyA9ICR0aXAuYXR0cignY2xhc3MnKS5tYXRjaChCU0NMU19QUkVGSVhfUkVHRVgpO1xuXG4gICAgICAgIGlmICh0YWJDbGFzcyAhPT0gbnVsbCAmJiB0YWJDbGFzcy5sZW5ndGgpIHtcbiAgICAgICAgICAkdGlwLnJlbW92ZUNsYXNzKHRhYkNsYXNzLmpvaW4oJycpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9oYW5kbGVQb3BwZXJQbGFjZW1lbnRDaGFuZ2UgPSBmdW5jdGlvbiBfaGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlKHBvcHBlckRhdGEpIHtcbiAgICAgICAgdmFyIHBvcHBlckluc3RhbmNlID0gcG9wcGVyRGF0YS5pbnN0YW5jZTtcbiAgICAgICAgdGhpcy50aXAgPSBwb3BwZXJJbnN0YW5jZS5wb3BwZXI7XG5cbiAgICAgICAgdGhpcy5fY2xlYW5UaXBDbGFzcygpO1xuXG4gICAgICAgIHRoaXMuYWRkQXR0YWNobWVudENsYXNzKHRoaXMuX2dldEF0dGFjaG1lbnQocG9wcGVyRGF0YS5wbGFjZW1lbnQpKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZml4VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIF9maXhUcmFuc2l0aW9uKCkge1xuICAgICAgICB2YXIgdGlwID0gdGhpcy5nZXRUaXBFbGVtZW50KCk7XG4gICAgICAgIHZhciBpbml0Q29uZmlnQW5pbWF0aW9uID0gdGhpcy5jb25maWcuYW5pbWF0aW9uO1xuXG4gICAgICAgIGlmICh0aXAuZ2V0QXR0cmlidXRlKCd4LXBsYWNlbWVudCcpICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJCQkMSh0aXApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFKTtcbiAgICAgICAgdGhpcy5jb25maWcuYW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgdGhpcy5jb25maWcuYW5pbWF0aW9uID0gaW5pdENvbmZpZ0FuaW1hdGlvbjtcbiAgICAgIH07IC8vIFN0YXRpY1xuXG5cbiAgICAgIFRvb2x0aXAuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnO1xuXG4gICAgICAgICAgaWYgKCFkYXRhICYmIC9kaXNwb3NlfGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBUb29sdGlwKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGNvbmZpZyArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9jcmVhdGVDbGFzcyhUb29sdGlwLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRGVmYXVsdFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiTkFNRVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gTkFNRTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiREFUQV9LRVlcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERBVEFfS0VZO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJFdmVudFwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRXZlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkVWRU5UX0tFWVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRVZFTlRfS0VZO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0VHlwZVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIFRvb2x0aXA7XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxLmZuW05BTUVdID0gVG9vbHRpcC5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQkJDEuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBUb29sdGlwO1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBUb29sdGlwO1xuICB9KCQsIFBvcHBlcik7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogcG9wb3Zlci5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgUG9wb3ZlciA9IGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG4gICAgdmFyIE5BTUUgPSAncG9wb3Zlcic7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4xLjMnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5wb3BvdmVyJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJCQkMS5mbltOQU1FXTtcbiAgICB2YXIgQ0xBU1NfUFJFRklYID0gJ2JzLXBvcG92ZXInO1xuICAgIHZhciBCU0NMU19QUkVGSVhfUkVHRVggPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIgKyBDTEFTU19QUkVGSVggKyBcIlxcXFxTK1wiLCAnZycpO1xuXG4gICAgdmFyIERlZmF1bHQgPSBfb2JqZWN0U3ByZWFkKHt9LCBUb29sdGlwLkRlZmF1bHQsIHtcbiAgICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICAgIHRyaWdnZXI6ICdjbGljaycsXG4gICAgICBjb250ZW50OiAnJyxcbiAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPicgKyAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArICc8aDMgY2xhc3M9XCJwb3BvdmVyLWhlYWRlclwiPjwvaDM+JyArICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PC9kaXY+PC9kaXY+J1xuICAgIH0pO1xuXG4gICAgdmFyIERlZmF1bHRUeXBlID0gX29iamVjdFNwcmVhZCh7fSwgVG9vbHRpcC5EZWZhdWx0VHlwZSwge1xuICAgICAgY29udGVudDogJyhzdHJpbmd8ZWxlbWVudHxmdW5jdGlvbiknXG4gICAgfSk7XG5cbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgRkFERTogJ2ZhZGUnLFxuICAgICAgU0hPVzogJ3Nob3cnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBUSVRMRTogJy5wb3BvdmVyLWhlYWRlcicsXG4gICAgICBDT05URU5UOiAnLnBvcG92ZXItYm9keSdcbiAgICB9O1xuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6IFwiaGlkZVwiICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiBcImhpZGRlblwiICsgRVZFTlRfS0VZLFxuICAgICAgU0hPVzogXCJzaG93XCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogXCJzaG93blwiICsgRVZFTlRfS0VZLFxuICAgICAgSU5TRVJURUQ6IFwiaW5zZXJ0ZWRcIiArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLOiBcImNsaWNrXCIgKyBFVkVOVF9LRVksXG4gICAgICBGT0NVU0lOOiBcImZvY3VzaW5cIiArIEVWRU5UX0tFWSxcbiAgICAgIEZPQ1VTT1VUOiBcImZvY3Vzb3V0XCIgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUVOVEVSOiBcIm1vdXNlZW50ZXJcIiArIEVWRU5UX0tFWSxcbiAgICAgIE1PVVNFTEVBVkU6IFwibW91c2VsZWF2ZVwiICsgRVZFTlRfS0VZXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgUG9wb3ZlciA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uIChfVG9vbHRpcCkge1xuICAgICAgX2luaGVyaXRzTG9vc2UoUG9wb3ZlciwgX1Rvb2x0aXApO1xuXG4gICAgICBmdW5jdGlvbiBQb3BvdmVyKCkge1xuICAgICAgICByZXR1cm4gX1Rvb2x0aXAuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgX3Byb3RvID0gUG9wb3Zlci5wcm90b3R5cGU7XG5cbiAgICAgIC8vIE92ZXJyaWRlc1xuICAgICAgX3Byb3RvLmlzV2l0aENvbnRlbnQgPSBmdW5jdGlvbiBpc1dpdGhDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuX2dldENvbnRlbnQoKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5hZGRBdHRhY2htZW50Q2xhc3MgPSBmdW5jdGlvbiBhZGRBdHRhY2htZW50Q2xhc3MoYXR0YWNobWVudCkge1xuICAgICAgICAkJCQxKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5hZGRDbGFzcyhDTEFTU19QUkVGSVggKyBcIi1cIiArIGF0dGFjaG1lbnQpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmdldFRpcEVsZW1lbnQgPSBmdW5jdGlvbiBnZXRUaXBFbGVtZW50KCkge1xuICAgICAgICB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQkJDEodGhpcy5jb25maWcudGVtcGxhdGUpWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy50aXA7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uc2V0Q29udGVudCA9IGZ1bmN0aW9uIHNldENvbnRlbnQoKSB7XG4gICAgICAgIHZhciAkdGlwID0gJCQkMSh0aGlzLmdldFRpcEVsZW1lbnQoKSk7IC8vIFdlIHVzZSBhcHBlbmQgZm9yIGh0bWwgb2JqZWN0cyB0byBtYWludGFpbiBqcyBldmVudHNcblxuICAgICAgICB0aGlzLnNldEVsZW1lbnRDb250ZW50KCR0aXAuZmluZChTZWxlY3Rvci5USVRMRSksIHRoaXMuZ2V0VGl0bGUoKSk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9nZXRDb250ZW50KCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuY2FsbCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuQ09OVEVOVCksIGNvbnRlbnQpO1xuICAgICAgICAkdGlwLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFICsgXCIgXCIgKyBDbGFzc05hbWUuU0hPVyk7XG4gICAgICB9OyAvLyBQcml2YXRlXG5cblxuICAgICAgX3Byb3RvLl9nZXRDb250ZW50ID0gZnVuY3Rpb24gX2dldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKSB8fCB0aGlzLmNvbmZpZy5jb250ZW50O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9jbGVhblRpcENsYXNzID0gZnVuY3Rpb24gX2NsZWFuVGlwQ2xhc3MoKSB7XG4gICAgICAgIHZhciAkdGlwID0gJCQkMSh0aGlzLmdldFRpcEVsZW1lbnQoKSk7XG4gICAgICAgIHZhciB0YWJDbGFzcyA9ICR0aXAuYXR0cignY2xhc3MnKS5tYXRjaChCU0NMU19QUkVGSVhfUkVHRVgpO1xuXG4gICAgICAgIGlmICh0YWJDbGFzcyAhPT0gbnVsbCAmJiB0YWJDbGFzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJHRpcC5yZW1vdmVDbGFzcyh0YWJDbGFzcy5qb2luKCcnKSk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFN0YXRpY1xuXG5cbiAgICAgIFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIHZhciBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgPyBjb25maWcgOiBudWxsO1xuXG4gICAgICAgICAgaWYgKCFkYXRhICYmIC9kZXN0cm95fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBQb3BvdmVyKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGNvbmZpZyArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9jcmVhdGVDbGFzcyhQb3BvdmVyLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiVkVSU0lPTlwiLFxuICAgICAgICAvLyBHZXR0ZXJzXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0XCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJOQU1FXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBOQU1FO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEQVRBX0tFWVwiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gREFUQV9LRVk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkV2ZW50XCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBFdmVudDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6IFwiRVZFTlRfS0VZXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBFVkVOVF9LRVk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiBcIkRlZmF1bHRUeXBlXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0VHlwZTtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gUG9wb3ZlcjtcbiAgICB9KFRvb2x0aXApO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG5cbiAgICAkJCQxLmZuW05BTUVdID0gUG9wb3Zlci5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQkJDEuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBQb3BvdmVyO1xuXG4gICAgJCQkMS5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJCQkMS5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBQb3BvdmVyO1xuICB9KCQpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IHNjcm9sbHNweS5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgU2Nyb2xsU3B5ID0gZnVuY3Rpb24gKCQkJDEpIHtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cbiAgICB2YXIgTkFNRSA9ICdzY3JvbGxzcHknO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMS4zJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMuc2Nyb2xsc3B5JztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIERlZmF1bHQgPSB7XG4gICAgICBvZmZzZXQ6IDEwLFxuICAgICAgbWV0aG9kOiAnYXV0bycsXG4gICAgICB0YXJnZXQ6ICcnXG4gICAgfTtcbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICBvZmZzZXQ6ICdudW1iZXInLFxuICAgICAgbWV0aG9kOiAnc3RyaW5nJyxcbiAgICAgIHRhcmdldDogJyhzdHJpbmd8ZWxlbWVudCknXG4gICAgfTtcbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBBQ1RJVkFURTogXCJhY3RpdmF0ZVwiICsgRVZFTlRfS0VZLFxuICAgICAgU0NST0xMOiBcInNjcm9sbFwiICsgRVZFTlRfS0VZLFxuICAgICAgTE9BRF9EQVRBX0FQSTogXCJsb2FkXCIgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgICB9O1xuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBEUk9QRE9XTl9JVEVNOiAnZHJvcGRvd24taXRlbScsXG4gICAgICBEUk9QRE9XTl9NRU5VOiAnZHJvcGRvd24tbWVudScsXG4gICAgICBBQ1RJVkU6ICdhY3RpdmUnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBEQVRBX1NQWTogJ1tkYXRhLXNweT1cInNjcm9sbFwiXScsXG4gICAgICBBQ1RJVkU6ICcuYWN0aXZlJyxcbiAgICAgIE5BVl9MSVNUX0dST1VQOiAnLm5hdiwgLmxpc3QtZ3JvdXAnLFxuICAgICAgTkFWX0xJTktTOiAnLm5hdi1saW5rJyxcbiAgICAgIE5BVl9JVEVNUzogJy5uYXYtaXRlbScsXG4gICAgICBMSVNUX0lURU1TOiAnLmxpc3QtZ3JvdXAtaXRlbScsXG4gICAgICBEUk9QRE9XTjogJy5kcm9wZG93bicsXG4gICAgICBEUk9QRE9XTl9JVEVNUzogJy5kcm9wZG93bi1pdGVtJyxcbiAgICAgIERST1BET1dOX1RPR0dMRTogJy5kcm9wZG93bi10b2dnbGUnXG4gICAgfTtcbiAgICB2YXIgT2Zmc2V0TWV0aG9kID0ge1xuICAgICAgT0ZGU0VUOiAnb2Zmc2V0JyxcbiAgICAgIFBPU0lUSU9OOiAncG9zaXRpb24nXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgU2Nyb2xsU3B5ID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gU2Nyb2xsU3B5KGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gZWxlbWVudC50YWdOYW1lID09PSAnQk9EWScgPyB3aW5kb3cgOiBlbGVtZW50O1xuICAgICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSB0aGlzLl9jb25maWcudGFyZ2V0ICsgXCIgXCIgKyBTZWxlY3Rvci5OQVZfTElOS1MgKyBcIixcIiArICh0aGlzLl9jb25maWcudGFyZ2V0ICsgXCIgXCIgKyBTZWxlY3Rvci5MSVNUX0lURU1TICsgXCIsXCIpICsgKHRoaXMuX2NvbmZpZy50YXJnZXQgKyBcIiBcIiArIFNlbGVjdG9yLkRST1BET1dOX0lURU1TKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdO1xuICAgICAgICB0aGlzLl90YXJnZXRzID0gW107XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IDA7XG4gICAgICAgICQkJDEodGhpcy5fc2Nyb2xsRWxlbWVudCkub24oRXZlbnQuU0NST0xMLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuX3Byb2Nlc3MoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuICAgICAgfSAvLyBHZXR0ZXJzXG5cblxuICAgICAgdmFyIF9wcm90byA9IFNjcm9sbFNweS5wcm90b3R5cGU7XG5cbiAgICAgIC8vIFB1YmxpY1xuICAgICAgX3Byb3RvLnJlZnJlc2ggPSBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgYXV0b01ldGhvZCA9IHRoaXMuX3Njcm9sbEVsZW1lbnQgPT09IHRoaXMuX3Njcm9sbEVsZW1lbnQud2luZG93ID8gT2Zmc2V0TWV0aG9kLk9GRlNFVCA6IE9mZnNldE1ldGhvZC5QT1NJVElPTjtcbiAgICAgICAgdmFyIG9mZnNldE1ldGhvZCA9IHRoaXMuX2NvbmZpZy5tZXRob2QgPT09ICdhdXRvJyA/IGF1dG9NZXRob2QgOiB0aGlzLl9jb25maWcubWV0aG9kO1xuICAgICAgICB2YXIgb2Zmc2V0QmFzZSA9IG9mZnNldE1ldGhvZCA9PT0gT2Zmc2V0TWV0aG9kLlBPU0lUSU9OID8gdGhpcy5fZ2V0U2Nyb2xsVG9wKCkgOiAwO1xuICAgICAgICB0aGlzLl9vZmZzZXRzID0gW107XG4gICAgICAgIHRoaXMuX3RhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gdGhpcy5fZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgIHZhciB0YXJnZXRzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NlbGVjdG9yKSk7XG4gICAgICAgIHRhcmdldHMubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIHRhcmdldDtcbiAgICAgICAgICB2YXIgdGFyZ2V0U2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAodGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0U2VsZWN0b3IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRCQ1IgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRCQ1Iud2lkdGggfHwgdGFyZ2V0QkNSLmhlaWdodCkge1xuICAgICAgICAgICAgICAvLyBUT0RPIChmYXQpOiByZW1vdmUgc2tldGNoIHJlbGlhbmNlIG9uIGpRdWVyeSBwb3NpdGlvbi9vZmZzZXRcbiAgICAgICAgICAgICAgcmV0dXJuIFskJCQxKHRhcmdldClbb2Zmc2V0TWV0aG9kXSgpLnRvcCArIG9mZnNldEJhc2UsIHRhcmdldFNlbGVjdG9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYVswXSAtIGJbMF07XG4gICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBfdGhpczIuX29mZnNldHMucHVzaChpdGVtWzBdKTtcblxuICAgICAgICAgIF90aGlzMi5fdGFyZ2V0cy5wdXNoKGl0ZW1bMV0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgJCQkMS5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcbiAgICAgICAgJCQkMSh0aGlzLl9zY3JvbGxFbGVtZW50KS5vZmYoRVZFTlRfS0VZKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWcgPSBudWxsO1xuICAgICAgICB0aGlzLl9zZWxlY3RvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX29mZnNldHMgPSBudWxsO1xuICAgICAgICB0aGlzLl90YXJnZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gbnVsbDtcbiAgICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgICBfcHJvdG8uX2dldENvbmZpZyA9IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IF9vYmplY3RTcHJlYWQoe30sIERlZmF1bHQsIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9KTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50YXJnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdmFyIGlkID0gJCQkMShjb25maWcudGFyZ2V0KS5hdHRyKCdpZCcpO1xuXG4gICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgaWQgPSBVdGlsLmdldFVJRChOQU1FKTtcbiAgICAgICAgICAgICQkJDEoY29uZmlnLnRhcmdldCkuYXR0cignaWQnLCBpZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uZmlnLnRhcmdldCA9IFwiI1wiICsgaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0U2Nyb2xsVG9wID0gZnVuY3Rpb24gX2dldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEVsZW1lbnQgPT09IHdpbmRvdyA/IHRoaXMuX3Njcm9sbEVsZW1lbnQucGFnZVlPZmZzZXQgOiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24gX2dldFNjcm9sbEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IHx8IE1hdGgubWF4KGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fZ2V0T2Zmc2V0SGVpZ2h0ID0gZnVuY3Rpb24gX2dldE9mZnNldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEVsZW1lbnQgPT09IHdpbmRvdyA/IHdpbmRvdy5pbm5lckhlaWdodCA6IHRoaXMuX3Njcm9sbEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9wcm9jZXNzID0gZnVuY3Rpb24gX3Byb2Nlc3MoKSB7XG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSB0aGlzLl9nZXRTY3JvbGxUb3AoKSArIHRoaXMuX2NvbmZpZy5vZmZzZXQ7XG5cbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHRoaXMuX2dldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIHZhciBtYXhTY3JvbGwgPSB0aGlzLl9jb25maWcub2Zmc2V0ICsgc2Nyb2xsSGVpZ2h0IC0gdGhpcy5fZ2V0T2Zmc2V0SGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbEhlaWdodCAhPT0gc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Nyb2xsVG9wID49IG1heFNjcm9sbCkge1xuICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXRzW3RoaXMuX3RhcmdldHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlVGFyZ2V0ICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlKHRhcmdldCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCAmJiBzY3JvbGxUb3AgPCB0aGlzLl9vZmZzZXRzWzBdICYmIHRoaXMuX29mZnNldHNbMF0gPiAwKSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbDtcblxuICAgICAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2Zmc2V0TGVuZ3RoID0gdGhpcy5fb2Zmc2V0cy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IG9mZnNldExlbmd0aDsgaS0tOykge1xuICAgICAgICAgIHZhciBpc0FjdGl2ZVRhcmdldCA9IHRoaXMuX2FjdGl2ZVRhcmdldCAhPT0gdGhpcy5fdGFyZ2V0c1tpXSAmJiBzY3JvbGxUb3AgPj0gdGhpcy5fb2Zmc2V0c1tpXSAmJiAodHlwZW9mIHRoaXMuX29mZnNldHNbaSArIDFdID09PSAndW5kZWZpbmVkJyB8fCBzY3JvbGxUb3AgPCB0aGlzLl9vZmZzZXRzW2kgKyAxXSk7XG5cbiAgICAgICAgICBpZiAoaXNBY3RpdmVUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlKHRoaXMuX3RhcmdldHNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLl9hY3RpdmF0ZSA9IGZ1bmN0aW9uIF9hY3RpdmF0ZSh0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgICAgdmFyIHF1ZXJpZXMgPSB0aGlzLl9zZWxlY3Rvci5zcGxpdCgnLCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyb3ctYm9keS1zdHlsZVxuXG5cbiAgICAgICAgcXVlcmllcyA9IHF1ZXJpZXMubWFwKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgIHJldHVybiBzZWxlY3RvciArIFwiW2RhdGEtdGFyZ2V0PVxcXCJcIiArIHRhcmdldCArIFwiXFxcIl0sXCIgKyAoc2VsZWN0b3IgKyBcIltocmVmPVxcXCJcIiArIHRhcmdldCArIFwiXFxcIl1cIik7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgJGxpbmsgPSAkJCQxKFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyaWVzLmpvaW4oJywnKSkpKTtcblxuICAgICAgICBpZiAoJGxpbmsuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BET1dOX0lURU0pKSB7XG4gICAgICAgICAgJGxpbmsuY2xvc2VzdChTZWxlY3Rvci5EUk9QRE9XTikuZmluZChTZWxlY3Rvci5EUk9QRE9XTl9UT0dHTEUpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICAgICRsaW5rLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNldCB0cmlnZ2VyZWQgbGluayBhcyBhY3RpdmVcbiAgICAgICAgICAkbGluay5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTsgLy8gU2V0IHRyaWdnZXJlZCBsaW5rcyBwYXJlbnRzIGFzIGFjdGl2ZVxuICAgICAgICAgIC8vIFdpdGggYm90aCA8dWw+IGFuZCA8bmF2PiBtYXJrdXAgYSBwYXJlbnQgaXMgdGhlIHByZXZpb3VzIHNpYmxpbmcgb2YgYW55IG5hdiBhbmNlc3RvclxuXG4gICAgICAgICAgJGxpbmsucGFyZW50cyhTZWxlY3Rvci5OQVZfTElTVF9HUk9VUCkucHJldihTZWxlY3Rvci5OQVZfTElOS1MgKyBcIiwgXCIgKyBTZWxlY3Rvci5MSVNUX0lURU1TKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTsgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSB3aGVuIC5uYXYtbGluayBpcyBpbnNpZGUgLm5hdi1pdGVtXG5cbiAgICAgICAgICAkbGluay5wYXJlbnRzKFNlbGVjdG9yLk5BVl9MSVNUX0dST1VQKS5wcmV2KFNlbGVjdG9yLk5BVl9JVEVNUykuY2hpbGRyZW4oU2VsZWN0b3IuTkFWX0xJTktTKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQkJDEodGhpcy5fc2Nyb2xsRWxlbWVudCkudHJpZ2dlcihFdmVudC5BQ1RJVkFURSwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRhcmdldFxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90by5fY2xlYXIgPSBmdW5jdGlvbiBfY2xlYXIoKSB7XG4gICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZWxlY3RvcikpO1xuICAgICAgICAkJCQxKG5vZGVzKS5maWx0ZXIoU2VsZWN0b3IuQUNUSVZFKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgIH07IC8vIFN0YXRpY1xuXG5cbiAgICAgIFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlID0gZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSAkJCQxKHRoaXMpLmRhdGEoREFUQV9LRVkpO1xuXG4gICAgICAgICAgdmFyIF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWc7XG5cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgU2Nyb2xsU3B5KHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgJCQkMSh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGNvbmZpZyArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9jcmVhdGVDbGFzcyhTY3JvbGxTcHksIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogXCJEZWZhdWx0XCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBTY3JvbGxTcHk7XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgICQkJDEod2luZG93KS5vbihFdmVudC5MT0FEX0RBVEFfQVBJLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2Nyb2xsU3B5cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1NQWSkpO1xuICAgICAgdmFyIHNjcm9sbFNweXNMZW5ndGggPSBzY3JvbGxTcHlzLmxlbmd0aDtcblxuICAgICAgZm9yICh2YXIgaSA9IHNjcm9sbFNweXNMZW5ndGg7IGktLTspIHtcbiAgICAgICAgdmFyICRzcHkgPSAkJCQxKHNjcm9sbFNweXNbaV0pO1xuXG4gICAgICAgIFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJHNweSwgJHNweS5kYXRhKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJCQkMS5mbltOQU1FXSA9IFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQkJDEuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBTY3JvbGxTcHk7XG5cbiAgICAkJCQxLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkJCQxLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gU2Nyb2xsU3B5O1xuICB9KCQpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjEuMyk6IHRhYi5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgVGFiID0gZnVuY3Rpb24gKCQkJDEpIHtcbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cbiAgICB2YXIgTkFNRSA9ICd0YWInO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMS4zJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMudGFiJztcbiAgICB2YXIgRVZFTlRfS0VZID0gXCIuXCIgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQkJDEuZm5bTkFNRV07XG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgSElERTogXCJoaWRlXCIgKyBFVkVOVF9LRVksXG4gICAgICBISURERU46IFwiaGlkZGVuXCIgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XOiBcInNob3dcIiArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1dOOiBcInNob3duXCIgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogXCJjbGlja1wiICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgRFJPUERPV05fTUVOVTogJ2Ryb3Bkb3duLW1lbnUnLFxuICAgICAgQUNUSVZFOiAnYWN0aXZlJyxcbiAgICAgIERJU0FCTEVEOiAnZGlzYWJsZWQnLFxuICAgICAgRkFERTogJ2ZhZGUnLFxuICAgICAgU0hPVzogJ3Nob3cnXG4gICAgfTtcbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBEUk9QRE9XTjogJy5kcm9wZG93bicsXG4gICAgICBOQVZfTElTVF9HUk9VUDogJy5uYXYsIC5saXN0LWdyb3VwJyxcbiAgICAgIEFDVElWRTogJy5hY3RpdmUnLFxuICAgICAgQUNUSVZFX1VMOiAnPiBsaSA+IC5hY3RpdmUnLFxuICAgICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJ0YWJcIl0sIFtkYXRhLXRvZ2dsZT1cInBpbGxcIl0sIFtkYXRhLXRvZ2dsZT1cImxpc3RcIl0nLFxuICAgICAgRFJPUERPV05fVE9HR0xFOiAnLmRyb3Bkb3duLXRvZ2dsZScsXG4gICAgICBEUk9QRE9XTl9BQ1RJVkVfQ0hJTEQ6ICc+IC5kcm9wZG93bi1tZW51IC5hY3RpdmUnXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgIH07XG5cbiAgICB2YXIgVGFiID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gVGFiKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgICB2YXIgX3Byb3RvID0gVGFiLnByb3RvdHlwZTtcblxuICAgICAgLy8gUHVibGljXG4gICAgICBfcHJvdG8uc2hvdyA9IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSAmJiB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmICQkJDEodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkgfHwgJCQkMSh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldDtcbiAgICAgICAgdmFyIHByZXZpb3VzO1xuICAgICAgICB2YXIgbGlzdEVsZW1lbnQgPSAkJCQxKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoU2VsZWN0b3IuTkFWX0xJU1RfR1JPVVApWzBdO1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGxpc3RFbGVtZW50KSB7XG4gICAgICAgICAgdmFyIGl0ZW1TZWxlY3RvciA9IGxpc3RFbGVtZW50Lm5vZGVOYW1lID09PSAnVUwnID8gU2VsZWN0b3IuQUNUSVZFX1VMIDogU2VsZWN0b3IuQUNUSVZFO1xuICAgICAgICAgIHByZXZpb3VzID0gJCQkMS5tYWtlQXJyYXkoJCQkMShsaXN0RWxlbWVudCkuZmluZChpdGVtU2VsZWN0b3IpKTtcbiAgICAgICAgICBwcmV2aW91cyA9IHByZXZpb3VzW3ByZXZpb3VzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhpZGVFdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuSElERSwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzaG93RXZlbnQgPSAkJCQxLkV2ZW50KEV2ZW50LlNIT1csIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBwcmV2aW91c1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgICAkJCQxKHByZXZpb3VzKS50cmlnZ2VyKGhpZGVFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAkJCQxKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KTtcblxuICAgICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8IGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGUodGhpcy5fZWxlbWVudCwgbGlzdEVsZW1lbnQpO1xuXG4gICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgIHZhciBoaWRkZW5FdmVudCA9ICQkJDEuRXZlbnQoRXZlbnQuSElEREVOLCB7XG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBfdGhpcy5fZWxlbWVudFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBzaG93bkV2ZW50ID0gJCQkMS5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogcHJldmlvdXNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkJCQxKHByZXZpb3VzKS50cmlnZ2VyKGhpZGRlbkV2ZW50KTtcbiAgICAgICAgICAkJCQxKF90aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3duRXZlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICB0aGlzLl9hY3RpdmF0ZSh0YXJnZXQsIHRhcmdldC5wYXJlbnROb2RlLCBjb21wbGV0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAkJCQxLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgIH07IC8vIFByaXZhdGVcblxuXG4gICAgICBfcHJvdG8uX2FjdGl2YXRlID0gZnVuY3Rpb24gX2FjdGl2YXRlKGVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnRzO1xuXG4gICAgICAgIGlmIChjb250YWluZXIubm9kZU5hbWUgPT09ICdVTCcpIHtcbiAgICAgICAgICBhY3RpdmVFbGVtZW50cyA9ICQkJDEoY29udGFpbmVyKS5maW5kKFNlbGVjdG9yLkFDVElWRV9VTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlRWxlbWVudHMgPSAkJCQxKGNvbnRhaW5lcikuY2hpbGRyZW4oU2VsZWN0b3IuQUNUSVZFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3RpdmUgPSBhY3RpdmVFbGVtZW50c1swXTtcbiAgICAgICAgdmFyIGlzVHJhbnNpdGlvbmluZyA9IGNhbGxiYWNrICYmIGFjdGl2ZSAmJiAkJCQxKGFjdGl2ZSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpO1xuXG4gICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczIuX3RyYW5zaXRpb25Db21wbGV0ZShlbGVtZW50LCBhY3RpdmUsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWN0aXZlICYmIGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGFjdGl2ZSk7XG4gICAgICAgICAgJCQkMShhY3RpdmUpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG8uX3RyYW5zaXRpb25Db21wbGV0ZSA9IGZ1bmN0aW9uIF90cmFuc2l0aW9uQ29tcGxldGUoZWxlbWVudCwgYWN0aXZlLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgJCQkMShhY3RpdmUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XICsgXCIgXCIgKyBDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICB2YXIgZHJvcGRvd25DaGlsZCA9ICQkJDEoYWN0aXZlLnBhcmVudE5vZGUpLmZpbmQoU2VsZWN0b3IuRFJPUERPV05fQUNUSVZFX0NISUxEKVswXTtcblxuICAgICAgICAgIGlmIChkcm9wZG93bkNoaWxkKSB7XG4gICAgICAgICAgICAkJCQxKGRyb3Bkb3duQ2hpbGQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhY3RpdmUuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICd0YWInKSB7XG4gICAgICAgICAgICBhY3RpdmUuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQkJDEoZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICd0YWInKSB7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFV0aWwucmVmbG93KGVsZW1lbnQpO1xuICAgICAgICAkJCQxKGVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKTtcblxuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICYmICQkJDEoZWxlbWVudC5wYXJlbnROb2RlKS5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUERPV05fTUVOVSkpIHtcbiAgICAgICAgICB2YXIgZHJvcGRvd25FbGVtZW50ID0gJCQkMShlbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLkRST1BET1dOKVswXTtcblxuICAgICAgICAgIGlmIChkcm9wZG93bkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBkcm9wZG93blRvZ2dsZUxpc3QgPSBbXS5zbGljZS5jYWxsKGRyb3Bkb3duRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRST1BET1dOX1RPR0dMRSkpO1xuICAgICAgICAgICAgJCQkMShkcm9wZG93blRvZ2dsZUxpc3QpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9OyAvLyBTdGF0aWNcblxuXG4gICAgICBUYWIuX2pRdWVyeUludGVyZmFjZSA9IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkdGhpcyA9ICQkJDEodGhpcyk7XG4gICAgICAgICAgdmFyIGRhdGEgPSAkdGhpcy5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBUYWIodGhpcyk7XG4gICAgICAgICAgICAkdGhpcy5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFxcXCJcIiArIGNvbmZpZyArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIF9jcmVhdGVDbGFzcyhUYWIsIG51bGwsIFt7XG4gICAgICAgIGtleTogXCJWRVJTSU9OXCIsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBUYWI7XG4gICAgfSgpO1xuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cblxuICAgICQkJDEoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBUYWIuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQkJDEodGhpcyksICdzaG93Jyk7XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkJCQxLmZuW05BTUVdID0gVGFiLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJCQkMS5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRhYjtcblxuICAgICQkJDEuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQkJDEuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gVGFiLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBUYWI7XG4gIH0oJCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMS4zKTogaW5kZXguanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgKGZ1bmN0aW9uICgkJCQxKSB7XG4gICAgaWYgKHR5cGVvZiAkJCQxID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGpRdWVyeS4galF1ZXJ5IG11c3QgYmUgaW5jbHVkZWQgYmVmb3JlIEJvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdmVyc2lvbiA9ICQkJDEuZm4uanF1ZXJ5LnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKTtcbiAgICB2YXIgbWluTWFqb3IgPSAxO1xuICAgIHZhciBsdE1ham9yID0gMjtcbiAgICB2YXIgbWluTWlub3IgPSA5O1xuICAgIHZhciBtaW5QYXRjaCA9IDE7XG4gICAgdmFyIG1heE1ham9yID0gNDtcblxuICAgIGlmICh2ZXJzaW9uWzBdIDwgbHRNYWpvciAmJiB2ZXJzaW9uWzFdIDwgbWluTWlub3IgfHwgdmVyc2lvblswXSA9PT0gbWluTWFqb3IgJiYgdmVyc2lvblsxXSA9PT0gbWluTWlub3IgJiYgdmVyc2lvblsyXSA8IG1pblBhdGNoIHx8IHZlcnNpb25bMF0gPj0gbWF4TWFqb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGF0IGxlYXN0IGpRdWVyeSB2MS45LjEgYnV0IGxlc3MgdGhhbiB2NC4wLjAnKTtcbiAgICB9XG4gIH0pKCQpO1xuXG4gIGV4cG9ydHMuVXRpbCA9IFV0aWw7XG4gIGV4cG9ydHMuQWxlcnQgPSBBbGVydDtcbiAgZXhwb3J0cy5CdXR0b24gPSBCdXR0b247XG4gIGV4cG9ydHMuQ2Fyb3VzZWwgPSBDYXJvdXNlbDtcbiAgZXhwb3J0cy5Db2xsYXBzZSA9IENvbGxhcHNlO1xuICBleHBvcnRzLkRyb3Bkb3duID0gRHJvcGRvd247XG4gIGV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbiAgZXhwb3J0cy5Qb3BvdmVyID0gUG9wb3ZlcjtcbiAgZXhwb3J0cy5TY3JvbGxzcHkgPSBTY3JvbGxTcHk7XG4gIGV4cG9ydHMuVGFiID0gVGFiO1xuICBleHBvcnRzLlRvb2x0aXAgPSBUb29sdGlwO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290c3RyYXAuanMubWFwXG4iXSwiZmlsZSI6ImJvb3RzdHJhcC5qcyJ9
