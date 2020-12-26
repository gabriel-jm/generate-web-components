import { api } from '../api/index.js'

interface User {
  name: string
  username: string
  password: string
}

class UserService {
  #path = '/users'

  findByUsernameAndPassword(data: Omit<User, 'name'>) {
    const all = api.get(this.#path) as User[]

    const user = all.find((item: User) => (
      item.username === data.username &&
      item.password === data.password
    ))

    return user
  }

  save(data: User) {
    return api.post(this.#path, data)
  }
}

export default new UserService()
