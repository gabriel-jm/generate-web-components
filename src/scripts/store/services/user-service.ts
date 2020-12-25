import { api } from '../api/index.js'

interface User {
  name: string
  username: string
  password: string
}

class UserService {
  path = '/users'

  save(data: User) {
    return api.post(this.path, data)
  }
}

export default new UserService()
