import { generateComponent } from '../core/component-factory/index.js'

function taskComponent(element: HTMLElement) {
  const { shadowRoot } = element
  const value = element.getAttribute('value')
  const taskSpan = shadowRoot!.querySelector('span') as HTMLSpanElement
  
  const btnEdit = shadowRoot!.querySelector('.btn-blue') as HTMLButtonElement
  //const btnRemove = shadowRoot!.querySelector('.btn-red') as HTMLButtonElement

  taskSpan.innerText = value as string

  btnEdit.addEventListener('click', () => {
    if(taskSpan.hasAttribute('contentEditable')) {
      taskSpan.removeAttribute('contentEditable')
      taskSpan.style.borderColor = 'transparent'
      btnEdit.className = 'btn-blue'
      btnEdit.innerText = 'Editar'
      return
    }

    taskSpan.setAttribute('contentEditable', '')
    taskSpan.style.borderColor = '#6ad'
    btnEdit.className = 'btn-green'
    btnEdit.innerText = 'Feito'
  })
}

generateComponent(taskComponent, {
  tag: 'app-task',
  htmlPath: 'scripts/components/task.html'
})
