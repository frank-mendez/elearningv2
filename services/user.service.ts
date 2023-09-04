import { IUser } from '@/models/user'
import { IMenu } from '@/types'
import axios, { AxiosError } from 'axios'

type RegisterUserDto = {
	firstName: string
	lastName: string
	email: string
	password: string
	role: string
}

type LoginDto = {
	email: string
	password: string
}

export enum UserRole {
	INSTRUCTOR = 'instructor',
	STUDENT = 'student',
}

type UserSession = {
	firstName: string
	lastName: string
	id: string
	isActive: boolean
	role: UserRole
	access_token: string
}

export const registerUser = async (payload: RegisterUserDto): Promise<IUser> => {
	try {
		const response = (await axios.post(`${process.env.apiUrl}/register`, payload)) as IUser
		return response
	} catch (error: any) {
		console.log('error service', error)
		throw new Error(error.response.data)
	}
}

export const loginUser = async (payload: LoginDto) => {
	try {
		const response = await axios
			.post(`${process.env.apiUrl}/login`, payload)
			.then((data) => {
				const { data: loginData } = data
				const { data: loginResponse } = loginData
				return loginResponse
			})
			.catch((err) => {
				throw new Error(`Something went wrong ${err}`)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const getUserDropdown = async (): Promise<IMenu[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/user`)
			.then((data) => {
				const { data: users } = data
				const { data: userArr } = users
				const mappedUsers = userArr.map((user: IUser) => {
					return {
						name: user.firstName + ' ' + user.lastName,
						value: user._id,
					}
				})
				return mappedUsers
			})
			.catch((err) => {
				throw new Error(`Something went wrong ${err}`)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}
