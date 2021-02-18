import { Modal } from '/components/utils/modal/app-modal.js'
import { generateComponent } from '/core/component-factory/index.js'
import { Component } from '/core/component-factory/types.js'
import { css, html } from '/core/templates/index.js'

function NewPostModal(element: Component) {
  const modal = element.select('app-modal') as Modal
  element.show = () => modal.show()
  element.close = () => modal.close()

  element.select('[close-modal]').addEventListener('click', element.close)
  element.select('.btn[close-modal]').addEventListener('click', element.close)
}

generateComponent(NewPostModal, {
  tag: 'new-post-modal',
  htmlString: html`
    <app-modal>
      <header>
        <h3>Create a new Post</h3>
        <span close-modal>X</span>
      </header>

      <section>
        <textarea placeholder="Write about your post..."></textarea>
      </section>

      <footer>
        <button class="btn">Done</button>
        <button class="btn" close-modal>Cancel</button>
      </footer>
    </app-modal>
  `,
  cssString: css`
    app-modal::part(container) {
      padding: 0;
      max-width: 400px;
      min-width: 250px;
      margin: 8px;
    }

    header {
      padding: 12px 20px;
      border-bottom: 1px solid #3333;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    header h3 {
      display: inline;
      margin: 0;
      font-size: 1.3rem;
    }

    header span {
      cursor: pointer;
      font-weight: bold;
    }

    section {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 20px;
    }

    section textarea {
      border: 0;
      width: 400px;
      height: 150px;
      resize: none;
      outline: 0;
    }

    footer {
      padding: 12px 20px;
      text-align: right;
      border-top: 1px solid #3333;
    }

    footer .btn + .btn {
      margin-left: 16px;
    }
  `
})
