'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  var router = document.querySelector('sc-router');
  var links = document.querySelectorAll('a');
  function onClick(evt) {
    evt.preventDefault();
    router.go(evt.target.href);
  }

  links.forEach(function (link) {
    link.addEventListener('click', onClick);
  });
};

(function (_) {
  return new App();
})();