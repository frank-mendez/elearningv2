import React from 'react'
import StudentDashboard from '../../components/Student/StudentDashboard'
import CommonLayout from '@/common/CommonLayout'

export default function PersistentDrawerLeft() {
	return (
		<CommonLayout isStudent={true} title='Student Dashboard'>
			<StudentDashboard />
		</CommonLayout>
	)
}
