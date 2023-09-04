import CommonLayout from '@/common/CommonLayout'
import CommonLoading from '@/common/CommonLoading'
import CommonPageHeader from '@/common/CommonPageHeader'
import { RootState } from '@/redux/store'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Card, CardContent, Typography } from '@mui/material'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
	const [loading, setLoading] = useState(false)
	const user = useSelector((state: RootState) => state.auth.user)

	return (
		<CommonLayout title='Profile'>
			<CommonPageHeader
				title={
					<>
						<AccountBoxIcon /> {user.email}
					</>
				}
				headerChild={<></>}
				actionButton={<></>}
			/>
			{loading ? (
				<CommonLoading />
			) : (
				<Fragment>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
								Email: {user.email}
							</Typography>
							<Typography variant='h5' component='div'>
								Name: {user.firstName} {user.lastName}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								Type: {user.role}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								ID: {user.id}
							</Typography>
						</CardContent>
					</Card>
				</Fragment>
			)}
		</CommonLayout>
	)
}

export default Profile
