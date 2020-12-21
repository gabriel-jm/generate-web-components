import { generateComponent } from '../../core/component-factory/index.js'
import { html } from '../../core/html/html-template.js'

function Home () {

}

generateComponent(Home, {
  tag: 'app-home',
  htmlString: html`
    <form>
      <input type="text" />
      <input type="text" />
      <button>LogIn</button>
    </form>
  `
})
