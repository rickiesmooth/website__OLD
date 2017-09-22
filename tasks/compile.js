const bundles = require('./bundles')
const clean = require('./clean')

module.exports = async () => {
  console.log('Compiling modern and legacy script bundles...\n')
  await bundles()

  // Removes any files not in the revisioned asset manifest.
  await clean()

  console.log('Site ready!')
}
