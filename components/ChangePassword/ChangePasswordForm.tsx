import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, TextField, Typography } from '@mui/material'
import theme from '@/theme'

const validationSchema = yup.object({
	currentPassword: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
	password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
	confirmPassword: yup
		.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required')
		.oneOf([yup.ref('password')], 'Password does not match'),
})

const ChangePasswordForm = () => {
	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {},
	})

	const styles = {
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: theme.spacing(3),
		},
		textField: {
			margin: theme.spacing(1),
			width: '400px',
		},
		button: {
			margin: theme.spacing(2),
		},
		successText: {
			marginBottom: theme.spacing(2),
		},
	}

	return (
		<form
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: theme.spacing(3),
				background: 'white',
				padding: '30px 40px',
				borderRadius: '5px',
			}}
			onSubmit={formik.handleSubmit}
		>
			<Typography color='primary' marginBottom={4} align='center' variant='h4'>
				eLearning Portal
			</Typography>
			<Typography align='center' color='secondary' marginBottom={4} variant='h6'>
				Change Password
			</Typography>
			<TextField
				sx={styles.textField}
				label='Current Password'
				variant='outlined'
				type='password'
				name='currentPassword'
				value={formik.values.currentPassword}
				onChange={formik.handleChange}
				error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
				helperText={formik.touched.currentPassword && formik.errors.currentPassword}
			/>
			<TextField
				sx={styles.textField}
				label='Password'
				variant='outlined'
				type='password'
				name='password'
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={formik.touched.password && formik.errors.password}
			/>
			<TextField
				sx={styles.textField}
				label='Confirm Password'
				variant='outlined'
				type='password'
				name='confirmPassword'
				value={formik.values.confirmPassword}
				onChange={formik.handleChange}
				error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
				helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
			/>
			<Button sx={styles.button} variant='contained' color='primary' type='submit'>
				Register
			</Button>
		</form>
	)
}

export default ChangePasswordForm
