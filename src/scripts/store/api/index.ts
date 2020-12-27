import generateId from './generate-id.js'

const prefix = 'my-app:'

export const api = {
  
  get(path: string, id?: number) {
    const response = localStorage.getItem(prefix + path) || '[]'
    
    if(id) {
      return JSON.parse(response).find(
        (item: any) => item.id === id
      )
    }

    return JSON.parse(response)
  },

  post(path: string, data: any) {
    const allItems = this.get(path)
    data.id = generateId(allItems)

    allItems.push(data)

    localStorage.setItem(prefix + path, JSON.stringify(allItems))

    return data
  },

  put(path: string, data: any) {
    const allItems = this.get(path)
    const item = allItems.find(
      item => item.id = data.id
    )

    Object.assign(item, data)

    localStorage.setItem(prefix + path, JSON.stringify(allItems))

    return item
  },

  delete(path: string, id: number) {
    const allItems = this.get(path)
    const filtered = allItems.filter(
      item => item.id !== id
    )

    localStorage.setItem(prefix + path, JSON.stringify(filtered))
  }

}
