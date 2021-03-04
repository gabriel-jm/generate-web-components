import { api } from '../api/index.js'
import userService from './user-service.js'

export interface Post {
  content: string
  userId: number
  publishingDate: string
}

class PostsService {
  #path = '/posts'

  findAll() {
    return api.get(this.#path)
  }

  save(data: Post) {
    const existedUser = userService.find(data.userId)

    return !existedUser ? null : api.post(this.#path, data)
  }
}

export default new PostsService()
