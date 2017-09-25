const http = require('http')
const meta = ['SENDGRID_API_KEY', 'CONTENTFUL_API_KEY']

module.exports = async () => {
  if (process.env.SENDGRID_API_KEY && process.env.CONTENTFUL_API_KEY) {
    return [process.env.SENDGRID_API_KEY, process.env.CONTENTFUL_API_KEY]
  } else {
    await Promise.all(meta.map(val => getMeta(val))).then(keys => {
      keys.forEach(env => {
        for (var key in env) {
          process.env[key] = env[key]
        }
      })
    })
  }
}

const getMeta = (val) => new Promise((resolve, reject) => {
  const options = {
    host: 'metadata.google.internal',
    path: `/computeMetadata/v1/project/attributes/${val}`,
    headers: {
      'Content-Type': 'application/json',
      'Metadata-Flavor': 'Google'
    }
  }

  http.get(options, res => {
    let rawData = ''
    res.on('data', chunk => { rawData += chunk })
    res.on('end', () => resolve({[val]: rawData}))
  })
})
