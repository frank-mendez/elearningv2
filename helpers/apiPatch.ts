import axios from 'axios'
import { fetchLocalStorageData, removeLocalStorageData } from './localStorage'
import isTokenExpired from './jsonTokenChecker'

const apiPatch = async (endpoint: string, params?: {}) => {
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

		const config = accessToken
			? {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
			  }
			: {}

		const { data } = await axios.patch(`${process.env.apiUrl}${endpoint}`, params, config)

		return data.data
	} catch (e: any) {
		if (e.response.data.data) {
			throw e.response.data
		} else if (e.response.data?.message && e.response.data.message !== '') {
			throw [e.response.data.message]
		} else {
			const errors = e.response.data.errors
			throw Object.keys(errors).map((key) => errors[key][0])
		}
	}
}

export default apiPatch
