import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types.js'
import { css, html } from '/core/templates/index.js'

export interface Modal extends Component {
  show(): void
  close(): void
}

function Modal(element: Modal) {
  element.show = () => element.setAttribute('open', '')
  element.close = () => element.removeAttribute('open')
}

generateComponent(Modal, {
  tag: 'app-modal',
  watchedAttrs: ['open'],
  htmlString: html`
    <div part="container">
      <slot />
    </div>
  `,
  cssString: css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #3333;
    }

    :host([open]) {
      display: flex;
      justify-content: center;
    }

    div {
      height: max-content;
      margin-top: 20px;
      background-color: white;
      padding: 28px;
      border-radius: 4px;
      box-shadow: 0 2px 3px #3336;
    }

    ::slotted(button) {
      outline: 0;
      cursor: pointer;
    }
  `
})
