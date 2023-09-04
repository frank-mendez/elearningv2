import { TabPanelProps } from '@/types'
import { Box, Input, InputAdornment, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import AddSubjectForm from '../../../components/Subject/AddSubjectForm'
import Courses from '../../../components/Subject/Courses'
import CommonLayout from '@/common/CommonLayout'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import CommonPageHeader from '@/common/CommonPageHeader'
import { subjectStyles } from '@/styles/subject.style'

const AddSubject = () => {
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
		<CommonLayout title='Add Subject'>
			<CommonPageHeader
				title={
					<>
						<MenuBookIcon /> Add Subjects
					</>
				}
				headerChild={<></>}
				actionButton={<></>}
			/>
			<Box sx={subjectStyles.subjectContainer}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange}>
						<Tab label='Subject' {...a11yProps(0)} />
						<Tab label='Courses' {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<AddSubjectForm />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Courses />
				</TabPanel>
			</Box>
		</CommonLayout>
	)
}

export default AddSubject
