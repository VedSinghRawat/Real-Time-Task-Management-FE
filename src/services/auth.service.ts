import { User } from '../entities/user.entity'
import { SignupDTO } from '../validators/auth/signup.validator'
import LocalStorageService from './localStorage.service'
import SupabaseService from './supabase.service'

export type LoginDTO = Omit<SignupDTO, 'username'>

export type AuthResponse = {
  access_token: string
  user: User
}

interface IAuthService {
  login: (data: LoginDTO) => Promise<AuthResponse>
  signup: (data: SignupDTO) => Promise<AuthResponse>
  fetchMe: () => Promise<{ user: User }>
}

class AuthService implements IAuthService {
  private static instance: AuthService

  static createInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  login = async (data: LoginDTO) => {
    const res = await SupabaseService.client.auth.signInWithPassword(data)
    if (res.error) throw res.error
    if (!res.data.user) throw new Error('No user found')

    const user = await SupabaseService.client.from('users').select('*').eq('id', res.data.user.id).single()
    if (!user.data) throw new Error('No user found')

    const session = res.data.session
    return {
      access_token: session.access_token,
      user: user.data,
    }
  }

  signup = async ({ username, ...payload }: SignupDTO) => {
    const { data, error } = await SupabaseService.client.auth.signUp({
      ...payload,
      options: {
        data: { username },
      },
    })
    if (error) throw error
    if (!data.session) throw new Error('No session found')
    if (!data.user) throw new Error('No user found')

    const user = await SupabaseService.client.from('users').select('*').eq('id', data.user.id).single()
    if (!user.data) throw new Error('No user found')

    const session = data.session
    return {
      access_token: session.access_token,
      user: user.data,
    }
  }

  fetchMe = async () => {
    const token = LocalStorageService.get('access_token')
    if (!token) throw 'No token found'

    const res = await SupabaseService.client.auth.getUser(token)
    if (res.error) {
      const refresh_token = LocalStorageService.get('refresh_token')
      if (!refresh_token) throw res.error

      const { data, error } = await SupabaseService.client.auth.refreshSession({
        refresh_token,
      })

      if (error) throw error
      if (!data.session) throw new Error('No session found')
      if (!data.user) throw new Error('No user found')

      const user = await SupabaseService.client.from('users').select('*').eq('id', data.user.id).single()
      if (!user.data) throw new Error('No user found')

      const session = data.session
      return {
        access_token: session.access_token,
        user: user.data,
      }
    }
    if (!res.data.user) throw new Error('No user found')

    const user = await SupabaseService.client.from('users').select('*').eq('id', res.data.user.id).single()
    if (!user.data) throw new Error('No user found')

    return { user: user.data }
  }
}

export default AuthService.createInstance()
