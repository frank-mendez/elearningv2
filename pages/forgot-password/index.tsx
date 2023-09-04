import React from 'react'
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPasswordForm'
import { Box, ThemeProvider } from '@mui/material'
import { forgotPasswordStyles } from '../../styles/forgotPassword.style'
import theme from '@/theme'
import Head from 'next/head'

export async function getStaticProps() {
	return {
		props: {
			title: 'Forgot Password Page',
		}, // will be passed to the page component as props
	}
}

const Index = (props: { title: string }) => {
	return (
		<Box sx={forgotPasswordStyles.forgotPasswordContainer}>
			<Head>
				<title>{props.title}</title>
			</Head>
			<ForgotPasswordForm />
		</Box>
	)
}

export default Index
