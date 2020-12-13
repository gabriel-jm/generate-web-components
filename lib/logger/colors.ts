const prefix = '\x1b['

type Colors = {
  reset: (text: string) => string
  bold: (text: string) => string
  underline: (text: string) => string
  red: (text: string) => string
  cyan: (text: string) => string
  yellow: (text: string) => string
  gray: (text: string) => string
}

const colors = <Colors> {
  reset: (text) => `${prefix}0m${text ? text : ''}`,
  bold: (text) => `${prefix}1m${text}${prefix}22m`,
  underline: (text) => `${prefix}4m${text}${prefix}22m`,

  red: (text) => `${prefix}91m${text}${prefix}39m`,
  cyan: (text) => `${prefix}96m${text}${prefix}39m`,
  yellow: (text) => `${prefix}93m${text}${prefix}39m`,
  gray: (text) => `${prefix}1m${prefix}30m${text}${prefix}0m`
}

export default colors
