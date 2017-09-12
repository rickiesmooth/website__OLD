const fs = require('mz/fs')
const path = require('path')

module.exports = (page, key, h) => new Promise((resolve, reject) => {
  const client = path.resolve(__dirname, '../../client')
  const staticDirectory = path.resolve(__dirname, '../client')
  const partialsDirectory = path.resolve(__dirname, '../client/partials')
  const jsDirectory = path.resolve(staticDirectory, '../client/js')
  const esDirectory = path.resolve(staticDirectory, '../client/js/es')
  const cssDirectory = path.resolve(staticDirectory, '../client/css')

  !fs.existsSync(staticDirectory) && fs.mkdirSync(staticDirectory)
  !fs.existsSync(jsDirectory) && fs.mkdirSync(jsDirectory)
  !fs.existsSync(esDirectory) && fs.mkdirSync(esDirectory)
  !fs.existsSync(partialsDirectory) && fs.mkdirSync(partialsDirectory)
  !fs.existsSync(cssDirectory) && fs.mkdirSync(cssDirectory)

  fs.readdir(client, (err, items) => {
    items.forEach((el, i) => {
      fs.createReadStream(path.resolve(client, items[i]))
        .pipe(fs.createWriteStream(path.resolve(
          path.extname(items[i]) === '.css' ? cssDirectory : esDirectory,
          `./${items[i]}`))
        )
    })
    if (err) { reject(err) } else {
      resolve()
    }
  })
})
