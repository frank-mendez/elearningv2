import React, { useEffect, useMemo, useState } from 'react'
import { Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Badge } from '@mui/material'
import { ExitToApp, Lock } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import theme from '@/theme'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { logoutUser, updateThemeMode } from '@/redux/auth/actions'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useRouter } from 'next/router'

const styles = {
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	title: {
		flexGrow: 1,
	},
	avatar: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
}

type CommonAppBarProps = {
	open: boolean
	handleDrawerOpen: () => void
	email: string
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const CommonAppBar = (props: CommonAppBarProps) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const navigation = useRouter()
	const { open, handleDrawerOpen } = props
	const dispatch = useDispatch<AppDispatch>()
	const mode = useSelector((state: RootState) => state.auth.user?.theme)
	const userId = useSelector((state: RootState) => state.auth.user.id)
	const [isDark, setIsDark] = useState<boolean>(false)
	const [userEmail, setUserEmail] = useState<string>('')

	useEffect(() => {
		if (props.email) {
			setUserEmail(props.email)
		}
	}, [props, setUserEmail])

	useEffect(() => {
		if (mode === 'light') {
			setIsDark(false)
		} else {
			setIsDark(true)
		}
	}, [mode, setIsDark])

	const handleMenuOpen = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleChangePassword = () => {
		handleMenuClose()
		navigation.push('/change-password')
	}

	const handleProfile = () => {
		handleMenuClose()
		navigation.push('/profile')
	}

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	const handleChangeMode = () => {
		const payload = {
			id: userId,
			mode: isDark ? 'light' : 'dark',
		}
		dispatch(updateThemeMode(payload))
		setIsDark(!isDark)
	}

	const DarkLightModeButton = () =>
		useMemo(() => {
			return (
				<IconButton onClick={handleChangeMode} sx={{ marginLeft: 'auto', color: isDark ? 'black' : 'gray' }} aria-label='Dark Light Theme Button'>
					{isDark ? <DarkModeIcon /> : <LightModeIcon />}
				</IconButton>
			)
		}, [isDark])

	return (
		<AppBar position='fixed'>
			<Toolbar>
				<IconButton
					sx={{ fontSize: '15px', color: isDark ? 'black' : 'gray', marginRight: '50px' }}
					color='inherit'
					aria-label='open drawer'
					onClick={handleDrawerOpen}
					edge='end'
				>
					<MenuIcon />
				</IconButton>
				<Image src='/arcanyslogo.svg' width={31} height={25} alt='Arcanys Logo' />
				<Typography sx={{ fontSize: '15px', color: isDark ? 'black' : 'gray' }} variant='h6' noWrap>
					eLearning
				</Typography>
				<DarkLightModeButton />
				<IconButton size='large' aria-label='show 17 new notifications' color='primary'>
					<Badge badgeContent={17} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<Avatar alt='User Avatar' sx={styles.avatar} />
				<Typography color='GrayText'>{userEmail}</Typography>
				<IconButton
					sx={{ fontSize: '15px', color: isDark ? 'black' : 'gray' }}
					edge='end'
					aria-label='account of current user'
					aria-haspopup='true'
					onClick={handleMenuOpen}
					color='inherit'
				>
					<ExpandMoreIcon />
				</IconButton>
				<Menu
					id='menu-appbar'
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
					<MenuItem onClick={handleProfile}>
						<AccountBoxIcon />
						&nbsp; My Profile
					</MenuItem>
					<MenuItem onClick={handleChangePassword}>
						<Lock />
						&nbsp; Change Password
					</MenuItem>
					<MenuItem onClick={handleLogout}>
						<ExitToApp />
						&nbsp; Logout
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	)
}

export default CommonAppBar
