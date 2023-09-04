import { useRouter } from 'next/router'
import React from 'react'
import EditModuleForm from '../../../components/Modules/EditModuleForm'
import CommonLayout from '@/common/CommonLayout'

const EditModule = () => {
	const router = useRouter()
	const { moduleId } = router.query

	return (
		<CommonLayout title='Edit Module'>
			<EditModuleForm moduleId={moduleId as string} />
		</CommonLayout>
	)
}

export default EditModule
