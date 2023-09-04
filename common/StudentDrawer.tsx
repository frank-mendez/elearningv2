import { Drawer, List, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import Image from 'next/image'
import { DrawerHeader } from './CommonDrawerHeader'
import { useRouter } from 'next/router'

type CommonDrawerProps = {
	open: boolean
	handleDrawerClose: () => void
}

type MenuList = {
	title: string
	icon: JSX.Element
	link: string
}

const StudentDrawer = (props: CommonDrawerProps) => {
	const theme = useTheme()
	const router = useRouter()

	const { open, handleDrawerClose } = props

	const menuList: MenuList[] = [
		{ title: 'Courses', icon: <KeyboardIcon />, link: '/student/' },
		{ title: 'My Courses', icon: <KeyboardIcon />, link: '/student/my-courses' },
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
			<List>
				{menuList.map((menu) => {
					return (
						<ListItem key={menu.title} disablePadding>
							<ListItemButton onClick={() => handleClick(menu.link)}>
								{menu.icon} <ListItemText sx={{ marginLeft: '15px' }} primary={menu.title} />
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
		</Drawer>
	)
}

export default StudentDrawer
