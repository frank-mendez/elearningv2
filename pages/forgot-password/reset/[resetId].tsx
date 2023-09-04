import React from 'react'
import theme from '@/theme'
import Head from 'next/head'
import { Box } from '@mui/material'
import { forgotPasswordStyles } from '@/styles/forgotPassword.style'
import ResetPasswordForm from '@/components/ForgotPassword/ResetPasswordForm'
import { GetStaticPaths } from 'next/types'

export async function getStaticProps() {
	return {
		props: {
			title: 'Reset Password Page',
		}, // will be passed to the page component as props
	}
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: 'blocking', //indicates the type of fallback
	}
}

const Index = (props: { title: string }) => {
	return (
		<Box sx={forgotPasswordStyles.forgotPasswordContainer}>
			<Head>
				<title>{props.title}</title>
			</Head>
			<ResetPasswordForm />
		</Box>
	)
}

export default Index
