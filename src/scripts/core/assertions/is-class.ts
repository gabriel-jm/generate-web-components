export default (jsStructure: Function | Object) => {
  const isFunction = typeof jsStructure === 'function'
  const isClass = jsStructure.toString().slice(0, 5) === 'class'
  
  return isFunction && isClass
}
