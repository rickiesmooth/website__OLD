import Template from '../templates'

const fs = require('fs-extra')
const path = require('path')

const staticDirectory = path.resolve(__dirname, '../../public/dist')
const htmlDirectory = path.resolve(staticDirectory, './html')
const partialsDirectory = path.resolve(htmlDirectory, './partials')

module.exports = async (pages, single) => {
  const t = new Template(pages)
  // console.log('✨pages', pages)
  if (!single) {
    fs.existsSync(htmlDirectory) && fs.removeSync(htmlDirectory)
    fs.mkdirSync(htmlDirectory)
    fs.mkdirSync(partialsDirectory)
  }
  for (var page in t.pages) {
    t.template = page
    const data = t.parsed[page]
    const style = `<style type="text/css">${data.partial.css.content}</style>`
    fs.writeFile(
      path.resolve(partialsDirectory, `./${page}.html`),
      style + data.partial.html
    )
    fs.writeFile(path.resolve(htmlDirectory, `./${page}.html`), data.full.html)
  }
}
