import { createClient } from 'contentful'

module.exports = async (page) => {
  function structurePage (acc, cur) {
    const data = {
      headline: cur.fields.headline,
      subline: cur.fields.subline || null,
      description: cur.fields.description || null,
      updatedAt: cur.sys.updatedAt,
      template: cur.fields.key
    }
    const json = cur.fields.json

    if (json && json.jobs) {
      const experience = cur.fields.json.jobs
      data.jobs = Object.keys(experience).map((k) => experience[k])
    }

    json && json.cover ? (acc.covers[cur.fields.key] = data) : (acc.pages[cur.fields.key] = data)
    // acc.covers = data
    return acc
  }

  const getPages = new Promise((resolve, reject) => {
    const client = createClient({
      space: 'fvg6uq4s19ja',
      accessToken: process.env.CONTENTFUL_API_KEY
    })
    const entries = client.getEntries({
      'content_type': 'pages',
      order: '-sys.createdAt'
    })
    const pages = entries.then(entries => entries.items.reduce(structurePage, {
      pages: {},
      covers: {}
    }))
    resolve(pages)
  })

  return page && structurePage(page) || await Promise.resolve(getPages)
}
