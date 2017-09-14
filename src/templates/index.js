/** @jsx h */
import {StyleSheetServer} from 'aphrodite/no-important'
import h from 'vhtml'
import { Header, Container, View, Title, Description, ContactForm, Experience } from '../components'

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
    // TODO: Fix this mess
    const target = this._template
    const data = this.pages[target]
    const withoutContainer = StyleSheetServer.renderStatic(() => {
      if (data) {
        if (!data.template) {
          return <div><Title data={data} /><Description text={data.description} /></div>
        } else if (data.template === 'contact') {
          return <div><Title data={data} /><ContactForm /></div>
        } else if (data.template === 'experience') {
          return <div><Title data={data} /><Description text={data.description} /><Experience jobs={data.list} /></div>
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
    const target = this._template
    const partial = this.parsed[this._template].partial
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
              if (key !== target &&
                key === 'about' ||
                key === 'contact' ||
                key === 'experience'
              ) {
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
          <script defer src='/js/sc-view.js' />
          <script defer src='/js/sc-router.js' />
          <script defer src='/js/app.js' />
        </body>
      </html>
    })
    full.html = full.html.replace(STYLES, full.css.content + partial.css.content)
    return full
  }
}

export default Templates

// <View route={target} data={page} />
