import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Alert, Box, Button, Grid, MenuItem, Snackbar, TextField } from '@mui/material'
import { useELearningContext } from '@/context/ELearningContext'
import axios from 'axios'
import CommonLoading from '@/common/CommonLoading'
import Image from 'next/image'

const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	status: yup.string().required('Status is required'),
	description: yup.string().required('Description is required'),
	icon: yup.mixed(),
})

const EditCourses = (props: { subjectId: string }) => {
	const { userId } = useELearningContext()
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [preview, setPreview] = useState<string | undefined>()

	const formik = useFormik({
		initialValues: {
			status: '',
			title: '',
			description: '',
			icon: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const { status, title, description, icon } = values
			try {
				const formData = new FormData()
				formData.append('icon', icon)
				formData.append('title', title)
				formData.append('status', status)
				formData.append('description', description)
				formData.append('authorId', userId)
				formData.append('subjectId', props.subjectId)

				setLoading(true)
				await axios
					.post(`${process.env.apiUrl}/course`, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then(() => {
						setLoading(false)
						setSuccess(true)
					})
					.catch((err) => {
						setErrorMessage('Something went wrong')
					})
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
				<Alert severity='success'>Course was created</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} onClose={() => setError(false)} autoHideDuration={2000}>
				<Alert severity='error'>{errorMessage}</Alert>
			</Snackbar>
		</div>
	)
}

export default EditCourses
