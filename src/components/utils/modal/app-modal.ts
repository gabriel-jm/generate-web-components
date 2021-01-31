import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types.js'
import { css, html } from '/core/templates/index.js'

export interface Modal extends Component {
  show(): void
  close(): void
}

function Modal(element: Modal) {
  const container = element.select('div')

  element.show = () => element.setAttribute('open', '')
  element.close = () => {
    container.classList.add('closing')
    element.classList.add('closing')
  }

  element.addEventListener('animationend', e => {
    if(e.animationName === 'fade-out') {
      element.classList.remove('closing')
      element.removeAttribute('open')
    }
  })

  container.addEventListener('animationend', () => {
    container.classList.remove('closing')
  })
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
      animation: fade 0.3s;
    }

    :host([open]) div {
      animation: drop 0.3s;
    }

    :host(.closing[open]) {
      animation: fade-out 0.3s;
    }

    div {
      height: max-content;
      margin-top: 20px;
      background-color: white;
      padding: 28px;
      border-radius: 4px;
      box-shadow: 0 2px 3px #3336;
    }

    :host([open]) div.closing {
      animation: up 0.3s;
    }

    ::slotted(button) {
      outline: 0;
      cursor: pointer;
    }

    @keyframes fade {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes fade-out {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }

    @keyframes drop {
      from {
        transform: translateY(-30%);
        opacity: 0;
      }

      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes up {
      from {
        transform: translateY(0);
        opacity: 1;
      }

      to {
        transform: translateY(-30%);
        opacity: 0;
      }
    }
  `
})
