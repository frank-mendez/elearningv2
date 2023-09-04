import { ICourse } from '@/models/course'
import { IModule } from '@/models/module'
import { Course, IMenu } from '@/types'
import axios from 'axios'

export const getCourse = async (courseId: string) => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/course/${courseId}`)
			.then((data) => {
				const { data: courseData } = data
				const mappedData: Course = {
					title: courseData.title,
					author: courseData.authorId,
					subject: courseData.subjectId,
					isPublished: courseData.isPublished,
					description: courseData.description,
					id: courseData.id,
					icon: courseData.icon,
					modules: 0,
					duration: 0,
				}
				return mappedData
			})
			.catch((err) => {
				console.error('err', err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const addCourse = async (formData: FormData) => {
	try {
		const response = await axios.post(`${process.env.apiUrl}/course`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const updateCourse = async (formData: FormData) => {
	try {
		const response = await axios.patch(`${process.env.apiUrl}/course`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const deleteCourse = async (id: string) => {
	try {
		const response = await axios.delete(`${process.env.apiUrl}/course/${id}`)
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const getCourseTable = async (search: string): Promise<Course[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/course?search=${search}`)
			.then((data) => {
				const { data: courses } = data
				const { data: coursesArr } = courses
				if (coursesArr && coursesArr.length > 0) {
					const mappedCourses: Course[] = coursesArr.map((course: ICourse) => {
						let duration = 0
						if (course.modules && course.modules.length > 0) {
							course.modules.map((moduleData: IModule) => {
								duration = duration + moduleData.duration
							})
						}

						return {
							id: course._id,
							title: course.title,
							modules: course.modules!.length,
							subject: course.subjectId ? course.subjectId.title : '',
							author: course.authorId ? course.authorId.firstName + ' ' + course.authorId.lastName : '',
							duration,
							isPublished: course.isPublished,
						}
					})
					return mappedCourses
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

export const getCourses = async (): Promise<Course[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/course`)
			.then((data) => {
				const { data: courses } = data
				const { data: coursesArr } = courses
				if (coursesArr && coursesArr.length > 0) {
					const mappedCourses: Course[] = coursesArr.map((course: ICourse) => {
						let duration = 0
						if (course.modules && course.modules.length > 0) {
							course.modules.map((moduleData: IModule) => {
								duration = duration + moduleData.duration
							})
						}

						return {
							id: course._id,
							title: course.title,
							modules: course.modules!.length,
							subject: course.subjectId ? course.subjectId.title : '',
							author: course.authorId ? course.authorId.firstName + ' ' + course.authorId.lastName : '',
							duration,
							isPublished: course.isPublished,
							icon: course.icon,
						}
					})
					return mappedCourses
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

export const getCourseDropdown = async (): Promise<IMenu[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/course`)
			.then((data) => {
				const { data: course } = data
				const { data: courseArr } = course
				const mappedCourse = courseArr.map((course: ICourse) => {
					return {
						name: course.title,
						value: course._id,
					}
				})
				return mappedCourse
			})
			.catch((err) => {
				console.error('err', err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}
