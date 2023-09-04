import { Box } from '@mui/material'
import React from 'react'
import AddModuleForm from '../../../components/Modules/AddModuleForm'
import CommonLayout from '@/common/CommonLayout'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import CommonPageHeader from '@/common/CommonPageHeader'
import { subjectStyles } from '@/styles/subject.style'

const AddModule = () => {
	return (
		<CommonLayout title='Add Module'>
			<CommonPageHeader
				title={
					<>
						<MenuBookIcon /> Add Module
					</>
				}
				headerChild={<></>}
				actionButton={<></>}
			/>
			<Box sx={subjectStyles.subjectContainer}>
				<AddModuleForm />
			</Box>
		</CommonLayout>
	)
}

export default AddModule
