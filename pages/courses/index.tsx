import React from 'react'
import CourseDashboard from '../../components/Courses/CourseDashboard'
import CommonLayout from '@/common/CommonLayout'

export default function CourseComponent() {
	return (
		<CommonLayout title='Courses'>
			<CourseDashboard />
		</CommonLayout>
	)
}
