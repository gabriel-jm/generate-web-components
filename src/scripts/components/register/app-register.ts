import { generateComponent } from '../../core/component-factory/index.js'
import { Component } from '../../core/component-factory/types.js'
import router from '../../core/router/index.js'
import userService from '../../store/services/user-service.js'

generateComponent(Register, {
  tag: 'app-register',
  htmlPath: 'scripts/components/register/app-register.html',
  cssPaths: [
    'scripts/components/register/app-register.css',
    'css/styles.css'
  ]
})

function Register(element: Component) {
  const form = element.select('form') as HTMLFormElement

  form.addEventListener('submit', e => {
    e.preventDefault()
    
    const user = {
      name: form.nome.value,
      username: form.username.value,
      password: form.password.value
    }

    Object.keys(user).forEach(value => {
      if(!user[value]) throw value + ' is empty!'
    })

    userService.save(user)
    router.go('/')
  })
}
