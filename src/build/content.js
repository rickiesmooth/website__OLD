import { createClient } from 'contentful'
import { createPage } from './util'

module.exports = async () => {
  const client = createClient({
    space: 'fvg6uq4s19ja',
    accessToken: process.env.CONTENTFUL_API_KEY
  })
  const entries = client.getEntries({
    'content_type': 'pages',
    order: '-sys.createdAt'
  })

  const getPages = new Promise((resolve, reject) => {
    const pages = entries.then(
      entries =>
      entries.items.reduce((acc, cur, i) =>
      createPage(cur, acc), {}))

    resolve(pages)
  })

  return await Promise.resolve(getPages)
}
