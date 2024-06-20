import { User } from '../../entities/user.entity'
import { ROUTES } from '../../routes'
import userService from '../../services/user.service'
import { StateSlice } from '../store'

type Keys = {
  loading: boolean
  map: { [id: User['id']]: User }
  meId: User['id'] | undefined
}

type Actions = {
  fetchMe: () => Promise<User | undefined>
}

export type UserSlice = Keys & Actions

export const userStateInit: { [key in keyof Keys | keyof Actions]: null } = {
  map: null,
  meId: null,
  loading: null,
  fetchMe: null,
}

export const createUserSlice: StateSlice<UserSlice> = (set) => ({
  map: {},
  meId: undefined,
  loading: false,

  fetchMe: async () => {
    try {
      const me = await userService.fetchMe()

      set((state) => {
        state.user.meId = me.id
        state.user.map[me.id] = me
      })

      return me
    } catch (error) {
      console.error(error)
      if (window.location.pathname !== ROUTES.LOGIN) window.location.href = ROUTES.LOGIN
    }
  },
})
