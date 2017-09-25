/** @jsx h */
import {StyleSheetServer} from 'aphrodite/no-important'
import h from 'vhtml'
import { Header, Container, View, Title, Description, ContactForm, Experience } from '../components'

const STYLES = '__STYLES'

const fs = require('fs-extra')
const path = require('path')
const config = require('../../tasks/config.js')

const Templates = class Templates {
  constructor (content) {
    this.parsed = {
      styles: {}
    }

    this.pages = content.pages
    this.covers = content.covers
    this.dev = process.env.NODE_ENV !== 'production'
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
    // TODO: Fix this mess
    const target = this._template
    const data = this.pages[target]
    const withoutContainer = StyleSheetServer.renderStatic(() => {
      if (data) {
        if (data.template === 'contact') {
          return <div><Title data={data} /><ContactForm /></div>
        } else if (data.template === 'experience') {
          return <div><Title data={data} /><Description text={data.description} /><Experience jobs={data.jobs} /></div>
        } else {
          return <div><Title data={data} /><Description text={data.description} /></div>
        }
      }
    })
    const withContainer = StyleSheetServer.renderStatic(() => {
      return <View route={target} >
        <Container target={target}>
          {withoutContainer.html}
        </Container>
      </View>
    })

    return {
      html: withContainer.html,
      css: withoutContainer.css,
      forFull: withoutContainer.html
    }
  }

  full () {
    const revisionedAssetManifest = fs.readJsonSync(path.join(
        config.publicDir, config.manifestFileName), {throws: false}) || {}
    const target = this._template
    const data = this.pages[target] || this.covers[target]
    const partial = this.parsed[this._template].partial

    const full = StyleSheetServer.renderStatic(() => {
      return <html>
        <head>
          <meta charset='utf-8' />
          <meta name='author' content='Rick Smit' />
          <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1' / >
          <meta name='theme-color' content='#FF00FF' / >
          <meta name='version' content={process.env.npm_package_version} />
          <meta property='article:published_time' content={data.updatedAt} />
          <style data-aphrodite>{STYLES}</style>
          <title>{`Rick Smit - ${target}`}</title>
          <link rel='stylesheet' href='/style.css' / >
          <script
            src='//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.5.0/document-register-element.js' />
          <link rel='preload' href='/' / >
          <link rel='preload' href='/about/' />
          <link rel='preload' href='/contact/' />
          <link rel='preload' href='/experience/' />
          <script defer src={`/dist/${revisionedAssetManifest['runtime.js']}`} />
          <script defer src={`/dist/${revisionedAssetManifest['main.js']}`} />
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
          <View route={target} >
            <Container target={target}>
              { partial.forFull }
            </Container>
          </View>
          <sc-router />
        </body>
      </html>
    })
    full.html = full.html.replace(STYLES, full.css.content + partial.css.content)
    return full
  }
}

export default Templates
