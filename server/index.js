#!/usr/bin/env node

'use strict'

const express = require('express')
const fs = require('mz/fs')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
const port = process.env.PORT || 5000
const toplevelSection = /([^/]*)(\/|\/index.html)$/
var bodyParser = require('body-parser')

app.get(toplevelSection, (req, res) => {
  req.item = req.params[0] || req.subdomains[0] || 'home'
  let file
  if ('partial' in req.query) {
    file = path.resolve(__dirname, `./client/partials/${req.item}.html`)
  } else {
    file = path.resolve(__dirname, `./client/${req.item}.html`)
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

app.use(express.static(path.resolve(__dirname, './client')))

app.post('/contact', multer().array(), function (req, res) {
  console.log('✨request.body', req.body)
  sendgrid.send({
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  })
  res.end('success')
})

app.listen(port, err => {
  if (err) { throw new Error(err) }
  console.log('listening on port', port)
})

