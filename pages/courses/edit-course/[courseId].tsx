import { Box, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { TabPanelProps } from '@/types'
import EditCourseForm from '../../../components/Courses/EditCourseForm'
import EditModule from '../../../components/Courses/EditModule'
import CommonLayout from '@/common/CommonLayout'

const EditCourse = () => {
	const router = useRouter()
	const { courseId } = router.query
	const [value, setValue] = useState(0)

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

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<CommonLayout title='Edit Course'>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange}>
						<Tab label='Course' {...a11yProps(0)} />
						<Tab disabled label='Modules' {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<EditCourseForm courseId={courseId as string} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<EditModule courseId={courseId as string} />
				</TabPanel>
			</Box>
		</CommonLayout>
	)
}

export default EditCourse
