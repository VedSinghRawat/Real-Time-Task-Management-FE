import { User } from '../entities/user.entity'
import apiService from './api.service'

export default class UserService {
  static fetchMe = () => apiService.methods.GET<{ user: User }>({ urlSuffix: '/me' })
}
