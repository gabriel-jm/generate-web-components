import { generateComponent } from '/core/component-factory/index.js'
import { UserInfo } from './app-user-info-actions.js'

generateComponent(UserInfo, {
  tag: 'app-user-info',
  cssPaths: [
    'css/styles.css',
    '_DIRNAME/app-user-info.css'
  ]
})
