import { generateTemplate } from './generate-template.js'
import { getHtml } from './parse-html.js'

interface htmlRegister {
  path: string
  html: string
}

const htmlCache: Array<htmlRegister> = []

export async function findHtml(path: string) {
  const findByPath = (comp: htmlRegister) => comp.path === path
  const existingHtml = htmlCache.find(findByPath)

  if(existingHtml) {
    return generateTemplate(existingHtml.html)
  }

  const htmlData = await getHtml(path)
  
  const regex = /(?=[>|\n])\s+|\r+/g
  const html = htmlData.replace(regex, "")
  htmlCache.push({ path, html })

  return generateTemplate(html)
}
