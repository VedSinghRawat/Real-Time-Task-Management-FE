import { User } from '../entities/user.entity'
import { SignupDTO } from '../validators/auth/signup.validator'
import apiService from './api.service'

export type LoginDTO = Omit<SignupDTO, 'username'>

export type AuthResponse = {
  access_token: string
  user: User
}

export default class AuthService {
  static login = (data: LoginDTO) => apiService.methods.POST<AuthResponse>({ urlSuffix: '/login', data })

  static signup = (data: SignupDTO) => apiService.methods.POST<AuthResponse>({ urlSuffix: '/signup', data })

  static fetchMe = () => apiService.methods.GET<Omit<AuthResponse, 'access_token'>>({ urlSuffix: '/me' })
}
