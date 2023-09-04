import React from 'react'
import SubjectDashboard from './subject'
import CommonLayout from '@/common/CommonLayout'

export default function Dashboard() {
	return (
		<CommonLayout title='Dashboard'>
			<SubjectDashboard />
		</CommonLayout>
	)
}
