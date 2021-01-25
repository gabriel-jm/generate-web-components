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
    const existedUser = api
      .get(this.#path)
      .find((user: User) => user.username === data.username)
    ;

    return existedUser ? null : api.post(this.#path, data)
  }

  getCurrentUser() {
    const user = localStorage.getItem('my-app:current-user')

    return user ? JSON.parse(user) : null
  }

  setCurrentUser(data: User) {
    localStorage.setItem('my-app:current-user', JSON.stringify(data))
  }

  logout() {
    localStorage.removeItem('my-app:current-user')
  }
}

export default new UserService()
