export interface AttributeChangeDef {
  name: string
  oldValue: any
  newValue: any
}

export type attrChangeCallback = (attribute: AttributeChangeDef) => void

export type attributeChangeListenerAdder = (
  attributeName: string,
  callback: attrChangeCallback
) => void

export interface ComponentActions {
  init?(): void
  remove?(): void
  attrChange?: attrChangeCallback
  render?(): string
}

export type FunctionComponentAction = (
  element: HTMLElement,
  addAttributeListener: attributeChangeListenerAdder
) => undefined | VoidFunction

export type attrChangeListener = (attrName: string, callback: attrChangeCallback) => void

interface ComponentAddOns {
  select(query: string): HTMLElement
  root: ShadowRoot
  [key: string]: any
}

export type Component = HTMLElement & ComponentAddOns

export class ComponentClass {
  protected readonly element!: Component
  protected readonly select!: (query: string) => HTMLElement
  protected readonly root!: HTMLElement
  protected readonly onAttributeChange!: attributeChangeListenerAdder
}

export type ComponentObject = {
  readonly element: Component
  readonly select: (query: string) => HTMLElement
  readonly root: HTMLElement
  readonly onAttributeChange: attributeChangeListenerAdder
}
