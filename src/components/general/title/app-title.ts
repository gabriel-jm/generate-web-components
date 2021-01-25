import { generateComponent } from '/core/component-factory/index.js'
import { html, raw } from '/core/templates/index.js'
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
      
      return true
    }

    globalConfigs.logIn()
  },

  init() {
    this.configLogInAndLogOut()
  },

  get logInDetails() {
    return raw`
      <div class="user-details-container">
        <span>
          ${globalConfigs.currentUser?.name as string}
        </span>

        <app-user-info />
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
  cssPaths: ['css/styles.css', 'components/general/title/app-title.css']
})
