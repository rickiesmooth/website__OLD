#!/usr/bin/env node

'use strict'

const express = require('express')
const fs = require('mz/fs')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 5000
const toplevelSection = /([^/]*)(\/|\/index.html)$/
const bodyParser = require('body-parser')
const http = require('https')

// build everything
const build = require('./src/build')

const content = require('./src/build/content')
const write = require('./src/build/write')

build()

app.get(toplevelSection, (req, res) => {
  req.item = req.params[0] || req.subdomains[0] !== 'www' && req.subdomains[0] || 'home'
  let file
  if ('partial' in req.query) {
    file = path.resolve(__dirname, `./public/dist/html/partials/${req.item}.html`)
  } else {
    file = path.resolve(__dirname, `./public/dist/html/${req.item}.html`)
  }

  fs.readFile(file)
  .then(file => file.toString('utf-8'))
  .then(file => {
    const hash = crypto
                  .createHash('sha256')
                  .update(file)
                  .digest('hex')

    res.set({
      'ETag': hash,
      'Cache-Control': 'public, no-cache'
    })
    res.send(file)
  })
  .catch(error => res.status(500).send(error.toString()))
})

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, './public')))

app.post('/published', function (req, res) {
  let data = ''
  req.on('data', (chunk) => { data += chunk })
  req.on('end', () => {
    console.log('✨ended', data)
    const obj = JSON.parse(data)
    console.log('✨obj', obj)
    ;(async function (x) {
      const i = await content()
      await write(i)
    })().then(v => {
      console.log('Updated html files!')
      res.end('success')
    })
  })
})

app.post('/contact', multer().array(), function (request, response) {
  var req = http.request({
    'method': 'POST',
    'hostname': 'api.sendgrid.com',
    'path': '/v3/mail/send',
    'headers': {
      'authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'content-type': 'application/json'
    }
  })

  req.write(JSON.stringify({
    personalizations: [{ to: [{ email: 'rick.p.smit@gmail.com' }] }],
    from: { email: request.body.email },
    subject: `message from ${request.body.name}`,
    content: [{type: 'text/plain', value: request.body.message}]
  }))

  req.end()
  response.end('success')
})

app.listen(port, err => {
  if (err) { throw new Error(err) }
  console.log('listening on port', port)
})

module.exports = app
