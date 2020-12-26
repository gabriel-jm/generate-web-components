import { findHtml } from '../html/find-html.js'
import { findCss, generateStyleTag } from '../styles/find-css.js'
import { generateTemplate } from '../html/generate-template.js'
import createComponent from './generate-component-class.js'

export interface ComponentConfigs {
  tag: string
  htmlPath?: string
  htmlString?: string
  cssPath?: string
  cssString?: string
  watchedAttrs?: string[]
  shadowDOM?: boolean
}

export async function generateComponent(
  actionsDefinition: Function | Object | null,
  configs: ComponentConfigs
) {
  const { tag, htmlPath, htmlString, cssPath, cssString } = configs
 
  if(customElements.get(tag)) return

  const template = await (async () => {
    if(!htmlString && !htmlPath) return null

    return htmlString
    ? generateTemplate(htmlString)
    : await findHtml(htmlPath || '')
  })()

  const styles = await (async () => {
    if(!cssPath && !cssString) return null

    const inline = cssString || ''
    const styles = cssPath
      ? await findCss(cssPath)
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
