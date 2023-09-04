import { commonHeaderStyles } from '@/styles/commonHeader.style'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const CommonPageHeader = (props: { title: any; headerChild: any; actionButton: any }) => {
	return (
		<Stack
			sx={commonHeaderStyles.headerContainer}
			direction={{ xs: 'column', sm: 'row' }}
			justifyContent='space-between'
			alignItems='flext-start'
			spacing={{ xs: 1, sm: 2, md: 4 }}
		>
			<Typography variant='h6'>{props.title}</Typography>
			<Box>{props.headerChild}</Box>
			{props.actionButton}
		</Stack>
	)
}

export default CommonPageHeader
