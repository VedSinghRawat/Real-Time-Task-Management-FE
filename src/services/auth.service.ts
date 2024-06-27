import { User } from '../entities/user.entity'
import apiService from './api.service'

export interface LoginRequest {
  email: string
  password: string
}

export default class AuthService {
  static login = (data: LoginRequest) => apiService.methods.POST<{ access_token: string; user: User }>({ urlSuffix: '/login', data })

  static signup = (data: { username: string; email: string; password: string }) =>
    apiService.methods.POST<{ access_token: string; user: User }>({ urlSuffix: '/signup', data })
}
