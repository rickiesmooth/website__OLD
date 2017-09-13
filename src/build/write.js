const fs = require('mz/fs')
const path = require('path')

module.exports = (data, page) => {
  const staticDirectory = path.resolve(__dirname, '../../public/dist')
  const style = `<style type="text/css">${data.partial.css.content}</style>`

  fs.writeFile(path.resolve(staticDirectory, `./partials/${page}.html`), style + data.partial.html)
  fs.writeFile(path.resolve(staticDirectory, `./${page}.html`), data.full.html)
}
