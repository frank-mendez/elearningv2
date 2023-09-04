import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CourseContainer from './CourseContainer'
import CommonLoading from '@/common/CommonLoading'
import { Course, IMenu } from '@/types'
import { getUserDropdown } from '@/services/user.service'
import { getSubjectDropdown } from '@/services/subject.service'
import { getCourses } from '@/services/course.service'

const StudentDashboard = () => {
	const [courses, setCourses] = useState<Course[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [author, setAuthor] = useState<string>('')
	const [subject, setSubject] = useState<string>('')
	const [search, setSearch] = useState<string>('')
	const [userDropdownValues, setUserDropdownValues] = useState<IMenu[]>([])
	const [subjectDropdownValues, setSubjectDropdownValues] = useState<IMenu[]>([])

	useEffect(() => {
		setLoading(true)
		const getCoursesData = async () => {
			const coursesResponse: Course[] = await getCourses()
			if (coursesResponse.length > 0) {
				setCourses(coursesResponse)
			}
			setLoading(false)
		}
		getCoursesData()
	}, [setCourses, setLoading])

	useEffect(() => {
		const getDropdownValues = async () => {
			const userDropdownResponse: IMenu[] = await getUserDropdown()
			if (userDropdownResponse) {
				setUserDropdownValues(userDropdownResponse)
			}
		}
		getDropdownValues()
	}, [setUserDropdownValues])

	useEffect(() => {
		const getSubjectDropdownValues = async () => {
			const subjectDropdownResponse: IMenu[] = await getSubjectDropdown()
			if (subjectDropdownResponse) {
				setSubjectDropdownValues(subjectDropdownResponse)
			}
		}
		getSubjectDropdownValues()
	}, [setSubjectDropdownValues])

	return (
		<div>
			<div>
				<Typography variant='h5'>Welcome to the eLearning portal</Typography>
				<Typography variant='subtitle1'>
					Our courses will step you through the process of building a small application or adding a new feature to an existing application
				</Typography>
			</div>
			<Grid style={{ marginTop: '50px' }} container spacing={2}>
				<Grid item xs={4}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='course'
						label='Search for a course'
						name='search'
						placeholder='Enter a keyword'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						select
						fullWidth
						margin='normal'
						name='subject'
						placeholder='Subject'
						label='Subject'
						variant='outlined'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					>
						{subjectDropdownValues && subjectDropdownValues.length > 0 ? (
							subjectDropdownValues.map((subject) => (
								<MenuItem key={subject.value} value={subject.value}>
									{subject.name}
								</MenuItem>
							))
						) : (
							<MenuItem value=''>No Available Options</MenuItem>
						)}
					</TextField>
				</Grid>
				<Grid item xs={4}>
					<TextField
						select
						fullWidth
						margin='normal'
						name='instructor'
						placeholder='Instructor'
						label='Author'
						variant='outlined'
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					>
						{userDropdownValues && userDropdownValues.length > 0 ? (
							userDropdownValues.map((user) => (
								<MenuItem key={user.value} value={user.value}>
									{user.name}
								</MenuItem>
							))
						) : (
							<MenuItem value=''>No Available Options</MenuItem>
						)}
					</TextField>
				</Grid>
			</Grid>
			{loading ? (
				<CommonLoading />
			) : (
				<Grid style={{ marginTop: '50px' }} container spacing={2}>
					{courses.map((data) => {
						return (
							<Grid key={data.id} item xs={4}>
								<CourseContainer data={data} />
							</Grid>
						)
					})}
				</Grid>
			)}
		</div>
	)
}

export default StudentDashboard
