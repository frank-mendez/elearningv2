import { RootState } from '../store'
import { createSelector } from 'reselect'

const selectSubject = (state: RootState) => state.subject
