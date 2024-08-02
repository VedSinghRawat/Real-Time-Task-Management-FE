import { User } from '../entities/user.entity'
import apiService from './api.service'

export type RegisterRequest = {
  username: string
  email: string
  password: string
}

export type LoginRequest = Omit<RegisterRequest, 'username'>

export type AuthResponse = {
  auth_token: string
  user: User
}

export default class AuthService {
  static login = (data: LoginRequest) => apiService.methods.POST<AuthResponse>({ urlSuffix: '/login', data })

  static signup = (data: RegisterRequest) => apiService.methods.POST<AuthResponse>({ urlSuffix: '/signup', data })

  static fetchMe = () => apiService.methods.GET<Omit<AuthResponse, 'access_token'>>({ urlSuffix: '/me' })
}
