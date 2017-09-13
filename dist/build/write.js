'use strict';

var fs = require('mz/fs');
var path = require('path');

module.exports = function (data, page) {
  var staticDirectory = path.resolve(__dirname, '../../public/dist');
  console.log('✨data.partial.css.content', data.partial.css.content);
  var style = '<style type="text/css">' + data.partial.css.content + '</style>';

  fs.writeFile(path.resolve(staticDirectory, './partials/' + page + '.html'), style + data.partial.html);
  fs.writeFile(path.resolve(staticDirectory, './' + page + '.html'), data.full.html);
};