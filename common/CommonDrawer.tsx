import { Drawer, List, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import BarChartIcon from '@mui/icons-material/BarChart'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import GroupIcon from '@mui/icons-material/Group'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { commonStyles } from './Common.style'

type CommonDrawerProps = {
	open: boolean
	handleDrawerClose: () => void
}

type MenuList = {
	title: string
	icon: JSX.Element
	link: string
}

const CommonDrawer = (props: CommonDrawerProps) => {
	const theme = useTheme()
	const router = useRouter()
	const DrawerHeader = styled('div')(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
		background: '#2D323E',
		color: 'white',
	}))
	const { open, handleDrawerClose } = props

	const menuList: MenuList[] = [
		{ title: 'Subjects', icon: <BarChartIcon />, link: '/' },
		{ title: 'Courses', icon: <KeyboardIcon />, link: '/courses' },
		{ title: 'Modules', icon: <ViewModuleIcon />, link: '/modules' },
		{ title: 'Users', icon: <GroupIcon />, link: '/users' },
	]

	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<Drawer
			sx={{
				width: 240,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 240,
					boxSizing: 'border-box',
					background: '#2D323E',
					color: 'white',
					border: 'none',
				},
			}}
			variant='persistent'
			anchor='left'
			open={open}
		>
			<DrawerHeader sx={{ background: '#000000DE' }}>
				<Image src='/arcanyslogo.svg' width={31} height={25} alt='Arcanys Logo' />
				<Typography>eLearning</Typography>
				<IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<Typography sx={{ color: '#FFFFFF80', marginLeft: '15px', marginTop: '20px' }} variant='subtitle1'>
				MANAGEMENT
			</Typography>
			<List>
				{menuList.map((menu) => {
					return (
						<ListItem sx={menu.link === router.pathname ? commonStyles.activeLink : null} key={menu.title} disablePadding>
							<ListItemButton sx={{ padding: '4px 15px' }} onClick={() => handleClick(menu.link)}>
								{menu.icon} <ListItemText sx={{ marginLeft: '15px' }} primary={menu.title} />
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
		</Drawer>
	)
}

export default CommonDrawer
