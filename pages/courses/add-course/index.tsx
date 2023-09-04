import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { TabPanelProps } from '@/types'
import AddCourseForm from '../../../components/Courses/AddCourseForm'
import AddModulesForm from '../../../components/Courses/AddModulesForm'
import CommonLayout from '@/common/CommonLayout'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import CommonPageHeader from '@/common/CommonPageHeader'
import { subjectStyles } from '@/styles/subject.style'

const AddCourse = () => {
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
		<CommonLayout title='Add Course'>
			<CommonPageHeader
				title={
					<>
						<MenuBookIcon /> Add Course
					</>
				}
				headerChild={<></>}
				actionButton={<></>}
			/>
			<Box sx={subjectStyles.subjectContainer}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange}>
						<Tab label='Course' {...a11yProps(0)} />
						<Tab disabled label='Modules' {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<AddCourseForm />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AddModulesForm />
				</TabPanel>
			</Box>
		</CommonLayout>
	)
}

export default AddCourse
