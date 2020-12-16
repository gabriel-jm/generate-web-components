import { generateComponent } from '../../core/component-factory/index.js'
import { Component } from '../../core/component-factory/types.js'

function taskComponent(element: Component) {
  const value = element.getAttribute('value')
  const taskSpan = element.select('span') as HTMLSpanElement
  
  const btnEdit = element.select('.btn-blue') as HTMLButtonElement
  const btnRemove = element.select('.btn-red') as HTMLButtonElement

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

  btnRemove.addEventListener('click', () => console.log('delete'))
}

generateComponent(taskComponent, {
  tag: 'app-task',
  htmlPath: 'scripts/components/task/task.html'
})
