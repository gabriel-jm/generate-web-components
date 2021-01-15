import { generateComponent } from '../../../core/component-factory/index.js'
import { ComponentClass } from '../../../core/component-factory/types.js'
import router from '../../../core/router/index.js'
import { css, html } from '../../../core/templates/index.js'

class Link extends ComponentClass {
  init() {
    this.element.addEventListener('click', e => {
      e.preventDefault()

      router.go(this.href)
    })
  }

  render() {
    return html`<slot />`
  }
}

generateComponent(Link, {
  tag: 'app-link',
  watchedAttrs: ['href'],
  cssString: css`
    :host {
      display: inline-block;
      cursor: pointer;
    }
  `
})
