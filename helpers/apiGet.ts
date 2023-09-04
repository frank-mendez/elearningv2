import axios from 'axios'
import { fetchLocalStorageData, removeLocalStorageData } from './localStorage'
import isTokenExpired from './jsonTokenChecker'
import { isEmptyObject } from './helpers'

const apiGet = async (endpoint: string, params?: {}) => {
	try {
		const accessToken = fetchLocalStorageData('accessToken')

		if (accessToken && isTokenExpired(accessToken)) {
			removeLocalStorageData('accessToken')
			throw { code: 401 }
		}

		const config = accessToken
			? {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
			  }
			: {}

		// Sample SWR implementation to be tested soon
		// const fetcher = (url, params) => axios(url, params).then((response)=> response.data)
		// const {data, error} = useSWR([`${process.env.API_ENDPOINT}${endpoint}`, {...config, params}], fetcher);
		const { data } = await axios.get(`${process.env.apiUrl}${endpoint}`, {
			...config,
			params,
		})

		if (!isEmptyObject(data.data)) {
			return data.data
		} else if (data.data.length === 0) {
			return data.data
		} else {
			throw data.data
		}
	} catch (e: any) {
		// TODO: Update this so that we will not replicate this to all api<something> function.
		if (401 === e.response.status || e.code === 401) {
			throw ['Unauthorized']
		} else if (e.response.data.data) {
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

export default apiGet
