'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var alreadyInjected = {};
var styleTag = document.querySelector('style[data-aphrodite]');

function getStyleKey(tag, rule) {
  if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object') {
    var selectorText = rule.selectorText || rule.cssRules[0].selectorText;
    var mediaQuerie = rule.conditionText || '';
    return selectorText + mediaQuerie.replace(' ', '');
  }
}

var SCView = function (_window$HTMLElement) {
  _inherits(SCView, _window$HTMLElement);

  function SCView() {
    _classCallCheck(this, SCView);

    return _possibleConstructorReturn(this, (SCView.__proto__ || Object.getPrototypeOf(SCView)).apply(this, arguments));
  }

  _createClass(SCView, [{
    key: 'createdCallback',
    value: function createdCallback() {
      this._view = null;
      this._isRemote = this.getAttribute('remote') !== null;
      for (var rule in styleTag.sheet.rules) {
        alreadyInjected[getStyleKey(styleTag, styleTag.sheet.rules[rule])] = true;
      }
    }
  }, {
    key: '_loadStyles',
    value: function _loadStyles(styles) {
      var classes = styles.sheet.rules || styles.sheet.cssRules;
      for (var rule in classes) {
        var key = getStyleKey(styleTag, classes[rule]);
        if (!alreadyInjected[key]) {
          styleTag.sheet.insertRule(classes[rule].cssText);
          alreadyInjected[key] = true;
        }
      }
    }
  }, {
    key: '_loadView',
    value: function _loadView(data) {
      var _this2 = this;

      this._view = new window.DocumentFragment();
      var xhr = new window.XMLHttpRequest();

      xhr.onload = function (evt) {
        var newDoc = evt.target.response;
        var newView = newDoc.querySelector('sc-view');
        var newStyles = newDoc.querySelector('style');
        newView.childNodes.forEach(function (node) {
          return _this2._view.appendChild(node);
        });
        _this2.appendChild(_this2._view);
        _this2._loadStyles(newStyles);
      };
      xhr.responseType = 'document';
      xhr.open('GET', data[0] + '?partial');
      xhr.send();
    }
  }, {
    key: 'in',
    value: function _in(data) {
      var _this3 = this;

      if (this._isRemote && !this._view) {
        this._loadView(data);
      }

      return new Promise(function (resolve, reject) {
        var onTransitionEnd = function onTransitionEnd() {
          _this3.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        };

        _this3.classList.add('visible');
        _this3.addEventListener('transitionend', onTransitionEnd);
      });
    }
  }, {
    key: 'out',
    value: function out() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var onTransitionEnd = function onTransitionEnd() {
          _this4.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        };

        _this4.classList.remove('visible');
        _this4.addEventListener('transitionend', onTransitionEnd);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      return Promise.resolve();
    }
  }, {
    key: 'route',
    get: function get() {
      return this.getAttribute('route') || null;
    }
  }]);

  return SCView;
}(window.HTMLElement);

var CustomForm = function (_window$HTMLElement2) {
  _inherits(CustomForm, _window$HTMLElement2);

  function CustomForm() {
    _classCallCheck(this, CustomForm);

    return _possibleConstructorReturn(this, (CustomForm.__proto__ || Object.getPrototypeOf(CustomForm)).apply(this, arguments));
  }

  _createClass(CustomForm, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var form = this.firstChild;
      var inputs = form.querySelectorAll('input, textarea');

      inputs.forEach(function (node) {
        node.oninput = function (val) {
          this.parentNode.getElementsByTagName('label')[0].style.display = this.value ? 'none' : 'block';
        };
      });

      form.onsubmit = function (e) {
        window.fetch(form.action, {
          method: form.method || 'POST',
          body: new window.FormData(form)
        }).then(function (res) {
          return res.text();
        }).then(function (data) {
          if (data === 'success') {
            var view = form.parentNode.parentNode;
            var headline = view.getElementsByTagName('h1')[0];
            var subline = view.getElementsByTagName('h2')[0];
            headline.innerText = 'Thanks!';
            subline.innerText = 'You can expect a reply within a day';
            form.style.display = 'none';
          }
        });
        e.preventDefault();
      };
    }
  }]);

  return CustomForm;
}(window.HTMLElement);

var CustomNav = function (_window$HTMLElement3) {
  _inherits(CustomNav, _window$HTMLElement3);

  function CustomNav() {
    _classCallCheck(this, CustomNav);

    return _possibleConstructorReturn(this, (CustomNav.__proto__ || Object.getPrototypeOf(CustomNav)).apply(this, arguments));
  }

  _createClass(CustomNav, [{
    key: 'attributeChangedCallback',

    // get nothome () {
    //   return this.getAttribute('nothome')
    // }
    // get home () {
    //   return this.getAttribute('home')
    // }
    value: function attributeChangedCallback(name, oldValue, newValue) {
      var menuItems = this.querySelectorAll('a');
      var home = newValue === '/';

      menuItems.forEach(function (node) {
        var logo = node.id === 'logo';
        var href = node.getAttribute('href');
        if (logo && home) {
          node.style.display = 'none';
        } else if (logo) {
          node.style.display = null;
        } else if (home) {
          node.style.left = '0px';
          node.style.transform = 'translateX(0px)';
        } else {
          node.style.left = null;
          node.style.transform = null;
        }

        node.style.borderBottom = href === newValue ? '1px solid rgba(0,0,0,5)' : null;
      });
    }
  }]);

  return CustomNav;
}(window.HTMLElement);

window.customElements.define('sc-form', CustomForm);
document.registerElement('sc-nav', CustomNav);
document.registerElement('sc-view', SCView);