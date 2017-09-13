import { StyleSheetServer, css } from 'aphrodite/no-important'
import t from '../template'
const renderStyles = {}

function Css () {
  const args = Array.prototype.slice.call(arguments)
  const a = StyleSheetServer.renderStatic(() => css(args))
  const thisClass = a.css['renderedClassNames'][0]
  t.parsed.styles[thisClass] = a.css.content
  if (!t.parsed[t._template].css.renderedClassNames[thisClass]) {
    t.parsed[t._template].css.renderedClassNames[thisClass] = true
    t.parsed.styles[thisClass] = renderStyles[thisClass]
    t.parsed[t._template].css.output += a.css.content
  }
  return css(args)
}

export default Css
