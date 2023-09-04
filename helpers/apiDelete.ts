import axios from 'axios'
import { fetchLocalStorageData, removeLocalStorageData } from './localStorage'
import isTokenExpired from './jsonTokenChecker'

const apiDelete = async (endpoint: string, params?: {}) => {
	try {
		const accessToken = fetchLocalStorageData('accessToken')

		if (accessToken && isTokenExpired(accessToken)) {
			removeLocalStorageData('accessToken')
			// The HTTP 401 Status code only exists for GET api for the meantime
			throw { message: 'Unauthorized' }
		}

		const config = accessToken
			? {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
			  }
			: {}

		const { data } = await axios.delete(`${process.env.apiUrl}${endpoint}`, {
			...config,
			data: params,
		})

		return data.data
	} catch (e: any) {
		// TODO: Update this so that we will not replicate this to all api<something> function.
		if (e.response.data.data) {
			throw e.response.data
		} else if (e.response.data?.message && e.response.data.message !== '') {
			throw [e.response.data.message]
		} else if (e.message !== '') {
			throw [e.message]
		} else {
			const errors = e.response.data.errors
			throw Object.keys(errors).map((key) => errors[key][0])
		}
	}
}

export default apiDelete
