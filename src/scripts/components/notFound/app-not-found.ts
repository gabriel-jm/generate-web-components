import { generateComponent } from '../../core/component-factory/index.js'

generateComponent(null, {
  tag: 'app-not-found',
  htmlPath: new URL('./not-found.html', import.meta.url).href
})
