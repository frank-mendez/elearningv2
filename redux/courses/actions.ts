import apiGet from '@/helpers/apiGet'
import apiPost from '@/helpers/apiPost'
import { ICourse } from '@/models/course'
import { IModule } from '@/models/module'
import { ISubject } from '@/models/subject'
import { AddSubjectPayload, Course, Subject } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllCourses = createAsyncThunk('course/getAllCourses', async (payload: any) => {
	try {
		const courses = await apiGet(`/course?search=${payload.searchData}`)
		const mappedCourses: Course[] = courses.map((course: ICourse) => {
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
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
})

export const addeNewCourse = createAsyncThunk('course/addeNewCourse', async (formData: FormData) => {
	try {
		//const response = await axios.post(`${process.env.apiUrl}/subject`, payload)
		const response = await apiPost('/course', formData, {
			'Content-Type': 'multipart/form-data',
		})
		console.log('add response', response)
		return response
	} catch (error) {
		return new Error('Subject cannot be added')
	}
})
