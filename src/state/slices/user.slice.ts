import { User } from '../../entities/user.entity'
import { ROUTES } from '../../routes'
import AuthService from '../../services/auth.service'
import UserService from '../../services/user.service'
import { ApiAction, StateSlice, actionCreatorGenerator } from '../store'

type Keys = {
  map: { [id: string]: User }
  meId: User['id'] | undefined
  loading: boolean
}

type Actions = {
  fetchMe: () => Promise<void>
  login: ApiAction<typeof AuthService.login>
  signup: ApiAction<typeof AuthService.signup>
}

export type UserSlice = Keys & Actions

export const userStateInit: { [key in keyof Keys | keyof Actions]: null } = {
  map: null,
  meId: null,
  loading: null,
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
    loading: false,

    fetchMe: actionGenerator(
      UserService.fetchMe,
      () =>
        set((state) => {
          state.pageLoading = true
        }),
      meIdSetter,
      () => {
        if (window.location.pathname !== ROUTES.LOGIN) window.location.href = ROUTES.LOGIN
      }
    ),

    login: actionGenerator(AuthService.login, undefined, meIdSetter),
    signup: actionGenerator(AuthService.signup, undefined, meIdSetter),
  }
}
