import CommonAppBar from '@/common/CommonAppBar'
import CommonDrawer from '@/common/CommonDrawer'
import { useELearningContext } from '@/context/ELearningContext'
import { TabPanelProps } from '@/types'
import { Box, CssBaseline, Tab, Tabs } from '@mui/material'
import Head from 'next/head'
import React, { useState } from 'react'
import { Main } from '@/common/CommonMain'

export async function getStaticProps() {
	return {
		props: {
			title: 'Add Subject',
		}, // will be passed to the page component as props
	}
}

const AddUser = (props: { title: string }) => {
	const { email, open, handleDrawerClose, handleDrawerOpen } = useELearningContext()
	const [value, setValue] = useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props

		return (
			<div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
				{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
			</div>
		)
	}

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		}
	}

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<Head>
					<title>{props.title}</title>
				</Head>
				<CssBaseline />
				<CommonAppBar email={email} open={open} handleDrawerOpen={handleDrawerOpen} />
				<CommonDrawer open={open} handleDrawerClose={handleDrawerClose} />
				<Main open={open} sx={{ marginTop: '60px' }}>
					{' '}
				</Main>
			</Box>
		</div>
	)
}

export default AddUser
