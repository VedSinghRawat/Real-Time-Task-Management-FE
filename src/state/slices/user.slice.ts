import { User } from '../../entities/user.entity'
import { ROUTES } from '../../routes'
import AuthService from '../../services/auth.service'
import UserService from '../../services/user.service'
import { StateSlice, actionCreatorGenerator } from '../store'

type Keys = {
  map: { [id: string]: User }
  meId: User['id'] | undefined
}

type Actions = {
  fetchMe: () => Promise<void>
  login: (...args: Parameters<typeof AuthService.login>) => Promise<void>
  signup: (...args: Parameters<typeof AuthService.signup>) => Promise<void>
}

export type UserSlice = Keys & Actions

export const userStateInit: { [key in keyof Keys | keyof Actions]: null } = {
  map: null,
  meId: null,
  fetchMe: null,
  login: null,
  signup: null,
}

export const createUserSlice: StateSlice<UserSlice> = (set) => {
  function meIdSetter<T extends { user: User }>(data: T) {
    set((state) => {
      state.user.meId = data.user.id
    })
  }
  const actionGenerator = actionCreatorGenerator('user', set)
  return {
    map: {},
    meId: undefined,

    fetchMe: actionGenerator(UserService.fetchMe, undefined, meIdSetter, () => {
      if (window.location.pathname !== ROUTES.LOGIN) window.location.href = ROUTES.LOGIN
    }),

    login: actionGenerator(AuthService.login, undefined, meIdSetter),
    signup: actionGenerator(AuthService.signup, undefined, meIdSetter),
  }
}
