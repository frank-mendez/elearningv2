import { RootState } from '../store'
import { createSelector } from 'reselect'

const course = (state: RootState) => state.course
