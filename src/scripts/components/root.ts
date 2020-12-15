import { generateComponent } from '../core/component-factory/index.js'
import { ComponentClass } from '../core/component-factory/types.js'
import { html } from '../core/html/html-template.js'

const htmlString = html`
  <app-title></app-title>

  <main>
    <app-form label-name="Tarefa"></app-form>

    <section>
      <ul list></ul>
    </section>
  </main>
`

class AppRoot extends ComponentClass {
  init() {
    const form = this.select('app-form') as HTMLElement
    const list = this.select('ul[list]') as HTMLDivElement

    form.addEventListener('form-submit', event => {
      const { detail: task } = event as CustomEvent

      const Task = customElements.get('app-task')
      const taskElement = new Task()
      taskElement.setAttribute('value', task)

      list.appendChild(taskElement)
    })
  }
}

generateComponent(
  AppRoot,
  {
    tag: 'app-root',
    htmlString,
    watchedAttrs: ['align']
  }
)
