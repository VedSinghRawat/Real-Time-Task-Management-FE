import { User } from '../entities/user.entity'
import apiService from './api.service'

class UserService {
  public static instance: UserService

  public static getInstance(): UserService {
    if (!this.instance) this.instance = new UserService()

    return this.instance
  }

  fetchMe(): Promise<User> {
    const me = apiService.methods.GET<User>({ urlSuffix: '/me' })
    return me
  }
}

export default UserService.getInstance()
