import { CircularProgress } from '@mui/material'
import React from 'react'

const CommonLoading = () => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '50px' }}>
			<CircularProgress />
		</div>
	)
}

export default CommonLoading
