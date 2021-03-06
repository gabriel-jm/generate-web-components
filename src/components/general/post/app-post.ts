import { appPostStyles } from './app-post-css.js'
import { generateComponent } from '/core/component-factory/index.js'
import { ComponentClass } from '/core/component-factory/types.js'
import { html } from '/core/templates/index.js'

class Post extends ComponentClass {

  get parseDate() {
    const publishDate = this.element.getAttribute('publishing-date')
    const date = new Date(publishDate || '')

    return date.toLocaleDateString()
  }

  render() {
    return html`
      <style>${appPostStyles}</style>

      <header>
        <h3>${this.element.getAttribute('username') || 'Name'}</h3>
        <span>${this.parseDate}</span>
      </header>

      <div>${this.element.getAttribute('content') || ''}</div>
    `
  }
}

generateComponent(Post, {
  tag: 'app-post'
})
