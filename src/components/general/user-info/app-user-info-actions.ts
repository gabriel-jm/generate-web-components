import { Modal } from '../../utils/modal/app-modal.js'
import { ComponentClass } from '/core/component-factory/types.js'
import { html } from '/core/templates/index.js'
import { globalConfigs } from '/store/global.js'

export class UserInfo extends ComponentClass {
  init() {
    const modal = this.select('app-modal') as Modal
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

    this.select('[settings]').addEventListener('click', () => {
      modal.show()
    })

    this.select('.close-modal').addEventListener('click', () => {
      modal.close()
    })
  }

  render() {
    return html`
      <div class="more" tabindex="0">
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="${24 * 0.25}" r="1"></circle>
          <circle cx="12" cy="${24 * 0.5}" r="1"></circle>
          <circle cx="12" cy="${24 * 0.75}" r="1"></circle>
        </svg>

        <ul class="user-options">
          <li settings>Settings</li>
          <li log-out>Log out</li>
        </ul>
      </div>

      <app-modal class="user-modal">
        <h2>User Info</h2>

        <button class="close-modal">close modal</button>
      </app-modal>
    `
  }
}
