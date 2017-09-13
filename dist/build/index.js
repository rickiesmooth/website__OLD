'use strict';

var _templates = require('../templates');

var _templates2 = _interopRequireDefault(_templates);

var _pages = require('../pages');

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var write = require('./write');
var init = require('./init');

var t = new _templates2.default(_pages2.default);

init().then(function () {
  for (var page in t.pages) {
    t.template = page;
    write(t.parsed[page], page);
  }
});