#!/usr/bin/env node

'use strict'

const express = require('express')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')
const app = express()
const port = process.env.PORT || 5000
const toplevelSection = /([^/]*)(\/|\/index.html|getCss)$/
var bodyParser = require('body-parser')

import t from './template'

for (var page in t.pages) {
  t.template = page
  const renderedClassNames = Object.keys(t.parsed[page].css.renderedClassNames)
  const jsond = JSON.stringify({
    renderedClassNames: renderedClassNames
  })
  t.parsed[page].full.html = t.parsed[page].full.html.replace('__GENERATED_STYLES', jsond)
  t.parsed[page].partial.html = t.parsed[page].partial.html.replace('__GENERATED_STYLES', jsond)
}

app.get(toplevelSection, (req, res) => {
  req.item = req.params[0] || req.subdomains[0] || 'about'
  let file
  if ('partial' in req.query) {
    file = t.parsed[req.item].partial.html
  } else if ('classes' in req.query) {
    const arr = req.query.classes.split(' ')
    let cssContents = ''
    arr.forEach((el, i) => { cssContents += t.parsed.styles[el] })
    file = cssContents
  } else {
    file = t.parsed[req.item].full.html
  }

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

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client')))

app.post('/contact', multer().array(), function (req, res) {
  console.log('✨request.body', req.body)
  res.end('success')
})

app.listen(port, err => {
  if (err) { throw new Error(err) }
  console.log('listening on port', port)
})
