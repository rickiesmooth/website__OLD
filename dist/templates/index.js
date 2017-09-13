'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** @jsx h */


var _noImportant = require('aphrodite/no-important');

var _vhtml = require('vhtml');

var _vhtml2 = _interopRequireDefault(_vhtml);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STYLES = '__STYLES';

var Templates = function () {
  function Templates(pages) {
    _classCallCheck(this, Templates);

    this.parsed = {
      styles: {}
    };
    this.pages = pages;
    this.dev = process.env.DEV_ENVIRONMENT;
  }

  _createClass(Templates, [{
    key: 'partial',
    value: function partial() {
      var _this = this;

      var target = this._template;
      return _noImportant.StyleSheetServer.renderStatic(function () {
        return (0, _vhtml2.default)(_components.View, { route: _this._template, data: _this.pages[target] });
      });
    }
  }, {
    key: 'full',
    value: function full() {
      var _this2 = this;

      var target = this._template;
      var page = this.pages[target];
      var full = _noImportant.StyleSheetServer.renderStatic(function () {
        return (0, _vhtml2.default)(
          'html',
          null,
          (0, _vhtml2.default)(
            'head',
            null,
            (0, _vhtml2.default)('meta', { charset: 'utf-8' }),
            (0, _vhtml2.default)('meta', { name: 'author', content: 'Rick Smit' }),
            (0, _vhtml2.default)('meta', { name: 'viewport', content: 'width=device-width,minimum-scale=1,initial-scale=1' }),
            (0, _vhtml2.default)('meta', { name: 'theme-color', content: '#FF00FF' }),
            (0, _vhtml2.default)(
              'style',
              { 'data-aphrodite': true },
              STYLES
            ),
            (0, _vhtml2.default)(
              'title',
              null,
              'Rick Smit - ' + target
            ),
            (0, _vhtml2.default)('link', { rel: 'stylesheet', href: (_this2.dev ? '' : '/css') + '/style.css' }),
            (0, _vhtml2.default)('script', {
              src: '//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.5.0/document-register-element.js' }),
            (0, _vhtml2.default)('link', { rel: 'preload', href: '/' }),
            (0, _vhtml2.default)('link', { rel: 'preload', href: '/about/' }),
            (0, _vhtml2.default)('link', { rel: 'preload', href: '/contact/' }),
            (0, _vhtml2.default)('link', { rel: 'preload', href: '/experience/' })
          ),
          (0, _vhtml2.default)(
            'body',
            null,
            (0, _vhtml2.default)(_components.Header, null),
            Object.keys(_this2.pages).map(function (key) {
              if (key !== target) {
                return (0, _vhtml2.default)(_components.View, { remote: true, route: key });
              }
            }),
            (0, _vhtml2.default)(_components.View, { route: target, data: page }),
            (0, _vhtml2.default)('sc-router', null),
            (0, _vhtml2.default)('script', { defer: true, src: '/js/sc-view.js' }),
            (0, _vhtml2.default)('script', { defer: true, src: '/js/sc-router.js' }),
            (0, _vhtml2.default)('script', { defer: true, src: '/js/app.js' })
          )
        );
      });
      full.html = full.html.replace(STYLES, full.css.content);
      return full;
    }
  }, {
    key: 'template',
    set: function set(template) {
      this._template = template;
      this.parsed[template] = {
        css: {
          renderedClassNames: {},
          output: ''
        }
      };
      this.parsed[this._template].partial = this.partial();
      this.parsed[this._template].full = this.full();
    }
  }]);

  return Templates;
}();

exports.default = Templates;