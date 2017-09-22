const fs = require('mz/fs')
const path = require('path')
const rimraf = require('rimraf')

import Template from '../templates'

const staticDirectory = path.resolve(__dirname, '../../public/dist')
const htmlDirectory = path.resolve(staticDirectory, 'html/')
const partialsDirectory = path.resolve(htmlDirectory, 'partials/')

module.exports = async (pages) => {
  const t = new Template(pages)

  fs.existsSync(htmlDirectory) && rimraf.sync(htmlDirectory)
  fs.mkdirSync(htmlDirectory)
  fs.mkdirSync(partialsDirectory)

  for (var page in t.pages) {
    t.template = page
    const data = t.parsed[page]
    const style = `<style type="text/css">${data.partial.css.content}</style>`
    fs.writeFile(path.resolve(partialsDirectory, `./${page}.html`), style + data.partial.html)
    fs.writeFile(path.resolve(htmlDirectory, `./${page}.html`), data.full.html)
  }
}
