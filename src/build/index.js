'use strict'
import Template from '../templates'
import Pages from '../pages'

const write = require('./write')
const init = require('./init')

const t = new Template(Pages)

init().then(() => {
  for (var page in t.pages) {
    t.template = page
    write(t.parsed[page], page)
  }
})
