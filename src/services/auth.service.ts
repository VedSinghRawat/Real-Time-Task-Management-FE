import { User } from '../entities/user.entity'
import apiService from './api.service'

class AuthService {
  public static instance: AuthService

  public static getInstance(): AuthService {
    if (!this.instance) this.instance = new AuthService()

    return this.instance
  }

  async login(data: { email: string; password: string }) {
    const user = apiService.methods.POST<User>({ urlSuffix: '/login', data })
    return user
  }

  async signup(data: { username: string; email: string; password: string }) {
    const user = apiService.methods.POST<User>({ urlSuffix: '/signup', data })
    return user
  }
}

export default AuthService.getInstance()
