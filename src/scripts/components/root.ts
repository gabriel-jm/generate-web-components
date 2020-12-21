import { generateComponent } from '../core/component-factory/index.js'
import { ComponentClass } from '../core/component-factory/types.js'
import { html } from '../core/html/html-template.js'
import routes from './routes.js'

class AppRoot extends ComponentClass {
  constructor () {
    super()
    this.configPopStateEvent()
  }

  configPopStateEvent () {
    window.onpopstate = () => this.reRenderApp()
  }

  handleUrl () {
    const { pathname } = window.location

    return pathname in routes ? routes[pathname] : routes.notFound
  }

  reRenderApp () {
    this.select('div').innerHTML = `<${this.handleUrl()}/>`
  }

  render () {
    return html`
      <h1>Meu App</h1>

      <div>
        <${this.handleUrl()}/>
      </div>
    `
  }
}

generateComponent(
  AppRoot, { tag: 'app-root' }
)
