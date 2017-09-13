'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noImportant = require('aphrodite/no-important');

var _template = require('../template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderStyles = {};

function Css() {
  var args = Array.prototype.slice.call(arguments);
  var a = _noImportant.StyleSheetServer.renderStatic(function () {
    return (0, _noImportant.css)(args);
  });
  var thisClass = a.css['renderedClassNames'][0];
  _template2.default.parsed.styles[thisClass] = a.css.content;
  if (!_template2.default.parsed[_template2.default._template].css.renderedClassNames[thisClass]) {
    _template2.default.parsed[_template2.default._template].css.renderedClassNames[thisClass] = true;
    _template2.default.parsed.styles[thisClass] = renderStyles[thisClass];
    _template2.default.parsed[_template2.default._template].css.output += a.css.content;
  }
  return (0, _noImportant.css)(args);
}

exports.default = Css;