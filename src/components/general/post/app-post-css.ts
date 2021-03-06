import { css } from '/core/templates/index.js'

export const appPostStyles = css`
  :host {
    display: block;
    padding: 12px 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #eee;
  }

  header {
    display: flex;
    align-items: center;
  }

  header h3 {
    margin: 0;
    margin-right: 12px;
    font-size: 1rem;
  }

  header span {
    font-size: 0.9rem;
    font-family: monospace;
    color: #a9a9a9;
  }
`
