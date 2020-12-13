import { generateComponent } from '../core/component-factory/index.js'
import { html } from '../core/html/html-template.js'

const htmlString = html`
  <link rel="stylesheet" href="css/style.css" />

  <form id="form">
    <label>
      <span>Tarefa</span>
      <input name="task" autocomplete="off" />
    </label>

    <button class="btn">Criar</button>
  </form>
`;

function formComponent(element: HTMLElement) {
  const { shadowRoot } = element
  const form = shadowRoot?.querySelector('#form') as HTMLFormElement

  form?.addEventListener('submit', event => {
    event.preventDefault()
    const task = form.task.value.trim()

    if(!task) return

    form.task.value = ''
    element.dispatchEvent(
      new CustomEvent('form-submit', {
        detail: task
      })
    )
  })
}

generateComponent(formComponent, {
  tag: 'app-form',
  htmlString
})
