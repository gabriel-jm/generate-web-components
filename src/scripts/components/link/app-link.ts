import { generateComponent } from '../../core/component-factory/index.js'
import { ComponentClass } from '../../core/component-factory/types.js'
import router from '../../core/router/index.js'
import { html } from '../../core/templates/index.js'

class Link extends ComponentClass {
  init() {
    this.select('a').addEventListener('click', e => {
      e.preventDefault()

      router.go(this.href)
    })
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
