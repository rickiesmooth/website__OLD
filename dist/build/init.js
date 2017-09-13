'use strict';

var fs = require('mz/fs');
var path = require('path');

module.exports = function (page, key, h) {
  return new Promise(function (resolve, reject) {
    var client = path.resolve(__dirname, '../../public');
    var staticDirectory = path.resolve(client, 'dist/');
    var partialsDirectory = path.resolve(staticDirectory, 'partials/');
    var jsDirectory = path.resolve(staticDirectory, 'js/');
    var esDirectory = path.resolve(staticDirectory, 'js/es');
    var cssDirectory = path.resolve(staticDirectory, 'css/');

    !fs.existsSync(staticDirectory) && fs.mkdirSync(staticDirectory);
    !fs.existsSync(jsDirectory) && fs.mkdirSync(jsDirectory);
    !fs.existsSync(esDirectory) && fs.mkdirSync(esDirectory);
    !fs.existsSync(partialsDirectory) && fs.mkdirSync(partialsDirectory);
    !fs.existsSync(cssDirectory) && fs.mkdirSync(cssDirectory);

    fs.readdir(client, function (err, items) {
      items.forEach(function (el, i) {
        var filePath = path.resolve(client, items[i]);
        fs.lstat(filePath, function (err, stats) {
          if (stats.isFile()) {
            fs.createReadStream(filePath).pipe(fs.createWriteStream(path.resolve(path.extname(items[i]) === '.css' ? cssDirectory : esDirectory, './' + items[i])));
          }
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};