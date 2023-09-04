import CommonLoading from '@/common/CommonLoading'
import React, { Fragment, useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { Alert, Box, Button, Grid, MenuItem, Snackbar, TextField } from '@mui/material'
import { Course, IMenu } from '@/types'
import { IUser } from '@/models/user'
import { ISubject } from '@/models/subject'
import Image from 'next/image'
import { getSubjectDropdown } from '@/services/subject.service'
import { getUserDropdown } from '@/services/user.service'
import { getCourse, updateCourse } from '@/services/course.service'

const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	status: yup.string().required('Status is required'),
	description: yup.string().required('Description is required'),
	author: yup.string().required('Description is required'),
	subject: yup.string().required('Description is required'),
	icon: yup.mixed(),
})

const EditCourseForm = (props: { courseId: string }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [preview, setPreview] = useState<string | undefined>()
	const [userDropdownValues, setUserDropdownValues] = useState<IMenu[]>([])
	const [subjectDropdownValues, setSubjectDropdownValues] = useState<IMenu[]>([])
	const [courseData, setCourseData] = useState<Course>({
		title: '',
		author: '',
		subject: '',
		modules: 0,
		duration: 0,
		isPublished: '',
		description: '',
		id: '',
		icon: '',
	})

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			status: courseData.isPublished ? 'Published' : 'Draft',
			title: courseData.title ?? '',
			description: courseData.description,
			icon: courseData.icon ?? '',
			author: userDropdownValues.length > 0 && courseData.author ? courseData.author : '',
			subject: subjectDropdownValues.length > 0 && courseData.subject ? courseData.subject : '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const { status, title, description, icon, author, subject } = values
			try {
				const formData = new FormData()
				formData.append('icon', icon)
				formData.append('title', title)
				formData.append('status', status)
				formData.append('description', description)
				formData.append('authorId', author)
				formData.append('subjectId', subject)
				formData.append('courseId', props.courseId)

				setLoading(true)
				await updateCourse(formData)
				setLoading(false)
			} catch (error: any) {
				console.error(error.response)
				setLoading(false)
				setError(true)
				setErrorMessage('Something went wrong')
			}
		},
	})

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			formik.setFieldValue('icon', file)
			const reader = new FileReader()
			reader.onload = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleClearImage = () => {
		formik.setFieldValue('title', '')
		setPreview(undefined)
	}

	useEffect(() => {
		const getDropdownValues = async () => {
			const userDropdownResponse: IMenu[] = await getUserDropdown()
			if (userDropdownResponse) {
				setUserDropdownValues(userDropdownResponse)
			}
		}
		getDropdownValues()
	}, [setUserDropdownValues])

	useEffect(() => {
		const getSubjectDropdownValues = async () => {
			const subjectDropdownResponse: IMenu[] = await getSubjectDropdown()
			if (subjectDropdownResponse) {
				setSubjectDropdownValues(subjectDropdownResponse)
			}
		}
		getSubjectDropdownValues()
	}, [setSubjectDropdownValues])

	const getCourseData = async (courseId: string) => {
		const courseData = await getCourse(courseId)
		if (courseData) {
			setCourseData(courseData)
		}
	}

	useEffect(() => {
		getCourseData(props.courseId)
	}, [props])

	return (
		<div>
			{loading ? (
				<CommonLoading />
			) : (
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{courseData.icon && !preview && <Image style={{ margin: 'auto' }} src={courseData.icon} alt='My Image' width={100} height={100} />}
						</Grid>
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
								select
								fullWidth
								name='subject'
								placeholder='Subject'
								label='Subject'
								variant='outlined'
								value={formik.values.subject}
								onChange={formik.handleChange}
								error={formik.touched.subject && Boolean(formik.errors.subject)}
							>
								{courseData && subjectDropdownValues && subjectDropdownValues.length > 0 ? (
									subjectDropdownValues.map((subject) => (
										<MenuItem key={subject.value} value={subject.value}>
											{subject.name}
										</MenuItem>
									))
								) : (
									<MenuItem value=''>No Available Options</MenuItem>
								)}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								select
								fullWidth
								name='author'
								placeholder='Author'
								label='Author'
								variant='outlined'
								value={formik.values.author}
								onChange={formik.handleChange}
								error={formik.touched.author && Boolean(formik.errors.author)}
							>
								{courseData && userDropdownValues && userDropdownValues.length > 0 ? (
									userDropdownValues.map((user) => (
										<MenuItem key={user.value} value={user.value}>
											{user.name}
										</MenuItem>
									))
								) : (
									<MenuItem value=''>No Available Options</MenuItem>
								)}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name='description'
								value={formik.values.description}
								onChange={formik.handleChange}
								error={formik.touched.description && Boolean(formik.errors.description)}
								helperText={formik.touched.description && formik.errors.description}
								fullWidth
								label='Description'
								multiline
								rows={4}
								variant='outlined'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type='file'
								label='Icon'
								variant='outlined'
								error={formik.touched.icon && Boolean(formik.errors.icon)}
								helperText={formik.touched.icon && formik.errors.icon}
								onChange={handleImageChange}
								inputProps={{ accept: 'image/*' }}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							{preview && (
								<Box>
									<Image src={preview} alt='Preview' height={100} width={100} />
									<Button variant='outlined' size='small' onClick={handleClearImage}>
										Clear
									</Button>
								</Box>
							)}
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
				<Alert severity='success'>Course was updated</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} onClose={() => setError(false)} autoHideDuration={2000}>
				<Alert severity='error'>{errorMessage}</Alert>
			</Snackbar>
		</div>
	)
}

export default EditCourseForm
