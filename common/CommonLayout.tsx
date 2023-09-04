import { Alert, Backdrop, Box, CssBaseline } from '@mui/material'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import CommonAppBar from './CommonAppBar'
import Head from 'next/head'
import StudentDrawer from './StudentDrawer'
import CommonDrawer from './CommonDrawer'
import { Main } from '@/common/CommonMain'
import { DrawerHeader } from './CommonDrawerHeader'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { fetchLocalStorageData, removeLocalStorageData } from '@/helpers/localStorage'
import isTokenExpired from '@/helpers/jsonTokenChecker'
import { logoutUser } from '@/redux/auth/actions'

const CommonLayout = (props: PropsWithChildren<{ title: string; isStudent?: boolean }>) => {
	const [activeOpen, setActiveOpen] = useState<boolean>(false)
	const [open, setOpen] = useState(true)
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()

	const email = useSelector((state: RootState) => state.auth.user.email)
	const authorized = useSelector((state: RootState) => state.auth.isLoggedIn)
	const role = useSelector((state: RootState) => state.auth.user.role)
	const isActive = useSelector((state: RootState) => state.auth.user.isActive)

	const accessToken = fetchLocalStorageData('accessToken')

	useEffect(() => {
		if (accessToken && isTokenExpired(accessToken)) {
			removeLocalStorageData('accessToken')
			dispatch(logoutUser())
		}
	}, [accessToken, isTokenExpired])

	useEffect(() => {
		if (!authorized) {
			router.push('/login')
		}
	}, [authorized])

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleClose = () => {
		setActiveOpen(false)
	}

	useEffect(() => {
		setActiveOpen(!isActive)
	}, [isActive, setActiveOpen])

	return (
		<Box sx={{ display: 'flex' }}>
			<Head>
				<title>{props.title}</title>
			</Head>
			<CssBaseline />
			<CommonAppBar email={email} open={open} handleDrawerOpen={handleDrawerOpen} />
			{role === 'student' ? (
				<StudentDrawer open={open} handleDrawerClose={handleDrawerClose} />
			) : (
				<CommonDrawer open={open} handleDrawerClose={handleDrawerClose} />
			)}
			<Main sx={{ padding: '0px' }} open={open}>
				<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={activeOpen} onClick={handleClose}>
					<Alert severity='error'>Your account has not yet been activated. Please check your email to activate account</Alert>
				</Backdrop>
				<DrawerHeader />

				{props.children}
			</Main>
		</Box>
	)
}

export default CommonLayout
