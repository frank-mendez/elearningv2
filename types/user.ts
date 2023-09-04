export type LoginDto = {
	email: string
	password: string
}

export type RegisterUserDto = {
	firstName: string
	lastName: string
	email: string
	password: string
	role: string
	theme: string
}

export type AuthUser = {
	accessToken: string
	firstName: string
	lastName: string
	email: string
	theme: string
	isActive: boolean
	id: string
	role: string
}
