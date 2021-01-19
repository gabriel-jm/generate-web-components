import { generateComponent } from '/core/component-factory/index.js'
import { css, html, raw } from '/core/templates/index.js'
import { ComponentObject } from '/core/component-factory/types.js'
import { globalConfigs } from '/store/global.js'
import userService from '/store/services/user-service.js'
import router from '/core/router/index.js'
import { RawHTML } from '/core/templates/raw-html-template.js'

export type TitleElement = HTMLElement & {
  logIn(): void
}

type TitleComponent = ComponentObject & {
  isLoged: boolean
  readonly logInDetails: RawHTML
  configLogInAndLogOut(): void
}

const Title = <TitleComponent> {
  isLoged: false,

  configLogInAndLogOut() {
    globalConfigs.logOut = () => {
      this.isLoged = false
      userService.logout()
      this.select('.user-details-container').remove()
      router.go('/')
    }

    globalConfigs.logIn = () => {
      if (!globalConfigs.currentUser) return

      !this.isLoged && (
        this.select('.container').innerHTML += this.logInDetails
      )

      const logoutBtn = this.select('button')
      logoutBtn?.addEventListener('click', () => globalConfigs.logOut())

      this.isLoged = true
      
      return true
    }

    globalConfigs.logIn()
  },

  init() {
    this.configLogInAndLogOut()

    const userOptionsIcon = this.select('.more')
    const userOptionsMenu = this.select('.user-options')

    userOptionsIcon.addEventListener('focus', () => {
      userOptionsMenu.classList.add('show')
    })

    userOptionsIcon.addEventListener('focusout', () => {
      userOptionsMenu.classList.remove('show')
    })
  },

  get logInDetails() {
    return raw`
      <div class="user-details-container">
        <span>
          ${globalConfigs.currentUser?.name as string}
        </span>

        <div class="more" tabindex="0">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="calc(24 * 0.25)" r="1"></circle>
            <circle cx="12" cy="calc(24 * 0.5)" r="1"></circle>
            <circle cx="12" cy="calc(24 * 0.75)" r="1"></circle>
          </svg>

          <ul class="user-options">
            <li>Settings</li>
            <li>Log out</li>
          </ul>
        </div>
      </div>
    `
  },

  render() {
    return html`
      <div class="container">
        <h1>My App</h1>
      </div>
    `
  }
}

generateComponent(Title, {
  tag: 'app-title',
  cssPaths: ['css/styles.css'],
  cssString: css`
    .container {
      display: flex;
      background-color: #333;
      padding: 16px 12px;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: border-box;
    }

    h1 {
      margin: 0;
      color: white;
      width: 110px;
    }

    .user-details-container {
      color: white;
      font-size: 1.1rem;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 6px;
    }

    .more {
      color: white;
      height: 24px;
      cursor: pointer;
      outline: 0;
      position: relative;
    }

    .user-options {
      --scale: 0;

      position: absolute;
      top: 8px;
      right: 8px;
      background-color: white;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 1px 2px #3335;
      color: #333;
      list-style: none;
      padding: 8px 0;
      transform: scale(var(--scale));
      transform-origin: top right;
      transition: transform 0.18s;
    }

    .user-options.show {
      --scale: 1;
    }

    .user-options li {
      font-size: 0.95rem;
      padding: 4px 16px;
      transition: all 0.3s;
    }

    .user-options li:hover {
      background-color: #eee;
    }
  `
})
