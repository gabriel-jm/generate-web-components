import { generateComponent } from '../core/component-factory/index.js'
import { ComponentClass } from '../core/component-factory/types.js'
import router from '../core/router/index.js'
import { html } from '../core/templates/index.js'

class AppRoot extends ComponentClass {
  constructor () {
    super()
    this.config()
  }

  config() {
    router.addPopStateEvent(() => this.reRenderApp())
  }

  reRenderApp() {
    this.select('div').innerHTML = `<${router.handleUrl()}/>`
  }

  render() {
    return html`
      <app-title />

      <div>
        <${router.handleUrl()}/>
      </div>
    `
  }
}

generateComponent(AppRoot, { tag: 'app-root' })
