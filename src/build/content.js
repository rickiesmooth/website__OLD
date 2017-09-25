import { createClient } from 'contentful'

module.exports = async (page) => {
  function structurePage (acc, cur) {
    acc[cur.fields.key] = {
      headline: cur.fields.headline,
      subline: cur.fields.subline || null,
      description: cur.fields.description || null,
      updatedAt: cur.sys.updatedAt,
      template: cur.fields.key
    }
    if (cur.fields.json) {
      if (cur.fields.json.jobs) {
        const experience = cur.fields.json.jobs
        acc[cur.fields.key].jobs = Object.keys(experience).map((k) => experience[k])
      } else if (cur.fields.json.cover) {
        acc[cur.fields.key].cover = true
      }
    }
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

  return page && structurePage(page) || await Promise.resolve(getPages)
}
