const compile = require('../../tasks/compile')
const meta = require('./meta')
const content = require('./content')
const write = require('./write')

import 'babel-polyfill'

module.exports = async () => {
  await compile()

  await meta()

  const i = await content()

  await write(i)

  console.log('Build done!')
}
