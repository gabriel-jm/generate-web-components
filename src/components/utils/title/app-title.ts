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
  addEvents(): void
}

const Title = <TitleComponent> {
  isLoged: false,

  configLogInAndLogOut() {
    globalConfigs.logOut = () => {
      userService.logout()
      globalConfigs.currentUser = null
      this.isLoged = false
      this.select('.user-details-container')?.remove()
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
      this.addEvents()
      
      return true
    }

    globalConfigs.logIn()
  },

  init() {
    this.configLogInAndLogOut()

    this.addEvents()
  },

  addEvents() {
    if(globalConfigs.currentUser) {
      const userOptionsIcon = this.select('.more')
      const userOptionsMenu = this.select('.user-options')

      userOptionsIcon.addEventListener('focus', () => {
        userOptionsMenu.classList.add('show')
      })

      userOptionsIcon.addEventListener('focusout', () => {
        userOptionsMenu.classList.remove('show')
      })
    
      this.select('[log-out]').addEventListener('click', () => {
        globalConfigs.logOut()
      })
    }
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
            <li log-out>Log out</li>
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
  cssPaths: ['css/styles.css', 'components/utils/title/app-title.css']
})
