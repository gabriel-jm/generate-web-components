import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types.js'
import router from '/core/router/index.js'
import { globalConfigs } from '/store/global.js'

function dashboard(element: Component) {
  if(!globalConfigs.currentUser) {
    router.go('/')
  }

  function setWellcomeMessage() {
    const { currentUser } = globalConfigs
    element.select('h2').innerText = `Bem vindo! ${currentUser?.name}`
  }

  globalConfigs.on('userChange', setWellcomeMessage)

  setWellcomeMessage()
}

generateComponent(dashboard, {
  tag: 'app-dashboard',
  cssPaths: ['css/styles.css'],
  htmlPath: 'components/pages/dashboard/app-dashboard.html'
})
