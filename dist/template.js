'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templates = require('./templates');

var _templates2 = _interopRequireDefault(_templates);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = new _templates2.default(_pages2.default);

exports.default = t;