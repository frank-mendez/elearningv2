import { TabPanelProps } from '@/types'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import EditSubjectForm from '../../../components/Subject/EditSubjectForm'
import EditCourses from '../../../components/Subject/EditCourses'
import { useRouter } from 'next/router'
import CommonLayout from '@/common/CommonLayout'
import CommonPageHeader from '@/common/CommonPageHeader'
import MenuBookIcon from '@mui/icons-material/MenuBook'

const EditSubject = () => {
	const router = useRouter()
	const { subjectId } = router.query
	const [value, setValue] = useState(0)

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props

		return (
			<div role='tabpanel' hidden={value !== index} id={`subject-tabpanel-${index}`} aria-labelledby={`subject-tab-${index}`} {...other}>
				{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
			</div>
		)
	}

	function a11yProps(index: number) {
		return {
			id: `subject-tab-${index}`,
			'aria-controls': `subject-tabpanel-${index}`,
		}
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<CommonLayout title='Update Subject'>
			<CommonPageHeader
				title={
					<>
						<MenuBookIcon /> Update Subjects
					</>
				}
				headerChild={<></>}
				actionButton={<></>}
			/>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange}>
						<Tab label='Subject' {...a11yProps(0)} />
						<Tab label='Courses' {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<EditSubjectForm subjectId={subjectId as string} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<EditCourses subjectId={subjectId as string} />
				</TabPanel>
			</Box>
		</CommonLayout>
	)
}

export default EditSubject
