import { generateComponent } from '../../core/component-factory/index.js'
import { html } from '../../core/templates/index.js'

function Home() {

}

generateComponent(Home, {
  tag: 'app-home',
  htmlString: html`
    <form>
      <input type="text" />
      <input type="text" />
      <button>LogIn</button>
    </form>

    <app-link href="/register">teste</app-link>
  `,
  cssPath: 'scripts/components/home/home.css'
})
