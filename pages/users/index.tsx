import React from 'react'
import UserDashboard from '../../components/User/UserDashboard'
import CommonLayout from '@/common/CommonLayout'

export default function UserComponent() {
	return (
		<CommonLayout title='Users'>
			<UserDashboard />
		</CommonLayout>
	)
}
