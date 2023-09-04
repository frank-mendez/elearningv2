import { Provider, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import 'react-quill/dist/quill.snow.css'
import { RootState, store } from '@/redux/store'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme, CssBaseline } from '@mui/material'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	const CustomTheme = () => {
		const mode = useSelector((state: RootState) => state.auth.user?.theme)
		const [isDark, setIsDark] = useState<boolean>(false)

		useEffect(() => {
			if (mode === 'light') {
				setIsDark(false)
			} else {
				setIsDark(true)
			}
		}, [mode, setIsDark])

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
			components: {
				MuiAppBar: {
					styleOverrides: {
						colorPrimary: {
							backgroundColor: '#F2F2F2',
						},
					},
				},
			},
		})
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		)
	}

	return (
		<Provider store={store}>
			<CustomTheme />
		</Provider>
	)
}

export default MyApp
