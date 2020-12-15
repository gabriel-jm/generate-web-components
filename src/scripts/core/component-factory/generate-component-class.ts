import isClass from '../assertions/is-class.js'
import { ComponentConfigs } from './index.js'
import {
  attrChangeCallback,
  AttributeChangeDef,
  ComponentActions,
  FunctionComponentAction
} from './types'

export default (
  template: HTMLTemplateElement,
  actionsDef: Function | Object | ObjectConstructor | null,
  configs: ComponentConfigs
) => {
  const { watchedAttrs, shadowDOM = true  } = configs
  const kAttributesShortcuts = Symbol('kAttributesShortcuts')
  
  const Component = class extends HTMLElement {
    #actions: ComponentActions | FunctionComponentAction | null = null
    #removeCallback?: (element: HTMLElement) => void
    #attrCallbacks = new Map()

    constructor() {
      super()
  
      this.init()
    }

    static get observedAttributes() {
      return watchedAttrs || []
    }

    get root() {
      if(this.shadowRoot) {
        return this.shadowRoot
      }

      return this
    }

    select(query: string) {
      return this.shadowRoot
        ? this.shadowRoot.querySelector(query)
        : this.querySelector(query)
    }

    #addAttributeListener = (attrName: string, callback: attrChangeCallback) => {
      this.#attrCallbacks.set(attrName, callback)
    }
  
    init() {
      shadowDOM && this.attachShadow({ mode: 'open' })

      this[kAttributesShortcuts]()

      if(shadowDOM) {
        this.shadowRoot?.appendChild(
          template.content.cloneNode(true)
        )
      } else {
        this.innerHTML = template.innerHTML
      }

      if(!actionsDef) return

      this.#actions = isClass(actionsDef)
        ? new (actionsDef as ObjectConstructor)()
        : actionsDef
      ;

      if(typeof this.#actions === 'object') {
        Object.defineProperties(this.#actions, {
          element: {
            value: this,
            enumerable: true
          },
          select: {
            value: this.select.bind(this)
          },
          onAttributeChange: {
            value: this.#addAttributeListener
          }
        })
      }
    }
  
    async connectedCallback() {
      if(!this.#actions) return

      if(typeof this.#actions === 'object') {
        this.#actions.init && this.#actions.init()
      }

      if(typeof this.#actions === 'function') {
        this.#removeCallback = this.#actions(this, this.#addAttributeListener)
      }
    }

    disconnectedCallback() {
      if(!this.#actions) return

      if(typeof this.#actions === 'object') {
        this.#actions.remove && this.#actions.remove()
      }

      if(typeof this.#actions === 'function') {
        this.#removeCallback && this.#removeCallback(this)
      }
    }

    attributeChangedCallback(attrName: string, oldValue: any, newValue: any) {
      if(!this.#actions) return

      const attribute = <AttributeChangeDef> {
        name: attrName,
        oldValue,
        newValue
      }
      
      if(typeof this.#actions === 'object') {
        this.#actions.attrChange && this.#actions.attrChange(attribute)
      }

      const attrChangeCallback = this.#attrCallbacks.get(attrName)
      
      if(attrChangeCallback) {
        attrChangeCallback(attribute)
      }
    }

    [kAttributesShortcuts]() {
      if(watchedAttrs) {
        watchedAttrs.forEach(attr => {
          Object.defineProperty(this, attr, {
            get: () => {
              return this.getAttribute(attr)
            },
            set: (value) => {
              return this.setAttribute(attr, value)
            }
          })
        })
      }
    }
  }

  return Component
}