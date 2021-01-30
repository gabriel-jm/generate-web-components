import { RawHTML } from './raw-html-template.js'

const regExp = /<([a-zA-Z0-9\-]+)\s(.*)\/>/g

type htmlValues = (number | boolean | string | RawHTML)[]

export function html(strings: TemplateStringsArray | string[], ...values: htmlValues) {
  values = values.map((value) => {
    if(value instanceof RawHTML) {
      return value.isSafe ? value.html : ''
    }

    return !value
      ? ''
      : value
        .toString()
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/javascript:/, '')
  })

  const fullHtml = strings.reduce((acc, str, index) => {
    return acc + str + (values[index] || "");
  }, "")

  const parsedHtml = fullHtml
    .replace(
      regExp,
      (_fullResult, name, attrs) => {
        if(!name.includes('-')) return _fullResult

        const attributes = attrs.trim() ? ` ${attrs.trim()}` : ""

        return `<${name}${attributes}></${name}>`
      }
    )
    .replace(/<(slot)(.*?)\/>/g, '<$1$2></$1>')
    .replace(/\r|\n/g, '')
    .replace(/>(\s+)</g, '><')
    .replace(/\s+/g, ' ')
  ;

  return parsedHtml
}
