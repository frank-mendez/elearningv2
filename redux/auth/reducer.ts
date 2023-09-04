import { AuthUser } from '@/types/user'
import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword, updateThemeMode } from './actions'
import { ReduxState } from '@/types/reduxState'
import { removeLocalStorageData, setLocalStorageData } from '@/helpers/localStorage'

interface AuthState extends ReduxState {
	user: AuthUser
	token: string
	isLoggedIn: boolean
	response?: any
	forgoPasswordResponse?: any
}

const initialState: AuthState = {
	user: {
		accessToken: '',
		firstName: '',
		lastName: '',
		email: '',
		theme: 'light',
		isActive: false,
		id: '',
		role: '',
	},
	token: '',
	isLoggedIn: false,
	isLoading: false,
	errors: [],
	response: null,
	forgoPasswordResponse: null,
}

export const authReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(loginUser.fulfilled, (state, { payload }) => {
			state.user = payload!
			state.isLoading = false
			state.isLoggedIn = true
			state.errors = []
			setLocalStorageData('accessToken', payload.accessToken)
		})
		.addCase(registerUser.fulfilled, (state, { payload }) => {
			console.log('trigger fulfilled')
			console.log('payload', payload)
			state.user = payload
			state.isLoading = false
			state.isLoggedIn = true
			state.errors = []
		})
		.addCase(logoutUser, (state) => {
			state.isLoggedIn = false
			state.user = initialState.user

			removeLocalStorageData('state')
			removeLocalStorageData('hasAskToJoin')
			removeLocalStorageData('accessToken')
		})
		.addCase(updateThemeMode.fulfilled, (state, { payload }) => {
			console.log('updateThemeMode', payload)
			state.user.theme = payload.theme
		})
		.addCase(forgotPassword.fulfilled, (state, { payload }) => {
			state.response = payload!
			state.isLoading = false
			state.isLoggedIn = true
			state.errors = []
		})
		.addCase(resetPassword.fulfilled, (state, { payload }) => {
			state.forgoPasswordResponse = payload!
			state.isLoading = false
			state.isLoggedIn = true
			state.errors = []
		})
		.addMatcher(isAnyOf(loginUser.pending, registerUser.pending, forgotPassword.pending, resetPassword.pending), (state) => {
			state.isLoading = true
			state.isLoggedIn = false
			state.errors = []
		})
		.addMatcher(isAnyOf(loginUser.rejected, registerUser.rejected, forgotPassword.rejected, resetPassword.rejected), (state, { payload }) => {
			console.log('trigger rejected')
			console.log('payload', payload)
			state.isLoading = false
			state.isLoggedIn = false
			state.errors = [payload as string]
		})
})
