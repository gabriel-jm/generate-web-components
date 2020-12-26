import { generateComponent } from '../../core/component-factory/index.js'
import { ComponentObject } from '../../core/component-factory/types.js'
import { html } from '../../core/templates/index.js'
import { globalConfigs } from '../../store/global.js'

const dashboard = <ComponentObject> {

  render() {
    return html`
      <h2>Bem vindo! ${globalConfigs.currentUser?.name}</h2>
    `
  }
}

generateComponent(dashboard, {
  tag: 'app-dashboard'
})
