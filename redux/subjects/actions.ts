import apiGet from '@/helpers/apiGet'
import apiPatch from '@/helpers/apiPatch'
import apiPost from '@/helpers/apiPost'
import { ISubject } from '@/models/subject'
import { AddSubjectPayload, Subject, UpdateSubjectPayload } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllSubjects = createAsyncThunk('subject/getAllSubjects', async (payload: any) => {
	try {
		const subjects = await apiGet(`/subject?search=${payload.searchData}`)
		const mappedSubject: Subject[] = subjects.map((data: ISubject) => {
			return {
				title: data.title,
				courses: data.courses,
				isPublished: data.isPublished === false ? 'Draft' : 'Published',
				id: data._id,
			}
		})
		return mappedSubject
	} catch (error) {
		throw new Error(`Something went wrong ${error}`)
	}
})

export const addNewSubject = createAsyncThunk('subject/addNewSubject', async (payload: AddSubjectPayload) => {
	try {
		//const response = await axios.post(`${process.env.apiUrl}/subject`, payload)
		const response = await apiPost('/subject', payload)
		console.log('add response', response)
		return response
	} catch (error) {
		return new Error('Subject cannot be added')
	}
})

export const updateSubject = createAsyncThunk('subject/updateSubject', async (payload: UpdateSubjectPayload) => {
	try {
		//const response = await axios.post(`${process.env.apiUrl}/subject`, payload)
		const response = await apiPatch('/subject', payload)
		console.log('add response', response)
		return response
	} catch (error) {
		return new Error('Subject cannot be added')
	}
})
