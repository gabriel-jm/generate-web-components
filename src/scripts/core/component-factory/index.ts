import { findHtml } from '../html/find-html.js'
import { findCss, generateStyleTag } from '../styles/find-css.js'
import { generateTemplate } from '../html/generate-template.js'
import createComponent from './generate-component-class.js'

export interface ComponentConfigs {
  tag: string
  htmlPath?: string
  htmlString?: string
  cssPaths?: string[]
  cssString?: string
  watchedAttrs?: string[]
  shadowDOM?: boolean
}

export async function generateComponent(
  actionsDefinition: Function | Object | null,
  configs: ComponentConfigs
) {
  const { tag, htmlPath, htmlString, cssPaths, cssString } = configs
 
  if(customElements.get(tag)) return

  const template = await (async () => {
    if(!htmlString && !htmlPath) return null

    return htmlString
    ? generateTemplate(htmlString)
    : await findHtml(htmlPath || '')
  })()

  const styles = await (async () => {
    if(!cssPaths && !cssString) return null

    const inline = cssString || ''
    const styles = cssPaths
      ? await findCss(cssPaths)
      : document.createElement('style')
    ;

    styles.innerHTML += inline
    return styles
  })()

  if(styles) {
    template?.content.insertBefore(
      styles,
      template.firstChild as Node
    )
  }

  const Component = createComponent(template, actionsDefinition, configs)
  
  customElements.define(tag, Component)
}
