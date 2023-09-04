import { ISubject } from '@/models/subject'
import { AddSubjectPayload, IMenu, Subject, UpdateSubjectPayload } from '@/types'
import axios from 'axios'

export const addSubject = async (payload: AddSubjectPayload) => {
	try {
		const response = await axios.post(`${process.env.apiUrl}/subject`, payload)
		return response
	} catch (error) {
		return new Error('Subject cannot be added')
	}
}

export const getSubject = async (subjectId: string) => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/subject/${subjectId}`)
			.then((data) => {
				if (data) {
					return data
				}
			})
			.catch((err) => {
				return new Error(err)
			})
		return response
	} catch (error) {}
}

export const updateSubject = async (payload: UpdateSubjectPayload) => {
	try {
		const response = await axios.patch(`${process.env.apiUrl}/subject`, payload)
		return response
	} catch (error) {
		return new Error('Subject cannot be updated')
	}
}

export const deleteSubject = async (subjectId: string) => {
	try {
		const response = await axios
			.delete(`${process.env.apiUrl}/subject/${subjectId}`)
			.then((data) => {
				return data
			})
			.catch((err) => {
				return new Error()
			})
		return response
	} catch (error) {
		return new Error('Subject cannot be deleted')
	}
}

export const getSubjectDropdown = async (): Promise<IMenu[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/subject`)
			.then((data) => {
				const { data: subjects } = data
				const { data: subjectsArr } = subjects
				const mappedSubjects = subjectsArr.map((subject: ISubject) => {
					return {
						name: subject.title,
						value: subject._id,
					}
				})
				return mappedSubjects
			})
			.catch((err) => {
				throw new Error(`Something went wrong ${err}`)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const getSubjectTable = async (searchData: string): Promise<Subject[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/subject?search=${searchData}`)
			.then((data) => {
				const { data: subjects } = data
				const { data: subjectArr } = subjects
				if (subjectArr && subjectArr.length > 0) {
					const mappedSubject: Subject[] = subjectArr.map((data: ISubject) => {
						return {
							title: data.title,
							courses: data.courses,
							isPublished: data.isPublished === false ? 'Draft' : 'Published',
							id: data._id,
						}
					})
					return mappedSubject
				} else {
					return []
				}
			})
			.catch((err) => {
				throw new Error(`Something went wrong ${err}`)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}
