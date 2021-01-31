import { api } from '../api/index.js'

export interface User {
  id: number
  name: string
  username: string
  password: string
}

class UserService {
  #path = '/users'

  find(data: number) {
    return api.get(this.#path, data) || null
  }

  findByUsernameAndPassword(data: Omit<User, 'name' | 'id'>) {
    const all = api.get(this.#path) as User[]

    const user = all.find((item: User) => (
      item.username === data.username &&
      item.password === data.password
    ))

    return user
  }

  save(data: Omit<User, 'id'>) {
    const existedUser = api
      .get(this.#path)
      .find((user: User) => user.username === data.username)
    ;

    return existedUser ? null : api.post(this.#path, data)
  }

  update(data: User) {
    const existedUser = this.find(data.id)

    if(!existedUser) return null

    return api.put(this.#path, data)
  }

  getCurrentUser() {
    const userId = localStorage.getItem('my-app:current-user')

    return this.find(Number(userId))
  }

  setCurrentUser(userId: number) {
    localStorage.setItem('my-app:current-user', userId.toString())
  }

  logout() {
    localStorage.removeItem('my-app:current-user')
  }
}

export default new UserService()
