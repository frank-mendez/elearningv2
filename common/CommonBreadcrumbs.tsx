import { Breadcrumbs, Link, Stack } from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface CommonBreadcrumbs {
	title: string
	link: string
	element?: JSX.Element
}

type CommonBreadcrumbsProps = {
	breadcrumbs: CommonBreadcrumbs[]
}

const CommonBreadcrums = () => {
	const breadcrumbs = [
		<Link underline='hover' key='1' color='inherit' href='/' onClick={() => {}}>
			Subjects
		</Link>,
	]
	return (
		<Stack spacing={2}>
			<Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
				{breadcrumbs}
			</Breadcrumbs>
		</Stack>
	)
}

export default CommonBreadcrums
