import './post-feed/index.js'
import './new-post-modal/index.js'
import { Modal } from '/components/utils/modal/app-modal.js'
import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types.js'
import router from '/core/router/index.js'
import { css } from '/core/templates/index.js'
import { globalConfigs } from '/store/global.js'

function dashboard(element: Component) {
  const title = element.select('h2')

  if(!globalConfigs.currentUser) {
    router.go('/')
  }

  function setWellcomeMessage() {
    const { currentUser } = globalConfigs
    title.innerText = `Bem vindo! ${currentUser?.name}`
  }
  
  setWellcomeMessage()

  globalConfigs.on('userChange', setWellcomeMessage)

  element.select('.btn').addEventListener('click', () => {
    (element.select('new-post-modal') as Modal).show()
  })
}

generateComponent(dashboard, {
  tag: 'app-dashboard',
  htmlPath: 'components/pages/dashboard/app-dashboard.html',
  cssString: css`
    :host {
      display: block;
      max-width: 1300px;
      margin: auto;
    }
  `
})
