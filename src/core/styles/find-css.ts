import { getCss } from './css-loader.js'

const cssCache: { [key: string]: string } = {}

export function generateStyleTag(css: string) {
  const style = document.createElement('style')
  style.innerHTML = css

  return style
}

export async function findCss(paths: string[]) {
  const allStylesPromises = paths.map(path => findSingleCss(path))
  
  const allStyles = await Promise.all(allStylesPromises)

  const style = allStyles.reduce((acc, styles) => {
    return acc + (styles || '')
  }, '')

  return generateStyleTag(style)
}

export async function findSingleCss(path: string) {
  if(path in cssCache) {
    return cssCache[path]
  }

  const css = await getCss(path)
  cssCache[path] = css

  return css
}
