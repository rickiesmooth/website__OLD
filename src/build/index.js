'use strict'
import Template from '../templates'
import pages from '../pages'

const write = require('./write')
const init = require('./init')

const t = new Template(pages)

init().then(() => {
  for (var page in t.pages) {
    t.template = page
    write(t.parsed[page], page)
  }
})
