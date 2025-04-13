import { createSelector } from 'reselect'
import { presenceSliceSelector } from '../selector' // Use the new base selector

const baseSelectors = {
  onlineUsers: createSelector(presenceSliceSelector, (presence) => presence.onlineUsers),
  initializePresence: createSelector(presenceSliceSelector, (presence) => presence.initializePresence),
  cleanupPresence: createSelector(presenceSliceSelector, (presence) => presence.cleanupPresence),
  // Internal actions (_handle*) are not exposed via selectors
}

const isUserOnline = (userId: string) =>
  createSelector(baseSelectors.onlineUsers, (onlineUserIdArray) => {
    // Check if the user ID exists in the online users array
    return onlineUserIdArray.includes(userId)
  })

export default {
  base: baseSelectors,
  isUserOnline,
}
