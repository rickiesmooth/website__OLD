export default (function() {
  ;('use strict')
  const alreadyInjected = {}
  const styleTag = document.querySelector('style[data-aphrodite]')

  function getStyleKey(tag, rule) {
    if (typeof rule === 'object') {
      const selectorText = rule.selectorText || rule.cssRules[0].selectorText
      const mediaQuerie = rule.conditionText || ''
      return selectorText + mediaQuerie.replace(' ', '')
    }
  }

  class SCView extends window.HTMLElement {
    createdCallback() {
      this._view = null
      this._isRemote = this.getAttribute('remote') !== null
      for (var rule in styleTag.sheet.rules) {
        alreadyInjected[
          getStyleKey(styleTag, styleTag.sheet.rules[rule])
        ] = true
      }
    }

    get route() {
      return this.getAttribute('route') || null
    }

    _loadStyles(styles) {
      const classes = styles.sheet.rules || styles.sheet.cssRules
      for (var rule in classes) {
        const key = getStyleKey(styleTag, classes[rule])
        if (!alreadyInjected[key]) {
          if (styleTag.styleSheet) {
            // $FlowFixMe: legacy Internet Explorer compatibility
            styleTag.styleSheet.cssText += classes[rule].cssText
          } else {
            styleTag.appendChild(document.createTextNode(classes[rule].cssText))
          }
          alreadyInjected[key] = true
        }
      }
    }
    _loadView(data) {
      this._view = document.createDocumentFragment()
      const self = this
      global
        .fetch(`${data[0]}?partial`)
        .then(response => response.text())
        .then(text => new global.DOMParser().parseFromString(text, 'text/html'))
        .then(document => {
          const newView = document.querySelector('sc-view')
          const newStyles = document.querySelector('style')
          newView.childNodes.forEach(node => self._view.appendChild(node))
          self.appendChild(self._view)
          self._loadStyles(newStyles)
        })
    }

    in(data) {
      if (this._isRemote && !this._view) {
        this._loadView(data)
      }

      return new Promise((resolve, reject) => {
        const onTransitionEnd = () => {
          this.removeEventListener('transitionend', onTransitionEnd)
          resolve()
        }

        this.classList.add('visible')
        this.addEventListener('transitionend', onTransitionEnd)
      })
    }

    out() {
      return new Promise((resolve, reject) => {
        const onTransitionEnd = () => {
          this.removeEventListener('transitionend', onTransitionEnd)
          resolve()
        }

        this.classList.remove('visible')
        this.addEventListener('transitionend', onTransitionEnd)
      })
    }

    update() {
      return Promise.resolve()
    }
  }

  class CustomForm extends window.HTMLElement {
    connectedCallback() {
      const form = this.firstChild
      const inputs = form.querySelectorAll('input, textarea')

      inputs.forEach(node => {
        node.oninput = function(val) {
          this.parentNode.getElementsByTagName('label')[0].style.display = this
            .value
            ? 'none'
            : 'block'
        }
      })

      form.onsubmit = function(e) {
        window
          .fetch(form.action, {
            method: form.method || 'POST',
            body: new window.FormData(form)
          })
          .then(function(res) {
            return res.text()
          })
          .then(function(data) {
            if (data === 'success') {
              const view = form.parentNode.parentNode
              const headline = view.getElementsByTagName('h1')[0]
              const subline = view.getElementsByTagName('h2')[0]
              headline.innerText = 'Thanks!'
              subline.innerText = 'You can expect a reply within a day'
              form.style.display = 'none'
            }
          })
        e.preventDefault()
      }
    }
  }

  class CustomNav extends window.HTMLElement {
    attributeChangedCallback(name, oldValue, newValue) {
      const menuItems = this.querySelectorAll('a')
      const home = newValue === '/'
      menuItems.forEach(node => {
        const logo = node.id === 'logo'
        const href = node.getAttribute('href')
        if (logo && home) {
          node.style.display = 'none'
        } else if (logo) {
          node.style.display = null
        } else if (home) {
          node.style.left = '0px'
          node.style.transform = 'translateX(0px)'
        } else {
          node.style.left = null
          node.style.transform = null
        }
        console.log('✨href === newValue', href, newValue)
        node.style.borderBottom =
          href === newValue ? '1px solid rgba(0,0,0,5)' : null
      })
    }
  }

  window.customElements.define('sc-form', CustomForm)
  document.registerElement('sc-nav', CustomNav)
  document.registerElement('sc-view', SCView)
})()
