import { generateComponent } from '/core/component-factory/index.js'
import { UserInfo } from './app-user-info-actions.js'

generateComponent(UserInfo, {
  tag: 'app-user-info',
  cssPaths: [
    'css/styles.css',
    'components/utils/user-info/app-user-info.css'
  ]
})
