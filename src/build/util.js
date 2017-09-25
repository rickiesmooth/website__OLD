export function createPage (cur, acc = {}) {
  acc[cur.fields.key] = {
    headline: cur.fields.headline,
    subline: cur.fields.subline || null,
    description: cur.fields.description || null,
    updatedAt: cur.sys.updatedAt,
    template: cur.fields.key
  }
  if (cur.fields.json) {
    const experience = cur.fields.json.jobs
    acc[cur.fields.key].jobs = Object.keys(experience).map((k) => experience[k])
  }

  return acc
}
