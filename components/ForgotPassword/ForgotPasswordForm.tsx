import { Alert, Box, Button, CircularProgress, Grid, Link, Snackbar, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import theme from '@/theme'
import { forgotPasswordStyles } from '../../styles/forgotPassword.style'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { forgotPassword } from '@/redux/auth/actions'
import { registrationStyles } from '@/styles/registration.style'

const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Email is required'),
})

const ForgotPasswordForm = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const dispatch = useDispatch<AppDispatch>()
	const isLoading = useSelector((state: RootState) => state.auth.isLoading)
	const errors = useSelector((state: RootState) => state.auth.errors)
	const response = useSelector((state: RootState) => state.auth.response)
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			console.log('values', values)
			dispatch(forgotPassword(values))
		},
	})

	useEffect(() => {
		if (errors.length > 0) {
			setError(true)
		}
	}, [setError, errors])

	useEffect(() => {
		setLoading(isLoading)
	}, [isLoading, setLoading])

	return (
		<Box sx={forgotPasswordStyles.forgotForm}>
			<form onSubmit={formik.handleSubmit}>
				<Typography color='primary' marginBottom={2} align='center' variant='h4'>
					Arcanys eLearning Portal
				</Typography>
				<Typography align='center' color='secondary' marginBottom={2} variant='h6'>
					Forgot Password
				</Typography>
				{loading ? (
					<Box sx={registrationStyles.loading}>
						<CircularProgress />
					</Box>
				) : (
					<>
						{response ? (
							<Typography align='center' color='primary'>
								{response.message}
							</Typography>
						) : (
							<>
								<TextField
									size='small'
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
								<Button type='submit' fullWidth variant='contained' color='primary' style={{ margin: theme.spacing(2, 0, 2) }}>
									Send Rest Link
								</Button>
								<Grid container>
									<Grid sx={forgotPasswordStyles.textFormat} item>
										<Link href='/registration'>{"Don't have an account? Sign Up"}</Link>
									</Grid>
								</Grid>
							</>
						)}
					</>
				)}
			</form>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={6000}>
				<Alert color='error' severity='error'>
					{errors.length > 0 ? errors[0] : 'Something went wrong! Please try again'}
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default ForgotPasswordForm
