function generate(arr: any[]) {
  let result = 0
  const ids = arr.map(item => item.id)

  for(const i in ids) {
    const index = Number(i)
    const existedId = ids.some(id => id === index + 1)

    if(!existedId) result = index + 1 
  }

  return result > 0 ? result : arr.length + 1
}

export default generate
