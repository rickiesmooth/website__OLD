import 'babel-polyfill'

const compile = require('../../tasks/compile')
const meta = require('./meta')
const content = require('./content')
const write = require('./write')

module.exports = async () => {
  await compile()

  await meta()

  const i = await content()

  await write(i)

  console.log('Build done!')
}
