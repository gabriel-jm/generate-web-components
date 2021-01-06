import { generateComponent } from '/core/component-factory/index.js'
import { css, html, raw } from '/core/templates/index.js'
import { ComponentObject } from '/core/component-factory/types.js'
import { globalConfigs } from '/store/global.js'
import userService from '/store/services/user-service.js'
import router from '/core/router/index.js'

type TitleComponent = ComponentObject & any

const Title = <TitleComponent> {
  get logInDetails() {
    return raw`
      <div class="user-details-container">
        <span>
          ${globalConfigs.currentUser.name}
        </span>

        <button class="btn">Log out</button>
      </div>
    `
  },

  init() {
    const h1 = this.select('h1')
    h1.tabIndex = 0
    h1.addEventListener('focus', () => console.log('open'))
    h1.addEventListener('focusout', () => console.log('close'))

    this.element.logIn = () => {
      if(!globalConfigs.currentUser) return

      this.element.root.innerHTML += this.logInDetails.html
      
      const logoutBtn = this.select('button')
      logoutBtn?.addEventListener('click', () => {
        userService.logout()
        this.select('.user-details-container').remove()
        router.go('/')
      })
    }

    this.element.logIn()
  },

  render() {
    return html`
      <h1>My App</h1>

      ${globalConfigs.currentUser && (
        this.logInDetails.html
      )}
    `
  }
}

generateComponent(Title, {
  tag: 'app-title',
  cssPaths: ['css/styles.css'],
  cssString: css`
    :host {
      display: flex;
      background-color: #333;
      padding: 16px 12px;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      margin: 0;
      color: white;
    }

    .user-details-container {
      color: white;
      font-size: 1.1rem;
    }

    button.btn {
      color: white;
    }
  `
})
