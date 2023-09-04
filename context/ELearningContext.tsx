import { createTheme, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface IAuthUser {
	access_token: string
	firstName: string
	lastName: string
	email: string
	isActive: boolean
	id: string
	role: string
}

interface IELearningContext {
	authUser: IAuthUser
	setAuthUser: Dispatch<SetStateAction<IAuthUser>>
	open: boolean
	handleDrawerOpen: () => void
	handleDrawerClose: () => void
	email: string
	userId: string
	role: string
	isActive: boolean
	isDark: boolean
	setIsDark: Dispatch<SetStateAction<boolean>>
}

const initialValues: IAuthUser = {
	access_token: '',
	firstName: '',
	lastName: '',
	email: '',
	isActive: false,
	id: '',
	role: '',
}

const ElearningContext = createContext<IELearningContext>({
	authUser: initialValues,
	setAuthUser: () => {},
	open: true,
	handleDrawerClose: () => {},
	handleDrawerOpen: () => {},
	email: '',
	userId: '',
	role: '',
	isActive: false,
	setIsDark: () => {},
	isDark: false,
})

export function ELearningProvider(props: PropsWithChildren<{}>) {
	const [authUser, setAuthUser] = useState(initialValues)
	const [open, setOpen] = useState(true)
	const [email, setEmail] = useState('')
	const [userId, setUserId] = useState('')
	const [role, setRole] = useState<string>('')
	const [isActive, setActive] = useState<boolean>(false)
	const [isDark, setIsDark] = useState<boolean>(false)

	const router = useRouter()

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		if (authUser) {
			setEmail(authUser.email)
			setUserId(authUser.id)
			setRole(authUser.role)
			setActive(authUser.isActive)
		}
	}, [authUser, setEmail, setUserId, setRole, setActive])

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')

		if (accessToken) {
		} else {
			router.push('/login')
		}
	}, [])

	useEffect(() => {
		if (role === 'student') {
			router.push('/student')
		}
	}, [role])

	// Create a theme instance.
	const theme = createTheme({
		palette: {
			mode: isDark ? 'dark' : 'light',
			primary: {
				main: '#6200EE',
			},
			secondary: {
				main: '#03DAC5',
			},
			error: {
				main: '#B00020',
			},
			success: {
				main: '#00B020',
			},
		},
		typography: {
			fontFamily: "'Montserrat', sans-serif",
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ElearningContext.Provider
				value={{ authUser, setAuthUser, open, email, handleDrawerClose, handleDrawerOpen, userId, role, isActive, setIsDark, isDark }}
			>
				{props.children}
			</ElearningContext.Provider>
		</ThemeProvider>
	)
}

export function useELearningContext() {
	return useContext(ElearningContext)
}
