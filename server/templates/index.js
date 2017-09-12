/** @jsx h */
import {StyleSheetServer} from 'aphrodite/no-important'
import h from 'vhtml'
import { Headline, Subline, Description, Header, Title, View,
  Container, Nav, Job, ContactForm, GeneratedStyles } from '../components'

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
    this.getHtml()
  }

  getHtml () {
    this.parsed[this._template].partial = this.generatePartial()
    this.parsed[this._template].full = this.generateFull()
  }

  generateFull () {
    const full = StyleSheetServer.renderStatic(() => {
      return [
        this.header(),
        this.router(),
        this.view()
      ]
    })
    return {
      html: this.head(full),
      renderedClassNames: full.css.renderedClassNames
    }
  }

  generatePartial () {
    const full = StyleSheetServer.renderStatic(() => this.view())
    return {
      html: full.html
    }
  }

  router () {
    const Pages = this.pages
    const target = this._template
    return Object.keys(Pages).map((key) => {
      if (key !== target) {
        return (<View remote route={key} />)
      }
    })
  }

  view () {
    const target = this._template
    const page = this.pages[target]
    return (
      <View route={target} >
        <Container target={target}>
          <Title>
            <Headline tag='h1'> { page.headline } </Headline>
            { page.subline &&
              <Subline tag='h2'>{ page.subline }</Subline> }
          </Title>
          { page.description &&
            <Description>{page.description}</Description> }
          { this[target] &&
      this[target]() }
        </Container>
      </View>
    )
  }

  contact () {
    return <ContactForm />
  }

  experience () {
    const target = this._template
    const experience = this.pages[target]
    return (
      experience.list.map((el, i) =>
        <Job data={el} />)
    )
  }

  head (full) {
    const path = (this.dev) ? {js: '', css: ''} : {js: '/js/es', css: '/css'}
    return <html>
      <head>
        <meta charset='utf-8' />
        <meta name='author' content='Rick Smit' />
        <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1' / >
        <meta name='theme-color' content='#FF00FF' / >
        <style data-aphrodite>{`${this.parsed[this._template].css.output}`}</style>
        <title>{`Rick Smit - ${this._template}`}</title>
        <link rel='stylesheet' href={`${path.css}/style.css`} / >
        <script
          src='//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.5.0/document-register-element.js' />
        <link rel='preload' href='/' / >
        <link rel='preload' href='/about/' />
        <link rel='preload' href='/contact/' />
        <link rel='preload' href='/experience/' />
        <GeneratedStyles />
      </head>
      <body>
        {full.html}
        <sc-router />
        <script defer src={`${path.js}/sc-view.js`} />
        <script defer src={`${path.js}/sc-router.js`} />
        <script defer src={`${path.js}/app.js`} />
      </body>
    </html>
  }

  header () {
    return (
      <Header>
        <Nav />
      </Header>
    )
  }
}

export default Templates
