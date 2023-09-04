import React from 'react'
import LoginForm from '../../components/Login/LoginForm'
import Head from 'next/head'
import { Box } from '@mui/material'
import { loginStyles } from '../../styles/login.style'
import { ELearningProvider } from '@/context/ELearningContext'

export async function getStaticProps() {
	return {
		props: {
			title: 'Login Page',
		}, // will be passed to the page component as props
	}
}

const Index = (props: { title: string }) => {
	return (
		<Box sx={loginStyles.formContainer}>
			<Head>
				<title>{props.title}</title>
			</Head>
			<LoginForm />
		</Box>
	)
}

export default Index
