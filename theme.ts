import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
	palette: {
		mode: 'light',
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
export default theme
