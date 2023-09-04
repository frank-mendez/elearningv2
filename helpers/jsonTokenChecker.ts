import { AccessToken } from '@/types/accessToken'
import jwt_decode from 'jwt-decode'

const isTokenExpired = (token: string) => {
	const decoded: AccessToken = jwt_decode(token)

	return Date.now() >= decoded.exp * 1000
}

export default isTokenExpired
