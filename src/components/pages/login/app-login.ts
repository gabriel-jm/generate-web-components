import { TitleElement } from '/components/utils/title/app-title'
import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types.js'
import router from '/core/router/index.js'
import { css, html } from '/core/templates/index.js'
import { globalConfigs }  from '/store/global.js'
import userService from '/store/services/user-service.js'

function makeLogin() {
  const appRoot = document.querySelector('app-root')
  const appTitle = appRoot?.querySelector('app-title') as TitleElement

  appTitle.logIn()
}

function Login(element: Component) {
  const form = element.select('form') as HTMLFormElement

  form.addEventListener('submit', e => {
    e.preventDefault()

    const credentials: { username: string, password: string, [key: string]: string } = {
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
      makeLogin()
      return router.go('/dashboard')
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
  cssPaths: ['css/styles.css'],
  cssString: css`
    input {
      display: block;
      margin: 8px 0;
    }
  `
})
