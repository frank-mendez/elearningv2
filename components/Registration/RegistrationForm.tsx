import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import {
	Button,
	Select,
	TextField,
	Typography,
	MenuItem,
	FormControl,
	InputLabel,
	CircularProgress,
	FormHelperText,
	Alert,
	Snackbar,
	Box,
	Grid,
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import { registrationStyles } from '../../styles/registration.style'
import { CSSProperties } from '@mui/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { registerUser } from '@/redux/auth/actions'
import { RegisterUserDto } from '@/types/user'
import { AppDispatch, RootState } from '@/redux/store'

const validationSchema = yup.object({
	email: yup.string().email('Enter a valid email').required('Email is required'),
	firstName: yup.string().required('First Name is required'),
	lastName: yup.string().required('Last Name is required'),
	role: yup.string().required('Role is required'),
	password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
	confirmPassword: yup
		.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required')
		.oneOf([yup.ref('password')], 'Password does not match'),
})

const RegistrationForm = () => {
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [successRegistration, setSuccessRegistration] = useState(false)
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
	const registerError = useSelector((state: RootState) => state.auth.errors)
	const isLoading = useSelector((state: RootState) => state.auth.isLoading)

	useEffect(() => {
		setLoading(isLoading)
	}, [isLoading, setLoading])

	useEffect(() => {
		if (registerError[0]) {
			setError(true)
			if (typeof registerError[0] === 'string') {
				setErrorMessage(registerError[0])
			}
		}
	}, [registerError, setErrorMessage])

	useEffect(() => {
		if (isLoggedIn) {
			setSuccessRegistration(true)
			router.push('/')
		}
	}, [isLoggedIn])

	const formik = useFormik({
		initialValues: {
			role: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const { role, email, firstName, lastName, password } = values
				const payload: RegisterUserDto = {
					role,
					email,
					firstName,
					lastName,
					password,
					theme: 'light',
				}

				dispatch(registerUser(payload))
				setLoading(false)
			} catch (error: any) {
				console.error('error.response', error)
				setLoading(false)
				setErrorMessage(error.toString())
				setError(true)
			}
		},
	})

	return (
		<Fragment>
			<form style={registrationStyles.formContainer as CSSProperties} onSubmit={formik.handleSubmit}>
				<Image src='/arcanyslogo.svg' width={31} height={25} alt='Arcanys Logo' />
				<Typography color='primary' align='center' variant='h4'>
					Arcanys eLearning Portal
				</Typography>
				<Typography align='center' color='secondary' variant='h6'>
					Create an account
				</Typography>
				{loading ? (
					<Box sx={registrationStyles.loading}>
						<CircularProgress />
					</Box>
				) : (
					<Fragment>
						{successRegistration ? (
							<Box sx={registrationStyles.successContainer}>
								<MarkEmailReadIcon color='primary' fontSize='large' />
								<Typography variant='h4' sx={registrationStyles.successText}>
									Registration Successful!
								</Typography>
								<Button variant='contained' color='primary' sx={registrationStyles.button} onClick={() => router.push('login')}>
									Login
								</Button>
							</Box>
						) : (
							<>
								<FormControl size='small' sx={registrationStyles.textField} error={formik.touched.role && Boolean(formik.errors.role)}>
									<InputLabel>Role</InputLabel>
									<Select
										size='small'
										inputProps={{ 'data-testid': 'register-role-input' }}
										labelId='role-select-label'
										id='role-select'
										name='role'
										value={formik.values.role}
										onChange={formik.handleChange}
									>
										<MenuItem value='student'>Student</MenuItem>
										<MenuItem value='instructor'>Instructor</MenuItem>
									</Select>
									{Boolean(formik.errors.role) && <FormHelperText>{formik.errors.role}</FormHelperText>}
								</FormControl>
								<TextField
									size='small'
									sx={registrationStyles.textField}
									label='Email'
									variant='outlined'
									name='email'
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
									inputProps={{ 'data-testid': 'register-email-input' }}
								/>
								<TextField
									size='small'
									sx={registrationStyles.textField}
									label='First Name'
									variant='outlined'
									name='firstName'
									value={formik.values.firstName}
									onChange={formik.handleChange}
									error={formik.touched.firstName && Boolean(formik.errors.firstName)}
									helperText={formik.touched.firstName && formik.errors.firstName}
									inputProps={{ 'data-testid': 'register-firstName-input' }}
								/>
								<TextField
									size='small'
									sx={registrationStyles.textField}
									label='Last Name'
									variant='outlined'
									name='lastName'
									value={formik.values.lastName}
									onChange={formik.handleChange}
									error={formik.touched.lastName && Boolean(formik.errors.lastName)}
									helperText={formik.touched.lastName && formik.errors.lastName}
									inputProps={{ 'data-testid': 'register-lastName-input' }}
								/>
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
								<Button fullWidth sx={registrationStyles.button} variant='contained' color='primary' type='submit'>
									Register
								</Button>
								<Grid container>
									<Grid sx={registrationStyles.textFormat} item xs>
										<Link href='/forgot-password'>Forgot password?</Link>
									</Grid>
									<Grid sx={registrationStyles.textFormat} item>
										<Link href='/login'>{'Already have an account? Login'}</Link>
									</Grid>
								</Grid>
							</>
						)}
					</Fragment>
				)}
			</form>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={6000}>
				<Alert color='error' severity='error'>
					{errorMessage ? errorMessage : 'Something went wrong! Please try again'}
				</Alert>
			</Snackbar>
		</Fragment>
	)
}

export default RegistrationForm
