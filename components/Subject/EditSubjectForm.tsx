import CommonLoading from '@/common/CommonLoading'
import { Subject } from '@/types'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useELearningContext } from '@/context/ELearningContext'
import { Alert, Button, FormHelperText, Grid, MenuItem, Snackbar, TextField } from '@mui/material'
import { getSubject, updateSubject } from '@/services/subject.service'

interface EditSubjectFormProps {
	subjectId: string
}

const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	status: yup.string().required('Status is required'),
})

const EditSubjectForm = (props: EditSubjectFormProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [data, setData] = useState<Subject>({
		id: props.subjectId,
		title: '',
		courses: '',
		isPublished: '',
	})
	const { userId } = useELearningContext()

	useEffect(() => {
		setLoading(true)
		const getSubjectData = async () => {
			const response = (await getSubject(props.subjectId)) as any
			if (response) {
				setData(response.data)
				setLoading(false)
			}
		}
		getSubjectData()
	}, [setLoading, props])

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			status: data.isPublished ? 'Published' : 'Draft',
			title: data.title,
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const { title, status } = values
				const payload = {
					title,
					status,
					ownerId: userId,
					subjectId: props.subjectId,
				}

				setLoading(true)
				await updateSubject(payload)
				setLoading(false)
				setSuccess(true)
			} catch (error: any) {
				console.error(error.response)
				setLoading(false)
				setError(true)
				setErrorMessage('Something went wrong')
			}
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
								id='outlined-basic'
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
								id='demo-simple-select'
								value={formik.values.status}
								onChange={formik.handleChange}
								error={formik.touched.status && Boolean(formik.errors.status)}
							>
								<MenuItem value='Draft'>Draft</MenuItem>
								<MenuItem value='Published'>Published</MenuItem>
							</TextField>
							{Boolean(formik.errors.status) && <FormHelperText>{formik.errors.status}</FormHelperText>}
						</Grid>
						<Grid item xs={6}>
							<Button size='large' type='submit' variant='contained'>
								Save
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={success} onClose={() => setSuccess(false)} autoHideDuration={2000}>
				<Alert severity='success'>Subject was updated</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} onClose={() => setError(false)} autoHideDuration={2000}>
				<Alert severity='error'>{errorMessage}</Alert>
			</Snackbar>
		</div>
	)
}

export default EditSubjectForm
