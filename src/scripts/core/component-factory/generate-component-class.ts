import isClass from '../assertions/is-class.js'
import { ComponentConfigs } from './index.js'
import {
  attrChangeCallback,
  AttributeChangeDef,
  ComponentActions,
  ComponentObject,
  FunctionComponentAction
} from './types'

export default (
  template: HTMLTemplateElement | null,
  actionsDef: Function | Object | ObjectConstructor | null,
  configs: ComponentConfigs
) => {
  const { watchedAttrs, shadowDOM = true  } = configs
  const kAttributesShortcuts = Symbol('kAttributesShortcuts')
  const kInnerHTML = Symbol('kInnerHTML')
  const kGenerateActions = Symbol('kGenerateActions')
  
  const Component = class extends HTMLElement {
    #actions: ComponentActions & { [key: string]: any } | FunctionComponentAction | null = null
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
      this[kGenerateActions]()

      this[kAttributesShortcuts]()

      this[kInnerHTML]()
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

      this.root.innerHTML = ''
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
            get: () => this.getAttribute(attr),
            set: (value) => this.setAttribute(attr, value)
          })
          
          if(typeof this.#actions === 'object') {
            Object.defineProperty(this.#actions, attr, {
              get: () => this.getAttribute(attr),
              set: (value) => this.setAttribute(attr, value)
            })
          }
        })
      }
    }

    [kGenerateActions]() {
      if(!actionsDef) return

      this.#actions = isClass(actionsDef)
        ? new (actionsDef as ObjectConstructor)()
        : actionsDef
      ;

      if(typeof this.#actions === 'object') {
        this.#actions.element = this
        this.#actions.select = this.select.bind(this)
        this.#actions.onAttributeChange = this.#addAttributeListener
      }
    }

    [kInnerHTML]() {
      if(template) {
        if(shadowDOM) {
          this.shadowRoot?.appendChild(
            template.content.cloneNode(true)
          )
        } else {
          this.innerHTML = template.innerHTML
        }
      }

      if(
        this.#actions &&
        typeof this.#actions === 'object' &&
        this.#actions.render
      ) {
        this.root.innerHTML = this.#actions.render()
      }
    }

  }

  return Component
}
