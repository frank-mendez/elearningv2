import { ICourse } from '@/models/course'
import { IEnrollment } from '@/models/enrollment'
import { IModule } from '@/models/module'
import { StepProps } from '@/pages/student/my-courses/[courseId]'
import { Course } from '@/types'
import axios from 'axios'
import moment from 'moment'

export const getStudentModule = async (courseId: string): Promise<StepProps[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/module/course/${courseId}`)
			.then((data) => {
				const { data: moduleDataArr } = data
				const mappedSteps = moduleDataArr.map((data: IModule) => {
					return {
						id: data._id,
						label: data.title,
						description: `Duration: ${data.duration}, Author: ${data.authorId.firstName + ' ' + data.authorId.lastName}, Course: ${
							data.courseId.title
						}, Created: ${moment(data.createdAt).format('MMMM DD, YYYY')}, Updated: ${moment(data.updatedAt).format('MMMM DD, YYYY')}`,
					}
				})
				return mappedSteps
			})
			.catch((err) => {
				console.error('err', err)
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}

export const getStudentEnrolledCourse = async (userId: string): Promise<Course[]> => {
	try {
		const response = await axios
			.get(`${process.env.apiUrl}/enrollment/${userId}`)
			.then((data) => {
				const { data: enrolled } = data
				const mappedEnrolled: Course[] = enrolled.map((enroll: IEnrollment) => {
					const course: ICourse = enroll.courseId
					let duration = 0
					if (course.modules) {
						course.modules.map((moduleData: IModule) => {
							duration = duration + moduleData.duration
						})
					}
					return {
						id: course._id,
						title: course.title,
						modules: course.modules ? course.modules.length : '0',
						subject: course.subjectId ? course.subjectId.title : '',
						author: course.authorId ? course.authorId.firstName + ' ' + course.authorId.lastName : '',
						duration,
						isPublished: course.isPublished,
						icon: course.icon,
					}
				})
				return mappedEnrolled
			})
			.catch((err) => {
				console.log('err', err)
				return []
			})
		return response
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
}
