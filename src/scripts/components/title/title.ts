import { generateComponent } from '../../core/component-factory/index.js'
import { html } from '../../core/html/html-template.js'

const Title = {
  render() {
    return html`
      <header>
        <h1>${this.element.text || 'Default Title'}</h1>
      </header>
    `
  }
} as any

generateComponent(Title, {
  tag: 'app-title',
  watchedAttrs: ['text']
})
