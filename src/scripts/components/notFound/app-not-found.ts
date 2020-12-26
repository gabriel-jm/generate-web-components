import { generateComponent } from '../../core/component-factory/index.js'

generateComponent(null, {
  tag: 'app-not-found',
  // @ts-ignore
  htmlPath: new URL('./not-found.html', import.meta.url).href
})
