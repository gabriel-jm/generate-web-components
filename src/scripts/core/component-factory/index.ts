import { findHtml } from '../html/find-html.js'
import { generateTemplate } from '../html/generate-template.js'
import createComponent from './generate-component-class.js'

export interface ComponentConfigs {
  tag: string
  htmlPath?: string
  htmlString?: string
  watchedAttrs?: string[]
  shadowDOM?: boolean
}

export async function generateComponent(
  actionsDefinition: Function | Object | null,
  configs: ComponentConfigs
) {
  const { tag, htmlPath, htmlString } = configs
 
  if(customElements.get(tag)) return

  const template = await (async () => {
    if(!htmlString && !htmlPath) return null

    return htmlString
    ? generateTemplate(htmlString)
    : await findHtml(htmlPath || '')
  })()

  const Component = createComponent(template, actionsDefinition, configs)
  
  customElements.define(tag, Component)
}
