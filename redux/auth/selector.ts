import { RootState } from '../store'
import { createSelector } from 'reselect'

const selectAuthState = (state: RootState) => state.auth

export const selectUserAuth = createSelector(selectAuthState, (state) => state.user)
