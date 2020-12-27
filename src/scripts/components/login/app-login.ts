import { generateComponent } from '../../core/component-factory/index.js'
import { Component } from '../../core/component-factory/types.js'
import router from '../../core/router/index.js'
import { css, html } from '../../core/templates/index.js'
import { globalConfigs }  from '../../store/global.js'
import userService from '../../store/services/user-service.js'

function Login(element: Component) {
  const form = element.select('form') as HTMLFormElement

  form.addEventListener('submit', e => {
    e.preventDefault()

    const credentials = {
      username: form.username.value,
      password: form.password.value
    }

    Object.keys(credentials).forEach(value => {
      if(!credentials[value]) throw value + ' is empty!'
    })

    const user = userService.findByUsernameAndPassword(credentials)

    if(user) {
      globalConfigs.currentUser = user
      userService.setCurrentUser(user)
      router.go('/dashboard')
      return
    }
    
    console.log('Ladrão')
  })
}

generateComponent(Login, {
  tag: 'app-login',
  htmlString: html`
    <form>
      <input name="username" type="text" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <button class="btn">Log in</button>
    </form>

    <app-link href="/register">Register</app-link>
  `,
  cssPath: 'css/styles.css',
  cssString: css`
    input {
      display: block;
      margin: 8px 0;
    }
  `
})
