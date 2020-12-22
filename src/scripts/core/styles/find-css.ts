import { getCss } from './css-loader.js'

interface cssRegister {
  path: string
  css: string
}

const cssCache: Array<cssRegister> = []

export function generateStyleTag(css: string) {
  const style = document.createElement('style')
  style.innerHTML = css

  return style
}

export async function findCss(path: string) {
  const findByPath = (comp: cssRegister) => comp.path === path
  const existingCss = cssCache.find(findByPath)

  if(existingCss) {
    return generateStyleTag(existingCss.css)
  }

  const css = await getCss(path)
  cssCache.push({ path, css })

  return generateStyleTag(css)
}
