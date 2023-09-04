import CommonLoading from '@/common/CommonLoading'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Alert, Button, Grid, MenuItem, Snackbar, TextField } from '@mui/material'
import dynamic from 'next/dynamic'
import { useELearningContext } from '@/context/ELearningContext'
import axios from 'axios'

const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	status: yup.string().required('Status is required'),
	duration: yup.string().required('Duration is required'),
})

const DynamicEditor = dynamic(import('../../common/Editor'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
})

const EditModule = (props: { courseId: string }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [editorData, setEditorData] = useState<string>('')
	const { userId } = useELearningContext()

	const formik = useFormik({
		initialValues: {
			status: '',
			title: '',
			duration: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const { title, status, duration } = values
			const payload = {
				title,
				status,
				duration,
				courseId: props.courseId,
				authorId: userId,
			}

			setLoading(true)
			await axios
				.post(`${process.env.apiUrl}/module`, payload)
				.then(async (data) => {
					const contentPayload = {
						content: editorData,
						type: 'module-content',
						status,
						moduleId: data.data._id,
						authorId: userId,
					}
					await axios.post(`${process.env.apiUrl}/content`, contentPayload).then((data) => {
						setLoading(false)
						setSuccess(true)
					})
				})
				.catch((err) => {
					setError(true)

					setLoading(false)
					setErrorMessage('Something went wrong')
				})
		},
	})

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
				<Alert severity='success'>Course was updated</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} onClose={() => setError(false)} autoHideDuration={2000}>
				<Alert severity='error'>{errorMessage}</Alert>
			</Snackbar>
		</div>
	)
}

export default EditModule
