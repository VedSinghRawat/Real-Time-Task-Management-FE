import { User } from '../../entities/user.entity'
import ROUTES from '../../routes'
import AuthService from '../../services/auth.service'
import LocalStorageService from '../../services/localStorage.service'
import { safeNav } from '../../utils'
import { ApiAction, StateSlice, actionCreatorGenerator } from '../store'

type Keys = {
  map: { [id: string]: User }
  // null means that we have checked if the user is logged in and the user is not logged in
  meId: User['id'] | null | undefined
  loading: boolean
}

type Actions = {
  fetchMe: () => Promise<void>
  login: ApiAction<typeof AuthService.login>
  signup: ApiAction<typeof AuthService.signup>
}

export type UserSlice = Keys & Actions

export const createUserSlice: StateSlice<UserSlice> = (set) => {
  function authSuccess<T extends { user: User; access_token?: string }>(data: T) {
    set((state) => {
      state.user.meId = data.user.id
      state.pageLoading = false
    })
    if (data.access_token) LocalStorageService.set('access_token', data.access_token)
    safeNav(ROUTES.home)
  }

  const actionGenerator = actionCreatorGenerator('user', set)

  return {
    map: {},
    meId: undefined,
    loading: false,

    fetchMe: actionGenerator(AuthService.fetchMe, {
      beforeReq: () =>
        set((state) => {
          state.pageLoading = true
        }),
      onSuccess: authSuccess,
      onError: () => {
        set((state) => {
          state.pageLoading = false
          state.user.loading = false
          state.user.meId = null
        })
        safeNav(ROUTES.login)
      },
    }),

    login: actionGenerator(AuthService.login, {
      onSuccess: authSuccess,
    }),

    signup: actionGenerator(AuthService.signup, {
      onSuccess: authSuccess,
    }),
  }
}
