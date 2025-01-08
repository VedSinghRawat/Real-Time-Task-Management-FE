import { User } from '../../entities'
import AuthService from '../../services/auth.service'
import { ApiAction, StateSlice, createActionGenerator } from '../store'

type Keys = {
  map: { [id: string]: User }
  // null means that we have checked if the user is logged in and the user is not logged in
  meId: User['id'] | null | undefined
  loading: boolean
}

type Actions = {
  fetchMe: ApiAction<typeof AuthService.fetchMe>
  login: ApiAction<typeof AuthService.login>
  signup: ApiAction<typeof AuthService.signup>
}

export type UserSlice = Keys & Actions

export const createUserSlice: StateSlice<UserSlice> = (set) => {
  function authSuccess<T extends { user: User }>(data: T) {
    set((state) => {
      state.user.meId = data.user.id
      state.pageLoading = false
    })
  }

  const actionGenerator = createActionGenerator('user', set)

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
