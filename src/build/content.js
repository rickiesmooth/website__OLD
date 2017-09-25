import { createClient } from 'contentful'

module.exports = async (page) => {
  function structurePage (acc, cur) {
    const json = cur.fields.json
    const data = {
      headline: cur.fields.headline,
      subline: cur.fields.subline || null,
      description: cur.fields.description || null,
      updatedAt: cur.sys.updatedAt,
      template: cur.fields.key,
      cover: json && json.cover
    }

    if (json && json.jobs) {
      const experience = cur.fields.json.jobs
      data.jobs = Object.keys(experience).map((k) => experience[k])
    }

    acc[cur.fields.key] = data
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
    const pages = entries.then(entries => entries.items.reduce(structurePage, {}))
    resolve(pages)
  })

  return page && structurePage(page, {}) || await Promise.resolve(getPages)
}
