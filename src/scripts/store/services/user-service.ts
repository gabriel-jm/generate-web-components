import { api } from '../api/index.js'

interface User {
  id: number
  name: string
  username: string
  password: string
}

class UserService {
  #path = '/users'

  findByUsernameAndPassword(data: Omit<User, 'name' | 'id'>) {
    const all = api.get(this.#path) as User[]

    const user = all.find((item: User) => (
      item.username === data.username &&
      item.password === data.password
    ))

    return user
  }

  save(data: Omit<User, 'id'>) {
    return api.post(this.#path, data)
  }

  getCurrentUser() {
    const user = localStorage.getItem('my-app:current-user')

    return user ? JSON.parse(user) : null
  }

  setCurrentUser(data: User) {
    localStorage.setItem('my-app:current-user', JSON.stringify(data))
  }
}

export default new UserService()
