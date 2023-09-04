import { Alert, Box, Button, CircularProgress, Grid, Link, Snackbar, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import theme from '@/theme'
import { forgotPasswordStyles } from '../../styles/forgotPassword.style'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { forgotPassword, resetPassword } from '@/redux/auth/actions'
import { registrationStyles } from '@/styles/registration.style'
import { useRouter } from 'next/router'

const validationSchema = yup.object({
	password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
	confirmPassword: yup
		.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required')
		.oneOf([yup.ref('password')], 'Password does not match'),
})

const ResetPasswordForm = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const router = useRouter()

	const dispatch = useDispatch<AppDispatch>()
	const isLoading = useSelector((state: RootState) => state.auth.isLoading)
	const errors = useSelector((state: RootState) => state.auth.errors)
	const response = useSelector((state: RootState) => state.auth.response)
	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			console.log('values', values)
			dispatch(resetPassword({ password: values.password, resetLink: router.pathname.toString() }))
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
					Reset Password
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
									sx={registrationStyles.textField}
									label='Password'
									variant='outlined'
									type='password'
									name='password'
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
									inputProps={{ 'data-testid': 'register-password-input' }}
								/>
								<TextField
									size='small'
									sx={registrationStyles.textField}
									label='Confirm Password'
									variant='outlined'
									type='password'
									name='confirmPassword'
									value={formik.values.confirmPassword}
									onChange={formik.handleChange}
									error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
									helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
									inputProps={{ 'data-testid': 'register-confirmPassword-input' }}
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

export default ResetPasswordForm
