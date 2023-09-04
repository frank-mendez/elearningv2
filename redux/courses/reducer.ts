import { Course, Subject } from '@/types'
import { ReduxState } from '@/types/reduxState'
import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { addeNewCourse, getAllCourses } from './actions'

interface CourseState extends ReduxState {
	courses: Course[]
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

const initialState: CourseState = {
	courses: [],
	search: '',
	sort: '',
	limit: 25,
	totalCount: 0,
	isLoading: false,
	errors: [],
	message: {},
}

export const courseReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getAllCourses.fulfilled, (state, { payload }) => {
			state.courses = payload!
			state.isLoading = false
			state.errors = []
		})
		.addCase(addeNewCourse.fulfilled, (state, { payload }) => {
			console.log('payload', payload)
			state.message = {
				type: 'success',
				text: 'Course Added',
			}
			state.isLoading = false
			state.errors = []
		})
		.addMatcher(isAnyOf(getAllCourses.pending, addeNewCourse.pending), (state) => {
			state.isLoading = true
			state.errors = []
		})
		.addMatcher(isAnyOf(getAllCourses.rejected, addeNewCourse.rejected), (state, { payload }) => {
			state.isLoading = false
			state.errors = [payload as string]
		})
})
