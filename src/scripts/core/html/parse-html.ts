import { html } from '../templates/index.js'

async function loadHtml(path: string) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'text/html'
    }
  })

  const htmlString = await response.text()

  return htmlString
}

export async function getHtml(path: string) {
  try {
    const loadedHtml = await loadHtml(path)

    const parsedHtml = html([loadedHtml])

    return parsedHtml
  } catch(error) {
    console.error(error)

    return error.message
  }
}
