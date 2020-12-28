export function css(strings: TemplateStringsArray | string[], ...values: string[]) {
  const fullCss = strings.reduce((acc, str, index) => {
    return acc + str + (values[index] || "");
  }, "")

  const minifiedCss = fullCss.replace(/(?=[{|}|;|\n])\s+|\s+(?={)|\r+|\n+/g, '')

  return minifiedCss
}
