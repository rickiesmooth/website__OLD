const fs = require('mz/fs')
const path = require('path')
const rimraf = require('rimraf')
const http = require('http')
const meta = ['SENDGRID_API_KEY', 'CONTENTFUL_API_KEY']

const getMeta = (val) => new Promise((resolve, reject) => {
  if (process.env.DEV_ENVIRONMENT) {
    resolve()
    return
  }
  const options = {
    host: 'metadata.google.internal',
    path: `/computeMetadata/v1/project/attributes/${val}`,
    headers: {
      'Content-Type': 'application/json',
      'Metadata-Flavor': 'Google'
    }
  }

  http.get(options, (res) => {
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk })
    res.on('end', () => {
      process.env[val] = rawData
      resolve()
    })
  })
})

const initPromise = meta.map(val => getMeta(val))

initPromise.push(new Promise((resolve, reject) => {
  const client = path.resolve(__dirname, '../../public')
  const staticDirectory = path.resolve(client, 'dist/')
  const partialsDirectory = path.resolve(staticDirectory, 'partials/')
  const jsDirectory = path.resolve(staticDirectory, 'js/')
  const esDirectory = path.resolve(staticDirectory, 'js/es')
  const cssDirectory = path.resolve(staticDirectory, 'css/')
  fs.existsSync(staticDirectory) && rimraf.sync(staticDirectory)

  fs.mkdirSync(staticDirectory)
  fs.mkdirSync(jsDirectory)
  fs.mkdirSync(esDirectory)
  fs.mkdirSync(partialsDirectory)
  fs.mkdirSync(cssDirectory)

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
        if (err) { reject(err) }
      })
    })
    if (err) { reject(err) } else {
      resolve()
    }
  })
}))

module.exports = Promise.all(initPromise)
