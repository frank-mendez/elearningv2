import CommonLoading from '@/common/CommonLoading'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Alert, Button, Grid, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useELearningContext } from '@/context/ELearningContext'
import axios from 'axios'
import { Content, IMenu, Module } from '@/types'
import { ICourse } from '@/models/course'
import { getCourseDropdown } from '@/services/course.service'
import { getModule, getModuleContent, updateModule } from '@/services/module.service'

const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	status: yup.string().required('Status is required'),
	duration: yup.string().required('Duration is required'),
	course: yup.string().required('Course is required'),
})

const DynamicEditor = dynamic(import('../../common/Editor'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
})

const EditModuleForm = (props: { moduleId: string }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [editorData, setEditorData] = useState<string>('')
	const [courseDropdown, setCourseDropdown] = useState<IMenu[]>([])
	const [moduleData, setModuleData] = useState<Module>({
		_id: '',
		title: '',
		duration: 0,
		isPublished: '',
		courseId: '',
	})
	const [contentData, setContentData] = useState<Content>({
		_id: '',
		content: '',
		type: '',
		isPublished: false,
		moduleId: '',
	})
	const { userId } = useELearningContext()

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			status: moduleData.isPublished ? 'Published' : 'Draft',
			title: moduleData.title,
			duration: moduleData.duration,
			course: moduleData.courseId,
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const { title, status, duration, course } = values
			const payload = {
				title,
				status,
				duration,
				courseId: course,
				authorId: userId,
				content: editorData,
			}
			setLoading(true)
			await updateModule(payload, props.moduleId)
			setLoading(false)
			setSuccess(true)
		},
	})

	const getModuleData = async (id: string) => {
		const moduleDataResponse = await getModule(id)
		if (moduleDataResponse) {
			setModuleData(moduleDataResponse)
		}
	}

	useEffect(() => {
		getModuleData(props.moduleId)
	}, [props])

	const getModuleContentData = async (id: string) => {
		const response = await getModuleContent(id)
		if (response) {
			setContentData(response)
		}
	}

	useEffect(() => {
		if (moduleData._id) {
			getModuleContentData(moduleData._id)
		}
	}, [moduleData])

	useEffect(() => {
		if (contentData.content) {
			setEditorData(contentData.content)
		}
	}, [contentData])

	const getCourseDropdownData = async () => {
		const courseDropdown = await getCourseDropdown()
		if (courseDropdown.length > 0) {
			setCourseDropdown(courseDropdown)
		}
	}

	useEffect(() => {
		getCourseDropdownData()
	}, [])

	return (
		<div>
			{loading ? (
				<CommonLoading />
			) : (
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								fullWidth
								label='Title'
								variant='outlined'
								value={formik.values.title}
								onChange={formik.handleChange}
								error={formik.touched.title && Boolean(formik.errors.title)}
								helperText={formik.touched.title && formik.errors.title}
								name='title'
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								select
								fullWidth
								name='status'
								placeholder='Status'
								label='Status'
								variant='outlined'
								value={formik.values.status}
								onChange={formik.handleChange}
								error={formik.touched.status && Boolean(formik.errors.status)}
							>
								<MenuItem value='Draft'>Draft</MenuItem>
								<MenuItem value='Published'>Published</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								type='number'
								label='Duration'
								variant='outlined'
								value={formik.values.duration}
								onChange={formik.handleChange}
								error={formik.touched.duration && Boolean(formik.errors.duration)}
								helperText={formik.touched.duration && formik.errors.duration}
								name='duration'
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								select
								fullWidth
								name='course'
								placeholder='Course'
								label='Course'
								variant='outlined'
								value={formik.values.course}
								onChange={formik.handleChange}
								error={formik.touched.course && Boolean(formik.errors.course)}
							>
								{moduleData && courseDropdown && courseDropdown.length > 0 ? (
									courseDropdown.map((course) => (
										<MenuItem key={course.value} value={course.value}>
											{course.name}
										</MenuItem>
									))
								) : (
									<MenuItem value=''>No Available Options</MenuItem>
								)}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<DynamicEditor contentData={editorData} setContentData={setEditorData} />
						</Grid>
						<Grid item xs={4}>
							<Button type='submit' variant='contained' color='primary'>
								Save
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={success} onClose={() => setSuccess(false)} autoHideDuration={2000}>
				<Alert severity='success'>Module was updated</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} onClose={() => setError(false)} autoHideDuration={2000}>
				<Alert severity='error'>{errorMessage}</Alert>
			</Snackbar>
		</div>
	)
}

export default EditModuleForm
