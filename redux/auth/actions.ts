import axios from 'axios'
import { AuthUser, LoginDto, RegisterUserDto } from '../../types/user'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk('user/loginUser', async (payload: LoginDto, { dispatch, rejectWithValue }): Promise<any> => {
	try {
		const response = await axios.post(`${process.env.apiUrl}/login`, payload)
		const { data } = response
		const { data: userData } = data
		return {
			accessToken: userData.access_token,
			firstName: userData.firstName,
			email: userData.email,
			role: userData.role,
			theme: userData.theme ? userData.theme : 'light',
			isActive: userData.isActive ? userData.isActive : 'false',
			id: userData.id,
		} as AuthUser
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const registerUser = createAsyncThunk('user/registerUser', async (payload: RegisterUserDto, { dispatch, rejectWithValue }) => {
	try {
		const response = await axios.post(`${process.env.apiUrl}/register`, payload)
		const { data } = response
		const { data: userData } = data
		return {
			accessToken: userData.access_token,
			firstName: userData.firstName,
			email: userData.email,
			role: userData.role,
			theme: userData.theme,
			isActive: userData.isActive ? userData.isActive : 'false',
			id: userData.id,
		} as AuthUser
	} catch (error: any) {
		return rejectWithValue(error.response.data)
	}
})

export const logoutUser = createAction('user/logoutUser')

export const updateThemeMode = createAsyncThunk(
	'user/updateThemeMode',
	async (payload: { id: string; mode: string }, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.patch(`${process.env.apiUrl}/user/${payload.id}`, payload)
			const { data } = response
			console.log('data', data)
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const forgotPassword = createAsyncThunk(
	'user/forgotPasswrod',
	async (payload: { email: string }, { dispatch, rejectWithValue }): Promise<any> => {
		try {
			const response = await axios.post(`${process.env.apiUrl}/forgot-password`, payload)
			const { data } = response
			return data
		} catch (error: any) {
			console.log('error', error.response.data)
			return rejectWithValue(error.response.data.message)
		}
	}
)

export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async (payload: { password: string; resetLink: string }, { dispatch, rejectWithValue }): Promise<any> => {
		try {
			const response = await axios.post(`${process.env.apiUrl}/reset-password`, payload)
			const { data } = response
			return data
		} catch (error: any) {
			console.log('error', error.response.data)
			return rejectWithValue(error.response.data.message)
		}
	}
)
