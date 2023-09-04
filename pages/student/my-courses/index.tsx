import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useELearningContext } from '@/context/ELearningContext'
import CourseContainer from '../../../components/Student/CourseContainer'
import { Course } from '@/types'
import CommonLoading from '@/common/CommonLoading'
import CommonLayout from '@/common/CommonLayout'
import { getStudentEnrolledCourse } from '@/services/student.service'
const MyCourses = () => {
	const [courses, setCourses] = useState<Course[]>([])
	const { userId } = useELearningContext()
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		const getStudentEnrolledCourseData = async () => {
			const response = await getStudentEnrolledCourse(userId)
			if (response.length > 0) {
				setCourses(response)
			}
			setLoading(false)
		}
		getStudentEnrolledCourseData()
	}, [userId, setCourses, setLoading])

	return (
		<CommonLayout isStudent={true} title='My Courses'>
			<>
				{loading ? (
					<CommonLoading />
				) : (
					<Grid style={{ marginTop: '50px' }} container spacing={2}>
						{courses.map((data) => {
							return (
								<Grid key={data.id} item xs={4}>
									<CourseContainer isEnrolled={true} data={data} />
								</Grid>
							)
						})}
					</Grid>
				)}
			</>
		</CommonLayout>
	)
}

export default MyCourses
