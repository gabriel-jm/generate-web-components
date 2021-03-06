const regExp = /<([a-zA-Z0-9\-]+)\s(.*)\/>/g

export class RawHTML {
  isSafe: boolean

  constructor(public html: string) {
    this.isSafe = true
  }

  valueOf() {
    return this.html
  }
}

export function raw(strings: TemplateStringsArray | string[], ...values: string[]) {
  const fullHtml = strings.reduce((acc, str, index) => {
    const value = values && values[index] ? values[index] : ''
    return acc + str + value
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

  return new RawHTML(parsedHtml)
}
