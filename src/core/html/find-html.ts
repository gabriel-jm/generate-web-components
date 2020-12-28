import { generateTemplate } from './generate-template.js'
import { getHtml } from './html-loader.js'

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

  const html = await getHtml(path)
  htmlCache.push({ path, html })

  return generateTemplate(html)
}
