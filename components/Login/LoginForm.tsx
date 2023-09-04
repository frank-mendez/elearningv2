import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import CommonLoading from '@/common/CommonLoading'
import { useELearningContext } from '@/context/ELearningContext'
import { loginStyles } from '../../styles/login.style'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/redux/auth/actions'
import { AppDispatch, RootState } from '@/redux/store'

const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Email is required'),
	password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
})

const LoginForm = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useRouter()
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

	useEffect(() => {
		if (isLoggedIn) {
			navigate.push('/')
		}
	}, [isLoggedIn])

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true)
			try {
				const payload = {
					email: values.email,
					password: values.password,
				}
				dispatch(loginUser(payload))
			} catch (error) {
				setLoading(false)
				setError(true)
				setErrorMessage('Invalid Credentials')
			}
		},
	})

	return (
		<Box sx={loginStyles.loginForm}>
			<Image src='/arcanyslogo.svg' width={31} height={25} alt='Arcanys Logo' />
			<Typography color='primary' component='h1' variant='h5'>
				Welcome to Arcanys eLearning
			</Typography>
			{loading ? (
				<CommonLoading />
			) : (
				<form
					style={{
						width: '100%', // Fix IE 11 issue.
					}}
					onSubmit={formik.handleSubmit}
				>
					<TextField
						size='small'
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						role='email'
						label='Email Address'
						name='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						inputProps={{ 'data-testid': 'login-email-input' }}
					/>
					<TextField
						size='small'
						variant='outlined'
						margin='normal'
						required
						fullWidth
						role='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						name='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						inputProps={{ 'data-testid': 'login-password-input' }}
					/>
					<Button type='submit' fullWidth variant='contained' color='primary' sx={loginStyles.submit}>
						Login
					</Button>
					<Grid container>
						<Grid sx={loginStyles.textFormat} item xs>
							<Link href='/forgot-password'>Forgot password?</Link>
						</Grid>
						<Grid sx={loginStyles.textFormat} item>
							<Link href='/registration'>{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</form>
			)}
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={6000}>
				<Alert severity='error'>{errorMessage ? errorMessage : 'Something went wrong! Pelase try again'}</Alert>
			</Snackbar>
		</Box>
	)
}

export default LoginForm
