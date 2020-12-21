export function css(strings: TemplateStringsArray | string[], ...values: string[]) {
  const fullCss = strings.reduce((acc, str, index) => {
    return acc + str + (values[index] || "");
  }, "")

  return fullCss
}
