/** @jsx h */
import {StyleSheetServer} from 'aphrodite/no-important'
import h from 'vhtml'
import { Header, View } from '../components'

const STYLES = '__STYLES'

const Templates = class Templates {
  constructor (pages) {
    this.parsed = {
      styles: {}
    }
    this.pages = pages
    this.dev = process.env.DEV_ENVIRONMENT
  }

  set template (template) {
    this._template = template
    this.parsed[template] = {
      css: {
        renderedClassNames: {},
        output: ''
      }
    }
    this.parsed[this._template].partial = this.partial()
    this.parsed[this._template].full = this.full()
  }

  partial () {
    const target = this._template
    return StyleSheetServer.renderStatic(() => {
      return <View route={this._template} data={this.pages[target]} />
    })
  }

  full () {
    const target = this._template
    const page = this.pages[target]
    const full = StyleSheetServer.renderStatic(() => {
      return <html>
        <head>
          <meta charset='utf-8' />
          <meta name='author' content='Rick Smit' />
          <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1' / >
          <meta name='theme-color' content='#FF00FF' / >
          <style data-aphrodite>{STYLES}</style>
          <title>{`Rick Smit - ${target}`}</title>
          <link rel='stylesheet' href={`${(this.dev) ? '' : '/css'}/style.css`} / >
          <script
            src='//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.5.0/document-register-element.js' />
          <link rel='preload' href='/' / >
          <link rel='preload' href='/about/' />
          <link rel='preload' href='/contact/' />
          <link rel='preload' href='/experience/' />
        </head>
        <body>
          <Header />
          {
            Object.keys(this.pages).map((key) => {
              if (key !== target) {
                return (<View remote route={key} />)
              }
            })
          }
          <View route={target} data={page} />
          <sc-router />
          <script defer src='/js/sc-view.js' />
          <script defer src='/js/sc-router.js' />
          <script defer src='/js/app.js' />
        </body>
      </html>
    })
    full.html = full.html.replace(STYLES, full.css.content)
    return full
  }
}

export default Templates
