import { generateComponent } from '../../core/component-factory/index.js'
import { html } from '../../core/html/html-template.js'

const htmlString = html`
  <header>
    <h1>Todo Title</h1>
  </header>
`;

generateComponent(null, {
  tag: 'app-title',
  htmlString
})
