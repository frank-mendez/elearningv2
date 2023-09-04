import axios from 'axios'
import { fetchLocalStorageData, removeLocalStorageData } from './localStorage'
import isTokenExpired from './jsonTokenChecker'

// I added it here so that the handling for axios.post won't be duplicated everytime
// it will be used
const apiPost = async (endpoint: string, params?: {}, headers?: any) => {
	try {
		const accessToken = fetchLocalStorageData('accessToken')

		if (accessToken && isTokenExpired(accessToken)) {
			removeLocalStorageData('accessToken')
			// The HTTP 401 Status code only exists for GET api for the meantime
			throw {
				response: {
					data: {
						message: 'Unauthorized',
					},
				},
			}
		}

		const auth = accessToken
			? {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
			  }
			: {}

		const config = Object.keys(headers).length > 0 ? { ...auth, ...headers } : auth

		console.log('config', config)

		const { data } = await axios.post(`${process.env.apiUrl}${endpoint}`, params, config)

		console.log('data', data)

		return data.data
	} catch (e: any) {
		if (e.response.data.data) {
			throw e.response.data
		} else if (e.response.data?.dataMessage && e.response.data.dataMessage.length > 0) {
			throw e.response.data
		} else if (e.response.data?.message && e.response.data.message !== '') {
			throw [e.response.data.message]
		} else {
			const errors = e.response.data.errors
			throw Object.keys(errors).map((key) => errors[key][0])
		}
	}
}

export default apiPost
