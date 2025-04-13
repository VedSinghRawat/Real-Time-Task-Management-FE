import PresenceService from '../../services/presence.service'
import { StateSlice } from '../store'

type Keys = {
  onlineUsers: string[]
}

type Actions = {
  initializePresence: (userId: string) => void
  cleanupPresence: () => Promise<void>
}

export type PresenceSlice = Keys & Actions

export const createPresenceSlice: StateSlice<PresenceSlice> = (set, get) => ({
  onlineUsers: [],

  initializePresence: (userId) => {
    PresenceService.initializeTracking(userId, (newState) => {
      set((state) => {
        state.presence.onlineUsers = Object.values(newState).flatMap((presence) => presence.map((p) => p.user_id))
      })
    })
  },

  cleanupPresence: async () => {
    await PresenceService.cleanupTracking()
    set((state) => {
      state.presence.onlineUsers = []
    })
  },
})
