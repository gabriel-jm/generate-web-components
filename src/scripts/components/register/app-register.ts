import { generateComponent } from '../../core/component-factory/index.js'
import { Component } from '../../core/component-factory/types.js'

generateComponent(Register, {
  tag: 'app-register',
  htmlPath: 'scripts/components/register/app-register.html',
  cssPath: 'scripts/components/register/app-register.css'
})

function Register(element: Component) {
  const form = element.select('form') as HTMLFormElement

  form.addEventListener('submit', e => {
    e.preventDefault()
    const values = {
      name: form.nome.value,
      username: form.username.value,
      password: form.password.value
    }

    
  })
}
