import { Alert, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Snackbar, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { Fragment, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import { Course } from '@/types'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useELearningContext } from '@/context/ELearningContext'
import axios from 'axios'
import CommonLoading from '@/common/CommonLoading'
import { useRouter } from 'next/router'

const CourseContainer = (props: { data: Course; isEnrolled?: boolean }) => {
	const { data } = props
	const router = useRouter()
	const { userId } = useELearningContext()
	const [loading, setLoading] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [enrolled, setEnrolled] = useState<boolean>(false)

	const handleEnroll = () => {
		const { id } = data
		setLoading(true)
		axios
			.post(`${process.env.apiUrl}/enrollment`, { courseId: id, userId })
			.then((data) => {
				setLoading(false)
				setSuccess(true)
				setEnrolled(true)
			})
			.catch((err) => {
				setError(true)
				setErrorMessage('Something went wrong')
			})
	}

	const handleStart = () => {
		router.push(`/student/my-courses/${data.id}`)
	}

	return (
		<div>
			<Card>
				<CardHeader
					action={
						<Typography variant='subtitle1'>
							<AccessTimeIcon />
							{data.duration}
						</Typography>
					}
					title={data.subject}
				/>
				<CardContent>
					<Image width={200} height={200} style={{ marginLeft: '25%' }} src={data.icon} alt='Course Image' />
					<Typography gutterBottom variant='h5' component='div'>
						{data.title}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{data.author} <br />
						{moment(data.createdAt).format('MMMM DD, YYYY')}
					</Typography>
				</CardContent>
				<CardActions>
					{loading ? (
						<CommonLoading />
					) : (
						<Fragment>
							{props.isEnrolled ? (
								<Button onClick={handleStart} variant='outlined' color='primary'>
									Start
								</Button>
							) : (
								<Button disabled={enrolled} onClick={handleEnroll} variant='outlined' color='primary'>
									{enrolled ? 'Enrolled' : 'Enroll'}
								</Button>
							)}
						</Fragment>
					)}
				</CardActions>
			</Card>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={success} onClose={() => setSuccess(false)} autoHideDuration={2000}>
				<Alert severity='success'>Course was enrolled</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} onClose={() => setError(false)} autoHideDuration={2000}>
				<Alert severity='error'>{errorMessage}</Alert>
			</Snackbar>
		</div>
	)
}

export default CourseContainer
