import { createSliceSelectors, userSliceSelector } from '../selector'
import { userStateInit } from '../slices/user.slice'

export default class UserSelectors {
  public static base = createSliceSelectors('user', userStateInit, userSliceSelector)
}
