const fs = require('mz/fs')
const path = require('path')

module.exports = (page, key, h) => new Promise((resolve, reject) => {
  const client = path.resolve(__dirname, '../../public')
  const staticDirectory = path.resolve(client, 'dist/')
  const partialsDirectory = path.resolve(staticDirectory, 'partials/')
  const jsDirectory = path.resolve(staticDirectory, 'js/')
  const esDirectory = path.resolve(staticDirectory, 'js/es')
  const cssDirectory = path.resolve(staticDirectory, 'css/')

  !fs.existsSync(staticDirectory) && fs.mkdirSync(staticDirectory)
  !fs.existsSync(jsDirectory) && fs.mkdirSync(jsDirectory)
  !fs.existsSync(esDirectory) && fs.mkdirSync(esDirectory)
  !fs.existsSync(partialsDirectory) && fs.mkdirSync(partialsDirectory)
  !fs.existsSync(cssDirectory) && fs.mkdirSync(cssDirectory)

  fs.readdir(client, (err, items) => {
    items.forEach((el, i) => {
      const filePath = path.resolve(client, items[i])
      fs.lstat(filePath, (err, stats) => {
        if (stats.isFile()) {
          fs.createReadStream(filePath)
            .pipe(fs.createWriteStream(path.resolve(
              path.extname(items[i]) === '.css' ? cssDirectory : esDirectory,
              `./${items[i]}`))
            )
        }
        if (err) { reject(err) } else {
          resolve()
        }
      })
    })
    if (err) { reject(err) } else {
      resolve()
    }
  })
})
