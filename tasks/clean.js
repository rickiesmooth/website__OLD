const fs = require('fs-extra')
const path = require('path')
const config = require('./config')

module.exports = async () => {
  const manifestFileName = config.manifestFileName
  const revisionedAssetManifest = await fs.readJson(path.join(config.publicDir, manifestFileName), {throws: false}) || {}

  const revisionedAssetFilenames =
      new Set(Object.values(revisionedAssetManifest))
  // Get all .js and .map files in the asset manifest.
  const filenames = (await fs.readdir(path.join(config.publicDir))).filter((filename) => {
    const extname = path.extname(filename)
    return !revisionedAssetFilenames.has(filename) &&
        (extname === '.js' || extname === '.map')
  })

  await Promise.all(filenames.map((filename) => {
    return fs.unlink(path.join(config.publicDir, filename))
        .catch(() => console.error(`Failed to delete ${filename}`))
  }))
}
