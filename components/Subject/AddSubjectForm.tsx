import { Alert, Button, FormHelperText, Grid, MenuItem, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useELearningContext } from '@/context/ELearningContext'
import CommonLoading from '@/common/CommonLoading'
import { addSubject } from '@/services/subject.service'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { addNewSubject } from '@/redux/subjects'

const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	status: yup.string().required('Status is required'),
})

const AddSubjectForm = () => {
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const dispatch = useDispatch<AppDispatch>()

	const userId = useSelector((state: RootState) => state.auth.user.id)
	const loading = useSelector((state: RootState) => state.subject.isLoading)
	const message = useSelector((state: RootState) => state.subject.message)

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			status: '',
			title: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const { title, status } = values
				const payload = {
					title,
					status,
					ownerId: userId,
				}

				dispatch(addNewSubject(payload))
			} catch (error: any) {
				console.error(error.response)
				setError(true)
				setErrorMessage('Something went wrong')
			}
		},
	})

	useEffect(() => {
		if (message && message.type === 'success') {
			setSuccess(true)
		}
	}, [message])

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
				<Alert severity='success'>Subject was created</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} onClose={() => setError(false)} autoHideDuration={2000}>
				<Alert severity='error'>{errorMessage}</Alert>
			</Snackbar>
		</div>
	)
}

export default AddSubjectForm
