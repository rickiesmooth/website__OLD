'use strict'
import { createClient } from 'contentful'

import Template from '../templates'

const write = require('./write')

require('./init').then(() => {
  const client = createClient({
    space: 'fvg6uq4s19ja',
    accessToken: process.env.CONTENTFUL_API_KEY
  })
  const getPages = new Promise((resolve, reject) => {
    const entries = client.getEntries({
      'content_type': 'pages',
      order: '-sys.createdAt'
    })
    const pages = entries.then(entries => entries.items.reduce(function (acc, cur, i) {
      acc[cur.fields.key] = {
        headline: cur.fields.headline,
        subline: cur.fields.subline || null,
        description: cur.fields.description || null,
        updatedAt: cur.sys.updatedAt,
        template: cur.fields.key
      }
      return acc
    }, {}))
    resolve(pages)
  })

  const getExperience = new Promise((resolve, reject) => {
    client.getEntry('6EdTIYlbiMoo64gmOSo8eo').then(json => {
      const experience = json.fields.experience
      const arr = Object.keys(experience).map((k) => experience[k])
      resolve(arr)
    })
  })
  Promise.all([getPages, getExperience]).then(([pages, experience]) => {
    pages['experience'].jobs = experience
    const t = new Template(pages)
    for (var page in t.pages) {
      t.template = page
      write(t.parsed[page], page)
    }
  })
})
