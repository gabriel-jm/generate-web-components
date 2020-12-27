import { generateComponent } from '../../core/component-factory/index.js'
import { css, html } from '../../core/templates/index.js'

generateComponent(null, {
  tag: 'app-title',
  htmlString: html`<h1>My App</h1>`,
  cssString: css`
    :host {
      display: block;
      background-color: #333;
      padding: 16px 12px;
    }

    h1 {
      margin: 0;
      color: white;
    }
  `
})
