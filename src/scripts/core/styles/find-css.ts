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

export async function findCss(paths: string[]) {
  const allStyles = await Promise.all(
    paths.map(path => findSingleCss(path))
  )

  const style = allStyles.reduce((acc, styles) => {
    return acc + (styles || '')
  }, '')

  return generateStyleTag(style)
}

export async function findSingleCss(path: string) {
  const findByPath = (comp: cssRegister) => comp.path === path
  const existingCss = cssCache.find(findByPath)

  if(existingCss) {
    return existingCss.css
  }

  const css = await getCss(path)
  cssCache.push({ path, css })

  return css
}
