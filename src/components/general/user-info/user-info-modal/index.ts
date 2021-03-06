import { generateComponent } from '/core/component-factory/index.js'
import { ComponentClass } from '/core/component-factory/types.js'
import { css, html } from '/core/templates/index.js'
import { globalConfigs } from '/store/global.js'
import { Modal } from '/components/utils/modal/app-modal.js'
import userService from '/store/services/user-service.js'

class UserInfoModal extends ComponentClass {
  modal!: Modal

  init() {
    this.user = globalConfigs.currentUser
    this.modal = this.element.select('app-modal') as Modal
    this.setApi()

    const form = this.select('.user-modal-form') as HTMLFormElement
    this.editBtn = this.select('.user-modal-actions > button')
    this.saveBtn = this.select('[save-edit]')
    this.cancelEditBtn = this.select('[cancel-edit]')
    this.inputs = [
      form.querySelector('input[name=name]'),
      form.username,
      form.password
    ] as HTMLInputElement[]

    this.inputs[0].value = globalConfigs.currentUser?.name || ''
    this.inputs[1].value = globalConfigs.currentUser?.username || ''

    this.saveBtn.classList.add('hide')
    this.cancelEditBtn.classList.add('hide')

    this.select('.close-modal').addEventListener('click', () => {
      this.modal.close()
    })

    this.editBtn.addEventListener('click', () => {
      this.inputs.forEach(input => input.removeAttribute('disabled'))

      this.editBtn.classList.add('hide')
      this.saveBtn.classList.remove('hide')
      this.cancelEditBtn.classList.remove('hide')
    })

    this.cancelEditBtn.addEventListener('click', () => this.disableInputs())
    this.saveBtn.addEventListener('click', () => this.submitForm())
  }

  setApi() {
    this.element.show = () => this.modal.show()
    this.element.close = () => this.modal.close()
  }

  disableInputs() {
    this.inputs.forEach(input => input.setAttribute('disabled', ''))

    this.editBtn.classList.remove('hide')
    this.saveBtn.classList.add('hide')
    this.cancelEditBtn.classList.add('hide')
  }

  submitForm() {
    const id = this.user?.id as number
    const [name, username, password] = this.inputs

    if(!name.value || !username.value) {
      throw new Error('Only new password can be empty')
    }

    const user = userService.find(id)

    const userUpdated = userService.update({
      id,
      name: name.value,
      username: username.value,
      password: password.value || user?.password
    })

    if(!userUpdated) {
      throw new Error('Unenable to update your credentials')
    }

    globalConfigs.currentUser = userUpdated
    this.disableInputs()
    this.modal.close()
  }

  render() {
    return html`
      <app-modal class="user-modal">
        <div class="user-modal-header">
          <h2>User Info</h2>
          <button class="close-modal">X</button>
        </div>

        <form class="user-modal-form">
          <label>
            <span>Name</span>
            <input name="name" disabled />
          </label>

          <label>
            <span>Username</span>
            <input name="username" disabled />
          </label>

          <label>
            <span>New Password</span>
            <input
              type="password"
              name="password"
              disabled
              placeholder="****"
            />
          </label>
        </form>

        <div class="user-modal-actions">
          <button class="btn" edit>Edit</button>
          <button class="btn" save-edit>Save</button>
          <button class="btn" cancel-edit>Cancel</button>
        </div>
      </app-modal>
    `
  }
}

generateComponent(UserInfoModal, {
  tag: 'user-info-modal',
  cssPaths: ['css/styles.css'],
  cssString: css`
    .user-modal::part(container) {
      width: 450px;
      margin: 8px;
      color: #333;
    }
    
    .user-modal-header {
      color: #333;
      margin: 0 0 20px;
      border-bottom: 1px solid #555;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .user-modal-header h2 {
      margin: 0;
    }
    
    .user-modal-header button {
      color: inherit;
      font-size: 1.2rem;
      font-weight: bold;
      border: 0;
      background-color: transparent;
      cursor: pointer;
    }
    
    .user-modal-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .user-modal-form span {
      display: block;
      width: max-content;
    }

    .user-modal-form label {
      width:max-content;
    }
    
    .user-modal-actions {
      margin-top: 20px;
      text-align: right;
      border-top: 1px solid #5554;
      padding-top: 17px;
    }

    .user-modal-actions button {
      width: 80px;
    }
    
    .user-modal-actions button + button {
      margin-left: 20px;
    }

    .hide {
      display: none
    }

    @media screen and (max-width: 425px) {
      .user-modal-form {
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }
  `
})
