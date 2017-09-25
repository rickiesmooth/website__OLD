#!/usr/bin/env node

'use strict'

const express = require('express')
const fs = require('fs-extra')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 5000
const toplevelSection = /([^/]*)(\/|\/index.html)$/
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

app.use(express.static(path.resolve(__dirname, './public')))

app.post('/published', function (req, res) {
  let data = ''
  req.on('data', (chunk) => { data += chunk })
  req.on('end', () => {
    (async function (x) {
      const i = await content()
      await write(i)
    })().then(v => {
      const obj = JSON.parse(data)
      console.log('Updated html files!', obj)
      res.end('success')
    })
  })
})

app.post('/contact', multer().array(), function (req, res) {
  const request = http.request({
    'method': 'POST',
    'hostname': 'api.sendgrid.com',
    'path': '/v3/mail/send',
    'headers': {
      'authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'content-type': 'application/json'
    }
  })

  request.write(JSON.stringify({
    personalizations: [{ to: [{ email: 'rick.p.smit@gmail.com' }] }],
    from: { email: req.body.email },
    subject: `message from ${req.body.name}`,
    content: [{type: 'text/plain', value: req.body.message}]
  }))

  request.end()
  res.end('success')
})

app.listen(port, err => {
  if (err) { throw new Error(err) }
  console.log('listening on port', port)
})

module.exports = app
