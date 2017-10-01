'use strict'

export default (function() {
  class App {
    constructor() {
      const router = document.querySelector('sc-router')
      const links = document.querySelectorAll('a')
      function onClick(evt) {
        evt.preventDefault()
        router.go(evt.target.href)
      }
      for (var i = 0; i < links.length; ++i) {
        links[i].addEventListener('click', onClick)
      }
    }
  }

  ;(_ => new App())()
})()
