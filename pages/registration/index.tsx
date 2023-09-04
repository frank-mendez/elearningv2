import React from 'react'
import RegistrationForm from '../../components/Registration/RegistrationForm'
import Head from 'next/head'
import { Box } from '@mui/material'
import { registrationStyles } from '../../styles/registration.style'
import { ELearningProvider } from '@/context/ELearningContext'

export async function getStaticProps() {
	return {
		props: {
			title: 'Registration Page',
		}, // will be passed to the page component as props
	}
}

const Index = (props: { title: string }) => {
	return (
		<Box sx={registrationStyles.registrationContainer}>
			<Head>
				<title>{props.title}</title>
			</Head>
			<RegistrationForm />
		</Box>
	)
}

export default Index
