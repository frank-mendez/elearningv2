import { IModule } from '@/models/module'
import { AddModulePayload, Content, Module, UpdateModulePayload } from '@/types'
import axios from 'axios'

export const getModule = async (id: string) => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/module/${id}`)
			.then((data) => {
				const { data: moduleData } = data
				const { _id, title, duration, isPublished, courseId } = moduleData
				const mappedModule: Module = {
					_id,
					title,
					duration,
					isPublished,
					courseId,
				}
				return mappedModule
			})
			.catch((err) => {
				console.log('err', err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const addModule = async (payload: AddModulePayload, editorData: string) => {
	try {
		const response = await axios
			.post(`${process.env.apiUrl}/module`, payload)
			.then(async (data) => {
				const contentPayload = {
					content: editorData,
					type: 'module-content',
					status: payload.status,
					moduleId: data.data._id,
					authorId: payload.authorId,
				}
				await axios.post(`${process.env.apiUrl}/content`, contentPayload)
			})
			.catch((err) => {
				console.error(err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const updateModule = async (payload: UpdateModulePayload, moduleId: string) => {
	try {
		const response = await axios
			.patch(`${process.env.apiUrl}/module/${moduleId}`, payload)
			.then(async (data) => {
				return data
			})
			.catch((err) => {
				console.error(err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const deleteModule = async (id: string) => {
	try {
		const response = await axios
			.delete(`${process.env.apiUrl}/module/${id}`)
			.then(() => {})
			.catch((err) => {
				console.error(err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const getModuleTable = async (search: string) => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/module?search=${search}`)
			.then((data) => {
				const { data: modules } = data
				const { data: modulesArr } = modules
				if (modulesArr && modulesArr.length > 0) {
					const mappedModules = modulesArr.map((moduleData: IModule) => {
						return {
							_id: moduleData._id,
							title: moduleData.title,
							courseId: moduleData.courseId.title,
							duration: moduleData.duration,
							isPublished: moduleData.isPublished,
						}
					})
					return mappedModules
				} else {
					return []
				}
			})
			.catch((err) => {
				console.error(err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const getModuleContent = async (id: string) => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/content/${id}`)
			.then((data) => {
				const { data: contentData } = data
				const { content, _id, type, isPublished, moduleId } = contentData
				const mappedContent: Content = {
					_id,
					content,
					type,
					isPublished,
					moduleId,
				}
				return mappedContent
			})
			.catch((err) => {
				console.log('err', err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}
