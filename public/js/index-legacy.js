if (window.NodeList && !window.NodeList.prototype.forEach) {
  window.NodeList.prototype.forEach = function(callback, thisArg) {
    thisArg = thisArg || window
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}

module.exports = [
  require('es6-shim'),
  require('whatwg-fetch'),
  require('./index')
]
