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

    return cssString
      ? generateStyleTag(styles)
      : await findCss(cssPath || '')
  })()

  if(styles) {
    template?.appendChild(styles)
  }

  const Component = createComponent(template, actionsDefinition, configs)
  
  customElements.define(tag, Component)
}
