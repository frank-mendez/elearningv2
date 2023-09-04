import { Subject } from '@/types'
import { ReduxState } from '@/types/reduxState'
import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { addNewSubject, getAllSubjects, updateSubject } from './actions'

interface SubjecState extends ReduxState {
	subjects: Subject[]
	search?: string
	page?: number
	sort?: string
	limit: number
	totalCount: number
	message?: {
		type?: 'success' | 'error'
		text?: string
	}
}

const initialState: SubjecState = {
	subjects: [],
	search: '',
	sort: '',
	limit: 25,
	totalCount: 0,
	isLoading: false,
	errors: [],
	message: {},
}

export const subjectReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getAllSubjects.fulfilled, (state, { payload }) => {
			state.subjects = payload!
			state.isLoading = false
			state.errors = []
		})
		.addCase(addNewSubject.fulfilled, (state, { payload }) => {
			console.log('payload', payload)
			state.message = {
				type: 'success',
				text: 'Subject Added',
			}
			state.isLoading = false
			state.errors = []
		})
		.addCase(updateSubject.fulfilled, (state, { payload }) => {
			console.log('payload', payload)
			state.message = {
				type: 'success',
				text: 'Subject Updated',
			}
			state.isLoading = false
			state.errors = []
		})
		.addMatcher(isAnyOf(getAllSubjects.pending, addNewSubject.pending, updateSubject.pending), (state) => {
			state.isLoading = true
			state.errors = []
		})
		.addMatcher(isAnyOf(getAllSubjects.rejected, addNewSubject.rejected, updateSubject.rejected), (state, { payload }) => {
			state.isLoading = false
			state.errors = [payload as string]
		})
})
