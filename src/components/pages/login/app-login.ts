import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types.js'
import router from '/core/router/index.js'
import { css, html } from '/core/templates/index.js'
import { globalConfigs }  from '/store/global.js'
import userService from '/store/services/user-service.js'

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
      const { password, ...userData } = user
      userService.setCurrentUser(userData.id)
      globalConfigs.logIn(userData)
      router.go('/dashboard')
    }
  })

  if(globalConfigs.currentUser) {
    globalConfigs.logIn()
    router.go('/dashboard')
  }
}

generateComponent(Login, {
  tag: 'app-login',
  htmlString: html`
    <h2>Login</h2>

    <form>
      <input name="username" type="text" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <div class="form-actions">
        <button class="btn">Log in</button>
        <app-link class="btn" href="/register">
          Register
        </app-link>
      </div>
    </form>
  `,
  cssPaths: ['css/styles.css'],
  cssString: css`
    :host {
      width: max-content;
      display: block;
      margin: auto;
      padding: 10px;
    }

    h2 {
      font-size: 2.1rem;
      margin: 12px 0;
    }

    input {
      display: block;
      margin: 8px 0;
    }

    .form-actions {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 14px;
    }

    .form-actions > .btn {
      font-size: 0.9rem;
    }
  `
})
