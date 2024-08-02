import { User } from '../../entities/user.entity'
import ROUTES from '../../routes'
import AuthService from '../../services/auth.service'
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

export const userStateInit: { [key in keyof UserSlice]: null } = {
  map: null,
  meId: null,
  loading: null,
  fetchMe: null,
  login: null,
  signup: null,
}

export const createUserSlice: StateSlice<UserSlice> = (set) => {
  function setMeId<T extends { user: User }>(data: T) {
    set((state) => {
      state.user.meId = data.user.id
    })
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
      onSuccess: setMeId,
      onError: () => {
        if (!window.location.pathname.includes('auth')) window.location.href = ROUTES.login
      },
      onFinal: () => {
        set((state) => {
          state.pageLoading = false
        })
      },
    }),

    login: actionGenerator(AuthService.login, {
      onSuccess: setMeId,
    }),
    signup: actionGenerator(AuthService.signup, {
      onSuccess: setMeId,
    }),
  }
}
