'use strict'
import t from '../template'
const write = require('./write')
const init = require('./init')

init().then(() => {
  for (var page in t.pages) {
    t.template = page
    write(t.parsed[page], page)
  }
})
