export type AccessToken = {
	nbf: number
	exp: number
	iss: string
	aud: string[]
	client_id: string
	sub: string
	auth_time: number
	idp: string
	Email: string
	UserId: string
	jti: string
	iat: number
	scope: string[]
	amr: string[]
}
