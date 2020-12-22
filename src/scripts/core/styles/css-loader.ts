import { css } from '../templates/index.js'

async function loadCss(path: string) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'text/css'
    }
  })

  const cssString = await response.text()
  return cssString
}

export async function getCss(path: string) {
  try {
    const loadedCss = await loadCss(path)

    const parsedCss = css([loadedCss])
    return parsedCss
  }
  catch(catchedError) {
    console.error(catchedError)
    return catchedError.message
  }
}
