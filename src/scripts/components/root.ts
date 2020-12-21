import { generateComponent } from '../core/component-factory/index.js'
import { ComponentClass } from '../core/component-factory/types.js'
import { html } from '../core/html/html-template.js'

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

  render() {
    return html`
      <app-title text="Meu titulo" />
    
      <main>
        <app-form label-name="Tarefa"></app-form>
    
        <section>
          <ul list></ul>
        </section>
      </main>
    `
  }
}

generateComponent(
  AppRoot, {
    tag: 'app-root',
    watchedAttrs: ['align']
  }
)
