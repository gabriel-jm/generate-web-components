import { generateComponent } from '../../core/component-factory/index.js'
import { ComponentClass } from '../../core/component-factory/types.js'
import { html } from '../../core/templates/index.js'

class Link extends ComponentClass {
  init() {
    this.select('a').addEventListener('mousedown', e => {
      e.preventDefault()

      this.verifyCurrentPath()
      window.dispatchEvent(new Event('popstate'))
    })
  }

  verifyCurrentPath() {
    if(this.href === location.pathname) {
      return history.replaceState(null, '', this.href)
    }

    history.pushState(null, '', this.href)
  }

  render() {
    return html`
      <a href=${this.href}>
        <slot/>
      </a>
    `
  }
}

generateComponent(Link, {
  tag: 'app-link',
  watchedAttrs: ['href']
})
