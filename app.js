#!/usr/bin/env node

'use strict'

const express = require('express')
const fs = require('mz/fs')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const sendgrid = require('@sendgrid/mail')
console.log('✨process.env.SENDGRID_API_KEY', process.env.SENDGRID_API_KEY)
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
const port = process.env.PORT || 5000
const toplevelSection = /([^/]*)(\/|\/index.html)$/
const bodyParser = require('body-parser')

process.env.DEV_ENVIRONMENT && require('./src/build')

app.get(toplevelSection, (req, res) => {
  req.item = req.params[0] || req.subdomains[0] !== 'www' && req.subdomains[0] || 'home'
  let file
  if ('partial' in req.query) {
    file = path.resolve(__dirname, `./public/dist/partials/${req.item}.html`)
  } else {
    file = path.resolve(__dirname, `./public/dist/${req.item}.html`)
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
app.use(express.static(path.resolve(__dirname, process.env.DEV_ENVIRONMENT ? './public' : './public/dist')))

app.post('/published', multer().array(), function (req, res) {
  const spawn = require('child_process').spawn
  spawn('/opt/bitnami/nodejs/bin/forever', ['restartall'])
})

app.post('/contact', multer().array(), function (req, res) {
  sendgrid.send({
    to: 'rick.p.smit@gmail.com',
    from: req.body.email,
    subject: `message from ${req.body.name}`,
    text: req.body.message
  })
  res.end('success')
})

app.listen(port, err => {
  if (err) { throw new Error(err) }
  console.log('listening on port', port)
})

module.exports = app
