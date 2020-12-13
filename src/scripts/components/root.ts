import { generateComponent } from '../core/component-factory/index.js'
import { html } from '../core/html/html-template.js'

const htmlString = html`
  <app-title></app-title>

  <main>
    <app-form></app-form>

    <section>
      <ul list></ul>
    </section>
  </main>
`

class ComponentClass {
  protected readonly element!: HTMLElement & { root: ShadowRoot }
  get root() {
    return this.element.root
  }
}

class AppRoot extends ComponentClass {
  init() {
    const form = this.root.querySelector!('app-form') as HTMLElement
    const list = this.root.querySelector('ul[list]') as HTMLDivElement

    form.addEventListener('form-submit', event => {
      const { detail: task } = event as CustomEvent

      const Task = customElements.get('app-task')
      const taskElement = new Task()
      taskElement.setAttribute('value', task)

      list.appendChild(taskElement)
    })
  }

  attrChange(attributeDef: any) {
    
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
